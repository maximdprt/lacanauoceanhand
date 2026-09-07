import type { ClubHighlight } from "@/types";

/**
 * LE PROCHAIN RENDEZ-VOUS À AFFICHER
 *
 * Le club saisit ses événements une fois pour toutes dans l'espace
 * d'administration ; le site choisit tout seul lequel montrer et fait
 * disparaître les autres. Personne n'a à se souvenir de retirer le bandeau
 * du forum le lendemain du forum.
 *
 * Le tri est fait sur la date de fin : un tournoi sur trois jours reste
 * annoncé jusqu'à son dernier jour, pas jusqu'à son premier.
 *
 * NB : l'évaluation a lieu au moment du rendu, donc à la génération de la
 * page. Le bandeau lui-même se retire aussi côté navigateur (cf.
 * `EventBanner`), ce qui couvre le cas d'une page mise en cache la veille.
 */
export function prochainEvenement(
  evenements: ClubHighlight[],
  maintenant: number = Date.now(),
): ClubHighlight | null {
  const aVenir = evenements
    .filter((evenement) => {
      const fin = new Date(evenement.endDate || evenement.startDate).getTime();
      return Number.isFinite(fin) && fin > maintenant;
    })
    .sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );

  return aVenir[0] ?? null;
}
