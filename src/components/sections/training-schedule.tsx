import { MapPin } from "lucide-react";

import { trainingDays, trainingKinds, trainingSlots } from "@/data/site";
import { cn } from "@/lib/utils";
import type { TrainingSlot } from "@/types";

/* ============================================================
   CRÉNEAUX D'ENTRAÎNEMENT — transcription du guide du licencié.
   Une ligne par jour, façon planning : le jour à gauche, ses
   créneaux à droite. Une grille de cartes laissait d'énormes vides
   sous les jours à un seul créneau (lundi, jeudi, samedi) alors que
   mercredi et vendredi en comptent six.
   ============================================================ */

const colorOf = (kind: TrainingSlot["kind"]) =>
  trainingKinds.find((k) => k.id === kind)?.color ?? "var(--c-senior)";

function Slot({ slot }: { slot: TrainingSlot }) {
  // Hors de Lacanau, c'est la commune qui compte ; à Lacanau, la salle.
  const away = slot.city !== "Lacanau";
  const place = away ? slot.city : slot.venue;

  return (
    <li
      className="flex items-baseline gap-2.5 rounded-(--radius-sm) border border-line border-l-[3px] bg-paper px-3.5 py-2.5"
      style={{ borderLeftColor: colorOf(slot.kind) }}
    >
      <span className="section-index shrink-0 whitespace-nowrap text-base text-ink tabular-nums">
        {slot.time}
      </span>
      <span className="text-[0.95rem] font-semibold leading-snug text-ink">
        {slot.group}{" "}
        <span
          className={cn(
            "ml-0.5 inline-flex translate-y-px items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold",
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

      {/* La semaine, une ligne par jour */}
      <div className="mt-8 overflow-hidden rounded-(--radius) border border-line bg-white">
        {trainingDays.map((day, i) => {
          const slots = trainingSlots.filter((s) => s.day === day);
          if (slots.length === 0) return null;

          return (
            <section
              key={day}
              className={cn(
                "grid gap-x-6 gap-y-3 px-5 py-5 md:grid-cols-[8.5rem_1fr] md:px-7",
                i > 0 && "border-t border-line",
              )}
            >
              <h3 className="flex items-baseline gap-3 md:flex-col md:gap-1">
                <span className="font-display text-lg uppercase tracking-tight text-ink">
                  {day}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  {slots.length} créneau{slots.length > 1 ? "x" : ""}
                </span>
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {slots.map((slot) => (
                  <Slot key={`${slot.day}-${slot.time}-${slot.group}`} slot={slot} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Où se trouvent les salles */}
      <div className="mt-6 grid gap-6 rounded-(--radius) bg-mist p-6 sm:grid-cols-2 md:p-7">
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
