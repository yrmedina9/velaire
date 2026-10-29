"use client";

import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { ProductImage } from "../domain/catalog.types";

/**
 * Galería deslizable (scroll-snap). En móvil ocupa todo el ancho con
 * indicadores; en escritorio usa marco en arco, miniaturas y flechas.
 */
export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const multiple = images.length > 1;

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    if (index !== activeIndex) setActiveIndex(index);
  }

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const next = (index + images.length) % images.length;
    setActiveIndex(next);
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="md:flex md:gap-4">
      {multiple && (
        <ul className="hidden w-20 shrink-0 flex-col gap-3 md:flex lg:w-22" aria-label={`Fotos de ${name}`}>
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Ver foto ${index + 1} de ${images.length}`}
                aria-current={index === activeIndex}
                className={cn(
                  "tap relative block aspect-square w-full overflow-hidden rounded-2xl",
                  index === activeIndex
                    ? "ring-2 ring-clay-500 ring-offset-2 ring-offset-blush-50"
                    : "opacity-60 ring-1 ring-cacao-900/5 hover:opacity-100",
                )}
              >
                <Image src={image.src} alt="" fill sizes="88px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="relative -mx-4 sm:-mx-6 md:mx-0 md:flex-1">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto bg-blush-200 md:overflow-hidden md:rounded-t-[16rem] md:rounded-b-[2rem] md:shadow-card"
        >
          {images.map((image, index) => (
            <div key={image.src} className="relative aspect-[4/5] w-full shrink-0 snap-center">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {multiple && (
          <>
            <span className="glass absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-cacao-900 shadow-soft md:hidden">
              <Images className="size-3.5" strokeWidth={1.8} />
              {activeIndex + 1}/{images.length}
            </span>
            <div
              className="glass absolute bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-2.5 py-2 shadow-soft md:bottom-5"
              aria-hidden="true"
            >
              {images.map((image, index) => (
                <span
                  key={image.src}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500 ease-(--ease-ios)",
                    index === activeIndex ? "w-5 bg-clay-500" : "w-1.5 bg-cacao-900/25",
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Foto anterior"
              className="glass tap absolute top-1/2 left-4 hidden size-11 -translate-y-1/2 place-items-center rounded-full text-cacao-900 shadow-soft md:grid"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Foto siguiente"
              className="glass tap absolute top-1/2 right-4 hidden size-11 -translate-y-1/2 place-items-center rounded-full text-cacao-900 shadow-soft md:grid"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
