"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import type { FaqItem } from "@/types";
import { JsonLd } from "@/components/common/json-ld";
import { cn } from "@/lib/utils";
import { EASE, DUR } from "@/lib/animations";

export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };

  return (
    <div>
      {/* FAQPage : plus de rich result Google depuis 2026, conservé pour
          Bing et les crawlers IA (valide schema.org, aucune pénalité). */}
      <JsonLd data={schema} />
      <div className="divide-y divide-line overflow-hidden rounded-(--radius) border border-line bg-white">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={it.question}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="text-lg font-semibold text-ink">{it.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: DUR.base, ease: EASE.out }}
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-300",
                      isOpen ? "bg-ink text-white" : "text-ink",
                    )}
                  >
                    <Plus size={16} aria-hidden="true" />
                  </motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: DUR.base, ease: EASE.out }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-base leading-relaxed text-ink-soft">
                      {it.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
