import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCategories, getOccasions, getProducts } from "../catalog.service";
import type { CategoryWithCount } from "../domain/catalog.types";
import { CatalogExplorer } from "./CatalogExplorer";
import { CategoryTabs } from "./CategoryTabs";
import { ProductGrid } from "./ProductGrid";

/** Vista compartida de /catalogo y /catalogo/[categoria]. */
export async function CatalogView({ category }: { category?: CategoryWithCount }) {
  const [categories, occasions, products, allProducts] = await Promise.all([
    getCategories(),
    getOccasions(),
    getProducts({ category: category?.slug }),
    getProducts(),
  ]);
  const categoryNames = Object.fromEntries(categories.map((c) => [c.slug, c.shortName]));

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          ...(category ? [{ label: "Catálogo", href: "/catalogo" }, { label: category.name }] : [{ label: "Catálogo" }]),
        ]}
        title={
          category ? (
            category.name
          ) : (
            <>
              Nuestro <em>catálogo</em>
            </>
          )
        }
        description={
          category?.description ??
          "Flores en vela que nunca se marchitan, recordatorios y detalles personalizados. Agrega tus favoritos al pedido y te enviamos la cotización por WhatsApp."
        }
      />
      <Container className="py-10 sm:py-14">
        <CategoryTabs categories={categories} active={category?.slug} total={allProducts.length} />
        <div className="mt-10">
          <Suspense
            fallback={<ProductGrid products={products} categoryNames={categoryNames} className="mt-24" />}
          >
            <CatalogExplorer products={products} occasions={occasions} categoryNames={categoryNames} />
          </Suspense>
        </div>
      </Container>
    </>
  );
}
