import { ArrowRight } from "lucide-react";
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
    <section className="bg-white/60 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Los más queridos"
            title={
              <>
                Favoritos de nuestra <em>comunidad</em>
              </>
            }
            description="Los diseños que más han enamorado en Instagram, listos para personalizar con tus colores."
          />
          <ButtonLink href="/catalogo" variant="secondary" className="shrink-0">
            Ver todo el catálogo <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
        <ProductGrid products={products} categoryNames={categoryNames} className="mt-12" />
      </Container>
    </section>
  );
}
