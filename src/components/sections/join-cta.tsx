"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { ageCategories, pricingPerks } from "@/data/site";
import type { AgeCategory } from "@/types";

const rowSpring: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.1,
    },
  }),
};

function AgeRow({ category, index }: { category: AgeCategory; index: number }) {
  return (
    <motion.li
      custom={index}
      variants={rowSpring}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className="group relative overflow-hidden"
    >
      <span
        className="absolute inset-y-0 left-0 w-1"
        style={{ background: category.accent }}
        aria-hidden
      />
      <motion.div
        className="flex flex-col gap-1 border-b border-line py-5 pl-6 pr-2 sm:flex-row sm:items-baseline sm:gap-8 sm:py-6 sm:pl-8"
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <span
          className="section-index shrink-0 text-[clamp(1.75rem,4vw,2.5rem)] leading-none"
          style={{ color: category.accent }}
        >
          {category.age}
        </span>
        <div className="min-w-0">
          <p className="font-display text-sm uppercase tracking-tight text-ink sm:text-base">
            {category.label}
          </p>
          <p className="mt-0.5 text-sm text-ink-soft">{category.note}</p>
        </div>
        <motion.span
          className="mt-2 block h-0.5 w-0 origin-left sm:ml-auto sm:mt-0 sm:w-12"
          style={{ background: category.accent }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.35, duration: 0.45 }}
        />
      </motion.div>
    </motion.li>
  );
}

export function JoinCta() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <ul className="divide-y divide-transparent">
        {ageCategories.map((c, i) => (
          <AgeRow key={c.label} category={c} index={i} />
        ))}
      </ul>

      <div className="flex flex-col justify-center">
        <h3 className="headline text-center text-[clamp(1.6rem,3vw,2.2rem)] text-ink lg:text-left">
          Pourquoi nous rejoindre
        </h3>
        <ul className="mt-6 space-y-3.5">
          {pricingPerks.map((perk, i) => (
            <motion.li
              key={perk}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-c-jeunes/12 text-c-jeunes">
                <Check size={14} strokeWidth={3} />
              </span>
              <span className="text-base leading-relaxed text-ink-soft">{perk}</span>
            </motion.li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center lg:justify-start">
          <Link
            href="/rejoindre"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-bold text-white transition hover:bg-ocean"
          >
            Je m&apos;inscris au club
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
