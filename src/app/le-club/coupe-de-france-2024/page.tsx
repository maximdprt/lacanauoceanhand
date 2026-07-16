import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { SectionTitle } from "@/components/common/section-title";
import { Reveal } from "@/components/common/reveal";
import { GalleryLightbox } from "@/components/sections/gallery-lightbox";
import { galleryItems } from "@/data/site";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Coupe de France 2024",
  description:
    "L'épopée de Lacanau Océhand à Bercy : retour sur la campagne historique qui a couronné le club champion de France 2024. Photos et galerie.",
  path: "/le-club/coupe-de-france-2024",
});

export default function CoupePage() {
  return (
    <>
      <PageHero
        eyebrow="Le club"
        title="Coupe de France 2024"
        description="Le parcours d'un club familial né en 2017, sacré sur le parquet mythique de l'Accor Arena."
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Le club", href: "/le-club" },
          { label: "Coupe de France 2024" },
        ]}
      />

      {/* RÉCIT ÉDITORIAL */}
      <section className="container-x py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal>
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
                Le titre
              </span>
              <blockquote className="mt-5 font-display text-[clamp(1.6rem,3.5vw,2.4rem)] uppercase leading-[1.05] tracking-tight text-ink">
                «&nbsp;Un petit club de Gironde sur le plus grand des
                parquets&nbsp;»
              </blockquote>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
                <p>
                  En 2024, Lacanau Océhand décroche le titre de Champion de France
                  départemental et s’offre le privilège rare de disputer sa finale à
                  l’Accor Arena, à Bercy. Une salle de légende, d’ordinaire réservée
                  aux plus grands, où les Canaulais ont fait résonner les couleurs
                  d’un club encore jeune, porté par ses familles et ses bénévoles.
                </p>
                <p>
                  La finale restera dans les mémoires&nbsp;: une victoire arrachée
                  <strong className="font-semibold text-ink">
                    {" "}30 à 29{" "}
                  </strong>
                  face à Sainte-Gemmes-sur-Loire, au terme d’un match haletant décidé
                  dans les toutes dernières secondes. Un point d’écart, une défense qui
                  tient, et l’histoire qui bascule du bon côté.
                </p>
                <p>
                  Né en 2017, Lacanau Océhand n’avait alors que sept ans. Sept saisons
                  pour passer d’une aventure familiale lancée sur le sable et dans les
                  gymnases de la station à une consécration nationale. Ce trophée, c’est
                  celui d’un état d’esprit&nbsp;: progresser ensemble, dans la bonne
                  humeur, sans jamais oublier d’où l’on vient.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-center rounded-(--radius-lg) border border-line bg-mist p-8">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">
                La finale
              </span>
              <div className="mt-4 font-display text-[clamp(3rem,7vw,4.5rem)] leading-none tracking-tight text-ink">
                30<span className="mx-2 text-ocean">–</span>29
              </div>
              <p className="mt-3 text-base font-semibold text-ink">
                face à Sainte-Gemmes-sur-Loire
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Coupe de France départementale 2024 · Accor Arena, Paris-Bercy.
                Club fondé en 2017 à Lacanau.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALERIE */}
      <section className="border-t border-line bg-mist">
        <div className="container-x py-16 md:py-24">
          <Reveal>
            <SectionTitle
              index="01"
              eyebrow="En images"
              title="La galerie de l'épopée"
              description="Retour en photos sur la campagne et le sacre du club à Bercy."
            />
          </Reveal>
          <Reveal delay={0.08} className="mt-12">
            <GalleryLightbox items={galleryItems} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
