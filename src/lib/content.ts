import "server-only";

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
 * vérifier. UN SEUL CACHE, celui des pages. `src/app/(site)/layout.tsx` déclare
 * `revalidate = 30` : les pages publiques restent générées statiquement (`○`
 * au build) et servies par le CDN, et se régénèrent au plus toutes les 30
 * secondes lorsqu'elles sont visitées. Chaque régénération relit le stockage.
 *
 * Empiler un second cache sur la lecture elle-même (ce qui était fait avec
 * `unstable_cache`) paraissait plus économique, mais faisait courir les deux
 * durées de vie l'une après l'autre : une page régénérée juste avant
 * l'expiration du cache de données repartait avec l'ancienne valeur, et il
 * fallait attendre le tour suivant. Mesuré en production : deux minutes pour
 * voir apparaître une photo changée, au lieu d'une demi-minute. Deux minutes
 * pendant lesquelles le club recharge la page et conclut que ça ne marche pas.
 *
 * La lecture coûte un GET de quelques kilo-octets sur le CDN du stockage, une
 * fois par régénération de page — pas une fois par visiteur.
 *
 * L'ESPACE D'ADMINISTRATION, lui, passe par `getSiteContentFrais` : ses pages
 * sont rendues à chaque visite et le club doit voir ses propres
 * modifications immédiatement, sinon il les écrase avec le formulaire périmé
 * qu'il a sous les yeux.
 */

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

/** Le contenu affiché par le site : valeurs par défaut + modifications du club. */
export async function getSiteContent(): Promise<SiteContent> {
  return mergeContent(await lireModifications());
}

/**
 * Le contenu tel qu'il est dans le stockage, à la seconde près.
 * Réservé à l'espace d'administration : une page publique qui l'appellerait
 * lirait le stockage à chaque rendu.
 */
export async function getSiteContentFrais(): Promise<SiteContent> {
  return mergeContent(await lireModifications());
}
