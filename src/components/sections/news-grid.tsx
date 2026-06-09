import { NewsCard } from "@/components/sections/news-card";
import { Reveal } from "@/components/common/reveal";
import type { NewsItem } from "@/types";

export function NewsGrid({ items }: { items: NewsItem[] }) {
  const [first, ...rest] = items;
  return (
    <div className="grid gap-6">
      {first && (
        <Reveal>
          <NewsCard item={first} large />
        </Reveal>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.06}>
            <NewsCard item={item} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
