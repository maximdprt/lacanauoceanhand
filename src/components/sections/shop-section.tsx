import { ExternalLink, ShoppingBag, Truck } from "lucide-react";

import { helloAsso, shopItems, shopShipping } from "@/data/site";

/* ============================================================
   BOUTIQUE « BEACH HAND » — catalogue HelloAsso du club.
   Les prix sont affichés ici pour que personne n'ait à cliquer
   pour savoir combien coûte un sweat.
   ============================================================ */

export function ShopSection() {
  return (
    <div className="overflow-hidden rounded-(--radius-lg) border border-line bg-white">
      <div className="flex flex-col gap-5 border-b border-line bg-mist px-7 py-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-c-beach text-white">
            <ShoppingBag size={21} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-xl uppercase tracking-tight text-ink">
              La boutique Beach Hand
            </h3>
            <p className="mt-1 text-base text-ink-soft">
              Textile et accessoires aux couleurs du club
            </p>
          </div>
        </div>
        <a
          href={helloAsso.boutique}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-press inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-c-beach"
        >
          Commander
          <ExternalLink size={15} aria-hidden="true" />
        </a>
      </div>

      <ul className="divide-y divide-line">
        {shopItems.map((item) => (
          <li
            key={item.name}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-7 py-3.5"
          >
            <span className="font-semibold text-ink">
              {item.name}
              {item.note && (
                <span className="ml-2 text-sm font-normal text-ink-soft">
                  {item.note}
                </span>
              )}
            </span>
            <span className="section-index text-lg text-ink tabular-nums">
              {item.price}&nbsp;€
            </span>
          </li>
        ))}
      </ul>

      <p className="flex items-start gap-3 border-t border-line px-7 py-5 text-sm leading-relaxed text-ink-soft">
        <Truck size={17} className="mt-0.5 shrink-0 text-ocean" aria-hidden="true" />
        {shopShipping}
      </p>
    </div>
  );
}
