import type { Variants } from "framer-motion";

/* ============================================================
   SYSTÈME DE MOUVEMENT — source unique.
   2 courbes max : EASE.out pour les fondus, SPRING pour les
   interactions. Toutes les durées/viewports centralisés ici.
   ============================================================ */

export const EASE = {
  out: [0.22, 1, 0.36, 1] as const, // signature du site (easeOutExpo doux)
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const DUR = {
  fast: 0.2,
  base: 0.4,
  slow: 0.6,
  hero: 0.8,
} as const;

export const SPRING = {
  soft: { type: "spring", stiffness: 260, damping: 24 } as const,
  snappy: { type: "spring", stiffness: 400, damping: 30 } as const,
};

// Déclenchement au scroll — une seule fois, dès 20 % visible (assez tôt
// pour ne jamais laisser de contenu masqué durablement).
export const VIEWPORT = { once: true, amount: 0.2 } as const;

/* ---------- Variants réutilisables ---------- */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE.out } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE.out } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: DUR.slow, ease: EASE.out } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: DUR.slow, ease: EASE.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: DUR.base, ease: EASE.out } },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  show: { opacity: 1, filter: "blur(0px)", transition: { duration: DUR.hero, ease: EASE.out } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.slow, ease: EASE.out } },
};

/* ---------- Conteneurs (cascade) ---------- */
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } },
};
