import { MapPin } from "lucide-react";

import { trainingDays, trainingKinds, trainingSlots } from "@/data/site";
import { cn } from "@/lib/utils";
import type { TrainingSlot } from "@/types";

/* ============================================================
   CRÉNEAUX D'ENTRAÎNEMENT — transcription du guide du licencié.
   Regroupés par jour : c'est la question que se pose un parent
   (« on s'entraîne quand, et où ? »). La commune est toujours
   visible car trois groupes s'entraînent hors de Lacanau.
   ============================================================ */

const colorOf = (kind: TrainingSlot["kind"]) =>
  trainingKinds.find((k) => k.id === kind)?.color ?? "var(--c-senior)";

function SlotRow({ slot }: { slot: TrainingSlot }) {
  // Hors de Lacanau, c'est la commune qui compte ; à Lacanau, la salle.
  const away = slot.city !== "Lacanau";
  const place = away ? slot.city : slot.venue;

  return (
    <li className="relative flex items-baseline gap-3 border-t border-line py-3 pl-4 first:border-t-0">
      <span
        className="absolute inset-y-2.5 left-0 w-[3px] rounded-full"
        style={{ background: colorOf(slot.kind) }}
        aria-hidden="true"
      />
      <span className="section-index shrink-0 whitespace-nowrap text-base text-ink tabular-nums">
        {slot.time}
      </span>
      {/* Le lieu suit le nom du groupe dans le fil du texte : il passe à
          la ligne proprement au lieu de casser le libellé en deux. */}
      <span className="min-w-0 text-base font-semibold leading-relaxed text-ink">
        {slot.group}{" "}
        <span
          className={cn(
            "ml-0.5 inline-flex translate-y-px items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold",
            away ? "bg-gold-tint text-gold-deep" : "bg-mist text-ink-soft",
          )}
        >
          <MapPin size={11} aria-hidden="true" />
          {place}
        </span>
      </span>
    </li>
  );
}

export function TrainingSchedule() {
  return (
    <div>
      {/* Légende des couleurs */}
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {trainingKinds.map((k) => (
          <li key={k.id} className="flex items-center gap-2 text-sm text-ink-soft">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: k.color }}
              aria-hidden="true"
            />
            {k.label}
          </li>
        ))}
      </ul>

      {/* La semaine, jour par jour */}
      <div className="mt-8 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
        {trainingDays.map((day) => {
          const slots = trainingSlots.filter((s) => s.day === day);
          if (slots.length === 0) return null;

          return (
            <div
              key={day}
              className="overflow-hidden rounded-(--radius) border border-line bg-white"
            >
              <div className="flex items-baseline justify-between gap-3 border-b border-line bg-mist px-5 py-3.5">
                <h3 className="font-display text-lg uppercase tracking-tight text-ink">
                  {day}
                </h3>
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  {slots.length} créneau{slots.length > 1 ? "x" : ""}
                </span>
              </div>
              <ul className="px-5 py-1.5">
                {slots.map((slot) => (
                  <SlotRow
                    key={`${slot.day}-${slot.time}-${slot.group}`}
                    slot={slot}
                  />
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Où se trouvent les salles */}
      <div className="mt-8 grid gap-4 rounded-(--radius) border border-line bg-mist p-6 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-soft">
            À Lacanau
          </p>
          <p className="mt-2 text-base leading-relaxed text-ink-soft">
            <strong className="font-semibold text-ink">Salle de la Cousteyre</strong> et{" "}
            <strong className="font-semibold text-ink">Cosec</strong> accueillent la
            très grande majorité des entraînements du club.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-soft">
            En entente
          </p>
          <p className="mt-2 text-base leading-relaxed text-ink-soft">
            Certains groupes U15 et U18 s&apos;entraînent à{" "}
            <strong className="font-semibold text-ink">Lège-Cap-Ferret</strong> et à{" "}
            <strong className="font-semibold text-ink">Saint-Médard</strong> : ces
            créneaux portent une pastille dorée au nom de la commune.
          </p>
        </div>
      </div>
    </div>
  );
}
