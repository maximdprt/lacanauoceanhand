import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HeroSection } from "@/components/sections/hero-section";
import { StatsBar } from "@/components/sections/stats-bar";
import { FiliereCards } from "@/components/sections/filiere-cards";
import { BeachSection } from "@/components/sections/beach-section";
import { JoinCta } from "@/components/sections/join-cta";
import { EventsCalendar } from "@/components/sections/events-calendar";
import { ScorencoEmbed } from "@/components/sections/scorenco-embed";
import { NewsPreview } from "@/components/sections/news-preview";
import { VolunteerPartner } from "@/components/sections/volunteer-partner";
import { Newsletter } from "@/components/sections/newsletter";
import { Faq } from "@/components/sections/faq";
import { PartnersCarousel } from "@/components/sections/partners-carousel";
import { SectionTitle } from "@/components/common/section-title";
import { Reveal } from "@/components/common/reveal";
import { buttonVariants } from "@/components/ui/button";
import { buildMetadata } from "@/lib/site";

import {
  clubStats,
  faqItems,
  newsItems,
  partners,
} from "@/data/site";

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

      {/* CHIFFRES CLÉS */}
      <StatsBar stats={clubStats} />

      {/* FILIÈRES */}
      <section className="container-x section-pad">
        <Reveal>
          <SectionTitle title="Salle & beach handball" align="center" />
        </Reveal>
        <div className="mt-10 md:mt-14">
          <Reveal delay={0.05}>
            <FiliereCards />
          </Reveal>
        </div>
      </section>

      {/* BEACH HANDBALL */}
      <BeachSection />

      {/* REJOINDRE LE CLUB */}
      <section className="border-y border-line bg-mist">
        <div className="container-x section-pad">
          <Reveal>
            <SectionTitle title="Une place pour chacun" align="center" />
          </Reveal>
          <div className="mt-10 md:mt-14">
            <JoinCta />
          </div>
        </div>
      </section>

      {/* CALENDRIER & MATCH CENTER */}
      <section className="container-x section-pad">
        <Reveal>
          <SectionTitle title="Les prochains rendez-vous" align="center" />
        </Reveal>
        <div className="mt-10 md:mt-14">
          <EventsCalendar />
        </div>
        <div className="mt-10 md:mt-14">
          <ScorencoEmbed />
        </div>
        <div className="mt-8">
          <Link href="/saison" className={buttonVariants({ variant: "outline", size: "md" })}>
            Voir toute la saison <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ACTUALITÉS */}
      <section className="border-y border-line bg-mist">
        <div className="container-x section-pad">
          <Reveal>
            <SectionTitle title="La vie du club" align="center" />
            <div className="mt-6 flex justify-center">
              <Link href="/evenements" className={buttonVariants({ variant: "ghost", size: "md" })}>
                Toutes les actus <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 md:mt-14">
            <NewsPreview items={newsItems} />
          </div>
        </div>
      </section>

      {/* BÉNÉVOLES & PARTENAIRES */}
      <section className="border-t border-line">
        <div className="container-x section-pad">
          <Reveal>
            <SectionTitle title="Faire vivre le club" align="center" />
          </Reveal>
          <div className="mt-10 md:mt-14">
            <VolunteerPartner />
          </div>
          <div className="mt-14">
            <p className="mb-8 text-center eyebrow text-ink-soft">
              Ils soutiennent le club
            </p>
            <PartnersCarousel partners={partners} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x section-pad">
        <Reveal>
          <SectionTitle title="Tout savoir sur le club" align="center" />
        </Reveal>
        <div className="mx-auto mt-10 max-w-2xl md:mt-14">
          <Reveal delay={0.06}>
            <Faq items={faqItems} />
          </Reveal>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-x pb-24">
        <Reveal>
          <Newsletter />
        </Reveal>
      </section>
    </>
  );
}
