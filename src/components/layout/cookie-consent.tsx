"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";

import {
  CONSENT_OPEN_EVENT,
  readConsent,
  writeConsent,
  type ConsentValue,
} from "@/lib/consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (readConsent() === null) {
      timer = setTimeout(() => setVisible(true), 1200);
    }
    // Ré-affichage via « Gérer mes cookies » (footer / politique de confidentialité)
    const onOpen = () => setVisible(true);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
    };
  }, []);

  const decide = (value: ConsentValue) => {
    writeConsent(value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Gestion des cookies"
          className="fixed inset-x-3 bottom-3 z-60 mx-auto max-w-3xl rounded-2xl border border-line bg-white p-5 shadow-(--shadow-lg) sm:inset-x-4 sm:bottom-4 sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ocean-tint text-ocean">
              <Cookie size={20} aria-hidden="true" />
            </span>
            <p className="flex-1 text-sm leading-relaxed text-ink-soft">
              Avec votre accord, nous utilisons des cookies de mesure
              d&apos;audience (Google Analytics, Microsoft Clarity) pour
              améliorer le site. Refuser n&apos;empêche pas de naviguer.{" "}
              <Link
                href="/politique-confidentialite"
                className="font-semibold text-ocean underline underline-offset-2 hover:text-ocean-deep"
              >
                En savoir plus
              </Link>
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => decide("refused")}
                className="rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-mist"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={() => decide("accepted")}
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ocean"
              >
                Accepter
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
