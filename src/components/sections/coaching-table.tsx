import Image from "next/image";
import { Phone } from "lucide-react";

import type { CoachAssignment, YouthLead } from "@/types";

/* ============================================================
   ENCADREMENT PAR CATÉGORIE — transcription du guide du licencié.
   Chaque groupe d'entraînement et ses encadrants, plus le
   contact direct du responsable de la filière jeunes.
   ============================================================ */

export function CoachingTable({
  assignments,
  youthLead,
  season,
}: {
  assignments: CoachAssignment[];
  youthLead: YouthLead;
  season: string;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start lg:gap-10">
      <div className="overflow-x-auto overflow-y-hidden rounded-(--radius) border border-line bg-white">
        <table className="w-full min-w-[19rem] border-collapse text-left">
          <caption className="sr-only">
            Entraîneurs par catégorie, saison {season}
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
                className="py-3.5 pr-3 text-xs font-bold uppercase tracking-[0.16em]"
              >
                Entraîneurs
              </th>
              <th
                scope="col"
                className="hidden py-3.5 pr-5 text-xs font-bold uppercase tracking-[0.16em] sm:table-cell sm:pr-6"
              >
                Coordinateur
              </th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((row) => (
              <tr key={row.category} className="border-t border-line">
                <th
                  scope="row"
                  className="py-3.5 pl-5 pr-3 text-left align-top font-semibold text-ink sm:pl-6"
                >
                  {row.category}
                </th>
                <td className="py-3.5 pr-3 align-top text-base text-ink-soft">
                  {row.coaches.join(" · ")}
                  {row.coordinator && (
                    <span className="mt-0.5 block text-sm text-ink-soft/80 sm:hidden">
                      Coordination : {row.coordinator}
                    </span>
                  )}
                </td>
                <td className="hidden py-3.5 pr-5 align-top text-base text-ink-soft sm:table-cell sm:pr-6">
                  {row.coordinator ?? <span aria-hidden="true">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contact direct de la filière jeunes */}
      <div className="rounded-(--radius) border border-line bg-mist p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-soft">
          Une question sur une catégorie&nbsp;?
        </p>
        <div className="mt-5 flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-line bg-white">
            <Image
              src={youthLead.image}
              alt={youthLead.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-ink">{youthLead.name}</p>
            <p className="text-sm leading-snug text-ink-soft">{youthLead.role}</p>
          </div>
        </div>
        <a
          href={`tel:${youthLead.phoneHref}`}
          className="btn-press mt-5 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-ocean"
        >
          <Phone size={16} aria-hidden="true" />
          {youthLead.phone}
        </a>
      </div>
    </div>
  );
}
