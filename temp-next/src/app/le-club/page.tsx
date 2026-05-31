import type { Metadata } from "next";
import Image from "next/image";

import { Reveal } from "@/components/common/reveal";
import { SectionTitle } from "@/components/common/section-title";
import { GalleryLightbox } from "@/components/sections/gallery-lightbox";
import { PageHero } from "@/components/sections/page-hero";
import { StaffGrid } from "@/components/sections/staff-grid";
import { Timeline } from "@/components/sections/timeline";
import { galleryItems, timelineEvents } from "@/data/site";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Le club",
  description: "Histoire, staff, infrastructures et palmarès de Lacanau Ocehand.",
  path: "/le-club",
});

export default function LeClubPage() {
  return (
    <div className="space-y-20">
      <PageHero
        eyebrow="Institution"
        title="Le club"
        description="« Chaque aventure sportive est avant tout une aventure humaine »"
      />

      <Reveal>
        <div className="max-w-3xl space-y-5 text-base leading-relaxed text-slate-700 md:text-lg">
          <p>
            C&apos;est avec cette conviction chevillée au corps que le club de Lacanau OcéHand a vu le jour le 4 juin
            2017, fondé par Thierry Mayeur. L&apos;idée était simple mais ambitieuse : offrir aux Canaulaises et aux
            Canaulais une nouvelle association entièrement dédiée au handball, un sport collectif porteur de valeurs et
            de liens.
          </p>
          <p>
            Depuis, le club n&apos;a cessé de grandir. Saison après saison, les licenciés sont de plus en plus nombreux,
            attirés par un projet associatif ambitieux et une atmosphère familiale unique. Ce dynamisme se traduit
            aujourd&apos;hui par le développement de deux filières complémentaires : le handball en salle, pratiqué
            toute l&apos;année de la catégorie baby jusqu&apos;aux seniors, et le beach handball, discipline qui prend
            tout son sens à deux pas de l&apos;océan Atlantique.
          </p>
          <p>
            Porté par des bénévoles passionnés et engagés, Lacanau OcéHand est aujourd&apos;hui bien plus qu&apos;un club
            de sport : c&apos;est un espace de vie, de partage et de progression pour toutes et tous, quel que soit
            l&apos;âge ou le niveau.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <figure className="mx-auto max-w-4xl space-y-3">
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <Image
              src="/media/club/heritage-2017.webp"
              alt="Photo d&apos;archives du club — 2017"
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
          <figcaption className="text-center text-xs text-slate-500">Souvenir du club — juillet 2017</figcaption>
        </figure>
      </Reveal>

      <Reveal>
        <div className="flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-8 sm:gap-12 sm:px-6">
          <a
            href="https://www.ffhandball.fr/"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 opacity-90 transition hover:opacity-100"
          >
            <Image
              src="/federation/ffhb.png"
              alt="Fédération française de handball"
              width={280}
              height={112}
              className="h-12 w-auto max-h-16 max-w-[min(100vw-2rem,280px)] object-contain sm:h-14"
            />
          </a>
          <a
            href="https://nouvelleaquitaine-handball.org/"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 opacity-90 transition hover:opacity-100"
          >
            <Image
              src="/federation/ligue-nouvelle-aquitaine.png"
              alt="Ligue Nouvelle-Aquitaine de handball"
              width={320}
              height={112}
              className="h-12 w-auto max-h-16 max-w-[min(100vw-2rem,320px)] object-contain sm:h-14"
            />
          </a>
        </div>
      </Reveal>

      <Reveal>
        <figure className="mx-auto max-w-3xl space-y-3">
          <figcaption className="text-center text-xs font-bold uppercase tracking-wider text-slate-500">
            Comité directeur — organisation
          </figcaption>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src="/club/comite-directeur.png"
              alt="Schéma d'organisation du comité directeur du club"
              width={1200}
              height={780}
              className="h-auto w-full object-contain"
            />
          </div>
        </figure>
      </Reveal>

      {/* Histoire & Palmarès */}
      <Reveal>
        <section className="space-y-8">
          <SectionTitle
            eyebrow="Histoire et palmarès"
            title="Un projet sportif en croissance"
            description="De la création du club à la conquête de la Coupe de France, l'aventure Ocehand en images."
          />
          <Timeline events={timelineEvents} />
        </section>
      </Reveal>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Staff */}
      <Reveal>
        <section className="space-y-8">
          <SectionTitle
            eyebrow="Le staff"
            title="Encadrement"
            description="Équipe dirigeante, encadrement sportif et pôle communication."
          />
          <StaffGrid />
        </section>
      </Reveal>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Salles */}
      <Reveal>
        <section className="space-y-8">
          <SectionTitle
            eyebrow="Les salles"
            title="Lieux d'entraînement"
            description="Deux points d'activité principaux du club sur la commune de Lacanau."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
              <p className="border-b border-slate-100 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                Gymnase — 19 Av Albert François, 33680 Lacanau
              </p>
              <iframe
                title="19 Av Albert François Lacanau"
                src="https://www.google.com/maps?q=19+Av+Albert+Francois,+33680+Lacanau&output=embed"
                className="h-72 w-full border-0"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
              <p className="border-b border-slate-100 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                Salle du collège — 1er All. du Collège, 33680 Lacanau
              </p>
              <iframe
                title="1 allée du collège Lacanau"
                src="https://www.google.com/maps?q=1+allee+du+college,+33680+Lacanau&output=embed"
                className="h-72 w-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </Reveal>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Galerie Coupe de France */}
      <Reveal>
        <section className="space-y-8">
          <SectionTitle
            eyebrow="Coupe de France 2024"
            title="L'épopée de Bercy"
            description="Retour en images et en émotions sur le parcours historique du club vers le titre national."
          />
          <GalleryLightbox items={galleryItems} />
        </section>
      </Reveal>
    </div>
  );
}
