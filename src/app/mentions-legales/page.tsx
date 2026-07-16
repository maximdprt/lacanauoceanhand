import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { legalInfo } from "@/data/legal";
import { clubEmail } from "@/data/site";
import { buildMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales du site de Lacanau Océhand : éditeur, directeur de la publication, hébergeur et propriété intellectuelle du site du club de handball de Lacanau.",
  path: "/mentions-legales",
});

function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-2xl uppercase tracking-tight text-ink">
        {title}
      </h2>
      <div className="space-y-3 text-base leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
}

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        eyebrow="Informations"
        title="Mentions légales"
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Mentions légales" }]}
      />

      <div className="container-x max-w-3xl space-y-10 py-14 md:py-20">
        <LegalSection title="Éditeur du site">
          <p>
            Le site <strong>{siteConfig.url.replace("https://", "")}</strong> est
            édité par l&apos;association <strong>{legalInfo.associationName}</strong>,
            association sportive régie par la loi du 1<sup>er</sup> juillet 1901,
            affiliée à la Fédération Française de Handball.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Siège social : {legalInfo.siege}</li>
            {legalInfo.rna && <li>N° RNA : {legalInfo.rna}</li>}
            <li>
              E-mail :{" "}
              <a href={`mailto:${clubEmail}`} className="font-semibold text-ocean hover:underline">
                {clubEmail}
              </a>
            </li>
            {legalInfo.phone && <li>Téléphone : {legalInfo.phone}</li>}
          </ul>
        </LegalSection>

        <LegalSection title="Directeur de la publication">
          <p>{legalInfo.publicationDirector}.</p>
        </LegalSection>

        <LegalSection title="Hébergement">
          <p>
            Le site est hébergé par <strong>{legalInfo.host.name}</strong>,{" "}
            {legalInfo.host.address} —{" "}
            <a
              href={legalInfo.host.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ocean hover:underline"
            >
              {legalInfo.host.website.replace("https://", "")}
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="Propriété intellectuelle">
          <p>
            L&apos;ensemble des contenus de ce site (textes, photographies, logos,
            identité visuelle) est la propriété de l&apos;association{" "}
            {legalInfo.associationName} ou de ses partenaires, sauf mention
            contraire. Toute reproduction ou réutilisation, totale ou partielle,
            sans autorisation écrite préalable est interdite.
          </p>
          <p>
            Les logos des partenaires et des instances fédérales (FFHandball,
            Ligue Nouvelle-Aquitaine, Comité de Gironde) restent la propriété de
            leurs titulaires respectifs.
          </p>
        </LegalSection>

        <LegalSection title="Données personnelles & cookies">
          <p>
            Les informations relatives au traitement de vos données personnelles
            (formulaires, mesure d&apos;audience) et à l&apos;utilisation des
            cookies sont détaillées dans notre{" "}
            <Link
              href="/politique-confidentialite"
              className="font-semibold text-ocean hover:underline"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </LegalSection>

        <p className="text-sm text-ink-soft">
          Dernière mise à jour : {legalInfo.lastUpdated}.
        </p>
      </div>
    </>
  );
}
