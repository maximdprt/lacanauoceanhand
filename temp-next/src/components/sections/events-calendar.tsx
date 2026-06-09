"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import { clubEvents } from "@/data/site";
import { fadeUp, stagger } from "@/lib/animations";

const typeAccent: Record<string, string> = {
  Match: "var(--c-senior)",
  Tournoi: "var(--c-beach)",
  Manifestation: "var(--c-jeunes)",
  Stage: "var(--c-gardien)",
};

export function EventsCalendar() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {clubEvents.map((ev) => (
        <motion.article
          key={ev.id}
          variants={fadeUp}
          className={`card-lift relative flex flex-col overflow-hidden rounded-2xl border p-6 ${
            ev.highlight ? "border-gold/40 bg-gold-tint" : "border-line bg-white"
          }`}
        >
          <div className="flex items-baseline gap-2">
            <span className="section-index text-3xl text-ink">{ev.date}</span>
            <span className="text-sm font-bold uppercase tracking-wide text-ink-soft">
              {ev.month}
            </span>
          </div>
          <span
            className="mt-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
            style={{ background: typeAccent[ev.type] ?? "var(--ink)" }}
          >
            {ev.type}
          </span>
          <h3 className="mt-3 font-display text-lg uppercase leading-tight tracking-tight text-ink">
            {ev.title}
          </h3>
          <p className="mt-auto flex items-center gap-1.5 pt-4 text-sm text-ink-soft">
            <MapPin size={14} className="shrink-0 text-ocean" />
            {ev.location}
          </p>
        </motion.article>
      ))}
    </motion.div>
  );
}
