"use server";

import { revalidatePath, updateTag } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  ADMIN_COOKIE,
  creerSession,
  optionsCookieSession,
  sessionValide,
  verifierCode,
} from "@/lib/admin-auth";
import { clesDeSection, sectionParSlug } from "@/lib/admin-sections";
import { parseSiteContent, type ContentKey, type SiteContent } from "@/lib/content-schema";
import { readStoredContent, storageStatus, writeStoredContent } from "@/lib/content-store";
import {
  listerMedias,
  supprimerMedia,
  televerserMedia,
  type Media,
  type ResultatImport,
} from "@/lib/media-store";
import { CONTENT_TAG } from "@/lib/content";

/**
 * LES ACTIONS DE L'ESPACE D'ADMINISTRATION
 *
 * Tout ce qui écrit passe par ici. Trois règles tenues sans exception :
 *
 *   1. chaque action revérifie la session — le garde-barrière protège
 *      l'affichage des pages, pas les appels d'action, qui arrivent
 *      directement du navigateur ;
 *   2. rien n'est enregistré sans passer par `parseSiteContent`, qui borne,
 *      nettoie et retype tout ce qui vient du formulaire ;
 *   3. une rubrique ne peut écrire que ses propres clés : envoyer les tarifs
 *      depuis l'écran de la boutique ne mène nulle part.
 */

/* ============================================================
   CONNEXION
   ============================================================ */

/** Ralentisseur anti-force brute, par adresse IP. */
const FENETRE_MS = 10 * 60 * 1000;
const MAX_ESSAIS = 8;
const essais = new Map<string, number[]>();

async function tropDEssais(): Promise<boolean> {
  const entetes = await headers();
  const ip =
    entetes.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    entetes.get("x-real-ip") ||
    "inconnue";

  const maintenant = Date.now();
  const recents = (essais.get(ip) ?? []).filter((t) => maintenant - t < FENETRE_MS);

  if (recents.length >= MAX_ESSAIS) {
    essais.set(ip, recents);
    return true;
  }

  recents.push(maintenant);
  essais.set(ip, recents);
  if (essais.size > 200) {
    for (const [cle, dates] of essais) {
      if (dates.every((t) => maintenant - t >= FENETRE_MS)) essais.delete(cle);
    }
  }
  return false;
}

export type EtatConnexion = { erreur?: string };

/** Vérifie le code et ouvre une session de 12 h. */
export async function seConnecter(
  _etatPrecedent: EtatConnexion,
  donnees: FormData,
): Promise<EtatConnexion> {
  if (await tropDEssais()) {
    return { erreur: "Trop de tentatives. Réessayez dans quelques minutes." };
  }

  if (!verifierCode(donnees.get("code"))) {
    return { erreur: "Code incorrect." };
  }

  const { valeur, expireLe } = await creerSession();
  (await cookies()).set(ADMIN_COOKIE, valeur, { ...optionsCookieSession, expires: expireLe });

  // Destination interne uniquement : un `suite` fabriqué ne doit pas pouvoir
  // servir de tremplin vers un autre site.
  const suite = String(donnees.get("suite") ?? "");
  const destination = suite.startsWith("/admin") && !suite.startsWith("//") ? suite : "/admin";
  redirect(destination);
}

export async function seDeconnecter(): Promise<void> {
  (await cookies()).delete({ ...optionsCookieSession, name: ADMIN_COOKIE });
  redirect("/admin/connexion");
}

/* ============================================================
   ENREGISTREMENT
   ============================================================ */

async function exigerSession(): Promise<void> {
  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!(await sessionValide(cookie))) {
    redirect("/admin/connexion");
  }
}

/**
 * Recharge le site après modification.
 *   • `updateTag` vide le cache du contenu tout de suite, pour que l'admin
 *     réaffiche ce qui vient d'être saisi et non la version précédente ;
 *   • `revalidatePath` demande la régénération des pages publiques.
 */
function rafraichirLeSite(): void {
  updateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
}

export type EtatEnregistrement = {
  statut: "repos" | "ok" | "erreur";
  message?: string;
  /** Horodatage du dernier succès, pour l'afficher côté navigateur. */
  a?: number;
};

