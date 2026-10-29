import { LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { CategoryWithCount } from "../domain/catalog.types";
import { CategoryIcon } from "../lib/catalog-icons";

interface CategoryTabsProps {
  categories: CategoryWithCount[];
  active?: string;
  total: number;
}

/**
 * Navegación por categorías: círculos tipo "historias" en móvil y
 * cápsulas con ícono y contador desde tablet.
 */
export function CategoryTabs({ categories, active, total }: CategoryTabsProps) {
  const tabs = [
    { slug: undefined, href: "/catalogo", label: "Todo", count: total, image: null },
    ...categories.map((c) => ({
      slug: c.slug,
      href: `/catalogo/${c.slug}`,
      label: c.shortName,
      count: c.productCount,
      image: c.image,
    })),
  ];

  return (
    <nav aria-label="Categorías">
      {/* Móvil */}
      <ul className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 md:hidden">
        {tabs.map((tab) => {
          const isActive = tab.slug === active;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className="tap flex w-[4.6rem] flex-col items-center gap-1.5"
              >
                <span
                  className={cn(
                    "rounded-full p-[2.5px] transition",
                    isActive ? "bg-conic from-clay-500 via-gold-400 to-clay-500" : "bg-blush-300/80",
                  )}
                >
                  <span className="block rounded-full bg-blush-50 p-[2.5px]">
                    <span className="relative grid size-15 place-items-center overflow-hidden rounded-full bg-clay-500 text-white">
                      {tab.image ? (
                        <Image src={tab.image} alt="" fill sizes="60px" className="object-cover" />
                      ) : (
                        <LayoutGrid className="size-6" strokeWidth={1.6} />
                      )}
                    </span>
                  </span>
                </span>
                <span
                  className={cn(
                    "max-w-full truncate text-[0.7rem]",
                    isActive ? "font-semibold text-clay-600" : "text-cacao-700",
                  )}
                >
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Tablet y escritorio */}
      <ul className="hidden flex-wrap justify-center gap-2 md:flex">
        {tabs.map((tab) => {
          const isActive = tab.slug === active;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "tap inline-flex items-center gap-2 rounded-full py-2 pr-2.5 pl-4 text-sm whitespace-nowrap",
                  isActive
                    ? "bg-cacao-900 text-blush-50 shadow-float"
                    : "bg-white text-cacao-700 shadow-hairline hover:text-clay-600 hover:shadow-soft",
                )}
              >
                {tab.slug ? (
                  <CategoryIcon slug={tab.slug} className="size-4" strokeWidth={1.8} />
                ) : (
                  <LayoutGrid className="size-4" strokeWidth={1.8} />
                )}
                {tab.label}
                <span
                  className={cn(
                    "grid h-5.5 min-w-5.5 place-items-center rounded-full px-1.5 text-[0.68rem] tabular-nums",
                    isActive ? "bg-white/15" : "bg-blush-100 text-clay-600",
                  )}
                >
                  {tab.count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
