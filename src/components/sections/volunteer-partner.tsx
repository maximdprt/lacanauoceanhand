"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, HandHeart, Handshake } from "lucide-react";

import { fadeUp, stagger } from "@/lib/animations";

const blocks = [
  {
    icon: HandHeart,
    eyebrow: "Devenir bénévole",
    title: "Le club tourne grâce à vous",
    text: "Table de marque, buvette, transport, communication, événements : chaque coup de main compte. Aucune compétence requise, juste l'envie de participer.",
    cta: "Devenir bénévole",
    href: "/rejoindre#benevole",
    image: "/media/club/reunion-encadrants.jpg",
    accent: "var(--c-jeunes)",
  },
  {
    icon: Handshake,
    eyebrow: "Devenir partenaire",
    title: "Associez votre image à un club gagnant",
    text: "Visibilité sur les maillots, au gymnase et sur nos réseaux. Soutenez un club champion de France, ancré dans la vie locale de Lacanau et du Médoc.",
    cta: "Devenir partenaire",
    href: "/rejoindre#partenaire",
    image: "/media/club/vestiaire-celebration.jpg",
    accent: "var(--c-beach)",
  },
];

export function VolunteerPartner() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="grid gap-6 md:grid-cols-2"
    >
      {blocks.map((b) => {
        const Icon = b.icon;
        return (
          <motion.div key={b.eyebrow} variants={fadeUp}>
            <Link
              href={b.href}
              className="group relative flex h-full flex-col overflow-hidden rounded-(--radius-lg) border border-line bg-white"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={b.image}
                  alt={`${b.title} · Lacanau Océhand`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink/70 to-transparent" />
                <span
                  className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-white"
                  style={{ background: b.accent }}
                >
                  <Icon size={20} />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="eyebrow text-ink-soft">{b.eyebrow}</span>
                <h3 className="mt-2 headline text-2xl text-ink">{b.title}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-ink-soft">
                  {b.text}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-ink transition group-hover:text-ocean">
                  {b.cta}
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
