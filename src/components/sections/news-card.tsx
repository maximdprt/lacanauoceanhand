import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { NewsItem } from "@/types";

export function NewsCard({ item, large = false }: { item: NewsItem; large?: boolean }) {
  return (
    <article className="card-lift group flex h-full flex-col overflow-hidden rounded-(--radius-lg) border border-line bg-white">
      <div className={`relative overflow-hidden ${large ? "aspect-16/10" : "aspect-16/11"}`}>
        <Image
          src={item.cover}
          alt={`${item.title} — Lacanau Océhand`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {item.tags.slice(0, 1).map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
          {item.date}
        </span>
        <h3 className={`mt-2 font-semibold leading-snug text-ink ${large ? "text-2xl" : "text-lg"}`}>
          {item.title}
        </h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
          {item.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean">
          Lire la suite <ArrowUpRight size={15} />
        </span>
      </div>
    </article>
  );
}
