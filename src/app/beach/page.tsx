import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Handshake, Trophy } from "lucide-react";

import { buildMetadata } from "@/lib/site";
import { PageHero } from "@/components/sections/page-hero";
import { PageNav } from "@/components/layout/page-nav";
import { BeachSection } from "@/components/sections/beach-section";
import { ShopSection } from "@/components/sections/shop-section";
import { SectionTitle } from "@/components/common/section-title";
import { Reveal } from "@/components/common/reveal";
import { helloAsso } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "Beach handball à Lacanau",
  description:
    "Le beach handball à Lacanau : licence à 100 €, entraînements sur le sable du Pôle de l'Ardilouse et tournoi Lacanau Beach Handball Xperience.",
  path: "/beach",
});

const sections = [
  { id: "beach", label: "La section" },
  { id: "licence", label: "Licence" },
  { id: "boutique", label: "Boutique" },
  { id: "lbhx", label: "LBHX" },
];

/* Deux engagements ouverts autour du Lacanau Beach Handball Xperience,
   gérés sur HelloAsso par le club. */
const lbhxActions = [
  {
    icon: Handshake,
    eyebrow: "Entreprises",
    title: "Devenir mécène du LBHX 2026",
    description:
      "Soutenez l'organisation du tournoi et associez votre nom à l'événement beach de l'été canaulais.",
    meta: "Montant libre",
    href: helloAsso.mecenat,
    cta: "Devenir mécène",
  },
  {
    icon: Trophy,
    eyebrow: "Équipes",
    title: "Tournoi partenaires LBHX 2026",
    description:
      "Le tournoi réservé aux partenaires du club, sur le sable canaulais. Inscription des équipes avant le 5 juin 2026.",
    meta: "Gratuit",
    href: helloAsso.tournoiPartenaires,
    cta: "Inscrire mon équipe",
  },
] as const;

export default function BeachPage() {
  return (
    <>
      <PageHero
        image="/media/beach/amsterdam.jpg"
        imageAlt="L'équipe de beach handball de Lacanau Océhand en tournoi sur le sable"
        eyebrow="Beach"
        title="Le beach handball à Lacanau"
        description="Le hand sur le sable, à deux pas de l'océan. Et chaque été, le rendez-vous du club : le Lacanau Beach Handball Xperience."
      />

      <PageNav items={sections} />

      <BeachSection />

      {/* LICENCE BEACH — le tarif, tout de suite */}
      <section id="licence" className="container-x section-pad scroll-mt-32">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-(--radius-lg) border border-line bg-mist p-7 md:flex-row md:items-center md:p-9">
            <div className="max-w-2xl">
              <span className="eyebrow text-ink-soft">La licence beach</span>
              <p className="mt-3 font-display text-[clamp(1.4rem,3vw,2rem)] uppercase leading-tight tracking-tight text-ink">
                100 € la saison, à tout âge
              </p>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                Et si vous êtes déjà licencié en salle au club, vous ne réglez que la
                licence la plus chère des deux : la seconde est offerte.
              </p>
            </div>
            <Link
              href="/rejoindre#tarifs"
              className="btn-press inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition hover:bg-c-beach-ink"
            >
              Voir tous les tarifs
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* BOUTIQUE */}
      <section id="boutique" className="band scroll-mt-32">
        <div className="container-x section-pad">
          <Reveal>
            <SectionTitle
              eyebrow="Boutique"
              title="Porter les couleurs du club"
              description="Textile et accessoires Lacanau Océhand, en commande directe sur HelloAsso. Chaque achat finance la vie du club."
            />
          </Reveal>
          <div className="section-body">
            <Reveal delay={0.05}>
              <ShopSection />
            </Reveal>
          </div>
        </div>
      </section>

      {/* LBHX — mécénat & tournoi partenaires */}
      <section id="lbhx" className="container-x section-pad scroll-mt-32">
        <Reveal>
          <SectionTitle
            eyebrow="Beach Handball Xperience"
            title="S'engager aux côtés du LBHX"
            description="Le tournoi de l'été se construit avec ses partenaires : deux façons d'en faire partie."
          />
        </Reveal>
        <div className="section-body grid gap-6 md:grid-cols-2">
          {lbhxActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Reveal key={action.title} delay={i * 0.06} className="h-full">
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift group flex h-full flex-col rounded-(--radius) border border-line bg-white p-7"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-c-beach/12 text-c-beach-ink">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <span className="eyebrow mt-5 text-ink-soft">{action.eyebrow}</span>
                  <h3 className="mt-2 text-xl font-bold text-ink">{action.title}</h3>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-ink-soft">
                    {action.description}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-c-beach-ink">{action.meta}</p>
                  <span className="mt-4 inline-flex items-center gap-2 border-t border-line pt-4 text-sm font-semibold text-ocean">
                    {action.cta}
                    <ExternalLink size={14} aria-hidden="true" />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
