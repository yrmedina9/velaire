"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartProvider";

export function CartButton() {
  const { count, open } = useCart();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Abrir mi pedido, ${count} ${count === 1 ? "producto" : "productos"}`}
      className="relative inline-flex h-11 items-center gap-2 rounded-full bg-clay-500 px-4 text-sm font-medium text-white transition hover:bg-clay-600"
    >
      <ShoppingBag className="size-4.5" strokeWidth={1.8} />
      <span className="hidden sm:inline">Mi pedido</span>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 grid size-5.5 place-items-center rounded-full bg-gold-400 text-[0.7rem] font-semibold text-cacao-900 ring-2 ring-blush-50">
          {count}
        </span>
      )}
    </button>
  );
}
