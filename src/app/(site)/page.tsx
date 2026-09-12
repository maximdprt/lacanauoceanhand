import type { Metadata } from "next";

import type { ClubHighlight } from "@/types";

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
import { getSiteContent } from "@/lib/content";
import { prochainEvenement } from "@/lib/evenements";

export const metadata: Metadata = buildMetadata({
  // Title ≤ 60 caractères, description 120-155 : non tronqués en SERP.
  title: "Club de handball à Lacanau",
  description:
    "Club de handball à Lacanau (Gironde), vainqueur de la Coupe de France 2024. Baby hand, jeunes, seniors, beach handball : inscriptions ouvertes.",
  path: "/",
});

/* Données structurées de l'événement mis en avant — émises seulement tant
   que la date n'est pas passée, ET seulement si le club en a saisi une :
   `schema.org/Event` exige une `startDate`, et une actualité sans date
   (« les inscriptions sont ouvertes ») n'est pas un événement. En publier
   une sans date produirait une donnée structurée invalide. */
function schemaEvenement(evenement: ClubHighlight) {
  if (!evenement.startDate) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${evenement.title} de ${evenement.city}`,
    description: evenement.description,
    startDate: evenement.startDate,
    endDate: evenement.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    isAccessibleForFree: true,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    location: {
      "@type": "Place",
      name: evenement.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: evenement.city,
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
}

export default async function HomePage() {
  const contenu = await getSiteContent();
  const evenement = prochainEvenement(contenu.events);
  const schema = evenement ? schemaEvenement(evenement) : null;

  return (
    <>
      <HeroSection
        photo1={contenu.images.accueilHero1}
        photo2={contenu.images.accueilHero2}
      />

      {/* RENDEZ-VOUS À VENIR — se retire seul une fois la date passée */}
      {evenement && (
        <section className="container-x pt-14 md:pt-20">
          {schema && <JsonLd data={schema} />}
          <EventBanner event={evenement} />
        </section>
      )}

      {/* SALLE & BEACH — deux façons de jouer, chaque carte mène aux équipes */}
      <section className="container-x section-pad">
        <Reveal>
          <SectionTitle
            title="Salle & beach handball"
            description="Deux façons de vivre le hand à Lacanau. Choisissez votre terrain pour découvrir les équipes et leurs créneaux d'entraînement."
            align="center"
          />
        </Reveal>
        <div className="section-body">
          <Reveal delay={0.05}>
            <FiliereCards
              photoSalle={contenu.images.accueilSalle}
              photoBeach={contenu.images.accueilBeach}
            />
          </Reveal>
        </div>
      </section>

      {/* LA SAISON — matchs à venir + lien Score'n'co */}
      <section id="saison" className="band scroll-mt-24">
        <div className="container-x section-pad">
          <Reveal>
            <SectionTitle
              eyebrow="La saison"
              title="Les prochains matchs"
              description="Calendrier et résultats officiels du club, mis à jour au fil de la saison via Score'n'co."
              align="center"
            />
          </Reveal>
          <div className="section-body">
            <ScorencoEmbed />
          </div>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section className="container-x section-pad">
        <Reveal>
          <SectionTitle title="Ils soutiennent le club" align="center" />
        </Reveal>
        <div className="section-body">
          <PartnersCarousel partners={contenu.partners} />
        </div>
      </section>

      {/* FAQ */}
      <section className="band">
        <div className="container-x section-pad">
          <Reveal>
            <SectionTitle title="Tout savoir sur le club" align="center" />
          </Reveal>
          <div className="section-body mx-auto max-w-2xl">
            <Reveal delay={0.06}>
              <Faq items={contenu.faqItems} />
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
        <div className="section-body">
          <JoinCta
              ageCategories={contenu.ageCategories}
              pricingPerks={contenu.pricingPerks}
            />
        </div>
      </section>
    </>
  );
}
