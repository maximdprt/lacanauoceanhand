"use client";

import { useId } from "react";

import { ChampPhoto } from "@/components/admin/media-picker";
import type { Field } from "@/lib/admin-sections";
import { cn } from "@/lib/utils";

/* ============================================================
   UN CHAMP DE FORMULAIRE
   Le type déclaré dans `admin-sections.ts` décide de ce qui s'affiche.
   Aucun formulaire n'est écrit à la main dans l'espace admin : tout
   passe par ce composant.
   ============================================================ */

const largeurs: Record<number, string> = {
  1: "col-span-12 sm:col-span-1",
  2: "col-span-12 sm:col-span-2",
  3: "col-span-12 sm:col-span-3",
  4: "col-span-12 sm:col-span-4",
  5: "col-span-12 sm:col-span-5",
  6: "col-span-12 sm:col-span-6",
  7: "col-span-12 sm:col-span-7",
  8: "col-span-12 sm:col-span-8",
  9: "col-span-12 sm:col-span-9",
  10: "col-span-12 sm:col-span-10",
  11: "col-span-12 sm:col-span-11",
  12: "col-span-12",
};

const baseSaisie =
  "w-full rounded-(--radius-sm) border border-line bg-white px-3.5 text-base text-ink placeholder:text-ink-soft/70 transition focus:border-ocean focus:outline-none focus:ring-2 focus:ring-ocean/15";

/* ------------------------------------------------------------
   DATES
   Le stockage garde la date telle qu'écrite, avec son décalage
   horaire (« 2026-09-05T10:00:00+02:00 »). La conversion vers le
   champ est purement textuelle : passer par un objet Date ferait
   dépendre l'affichage du fuseau du serveur, et le rendu initial
   ne correspondrait plus à celui du navigateur.
   ------------------------------------------------------------ */
const isoVersChamp = (iso: string): string =>
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(iso) ? iso.slice(0, 16) : "";

/**
 * Décalage horaire en vigueur À LA DATE SAISIE, et non aujourd'hui : en
 * France, un tournoi de décembre est en UTC+1 même s'il est annoncé en
 * septembre, où l'heure d'été est encore en cours.
 */
function decalageLe(valeurLocale: string): string {
  const minutes = -new Date(valeurLocale).getTimezoneOffset();
  if (!Number.isFinite(minutes)) return "+00:00";
  const signe = minutes >= 0 ? "+" : "-";
  const absolu = Math.abs(minutes);
  const deuxChiffres = (n: number) => String(n).padStart(2, "0");
  return `${signe}${deuxChiffres(Math.floor(absolu / 60))}:${deuxChiffres(absolu % 60)}`;
}

/** Conserve le décalage déjà enregistré, sinon calcule celui de la date saisie. */
function champVersIso(valeur: string, isoPrecedent: string): string {
  if (!valeur) return "";
  const decalage = isoPrecedent.match(/([+-]\d{2}:\d{2}|Z)$/)?.[1] ?? decalageLe(valeur);
  return `${valeur}:00${decalage}`;
}

/* ============================================================ */

