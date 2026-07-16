"use client";

import { motion } from "framer-motion";
import { stagger, fadeUp, VIEWPORT } from "@/lib/animations";
import type { TimelineEvent } from "@/types";

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <motion.div
      className="space-y-4 border-l border-ocean/45 pl-5"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {events.map((event) => (
        <motion.article
          key={event.year}
          variants={fadeUp}
          className="relative rounded-lg border border-line bg-white p-4"
        >
          <span className="absolute -left-8 top-6 h-3 w-3 rounded-full bg-ocean" />
          <p className="font-display text-3xl text-ocean">{event.year}</p>
          <h3 className="text-lg font-semibold text-ink">{event.title}</h3>
          <p className="mt-1 text-ink-soft">{event.description}</p>
        </motion.article>
      ))}
    </motion.div>
  );
}
