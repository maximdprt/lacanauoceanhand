import { AdminNav } from "@/components/admin/admin-nav";

/* ============================================================
   COQUILLE DE L'ESPACE D'ADMINISTRATION
   Menu à gauche (tiroir sur téléphone), contenu à droite. L'écran de
   connexion est volontairement hors de ce groupe : tant que le code
   n'est pas saisi, il n'y a aucune rubrique à afficher.
   ============================================================ */

export default function EspaceAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-svh flex-col bg-mist lg:flex-row">
      <AdminNav />
      <main id="contenu" className="min-w-0 flex-1 focus:outline-none" tabIndex={-1}>
        <div className="mx-auto w-full max-w-[62rem] px-5 py-8 md:px-8 md:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
