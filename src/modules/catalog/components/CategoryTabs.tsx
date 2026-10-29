import Link from "next/link";
import { cn } from "@/lib/cn";
import type { CategoryWithCount } from "../domain/catalog.types";

interface CategoryTabsProps {
  categories: CategoryWithCount[];
  active?: string;
  total: number;
}

export function CategoryTabs({ categories, active, total }: CategoryTabsProps) {
  const tabs = [
    { href: "/catalogo", label: "Todo", count: total, isActive: !active },
    ...categories.map((c) => ({
      href: `/catalogo/${c.slug}`,
      label: c.shortName,
      count: c.productCount,
      isActive: active === c.slug,
    })),
  ];

  return (
    <nav aria-label="Categorías" className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
      <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
        {tabs.map((tab) => (
          <li key={tab.href}>
            <Link
              href={tab.href}
              aria-current={tab.isActive ? "page" : undefined}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm whitespace-nowrap transition",
                tab.isActive
                  ? "border-clay-500 bg-clay-500 text-white shadow-md shadow-clay-500/25"
                  : "border-blush-300 bg-white/70 text-cacao-700 hover:border-clay-400 hover:text-clay-600",
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "rounded-full px-1.5 text-[0.7rem] tabular-nums",
                  tab.isActive ? "bg-white/20" : "bg-blush-200 text-clay-600",
                )}
              >
                {tab.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
