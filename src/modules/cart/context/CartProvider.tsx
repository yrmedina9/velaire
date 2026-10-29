"use client";

import { createContext, use, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import type { CartItem } from "../domain/cart.types";
import { cartStore } from "../store/cart-store";

interface CartContextValue {
  items: CartItem[];
  count: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: typeof cartStore.add;
  setQuantity: typeof cartStore.setQuantity;
  remove: typeof cartStore.remove;
  clear: typeof cartStore.clear;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((total, item) => total + item.quantity, 0),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add: cartStore.add,
      setQuantity: cartStore.setQuantity,
      remove: cartStore.remove,
      clear: cartStore.clear,
    }),
    [items, isOpen],
  );

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const context = use(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return context;
}
