"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import type { ProductImage } from "../domain/catalog.types";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      {images.length > 1 && (
        <ul className="flex gap-3 overflow-x-auto [scrollbar-width:none] lg:flex-col" aria-label={`Fotos de ${name}`}>
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Ver foto ${index + 1} de ${images.length}`}
                aria-current={index === activeIndex}
                className={cn(
                  "relative block size-20 overflow-hidden rounded-2xl transition lg:size-22",
                  index === activeIndex
                    ? "ring-2 ring-clay-500 ring-offset-2 ring-offset-blush-50"
                    : "opacity-70 hover:opacity-100",
                )}
              >
                <Image src={image.src} alt="" fill sizes="88px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="relative flex-1 overflow-hidden rounded-t-[12rem] rounded-b-[2rem] bg-blush-200 sm:rounded-t-[16rem]">
        <Image
          key={active.src}
          src={active.src}
          alt={active.alt}
          width={active.width}
          height={active.height}
          loading="eager"
          fetchPriority={activeIndex === 0 ? "high" : "auto"}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="aspect-[4/5] h-auto w-full animate-fade-in object-cover"
        />
      </div>
    </div>
  );
}
