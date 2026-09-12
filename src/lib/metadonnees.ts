import "server-only";

import type { Metadata } from "next";

import { getSiteContent } from "@/lib/content";
import { buildMetadata } from "@/lib/site";

/**
 * LES MÉTADONNÉES D'UNE PAGE, IMAGE DE PARTAGE COMPRISE
 *
 * `buildMetadata` reste une fonction pure : on lui donne un titre, une
 * description et une image, elle rend les balises. Ce module lui apporte la
 * seule chose qu'elle ne peut pas aller chercher elle-même — l'image de
 * partage choisie par le club dans /admin → Photos du site.
 *
 * Pourquoi une fonction plutôt qu'un `export const metadata` : une constante
 * de module est figée à la compilation. Elle ne pourrait donc jamais refléter
 * une image changée depuis l'admin, puisque celle-ci vit dans le stockage et
 * non dans le code. `generateMetadata` est réévalué à la régénération de la
 * page — exactement au même moment que le reste du contenu.
 *
 * Les pages restent **statiques** : `getSiteContent()` est mis en cache et
 * n'est lu qu'à la (re)génération, pas à chaque visite. À vérifier au build,
 * qui doit continuer d'afficher `○ (Static)`.
 */
export async function metadonneesPage(options: {
  title: string;
  description: string;
  path?: string;
  /** Pour forcer une image propre à la page (fiche d'équipe, par exemple). */
  image?: string;
  noIndex?: boolean;
}): Promise<Metadata> {
  const { images } = await getSiteContent();
  return buildMetadata({ ...options, image: options.image ?? images.partage });
}
