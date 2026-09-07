import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, User, ArrowRight } from "lucide-react";

import { buildMetadata } from "@/lib/site";
import { PageHero } from "@/components/sections/page-hero";
import { SectionTitle } from "@/components/common/section-title";
import { PageNav } from "@/components/layout/page-nav";
import { TrainingSchedule } from "@/components/sections/training-schedule";
import { CoachingTable } from "@/components/sections/coaching-table";
import { Reveal } from "@/components/common/reveal";
import { buttonVariants } from "@/components/ui/button";
import { teamGroups } from "@/data/site";
import { getSiteContent } from "@/lib/content";
import type { Team } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Équipes et créneaux d'entraînement",
  description:
    "Toutes les équipes de Lacanau Océhand et le planning des entraînements de la semaine : baby hand, jeunes, seniors, beach, école de gardien et d'arbitrage.",
  path: "/equipes",
});

const sections = [
  { id: "salle", label: "En salle" },
  { id: "beach", label: "Beach" },
  { id: "creneaux", label: "Créneaux" },
  { id: "encadrement", label: "Encadrement" },
];

const group = (id: Team["group"]) => teamGroups.find((g) => g.id === id);

function TeamCard({ team }: { team: Team }) {
  const g = group(team.group);
  const color = g?.color ?? "var(--c-senior)";
  // Texte blanc et icône porteuse de sens : version lisible de la teinte.
  const ink = g?.ink ?? "var(--c-senior)";

  return (
    <div className="card-lift group flex h-full flex-col overflow-hidden rounded-(--radius) border border-line bg-white">
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={team.image}
          alt={team.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="img-zoom object-cover"
        />
        <div className="absolute left-0 top-0 h-1.5 w-full" style={{ background: color }} />
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-(--shadow-sm)"
          style={{ background: ink }}
        >
          {g?.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-ink">
          <Link
            href={`/equipes/${team.slug}`}
            className="transition hover:text-ocean focus-visible:text-ocean"
          >
            {team.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-ink-soft">{team.age}</p>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">{team.description}</p>

        {/* Créneaux d'entraînement */}
        <div className="mt-5 rounded-(--radius-sm) border border-line bg-mist/60 p-4">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">
            <Clock size={14} style={{ color: ink }} aria-hidden="true" />
            Créneaux d&apos;entraînement
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {team.schedule.map((s) => (
              <li
                key={s}
                className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-ink shadow-(--shadow-xs)"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Entraîneur */}
        {/* flex-wrap + nowrap sur le libellé : en 320 px, « Entraîneur · »
            se coupait entre le mot et le point médian. */}
        <p className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-line pt-4 text-sm">
          <User size={15} className="shrink-0 translate-y-0.5 text-ocean" aria-hidden="true" />
          <span className="whitespace-nowrap text-ink-soft">Entraîneur ·</span>
          <span className="font-semibold text-ink">{team.coach}</span>
        </p>

        <Link
          href={`/equipes/${team.slug}`}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean transition hover:text-ocean-deep"
        >
          Calendrier &amp; résultats
          <ArrowRight size={15} aria-hidden="true" />
          <span className="sr-only">de l&apos;équipe {team.name}</span>
        </Link>
      </div>
    </div>
  );
}

export default async function TeamsPage() {
  const contenu = await getSiteContent();
  const salleTeams = contenu.teams.filter((t) => t.group !== "beach");
  const beachTeams = contenu.teams.filter((t) => t.group === "beach");

  return (
    <>
      <PageHero
        image="/media/action/duel-1.jpg"
        imageAlt="Duel entre deux joueurs lors d'un match de handball de Lacanau Océhand"
        eyebrow="Nos équipes"
        title="Une équipe pour chaque joueur"
        description="Du baby handball aux seniors, en salle et sur le sable : retrouvez chaque équipe avec sa photo, ses créneaux d'entraînement et son entraîneur."
      />

      <PageNav items={sections} />

      {/* SALLE */}
      <section id="salle" className="container-x section-pad scroll-mt-32">
        <Reveal>
          <SectionTitle
            eyebrow="Handball en salle"
            title="Les équipes en salle"
            description="Entraînements à la salle de la Cousteyre et au Cosec, à Lacanau. Horaires officiels du guide du licencié : le planning complet de la semaine est juste en dessous."
          />
        </Reveal>
        <div className="section-body grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {salleTeams.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 3) * 0.05} className="h-full">
              <TeamCard team={t} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* BEACH */}
      <section id="beach" className="band scroll-mt-32">
        <div className="container-x section-pad">
          <Reveal>
            <SectionTitle
              eyebrow="Beach handball"
              title="La section beach"
              description="Le hand sur le sable du Pôle de l'Ardilouse, de mai à août. Dès l'U13 et pour les adultes."
            />
          </Reveal>
          <div className="section-body grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {beachTeams.map((t, i) => (
              <Reveal key={t.slug} delay={i * 0.05} className="h-full">
                <TeamCard team={t} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-10">
              <Link href="/beach" className={buttonVariants({ variant: "ocean", size: "md" })}>
                Découvrir la section beach <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CRÉNEAUX — planning complet de la semaine */}
      <section id="creneaux" className="container-x section-pad scroll-mt-32">
        <Reveal>
          <SectionTitle
            eyebrow={`Saison ${contenu.licenceSeason}`}
            title="Les créneaux d'entraînement"
            description="Toute la semaine, groupe par groupe et salle par salle, tels que publiés dans le guide du licencié."
          />
        </Reveal>
        <div className="section-body">
          <Reveal delay={0.05}>
            <TrainingSchedule slots={contenu.trainingSlots} />
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="mt-6 text-sm text-ink-soft">
            Un doute sur un horaire&nbsp;?{" "}
            <a
              href={contenu.links.guideLicencie}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ocean hover:underline"
            >
              Téléchargez le guide du licencié
            </a>{" "}
            ou demandez confirmation à l&apos;entraîneur de votre catégorie.
          </p>
        </Reveal>
      </section>

      {/* ENCADREMENT — qui entraîne quel groupe */}
      <section id="encadrement" className="band scroll-mt-32">
        <div className="container-x section-pad">
          <Reveal>
            <SectionTitle
              eyebrow="Encadrement"
              title="Qui entraîne quelle catégorie"
              description="Chaque groupe a ses entraîneurs attitrés, coordonnés pour la filière jeunes par Paul Mourioux."
            />
          </Reveal>
          <div className="section-body">
            <Reveal delay={0.05}>
              <CoachingTable
                assignments={contenu.coachAssignments}
                youthLead={contenu.youthLead}
                season={contenu.licenceSeason}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x section-pad-sm flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-2xl uppercase tracking-tight text-ink md:text-3xl">
            Vous voulez essayer&nbsp;?
          </h2>
          <p className="mt-2 text-base text-ink-soft">
            Premier entraînement découverte offert, toutes catégories.
          </p>
        </div>
        <Link href="/rejoindre" className={buttonVariants({ variant: "ocean", size: "lg" })}>
          S&apos;inscrire au club <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
