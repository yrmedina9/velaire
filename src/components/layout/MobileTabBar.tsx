"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath, mainNav, type NavItem } from "@/config/navigation";
import { cn } from "@/lib/cn";
import { useCart } from "@/modules/cart/context/CartProvider";

/**
 * Barra de pestañas inferior flotante (solo móvil), como en una app
 * nativa. Una burbuja café se desliza hasta la pestaña de la ruta
 * actual; el pedido queda al centro con un borde sutil. En la ficha de
 * producto la reemplaza la barra de compra.
 */
export function MobileTabBar() {
  const pathname = usePathname();
  const { count, open } = useCart();

  if (pathname.startsWith("/producto/")) return null;

  // Dos pestañas, el pedido al centro y dos pestañas más.
  const slots: Array<NavItem | null> = [mainNav[0], mainNav[1], null, mainNav[2], mainNav[3]];
  const activeIndex = slots.findIndex((item) => item !== null && isActivePath(pathname, item.href));

  return (
    <nav aria-label="Navegación principal" className="fixed inset-x-3 bottom-0 z-40 mb-safe md:hidden">
      <div className="glass relative h-16 rounded-[1.6rem] px-1 shadow-float ring-1 ring-white/70">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-1 left-1">
          <span
            className={cn(
              "absolute top-0 left-0 flex h-full w-1/5 justify-center transition-[transform,opacity] duration-600 ease-spring",
              activeIndex < 0 && "opacity-0",
            )}
            style={{ transform: `translateX(${Math.max(activeIndex, 0) * 100}%)` }}
          >
            <span
              key={activeIndex}
              className="-mt-4.5 size-13 shrink-0 animate-bubble rounded-full bg-linear-to-b from-clay-400 to-clay-600 shadow-glow ring-4 ring-blush-50"
            />
          </span>
        </div>

        <ul className="relative grid h-full grid-cols-5">
          {slots.map((item, index) =>
            item ? (
              <TabLink key={item.href} item={item} active={index === activeIndex} />
            ) : (
              <li key="pedido">
                <button
                  type="button"
                  onClick={open}
                  aria-label={`Mi pedido, ${count} ${count === 1 ? "producto" : "productos"}`}
                  className="tap flex h-16 w-full flex-col items-center justify-center gap-0.5"
                >
                  <span className="relative grid size-9 place-items-center rounded-full bg-white text-clay-600 shadow-soft ring-1 ring-clay-500/35">
                    <ShoppingBag className="size-[1.1rem]" strokeWidth={1.9} />
                    {count > 0 && (
                      <span
                        key={count}
                        className="absolute -top-1.5 -right-2 grid h-4.5 min-w-4.5 animate-pop place-items-center rounded-full bg-clay-500 px-1 text-[0.6rem] font-semibold text-white ring-2 ring-blush-50"
                      >
                        {count}
                      </span>
                    )}
                  </span>
                  <span className="text-[0.66rem] font-medium tracking-wide text-clay-600">Pedido</span>
                </button>
              </li>
            ),
          )}
        </ul>
      </div>
    </nav>
  );
}

function TabLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <li>
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className="tap flex h-16 flex-col items-center justify-center gap-0.5"
      >
        <span
          className={cn(
            "grid size-9 place-items-center transition-[transform,color] duration-500 ease-spring",
            active ? "-translate-y-4 text-white" : "text-cacao-500",
          )}
        >
          <Icon className="size-5.5" strokeWidth={active ? 2 : 1.6} />
        </span>
        <span
          className={cn(
            "text-[0.66rem] tracking-wide transition-colors duration-300",
            active ? "font-semibold text-clay-600" : "font-medium text-cacao-500",
          )}
        >
          {item.shortLabel}
        </span>
      </Link>
    </li>
  );
}
