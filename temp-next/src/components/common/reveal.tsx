"use client";

import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";

import { fadeUp } from "@/lib/animations";

export function Reveal({ children }: PropsWithChildren) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        // Blocs très hauts : avec amount 0.25, il fallait qu’un quart de la zone soit
        // visible d’un coup, ce qui ne arrivait jamais → contenu bloqué en opacity:0.
        amount: "some",
        margin: "0px 0px -48px 0px",
      }}
    >
      {children}
    </motion.div>
  );
}
