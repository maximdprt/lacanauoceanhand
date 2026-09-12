"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, Megaphone } from "lucide-react";

import { DUR, EASE } from "@/lib/animations";
import { finDe } from "@/lib/evenements";
import type { ClubHighlight } from "@/types";

/* ============================================================
   BANDEAU « À NOTER »
   Rendu côté serveur (référencé et visible sans JS), puis retiré
   automatiquement une fois la date passée : le club n'a rien à
   faire, le site ne reste jamais bloqué sur une date dépassée.

   Toutes les informations sauf le titre sont facultatives. Une
   actualité sans date, sans horaire et sans lieu — « les
   inscriptions sont ouvertes » — s'affiche proprement : c'est la
   forme la plus courante quand le club publie depuis son
   téléphone, et elle ne doit rien casser.
   ============================================================ */

/* Le temps qui passe est une source externe : useSyncExternalStore est
   la façon prévue par React de s'y abonner sans setState dans un effet.
   Le serveur rend toujours le bandeau (visible sans JS et référençable),
   puis le client le retire si la date est dépassée. */
const subscribeToClock = (onChange: () => void) => {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
};

const makeIsPast = (end: number | null) => () => end !== null && Date.now() > end;
const neverPastOnServer = () => false;

/** Jour et mois abrégé pour la pastille, ou `null` si la date est absente. */
function splitDate(iso: string) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return {
    day: new Intl.DateTimeFormat("fr-FR", { day: "numeric" }).format(d),
    month: new Intl.DateTimeFormat("fr-FR", { month: "short" })
      .format(d)
      .replace(".", ""),
  };
}

export function EventBanner({ event }: { event: ClubHighlight }) {
  const isPast = useMemo(() => makeIsPast(finDe(event)), [event]);
  const expired = useSyncExternalStore(
    subscribeToClock,
    isPast,
    neverPastOnServer,
  );

  if (expired) return null;

  const pastille = splitDate(event.startDate);
  // Chaque ligne d'information ne s'affiche que si le club l'a remplie :
  // sans cette précaution, un « · » ou une virgule orpheline traîne dans le
  // bandeau dès qu'un champ est laissé vide.
  const quand = [event.dateLabel, event.timeLabel].filter(Boolean).join(" · ");
  const ou = [event.venue, event.city].filter(Boolean).join(", ");

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: DUR.slow, ease: EASE.out }}
      aria-labelledby="evenement-a-venir"
      className="relative overflow-hidden rounded-(--radius-lg) border border-gold/30 bg-ink text-white"
    >
      {/* décor : halo doré discret */}
      <div className="glow-gold pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative flex flex-col gap-7 p-7 md:flex-row md:items-center md:gap-9 md:p-9">
        {/* Pastille de date — remplacée par une icône quand il n'y a pas de date */}
        <div className="flex shrink-0 items-center gap-4 md:flex-col md:gap-0">
          <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-(--radius) bg-gold text-ink">
            {pastille ? (
              <>
                <span className="font-display text-3xl leading-none tracking-tight">
                  {pastille.day}
                </span>
                <span className="mt-0.5 text-xs font-bold uppercase tracking-[0.16em]">
                  {pastille.month}
                </span>
              </>
            ) : (
              <Megaphone size={30} strokeWidth={2} aria-hidden="true" />
            )}
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-gold md:mt-3">
            À noter
          </span>
        </div>

        {/* Contenu */}
        <div className="min-w-0 flex-1">
          <h2
            id="evenement-a-venir"
            className="headline text-[clamp(1.5rem,3.4vw,2.1rem)] text-white"
          >
            {event.title}
          </h2>
          {event.description && (
            <p className="mt-3 max-w-2xl whitespace-pre-line text-base leading-relaxed text-white/75">
              {event.description}
            </p>
          )}

          {(quand || ou) && (
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5">
              {quand && (
                <li className="flex items-center gap-2 text-sm font-semibold text-white/90">
                  <Clock size={15} className="shrink-0 text-gold" aria-hidden="true" />
                  {quand}
                </li>
              )}
              {ou && (
                <li className="flex items-center gap-2 text-sm font-semibold text-white/90">
                  <MapPin size={15} className="shrink-0 text-gold" aria-hidden="true" />
                  {ou}
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Appel à l'action */}
        {event.cta && (
          <Link
            href={event.cta.href}
            className="btn-press group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-ink transition hover:bg-gold"
          >
            {event.cta.label}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>
    </motion.aside>
  );
}
