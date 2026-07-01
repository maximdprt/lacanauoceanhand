import Image from "next/image";
import type { Partner } from "@/types";

export function PartnersCarousel({ partners }: { partners: Partner[] }) {
  const loop = [...partners, ...partners];
  return (
    <div className="relative overflow-hidden py-2">
      {/* fondus latéraux */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-paper to-transparent" />
      <div className="marquee items-stretch gap-5">
        {loop.map((p, i) => {
          const hasSite = Boolean(p.website) && p.website !== "#";
          const className =
            "card-lift flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-line bg-white p-5";
          const inner = (
            <span className="relative h-full w-full">
              <Image src={p.logo} alt={`Logo ${p.name} — partenaire Lacanau Océhand`} fill className="object-contain" loading="lazy" />
            </span>
          );
          return hasSite ? (
            <a
              key={`${p.id}-${i}`}
              href={p.website}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
              aria-label={p.name}
            >
              {inner}
            </a>
          ) : (
            <div key={`${p.id}-${i}`} className={className} aria-label={p.name}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
