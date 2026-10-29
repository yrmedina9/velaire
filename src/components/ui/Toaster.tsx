"use client";

import { CircleCheck, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useSyncExternalStore } from "react";
import { toastStore } from "@/lib/toast-store";

const DURATION = 3600;

export function Toaster() {
  const toast = useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot, toastStore.getServerSnapshot);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => toastStore.dismiss(toast.id), DURATION);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;
  const Icon = toast.icon ?? CircleCheck;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-[calc(var(--tabbar-space)+0.5rem)] z-[60] flex justify-center px-3 md:inset-x-auto md:right-6 md:bottom-26"
      role="status"
      aria-live="polite"
    >
      <div
        key={toast.id}
        className="glass pointer-events-auto flex w-full max-w-sm animate-toast items-center gap-3 rounded-[1.4rem] p-2.5 pr-3 shadow-float ring-1 ring-white/70"
      >
        {toast.image ? (
          <span className="relative size-12 shrink-0 overflow-hidden rounded-[0.9rem] ring-1 ring-cacao-900/5">
            <Image src={toast.image} alt="" fill sizes="48px" className="object-cover" />
          </span>
        ) : (
          <span className="grid size-12 shrink-0 place-items-center rounded-[0.9rem] bg-clay-500 text-white">
            <Icon className="size-5.5" strokeWidth={1.8} />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-sm font-medium text-cacao-900">
            {toast.image && <Icon className="size-4 shrink-0 text-whatsapp-dark" strokeWidth={2.2} />}
            {toast.title}
          </p>
          {toast.description && <p className="truncate text-xs text-cacao-500">{toast.description}</p>}
        </div>
        {toast.action ? (
          <button
            type="button"
            onClick={() => {
              toast.action?.onClick();
              toastStore.dismiss(toast.id);
            }}
            className="tap shrink-0 rounded-full bg-cacao-900 px-3.5 py-2 text-xs font-medium text-blush-50"
          >
            {toast.action.label}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => toastStore.dismiss(toast.id)}
            aria-label="Cerrar notificación"
            className="tap grid size-8 shrink-0 place-items-center rounded-full text-cacao-500 hover:bg-blush-200"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
