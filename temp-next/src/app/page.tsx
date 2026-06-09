import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HeroSection } from "@/components/sections/hero-section";
import { FiliereCards } from "@/components/sections/filiere-cards";
import { JoinCta } from "@/components/sections/join-cta";
import { EventsCalendar } from "@/components/sections/events-calendar";
import { ScorencoMatchCenter } from "@/components/sections/scorenco-match-center";
import { NewsPreview } from "@/components/sections/news-preview";
import { Testimonials } from "@/components/sections/testimonials";
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

      {/* REJOINDRE LE CLUB */}
      <section className="border-y border-line bg-mist">
        <div className="container-x section-pad">
          <Reveal>
            <SectionTitle
              index="02"
              eyebrow="Rejoindre le club"
              title="Une place pour chacun"
              description="De 5 ans aux vétérans, filles et garçons, compétiteurs ou joueurs du dimanche : il y a forcément une équipe pour vous à Lacanau Océhand."
            />
          </Reveal>
          <div className="mt-10 md:mt-14">
            <JoinCta />
          </div>
        </div>
      </section>

      {/* CALENDRIER & MATCH CENTER */}
      <section className="container-x section-pad">
        <Reveal>
          <SectionTitle
            index="03"
            eyebrow="Agenda"
            title="Les prochains rendez-vous"
            description="Matchs, tournois et manifestations : ne manquez aucun temps fort de la saison."
          />
        </Reveal>
        <div className="mt-10 md:mt-14">
          <EventsCalendar />
        </div>
        <div className="mt-10 md:mt-14">
          <ScorencoMatchCenter />
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
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionTitle
                index="04"
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
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="container-x section-pad">
        <Reveal>
          <SectionTitle
            index="05"
            eyebrow="Ils en parlent"
            title="Une deuxième famille"
            description="Joueurs, parents et bénévoles racontent ce qui les fait revenir au gymnase chaque semaine."
            align="center"
          />
        </Reveal>
        <div className="mt-10 md:mt-14">
          <Testimonials />
        </div>
      </section>

      {/* BÉNÉVOLES & PARTENAIRES */}
      <section className="border-y border-line bg-mist">
        <div className="container-x section-pad">
          <Reveal>
            <SectionTitle
              index="06"
              eyebrow="S'engager"
              title="Faire vivre le club"
              description="Le club avance grâce à ses bénévoles et à ses partenaires. Rejoignez l'aventure, à votre façon."
            />
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
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionTitle
              index="07"
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

      {/* NEWSLETTER */}
      <section className="container-x pb-24">
        <Reveal>
          <Newsletter />
        </Reveal>
      </section>
    </>
  );
}
