import type { Metadata } from "next";

/* ============================================================
   ESPACE D'ADMINISTRATION — racine
   Ce niveau ne pose que les métadonnées : la coquille (menu, bandeau)
   est dans (espace)/layout.tsx, pour que l'écran de connexion s'affiche
   en pleine page, sans menu vers des rubriques encore inaccessibles.
   ============================================================ */

export const metadata: Metadata = {
  title: { absolute: "Administration · Lacanau Océhand" },
  // Une page d'administration n'a rien à faire dans un moteur de recherche.
  // Le même signal est envoyé en en-tête HTTP par `src/proxy.ts`.
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
