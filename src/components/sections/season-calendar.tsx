"use client";

import { useMemo, useState } from "react";

import type { MatchItem } from "@/types";

const months = ["Mai", "Juin", "Juillet"];

export function SeasonCalendar({ matches }: { matches: MatchItem[] }) {
  const [activeMonth, setActiveMonth] = useState(months[0]);

  const filtered = useMemo(
    () => matches.filter((match) => match.date.toLowerCase().includes(activeMonth.toLowerCase())),
    [activeMonth, matches],
  );

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap gap-2">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => setActiveMonth(month)}
            className={`rounded-md border px-4 py-2 text-xs uppercase tracking-widest ${
              activeMonth === month
                ? "border-ocean bg-ocean/15 text-ocean"
                : "border-slate-300 text-slate-600"
            }`}
          >
            {month}
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-600">
        Mockup API FFHandball. La connexion API sera branchee dans la phase admin/data.
      </p>
      <ul className="space-y-3">
        {filtered.map((match) => (
          <li key={match.id} className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <p className="text-ocean">{match.competition}</p>
            <p className="font-semibold text-slate-900">{match.opponent}</p>
            <p className="text-sm text-slate-600">
              {match.date} - {match.location}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
