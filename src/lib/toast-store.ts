import type { LucideIcon } from "lucide-react";

export interface Toast {
  id: number;
  title: string;
  description?: string;
  image?: string;
  icon?: LucideIcon;
  action?: { label: string; onClick: () => void };
}

/**
 * Store mínimo de notificaciones. Se muestra una a la vez, como en
 * las apps nativas; una nueva reemplaza a la anterior.
 */
let current: Toast | null = null;
let nextId = 1;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

export const toastStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => current,
  getServerSnapshot: () => null,
  dismiss(id?: number) {
    if (id === undefined || current?.id === id) {
      current = null;
      emit();
    }
  },
};

export function toast(data: Omit<Toast, "id">) {
  current = { ...data, id: nextId++ };
  emit();
}
