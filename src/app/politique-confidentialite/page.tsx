import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { ManageCookiesButton } from "@/components/layout/manage-cookies-button";
import { legalInfo } from "@/data/legal";
import { clubEmail } from "@/data/site";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description:
    "Comment Lacanau Océhand traite vos données personnelles : formulaires, cookies, mesure d'audience, durées de conservation et vos droits (RGPD).",
  path: "/politique-confidentialite",
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

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageHero
        eyebrow="Informations"
        title="Politique de confidentialité"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Politique de confidentialité" },
        ]}
      />

      <div className="container-x max-w-3xl space-y-10 py-14 md:py-20">
        <LegalSection title="Responsable de traitement">
          <p>
            L&apos;association <strong>{legalInfo.associationName}</strong> ({legalInfo.siege})
            est responsable des traitements de données personnelles réalisés via
            ce site. Pour toute question relative à vos données :{" "}
            <a href={`mailto:${clubEmail}`} className="font-semibold text-ocean hover:underline">
              {clubEmail}
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="Données collectées, finalités et bases légales">
          <p>Le site collecte des données personnelles dans trois situations :</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Formulaire de contact</strong> (nom, e-mail, message) :
              répondre à votre demande. Base légale : intérêt légitime de
              l&apos;association à répondre aux sollicitations qui lui sont
              adressées.
            </li>
            <li>
              <strong>Formulaires de pré-inscription et de participation</strong>{" "}
              (joueur, bénévole, partenaire : nom, e-mail, téléphone, date de
              naissance et catégorie pour les joueurs) : préparer votre adhésion
              ou votre participation à la vie du club. Base légale : mesures
              précontractuelles prises à votre demande.
            </li>
            <li>
              <strong>Mesure d&apos;audience</strong> (cookies et traceurs, voir
              ci-dessous) : comprendre la fréquentation du site pour
              l&apos;améliorer. Base légale : votre consentement.
            </li>
          </ul>
          <p>
            Les champs des formulaires se limitent aux informations nécessaires
            au traitement de votre demande ; les champs facultatifs sont
            indiqués comme tels.
          </p>
        </LegalSection>

        <LegalSection title="Destinataires des données">
          <p>
            Les messages envoyés via les formulaires sont acheminés vers la
            boîte e-mail du club ({clubEmail}) par le prestataire technique{" "}
            <strong>FormSubmit</strong> (formsubmit.co), qui agit comme
            transporteur des messages et déclare ne pas conserver leur contenu.
            Ce prestataire est situé hors de l&apos;Union européenne
            (États-Unis) ; en nous écrivant, vos coordonnées transitent donc par
            ses serveurs.
          </p>
          <p>
            Seuls les membres du bureau de l&apos;association habilités à
            traiter votre demande ont accès à vos données. Elles ne sont ni
            vendues, ni cédées, ni utilisées à des fins commerciales.
          </p>
        </LegalSection>

        <LegalSection title="Durées de conservation">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Messages de contact : le temps de traiter la demande, puis au
              maximum 12 mois.
            </li>
            <li>
              Demandes de pré-inscription : jusqu&apos;à la fin de la saison
              sportive concernée. Les données des adhérents sont ensuite gérées
              via la licence fédérale (Gest&apos;hand, FFHandball).
            </li>
            <li>
              Données de mesure d&apos;audience : 13 mois maximum pour les
              cookies, 25 mois pour les statistiques agrégées.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Cookies et traceurs">
          <p>
            Au premier accès au site, une bannière vous permet
            d&apos;accepter ou de refuser les traceurs de mesure
            d&apos;audience. <strong>Aucun traceur soumis à consentement
            n&apos;est déposé tant que vous n&apos;avez pas accepté</strong>, et
            le site reste pleinement utilisable en cas de refus. Votre choix
            (acceptation ou refus) est conservé 6 mois.
          </p>
          <p>Traceurs susceptibles d&apos;être utilisés après consentement :</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Google Analytics 4 / Google Tag Manager</strong> (Google
              Ireland Ltd) : statistiques de fréquentation. Cookies{" "}
              <code>_ga*</code>, durée 13 mois.
            </li>
            <li>
              <strong>Microsoft Clarity</strong> (Microsoft Corp.) : analyse
              ergonomique anonymisée des parcours. Cookies <code>_clck</code> /{" "}
              <code>_clsk</code>, durée 13 mois maximum.
            </li>
          </ul>
          <p>
            Google et Microsoft peuvent transférer ces données vers les
            États-Unis dans le cadre du <em>EU-US Data Privacy Framework</em>.
            Le choix mémorisé dans votre navigateur (clé locale{" "}
            <code>ocehand-cookie-consent</code>) sert uniquement à retenir votre
            réponse et n&apos;est transmis à personne.
          </p>
          <p>
            Vous pouvez modifier votre choix à tout moment :{" "}
            <ManageCookiesButton className="font-semibold text-ocean underline underline-offset-2 hover:text-ocean-deep" />
          </p>
        </LegalSection>

        <LegalSection title="Mineurs">
          <p>
            Le club accueille des joueuses et joueurs dès 5 ans. Les formulaires
            du site concernant un mineur de moins de 15 ans doivent être remplis
            par un parent ou représentant légal. Aucune photographie de mineur
            n&apos;est publiée sans l&apos;accord écrit préalable de ses
            représentants légaux.
          </p>
        </LegalSection>

        <LegalSection title="Vos droits">
          <p>
            Conformément au RGPD et à la loi Informatique et Libertés, vous
            disposez d&apos;un droit d&apos;accès, de rectification,
            d&apos;effacement, de limitation, d&apos;opposition et de
            portabilité sur vos données. Pour les exercer, écrivez-nous à{" "}
            <a href={`mailto:${clubEmail}`} className="font-semibold text-ocean hover:underline">
              {clubEmail}
            </a>{" "}
            en précisant votre demande.
          </p>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez
            adresser une réclamation à la CNIL :{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ocean hover:underline"
            >
              cnil.fr
            </a>
            .
          </p>
        </LegalSection>

        <p className="text-sm text-ink-soft">
          Dernière mise à jour : {legalInfo.lastUpdated}. Voir aussi les{" "}
          <Link href="/mentions-legales" className="font-semibold text-ocean hover:underline">
            mentions légales
          </Link>
          .
        </p>
      </div>
    </>
  );
}
