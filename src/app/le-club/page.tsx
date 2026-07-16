import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buildMetadata } from "@/lib/site";
import { PageHero } from "@/components/sections/page-hero";
import { SectionTitle } from "@/components/common/section-title";
import { Reveal } from "@/components/common/reveal";
import {
  bureau,
  palmares,
  salles,
  staffMembers,
  timelineEvents,
} from "@/data/site";
import type { StaffMember } from "@/types";

export const metadata = buildMetadata({
  title: "Le club",
  description:
    "Né en 2017, Lacanau Océhand est champion de France 2024. Histoire, palmarès, staff et salles du club de handball de Lacanau, en Gironde.",
  path: "/le-club",
});

/** Lien de fin de section vers la page détaillée (maillage interne). */
function SectionLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-ocean transition hover:text-ocean-deep"
    >
      {label}
      <ArrowRight size={15} aria-hidden="true" />
    </Link>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function StaffAvatar({ member }: { member: StaffMember }) {
  if (member.image) {
    return (
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
        <Image src={member.image} alt={member.name} fill className="object-cover" />
      </div>
    );
  }
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ocean-tint font-display text-base text-ocean">
      {initials(member.name)}
    </span>
  );
}

export default function ClubPage() {
  return (
    <>
      <PageHero
        eyebrow="Le club"
        title="Le club de handball à Lacanau"
        description="Chaque aventure sportive est avant tout une aventure humaine. Voici la nôtre, depuis 2017."
      />

      {/* HISTOIRE + DEVISE */}
      <section className="container-x py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
                Notre histoire
              </span>
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
                  triple champion départemental et vainqueur de la Coupe de France
                  2024 à Bercy, tout en gardant son esprit familial et bénévole.
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
      </section>

      {/* TIMELINE */}
      <section className="border-y border-line bg-mist">
        <div className="container-x py-16 md:py-24">
          <Reveal>
            <SectionTitle
              index="01"
              eyebrow="Étapes clés"
              title="Une ascension rapide"
            />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-(--radius) border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {timelineEvents.map((ev, i) => (
              <Reveal key={ev.year} delay={i * 0.06}>
                <div className="h-full bg-paper p-7">
                  <span className="section-index text-[clamp(2.4rem,4vw,3.2rem)] text-ocean">
                    {ev.year}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-ink">{ev.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-ink-soft">
                    {ev.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <SectionLink
            href="/le-club/histoire-palmares"
            label="Voir l'histoire et le palmarès en détail"
          />
        </div>
      </section>

      {/* PALMARÈS */}
      <section className="container-x py-16 md:py-24">
        <Reveal>
          <SectionTitle
            index="02"
            eyebrow="Palmarès"
            title="Nos titres"
            description="Trois saisons de référence qui ont écrit l'histoire du club."
          />
        </Reveal>
        <div className="mt-12 space-y-4">
          {palmares.map((p, i) => (
            <Reveal key={p.season} delay={i * 0.06}>
              <div className="grid gap-4 rounded-(--radius) border border-line bg-white p-6 md:grid-cols-[200px_1fr] md:items-center md:p-8">
                <span className="font-display text-xl uppercase tracking-tight text-ink">
                  {p.season}
                </span>
                <ul className="space-y-2">
                  {p.lines.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-3 text-base leading-relaxed text-ink-soft"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-c-beach" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SALLES */}
      <section className="border-y border-line bg-mist">
        <div className="container-x py-16 md:py-24">
          <Reveal>
            <SectionTitle
              index="03"
              eyebrow="Nos salles"
              title="Où l'on joue"
              description="Trois lieux pour pratiquer le handball à Lacanau, en salle comme sur le sable."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {salles.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.06}>
                <div className="h-full overflow-hidden rounded-(--radius) border border-line bg-paper">
                  <div className="relative aspect-16/10 overflow-hidden bg-mist-2">
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="font-display text-5xl uppercase text-line-strong">
                          {s.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-ink">{s.name}</h3>
                    <p className="mt-2 text-base leading-relaxed text-ink-soft">
                      {s.usage}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-ocean">{s.address}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <SectionLink href="/le-club/salles" label="Adresses et plans d'accès des salles" />
        </div>
      </section>

      {/* ENCADREMENT */}
      <section className="container-x py-16 md:py-24">
        <Reveal>
          <SectionTitle
            index="04"
            eyebrow="L'équipe"
            title="Le bureau & l'encadrement"
            description="Des bénévoles passionnés font vivre le club au quotidien, sur et en dehors du terrain."
          />
        </Reveal>

        <h3 className="mt-12 mb-5 text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
          Le bureau
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bureau.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.05}>
              <div className="flex h-full items-center gap-4 rounded-(--radius) border border-line bg-white p-5">
                <StaffAvatar member={m} />
                <div className="min-w-0">
                  <p className="font-bold text-ink">{m.name}</p>
                  <p className="text-sm leading-snug text-ink-soft">{m.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <h3 className="mt-12 mb-5 text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
          Staff technique & encadrement
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {staffMembers.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.04}>
              <div className="flex h-full items-center gap-4 rounded-(--radius) border border-line bg-white p-5">
                <StaffAvatar member={m} />
                <div className="min-w-0">
                  <p className="font-bold text-ink">{m.name}</p>
                  <p className="text-sm leading-snug text-ink-soft">{m.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <SectionLink href="/le-club/staff" label="Découvrir tout le staff du club" />
      </section>
    </>
  );
}
