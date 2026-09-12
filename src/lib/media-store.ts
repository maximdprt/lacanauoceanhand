import "server-only";

import { del, list, put } from "@vercel/blob";

import { mediaFiles } from "@/data/media-index";
import { EXTENSIONS, LIMITE_ENVOI, TYPES_ACCEPTES, enMo } from "@/lib/photos";
import type { Media } from "@/types";
import { driverActif } from "@/lib/content-store";

/**
 * LES PHOTOS IMPORTÉES DEPUIS L'ESPACE D'ADMINISTRATION
 *
 * Le club ajoute une photo depuis son téléphone ou son ordinateur ; elle doit
 * être visible en ligne dans la seconde, sans redéploiement. Le disque d'une
 * fonction Vercel étant en lecture seule, les fichiers vont dans le même
 * stockage que le contenu (Vercel Blob) et sont servis par son CDN.
 *
 *   • EN LIGNE   → Vercel Blob, préfixe `photos/`, adresse publique.
 *   • EN LOCAL   → `public/media/importees/`, servi directement par Next.
 *
 * Les photos livrées avec le code (`public/media/…`, inventoriées dans
 * `media-index.ts`) restent évidemment utilisables : la médiathèque de
 * l'admin présente les deux ensembles côte à côte.
 */

const PREFIXE_BLOB = "photos/";
const DOSSIER_LOCAL = "public/media/importees";
const CHEMIN_LOCAL = "/media/importees";

/* Formats acceptés, extensions et limite de taille sont déclarés une seule
   fois, dans `@/lib/photos` : le navigateur applique exactement les mêmes
   règles avant d'envoyer, et les deux ne peuvent pas diverger. */

export type ResultatImport =
  | { ok: true; url: string }
  | { ok: false; message: string };

/* ============================================================
   NOM DE FICHIER
   ============================================================ */

/**
 * Transforme « Photo équipe U13 (1).JPG » en « photo-equipe-u13-1 ».
 * Le nom d'origine est conservé autant que possible : c'est ce qui permet au
 * club de reconnaître sa photo dans la médiathèque six mois plus tard.
 */
function nomPropre(nomFichier: string): string {
  const sansExtension = nomFichier.replace(/\.[^.]+$/, "");
  const propre = sansExtension
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return propre || "photo";
}

/** Suffixe court : deux envois du même fichier ne s'écrasent pas. */
const suffixe = () => Math.random().toString(36).slice(2, 8);

/* ============================================================
   IMPORT
   ============================================================ */

