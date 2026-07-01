import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HeroSection } from "@/components/sections/hero-section";
import { FiliereCards } from "@/components/sections/filiere-cards";
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
import { Button } from "@/components/ui/button";

import {
  faqItems,
  newsItems,
  partners,
} from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute:
      "Lacanau Océhand — Club de handball à Lacanau | Champions de France 2024",
  },
  description:
    "Rejoignez Lacanau Océhand, le club de handball à Lacanau (Gironde). Baby hand, jeunes, seniors, beach handball. Vainqueurs de la Coupe de France 2024. Inscriptions ouvertes.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Lacanau Océhand — Club de handball à Lacanau",
    description:
      "Baby hand, jeunes, seniors, beach handball en Gironde. Champions de France 2024. Inscriptions ouvertes.",
    url: "https://lacanau-ocehand.fr",
    images: [
      {
        url: "https://lacanau-ocehand.fr/media/club/hero-coupe-bercy.jpg",
        width: 1200,
        height: 630,
        alt: "Lacanau Océhand — Champions de France 2024",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

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
          <Link href="/saison">
            <Button variant="outline" size="md">
              Voir toute la saison <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>

      {/* ACTUALITÉS */}
      <section className="border-y border-line bg-mist">
        <div className="container-x section-pad">
          <Reveal>
            <SectionTitle title="La vie du club" align="center" />
            <div className="mt-6 flex justify-center">
              <Link href="/evenements">
                <Button variant="ghost" size="md">
                  Toutes les actus <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 md:mt-14">
            <NewsPreview items={newsItems} />
          </div>
        </div>
      </section>

      {/* BÉNÉVOLES & PARTENAIRES */}
      <section className="border-y border-line bg-mist">
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
