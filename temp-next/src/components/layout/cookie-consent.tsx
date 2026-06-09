"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "ocehand-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
    } catch {
      /* localStorage indisponible : on n'affiche rien */
    }
  }, []);

  const decide = (value: "accepted" | "refused") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
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
          role="dialog"
          aria-label="Gestion des cookies"
          className="fixed inset-x-3 bottom-3 z-60 mx-auto max-w-3xl rounded-2xl border border-line bg-white p-5 shadow-(--shadow-lg) sm:inset-x-4 sm:bottom-4 sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ocean-tint text-ocean">
              <Cookie size={20} />
            </span>
            <p className="flex-1 text-sm leading-relaxed text-ink-soft">
              Ce site utilise des cookies pour améliorer votre expérience et mesurer
              son audience. Vous pouvez les accepter ou les refuser.
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
