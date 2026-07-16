import { Clock, Check } from "lucide-react";

import { buildMetadata } from "@/lib/site";
import { PageHero } from "@/components/sections/page-hero";
import { SectionTitle } from "@/components/common/section-title";
import { ScorencoEmbed } from "@/components/sections/scorenco-embed";
import { Reveal } from "@/components/common/reveal";
import {
  licensePricing,
  pricingPerks,
  teams,
} from "@/data/site";

export const metadata = buildMetadata({
  title: "La saison",
  description:
    "Calendrier des matchs, résultats, horaires d'entraînement et tarifs des licences du club de handball de Lacanau. Toutes les infos pratiques.",
  path: "/saison",
});

export default function SeasonPage() {
  const trainable = teams.filter(
    (t) => t.schedule.length > 0 && t.schedule[0].includes("h"),
  );

  return (
    <>
      <PageHero
        eyebrow="La saison"
        title="Calendrier & infos pratiques"
        description="Matchs, horaires d'entraînement et tarifs : tout pour bien vivre la saison à Lacanau."
      />

      {/* MATCH CENTER */}
      <section className="container-x py-16 md:py-24">
        <Reveal>
          <SectionTitle
            index="01"
            eyebrow="Match center"
            title="Matchs & résultats"
            description="Le calendrier détaillé est mis à jour au fil de la saison."
          />
        </Reveal>
        <div className="mt-10 md:mt-14">
          <ScorencoEmbed />
        </div>
      </section>

      {/* ENTRAÎNEMENTS */}
      <section className="border-y border-line bg-mist">
        <div className="container-x py-16 md:py-24">
          <Reveal>
            <SectionTitle
              index="02"
              eyebrow="Entraînements"
              title="Les créneaux"
              description="Horaires indicatifs par catégorie, à confirmer en début de saison auprès des entraîneurs."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trainable.map((t, i) => (
              <Reveal key={t.slug} delay={i * 0.05}>
                <div className="h-full rounded-(--radius) border border-line bg-paper p-6">
                  <h3 className="text-lg font-bold text-ink">{t.name}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{t.coach}</p>
                  <ul className="mt-4 space-y-2 border-t border-line pt-4">
                    {t.schedule.map((s) => (
                      <li
                        key={s}
                        className="flex items-center gap-2.5 text-base text-ink"
                      >
                        <Clock size={15} className="shrink-0 text-ocean" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TARIFS */}
      <section className="container-x py-16 md:py-24">
        <Reveal>
          <SectionTitle
            index="03"
            eyebrow="Licences"
            title="Tarifs & avantages"
            description="Tarifs communiqués par le club. La licence inclut l'équipement et donne accès à tous les créneaux de la catégorie."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* table tarifs */}
          <Reveal>
            <div className="overflow-hidden rounded-(--radius) border border-line bg-white">
              <div className="border-b border-line px-6 py-4">
                <h3 className="font-display text-lg uppercase tracking-tight text-ink">
                  Cotisations
                </h3>
              </div>
              <ul className="divide-y divide-line">
                {licensePricing.map((row) => (
                  <li
                    key={row.category}
                    className="flex items-center justify-between gap-4 px-6 py-4"
                  >
                    <span className="text-base font-semibold text-ink">
                      {row.category}
                    </span>
                    <span className="font-display text-lg uppercase tracking-tight text-ocean">
                      {row.fee}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* avantages */}
          <Reveal delay={0.08}>
            <div className="h-full rounded-(--radius) border border-line bg-ocean-tint p-7 md:p-8">
              <h3 className="font-display text-lg uppercase tracking-tight text-ink">
                Inclus & avantages
              </h3>
              <ul className="mt-5 space-y-3.5">
                {pricingPerks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-base text-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ocean text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
