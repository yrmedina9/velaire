import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Ruta de navegación">
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm text-cacao-500", className)}>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />}
            {item.href ? (
              <Link href={item.href} className="transition hover:text-clay-500">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-cacao-900">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
