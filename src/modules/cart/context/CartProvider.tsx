"use client";

import { createContext, use, useCallback, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { toast } from "@/lib/toast-store";
import type { CartItem } from "../domain/cart.types";
import { cartStore } from "../store/cart-store";

interface CartContextValue {
  items: CartItem[];
  count: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** Agrega al pedido y muestra una notificación con acceso al carrito. */
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  setQuantity: typeof cartStore.setQuantity;
  remove: typeof cartStore.remove;
  clear: typeof cartStore.clear;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const add = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      cartStore.add(item, quantity);
      toast({
        title: "Agregado a tu pedido",
        description: item.name,
        image: item.image,
        action: { label: "Ver pedido", onClick: open },
      });
    },
    [open],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((total, item) => total + item.quantity, 0),
      isOpen,
      open,
      close,
      add,
      setQuantity: cartStore.setQuantity,
      remove: cartStore.remove,
      clear: cartStore.clear,
    }),
    [items, isOpen, open, close, add],
  );

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const context = use(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return context;
}
