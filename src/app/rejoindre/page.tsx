import Link from "next/link";
import { ArrowRight, CalendarDays, Download } from "lucide-react";

import { buildMetadata } from "@/lib/site";
import { PageHero } from "@/components/sections/page-hero";
import { PageNav } from "@/components/layout/page-nav";
import { JoinForms } from "@/components/sections/join-forms";
import { EventBanner } from "@/components/sections/event-banner";
import { LicenceFees } from "@/components/sections/licence-fees";
import { SectionTitle } from "@/components/common/section-title";
import { Reveal } from "@/components/common/reveal";
import { forumAssociations, guideLicencieUrl, licenceSeason } from "@/data/site";

export const metadata = buildMetadata({
  title: "Rejoindre le club",
  description:
    "Tarifs des licences, aides et inscriptions à Lacanau Océhand : de 130 € à 180 € en salle, 60 € ou 100 € en beach handball. Règlement en plusieurs fois possible.",
  path: "/rejoindre",
});

const sections = [
  { id: "tarifs", label: "Tarifs" },
  { id: "inscription", label: "Inscription" },
];

export default function JoinPage() {
  return (
    <>
      <PageHero
        image="/media/action/run-1.jpg"
        eyebrow="Rejoindre"
        title="Rejoindre le club"
        description="Joueur, bénévole, entraîneur ou partenaire : choisissez votre formulaire ci-dessous, votre demande arrive directement au club."
      />

      <PageNav items={sections} />

      {/* RENDEZ-VOUS — venir nous rencontrer avant de s'inscrire */}
      <section className="container-x pt-14 md:pt-20">
        <EventBanner event={forumAssociations} />
      </section>

      {/* TARIFS — la question que tout le monde se pose en premier */}
      <section id="tarifs" className="container-x section-pad scroll-mt-32">
        <Reveal>
          <SectionTitle
            eyebrow={`Saison ${licenceSeason}`}
            title="Le prix de la licence"
            description="Une cotisation annuelle unique, équipement compris, avec plusieurs aides possibles pour alléger la facture."
          />
        </Reveal>
        <div className="section-body">
          <Reveal delay={0.05}>
            <LicenceFees />
          </Reveal>
        </div>

        {/* Créneaux — hébergés sur la page Équipes, on y renvoie clairement */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-(--radius) border border-line bg-mist p-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ocean shadow-(--shadow-xs)">
                <CalendarDays size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="font-bold text-ink">
                  Quand s&apos;entraîne-t-on&nbsp;?
                </p>
                <p className="mt-1 text-base leading-relaxed text-ink-soft">
                  Tous les créneaux de la semaine, catégorie par catégorie et salle
                  par salle.
                </p>
              </div>
            </div>
            <Link
              href="/equipes#creneaux"
              className="btn-press inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-ocean"
            >
              Voir les créneaux
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* FORMULAIRES */}
      <section id="inscription" className="band scroll-mt-32">
        <div className="container-x section-pad">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionTitle
                eyebrow="Inscription"
                title="Faire ma demande"
                description="Une réponse du club sous quelques jours. Le premier entraînement découverte est offert, toutes catégories."
              />
            </Reveal>

            <div className="section-body">
              <Reveal delay={0.05}>
                <JoinForms />
              </Reveal>
            </div>

            <Reveal delay={0.08}>
              <a
                href={guideLicencieUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift btn-press group mt-8 flex items-center gap-4 rounded-(--radius) border border-line bg-white p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ocean-tint text-ocean">
                  <Download size={22} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-ink">
                    Guide du licencié {licenceSeason}
                  </p>
                  <p className="text-sm leading-snug text-ink-soft">
                    Le document officiel du club : tarifs, créneaux d&apos;entraînement
                    et encadrement de chaque catégorie (PDF).
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-ocean">
                  Télécharger →
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
