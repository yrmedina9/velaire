"use client";

import { Search, X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useDeferredValue, useState, type ReactNode } from "react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { whatsappLink } from "@/lib/whatsapp";
import type { Occasion, Product } from "../domain/catalog.types";
import { ProductGrid } from "./ProductGrid";

interface CatalogExplorerProps {
  products: Product[];
  occasions: Occasion[];
  categoryNames: Record<string, string>;
}

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/**
 * Filtros del catálogo en el cliente: ocasión (sincronizada con
 * `?ocasion=` para poder compartir el enlace) y búsqueda por texto.
 */
export function CatalogExplorer({ products, occasions, categoryNames }: CatalogExplorerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const available = occasions.filter((o) => products.some((p) => p.occasions.includes(o.slug)));
  const requested = searchParams.get("ocasion");
  const occasion = available.some((o) => o.slug === requested) ? requested : null;

  function selectOccasion(slug: string | null) {
    window.history.replaceState(null, "", slug ? `${pathname}?ocasion=${slug}` : pathname);
  }

  const terms = normalize(deferredQuery.trim());
  const filtered = products.filter((product) => {
    if (occasion && !product.occasions.includes(occasion)) return false;
    if (!terms) return true;
    const haystack = normalize(
      [product.name, product.shortDescription, product.colors.join(" "), categoryNames[product.category]].join(" "),
    );
    return terms.split(/\s+/).every((term) => haystack.includes(term));
  });

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:px-0">
          <div role="group" aria-label="Filtrar por ocasión" className="flex w-max gap-2 lg:w-auto lg:flex-wrap">
            <OccasionChip active={!occasion} onClick={() => selectOccasion(null)}>
              Todas las ocasiones
            </OccasionChip>
            {available.map((o) => (
              <OccasionChip key={o.slug} active={occasion === o.slug} onClick={() => selectOccasion(o.slug)}>
                {o.name}
              </OccasionChip>
            ))}
          </div>
        </div>

        <label className="relative block w-full shrink-0 lg:w-72">
          <span className="sr-only">Buscar en el catálogo</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-cacao-500" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Busca: rosas, tulipanes, rojo…"
            className="h-11 w-full rounded-full border border-blush-300 bg-white pr-10 pl-10 text-sm placeholder:text-cacao-500/70 focus:border-clay-400 focus:ring-2 focus:ring-clay-300/40 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-cacao-500 hover:bg-blush-200"
            >
              <X className="size-4" />
            </button>
          )}
        </label>
      </div>

      <p className="mt-6 mb-8 text-sm text-cacao-500" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
      </p>

      {filtered.length > 0 ? (
        <ProductGrid products={filtered} categoryNames={categoryNames} eagerCount={4} />
      ) : (
        <div className="mx-auto max-w-md rounded-[2rem] bg-white/70 px-6 py-14 text-center ring-1 ring-blush-200">
          <p className="font-display text-3xl">No encontramos ese detalle…</p>
          <p className="mt-3 text-sm text-cacao-700">
            ¡Pero lo podemos crear para ti! Cuéntanos tu idea y la hacemos realidad con tus colores y aromas.
          </p>
          <a
            href={whatsappLink(`¡Hola Velaire! 🕯️ Busco un detalle personalizado: ${query}`)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ variant: "whatsapp", className: "mt-6" })}
          >
            <WhatsAppIcon className="size-4.5" /> Pedir un diseño personalizado
          </a>
        </div>
      )}
    </div>
  );
}

function OccasionChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-4 py-2 text-[0.82rem] whitespace-nowrap transition",
        active ? "bg-cacao-900 text-blush-50" : "bg-blush-200/70 text-cacao-700 hover:bg-blush-300",
      )}
    >
      {children}
    </button>
  );
}
