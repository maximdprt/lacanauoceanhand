import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-mist">
      {/* motif géométrique discret */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-line" />
      <div className="pointer-events-none absolute right-24 top-10 h-40 w-40 rounded-full border border-line" />

      <div className="container-x relative py-14 md:py-20">
        <nav className="mb-5 flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
          <Link href="/" className="transition hover:text-ocean">
            Accueil
          </Link>
          <ChevronRight size={13} />
          <span className="text-ink">{eyebrow}</span>
        </nav>
        <h1 className="headline text-[clamp(2.4rem,7vw,4.5rem)] text-ink">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
