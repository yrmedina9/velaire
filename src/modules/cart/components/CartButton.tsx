"use client";

import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/cn";
import { useCart } from "../context/CartProvider";

interface CartButtonProps {
  /** Solo ícono, para la barra móvil. */
  compact?: boolean;
  className?: string;
}

export function CartButton({ compact = false, className }: CartButtonProps) {
  const { count, open } = useCart();
  const label = `Abrir mi pedido, ${count} ${count === 1 ? "producto" : "productos"}`;

  const badge = count > 0 && (
    <span
      key={count}
      className="absolute -top-1 -right-1 grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-gold-400 px-1 text-[0.65rem] font-semibold text-cacao-950 ring-2 ring-blush-50"
    >
      {count}
    </span>
  );

  if (compact) {
    return (
      <button
        type="button"
        onClick={open}
        aria-label={label}
        className={cn(
          "tap relative grid size-10 place-items-center rounded-full text-cacao-700 hover:bg-cacao-900/5",
          className,
        )}
      >
        <ShoppingBag className="size-5" strokeWidth={1.8} />
        {badge}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      aria-label={label}
      className={cn(
        "tap relative inline-flex h-11 items-center gap-2 rounded-full bg-linear-to-b from-clay-400 to-clay-600 pr-5 pl-4 text-sm font-medium text-white shadow-glow ring-1 ring-white/20 ring-inset hover:brightness-105",
        className,
      )}
    >
      <ShoppingBag className="size-4.5" strokeWidth={1.8} />
      Mi pedido
      {badge}
    </button>
  );
}
