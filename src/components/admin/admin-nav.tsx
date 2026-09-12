"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  CircleHelp,
  ClipboardList,
  Clock,
  Euro,
  ExternalLink,
  Handshake,
  Image as ImageIcon,
  LayoutGrid,
  Link2,
  LogOut,
  MapPin,
  Menu,
  ShieldCheck,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";

import { adminSections, type Section } from "@/lib/admin-sections";
import { seDeconnecter } from "@/app/admin/actions";
import { defaultImages } from "@/data/images";
import { cn } from "@/lib/utils";

/* ============================================================
   MENU DE L'ESPACE D'ADMINISTRATION
   Barre latérale sur grand écran, tiroir sur téléphone. Le club met
   souvent le site à jour depuis un gymnase : les deux formats comptent.
   ============================================================ */

const icones: Record<Section["icon"], typeof Euro> = {
  euro: Euro,
  clock: Clock,
  calendar: CalendarDays,
  users: Users,
  whistle: ClipboardList,
  shield: ShieldCheck,
  shop: ShoppingBag,
  help: CircleHelp,
  handshake: Handshake,
  map: MapPin,
  image: ImageIcon,
  link: Link2,
};

function Liens({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const lien = (href: string, actif: boolean, contenu: React.ReactNode) => (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={actif ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-(--radius-sm) px-3 py-2.5 text-sm font-semibold transition",
        actif ? "bg-white/12 text-white" : "text-white/60 hover:bg-white/6 hover:text-white",
      )}
    >
      {contenu}
    </Link>
  );

  return (
    <nav aria-label="Rubriques modifiables" className="flex flex-1 flex-col gap-1">
      {lien(
        "/admin",
        pathname === "/admin",
        <>
          <LayoutGrid size={17} className="shrink-0" aria-hidden="true" />
          Vue d&apos;ensemble
        </>,
      )}

      <p className="mb-1 mt-5 px-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/35">
        Contenu du site
      </p>

      {adminSections.map((section) => {
        const Icone = icones[section.icon];
        return (
          <span key={section.slug}>
            {lien(
              `/admin/${section.slug}`,
              pathname === `/admin/${section.slug}`,
              <>
                <Icone size={17} className="shrink-0" aria-hidden="true" />
                {section.label}
              </>,
            )}
          </span>
        );
      })}
    </nav>
  );
}

function PiedDeMenu() {
  return (
    <div className="mt-6 space-y-1 border-t border-white/10 pt-4">
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-(--radius-sm) px-3 py-2.5 text-sm font-semibold text-white/60 transition hover:bg-white/6 hover:text-white"
      >
        <ExternalLink size={17} className="shrink-0" aria-hidden="true" />
        Voir le site
      </a>
      <form action={seDeconnecter}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-(--radius-sm) px-3 py-2.5 text-left text-sm font-semibold text-white/60 transition hover:bg-white/6 hover:text-white"
        >
          <LogOut size={17} className="shrink-0" aria-hidden="true" />
          Se déconnecter
        </button>
      </form>
    </div>
  );
}

function Marque({ logo }: { logo: string }) {
  return (
    <Link href="/admin" className="flex items-center gap-2.5">
      <Image
        src={logo}
        alt=""
        priority
        width={34}
        height={34}
        className="h-[34px] w-[34px] shrink-0 object-contain"
      />
      <span className="min-w-0">
        <span className="block truncate font-display text-base uppercase leading-none tracking-tight text-white">
          Lacanau Océhand
        </span>
        <span className="mt-1 block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold">
          Administration
        </span>
      </span>
    </Link>
  );
}

/** `logo` vient du contenu modifiable (cf. /admin → Photos du site) : le
    club retrouve son logo ici comme sur le site. */
export function AdminNav({ logo = defaultImages.logoBlanc }: { logo?: string } = {}) {
  const [ouvert, setOuvert] = useState(false);

  // Le tiroir se referme au clic sur un lien (cf. `onNavigate` plus bas) ;
  // ne reste ici que ce qu'il fait au document lui-même.
  useEffect(() => {
    document.body.style.overflow = ouvert ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ouvert]);

  useEffect(() => {
    if (!ouvert) return;
    const auClavier = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    window.addEventListener("keydown", auClavier);
    return () => window.removeEventListener("keydown", auClavier);
  }, [ouvert]);

  return (
    <>
      {/* Grand écran : barre latérale fixe */}
      <aside className="sticky top-0 hidden h-svh w-[16.5rem] shrink-0 flex-col overflow-y-auto border-r border-white/10 bg-ink px-4 py-6 lg:flex">
        <Marque logo={logo} />
        <div className="mt-8 flex flex-1 flex-col">
          <Liens />
          <PiedDeMenu />
        </div>
      </aside>

      {/* Téléphone et tablette : barre du haut + tiroir */}
      <div className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-white/10 bg-ink px-4 py-3 lg:hidden">
        <Marque logo={logo} />
        <button
          type="button"
          onClick={() => setOuvert((v) => !v)}
          aria-expanded={ouvert}
          aria-controls="menu-admin"
          aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white"
        >
          {ouvert ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
        </button>
      </div>

      {ouvert && (
        <div
          id="menu-admin"
          className="fixed inset-x-0 bottom-0 top-[65px] z-40 overflow-y-auto bg-ink px-4 py-5 lg:hidden"
        >
          <Liens onNavigate={() => setOuvert(false)} />
          <PiedDeMenu />
        </div>
      )}
    </>
  );
}
