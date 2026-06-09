"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden bg-ink">
      {/* Image */}
      <Image
        src="/media/club/coupe-de-france-bercy.jpg"
        alt="Lacanau Océhand soulève la Coupe de France 2024 à Bercy"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dégradés pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

      {/* Motif géométrique : anneau */}
      <div className="pointer-events-none absolute -right-24 top-16 hidden h-[420px] w-[420px] rounded-full border border-white/15 md:block" />
      <div className="pointer-events-none absolute right-16 top-44 hidden h-[200px] w-[200px] rounded-full border border-white/10 md:block" />

      {/* Contenu */}
      <div className="container-x relative flex min-h-[88vh] flex-col justify-end pb-16 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-c-beach" />
          Club de handball · Lacanau
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="headline max-w-4xl text-[clamp(2.8rem,9vw,6.5rem)] text-white"
        >
          Le handball
          <br />à Lacanau
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.16 }}
          className="mt-5 max-w-xl text-lg leading-relaxed text-white/85"
        >
          Champions de France 2024. Du baby hand aux seniors, en salle et sur le
          sable — venez vivre le handball dans une ambiance familiale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.24 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/rejoindre"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-mist"
          >
            Rejoindre le club <ArrowRight size={16} />
          </Link>
          <Link
            href="/le-club"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            Découvrir le club
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
