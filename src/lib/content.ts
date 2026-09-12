import "server-only";

import { unstable_cache } from "next/cache";

import { mergeContent, type SiteContent } from "@/lib/content-schema";
import { readStoredContent } from "@/lib/content-store";

/**
 * LE CONTENU DU SITE, CÔTÉ PAGES
 *
 * Toutes les pages passent par `getSiteContent()` plutôt que d'importer
 * `@/data/site` directement : elles affichent ainsi ce que le club a saisi
 * dans l'espace d'administration, avec les valeurs d'origine en filet.
 *
 * ─────────────────────────────────────────────────────────────
 * POURQUOI LA FRAÎCHEUR REPOSE SUR UNE DURÉE, ET NON SUR UNE
 * INVALIDATION À L'ENREGISTREMENT
 * ─────────────────────────────────────────────────────────────
 * La version précédente étiquetait ce cache et demandait son invalidation
 * depuis l'action d'enregistrement. Ça ne marchait pas : ni `updateTag` ni
 * `revalidateTag` n'ont vidé l'entrée d'un `unstable_cache` en production
 * (vérifié les deux, en ligne, sur la page d'administration elle-même — qui
 * est pourtant rendue à chaque visite). Le club enregistrait, le fichier
 * partait bien dans le stockage, et le site servait indéfiniment la version
 * précédente. C'est la panne qu'il a signalée.
 *
 * On ne dépend donc plus d'un mécanisme d'invalidation qu'on ne peut pas
 * vérifier :
 *
 *   • les PAGES PUBLIQUES lisent un cache à durée de vie courte. Elles
 *     restent générées statiquement (`○` au build) et servies par le CDN ;
 *     une modification apparaît d'elle-même dans la minute. Le mécanisme est
 *     le même en local et en ligne, et n'a aucune façon de se gripper.
 *
 *   • l'ESPACE D'ADMINISTRATION lit le stockage SANS cache
 *     (`getSiteContentFrais`). Ses pages sont déjà rendues à chaque visite,
 *     une lecture de quelques kilo-octets n'y coûte rien — et le club doit
 *     voir ses propres modifications immédiatement, sinon il les réécrase
 *     avec le formulaire périmé qu'il a sous les yeux.
 *
 * CE QUI EST MIS EN CACHE : uniquement les MODIFICATIONS lues dans le
 * stockage, jamais le contenu fusionné. Le cache de données survit aux
 * déploiements ; y ranger `SiteContent` complet figerait la forme qu'il
 * avait ce jour-là, et une clé ajoutée ensuite au code reviendrait
 * `undefined` sur toutes les pages.
 */

/** Combien de temps une page publique peut afficher une version précédente. */
export const DUREE_CACHE_CONTENU = 30;

async function lireModifications(): Promise<Partial<SiteContent> | null> {
  try {
    return await readStoredContent();
  } catch (erreur) {
    // Le site doit rester debout même si le stockage est indisponible :
    // on repart des valeurs du code et on laisse une trace dans les logs.
    console.error("Contenu personnalisé illisible, retour aux valeurs par défaut :", erreur);
    return null;
  }
}

const chargerModifications = unstable_cache(
  lireModifications,
  ["site-content", "v3"],
  { revalidate: DUREE_CACHE_CONTENU },
);

/** Le contenu affiché par le site : valeurs par défaut + modifications du club. */
export async function getSiteContent(): Promise<SiteContent> {
  return mergeContent(await chargerModifications());
}

/**
 * Le contenu tel qu'il est dans le stockage, à la seconde près.
 * Réservé à l'espace d'administration : une page publique qui l'appellerait
 * lirait le stockage à chaque rendu.
 */
export async function getSiteContentFrais(): Promise<SiteContent> {
  return mergeContent(await lireModifications());
}
