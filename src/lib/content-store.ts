import "server-only";

import { put } from "@vercel/blob";

import type { SiteContent } from "@/lib/content-schema";

/**
 * OÙ VIVENT LES MODIFICATIONS FAITES DEPUIS L'ESPACE ADMIN
 *
 * Un seul fichier JSON contenant uniquement ce que le club a changé. Deux
 * emplacements possibles, choisis automatiquement :
 *
 *   • EN LIGNE (Vercel) — Vercel Blob. Le disque d'une fonction Vercel est en
 *     lecture seule : impossible d'écrire dans le projet. Le Blob est le
 *     stockage de fichiers de Vercel ; il suffit de créer un « Blob store »
 *     dans Storage et de le relier au projet, la variable
 *     BLOB_READ_WRITE_TOKEN est alors ajoutée toute seule.
 *
 *   • EN LOCAL (npm run dev) — un simple fichier `.data/site-content.json`,
 *     ignoré par git. Permet de tout tester sans rien configurer.
 *
 * En cas de pépin (jeton absent, réseau coupé, JSON corrompu) la lecture
 * renvoie `null` et le site retombe sur les valeurs de `src/data/site.ts` :
 * une panne de stockage ne peut jamais mettre le site par terre.
 */

const BLOB_PATHNAME = "contenu/site-content.json";
const DOSSIER_LOCAL = ".data";
const FICHIER_LOCAL = `${DOSSIER_LOCAL}/site-content.json`;

export type StorageDriver = "blob" | "fichier" | "aucun";

export type StorageStatus = {
  driver: StorageDriver;
  /** Vrai si l'espace admin peut enregistrer. */
  writable: boolean;
  /** Où les données sont écrites, en clair, pour l'écran d'administration. */
  label: string;
  /** Ce qu'il reste à faire quand l'enregistrement est impossible. */
  hint?: string;
};

/* ============================================================
   VERCEL BLOB
   ============================================================ */

/**
 * Reconstruit l'URL publique du fichier à partir du jeton.
 *
 * Le jeton a la forme `vercel_blob_rw_<storeId>_<secret>` et l'URL publique
 * d'un store est `https://<storeId>.public.blob.vercel-storage.com/<chemin>`.
 * C'est exactement le calcul que fait le SDK ; le refaire ici permet de LIRE
 * par un simple `fetch` sur le CDN, sans appel authentifié à l'API — donc
 * sans coût et sans rendre les pages dynamiques.
 *
 * `BLOB_CONTENT_URL` permet de forcer l'URL si la convention changeait un jour.
 */
function blobPublicUrl(): string | null {
  const forced = process.env.BLOB_CONTENT_URL;
  if (forced) return forced;

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;

  const storeId = token.split("_")[3];
  if (!storeId) return null;

  return `https://${storeId}.public.blob.vercel-storage.com/${BLOB_PATHNAME}`;
}

async function lireBlob(): Promise<string | null> {
  const url = blobPublicUrl();
  if (!url) return null;

  // Le paramètre `t` casse le cache CDN du Blob : sans lui, une modification
  // pourrait rester invisible le temps que le cache expire. L'appel n'a lieu
  // qu'aux régénérations de page (cf. `getSiteContent`), pas à chaque visite.
  const res = await fetch(`${url}?t=${Date.now()}`, { cache: "no-store" });

  if (res.status === 404) return null; // rien n'a encore été enregistré
  if (!res.ok) throw new Error(`Lecture du Blob impossible (HTTP ${res.status}).`);

  return res.text();
}

async function ecrireBlob(contenu: string): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN absent.");

  await put(BLOB_PATHNAME, contenu, {
    token,
    access: "public",
    contentType: "application/json",
    // Chemin fixe : le site sait toujours où lire, et chaque enregistrement
    // remplace le précédent au lieu d'empiler des fichiers.
    addRandomSuffix: false,
    allowOverwrite: true,
    // Le minimum autorisé. La lecture casse déjà le cache, cette valeur
    // basse n'est qu'une sécurité supplémentaire.
    cacheControlMaxAge: 60,
  });
}

/* ============================================================
   FICHIER LOCAL (développement)
   ============================================================ */

/* Chemins volontairement RELATIFS : `process.cwd()` ou `path.join` feraient
   conclure au compilateur que n'importe quel fichier du projet peut être lu à
   l'exécution, et il embarquerait tout le dépôt dans le bundle serveur. Node
   résout ces chemins depuis le dossier de lancement, soit la racine du projet
   — et de toute façon ce driver ne sert qu'en développement. */

async function lireFichier(): Promise<string | null> {
  const fs = await import("node:fs/promises");
  try {
    return await fs.readFile(FICHIER_LOCAL, "utf8");
  } catch (erreur) {
    if ((erreur as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw erreur;
  }
}

async function ecrireFichier(contenu: string): Promise<void> {
  const fs = await import("node:fs/promises");
  await fs.mkdir(DOSSIER_LOCAL, { recursive: true });
  await fs.writeFile(FICHIER_LOCAL, contenu, "utf8");
}

/* ============================================================
   API DU MODULE
   ============================================================ */

/** Le stockage réellement disponible — partagé avec `media-store.ts`, qui
    dépose les photos importées au même endroit que le contenu. */
export function driverActif(): StorageDriver {
  if (process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_CONTENT_URL) return "blob";
  // Sur Vercel le disque est en lecture seule : proposer le fichier local
  // laisserait croire que l'enregistrement fonctionne alors qu'il échouerait.
  if (process.env.VERCEL) return "aucun";
  return "fichier";
}

export function storageStatus(): StorageStatus {
  const driver = driverActif();

  if (driver === "blob") {
    return {
      driver,
      writable: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      label: "Vercel Blob",
      hint: process.env.BLOB_READ_WRITE_TOKEN
        ? undefined
        : "BLOB_CONTENT_URL est défini mais pas BLOB_READ_WRITE_TOKEN : la lecture fonctionne, pas l'enregistrement.",
    };
  }

  if (driver === "fichier") {
    return {
      driver,
      writable: true,
      label: `Fichier local (${FICHIER_LOCAL})`,
      hint: "En développement les modifications restent sur cet ordinateur. Elles n'apparaîtront en ligne qu'une fois un Blob store relié au projet sur Vercel.",
    };
  }

  return {
    driver,
    writable: false,
    label: "Aucun stockage relié",
    hint: "Sur Vercel : Storage → Create Database → Blob, puis « Connect » vers ce projet. La variable BLOB_READ_WRITE_TOKEN est ajoutée automatiquement ; il suffit ensuite de redéployer.",
  };
}

/** Lit le contenu enregistré. Renvoie `null` si rien n'a été modifié. */
export async function readStoredContent(): Promise<Partial<SiteContent> | null> {
  const driver = driverActif();
  if (driver === "aucun") return null;

  const brut = driver === "blob" ? await lireBlob() : await lireFichier();
  if (!brut) return null;

  const json: unknown = JSON.parse(brut);
  if (typeof json !== "object" || json === null) return null;

  return json as Partial<SiteContent>;
}

/** Enregistre le contenu modifié. Lève une erreur si le stockage refuse. */
export async function writeStoredContent(contenu: Partial<SiteContent>): Promise<void> {
  const driver = driverActif();
  const serialise = `${JSON.stringify(contenu, null, 2)}\n`;

  if (driver === "blob") return ecrireBlob(serialise);
  if (driver === "fichier") return ecrireFichier(serialise);

  throw new Error(storageStatus().hint ?? "Aucun stockage n'est relié au site.");
}
