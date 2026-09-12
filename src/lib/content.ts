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
 * CE QUI EST MIS EN CACHE : uniquement les MODIFICATIONS lues dans le
 * stockage, jamais le contenu fusionné. La distinction n'est pas cosmétique.
 * Le cache de données de Next survit aux déploiements ; y ranger le contenu
 * complet reviendrait à figer la forme qu'avait `SiteContent` le jour de la
 * mise en cache. Une clé ajoutée ensuite au code — une nouvelle rubrique,
 * les photos du site — reviendrait `undefined` sur toutes les pages, et le
 * site entier tomberait en erreur jusqu'à ce que quelqu'un pense à vider un
 * cache invisible. En ne cachant que ce qui vient du stockage, la fusion
 * avec les valeurs du code a lieu à chaque rendu : le contenu a toujours la
 * forme du code qui le lit.
 *
 * Mise en cache : la lecture du stockage est gardée jusqu'à ce que l'admin
 * appelle `updateTag(CONTENT_TAG)`. Conséquences :
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

const chargerModifications = unstable_cache(
  async (): Promise<Partial<SiteContent> | null> => {
    try {
      return await readStoredContent();
    } catch (erreur) {
      // Le site doit rester debout même si le stockage est indisponible :
      // on repart des valeurs du code et on laisse une trace dans les logs.
      console.error("Contenu personnalisé illisible, retour aux valeurs par défaut :", erreur);
      return null;
    }
  },
  ["site-content", "v2"],
  { tags: [CONTENT_TAG] },
);

/** Le contenu affiché par le site : valeurs par défaut + modifications du club. */
export async function getSiteContent(): Promise<SiteContent> {
  return mergeContent(await chargerModifications());
}
