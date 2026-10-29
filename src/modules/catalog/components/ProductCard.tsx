import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "@/modules/cart/components/AddToCartButton";
import type { Product } from "../domain/catalog.types";

interface ProductCardProps {
  product: Product;
  categoryName?: string;
  className?: string;
  /** Carga la imagen sin lazy loading (tarjetas visibles al cargar). */
  eager?: boolean;
}

export function ProductCard({ product, categoryName, className, eager = false }: ProductCardProps) {
  const [cover, hover] = product.images;
  const href = `/producto/${product.slug}`;

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-blush-200">
        <Link href={href} aria-label={product.name} className="absolute inset-0">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            loading={eager ? "eager" : "lazy"}
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw"
            className={cn(
              "object-cover transition duration-700 ease-out group-hover:scale-105",
              hover && "group-hover:opacity-0",
            )}
          />
          {hover && (
            <Image
              src={hover.src}
              alt=""
              fill
              sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw"
              className="scale-105 object-cover opacity-0 transition duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
            />
          )}
        </Link>

        <div className="pointer-events-none absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.isNew && <Badge tone="clay">Nuevo</Badge>}
          {product.featured && !product.isNew && <Badge tone="gold">Favorito</Badge>}
          {product.seasonal && <Badge tone="dark">Temporada</Badge>}
        </div>

        <AddToCartButton
          product={product}
          compact
          className="absolute right-3 bottom-3 transition duration-300 md:translate-y-2 md:opacity-0 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        {categoryName && (
          <p className="text-[0.7rem] font-medium tracking-[0.2em] text-clay-500 uppercase">{categoryName}</p>
        )}
        <h3 className="mt-1 font-display text-xl leading-tight font-medium text-cacao-900 sm:text-2xl">
          <Link href={href} className="transition-colors hover:text-clay-500">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-cacao-700">{product.shortDescription}</p>
        <p className="mt-auto pt-3 text-sm font-medium text-clay-600">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
