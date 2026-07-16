"use client";

import { motion, type Variants } from "framer-motion";
import { MapPin } from "lucide-react";

import { SPRING } from "@/lib/animations";
import { clubEvents } from "@/data/site";
import type { ClubEvent } from "@/types";

const typeAccent: Record<ClubEvent["type"], string> = {
  Match: "var(--c-senior)",
  Tournoi: "var(--c-beach)",
  Manifestation: "var(--c-jeunes)",
  Stage: "var(--c-gardien)",
};

// Entrée sobre : opacity + y uniquement (fadeUp + SPRING.soft).
// Le tilt reste STATIQUE (via style) et n'est animé qu'au survol.
const cardEntry: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...SPRING.soft, delay: i * 0.08 },
  }),
};

function EventCard({ ev, index }: { ev: ClubEvent; index: number }) {
  const accent = typeAccent[ev.type];
  const tilt = index % 2 === 0 ? -1.25 : 1.25; // léger tilt décoratif statique

  return (
    <motion.article
      custom={index}
      variants={cardEntry}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      style={{ rotate: tilt }}
      whileHover={{ y: -10, rotate: 0, scale: 1.02, transition: SPRING.snappy }}
      className="group relative flex min-w-[260px] snap-center flex-col sm:min-w-0"
    >
      {/* Onglet mois — statique, entre avec la carte */}
      <div
        className="relative z-10 mx-5 w-fit rounded-t-2xl px-5 py-2.5 shadow-md"
        style={{ background: accent }}
      >
        <span className="font-display text-xl uppercase tracking-tight text-white sm:text-2xl">
          {ev.month}
        </span>
        <span className="absolute -bottom-1 left-4 right-4 h-1 rounded-full bg-white/40" />
      </div>

      {/* Corps de la carte */}
      <div
        className={`card-lift relative -mt-px flex flex-1 flex-col overflow-hidden rounded-3xl rounded-tl-lg border p-6 pt-8 transition-shadow duration-500 group-hover:shadow-lg ${
          ev.highlight
            ? "border-gold/35 bg-gold-tint shadow-[0_20px_50px_-24px_rgba(224,169,52,0.45)]"
            : "border-line bg-white shadow-sm"
        }`}
      >
        {/* Glow — purement hover, jamais animé au scroll */}
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
          style={{ background: accent }}
        />

        <span
          className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white"
          style={{ background: accent }}
        >
          {ev.type}
        </span>

        <h3 className="mt-4 font-display text-base uppercase leading-snug tracking-tight text-ink sm:text-lg">
          {ev.title}
        </h3>

        <p className="mt-auto flex items-center gap-1.5 pt-5 text-sm text-ink-soft">
          <MapPin size={14} className="shrink-0 text-ocean transition-transform duration-300 group-hover:scale-110" />
          {ev.location}
        </p>

        {/* Accent bas — décor statique */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
          style={{ background: accent }}
        />
      </div>
    </motion.article>
  );
}

export function EventsCalendar() {
  return (
    <div className="relative">
      {/* Zone défilable au clavier : focalisable pour permettre le scroll aux flèches */}
      <div
        tabIndex={0}
        role="region"
        aria-label="Prochains événements du club"
        className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-3 pt-2 snap-x snap-mandatory focus-visible:outline-2 focus-visible:outline-ocean sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-6"
      >
        {clubEvents.map((ev, i) => (
          <EventCard key={ev.id} ev={ev} index={i} />
        ))}
      </div>
    </div>
  );
}
