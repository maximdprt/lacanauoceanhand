import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CircleHelp,
  ClipboardList,
  Clock,
  CloudUpload,
  Euro,
  HardDrive,
  Handshake,
  Link2,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  TriangleAlert,
  Users,
} from "lucide-react";

import { adminSections, compterEntrees, estModifiee, type Section } from "@/lib/admin-sections";
import { getSiteContent } from "@/lib/content";
import { readStoredContent, storageStatus } from "@/lib/content-store";
import { prochainEvenement } from "@/lib/evenements";
import { cn } from "@/lib/utils";

/* ============================================================
   VUE D'ENSEMBLE
   Ce que le club voit en arrivant : où en est le site, ce qui a déjà
   été modifié, et si les modifications partent bien en ligne.
   ============================================================ */

const icones: Record<Section["icon"], typeof Euro> = {
  euro: Euro,
  clock: Clock,
  calendar: CalendarDays,
  users: Users,
  whistle: ClipboardList,
  shield: ShieldCheck,
  shop: ShoppingBag,
  help: CircleHelp,
  handshake: Handshake,
  map: MapPin,
  link: Link2,
};

/** Les chiffres de la première ligne : ce qui parle au bureau du club. */
function chiffresCles(contenu: Awaited<ReturnType<typeof getSiteContent>>) {
  const prochain = prochainEvenement(contenu.events);
  const enSalle = contenu.licenceFees.filter((f) => f.kind === "salle").map((f) => f.price);

  return [
    {
      label: `Licence ${contenu.licenceSeason}`,
      valeur:
        enSalle.length > 0
          ? `${Math.min(...enSalle)} – ${Math.max(...enSalle)} €`
          : "—",
      detail: "En salle, cotisation annuelle",
      href: "/admin/tarifs",
    },
    {
      label: "Créneaux publiés",
      valeur: String(contenu.trainingSlots.length),
      detail: "Sur l'ensemble de la semaine",
      href: "/admin/creneaux",
    },
    {
      label: "Prochain rendez-vous",
      valeur: prochain ? prochain.dateLabel || "À venir" : "Aucun",
      detail: prochain ? prochain.title : "Le bandeau du site est masqué",
      href: "/admin/evenements",
    },
    {
      label: "Équipes",
      valeur: String(contenu.teams.length),
      detail: "Fiches en ligne",
      href: "/admin/equipes",
    },
  ];
}

export default async function TableauDeBord() {
  const contenu = await getSiteContent();
  const stockage = storageStatus();

  // Ce qui a déjà été modifié : sert à marquer les rubriques touchées.
  // Une panne de lecture ne doit pas empêcher d'afficher le tableau de bord.
  const modifications = await readStoredContent().catch(() => null);

  return (
    <div>
      <header>
        <p className="eyebrow text-ink-soft">Espace du club</p>
        <h1 className="headline mt-2 text-[clamp(1.9rem,5vw,2.6rem)] text-ink">
          Le contenu du site
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          Chaque rubrique ci-dessous correspond à une partie du site public.
          Une modification enregistrée ici est visible en ligne en quelques
          secondes — sans toucher au code, ni redéployer quoi que ce soit.
        </p>
      </header>

      {/* --- Où partent les modifications --------------------- */}
      <div
        className={cn(
          "mt-8 flex items-start gap-4 rounded-(--radius) border p-5",
          stockage.writable
            ? "border-line bg-white"
            : "border-gold/40 bg-gold-tint",
        )}
      >
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
            stockage.writable ? "bg-ocean-tint text-ocean" : "bg-white text-gold-ink",
          )}
        >
          {stockage.writable ? (
            stockage.driver === "blob" ? (
              <CloudUpload size={20} aria-hidden="true" />
            ) : (
              <HardDrive size={20} aria-hidden="true" />
            )
          ) : (
            <TriangleAlert size={20} aria-hidden="true" />
          )}
        </span>
        <div className="min-w-0">
          <p className="font-bold text-ink">
            {stockage.writable
              ? `Enregistrement actif · ${stockage.label}`
              : "Enregistrement indisponible"}
          </p>
          {stockage.hint && (
            <p className="mt-1 text-base leading-relaxed text-ink-soft">{stockage.hint}</p>
          )}
          {stockage.writable && !stockage.hint && (
            <p className="mt-1 text-base leading-relaxed text-ink-soft">
              Vos modifications sont enregistrées en ligne et le site se met à
              jour tout seul.
            </p>
          )}
        </div>
      </div>

      {/* --- Les chiffres du moment --------------------------- */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {chiffresCles(contenu).map((chiffre) => (
          <Link
            key={chiffre.label}
            href={chiffre.href}
            className="card-lift group rounded-(--radius) border border-line bg-white p-5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">
              {chiffre.label}
            </p>
            <p className="section-index mt-3 text-2xl leading-none text-ink">
              {chiffre.valeur}
            </p>
            <p className="mt-2 line-clamp-2 text-sm leading-snug text-ink-soft">
              {chiffre.detail}
            </p>
          </Link>
        ))}
      </div>

      {/* --- Les rubriques ------------------------------------ */}
      <h2 className="mt-14 font-display text-xl uppercase tracking-tight text-ink">
        Que voulez-vous modifier&nbsp;?
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {adminSections.map((section) => {
          const Icone = icones[section.icon];
          const touchee = estModifiee(section, modifications ?? {});

          return (
            <li key={section.slug}>
              <Link
                href={`/admin/${section.slug}`}
                className="card-lift group flex h-full flex-col rounded-(--radius) border border-line bg-white p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-ocean transition group-hover:bg-ocean group-hover:text-white">
                    <Icone size={20} aria-hidden="true" />
                  </span>
                  {touchee && (
                    <span className="rounded-full bg-ocean-tint px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-ocean">
                      Modifiée
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{section.label}</h3>
                <p className="mt-1.5 flex-1 text-base leading-relaxed text-ink-soft">
                  {section.summary}
                </p>
                <p className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
                  <span className="text-ink-soft">
                    {compterEntrees(section, contenu)}&nbsp;entrée
                    {compterEntrees(section, contenu) > 1 ? "s" : ""}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-ocean">
                    Modifier
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
