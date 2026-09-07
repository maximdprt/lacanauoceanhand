import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { LoginForm } from "@/components/admin/login-form";

/* ============================================================
   CONNEXION À L'ESPACE D'ADMINISTRATION
   Une seule chose à faire sur cet écran : saisir le code du club.
   ============================================================ */

export default async function ConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ suite?: string }>;
}) {
  const { suite } = await searchParams;

  return (
    <main
      id="contenu"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-ink px-5 py-16"
    >
      {/* décor : la grille fine et le halo doré du reste du site */}
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="glow-ocean pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative w-full max-w-[26rem]">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/brand/logo-white.png"
            alt=""
            priority
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
          />
          <p className="eyebrow mt-5 text-gold">Espace du club</p>
          <h1 className="headline mt-2 text-[clamp(1.7rem,6vw,2.2rem)] text-white">
            Administration
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/60">
            Saisissez le code du club pour modifier les tarifs, les créneaux et
            les rendez-vous du site.
          </p>
        </div>

        <div className="mt-8 rounded-(--radius-lg) border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-7">
          <LoginForm suite={suite} />
        </div>

        <Link
          href="/"
          className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-white/50 transition hover:text-white"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Retour au site
        </Link>
      </div>
    </main>
  );
}
