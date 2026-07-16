"use client";

import { motion } from "framer-motion";
import { NewsCard } from "@/components/sections/news-card";
import { stagger, fadeUp, VIEWPORT } from "@/lib/animations";
import type { NewsItem } from "@/types";

export function NewsGrid({ items }: { items: NewsItem[] }) {
  const [first, ...rest] = items;
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="grid gap-6"
    >
      {first && (
        <motion.div variants={fadeUp}>
          <NewsCard item={first} large />
        </motion.div>
      )}
      <motion.div variants={stagger} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((item) => (
          <motion.div key={item.id} variants={fadeUp}>
            <NewsCard item={item} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
