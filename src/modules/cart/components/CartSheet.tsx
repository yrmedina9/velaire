"use client";

import {
  Clock,
  Gift,
  House,
  LayoutGrid,
  MapPin,
  Minus,
  PenLine,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  Truck,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buttonStyles } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/whatsapp";
import type { Product } from "@/modules/catalog/domain/catalog.types";
import type { CustomerDetails, DeliveryMode } from "../domain/cart.types";
import { useCart } from "../context/CartProvider";
import { buildOrderMessage } from "../lib/order-message";

export type CartSuggestion = Pick<Product, "slug" | "name" | "price" | "images">;

interface CartSheetProps {
  suggestions: CartSuggestion[];
  productionEstimate: string;
}

const fieldClass =
  "w-full rounded-2xl border-0 bg-white py-3 pr-4 pl-11 text-sm text-cacao-900 shadow-hairline placeholder:text-cacao-500/70 focus:ring-2 focus:ring-clay-300/60 focus:outline-none";

export function CartSheet({ suggestions, productionEstimate }: CartSheetProps) {
  const { items, count, isOpen, close, setQuantity, remove, clear, add } = useCart();
  const [customer, setCustomer] = useState<CustomerDetails>({ name: "", city: "", notes: "", delivery: "neiva" });

  const update = (field: "name" | "city" | "notes") => (event: { target: { value: string } }) =>
    setCustomer((current) => ({ ...current, [field]: event.target.value }));
  const setDelivery = (delivery: DeliveryMode) => setCustomer((current) => ({ ...current, delivery }));

  const priced = items.length > 0 && items.every((item) => item.price !== null);
  const subtotal = items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);

  return (
    <Sheet
      open={isOpen}
      onClose={close}
      title="Mi pedido"
      badge={
        count > 0 && (
          <span className="rounded-full bg-clay-500/12 px-2.5 py-1 font-sans text-xs font-medium text-clay-600">
            {count} {count === 1 ? "producto" : "productos"}
          </span>
        )
      }
      footer={
        items.length > 0 && (
          <div className="space-y-3 px-5 pt-4 pb-[max(env(safe-area-inset-bottom),1rem)]">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-cacao-500">Total estimado</p>
                <p className="font-display text-2xl leading-tight">
                  {priced ? formatPrice(subtotal) : "A cotizar"}
                  <span className="ml-1.5 font-sans text-xs text-cacao-500">+ envío</span>
                </p>
              </div>
              <p className="flex items-center gap-1 text-xs text-cacao-500">
                <ShieldCheck className="size-3.5 text-whatsapp-dark" /> Sin pago en línea
              </p>
            </div>
            <a
              href={whatsappLink(buildOrderMessage(items, customer))}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: "whatsapp", size: "lg", className: "tap w-full" })}
            >
              <WhatsAppIcon className="size-5" />
              Enviar pedido por WhatsApp
            </a>
          </div>
        )
      }
    >
      {items.length === 0 ? (
        <EmptyCart suggestions={suggestions} onAdd={add} onNavigate={close} />
      ) : (
        <div className="space-y-6 px-5 pb-6">
          <ul className="space-y-2.5">
            {items.map((item) => (
              <li key={item.slug} className="surface flex gap-3 rounded-[1.4rem] p-2.5">
                <Link
                  href={`/producto/${item.slug}`}
                  onClick={close}
                  className="relative size-20 shrink-0 overflow-hidden rounded-[1rem] bg-blush-200"
                >
                  <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col py-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/producto/${item.slug}`}
                      onClick={close}
                      className="line-clamp-2 text-[0.92rem] leading-snug font-medium hover:text-clay-600"
                    >
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => remove(item.slug)}
                      aria-label={`Quitar ${item.name}`}
                      className="tap -mt-1 -mr-1 grid size-8 shrink-0 place-items-center rounded-full text-cacao-500 hover:bg-blush-200 hover:text-clay-600"
                    >
                      <Trash2 className="size-4" strokeWidth={1.8} />
                    </button>
                  </div>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-cacao-500">
                    <Tag className="size-3" /> {formatPrice(item.price)}
                  </p>
                  <div className="mt-auto flex w-fit items-center rounded-full bg-blush-100 p-0.5 ring-1 ring-cacao-900/5">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.slug, item.quantity - 1)}
                      aria-label="Disminuir cantidad"
                      disabled={item.quantity <= 1}
                      className="tap grid size-7 place-items-center rounded-full bg-white text-cacao-700 shadow-hairline disabled:opacity-40"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium tabular-nums" aria-live="polite">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.slug, item.quantity + 1)}
                      aria-label="Aumentar cantidad"
                      className="tap grid size-7 place-items-center rounded-full bg-white text-cacao-700 shadow-hairline"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <section aria-labelledby="entrega-title" className="space-y-3">
            <SectionLabel id="entrega-title">¿Dónde lo entregamos?</SectionLabel>
            <div role="radiogroup" className="relative grid grid-cols-2 rounded-2xl bg-cacao-900/5 p-1">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-[0.8rem] bg-white shadow-soft transition-transform duration-500 ease-(--ease-ios)",
                  customer.delivery === "nacional" && "translate-x-full",
                )}
              />
              {(
                [
                  { value: "neiva", label: `En ${siteConfig.contact.city}`, icon: House },
                  { value: "nacional", label: "Envío nacional", icon: Truck },
                ] as const
              ).map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={customer.delivery === value}
                  onClick={() => setDelivery(value)}
                  className={cn(
                    "relative flex items-center justify-center gap-2 rounded-[0.8rem] py-2.5 text-sm transition-colors",
                    customer.delivery === value ? "font-medium text-clay-600" : "text-cacao-500",
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.8} /> {label}
                </button>
              ))}
            </div>
          </section>

          <section aria-labelledby="datos-title" className="space-y-2.5">
            <SectionLabel id="datos-title">Personaliza tu pedido</SectionLabel>
            <Field icon={<User />}>
              <input
                className={fieldClass}
                placeholder="Tu nombre"
                value={customer.name}
                onChange={update("name")}
                autoComplete="name"
              />
            </Field>
            <Field icon={<MapPin />}>
              <input
                className={fieldClass}
                placeholder={customer.delivery === "neiva" ? "Barrio o dirección" : "Ciudad de destino"}
                value={customer.city}
                onChange={update("city")}
                autoComplete={customer.delivery === "neiva" ? "street-address" : "address-level2"}
              />
            </Field>
            <Field icon={<PenLine />} top>
              <textarea
                className={`${fieldClass} min-h-24 resize-none`}
                placeholder="Colores, aroma, mensaje de la tarjeta, fecha de entrega…"
                value={customer.notes}
                onChange={update("notes")}
              />
            </Field>
          </section>

          <ul className="space-y-2.5 rounded-[1.4rem] bg-blush-200/50 p-4 text-sm text-cacao-700">
            <li className="flex items-center gap-3">
              <Clock className="size-4 shrink-0 text-clay-500" strokeWidth={1.8} /> Elaboración de {productionEstimate}
            </li>
            <li className="flex items-center gap-3">
              <Gift className="size-4 shrink-0 text-clay-500" strokeWidth={1.8} /> Empaque de regalo incluido
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="size-4 shrink-0 text-clay-500" strokeWidth={1.8} /> Confirmas el valor antes de
              pagar
            </li>
          </ul>

          <button
            type="button"
            onClick={clear}
            className="tap mx-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-cacao-500 hover:bg-blush-200 hover:text-clay-600"
          >
            <Trash2 className="size-3.5" /> Vaciar pedido
          </button>
        </div>
      )}
    </Sheet>
  );
}

function SectionLabel({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3 id={id} className="text-xs font-medium tracking-[0.18em] text-cacao-500 uppercase">
      {children}
    </h3>
  );
}

function Field({ icon, top = false, children }: { icon: ReactNode; top?: boolean; children: ReactNode }) {
  return (
    <label className="relative block">
      <span
        className={cn(
          "pointer-events-none absolute left-4 text-cacao-500 [&>svg]:size-4.5 [&>svg]:stroke-[1.7]",
          top ? "top-3.5" : "top-1/2 -translate-y-1/2",
        )}
      >
        {icon}
      </span>
      {children}
    </label>
  );
}

function EmptyCart({
  suggestions,
  onAdd,
  onNavigate,
}: {
  suggestions: CartSuggestion[];
  onAdd: ReturnType<typeof useCart>["add"];
  onNavigate: () => void;
}) {
  return (
    <div className="pb-8">
      <div className="flex flex-col items-center px-8 pt-4 text-center">
        <span className="relative grid size-24 place-items-center rounded-full bg-linear-to-b from-blush-200 to-blush-100 text-clay-500 shadow-hairline">
          <ShoppingBag className="size-10" strokeWidth={1.3} />
          <Sparkles className="absolute top-3 right-2 size-5 animate-flicker text-gold-500" strokeWidth={1.6} />
        </span>
        <p className="mt-5 font-display text-3xl">Tu pedido está vacío</p>
        <p className="mt-2 max-w-xs text-sm text-cacao-700">
          Agrega los detalles que te enamoren y envíanos tu pedido por WhatsApp en un toque.
        </p>
        <Link href="/catalogo" onClick={onNavigate} className={buttonStyles({ className: "tap mt-6" })}>
          <LayoutGrid className="size-4.5" strokeWidth={1.8} /> Explorar catálogo
        </Link>
      </div>

      {suggestions.length > 0 && (
        <section aria-labelledby="sugerencias-title" className="mt-10">
          <h3
            id="sugerencias-title"
            className="px-5 text-xs font-medium tracking-[0.18em] text-cacao-500 uppercase"
          >
            Los más pedidos
          </h3>
          <ul className="no-scrollbar mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2">
            {suggestions.map((product) => (
              <li key={product.slug} className="surface w-36 shrink-0 snap-start rounded-[1.25rem] p-1.5">
                <Link
                  href={`/producto/${product.slug}`}
                  onClick={onNavigate}
                  className="relative block aspect-square overflow-hidden rounded-[0.95rem] bg-blush-200"
                >
                  <Image src={product.images[0].src} alt="" fill sizes="144px" className="object-cover" />
                </Link>
                <div className="flex items-center gap-1.5 p-1.5 pt-2">
                  <p className="line-clamp-2 flex-1 text-xs leading-snug font-medium">{product.name}</p>
                  <button
                    type="button"
                    onClick={() =>
                      onAdd({
                        slug: product.slug,
                        name: product.name,
                        price: product.price,
                        image: product.images[0].src,
                      })
                    }
                    aria-label={`Agregar ${product.name}`}
                    className="tap grid size-8 shrink-0 place-items-center rounded-full bg-clay-500 text-white"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
