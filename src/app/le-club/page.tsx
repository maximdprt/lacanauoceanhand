import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buildMetadata } from "@/lib/site";
import { PageHero } from "@/components/sections/page-hero";
import { SectionTitle } from "@/components/common/section-title";
import { Reveal } from "@/components/common/reveal";
import { PageNav } from "@/components/layout/page-nav";
import { StaffGrid } from "@/components/sections/staff-grid";
import { SupportClub } from "@/components/sections/support-club";
import { cn } from "@/lib/utils";
import { timelineEvents, salles } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "Le club, champion de France 2024",
  description:
    "Né en 2017, Lacanau Océhand est champion de France 2024. Histoire en images, salles, staff et encadrement de chaque catégorie du club de handball de Lacanau.",
  path: "/le-club",
});

const sections = [
  { id: "histoire", label: "Notre histoire" },
  { id: "lieux", label: "Nos lieux" },
  { id: "staff", label: "Le staff" },
  { id: "soutenir", label: "Nous soutenir" },
];

export default function ClubPage() {
  return (
    <>
      <PageHero
        image="/media/club/vestiaire-celebration.jpg"
        imageAlt="Les joueurs de Lacanau Océhand célèbrent une victoire dans le vestiaire"
        eyebrow="Le club"
        title="Le club de handball à Lacanau"
        description="Chaque aventure sportive est avant tout une aventure humaine. Voici la nôtre, depuis 2017."
      />

      <PageNav items={sections} />

      {/* HISTOIRE — intro + timeline en images */}
      <section id="histoire" className="container-x section-pad scroll-mt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <span className="eyebrow text-ink-soft">Notre histoire</span>
              <blockquote className="mt-5 font-display text-[clamp(1.6rem,3.5vw,2.4rem)] uppercase leading-[1.05] tracking-tight text-ink">
                «&nbsp;Chaque aventure sportive est avant tout une aventure
                humaine&nbsp;»
              </blockquote>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
                <p>
                  Le 4 juin 2017, Thierry Mayeur fonde Lacanau Océhand, entouré de
                  sa famille, avec une idée simple : offrir aux Canaulais un club de
                  handball ouvert à tous, où l’on progresse ensemble dans la bonne
                  humeur.
                </p>
                <p>
                  En quelques saisons, le club est devenu une référence en Gironde,
                  triple champion départemental, vainqueur de la Coupe de France
                  2024 à Bercy puis champion de France de beach handball en 2026,
                  tout en gardant son esprit familial et bénévole.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative aspect-4/3 overflow-hidden rounded-(--radius-lg) border border-line">
              <Image
                src="/media/club/club-famille.jpg"
                alt="La famille du club Lacanau Océhand"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* Timeline en images marquantes */}
        <div className="mt-16 md:mt-24">
          <Reveal>
            <SectionTitle
              eyebrow="Étapes clés"
              title="Une ascension rapide, en images"
              description="Du premier ballon lancé en 2017 jusqu'au sacre national, les moments qui ont écrit l'histoire du club."
            />
          </Reveal>
          <div className="mt-12 space-y-12 md:mt-16 md:space-y-20">
            {timelineEvents.map((ev, i) => (
              <Reveal key={ev.year}>
                <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                  {ev.image && (
                    <div
                      className={cn(
                        "group relative aspect-4/3 overflow-hidden rounded-(--radius-lg) border border-line",
                        i % 2 === 1 && "md:order-2",
                      )}
                    >
                      <Image
                        src={ev.image}
                        alt={`${ev.year} — ${ev.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="img-zoom object-cover"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-4 py-1.5 font-display text-lg uppercase tracking-tight text-white">
                        {ev.year}
                      </span>
                    </div>
                  )}
                  <div className={cn(i % 2 === 1 && "md:order-1")}>
                    <span className="section-index text-[clamp(2.4rem,5vw,3.5rem)] text-ocean">
                      {ev.year}
                    </span>
                    <h3 className="mt-2 headline text-2xl text-ink md:text-3xl">
                      {ev.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-ink-soft">
                      {ev.description}
                    </p>
                    {ev.year === "2024" && (
                      <Link
                        href="/le-club/coupe-de-france-2024"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ocean transition hover:text-ocean-deep"
                      >
                        Revivez la finale à Bercy
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LES LIEUX */}
      <section id="lieux" className="band scroll-mt-32">
        <div className="container-x section-pad">
          <Reveal>
            <SectionTitle
              eyebrow="Nos lieux"
              title="Où l'on joue"
              description="Trois lieux pour pratiquer le handball à Lacanau, en salle comme sur le sable."
            />
          </Reveal>
          <div className="section-body grid gap-6 md:grid-cols-3">
            {salles.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.06} className="h-full">
                <div className="card-lift group flex h-full flex-col overflow-hidden rounded-(--radius) border border-line bg-paper">
                  <div className="relative aspect-16/10 overflow-hidden bg-mist-2">
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="img-zoom object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="font-display text-5xl uppercase text-line-strong">
                          {s.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold text-ink">{s.name}</h3>
                    <p className="mt-2 flex-1 text-base leading-relaxed text-ink-soft">
                      {s.usage}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-ocean">{s.address}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LE STAFF */}
      <section id="staff" className="container-x section-pad scroll-mt-32">
        <Reveal>
          <SectionTitle
            eyebrow="L'équipe"
            title="Le staff & l'encadrement"
            description="Des bénévoles passionnés font vivre le club au quotidien, sur et en dehors du terrain."
          />
        </Reveal>
        <div className="section-body">
          <StaffGrid />
        </div>
      </section>

      {/* SOUTENIR LE CLUB */}
      <section id="soutenir" className="band scroll-mt-32">
        <div className="container-x section-pad">
          <Reveal>
            <SectionTitle
              eyebrow="Nous soutenir"
              title="Faire vivre le club"
              description="Le club fonctionne grâce à ses bénévoles et à celles et ceux qui le soutiennent. Trois façons simples de donner un coup de main."
            />
          </Reveal>
          <div className="section-body">
            <Reveal delay={0.05}>
              <SupportClub />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
