"use client";

import { ArrowDown, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { beachXperienceUrl } from "@/data/site";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <Image
        src="/media/teams/beach-elite.jpg"
        alt="Lacanau Ocehand en action"
        fill
        priority
        className="object-cover object-center"
      />
      {/* gradient plus riche */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/88 via-slate-900/55 to-slate-800/20" />
      {/* bande bleu en bas */}
      <div className="absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-ocean to-transparent opacity-60" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-4 pt-24 pb-8 sm:px-6 md:px-10">
        <motion.div
          className="max-w-3xl space-y-5"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Badge champion */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-ocean/40 bg-ocean/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.2em] text-ocean-light backdrop-blur-sm">
              <Trophy size={12} />
              Champions de France 2024
            </span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-[11px] font-medium uppercase tracking-[0.14em] sm:text-sm sm:tracking-[0.25em] text-white/60"
          >
            Club officiel de handball · Lacanau, Gironde
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-[2.7rem] uppercase leading-[0.88] tracking-wide text-white sm:text-7xl md:text-[6.5rem]"
          >
            Lacanau
            <br />
            <span className="text-ocean-light">Ocehand</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Ocean, competition et passion du handball&nbsp;— un club moderne, ouvert et
            ambitieux sur la cote atlantique.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/rejoindre"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ocean px-5 py-2.5 text-xs sm:w-auto sm:px-7 sm:py-3 sm:text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-ocean/90 hover:shadow-ocean focus-visible:outline-2"
            >
              Rejoindre le club
            </Link>
            <a
              href={beachXperienceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-2.5 text-xs sm:w-auto sm:px-7 sm:py-3 sm:text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Beach Xperience →
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="hidden items-center gap-2 self-start text-white/40 sm:flex"
        >
          <ArrowDown size={14} className="animate-bounce" />
          <span className="text-xs uppercase tracking-[0.2em]">Découvrir</span>
        </motion.div>
      </div>
    </section>
  );
}

