import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { Mail, ChevronRight } from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { SectionTitle } from "@/components/common/section-title";
import { PageHero } from "@/components/sections/page-hero";
import { TeamCard } from "@/components/sections/team-card";
import { equipeSectionMedia, teamSignupEmail, teams } from "@/data/site";
import type { Team } from "@/types";
import { buildMetadata } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Nos équipes",
  description:
    "Les équipes de Lacanau Ocehand : seniors, jeunes, beach handball et écoles.",
  path: "/equipes",
});

const seniorSlugs = new Set(["senior-masculine", "senior-feminine"]);

const subNav = [
  { id: "seniors", label: "Seniors", hint: "Seniors masculins et équipe loisir" },
  { id: "jeunes", label: "Équipes jeunes" },
  { id: "beach", label: "Beach handball" },
  { id: "ecole-gardiens", label: "École de gardien" },
  { id: "ecole-arbitrage", label: "École d'arbitrage" },
] as const;

function filterTeams(predicate: (t: Team) => boolean) {
  return teams.filter(predicate);
}

function SubNavLink({ id, label, hint }: { id: string; label: string; hint?: string }) {
  return (
    <a
      href={`#${id}`}
      className={cn(
        "flex min-w-[140px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm transition",
        "hover:border-ocean/40 hover:bg-ocean/5",
      )}
    >
      <span className="font-display text-sm uppercase tracking-wide text-slate-900">{label}</span>
      {hint && <span className="mt-1 max-w-[200px] text-[11px] leading-snug text-slate-500">{hint}</span>}
    </a>
  );
}

function TeamSection({
  id,
  title,
  description,
  list,
  footer,
}: {
  id: string;
  title: string;
  description?: string;
  list: Team[];
  footer?: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-5">
      <div>
        <h3 className="font-display text-2xl uppercase tracking-wide text-slate-900">{title}</h3>
        {description && <p className="mt-2 max-w-3xl text-sm text-slate-600">{description}</p>}
      </div>
      {list.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((team) => (
            <TeamCard key={team.slug} team={team} />
          ))}
        </div>
      ) : null}
      {footer}
    </section>
  );
}

export default function EquipesPage() {
  const seniors = filterTeams((t) => seniorSlugs.has(t.slug));
  const jeunes = filterTeams((t) =>
    ["Jeunes", "Formation", "Baby/Initiation"].includes(t.category),
  );
  const beach = filterTeams((t) => t.slug === "beach-elite");

  return (
    <div className="space-y-14">
      <PageHero
        eyebrow="Sportif"
        title="Nos équipes"
        description="Découvrez nos collectifs par filière : seniors, jeunes, beach handball et écoles spécialisées."
      />

      <Reveal>
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-display text-3xl uppercase tracking-wide text-slate-900">Nos équipes</h2>
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-slate-700">
            <p>
              Du baby-handball à l&apos;équipe senior, notre club accueille les joueurs et joueuses de tous les âges
              dans une ambiance familiale et bienveillante. Chaque équipe bénéficie d&apos;un encadrement assuré par
              des bénévoles passionnés, formés et investis tout au long de la saison.
            </p>
            <p>Que vous débutiez ou que vous ayez déjà de l&apos;expérience, vous trouverez ici votre place sur le terrain.</p>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {subNav.map((item) => (
            <SubNavLink key={item.id} id={item.id} label={item.label} hint={"hint" in item ? item.hint : undefined} />
          ))}
        </div>
      </Reveal>

      <div className="space-y-12">
        <Reveal>
          <section className="space-y-8">
            <SectionTitle
              eyebrow="Collectifs"
              title="Parcourir les équipes"
              description="Chaque équipe a sa page dédiée avec encadrement, créneaux et informations."
            />

            <div className="flex flex-col items-start justify-between gap-5 overflow-hidden rounded-3xl border border-ocean/25 bg-gradient-to-br from-ocean/8 to-ocean/3 p-6 md:flex-row md:items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ocean">Inscription</p>
                <h3 className="mt-1 font-display text-2xl uppercase tracking-wide text-slate-900">
                  S&apos;inscrire dans une équipe
                </h3>
                <p className="mt-1 max-w-md text-sm text-slate-600">
                  Contactez-nous par e-mail pour rejoindre l&apos;équipe de votre choix.
                </p>
              </div>
              <a
                href={`mailto:${teamSignupEmail}?subject=Inscription%20équipe%20Lacanau%20Ocehand`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-white transition hover:bg-ocean/90"
              >
                <Mail size={15} />
                Envoyer une demande
                <ChevronRight size={14} />
              </a>
            </div>
          </section>
        </Reveal>

        <div className="space-y-16">
          <Reveal>
            <TeamSection
              id="seniors"
              title="Seniors"
              description="Équipes compétition seniors. L'équipe loisirs peut aussi vous accueillir : écrivez-nous."
              list={seniors}
              footer={
                <p className="text-sm text-slate-600">
                  Équipe loisirs et questions —{" "}
                  <a href={`mailto:${teamSignupEmail}`} className="font-medium text-ocean hover:underline">
                    {teamSignupEmail}
                  </a>
                </p>
              }
            />
          </Reveal>

          <Reveal>
            <TeamSection
              id="jeunes"
              title="Équipes jeunes"
              description="Catégories jeunes, formation et école de hand."
              list={jeunes}
            />
          </Reveal>

          <Reveal>
            <TeamSection
              id="beach"
              title="Beach handball"
              description="Performance et vie du beach au club."
              list={beach}
            />
          </Reveal>

          <Reveal>
            <section id="ecole-gardiens" className="scroll-mt-24 space-y-4">
              <h3 className="font-display text-2xl uppercase tracking-wide text-slate-900">École de gardien</h3>
              <div className="relative max-w-3xl overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <Image
                  src={equipeSectionMedia.ecoleGardiens}
                  alt="Encadrement de l&apos;école des gardiens"
                  width={1200}
                  height={780}
                  className="h-auto w-full object-cover"
                />
              </div>
              <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
                Programme encadré par le club pour travailler les fondamentaux du poste. Pour connaître les créneaux et
                les places disponibles, contactez-nous.
              </p>
              <a
                href={`mailto:${teamSignupEmail}?subject=École%20de%20gardien`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-ocean hover:underline"
              >
                <Mail size={14} />
                Demande d&apos;information
              </a>
            </section>
          </Reveal>

          <Reveal>
            <section id="ecole-arbitrage" className="scroll-mt-24 space-y-4">
              <h3 className="font-display text-2xl uppercase tracking-wide text-slate-900">École d&apos;arbitrage</h3>
              <div className="relative max-w-3xl overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <Image
                  src={equipeSectionMedia.ecoleArbitrage}
                  alt="École d&apos;arbitrage du club"
                  width={1200}
                  height={780}
                  className="h-auto w-full object-cover"
                />
              </div>
              <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
                Initiation et formation à l&apos;arbitrage pour accompagner les matchs du club et progresser dans la
                filière officielle.
              </p>
              <a
                href={`mailto:${teamSignupEmail}?subject=${encodeURIComponent("École d'arbitrage")}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-ocean hover:underline"
              >
                <Mail size={14} />
                Demande d&apos;information
              </a>
            </section>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
