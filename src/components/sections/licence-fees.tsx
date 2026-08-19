import { CalendarClock, Check } from "lucide-react";

import { licenceFees, licenceNotes, licenceSeason } from "@/data/site";
import type { LicenceFee } from "@/types";

/* ============================================================
   PRIX DES LICENCES — transcription du guide du licencié.
   Composant serveur : aucune interactivité, aucun JS envoyé.
   ============================================================ */

const groups: { kind: LicenceFee["kind"]; label: string; hint: string }[] = [
  {
    kind: "salle",
    label: "Handball en salle",
    hint: "Cotisation annuelle, équipement compris",
  },
  {
    kind: "beach",
    label: "Beach handball",
    hint: "Saison sur sable, de mai à août",
  },
];

function FeeRow({ fee }: { fee: LicenceFee }) {
  return (
    <tr className="border-t border-line">
      <th scope="row" className="py-4 pl-5 pr-3 text-left align-middle sm:pl-6">
        <span className="block font-semibold text-ink">{fee.category}</span>
        {fee.birthYears && (
          <span className="mt-0.5 block text-sm text-ink-soft sm:hidden">
            Nés en {fee.birthYears}
          </span>
        )}
      </th>
      <td className="hidden py-4 pr-3 align-middle text-base text-ink-soft sm:table-cell">
        {fee.birthYears ?? <span aria-hidden="true">—</span>}
      </td>
      <td className="py-4 pr-5 text-right align-middle sm:pr-6">
        <span className="font-display text-2xl tracking-tight text-ink">
          {fee.price}&nbsp;€
        </span>
      </td>
    </tr>
  );
}

export function LicenceFees() {
  return (
    <div>
      <div className="overflow-x-auto overflow-y-hidden rounded-(--radius) border border-line bg-white">
        <table className="w-full min-w-[19rem] border-collapse text-left">
          <caption className="sr-only">
            Prix des licences Lacanau Océhand, saison {licenceSeason}
          </caption>
          <thead>
            <tr className="bg-ink text-white">
              <th
                scope="col"
                className="py-3.5 pl-5 pr-3 text-xs font-bold uppercase tracking-[0.16em] sm:pl-6"
              >
                Catégorie
              </th>
              <th
                scope="col"
                className="hidden py-3.5 pr-3 text-xs font-bold uppercase tracking-[0.16em] sm:table-cell"
              >
                Années de naissance
              </th>
              <th
                scope="col"
                className="py-3.5 pr-5 text-right text-xs font-bold uppercase tracking-[0.16em] sm:pr-6"
              >
                Cotisation
              </th>
            </tr>
          </thead>

          {groups.map((group) => {
            const rows = licenceFees.filter((f) => f.kind === group.kind);
            if (rows.length === 0) return null;

            return (
              <tbody key={group.kind}>
                <tr className="bg-mist">
                  <th
                    scope="colgroup"
                    colSpan={3}
                    className="border-t border-line py-3 pl-5 pr-5 text-left sm:pl-6 sm:pr-6"
                  >
                    <span className="font-display text-sm uppercase tracking-tight text-ink">
                      {group.label}
                    </span>
                    <span className="ml-2 text-sm font-normal text-ink-soft">
                      {group.hint}
                    </span>
                  </th>
                </tr>
                {rows.map((fee) => (
                  <FeeRow key={`${fee.kind}-${fee.category}`} fee={fee} />
                ))}
              </tbody>
            );
          })}
        </table>
      </div>

      {/* Mensualités — l'information la plus rassurante, mise en avant */}
      <p className="mt-4 flex items-start gap-3 rounded-(--radius-sm) border border-ocean/20 bg-ocean-tint px-4 py-3.5 text-base leading-relaxed text-ink">
        <CalendarClock size={19} className="mt-0.5 shrink-0 text-ocean" aria-hidden="true" />
        <span>
          <strong className="font-semibold">Règlement possible en plusieurs mensualités.</strong>{" "}
          Le budget ne doit jamais être un frein : parlez-en au bureau du club.
        </span>
      </p>

      {/* Conditions & aides */}
      <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {licenceNotes.map((note) => (
          <li key={note.title} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-c-jeunes/12 text-c-jeunes">
              <Check size={14} strokeWidth={3} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-semibold text-ink">{note.title}</span>
              <span className="mt-0.5 block text-base leading-relaxed text-ink-soft">
                {note.detail}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