/**
 * Enregistre les modifications d'une rubrique.
 * Le fichier stocké ne contient que ce qui a été changé : les rubriques
 * jamais touchées continuent de suivre les valeurs du code.
 */
export async function enregistrerRubrique(
  slug: string,
  valeurs: Record<string, unknown>,
): Promise<EtatEnregistrement> {
  await exigerSession();

  const section = sectionParSlug(slug);
  if (!section) return { statut: "erreur", message: "Rubrique inconnue." };

  const stockage = storageStatus();
  if (!stockage.writable) {
    return {
      statut: "erreur",
      message: stockage.hint ?? "Aucun stockage n'est relié : impossible d'enregistrer.",
    };
  }

  // Une rubrique n'écrit que ses propres clés, quoi qu'envoie le navigateur.
  const autorisees = new Set<ContentKey>(clesDeSection(section));
  const filtrees: Record<string, unknown> = {};
  for (const [cle, valeur] of Object.entries(valeurs)) {
    if (autorisees.has(cle as ContentKey)) filtrees[cle] = valeur;
  }

  const propre = parseSiteContent(filtrees);

  try {
    const existant = (await readStoredContent()) ?? {};

    // Une clé validée à vide (toutes les lignes supprimées) est retirée du
    // fichier : la rubrique repart alors sur les valeurs d'origine, ce qui
    // vaut mieux qu'une section vide en ligne.
    const suivant: Partial<SiteContent> = { ...existant };
    for (const cle of autorisees) {
      if (propre[cle] !== undefined) {
        (suivant as Record<string, unknown>)[cle] = propre[cle];
      } else {
        delete suivant[cle];
      }
    }

    await writeStoredContent(suivant);
  } catch (erreur) {
    console.error("Enregistrement du contenu impossible :", erreur);
    return {
      statut: "erreur",
      message: "L'enregistrement a échoué. Vos saisies sont toujours à l'écran : réessayez.",
    };
  }

  rafraichirLeSite();
  return { statut: "ok", a: Date.now() };
}

/** Ramène une rubrique aux valeurs livrées avec le site. */
export async function reinitialiserRubrique(slug: string): Promise<EtatEnregistrement> {
  await exigerSession();

  const section = sectionParSlug(slug);
  if (!section) return { statut: "erreur", message: "Rubrique inconnue." };

  const stockage = storageStatus();
  if (!stockage.writable) {
    return {
      statut: "erreur",
      message: stockage.hint ?? "Aucun stockage n'est relié : impossible d'enregistrer.",
    };
  }

  try {
    const existant = (await readStoredContent()) ?? {};
    const suivant: Partial<SiteContent> = { ...existant };
    for (const cle of clesDeSection(section)) delete suivant[cle];
    await writeStoredContent(suivant);
  } catch (erreur) {
    console.error("Réinitialisation impossible :", erreur);
    return { statut: "erreur", message: "La réinitialisation a échoué." };
  }

  rafraichirLeSite();
  return { statut: "ok", a: Date.now() };
}

/* ============================================================
   PHOTOS
   Importer une photo, lister la médiathèque, en retirer une. Ces trois
   actions ne touchent jamais au contenu : elles déposent ou retirent un
   fichier, et rendent son adresse. C'est l'enregistrement de la rubrique
   qui décide, ensuite, où cette adresse est utilisée — une photo importée
   puis abandonnée n'a donc modifié aucune page.
   ============================================================ */

/** Dépose une photo dans le stockage du site et rend son adresse publique. */
export async function televerserImage(donnees: FormData): Promise<ResultatImport> {
  await exigerSession();

  const fichier = donnees.get("fichier");
  if (!(fichier instanceof File)) {
    return { ok: false, message: "Aucun fichier reçu." };
  }

  return televerserMedia(fichier);
}

/** La médiathèque : photos importées par le club + photos livrées avec le site. */
export async function listerMediatheque(): Promise<Media[]> {
  await exigerSession();
  return listerMedias();
}

/** Retire une photo importée du stockage. */
export async function supprimerImage(url: string): Promise<ResultatImport> {
  await exigerSession();
  return supprimerMedia(url);
}
