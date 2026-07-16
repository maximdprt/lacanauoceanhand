import Image from "next/image";
import type { Partner } from "@/types";

export function PartnersCarousel({ partners }: { partners: Partner[] }) {
  const renderItem = (p: Partner, opts?: { hidden?: boolean }) => {
    const hasSite = Boolean(p.website) && p.website !== "#";
    const className =
      "card-lift flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-line bg-white p-5";
    const inner = (
      <span className="relative h-full w-full">
        <Image
          src={p.logo}
          alt={opts?.hidden ? "" : `Logo ${p.name} · partenaire Lacanau Océhand`}
          fill
          sizes="176px"
          className="object-contain"
          loading="lazy"
        />
      </span>
    );
    return hasSite ? (
      <a
        key={p.id}
        href={p.website}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        // La copie dupliquée est aria-hidden : ses liens ne doivent pas être tabulables
        tabIndex={opts?.hidden ? -1 : undefined}
      >
        {inner}
      </a>
    ) : (
      <div key={p.id} className={className}>
        {inner}
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden py-2">
      {/* fondus latéraux */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-paper to-transparent" />
      <div className="marquee items-stretch gap-5">
        {/* 1re copie — lue par les lecteurs d'écran */}
        <div className="flex shrink-0 items-stretch gap-5">
          {partners.map((p) => renderItem(p))}
        </div>
        {/* copie dupliquée pour la boucle — masquée aux lecteurs d'écran */}
        <div className="flex shrink-0 items-stretch gap-5" aria-hidden="true">
          {partners.map((p) => renderItem(p, { hidden: true }))}
        </div>
      </div>
    </div>
  );
}
