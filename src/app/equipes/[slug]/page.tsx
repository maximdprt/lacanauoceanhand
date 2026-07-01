import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScorencoWidget } from "@/components/sections/scorenco-widget";
import { teamGroups, teamSignupEmail, teams } from "@/data/site";
import { buildMetadata, siteConfig } from "@/lib/site";
import { getTeamWidgetId, scorencoClubUrl } from "@/lib/scorenco";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return teams.map((team) => ({ slug: team.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const team = teams.find((item) => item.slug === slug);

  if (!team) {
    return { title: "Équipe introuvable" };
  }

  return buildMetadata({
    title: team.name,
    description: `${team.name} de Lacanau Océhand · ${team.description} Rejoignez le club de handball de Lacanau (Gironde).`,
    path: `/equipes/${team.slug}`,
    keywords: [`${team.name} handball Lacanau`, `handball ${team.age} Lacanau`],
  });
}

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const team = teams.find((item) => item.slug === slug);

  if (!team) {
    notFound();
  }

  const groupLabel = teamGroups.find((g) => g.id === team.group)?.label ?? team.group;
  const teamWidgetId = getTeamWidgetId(team.slug);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Nos équipes", item: `${siteConfig.url}/equipes` },
      { "@type": "ListItem", position: 3, name: team.name },
    ],
  };

  return (
    <div className="container-x space-y-10 py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Link
        href="/equipes"
        className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition hover:text-ocean"
      >
        <ArrowLeft size={16} />
        Retour aux équipes
      </Link>

      <header className="overflow-hidden rounded-3xl border border-line bg-white">
        <div className="relative aspect-video w-full overflow-hidden bg-mist sm:aspect-21/9">
          <Image
            src={team.image}
            alt={team.name}
            fill
            className="object-cover object-[center_25%]"
            sizes="(max-width: 1280px) 100vw, 80vw"
            priority
          />
        </div>
        <div className="space-y-4 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{groupLabel}</Badge>
            <span className="text-sm text-ink-soft">{team.age}</span>
          </div>
          <h1 className="headline text-4xl text-ink md:text-5xl">{team.name}</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-ink-soft">{team.description}</p>
          <a
            href={`mailto:${teamSignupEmail}?subject=${encodeURIComponent(`Inscription · ${team.name}`)}`}
            className="inline-flex items-center gap-2 rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-white transition hover:bg-ocean-deep"
          >
            <Mail size={15} />
            S&apos;inscrire dans cette équipe
          </a>
        </div>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <CardContent>
            <h2 className="font-display text-2xl uppercase text-ink">Encadrement</h2>
            <p className="mt-2 text-ink-soft">{team.coach}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="font-display text-2xl uppercase text-ink">Créneaux</h2>
            <ul className="mt-2 space-y-2 text-ink-soft">
              {team.schedule.map((slot) => (
                <li key={slot}>· {slot}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {teamWidgetId ? (
        <ScorencoWidget
          widgetId={teamWidgetId}
          title="Calendrier & résultats"
          badge={team.name}
          minHeight={480}
        />
      ) : (
        <Card>
          <CardContent>
            <h2 className="font-display text-2xl uppercase text-ink">Matchs & résultats</h2>
            <p className="mt-2 text-base leading-relaxed text-ink-soft">
              Consultez le calendrier complet de toutes les équipes sur{" "}
              <Link href="/saison" className="font-semibold text-ocean hover:underline">
                la page saison
              </Link>{" "}
              ou sur{" "}
              <a
                href={scorencoClubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ocean hover:underline"
              >
                Score&apos;n&apos;co
              </a>
              .
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
