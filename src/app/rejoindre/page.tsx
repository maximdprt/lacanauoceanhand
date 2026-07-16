import { Download } from "lucide-react";

import { buildMetadata } from "@/lib/site";
import { PageHero } from "@/components/sections/page-hero";
import { JoinForms } from "@/components/sections/join-forms";
import { Reveal } from "@/components/common/reveal";

export const metadata = buildMetadata({
  title: "Rejoindre le club",
  description:
    "Inscriptions ouvertes à Lacanau Océhand ! Joueur, bénévole ou partenaire, rejoignez le club de handball de Lacanau (Gironde) dès aujourd'hui.",
  path: "/rejoindre",
});

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Rejoindre"
        title="Rejoindre le club"
        description="Que vous souhaitiez jouer, contribuer en coulisses ou soutenir le club, choisissez votre formulaire ci-dessous."
      />

      <section className="container-x py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <JoinForms />
          </Reveal>

          <Reveal delay={0.08}>
            <a
              href="/documents/guide-licencie.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="card-lift btn-press group mt-8 flex items-center gap-4 rounded-(--radius) border border-line bg-white p-6"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ocean-tint text-ocean">
                <Download size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-ink">Guide du licencié</p>
                <p className="text-sm leading-snug text-ink-soft">
                  À consulter avant votre inscription : démarches, équipement fourni et
                  informations de la saison (PDF).
                </p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-ocean">
                Télécharger →
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
