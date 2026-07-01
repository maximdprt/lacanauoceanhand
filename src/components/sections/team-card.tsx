import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { teamGroups } from "@/data/site";
import type { Team } from "@/types";

export function TeamCard({ team }: { team: Team }) {
  return (
    <div className="card-lift group overflow-hidden rounded-(--radius-lg) border border-line bg-white">
      <div className="relative aspect-4/3 overflow-hidden sm:aspect-3/2">
        <Image
          src={team.image}
          alt={`${team.name} · Lacanau Océhand, club de handball à Lacanau`}
          fill
          className="object-cover object-[center_25%] transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/55 via-transparent to-transparent" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl uppercase leading-tight text-ink">{team.name}</h3>
          <Badge className="shrink-0">
            {teamGroups.find((g) => g.id === team.group)?.label ?? team.group}
          </Badge>
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{team.description}</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-ocean">
          Coach : {team.coach}
        </p>
        <Link
          href={`/equipes/${team.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink transition hover:text-ocean [&>svg]:transition-transform group-hover:[&>svg]:translate-x-1"
        >
          Voir l&apos;équipe <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