export async function televerserMedia(fichier: File): Promise<ResultatImport> {
  if (!fichier || fichier.size === 0) {
    return { ok: false, message: "Aucun fichier reçu." };
  }
  if (fichier.size > LIMITE_ENVOI) {
    return {
      ok: false,
      message: `Cette photo pèse ${enMo(fichier.size)} Mo, au-delà de la limite d'envoi. Réduisez-la, ou envoyez-la depuis un autre appareil.`,
    };
  }

  const type = fichier.type.toLowerCase();
  if (!(TYPES_ACCEPTES as readonly string[]).includes(type)) {
    return {
      ok: false,
      message: "Format non accepté. Envoyez une image JPG, PNG, WEBP, AVIF ou GIF.",
    };
  }

  const nom = `${nomPropre(fichier.name)}-${suffixe()}.${EXTENSIONS[type]}`;
  const driver = driverActif();

  try {
    if (driver === "blob") {
      const jeton = process.env.BLOB_READ_WRITE_TOKEN;
      if (!jeton) {
        return { ok: false, message: "Le stockage des photos n'est pas relié au site." };
      }
      const { url } = await put(`${PREFIXE_BLOB}${nom}`, fichier, {
        token: jeton,
        access: "public",
        contentType: type,
        // Le nom est déjà rendu unique par le suffixe : un second suffixe
        // aléatoire rendrait les adresses illisibles sans rien apporter.
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      return { ok: true, url };
    }

    if (driver === "fichier") {
      const fs = await import("node:fs/promises");
      await fs.mkdir(DOSSIER_LOCAL, { recursive: true });
      await fs.writeFile(
        `${DOSSIER_LOCAL}/${nom}`,
        Buffer.from(await fichier.arrayBuffer()),
      );
      return { ok: true, url: `${CHEMIN_LOCAL}/${nom}` };
    }

    return {
      ok: false,
      message:
        "Aucun stockage n'est relié au site : l'import de photos est indisponible.",
    };
  } catch (erreur) {
    console.error("Import de photo impossible :", erreur);
    return { ok: false, message: "L'import a échoué. Réessayez dans un instant." };
  }
}

/* ============================================================
   MÉDIATHÈQUE
   ============================================================ */

export type { Media } from "@/types";

const nomAffiche = (url: string) =>
  decodeURIComponent(url.split("/").pop() ?? url).replace(/\.[^.]+$/, "");

const estImage = (chemin: string) => /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(chemin);

/** Les photos importées depuis l'admin, la plus récente en premier. */
async function mediasImportes(): Promise<Media[]> {
  const driver = driverActif();

  if (driver === "blob") {
    const jeton = process.env.BLOB_READ_WRITE_TOKEN;
    if (!jeton) return [];
    const { blobs } = await list({ token: jeton, prefix: PREFIXE_BLOB, limit: 500 });
    return blobs
      .filter((b) => estImage(b.pathname))
      .sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt))
      .map((b) => ({ url: b.url, nom: nomAffiche(b.pathname), importee: true }));
  }

  if (driver === "fichier") {
    const fs = await import("node:fs/promises");
    try {
      const fichiers = await fs.readdir(DOSSIER_LOCAL);
      return fichiers
        .filter(estImage)
        .sort()
        .reverse()
        .map((f) => ({ url: `${CHEMIN_LOCAL}/${f}`, nom: nomAffiche(f), importee: true }));
    } catch {
      return []; // dossier pas encore créé : rien n'a été importé
    }
  }

  return [];
}

/**
 * Toute la médiathèque : les photos importées d'abord (ce sont les plus
 * récentes, donc les plus probablement cherchées), puis celles livrées avec
 * le site. Une panne de lecture du stockage ne doit pas vider l'écran :
 * l'inventaire du code reste affiché.
 */
export async function listerMedias(): Promise<Media[]> {
  const importees = await mediasImportes().catch((erreur) => {
    console.error("Médiathèque : lecture du stockage impossible :", erreur);
    return [] as Media[];
  });

  const duCode: Media[] = mediaFiles
    .filter(estImage)
    .map((chemin) => ({ url: chemin, nom: nomAffiche(chemin), importee: false }));

  return [...importees, ...duCode];
}

/** Supprime une photo importée. Les photos du code ne sont pas concernées. */
export async function supprimerMedia(url: string): Promise<ResultatImport> {
  const driver = driverActif();

  try {
    if (driver === "blob") {
      const jeton = process.env.BLOB_READ_WRITE_TOKEN;
      if (!jeton) return { ok: false, message: "Stockage indisponible." };
      // Ceinture et bretelles : seule une adresse du stockage du site, dans
      // le dossier des photos, peut être supprimée par cette action.
      if (!url.includes(".public.blob.vercel-storage.com/") || !url.includes(`/${PREFIXE_BLOB}`)) {
        return { ok: false, message: "Cette photo ne peut pas être supprimée." };
      }
      await del(url, { token: jeton });
      return { ok: true, url };
    }

    if (driver === "fichier") {
      if (!url.startsWith(`${CHEMIN_LOCAL}/`) || url.includes("..")) {
        return { ok: false, message: "Cette photo ne peut pas être supprimée." };
      }
      const fs = await import("node:fs/promises");
      await fs.rm(`public${url}`, { force: true });
      return { ok: true, url };
    }

    return { ok: false, message: "Stockage indisponible." };
  } catch (erreur) {
    console.error("Suppression de photo impossible :", erreur);
    return { ok: false, message: "La suppression a échoué." };
  }
}
