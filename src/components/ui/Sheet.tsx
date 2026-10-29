"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  /** Texto pequeño junto al título (p. ej. un contador). */
  badge?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  /** `responsive`: hoja inferior en móvil y panel lateral desde md. */
  variant?: "responsive" | "bottom";
  className?: string;
}

const CLOSE_DISTANCE = 110;

/**
 * Hoja modal al estilo iOS: sube desde abajo en móvil (se cierra
 * arrastrando hacia abajo) y aparece como panel flotante lateral en
 * pantallas grandes. Bloquea el scroll del fondo y cierra con Escape.
 */
export function Sheet({ open, onClose, title, badge, children, footer, variant = "responsive", className }: SheetProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);
  const [rendered, setRendered] = useState(open);
  const [drag, setDrag] = useState(0);

  // Mantiene la hoja montada mientras corre la animación de salida.
  if (open && !rendered) setRendered(true);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      previous?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  if (!rendered) return null;
  const closing = !open;
  const responsive = variant === "responsive";

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && responsive && window.matchMedia("(min-width: 48rem)").matches) return;
    dragStart.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (dragStart.current === null) return;
    setDrag(Math.max(0, event.clientY - dragStart.current));
  }
  function onPointerUp() {
    if (dragStart.current === null) return;
    dragStart.current = null;
    if (drag > CLOSE_DISTANCE) onClose();
    setDrag(0);
  }

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-cacao-950/35 backdrop-blur-[3px]",
          closing ? "animate-fade-out" : "animate-fade-in",
        )}
      />
      <div
        onAnimationEnd={(event) => event.target === event.currentTarget && closing && setRendered(false)}
        className={cn(
          "absolute inset-x-0 bottom-0 flex max-h-[92dvh]",
          closing ? "animate-sheet-down" : "animate-sheet-up",
          responsive &&
            "md:inset-y-3 md:right-3 md:left-auto md:max-h-none md:w-[27rem] " +
              (closing ? "md:animate-slide-out" : "md:animate-slide-in"),
        )}
      >
        <div
          ref={panelRef}
          tabIndex={-1}
          style={drag ? { transform: `translateY(${drag}px)`, transition: "none" } : undefined}
          className={cn(
            "relative flex w-full flex-col overflow-hidden rounded-t-[2rem] bg-blush-50 shadow-float ring-1 ring-cacao-900/5 transition-transform duration-300 ease-(--ease-ios) outline-none",
            responsive && "md:rounded-[2rem]",
            className,
          )}
        >
          <div
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className={cn("shrink-0 touch-none select-none", responsive && "md:touch-auto")}
          >
            <div className={cn("flex justify-center pt-2.5", responsive && "md:hidden")} aria-hidden="true">
              <span className="h-1.5 w-10 rounded-full bg-cacao-900/15" />
            </div>
            <header className="flex items-center justify-between gap-3 px-5 pt-3 pb-4 md:pt-5">
              <h2 id={titleId} className="flex items-center gap-2.5 font-display text-[1.7rem] leading-none font-medium">
                {title}
                {badge}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="tap grid size-9 place-items-center rounded-full bg-cacao-900/5 text-cacao-700 hover:bg-cacao-900/10"
              >
                <X className="size-4.5" />
              </button>
            </header>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
          {footer && <div className="shrink-0 border-t border-cacao-900/5 bg-white/70 backdrop-blur">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
