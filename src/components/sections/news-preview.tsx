import { NewsCard } from "@/components/sections/news-card";
import { Reveal } from "@/components/common/reveal";
import type { NewsItem } from "@/types";

export function NewsPreview({ items }: { items: NewsItem[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item, i) => (
        <Reveal key={item.id} delay={i * 0.08}>
          <NewsCard item={item} />
        </Reveal>
      ))}
    </div>
  );
}
