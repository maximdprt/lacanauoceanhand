import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HeroSection } from "@/components/sections/hero-section";
import { StatBand } from "@/components/sections/stat-band";
import { FiliereCards } from "@/components/sections/filiere-cards";
import { MatchList } from "@/components/sections/matches-widget";
import { NewsPreview } from "@/components/sections/news-preview";
import { Faq } from "@/components/sections/faq";
import { PartnersCarousel } from "@/components/sections/partners-carousel";
import { SectionTitle } from "@/components/common/section-title";
import { Reveal } from "@/components/common/reveal";
import { Button } from "@/components/ui/button";

import {
  faqItems,
  latestResults,
  newsItems,
  partners,
  upcomingMatches,
} from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatBand />

      {/* FILIÈRES */}
      <section className="container-x py-20 md:py-28">
        <Reveal>
          <SectionTitle
            index="01"
            eyebrow="Deux façons de jouer"
            title="Salle & beach handball"
            description="Le handball à Lacanau se vit toute l'année en salle et l'été sur le sable. Choisissez votre terrain de jeu."
          />
        </Reveal>
        <div className="mt-10 md:mt-14">
          <Reveal delay={0.05}>
            <FiliereCards />
          </Reveal>
        </div>
      </section>

      {/* MATCH CENTER */}
      <section className="border-y border-line bg-mist">
        <div className="container-x py-20 md:py-28">
          <Reveal>
            <SectionTitle
              index="02"
              eyebrow="Match center"
              title="Le club en compétition"
              description="Retrouvez les prochaines rencontres et le parcours victorieux de nos seniors en Coupe de France."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:mt-14 lg:grid-cols-2">
            <Reveal>
              <MatchList title="Prochains matchs" matches={upcomingMatches} />
            </Reveal>
            <Reveal delay={0.08}>
              <MatchList title="Derniers résultats" matches={latestResults} isResults />
            </Reveal>
          </div>
          <div className="mt-8">
            <Link href="/saison">
              <Button variant="outline" size="md">
                Voir toute la saison <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ACTUALITÉS */}
      <section className="container-x py-20 md:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              index="03"
              eyebrow="Actualités"
              title="La vie du club"
              description="Titres, évènements et moments forts de la saison à Lacanau."
            />
            <Link href="/evenements" className="hidden sm:block">
              <Button variant="ghost" size="md">
                Toutes les actus <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 md:mt-14">
          <NewsPreview items={newsItems} />
        </div>
      </section>

      {/* FAQ — SEO */}
      <section className="border-t border-line bg-mist">
        <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionTitle
              index="04"
              eyebrow="Questions fréquentes"
              title="Tout savoir sur le club"
              description="Inscriptions, âges, lieux d'entraînement : les réponses aux questions les plus posées sur le handball à Lacanau."
            />
          </Reveal>
          <Reveal delay={0.06}>
            <Faq items={faqItems} />
          </Reveal>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section className="container-x py-20 md:py-24">
        <Reveal>
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
            Ils soutiennent le club
          </p>
          <PartnersCarousel partners={partners} />
        </Reveal>
      </section>

      {/* CTA */}
      <section className="container-x pb-24">
        <div className="clip-diagonal-b relative overflow-hidden rounded-[var(--radius-lg)] bg-ink px-7 py-16 md:px-16 md:py-20">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute right-28 top-8 h-40 w-40 rounded-full border border-white/10" />
          <div className="relative max-w-2xl">
            <h2 className="headline text-[clamp(2rem,5.5vw,3.5rem)] text-white">
              Envie de jouer&nbsp;?
            </h2>
            <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-white/75">
              Joueur, bénévole ou partenaire : rejoignez l'aventure Lacanau Océhand
              dès aujourd'hui.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/rejoindre">
                <Button variant="light" size="lg">
                  Rejoindre le club <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white hover:text-ink"
                >
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
