import "server-only";

import { unstable_cache } from "next/cache";

import {
  defaultSiteContent,
  mergeContent,
  type SiteContent,
} from "@/lib/content-schema";
import { readStoredContent } from "@/lib/content-store";

/**
 * LE CONTENU DU SITE, CÔTÉ PAGES
 *
 * Toutes les pages passent par `getSiteContent()` plutôt que d'importer
 * `@/data/site` directement : elles affichent ainsi ce que le club a saisi
 * dans l'espace d'administration, avec les valeurs d'origine en filet.
 *
 * Mise en cache : le résultat est gardé dans le cache de données de Next
 * jusqu'à ce que l'admin appelle `revalidateContent()`. Conséquences :
 *   • les pages restent générées statiquement — aucune lecture du stockage
 *     à chaque visite, donc aucune perte de vitesse ni de référencement ;
 *   • un enregistrement dans l'admin invalide l'étiquette, et les pages
 *     concernées sont régénérées à la visite suivante.
 *
 * NB : `unstable_cache` est l'API disponible sans activer `cacheComponents`,
 * qui changerait le comportement de rendu de tout le site. À remplacer par
 * la directive `use cache` le jour où le projet basculera dessus.
 */

export const CONTENT_TAG = "site-content";

const chargerContenu = unstable_cache(
  async (): Promise<SiteContent> => {
    try {
      return mergeContent(await readStoredContent());
    } catch (erreur) {
      // Le site doit rester debout même si le stockage est indisponible :
      // on repart des valeurs du code et on laisse une trace dans les logs.
      console.error("Contenu personnalisé illisible, retour aux valeurs par défaut :", erreur);
      return defaultSiteContent;
    }
  },
  ["site-content"],
  { tags: [CONTENT_TAG] },
);

/** Le contenu affiché par le site : valeurs par défaut + modifications du club. */
export async function getSiteContent(): Promise<SiteContent> {
  return chargerContenu();
}
