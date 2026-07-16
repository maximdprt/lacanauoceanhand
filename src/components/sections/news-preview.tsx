"use client";

import { motion } from "framer-motion";
import { NewsCard } from "@/components/sections/news-card";
import { stagger, fadeUp, VIEWPORT } from "@/lib/animations";
import type { NewsItem } from "@/types";

export function NewsPreview({ items }: { items: NewsItem[] }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="grid gap-6 md:grid-cols-3"
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={fadeUp}>
          <NewsCard item={item} />
        </motion.div>
      ))}
    </motion.div>
  );
}
