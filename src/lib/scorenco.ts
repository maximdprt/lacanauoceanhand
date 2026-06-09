/**
 * Widgets Score'n'co — calendriers et résultats synchronisés avec la fédération.
 * IDs récupérés depuis l'ancien site WordPress du club.
 * Pour créer de nouveaux widgets : https://admin.scorenco.com/ → Widgets
 */
export const scorencoClubUrl =
  "https://app.scorenco.com/clubs/lacanau-ocehand/hand";

/** Widgets globaux du club (toutes équipes) */
export const scorencoWidgets = {
  /** Matchs à venir — toutes les équipes */
  upcoming:
    process.env.NEXT_PUBLIC_SCORENCO_WIDGET_UPCOMING ??
    "63fe8ff2a78e2a09cf58cef1",
  /** Derniers résultats — toutes les équipes */
  results:
    process.env.NEXT_PUBLIC_SCORENCO_WIDGET_RESULTS ??
    "63fe90e710499509e3020814",
};

/** Widget par équipe (calendrier + résultats + classement) */
export const scorencoTeamWidgets: Record<string, string> = {
  "seniors-masculins": "63fd1454dff97771c571764b",
  "u13-garcons": "63fe9d0a10499509e18f61d1",
  "u13-filles": "63fe9e341bf5ae08ee3c9c08",
  "u15-garcons": "63fe9cb81bf5ae08ec0d7530",
  "u15-filles": "63fe9de810499509e7c79623",
  u18: "63fe9bc51bf5ae08ec0d7521",
};

export function getTeamWidgetId(slug: string): string | undefined {
  return scorencoTeamWidgets[slug];
}
