"use client";

import { Check, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Product } from "@/modules/catalog/domain/catalog.types";
import { useCart } from "../context/CartProvider";

interface AddToCartButtonProps {
  product: Pick<Product, "slug" | "name" | "price" | "images">;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
  /** Botón redondo solo con ícono, para tarjetas de producto. */
  compact?: boolean;
}

export function AddToCartButton({
  product,
  size = "md",
  className,
  label = "Agregar al pedido",
  compact = false,
}: AddToCartButtonProps) {
  const { add, open } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    add({ slug: product.slug, name: product.name, price: product.price, image: product.images[0].src });
    setAdded(true);
    open();
    window.setTimeout(() => setAdded(false), 1800);
  }

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Agregar ${product.name} al pedido`}
        className={cn(
          "grid size-11 place-items-center rounded-full bg-white/95 text-clay-600 shadow-md shadow-cacao-900/10 backdrop-blur transition hover:bg-clay-500 hover:text-white",
          className,
        )}
      >
        {added ? <Check className="size-5" /> : <Plus className="size-5" />}
      </button>
    );
  }

  return (
    <button type="button" onClick={handleClick} className={buttonStyles({ size, className })}>
      {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" strokeWidth={1.8} />}
      {added ? "¡Agregado!" : label}
    </button>
  );
}
