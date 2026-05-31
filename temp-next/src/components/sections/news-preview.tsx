import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { NewsItem } from "@/types";

export function NewsPreview({ items }: { items: NewsItem[] }) {
  const [featured, ...rest] = items;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Card principale */}
      {featured && (
        <Link
          href="/evenements"
          className="group relative col-span-full overflow-hidden rounded-2xl md:col-span-2"
        >
          <div className="relative aspect-[16/9] bg-slate-900">
            <Image
              src={featured.cover}
              alt={featured.title}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="mb-2 flex items-center gap-2">
              <Badge className="text-[10px]">{featured.tags[0]}</Badge>
              <span className="text-xs text-white/50">{featured.date}</span>
            </div>
            <h3 className="font-display text-2xl uppercase leading-tight text-white md:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-white/70">{featured.excerpt}</p>
            <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ocean-light transition-gap group-hover:gap-3">
              Lire la suite <ArrowRight size={12} />
            </span>
          </div>
        </Link>
      )}

      {/* Cards secondaires */}
      <div className="col-span-full flex flex-col gap-4 md:col-span-1">
        {rest.map((news) => (
          <Link
            key={news.id}
            href="/evenements"
            className="group flex gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={news.cover}
                alt={news.title}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                sizes="80px"
              />
            </div>
            <div className="flex flex-col justify-between py-1">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">{news.date}</p>
                <p className="mt-1 text-sm font-semibold leading-snug text-slate-800 line-clamp-2">
                  {news.title}
                </p>
              </div>
              <span className="text-xs font-medium text-ocean-light">
                {news.tags[0]}
              </span>
            </div>
          </Link>
        ))}

        <Link
          href="/evenements"
          className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 py-4 text-sm font-semibold text-slate-500 transition hover:border-ocean/50 hover:bg-ocean/5 hover:text-ocean"
        >
          Voir tous les evenements <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
