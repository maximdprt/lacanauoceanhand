import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Trophy, Calendar, Star } from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { SectionTitle } from "@/components/common/section-title";
import { HeroSection } from "@/components/sections/hero-section";
import { MatchList } from "@/components/sections/matches-widget";
import { NewsPreview } from "@/components/sections/news-preview";
import { PartnersCarousel } from "@/components/sections/partners-carousel";
import { SocialFeedPlaceholder } from "@/components/sections/social-feed-placeholder";
import {
  latestResults,
  newsItems,
  partners,
  upcomingMatches,
} from "@/data/site";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Accueil",
  description:
    "Site officiel de Lacanau Ocehand, club de beach handball lacanau et handball lacanau.",
  path: "/",
});

const kpis = [
  { icon: Trophy, value: "1", label: "Coupe de France", color: "text-amber-500" },
  { icon: Users, value: "150+", label: "Licenciés", color: "text-ocean" },
  { icon: Calendar, value: "2017", label: "Année de fondation", color: "text-emerald-500" },
  { icon: Star, value: "9", label: "Équipes", color: "text-violet-500" },
];

export default function Home() {
  return (
    <div className="-mt-8 pb-20">
      {/* Hero plein écran */}
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <HeroSection />
      </div>

      {/* KPIs strip */}
      <Reveal>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3 py-8 sm:gap-4 sm:py-10 md:grid-cols-4">
            {kpis.map(({ icon: Icon, value, label, color }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 text-center sm:p-5 shadow-sm transition hover:shadow-md"
              >
                <Icon size={22} className={color} />
                <p className={`mt-2 font-display text-3xl uppercase sm:text-4xl ${color}`}>{value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Bannière club dynamique */}
      <Reveal>
        <section className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl px-4 sm:px-6">
          <div className="relative min-h-[280px] overflow-hidden rounded-3xl sm:min-h-[340px] md:min-h-[400px]">
            <Image
              src="/media/teams/senior-masculine.jpg"
                alt="Équipe Lacanau Ocehand"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/88 via-slate-900/55 to-slate-800/10" />
            <div className="relative grid gap-5 p-5 sm:p-8 md:grid-cols-2 md:p-14">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ocean-light">
                  Un club ouvert à tous
                </p>
                <h2 className="font-display text-3xl uppercase sm:text-4xl leading-[0.92] text-white md:text-5xl">
                  Handball, beach handball, convivialité
                </h2>
                <p className="max-w-lg text-base leading-relaxed text-white/75">
                  Que vous soyez debutant ou confirme, enfant ou adulte, Lacanau Ocehand vous
                  accueille dans une atmosphere moderne et bienveillante.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/equipes"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm sm:w-auto font-semibold text-slate-900 transition hover:bg-slate-100"
                  >
                    Nos equipes <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/rejoindre"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm sm:w-auto font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    S&apos;inscrire
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Match Center */}
      <Reveal>
        <section className="mx-auto w-full max-w-7xl space-y-6 px-4 pt-14 sm:px-6">
          <SectionTitle
            eyebrow="Match Center"
            title="Prochains matchs &amp; resultats"
            description="Rencontres a venir et derniers scores de vos equipes."
          />
          <div className="grid gap-5 xl:grid-cols-2">
            <MatchList title="Prochains matchs" matches={upcomingMatches} />
            <MatchList title="Derniers resultats" matches={latestResults} isResults />
          </div>
        </section>
      </Reveal>

      {/* Événements */}
      <Reveal>
        <section className="mx-auto w-full max-w-7xl space-y-6 px-4 pt-14 sm:px-6">
          <SectionTitle
            eyebrow="Evenements"
            title="La vie du club"
            description="Actualites, competitions et moments forts de la saison."
          />
          <NewsPreview items={newsItems.slice(0, 3)} />
        </section>
      </Reveal>

      {/* Réseaux sociaux */}
      <Reveal>
        <section className="mx-auto w-full max-w-7xl space-y-6 px-4 pt-14 sm:px-6">
          <SectionTitle
            eyebrow="Reseaux"
            title="Instagram &amp; Facebook"
            description="Suivez le club sur les reseaux sociaux pour ne rien manquer."
          />
          <SocialFeedPlaceholder />
        </section>
      </Reveal>

      {/* Partenaires */}
      <Reveal>
        <section className="mx-auto w-full max-w-7xl space-y-6 px-4 pt-14 sm:px-6">
          <SectionTitle
            eyebrow="Partenaires"
            title="Ils soutiennent le club"
            description="Merci a tous nos partenaires pour leur confiance et leur engagement."
          />
          <PartnersCarousel partners={partners} />
        </section>
      </Reveal>
    </div>
  );
}

