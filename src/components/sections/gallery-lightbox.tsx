"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type GalleryItem = {
  src: string;
  alt: string;
};

export function GalleryLightbox({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, itemIndex) => (
          <button
            key={item.src}
            className="group aspect-4/3 overflow-hidden rounded-lg border border-white/15"
            onClick={() => setIndex(itemIndex)}
          >
            <div className="relative h-full w-full transition group-hover:scale-105">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </button>
        ))}
      </div>
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={items.map((item) => ({ src: item.src, alt: item.alt }))}
      />
    </>
  );
}
