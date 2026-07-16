import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Mention d'information RGPD de premier niveau (art. 13), à afficher
 * sous chaque formulaire. Le second niveau est la politique de
 * confidentialité. Pas de case à cocher : la base légale d'un
 * formulaire de contact/pré-inscription n'est pas le consentement
 * (doctrine CNIL — une case serait une fausse base légale).
 */
export function FormPrivacyNotice({
  dark = false,
  minors = false,
}: {
  /** Variante pour fond sombre (bloc « Prêt à nous rejoindre ? »). */
  dark?: boolean;
  /** Ajoute la mention représentant légal pour les mineurs. */
  minors?: boolean;
}) {
  return (
    <p
      className={cn(
        "text-xs leading-relaxed",
        dark ? "text-white/60" : "text-ink-soft",
      )}
    >
      {minors && (
        <>
          Si le joueur est mineur, ce formulaire doit être rempli par un parent
          ou représentant légal.{" "}
        </>
      )}
      Les informations saisies sont transmises par e-mail à Lacanau Océhand
      (via notre prestataire d&apos;acheminement FormSubmit) dans le seul but
      de traiter votre demande, puis supprimées au plus tard sous 12 mois.
      Elles ne sont ni vendues ni utilisées à d&apos;autres fins.{" "}
      <Link
        href="/politique-confidentialite"
        className={cn(
          "font-semibold underline underline-offset-2",
          dark ? "text-white/80 hover:text-white" : "text-ocean hover:text-ocean-deep",
        )}
      >
        Vos données & vos droits
      </Link>
    </p>
  );
}
