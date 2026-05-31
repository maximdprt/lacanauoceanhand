"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { staffMembers } from "@/data/site";
import type { StaffMember } from "@/types";

const poles: Array<StaffMember["pole"] | "Tous"> = [
  "Tous",
  "Direction",
  "Formation",
  "Sportif",
  "Medical",
  "Communication",
];

export function StaffGrid() {
  const [activePole, setActivePole] = useState<(typeof poles)[number]>("Tous");

  const filtered = useMemo(() => {
    if (activePole === "Tous") return staffMembers;
    return staffMembers.filter((member) => member.pole === activePole);
  }, [activePole]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {poles.map((pole) => (
          <button
            key={pole}
            onClick={() => setActivePole(pole)}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-wider transition ${
              activePole === pole
                ? "border-ocean bg-ocean/15 text-ocean"
                : "border-slate-300 bg-white text-slate-600"
            }`}
          >
            {pole}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((member) => (
          <Card key={member.id}>
            <CardContent>
              <div className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100 p-3 sm:min-h-[300px]">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={900}
                  height={1200}
                  className="max-h-[min(420px,50vh)] w-auto max-w-full object-contain"
                  sizes="(max-width: 768px) 90vw, (max-width: 1280px) 40vw, 320px"
                />
              </div>
              <p className="mt-4 font-display text-2xl uppercase text-slate-900">{member.name}</p>
              <p className="text-sm text-ocean">{member.role}</p>
              <p className="mt-2 text-xs uppercase tracking-wider text-slate-500">{member.pole}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
