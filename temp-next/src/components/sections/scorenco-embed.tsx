import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { scorencoClubUrl, scorencoWidgets } from "@/lib/scorenco";
import { ScorencoWidget } from "@/components/sections/scorenco-widget";

export function ScorencoEmbed() {
  return (
    <div className="space-y-4">
      <div className="grid gap-6 lg:grid-cols-2">
        <ScorencoWidget
          widgetId={scorencoWidgets.upcoming}
          title="Calendrier complet"
          badge="À venir"
          minHeight={480}
        />
        <ScorencoWidget
          widgetId={scorencoWidgets.results}
          title="Historique des matchs"
          badge="Résultats"
          minHeight={480}
        />
      </div>
      <p className="text-center text-xs text-ink-soft">
        Calendrier officiel via{" "}
        <Link
          href={scorencoClubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-ocean transition hover:underline"
        >
          Score&apos;n&apos;co
          <ExternalLink size={11} />
        </Link>
      </p>
    </div>
  );
}
