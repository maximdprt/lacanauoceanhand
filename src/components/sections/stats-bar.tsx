"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import type { ClubStat } from "@/types";

function useCountUp(target: number, duration = 1000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frameId = 0;
    let start = 0;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration]);

  return value;
}

function StatCard({ stat }: { stat: ClubStat }) {
  const count = useCountUp(stat.value);
  const displayValue = useMemo(() => `${stat.suffix ?? ""}${count}`, [count, stat.suffix]);

  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 16 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.45 }}
      className="rounded-xl border border-white/15 bg-black/50 p-5 text-center"
    >
      <p className="font-display text-4xl uppercase text-ocean-light">{displayValue}</p>
      <p className="mt-1 text-xs uppercase tracking-widest text-white/70">{stat.label}</p>
    </motion.div>
  );
}

export function StatsBar({ stats }: { stats: ClubStat[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-5">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </section>
  );
}
