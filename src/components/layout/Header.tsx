"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { whatsappLink } from "@/lib/whatsapp";
import { CartButton } from "@/modules/cart/components/CartButton";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-blush-200/80 bg-blush-50/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          className="grid size-11 place-items-center rounded-full text-cacao-900 transition hover:bg-blush-200 md:hidden"
        >
          {menuOpen ? <X className="size-5.5" /> : <Menu className="size-5.5" />}
        </button>

        <Logo className="md:mr-auto" />

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[0.95rem] transition-colors hover:text-clay-500",
                    isActive(pathname, item.href) ? "text-clay-500" : "text-cacao-700",
                  )}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                >
                  {item.label}
                  {isActive(pathname, item.href) && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-px bg-clay-500" aria-hidden="true" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 md:ml-4">
          <a
            href={siteConfig.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Velaire"
            className="hidden size-11 place-items-center rounded-full text-cacao-700 transition hover:bg-blush-200 hover:text-clay-500 sm:grid"
          >
            <InstagramIcon className="size-5" />
          </a>
          <CartButton />
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] animate-fade-in border-t border-blush-200 bg-blush-50 md:hidden"
        >
          <nav aria-label="Móvil" className="flex h-full flex-col px-6 pt-6 pb-10">
            <ul className="space-y-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "block border-b border-blush-200 py-4 font-display text-3xl",
                      isActive(pathname, item.href) ? "text-clay-500 italic" : "text-cacao-900",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto space-y-3">
              <a
                href={whatsappLink("¡Hola Velaire! 🕯️ Quiero información sobre sus velas.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-whatsapp-dark py-3.5 font-medium text-white"
              >
                <WhatsAppIcon className="size-5" /> Escríbenos al {siteConfig.contact.phoneDisplay}
              </a>
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-clay-500/40 py-3.5 font-medium text-clay-600"
              >
                <InstagramIcon className="size-5" /> @{siteConfig.contact.instagramHandle}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
