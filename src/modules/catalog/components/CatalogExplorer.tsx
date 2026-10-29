"use client";

import { ArrowDownUp, Check, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect, useRef, useState, type ReactNode } from "react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buttonStyles } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import { cn } from "@/lib/cn";
import { whatsappLink } from "@/lib/whatsapp";
import type { Occasion, Product } from "../domain/catalog.types";
import { OccasionIcon } from "../lib/catalog-icons";
import { ProductGrid } from "./ProductGrid";

interface CatalogExplorerProps {
  products: Product[];
  occasions: Occasion[];
  categoryNames: Record<string, string>;
}

type SortKey = "relevancia" | "recientes" | "nombre";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevancia", label: "Destacados" },
  { value: "recientes", label: "Más recientes" },
  { value: "nombre", label: "Nombre (A–Z)" },
];

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/**
 * Filtros del catálogo en el cliente: ocasión (sincronizada con
 * `?ocasion=` para poder compartir el enlace), búsqueda y orden.
 */
export function CatalogExplorer({ products, occasions, categoryNames }: CatalogExplorerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("relevancia");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    if (window.location.hash === "#buscar") searchRef.current?.focus({ preventScroll: true });
  }, []);

  const available = occasions.filter((o) => products.some((p) => p.occasions.includes(o.slug)));
  const requested = searchParams.get("ocasion");
  const occasion = available.find((o) => o.slug === requested) ?? null;

  function selectOccasion(slug: string | null) {
    window.history.replaceState(null, "", slug ? `${pathname}?ocasion=${slug}` : pathname);
  }

  const terms = normalize(deferredQuery.trim());
  const filtered = products.filter((product) => {
    if (occasion && !product.occasions.includes(occasion.slug)) return false;
    if (!terms) return true;
    const haystack = normalize(
      [product.name, product.shortDescription, product.colors.join(" "), categoryNames[product.category]].join(" "),
    );
    return terms.split(/\s+/).every((term) => haystack.includes(term));
  });
  const sorted =
    sort === "recientes"
      ? [...filtered].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      : sort === "nombre"
        ? [...filtered].sort((a, b) => a.name.localeCompare(b.name, "es"))
        : filtered;

  const activeFilters = (occasion ? 1 : 0) + (sort !== "relevancia" ? 1 : 0);

  return (
    <div>
      {/* Barra fija de búsqueda y filtros */}
      <div className="glass-strong sticky top-15 z-30 -mx-4 border-b border-cacao-900/6 px-4 py-3 shadow-[0_10px_24px_-20px_rgb(58_38_33/0.5)] sm:-mx-6 sm:px-6 md:top-19 lg:-mx-8 lg:px-8">
        <div className="flex items-center gap-2">
          <label className="relative block flex-1">
            <span className="sr-only">Buscar en el catálogo</span>
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-cacao-500"
              strokeWidth={1.8}
            />
            <input
              ref={searchRef}
              id="buscar"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Busca rosas, tulipanes, rojo…"
              className="h-11 w-full scroll-mt-40 rounded-full border-0 bg-white pr-10 pl-11 text-sm shadow-hairline placeholder:text-cacao-500/70 focus:ring-2 focus:ring-clay-300/60 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Limpiar búsqueda"
                className="tap absolute top-1/2 right-2 grid size-7 -translate-y-1/2 place-items-center rounded-full bg-cacao-900/5 text-cacao-700"
              >
                <X className="size-3.5" />
              </button>
            )}
          </label>

          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="tap relative inline-flex h-11 items-center gap-2 rounded-full bg-cacao-900 px-4 text-sm font-medium text-blush-50 md:hidden"
          >
            <SlidersHorizontal className="size-4" strokeWidth={1.8} />
            Filtros
            {activeFilters > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-gold-400 text-[0.65rem] font-semibold text-cacao-950">
                {activeFilters}
              </span>
            )}
          </button>

          <label className="relative hidden md:block">
            <span className="sr-only">Ordenar por</span>
            <ArrowDownUp className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-cacao-500" />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="h-11 cursor-pointer appearance-none rounded-full border-0 bg-white pr-6 pl-10 text-sm shadow-hairline focus:ring-2 focus:ring-clay-300/60 focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Ocasiones en tablet y escritorio */}
      <div role="group" aria-label="Filtrar por ocasión" className="mt-5 hidden flex-wrap gap-2 md:flex">
        <OccasionChip active={!occasion} onClick={() => selectOccasion(null)} icon={<Sparkles />}>
          Todas
        </OccasionChip>
        {available.map((o) => (
          <OccasionChip
            key={o.slug}
            active={occasion?.slug === o.slug}
            onClick={() => selectOccasion(o.slug)}
            icon={<OccasionIcon slug={o.slug} />}
          >
            {o.name}
          </OccasionChip>
        ))}
      </div>

      <div className="mt-5 mb-5 flex flex-wrap items-center gap-2" aria-live="polite">
        <p className="text-sm text-cacao-500">
          <span className="font-medium text-cacao-900">{sorted.length}</span>{" "}
          {sorted.length === 1 ? "producto" : "productos"}
        </p>
        {occasion && (
          <button
            type="button"
            onClick={() => selectOccasion(null)}
            className="tap inline-flex items-center gap-1.5 rounded-full bg-clay-500/12 py-1 pr-2 pl-3 text-xs font-medium text-clay-600 md:hidden"
          >
            {occasion.name}
            <X className="size-3.5" aria-label="Quitar filtro" />
          </button>
        )}
      </div>

      {sorted.length > 0 ? (
        <ProductGrid products={sorted} categoryNames={categoryNames} eagerCount={4} />
      ) : (
        <div className="surface mx-auto max-w-md rounded-[2rem] px-6 py-14 text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-blush-200 text-clay-500">
            <Search className="size-7" strokeWidth={1.5} />
          </span>
          <p className="mt-4 font-display text-3xl">No encontramos ese detalle…</p>
          <p className="mt-3 text-sm text-cacao-700">
            ¡Pero lo podemos crear para ti! Cuéntanos tu idea y la hacemos realidad con tus colores y aromas.
          </p>
          <a
            href={whatsappLink(`¡Hola Velaire! 🕯️ Busco un detalle personalizado: ${query}`)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ variant: "whatsapp", className: "tap mt-6" })}
          >
            <WhatsAppIcon className="size-4.5" /> Pedir un diseño personalizado
          </a>
        </div>
      )}

      {/* Hoja de filtros en móvil */}
      <Sheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        variant="bottom"
        title="Filtros"
        footer={
          <div className="flex gap-3 px-5 pt-4 pb-[max(env(safe-area-inset-bottom),1rem)]">
            <button
              type="button"
              onClick={() => {
                selectOccasion(null);
                setSort("relevancia");
              }}
              className={buttonStyles({ variant: "secondary", size: "lg", className: "tap flex-1 px-5" })}
            >
              Limpiar
            </button>
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className={buttonStyles({ size: "lg", className: "tap flex-[1.6] px-5 whitespace-nowrap" })}
            >
              Ver {sorted.length} {sorted.length === 1 ? "producto" : "productos"}
            </button>
          </div>
        }
      >
        <div className="space-y-7 px-5 pb-6">
          <section>
            <h3 className="mb-3 text-xs font-medium tracking-[0.18em] text-cacao-500 uppercase">Ocasión</h3>
            <div className="grid grid-cols-2 gap-2">
              {available.map((o) => {
                const active = occasion?.slug === o.slug;
                return (
                  <button
                    key={o.slug}
                    type="button"
                    aria-pressed={active}
                    onClick={() => selectOccasion(active ? null : o.slug)}
                    className={cn(
                      "tap flex items-center gap-2.5 rounded-2xl px-3 py-3 text-left text-sm",
                      active ? "bg-cacao-900 text-blush-50 shadow-float" : "surface text-cacao-700",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full",
                        active ? "bg-white/15" : "bg-blush-100 text-clay-500",
                      )}
                    >
                      <OccasionIcon slug={o.slug} className="size-4" strokeWidth={1.8} />
                    </span>
                    <span className="leading-tight">{o.name}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-xs font-medium tracking-[0.18em] text-cacao-500 uppercase">Ordenar por</h3>
            <div className="surface divide-y divide-cacao-900/5 overflow-hidden rounded-2xl" role="radiogroup">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={sort === option.value}
                  onClick={() => setSort(option.value)}
                  className="flex w-full items-center justify-between px-4 py-3.5 text-sm active:bg-blush-100"
                >
                  {option.label}
                  {sort === option.value && <Check className="size-4.5 text-clay-500" strokeWidth={2.2} />}
                </button>
              ))}
            </div>
          </section>
        </div>
      </Sheet>
    </div>
  );
}

function OccasionChip({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "tap inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.82rem] whitespace-nowrap [&>svg]:size-3.5 [&>svg]:stroke-[1.9]",
        active ? "bg-clay-500 text-white shadow-glow" : "bg-blush-200/60 text-cacao-700 hover:bg-blush-200",
      )}
    >
      {icon}
      {children}
    </button>
  );
}
