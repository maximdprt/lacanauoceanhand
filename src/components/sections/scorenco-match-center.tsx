import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { MatchList } from "@/components/sections/matches-widget";
import { latestResults, upcomingMatches } from "@/data/site";
import { scorencoClubUrl } from "@/lib/scorenco";

export function ScorencoMatchCenter() {
  return (
    <div className="space-y-4">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
        <MatchList
          title="Prochains matchs"
          matches={upcomingMatches}
          footerLink={{
            href: scorencoClubUrl,
            label: "Voir le calendrier complet →",
          }}
        />
        <MatchList
          title="Derniers résultats"
          matches={latestResults}
          isResults
          footerLink={{
            href: scorencoClubUrl,
            label: "Tous les résultats sur Score'n'co →",
          }}
        />
      </div>
      <p className="text-center text-xs text-ink-soft">
        Données synchronisées avec{" "}
        <Link
          href={scorencoClubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-ocean transition hover:underline"
        >
          Score&apos;n&apos;co
          <ExternalLink size={11} />
        </Link>
        {" "}— calendrier officiel de la ligue.
      </p>
    </div>
  );
}
