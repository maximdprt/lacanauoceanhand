"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { NewsItem } from "@/types";

export function NewsGrid({ items }: { items: NewsItem[] }) {
  const tags = useMemo(() => ["Tous", ...new Set(items.flatMap((item) => item.tags))], [items]);
  const [activeTag, setActiveTag] = useState("Tous");

  const filteredItems = useMemo(() => {
    if (activeTag === "Tous") return items;
    return items.filter((item) => item.tags.includes(activeTag));
  }, [activeTag, items]);

  return (
    <div className="space-y-8">
      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              activeTag === tag
                ? "border-ocean bg-ocean text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:border-ocean/40 hover:text-ocean"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((news) => (
          <article
            key={news.id}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <Image
                src={news.cover}
                alt={news.title}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <Badge>{news.tags[0]}</Badge>
                <span className="text-[11px] text-slate-400">{news.date}</span>
              </div>
              <h2 className="text-lg font-bold leading-snug text-slate-900">{news.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-2">{news.excerpt}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-ocean transition group-hover:gap-2">
                Lire la suite <ArrowRight size={12} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
