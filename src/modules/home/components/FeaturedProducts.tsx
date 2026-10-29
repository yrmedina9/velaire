import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/modules/catalog/components/ProductGrid";
import type { Product } from "@/modules/catalog/domain/catalog.types";

interface FeaturedProductsProps {
  products: Product[];
  categoryNames: Record<string, string>;
}

export function FeaturedProducts({ products, categoryNames }: FeaturedProductsProps) {
  return (
    <section className="bg-linear-to-b from-white/70 to-blush-50 py-14 sm:py-28">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Los más queridos"
            icon={<Heart />}
            title={
              <>
                Favoritos de nuestra <em>comunidad</em>
              </>
            }
            description="Los diseños que más han enamorado en Instagram, listos para personalizar."
          />
          <ButtonLink href="/catalogo" variant="secondary" className="tap hidden shrink-0 md:inline-flex">
            Ver todo el catálogo <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
        <ProductGrid products={products} categoryNames={categoryNames} layout="rail" className="mt-8 sm:mt-12" />
        <Link
          href="/catalogo"
          className="tap mt-1 flex items-center justify-center gap-2 rounded-2xl bg-white py-3.5 text-sm font-medium text-clay-600 shadow-hairline md:hidden"
        >
          Ver todo el catálogo <ArrowRight className="size-4" />
        </Link>
      </Container>
    </section>
  );
}
