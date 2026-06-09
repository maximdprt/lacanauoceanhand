"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { ageCategories, pricingPerks } from "@/data/site";
import { fadeUp, stagger } from "@/lib/animations";

export function JoinCta() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      {/* Catégories d'âge */}
      <div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-4"
        >
          {ageCategories.map((c) => (
            <motion.div
              key={c.label}
              variants={fadeUp}
              className="card-lift relative overflow-hidden rounded-2xl border border-line bg-white p-5"
            >
              <span
                className="absolute left-0 top-0 h-full w-1"
                style={{ background: c.accent }}
              />
              <p className="section-index text-2xl text-ink">{c.age}</p>
              <p className="mt-2 font-display text-[15px] uppercase tracking-tight text-ink">
                {c.label}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{c.note}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Avantages + CTA */}
      <div className="flex flex-col justify-center">
        <h3 className="headline text-[clamp(1.6rem,3vw,2.2rem)] text-ink">
          Pourquoi nous rejoindre
        </h3>
        <ul className="mt-6 space-y-3.5">
          {pricingPerks.map((perk) => (
            <li key={perk} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-c-jeunes/12 text-c-jeunes">
                <Check size={14} strokeWidth={3} />
              </span>
              <span className="text-[15px] leading-relaxed text-ink-soft">{perk}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link
            href="/rejoindre"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-bold text-white transition hover:bg-ocean"
          >
            Je m'inscris au club
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
