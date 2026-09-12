import type { ClubHighlight } from "@/types";

/**
 * L'ACTUALITÉ AFFICHÉE SUR LE SITE
 *
 * Le club saisit ses actualités et ses rendez-vous dans l'espace
 * d'administration ; le site affiche la première de la liste qui est encore
 * d'actualité, et fait disparaître les autres.
 *
 * DEUX FAÇONS DE PUBLIER, et c'est volontaire :
 *
 *   • AVEC UNE DATE DE FIN — un forum, un tournoi, une date de reprise. Le
 *     site retire l'annonce tout seul le lendemain : personne n'a à se
 *     souvenir de supprimer le bandeau du forum.
 *
 *   • SANS AUCUNE DATE — une actualité de fond (« les inscriptions sont
 *     ouvertes », « la saison reprend »). Elle reste affichée jusqu'à ce que
 *     le club la retire ou en publie une autre au-dessus.
 *
 *   Une annonce sans date ne doit JAMAIS disparaître silencieusement : c'est
 *   exactement ce qui s'était produit — une actualité enregistrée, validée
 *   par l'admin, mais jamais affichée faute de date de fin.
 *
 * L'ORDRE EST CELUI DE LA LISTE, pas celui des dates. Le club voit dans
 * l'admin laquelle de ses lignes part en ligne, et la déplace avec les
 * flèches s'il veut en mettre une autre en avant. Un tri caché par date
 * rendrait ce choix impossible à comprendre depuis le formulaire.
 *
 * NB : l'évaluation a lieu au rendu, donc à la génération de la page. Le
 * bandeau se retire aussi côté navigateur (cf. `EventBanner`), ce qui couvre
 * le cas d'une page mise en cache la veille.
 */

/** La date de fin exploitable d'une annonce, ou `null` si elle n'en a pas. */
export function finDe(evenement: ClubHighlight): number | null {
  const brut = evenement.endDate || evenement.startDate;
  if (!brut) return null;
  const fin = new Date(brut).getTime();
  return Number.isFinite(fin) ? fin : null;
}

/** Vrai tant que l'annonce mérite d'être affichée (sans date : toujours). */
export function estEncoreDActualite(
  evenement: ClubHighlight,
  maintenant: number = Date.now(),
): boolean {
  const fin = finDe(evenement);
  return fin === null || fin > maintenant;
}

/** L'annonce affichée sur le site : la première de la liste encore valable. */
export function prochainEvenement(
  evenements: ClubHighlight[],
  maintenant: number = Date.now(),
): ClubHighlight | null {
  return evenements.find((e) => estEncoreDActualite(e, maintenant)) ?? null;
}

/**
 * L'état d'une annonce, tel qu'affiché dans l'espace d'administration.
 * `index` et la liste complète sont nécessaires : « affichée » ne dépend pas
 * seulement de l'annonce, mais de ce qui la précède.
 */
export type EtatEvenement = "affiche" | "en-attente" | "termine";

export function etatEvenement(
  evenements: ClubHighlight[],
  index: number,
  maintenant: number = Date.now(),
): EtatEvenement {
  const evenement = evenements[index];
  if (!evenement || !estEncoreDActualite(evenement, maintenant)) return "termine";
  const premier = evenements.findIndex((e) => estEncoreDActualite(e, maintenant));
  return premier === index ? "affiche" : "en-attente";
}
