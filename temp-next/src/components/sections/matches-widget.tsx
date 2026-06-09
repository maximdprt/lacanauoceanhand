import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

import type { MatchItem } from "@/types";
import { cn } from "@/lib/utils";

const CLUB_NAME = "Lacanau Océhand";

function parseScore(score: string): [number, number] | null {
  const parts = score.split(/\s*[-–]\s*/).map((s) => parseInt(s.trim(), 10));
  if (parts.length !== 2 || parts.some(Number.isNaN)) return null;
  return [parts[0], parts[1]];
}

function MatchScoreboard({ match }: { match: MatchItem }) {
  const parsed = match.score ? parseScore(match.score) : null;
  if (!parsed) return null;

  const [homeGoals, awayGoals] = parsed;
  const homeTeam = match.isHome ? CLUB_NAME : match.opponent;
  const awayTeam = match.isHome ? match.opponent : CLUB_NAME;
  const lacanauGoals = match.isHome ? homeGoals : awayGoals;
  const opponentGoals = match.isHome ? awayGoals : homeGoals;
  const isWin = lacanauGoals > opponentGoals;
  const isDraw = lacanauGoals === opponentGoals;

  return (
    <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
      <p
        className={cn(
          "truncate text-right text-sm font-semibold",
          match.isHome ? "text-ocean" : "text-ink",
        )}
        title={homeTeam}
      >
        {homeTeam}
      </p>
      <div
        className={cn(
          "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 font-display text-lg tabular-nums tracking-tight",
          isWin && "bg-ocean-tint text-ocean",
          !isWin && !isDraw && "bg-mist text-ink",
          isDraw && "bg-gold-tint text-gold-deep",
        )}
      >
        <span>{homeGoals}</span>
        <span className="text-xs text-ink-soft">—</span>
        <span>{awayGoals}</span>
      </div>
      <p
        className={cn(
          "truncate text-left text-sm font-semibold",
          !match.isHome ? "text-ocean" : "text-ink",
        )}
        title={awayTeam}
      >
        {awayTeam}
      </p>
    </div>
  );
}

function UpcomingRow({ match }: { match: MatchItem }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-mist px-2 py-2 text-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
          {match.isHome ? "Dom." : "Ext."}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ocean">
          {match.competition}
        </p>
        <p className="mt-1 text-[15px] font-semibold text-ink">
          {CLUB_NAME}{" "}
          <span className="font-normal text-ink-soft">vs</span> {match.opponent}
        </p>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-soft">
          <span className="inline-flex items-center gap-1">
            <Calendar size={11} />
            {match.date}
          </span>
          <span className="hidden text-line-strong sm:inline">·</span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={11} />
            <span className="truncate">{match.location}</span>
          </span>
        </p>
      </div>
    </div>
  );
}

export function MatchList({
  title,
  matches,
  isResults = false,
  footerLink,
}: {
  title: string;
  matches: MatchItem[];
  isResults?: boolean;
  footerLink?: { href: string; label: string };
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-(--radius-lg) border border-line bg-white">
      <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
        <h3 className="font-display text-lg uppercase tracking-tight text-ink">
          {title}
        </h3>
        <span className="rounded-full bg-mist px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
          {isResults ? "Résultats" : "À venir"}
        </span>
      </div>

      <ul className="flex-1 divide-y divide-line">
        {matches.map((m) => (
          <li key={m.id} className="px-5 py-4 sm:px-6">
            {isResults ? (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-ocean">
                    {m.competition}
                  </p>
                  {m.date && (
                    <p className="text-[11px] text-ink-soft">{m.date}</p>
                  )}
                </div>
                <MatchScoreboard match={m} />
              </div>
            ) : (
              <UpcomingRow match={m} />
            )}
          </li>
        ))}
      </ul>

      {footerLink && (
        <div className="border-t border-line bg-mist/50 px-5 py-3 sm:px-6">
          <Link
            href={footerLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-ocean transition hover:underline"
          >
            {footerLink.label}
          </Link>
        </div>
      )}
    </div>
  );
}
