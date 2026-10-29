"use client";

import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buttonStyles } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/whatsapp";
import type { CustomerDetails } from "../domain/cart.types";
import { useCart } from "../context/CartProvider";
import { buildOrderMessage } from "../lib/order-message";

const inputClass =
  "w-full rounded-xl border border-blush-300 bg-white px-3.5 py-2.5 text-sm text-cacao-900 placeholder:text-cacao-500/70 focus:border-clay-400 focus:ring-2 focus:ring-clay-300/40 focus:outline-none";

export function CartDrawer() {
  const { items, count, isOpen, close, setQuantity, remove } = useCart();
  const [customer, setCustomer] = useState<CustomerDetails>({ name: "", city: "", notes: "" });

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const update = (field: keyof CustomerDetails) => (event: { target: { value: string } }) =>
    setCustomer((current) => ({ ...current, [field]: event.target.value }));

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <button
        type="button"
        aria-label="Cerrar pedido"
        onClick={close}
        className="absolute inset-0 animate-fade-in bg-cacao-950/40 backdrop-blur-sm"
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md animate-slide-in flex-col bg-blush-50 shadow-2xl">
        <header className="flex items-center justify-between border-b border-blush-200 px-5 py-4">
          <h2 id="cart-title" className="font-display text-2xl font-medium">
            Mi pedido <span className="text-base text-cacao-500">({count})</span>
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="grid size-10 place-items-center rounded-full text-cacao-700 transition hover:bg-blush-200"
          >
            <X className="size-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-blush-200 text-clay-500">
              <ShoppingBag className="size-7" strokeWidth={1.5} />
            </span>
            <p className="font-display text-2xl">Tu pedido está vacío</p>
            <p className="text-sm text-cacao-700">Explora el catálogo y agrega los detalles que más te gusten.</p>
            <Link href="/catalogo" onClick={close} className={buttonStyles({ size: "md" })}>
              Ver catálogo
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="divide-y divide-blush-200">
                {items.map((item) => (
                  <li key={item.slug} className="flex gap-4 py-4">
                    <Link
                      href={`/producto/${item.slug}`}
                      onClick={close}
                      className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-blush-200"
                    >
                      <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/producto/${item.slug}`}
                          onClick={close}
                          className="leading-snug font-medium hover:text-clay-500"
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => remove(item.slug)}
                          aria-label={`Quitar ${item.name}`}
                          className="shrink-0 rounded-full p-1.5 text-cacao-500 transition hover:bg-blush-200 hover:text-clay-600"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-cacao-500">{formatPrice(item.price)}</p>
                      <div className="mt-auto inline-flex w-fit items-center rounded-full border border-blush-300 bg-white">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.slug, item.quantity - 1)}
                          aria-label="Disminuir cantidad"
                          className="grid size-8 place-items-center text-cacao-700 disabled:opacity-30"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm tabular-nums" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.slug, item.quantity + 1)}
                          aria-label="Aumentar cantidad"
                          className="grid size-8 place-items-center text-cacao-700"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <fieldset className="mt-4 space-y-3 rounded-2xl bg-white/70 p-4 ring-1 ring-blush-200">
                <legend className="sr-only">Datos para tu pedido</legend>
                <p className="text-sm font-medium">Cuéntanos un poco más (opcional)</p>
                <input
                  className={inputClass}
                  placeholder="Tu nombre"
                  value={customer.name}
                  onChange={update("name")}
                  autoComplete="name"
                />
                <input
                  className={inputClass}
                  placeholder="Ciudad de entrega"
                  value={customer.city}
                  onChange={update("city")}
                  autoComplete="address-level2"
                />
                <textarea
                  className={`${inputClass} min-h-20 resize-none`}
                  placeholder="Colores, aroma, mensaje de la tarjeta, fecha de entrega…"
                  value={customer.notes}
                  onChange={update("notes")}
                />
              </fieldset>
            </div>

            <footer className="space-y-3 border-t border-blush-200 bg-white/60 px-5 py-4">
              <p className="text-xs leading-relaxed text-cacao-700">
                Los precios varían según tamaño y personalización. Te confirmamos el valor total y el envío por
                WhatsApp.
              </p>
              <a
                href={whatsappLink(buildOrderMessage(items, customer))}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "whatsapp", size: "lg", className: "w-full" })}
              >
                <WhatsAppIcon className="size-5" />
                Enviar pedido por WhatsApp
              </a>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
