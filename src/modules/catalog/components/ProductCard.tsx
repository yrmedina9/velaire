import { ArrowUpRight, Heart, Snowflake, Sparkles, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "@/modules/cart/components/AddToCartButton";
import type { Product } from "../domain/catalog.types";
import { CategoryIcon } from "../lib/catalog-icons";
import { swatchFor } from "../lib/color-swatches";

interface ProductCardProps {
  product: Product;
  categoryName?: string;
  className?: string;
  /** Carga la imagen sin lazy loading (tarjetas visibles al cargar). */
  eager?: boolean;
}

const MAX_SWATCHES = 4;

function primaryBadge(product: Product) {
  if (product.isNew) return { label: "Nuevo", icon: Sparkles, className: "bg-clay-500/90 text-white" };
  if (product.featured) return { label: "Favorito", icon: Heart, className: "bg-white/85 text-clay-600" };
  if (product.seasonal) return { label: "Temporada", icon: Snowflake, className: "bg-cacao-950/60 text-blush-50" };
  return null;
}

export function ProductCard({ product, categoryName, className, eager = false }: ProductCardProps) {
  const [cover, hover] = product.images;
  const href = `/producto/${product.slug}`;
  const badge = primaryBadge(product);
  const extraColors = product.colors.length - MAX_SWATCHES;

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-[1.6rem] bg-white p-1.5 shadow-card ring-1 ring-cacao-900/[0.04] transition duration-500 ease-(--ease-ios) hover:-translate-y-1 hover:shadow-float sm:p-2",
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.2rem] bg-blush-200 sm:rounded-[1.3rem]">
        <Link href={href} aria-label={product.name} className="absolute inset-0">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            loading={eager ? "eager" : "lazy"}
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw"
            className={cn(
              "object-cover transition duration-700 ease-(--ease-ios) group-hover:scale-105",
              hover && "md:group-hover:opacity-0",
            )}
          />
          {hover && (
            <Image
              src={hover.src}
              alt=""
              fill
              sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw"
              className="hidden scale-105 object-cover opacity-0 transition duration-700 ease-(--ease-ios) group-hover:scale-100 group-hover:opacity-100 md:block"
            />
          )}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-cacao-950/30 to-transparent"
          />
        </Link>

        {badge && (
          <span
            className={cn(
              "pointer-events-none absolute top-2 left-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[0.62rem] font-semibold tracking-wide uppercase shadow-soft backdrop-blur-md sm:top-2.5 sm:left-2.5 sm:px-2.5",
              badge.className,
            )}
          >
            <badge.icon className="size-3" strokeWidth={2.2} />
            {badge.label}
          </span>
        )}

        {product.colors.length > 0 && (
          <span
            className="pointer-events-none absolute bottom-2.5 left-2.5 flex items-center rounded-full bg-white/85 p-1 shadow-soft backdrop-blur-md"
            aria-label={`Colores: ${product.colors.join(", ")}`}
          >
            <span className="flex -space-x-1">
              {product.colors.slice(0, MAX_SWATCHES).map((color) => (
                <span
                  key={color}
                  className="size-3.5 rounded-full ring-2 ring-white"
                  style={{ background: swatchFor(color) }}
                />
              ))}
            </span>
            {extraColors > 0 && <span className="px-1 text-[0.6rem] font-medium text-cacao-700">+{extraColors}</span>}
          </span>
        )}

        <AddToCartButton
          product={product}
          compact
          className="absolute right-2 bottom-2 sm:right-2.5 sm:bottom-2.5 md:translate-y-1 md:opacity-0 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-1 flex-col px-1.5 pt-3 pb-1.5 sm:px-2 sm:pt-3.5">
        {categoryName && (
          <p className="flex items-center gap-1.5 text-[0.62rem] font-semibold tracking-[0.16em] text-clay-500 uppercase">
            <CategoryIcon slug={product.category} className="size-3" strokeWidth={2} />
            {categoryName}
          </p>
        )}
        <h3 className="mt-1 font-display text-[1.12rem] leading-[1.15] font-medium text-cacao-900 sm:text-[1.35rem]">
          <Link href={href} className="transition-colors hover:text-clay-600">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 hidden text-[0.82rem] leading-relaxed text-cacao-700 sm:line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-clay-600">
            <Tag className="size-3.5" strokeWidth={1.8} />
            {product.price === null ? "A cotizar" : formatPrice(product.price)}
          </span>
          <Link
            href={href}
            tabIndex={-1}
            aria-hidden="true"
            className="hidden size-8 place-items-center rounded-full bg-blush-100 text-cacao-700 transition group-hover:bg-cacao-900 group-hover:text-white sm:grid"
          >
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
