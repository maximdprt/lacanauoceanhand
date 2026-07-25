import type { Metadata } from "next";

import { HeroSection } from "@/components/sections/hero-section";
import { FiliereCards } from "@/components/sections/filiere-cards";
import { ScorencoEmbed } from "@/components/sections/scorenco-embed";
import { PartnersCarousel } from "@/components/sections/partners-carousel";
import { Faq } from "@/components/sections/faq";
import { JoinCta } from "@/components/sections/join-cta";
import { SectionTitle } from "@/components/common/section-title";
import { Reveal } from "@/components/common/reveal";
import { buildMetadata } from "@/lib/site";

import { faqItems, partners } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  // Title ≤ 60 caractères, description 120-155 : non tronqués en SERP.
  title: "Club de handball à Lacanau",
  description:
    "Club de handball à Lacanau (Gironde), vainqueur de la Coupe de France 2024. Baby hand, jeunes, seniors, beach handball : inscriptions ouvertes.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* SALLE & BEACH — deux façons de jouer, chaque carte mène aux équipes */}
      <section className="container-x section-pad">
        <Reveal>
          <SectionTitle
            title="Salle & beach handball"
            description="Deux façons de vivre le hand à Lacanau. Choisissez votre terrain pour découvrir les équipes et leurs créneaux d'entraînement."
            align="center"
          />
        </Reveal>
        <div className="mt-10 md:mt-14">
          <Reveal delay={0.05}>
            <FiliereCards />
          </Reveal>
        </div>
      </section>

      {/* LA SAISON — matchs à venir + lien Score'n'co */}
      <section id="saison" className="scroll-mt-24 border-y border-line bg-mist">
        <div className="container-x section-pad">
          <Reveal>
            <SectionTitle
              eyebrow="La saison"
              title="Les prochains matchs"
              description="Calendrier et résultats officiels du club, mis à jour au fil de la saison via Score'n'co."
              align="center"
            />
          </Reveal>
          <div className="mt-10 md:mt-14">
            <ScorencoEmbed />
          </div>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section className="container-x section-pad">
        <Reveal>
          <SectionTitle title="Ils soutiennent le club" align="center" />
        </Reveal>
        <div className="mt-10 md:mt-14">
          <PartnersCarousel partners={partners} />
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-line bg-mist">
        <div className="container-x section-pad">
          <Reveal>
            <SectionTitle title="Tout savoir sur le club" align="center" />
          </Reveal>
          <div className="mx-auto mt-10 max-w-2xl md:mt-14">
            <Reveal delay={0.06}>
              <Faq items={faqItems} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* REJOINDRE LE CLUB */}
      <section className="container-x section-pad">
        <Reveal>
          <SectionTitle
            title="Rejoindre le club"
            description="Une place pour chacun, du baby hand aux seniors, en salle comme sur le sable. La licence inclut l'équipement et l'accès à tous les créneaux de la catégorie."
            align="center"
          />
        </Reveal>
        <div className="mt-10 md:mt-14">
          <JoinCta />
        </div>
      </section>
    </>
  );
}
