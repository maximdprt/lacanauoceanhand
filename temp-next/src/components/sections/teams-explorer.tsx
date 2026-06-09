"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, Users, Shield, Flag } from "lucide-react";

import type { Team, TeamCategory } from "@/types";
import { teamGroups } from "@/data/site";
import { cn } from "@/lib/utils";

const groupIntros: Record<TeamCategory, string> = {
  seniors:
    "Nos équipes seniors portent les couleurs du club en compétition. Vainqueurs de la Coupe de France 2024, elles cultivent l'exigence et l'esprit de famille.",
  jeunes:
    "Nos sections jeunes accueillent les enfants dès 5 ans dans un environnement sécurisé et stimulant, encadrées par des bénévoles formés aux méthodes de la fédération.",
  beach: "",
  gardien: "",
  arbitrage: "",
};

const groupIcons: Record<TeamCategory, typeof Users> = {
  seniors: Users,
  jeunes: Users,
  beach: Waves,
  gardien: Shield,
  arbitrage: Flag,
};

export function TeamsExplorer({ teams }: { teams: Team[] }) {
  const [active, setActive] = useState<TeamCategory>("seniors");
  const group = teamGroups.find((g) => g.id === active)!;
  const list = teams.filter((t) => t.group === active);
  const Icon = groupIcons[active];
  const isFeatured = list.length === 1;

  return (
    <div>
      {/* Onglets */}
      <div className="-mx-5 mb-10 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2.5">
          {teamGroups.map((g) => {
            const on = g.id === active;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setActive(g.id)}
                className={cn(
                  "shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all",
                  on ? "text-white" : "border-line text-ink hover:border-ink",
                )}
                style={
                  on
                    ? { background: g.color, borderColor: g.color }
                    : undefined
                }
              >
                {g.label}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Intro de groupe */}
          {groupIntros[active] && (
            <p className="mb-8 max-w-3xl text-[17px] leading-relaxed text-ink-soft">
              {groupIntros[active]}
            </p>
          )}

          {isFeatured ? (
            <FeaturedTeam team={list[0]} color={group.color} Icon={Icon} />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((t) => (
                <TeamCard key={t.slug} team={t} color={group.color} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function TeamCard({ team, color }: { team: Team; color: string }) {
  return (
    <div className="overflow-hidden rounded-(--radius) border border-line bg-white transition hover:shadow-(--shadow-md)">
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={team.image}
          alt={team.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <div className="absolute left-0 top-0 h-1.5 w-full" style={{ background: color }} />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-ink">{team.name}</h3>
        <p className="mt-1 text-sm font-medium text-ink-soft">{team.age}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{team.description}</p>
        <p className="mt-4 border-t border-line pt-3 text-sm text-ink">
          <span className="text-ink-soft">Encadrement · </span>
          {team.coach}
        </p>
      </div>
    </div>
  );
}

function FeaturedTeam({
  team,
  color,
  Icon,
}: {
  team: Team;
  color: string;
  Icon: typeof Users;
}) {
  const meta = [
    { label: "Âge", value: team.age.split("·")[0].trim() },
    { label: "Quand", value: team.age.includes("·") ? team.age.split("·")[1].trim() : "Saison" },
    { label: "Format", value: team.schedule[0] },
    { label: "Encadrement", value: team.coach },
  ];
  return (
    <div
      className="overflow-hidden rounded-(--radius-lg) border-2 bg-white"
      style={{ borderColor: color }}
    >
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="p-7 md:p-9">
          <div className="flex items-center gap-4">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: `${color}1a`, color }}
            >
              <Icon size={22} />
            </span>
            <div>
              <h3 className="text-2xl font-bold text-ink">{team.name}</h3>
              <p className="text-sm text-ink-soft">Une discipline à part entière au club</p>
            </div>
          </div>
          <p className="mt-6 text-[16px] leading-relaxed text-ink-soft">{team.description}</p>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="rounded-xl bg-mist p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  {m.label}
                </p>
                <p className="mt-1 text-sm font-bold text-ink">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[260px] lg:min-h-full">
          <Image src={team.image} alt={team.name} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}