export function FieldInput({
  field,
  value,
  onChange,
  compact = false,
}: {
  field: Field;
  value: unknown;
  onChange: (valeur: unknown) => void;
  /** Version resserrée, utilisée dans les listes à nombreuses lignes. */
  compact?: boolean;
}) {
  const id = useId();
  const aideId = field.hint ? `${id}-aide` : undefined;
  const hauteur = compact ? "h-10" : "h-11";

  const texte = typeof value === "string" ? value : "";

  const commun = {
    id,
    "aria-describedby": aideId,
    placeholder: field.placeholder,
  };

  let saisie: React.ReactNode;

  switch (field.type) {
    case "textarea":
      saisie = (
        <textarea
          {...commun}
          value={texte}
          rows={compact ? 3 : 4}
          onChange={(e) => onChange(e.target.value)}
          className={cn(baseSaisie, "resize-y py-2.5 leading-relaxed")}
        />
      );
      break;

    case "tags": {
      // Une ligne = une entrée. Plus lisible qu'une liste séparée par des
      // virgules quand les valeurs en contiennent (« Mardi 17h15 · Cousteyre »).
      const lignes = Array.isArray(value) ? (value as string[]).join("\n") : texte;
      saisie = (
        <textarea
          {...commun}
          value={lignes}
          rows={compact ? 3 : 4}
          onChange={(e) => onChange(e.target.value.split("\n"))}
          className={cn(baseSaisie, "resize-y py-2.5 leading-relaxed")}
        />
      );
      break;
    }

    case "select":
      saisie = (
        <select
          {...commun}
          value={texte}
          onChange={(e) => onChange(e.target.value)}
          className={cn(baseSaisie, hauteur, "cursor-pointer appearance-none pr-9")}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23565f6e' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.7rem center",
            backgroundSize: "1rem",
          }}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
      break;

    case "number":
      saisie = (
        <div className="relative">
          <input
            {...commun}
            type="number"
            inputMode="decimal"
            min={0}
            step={1}
            value={typeof value === "number" ? value : ""}
            onChange={(e) =>
              onChange(e.target.value === "" ? 0 : Number(e.target.value))
            }
            /* Les flèches natives du champ numérique passeraient sous
               l'unité affichée à droite : on s'en passe, la saisie au
               clavier est de toute façon plus rapide pour un tarif. */
            className={cn(
              baseSaisie,
              hauteur,
              "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
              field.suffix && "pr-9",
            )}
          />
          {field.suffix && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-base font-semibold text-ink-soft"
            >
              {field.suffix}
            </span>
          )}
        </div>
      );
      break;

    case "datetime":
      saisie = (
        <input
          {...commun}
          type="datetime-local"
          value={isoVersChamp(texte)}
          onChange={(e) => onChange(champVersIso(e.target.value, texte))}
          className={cn(baseSaisie, hauteur)}
        />
      );
      break;

    case "image":
      // Le club choisit une vignette ou importe un fichier : il n'a jamais
      // à taper un chemin. Le sélecteur s'occupe de tout, y compris de
      // l'aperçu et du bouton « aucune photo ».
      saisie = (
        <ChampPhoto
          valeur={texte}
          onChange={onChange}
          dossier={field.folder}
          autoriserVide={field.optionnel}
          compact={compact}
          ariaLabelledBy={`${id}-label`}
        />
      );
      break;

    case "document": {
      // Un PDF, pas une photo : pas de vignette, une liste des documents
      // déjà présents dans le projet et la saisie libre en secours.
      const listeId = `${id}-fichiers`;
      saisie = (
        <div className="flex items-center gap-3">
          {texte && (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-(--radius-sm) border border-line bg-mist">
              <span className="text-[0.6rem] font-bold uppercase text-ink-soft">
                {texte.split(".").pop()?.slice(0, 4)}
              </span>
            </span>
          )}
          <input
            {...commun}
            type="text"
            list={listeId}
            value={texte}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder ?? "/documents/…"}
            className={cn(baseSaisie, hauteur)}
          />
          <datalist id={listeId}>
            {field.suggestions?.map((chemin) => (
              <option key={chemin} value={chemin} />
            ))}
          </datalist>
        </div>
      );
      break;
    }

    default:
      saisie = (
        <input
          {...commun}
          type={field.type === "email" ? "email" : field.type === "url" ? "text" : "text"}
          inputMode={field.type === "email" ? "email" : field.type === "url" ? "url" : undefined}
          value={texte}
          onChange={(e) => onChange(e.target.value)}
          className={cn(baseSaisie, hauteur)}
        />
      );
  }

  return (
    <div className={largeurs[field.span ?? 12]}>
      <label
        id={`${id}-label`}
        htmlFor={id}
        className="mb-1.5 block text-[0.8rem] font-semibold text-ink"
      >
        {field.label}
      </label>
      {saisie}
      {field.hint && (
        <p id={aideId} className="mt-1.5 text-xs leading-snug text-ink-soft">
          {field.hint}
        </p>
      )}
    </div>
  );
}
