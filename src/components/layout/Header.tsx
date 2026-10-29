"use client";

import { ChevronLeft, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { Logo } from "@/components/brand/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { isActivePath, mainNav, parentPathOf } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { whatsappLink } from "@/lib/whatsapp";
import { CartButton } from "@/modules/cart/components/CartButton";

const iconButton =
  "tap grid size-10 place-items-center rounded-full text-cacao-700 hover:bg-cacao-900/5 hover:text-clay-600";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const parent = parentPathOf(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goBack() {
    if (parent && window.history.length > 1) router.back();
    else router.push(parent ?? "/");
  }

  /** Si la búsqueda ya está en pantalla, la enfoca en lugar de navegar. */
  function focusSearch(event: MouseEvent<HTMLAnchorElement>) {
    const input = document.getElementById("buscar");
    if (!input) return;
    event.preventDefault();
    input.focus({ preventScroll: true });
    input.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  return (
    <header
      className={cn(
        "glass-strong sticky top-0 z-40 border-b transition-[border-color,box-shadow] duration-300",
        scrolled ? "border-cacao-900/8 shadow-[0_10px_30px_-18px_rgb(58_38_33/0.45)]" : "border-cacao-900/4",
      )}
    >
      {/* Móvil: barra compacta estilo app */}
      <div className="grid h-15 grid-cols-[3rem_1fr_3rem] items-center px-2 md:hidden">
        {parent ? (
          <button type="button" onClick={goBack} aria-label="Volver" className={iconButton}>
            <ChevronLeft className="size-6" strokeWidth={1.8} />
          </button>
        ) : (
          <Link href="/catalogo#buscar" onClick={focusSearch} aria-label="Buscar en el catálogo" className={iconButton}>
            <Search className="size-5" strokeWidth={1.8} />
          </Link>
        )}
        <Logo className="justify-self-center" />
        <div className="justify-self-end">
          {pathname.startsWith("/producto/") ? (
            <CartButton compact />
          ) : (
            <a
              href={siteConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Velaire"
              className={iconButton}
            >
              <InstagramIcon className="size-5" />
            </a>
          )}
        </div>
      </div>

      {/* Tablet y escritorio */}
      <div className="mx-auto hidden h-19 max-w-7xl items-center gap-4 px-6 md:flex lg:px-8">
        <Logo className="mr-auto" />

        <nav aria-label="Principal">
          <ul className="flex items-center gap-1 rounded-full bg-white/60 p-1 shadow-hairline">
            {mainNav.map((item) => {
              const active = isActivePath(pathname, item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-300",
                      active
                        ? "bg-white text-clay-600 shadow-soft"
                        : "text-cacao-700 hover:bg-white/70 hover:text-clay-600",
                    )}
                  >
                    <Icon className="hidden size-4 lg:block" strokeWidth={active ? 2.1 : 1.7} />
                    <span className="lg:hidden">{item.shortLabel}</span>
                    <span className="hidden lg:inline">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link href="/catalogo#buscar" onClick={focusSearch} aria-label="Buscar en el catálogo" className={iconButton}>
            <Search className="size-4.5" strokeWidth={1.8} />
          </Link>
          <a
            href={siteConfig.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Velaire"
            className={iconButton}
          >
            <InstagramIcon className="size-4.5" />
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp de Velaire"
            className={cn(iconButton, "hidden hover:text-whatsapp-dark lg:grid")}
          >
            <WhatsAppIcon className="size-4.5" />
          </a>
          <CartButton className="ml-1.5" />
        </div>
      </div>
    </header>
  );
}
