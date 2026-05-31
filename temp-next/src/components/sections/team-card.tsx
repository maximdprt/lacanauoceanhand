import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Team } from "@/types";

export function TeamCard({ team }: { team: Team }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[3/2]">
        <Image
          src={team.image}
          alt={team.name}
          fill
          className="object-cover object-[center_22%] transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl uppercase leading-tight text-slate-900">{team.name}</h3>
          <Badge className="flex-shrink-0">{team.category}</Badge>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-2">{team.description}</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-ocean">
          Coach: {team.coach}
        </p>
        <Link
          href={`/equipes/${team.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700 transition hover:text-ocean"
        >
          Voir l&apos;equipe <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
