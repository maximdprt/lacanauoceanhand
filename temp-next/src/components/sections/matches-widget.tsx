import { MapPin } from "lucide-react";
import type { MatchItem } from "@/types";
import { cn } from "@/lib/utils";

export function MatchList({
  title,
  matches,
  isResults = false,
}: {
  title: string;
  matches: MatchItem[];
  isResults?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-(--radius-lg) border border-line bg-white">
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <h3 className="font-display text-lg uppercase tracking-tight text-ink">
          {title}
        </h3>
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
          {isResults ? "Résultats" : "À venir"}
        </span>
      </div>
      <ul className="divide-y divide-line">
        {matches.map((m) => (
          <li key={m.id} className="flex items-center gap-4 px-6 py-4">
            <div className="flex flex-col items-center justify-center">
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                  m.isHome ? "bg-ocean-tint text-ocean" : "bg-mist text-ink-soft",
                )}
              >
                {m.isHome ? "Dom." : "Ext."}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                {m.competition}
              </p>
              <p className="truncate text-[15px] font-semibold text-ink">
                Lacanau Océhand <span className="text-ink-soft">vs</span> {m.opponent}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-soft">
                <span>{m.date}</span>
                <span className="text-line-strong">·</span>
                <MapPin size={11} />
                <span className="truncate">{m.location}</span>
              </p>
            </div>
            {isResults && m.score && (
              <span className="font-display text-2xl tabular-nums text-ink">
                {m.score}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
