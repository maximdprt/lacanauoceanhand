import type { Metadata } from "next";

import { HeroSection } from "@/components/sections/hero-section";
import { EventBanner } from "@/components/sections/event-banner";
import { FiliereCards } from "@/components/sections/filiere-cards";
import { ScorencoEmbed } from "@/components/sections/scorenco-embed";
import { PartnersCarousel } from "@/components/sections/partners-carousel";
import { Faq } from "@/components/sections/faq";
import { JoinCta } from "@/components/sections/join-cta";
import { SectionTitle } from "@/components/common/section-title";
import { Reveal } from "@/components/common/reveal";
import { JsonLd } from "@/components/common/json-ld";
import { buildMetadata, siteConfig } from "@/lib/site";

import { faqItems, forumAssociations, partners } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  // Title ≤ 60 caractères, description 120-155 : non tronqués en SERP.
  title: "Club de handball à Lacanau",
  description:
    "Club de handball à Lacanau (Gironde), vainqueur de la Coupe de France 2024. Baby hand, jeunes, seniors, beach handball : inscriptions ouvertes.",
  path: "/",
});

/* Données structurées de l'événement mis en avant — émises tant
   que la date n'est pas passée (revérifié à chaque déploiement). */
const forumSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${forumAssociations.title} de ${forumAssociations.city}`,
  description: forumAssociations.description,
  startDate: forumAssociations.startDate,
  endDate: forumAssociations.endDate,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  isAccessibleForFree: true,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  location: {
    "@type": "Place",
    name: forumAssociations.venue,
    address: {
      "@type": "PostalAddress",
      addressLocality: forumAssociations.city,
      postalCode: siteConfig.postalCode,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
  },
  performer: {
    "@type": "SportsClub",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

/* Évalué au chargement du module, donc au build : les données
   structurées de l'événement disparaissent au déploiement suivant
   sa date. Le bandeau, lui, se retire tout seul côté client. */
const forumUpcoming = new Date(forumAssociations.endDate).getTime() > Date.now();

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* RENDEZ-VOUS À VENIR — se retire seul une fois la date passée */}
      <section className="container-x pt-12 md:pt-16">
        {forumUpcoming && <JsonLd data={forumSchema} />}
        <EventBanner event={forumAssociations} />
      </section>

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
