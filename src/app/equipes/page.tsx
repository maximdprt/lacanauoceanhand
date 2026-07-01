import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buildMetadata } from "@/lib/site";
import { PageHero } from "@/components/sections/page-hero";
import { TeamsExplorer } from "@/components/sections/teams-explorer";
import { Reveal } from "@/components/common/reveal";
import { Button } from "@/components/ui/button";
import { teams } from "@/data/site";

export const metadata = buildMetadata({
  title: "Nos équipes",
  description:
    "Du baby handball aux seniors, beach handball, école de gardien et d'arbitrage : toutes les équipes de Lacanau Océhand en Gironde. Trouvez votre catégorie.",
  path: "/equipes",
  keywords: ["équipes handball Lacanau", "baby handball Lacanau", "handball jeunes Gironde", "seniors handball Lacanau"],
});

export default function TeamsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos équipes"
        title="Une équipe pour chaque joueur"
        description="Du baby handball à l'équipe senior, le club accueille toutes et tous dans une ambiance familiale."
      />

      <section className="container-x py-16 md:py-24">
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-ink-soft">
            Du baby handball à l’équipe senior, notre club accueille les joueurs et
            joueuses de tous les âges dans une ambiance familiale et bienveillante.
            Chaque équipe bénéficie d’un encadrement assuré par des bénévoles
            passionnés. Sélectionnez une catégorie pour en savoir plus.
          </p>
        </Reveal>

        <div className="mt-12">
          <TeamsExplorer teams={teams} />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-mist">
        <div className="container-x flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl uppercase tracking-tight text-ink md:text-3xl">
              Vous voulez essayer&nbsp;?
            </h2>
            <p className="mt-2 text-base text-ink-soft">
              Premier entraînement découverte offert, toutes catégories.
            </p>
          </div>
          <Link href="/rejoindre">
            <Button variant="ocean" size="lg">
              S’inscrire au club <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
