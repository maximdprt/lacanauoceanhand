"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Waves,
  CalendarDays,
  MapPin,
  Users,
  Flag,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

import { beachXperienceUrl } from "@/data/site";
import { SectionTitle } from "@/components/common/section-title";
import { Reveal } from "@/components/common/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { stagger, fadeUp, VIEWPORT } from "@/lib/animations";

const facts = [
  { icon: Users, label: "Dès l'U13 & adultes", note: "Ouvert à tous les niveaux" },
  { icon: CalendarDays, label: "De mai à août", note: "La saison estivale sur sable" },
  { icon: MapPin, label: "Pôle de l'Ardilouse", note: "Les pieds dans le sable, à Lacanau-Océan" },
  { icon: Waves, label: "Format 4 + 1", note: "Vitesse et gestes spectaculaires" },
];

const xperienceTeams = ["Lacanau", "Amsterdam", "Londres", "Alpes-Maritimes"];

const gallery = [
  { src: "/media/beach/londres.jpg", alt: "L'équipe de Londres (London GD) au Lacanau Beach Handball Xperience" },
  { src: "/media/beach/amsterdam.jpg", alt: "L'équipe d'Amsterdam sur le sable de Lacanau" },
  { src: "/media/beach/alpes.jpg", alt: "L'équipe Beach Handball des Alpes-Maritimes" },
  { src: "/media/beach/stage-sable.jpg", alt: "Entraînement de beach handball sur le sable de l'Ardilouse" },
];

export function BeachSection() {
  return (
    <section
      id="beach"
      className="relative overflow-hidden border-y border-line bg-ink text-white"
    >
      {/* décor : grille fine + halo beach */}
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -right-24 top-4 h-72 w-72 rounded-full bg-c-beach/25 blur-3xl" />

      <div className="container-x section-pad relative">
        <Reveal>
          <SectionTitle
            eyebrow="Beach Handball"
            title="Le hand, les pieds dans le sable"
            description="Chaque été, Lacanau Océhand troque le parquet pour le sable : une version rapide, festive et spectaculaire du handball, à deux pas de l'océan."
            align="center"
            light
          />
        </Reveal>

        {/* Image + faits clés */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center md:mt-16">
          <Reveal>
            <div className="group relative aspect-4/3 overflow-hidden rounded-(--radius-lg) border border-white/10">
              <Image
                src="/media/beach/stage-sable.jpg"
                alt="Beach handball sur le sable du Pôle de l'Ardilouse à Lacanau"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="img-zoom object-cover"
              />
            </div>
          </Reveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid gap-4 sm:grid-cols-2"
          >
            {facts.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.label}
                  variants={fadeUp}
                  className="rounded-(--radius) border border-white/10 bg-white/5 p-5 transition-colors hover:border-c-beach/40"
                >
                  <Icon className="text-c-beach" size={24} />
                  <p className="mt-3 font-bold">{f.label}</p>
                  <p className="mt-1 text-sm leading-snug text-white/60">{f.note}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Lacanau Beach Handball Xperience */}
        <Reveal delay={0.05}>
          <div className="mt-8 rounded-(--radius-lg) border border-c-beach/30 bg-white/5 p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 text-c-beach">
                  <Flag size={18} />
                  <span className="eyebrow">Le tournoi du club</span>
                </span>
                <h3 className="mt-3 font-display text-2xl uppercase tracking-tight md:text-3xl">
                  Lacanau Beach Handball Xperience
                </h3>
                <p className="mt-3 leading-relaxed text-white/70">
                  Le rendez-vous beach du club, en juillet sur le sable du Pôle de
                  l&apos;Ardilouse. La 2ᵉ édition a réuni des équipes venues
                  d&apos;Amsterdam, de Londres et des Alpes-Maritimes, arbitrage
                  compris — entre compétition et esprit de plage.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {xperienceTeams.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={beachXperienceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "ocean" }),
                  "btn-press shrink-0 rounded-full",
                )}
              >
                Découvrir le Beach Xperience <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Galerie beach */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {gallery.map((g) => (
            <motion.div
              key={g.src}
              variants={fadeUp}
              className="group relative aspect-square overflow-hidden rounded-(--radius) border border-white/10"
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="img-zoom object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Appels à l'action */}
        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/rejoindre"
              className={cn(buttonVariants({ variant: "light" }), "btn-press rounded-full")}
            >
              Rejoindre la section beach <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/equipes/beach-handball"
              className="text-sm font-semibold text-white/70 underline-offset-4 transition hover:text-white hover:underline"
            >
              Voir l&apos;équipe beach handball
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
