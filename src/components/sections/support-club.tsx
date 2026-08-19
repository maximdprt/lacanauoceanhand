import { ExternalLink, HandCoins, Handshake, ShoppingBag } from "lucide-react";

import { helloAsso } from "@/data/site";

/* ============================================================
   SOUTENIR LE CLUB — les trois portes d'entrée HelloAsso.
   HelloAsso ne prélève aucune commission : l'intégralité des
   montants revient au club, ce qui vaut d'être dit.
   ============================================================ */

const actions = [
  {
    icon: ShoppingBag,
    title: "La boutique du club",
    description:
      "Sweats, maillots de beach handball, casquettes, bobs et gourdes aux couleurs de Lacanau Océhand.",
    meta: "De 20 € à 45 €",
    href: helloAsso.boutique,
    cta: "Voir la boutique",
    accent: "var(--c-beach-ink)",
  },
  {
    icon: HandCoins,
    title: "Faire un don",
    description:
      "Un coup de pouce libre pour financer l'équipement, les déplacements et la formation des jeunes.",
    meta: "Montant libre",
    href: helloAsso.don,
    cta: "Je fais un don",
    accent: "var(--c-jeunes-ink)",
  },
  {
    icon: Handshake,
    title: "Devenir mécène du LBHX",
    description:
      "Associez votre entreprise au Lacanau Beach Handball Xperience, le rendez-vous beach de l'été.",
    meta: "Mécénat 2026",
    href: helloAsso.mecenat,
    cta: "Devenir mécène",
    accent: "var(--c-senior)",
  },
] as const;

export function SupportClub() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <a
              key={action.title}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-lift group flex h-full flex-col overflow-hidden rounded-(--radius) border border-line bg-white p-6"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full text-white"
                style={{ background: action.accent }}
              >
                <Icon size={21} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{action.title}</h3>
              <p className="mt-2 flex-1 text-base leading-relaxed text-ink-soft">
                {action.description}
              </p>
              <p className="mt-4 text-sm font-semibold" style={{ color: action.accent }}>
                {action.meta}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 border-t border-line pt-4 text-sm font-semibold text-ocean">
                {action.cta}
                <ExternalLink size={14} aria-hidden="true" />
              </span>
            </a>
          );
        })}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-ink-soft">
        Paiements sécurisés via{" "}
        <a
          href={helloAsso.profile}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-ocean hover:underline"
        >
          HelloAsso
        </a>
        , la plateforme solidaire des associations : elle ne prélève ni frais ni
        commission, l&apos;intégralité de votre paiement revient au club.
      </p>
    </div>
  );
}
