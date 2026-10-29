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
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    add({ slug: product.slug, name: product.name, price: product.price, image: product.images[0].src });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Agregar ${product.name} al pedido`}
        className={cn(
          "tap grid size-10 place-items-center rounded-full shadow-soft ring-1 ring-cacao-900/5 backdrop-blur",
          added ? "bg-clay-500 text-white" : "bg-white/90 text-clay-600 hover:bg-clay-500 hover:text-white",
          className,
        )}
      >
        {added ? (
          <Check key="check" className="size-4.5 animate-pop" strokeWidth={2.4} />
        ) : (
          <Plus className="size-5" strokeWidth={2} />
        )}
      </button>
    );
  }

  return (
    <button type="button" onClick={handleClick} className={buttonStyles({ size, className: cn("tap", className) })}>
      {added ? (
        <Check key="check" className="size-4.5 animate-pop" strokeWidth={2.4} />
      ) : (
        <ShoppingBag className="size-4.5" strokeWidth={1.8} />
      )}
      {added ? "¡Agregado!" : label}
    </button>
  );
}
