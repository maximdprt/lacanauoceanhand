"use client";

import { MotionConfig } from "framer-motion";

/**
 * Applique la préférence système « prefers-reduced-motion » à TOUTES les
 * animations framer-motion (que le CSS seul ne peut pas neutraliser).
 * reducedMotion="user" : désactive transform/scale/rotation et ne garde
 * que les fondus pour les utilisateurs concernés, sans toucher chaque composant.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
