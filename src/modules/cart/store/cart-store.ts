import type { CartItem } from "../domain/cart.types";

/**
 * Store externo mínimo para el pedido, persistido en localStorage.
 * Se consume con `useSyncExternalStore` para evitar desajustes de
 * hidratación entre servidor (pedido vacío) y cliente.
 */
const STORAGE_KEY = "velaire:cart:v1";
const MAX_QUANTITY = 50;
const EMPTY: CartItem[] = [];

let items: CartItem[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (Array.isArray(stored)) items = stored;
  } catch {
    items = EMPTY;
  }
}

function commit(next: CartItem[]) {
  items = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Almacenamiento no disponible (modo privado): el pedido vive en memoria.
  }
  listeners.forEach((listener) => listener());
}

const clamp = (quantity: number) => Math.min(MAX_QUANTITY, Math.max(1, quantity));

export const cartStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    hydrate();
    return items;
  },
  getServerSnapshot() {
    return EMPTY;
  },
  add(item: Omit<CartItem, "quantity">, quantity = 1) {
    hydrate();
    const existing = items.find((i) => i.slug === item.slug);
    commit(
      existing
        ? items.map((i) => (i.slug === item.slug ? { ...i, quantity: clamp(i.quantity + quantity) } : i))
        : [...items, { ...item, quantity: clamp(quantity) }],
    );
  },
  setQuantity(slug: string, quantity: number) {
    commit(items.map((i) => (i.slug === slug ? { ...i, quantity: clamp(quantity) } : i)));
  },
  remove(slug: string) {
    commit(items.filter((i) => i.slug !== slug));
  },
  clear() {
    commit(EMPTY);
  },
};
