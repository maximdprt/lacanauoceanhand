"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { testimonials } from "@/data/site";
import { fadeUp, stagger } from "@/lib/animations";

export function Testimonials() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="grid gap-6 md:grid-cols-3"
    >
      {testimonials.map((t) => (
        <motion.figure
          key={t.id}
          variants={fadeUp}
          className="card-lift flex flex-col rounded-(--radius-lg) border border-line bg-white p-7"
        >
          <Quote size={28} className="text-gold" aria-hidden />
          <blockquote className="mt-5 flex-1 text-[16px] leading-relaxed text-ink">
            {t.quote}
          </blockquote>
          <figcaption className="mt-6 border-t border-line pt-5">
            <p className="font-display text-base uppercase tracking-tight text-ink">
              {t.name}
            </p>
            <p className="mt-0.5 text-sm text-ink-soft">{t.role}</p>
          </figcaption>
        </motion.figure>
      ))}
    </motion.div>
  );
}
