"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import type { FaqItem } from "@/types";
import { cn } from "@/lib/utils";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="divide-y divide-line overflow-hidden rounded-[var(--radius)] border border-line bg-white">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={it.question}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-[17px] font-semibold text-ink">{it.question}</span>
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-300",
                    isOpen ? "rotate-45 bg-ink text-white" : "text-ink",
                  )}
                >
                  <Plus size={16} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-soft">
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
