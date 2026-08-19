"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/* ============================================================
   SOMMAIRE DE PAGE — barre d'ancres collante sous l'en-tête.
   Sur les pages longues (Nos équipes fait plus de 8 000 px), elle
   dit en permanence où l'on est et permet d'aller directement à la
   bonne section. La section active est détectée à l'IntersectionObserver
   plutôt qu'au scroll : pas de calcul à chaque pixel.
   ============================================================ */

export type PageNavItem = { id: string; label: string };

export function PageNav({ items }: { items: PageNavItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    // La zone de détection commence sous l'en-tête collant et s'arrête
    // au milieu de l'écran : la section « active » est celle dont le
    // haut vient de passer sous la barre.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-112px 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Sections de la page"
      className="sticky top-[56px] z-40 border-b border-line bg-paper/85 backdrop-blur-md"
    >
      <div className="container-x">
        {/* défilement horizontal sur mobile plutôt qu'un retour à la ligne */}
        <ul className="-mx-1 flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "block rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors duration-200",
                    isActive
                      ? "bg-ink text-white"
                      : "text-ink-soft hover:bg-mist hover:text-ink",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
