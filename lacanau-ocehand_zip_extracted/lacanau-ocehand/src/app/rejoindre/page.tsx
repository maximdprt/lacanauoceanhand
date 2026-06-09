import { buildMetadata } from "@/lib/site";
import { PageHero } from "@/components/sections/page-hero";
import { JoinForms } from "@/components/sections/join-forms";
import { Reveal } from "@/components/common/reveal";

export const metadata = buildMetadata({
  title: "Rejoindre le club",
  description:
    "Inscrivez-vous au club de handball de Lacanau : joueur, bénévole ou partenaire. Remplissez le formulaire et rejoignez Lacanau Océhand.",
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
        </div>
      </section>
    </>
  );
}
