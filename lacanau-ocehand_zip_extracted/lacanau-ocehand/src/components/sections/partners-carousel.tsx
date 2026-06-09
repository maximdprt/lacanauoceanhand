import Image from "next/image";
import type { Partner } from "@/types";

export function PartnersCarousel({ partners }: { partners: Partner[] }) {
  const loop = [...partners, ...partners];
  return (
    <div className="relative overflow-hidden rounded-[var(--radius)] border border-line bg-white py-8">
      {/* fondus latéraux */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
      <div className="marquee items-center gap-14">
        {loop.map((p, i) => (
          <a
            key={`${p.id}-${i}`}
            href={p.website}
            target="_blank"
            rel="noopener noreferrer"
            className="relative h-14 w-32 shrink-0 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
            aria-label={p.name}
          >
            <Image src={p.logo} alt={p.name} fill className="object-contain" />
          </a>
        ))}
      </div>
    </div>
  );
}
