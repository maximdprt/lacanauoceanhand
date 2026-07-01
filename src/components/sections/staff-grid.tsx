"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { bureau, staffMembers } from "@/data/site";
import type { StaffMember } from "@/types";
import { cn } from "@/lib/utils";

function StaffCard({ member }: { member: StaffMember }) {
  return (
    <article className="card-lift flex items-center gap-4 rounded-2xl border border-line bg-white p-4">
      {member.image ? (
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-1 ring-line">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ocean-tint">
          <span className="font-display text-xl uppercase text-ocean">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </span>
        </div>
      )}
      <div className="min-w-0">
        <h3 className="truncate font-display text-lg uppercase leading-tight text-ink">
          {member.name}
        </h3>
        <p className="mt-0.5 text-sm text-ocean">{member.role}</p>
        <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-ink-soft">
          {member.pole}
        </p>
      </div>
    </article>
  );
}

export function StaffGrid() {
  const allMembers = useMemo(() => [...bureau, ...staffMembers], []);
  const poles = useMemo(
    () => ["Tous", ...Array.from(new Set(allMembers.map((m) => m.pole)))],
    [allMembers],
  );
  const [activePole, setActivePole] = useState("Tous");

  const filtered = useMemo(() => {
    if (activePole === "Tous") return allMembers;
    return allMembers.filter((member) => member.pole === activePole);
  }, [activePole, allMembers]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {poles.map((pole) => (
          <button
            key={pole}
            type="button"
            onClick={() => setActivePole(pole)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition",
              activePole === pole
                ? "border-ocean bg-ocean text-white"
                : "border-line text-ink-soft hover:border-ink hover:text-ink",
            )}
          >
            {pole}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((member) => (
          <StaffCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
