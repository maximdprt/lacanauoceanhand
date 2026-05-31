import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { teams, upcomingMatches } from "@/data/site";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return teams.map((team) => ({ slug: team.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const team = teams.find((item) => item.slug === params.slug);

  if (!team) {
    return { title: "Equipe introuvable" };
  }

  return {
    title: `${team.name} | Lacanau Ocehand`,
    description: `Page equipe ${team.name}: coach, calendrier et actualites du handball lacanau.`,
  };
}

export default function TeamDetailPage({ params }: { params: Params }) {
  const team = teams.find((item) => item.slug === params.slug);

  if (!team) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <header className="rounded-xl border border-slate-200 bg-card p-4 sm:p-6">
        <Badge>{team.category}</Badge>
        <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-md border border-slate-200 sm:aspect-[16/9]">
          <Image
            src={team.image}
            alt={team.name}
            fill
            className="object-cover object-[center_25%]"
            sizes="(max-width: 1280px) 100vw, 80vw"
          />
        </div>
        <h1 className="mt-3 font-display text-4xl uppercase text-slate-900 sm:text-5xl">{team.name}</h1>
        <p className="mt-2 text-slate-600">{team.description}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent>
            <h2 className="font-display text-2xl uppercase text-slate-900 sm:text-3xl">Coach</h2>
            <p className="mt-2 text-slate-600">{team.coach}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="font-display text-2xl uppercase text-slate-900 sm:text-3xl">Calendrier entrainement</h2>
            <ul className="mt-2 space-y-2 text-slate-600">
              {team.schedule.map((slot) => (
                <li key={slot}>- {slot}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <h2 className="font-display text-2xl uppercase text-slate-900 sm:text-3xl">Prochains matchs</h2>
          <ul className="mt-3 space-y-2">
            {upcomingMatches.slice(0, 3).map((match) => (
              <li key={match.id} className="rounded-md border border-slate-200 bg-slate-50 p-3 text-slate-700">
                {match.date} - {match.opponent} ({match.competition})
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

