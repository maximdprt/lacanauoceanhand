"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const emptySubscribe = () => () => {};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Premier rendu (SSR + hydratation) : pas d'état initial masqué, sinon
  // toute la page — dont l'image LCP et le h1 — est servie en opacity:0
  // jusqu'au chargement du JS (LCP dégradé, contenu invisible sans JS).
  // L'animation ne joue que sur les navigations client suivantes.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  return (
    <motion.main
      key={pathname}
      id="contenu"
      tabIndex={-1}
      initial={mounted ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[60vh] focus:outline-none"
    >
      {children}
    </motion.main>
  );
}
