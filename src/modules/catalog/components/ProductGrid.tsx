import { cn } from "@/lib/cn";
import type { Product } from "../domain/catalog.types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  categoryNames?: Record<string, string>;
  className?: string;
  /** Cantidad de tarjetas iniciales cuyas imágenes cargan sin lazy loading. */
  eagerCount?: number;
}

export function ProductGrid({ products, categoryNames, className, eagerCount = 0 }: ProductGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {products.map((product, index) => (
        <ProductCard
          key={product.slug}
          product={product}
          categoryName={categoryNames?.[product.category]}
          eager={index < eagerCount}
        />
      ))}
    </div>
  );
}
