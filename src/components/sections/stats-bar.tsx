"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { fadeUp, stagger } from "@/lib/animations";
import type { ClubStat } from "@/types";

/* Compteur count-up : ~1.4 s, courbe ease-out (signature du site). */
const COUNT_DURATION = 1400;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Compte de 0 → target dès que `active` passe à true (entrée en vue).
 * Respecte prefers-reduced-motion : rend la valeur finale immédiatement.
 */
function useCountUp(target: number, active: boolean) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      // Valeur finale au prochain frame (pas de setState synchrone dans l'effet)
      const frameId = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(frameId);
    }

    let frameId = 0;
    let start = 0;
    const step = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / COUNT_DURATION, 1);
      setValue(Math.round(easeOut(progress) * target));
      if (progress < 1) frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [active, reduce, target]);

  return value;
}

function StatCard({ stat, active }: { stat: ClubStat; active: boolean }) {
  const count = useCountUp(stat.value, active);

  return (
    <motion.div variants={fadeUp} className="text-center">
      <p className="font-display text-5xl leading-none md:text-6xl">
        <span className="text-gold tabular-nums">
          {stat.prefix ?? ""}
          {count}
          {stat.suffix ?? ""}
        </span>
      </p>
      <p className="mt-3 text-xs uppercase tracking-widest text-white/60">
        {stat.label}
      </p>
    </motion.div>
  );
}

export function StatsBar({ stats }: { stats: ClubStat[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-ink text-white">
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="container-x grid grid-cols-2 gap-y-10 gap-x-8 py-14 md:grid-cols-4 md:py-20"
      >
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} active={inView} />
        ))}
      </motion.div>
    </section>
  );
}
