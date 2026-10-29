import { cn } from "@/lib/cn";
import type { Product } from "../domain/catalog.types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  categoryNames?: Record<string, string>;
  className?: string;
  /** Cantidad de tarjetas iniciales cuyas imágenes cargan sin lazy loading. */
  eagerCount?: number;
  /** `rail`: carrusel deslizable en móvil y cuadrícula desde md. */
  layout?: "grid" | "rail";
}

export function ProductGrid({ products, categoryNames, className, eagerCount = 0, layout = "grid" }: ProductGridProps) {
  const rail = layout === "rail";
  return (
    <div
      className={cn(
        rail
          ? "no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pt-1 pb-6 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4"
          : "grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.slug}
          product={product}
          categoryName={categoryNames?.[product.category]}
          eager={index < eagerCount}
          className={rail ? "w-[64%] shrink-0 snap-start sm:w-[42%] md:w-auto" : undefined}
        />
      ))}
    </div>
  );
}
