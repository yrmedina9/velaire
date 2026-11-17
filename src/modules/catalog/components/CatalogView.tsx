import { LayoutGrid } from "lucide-react";
import { Suspense } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd } from "@/modules/seo/seo";
import { getCategories, getOccasions, getProducts } from "../catalog.service";
import type { CategoryWithCount } from "../domain/catalog.types";
import { CategoryIcon } from "../lib/catalog-icons";
import { CatalogExplorer } from "./CatalogExplorer";
import { CategoryTabs } from "./CategoryTabs";
import { ProductGrid } from "./ProductGrid";

const { city, region } = siteConfig.contact;

/** Texto de la página general del catálogo (las categorías traen el suyo). */
const catalogSeo = {
  kicker: `Ramos de flores en vela y regalos · ${city}`,
  heading: `Ramos de flores en vela y regalos hechos a mano en ${city}`,
  intro: [
    `En Velaire hacemos a mano, en ${city} (${region}), ramos y bouquets de flores en vela aromatizada que nunca se marchitan, cajitas de regalo, iniciales con rosas y chocolates, recordatorios para eventos y velas de Navidad.`,
    `Cada detalle se personaliza con tus colores, aroma y mensaje. Haz tu pedido por WhatsApp: entregamos a domicilio en ${city} y enviamos a todo el Huila y al resto de Colombia.`,
  ],
};

/** Vista compartida de /catalogo y /catalogo/[categoria]. */
export async function CatalogView({ category }: { category?: CategoryWithCount }) {
  const [categories, occasions, products, allProducts] = await Promise.all([
    getCategories(),
    getOccasions(),
    getProducts({ category: category?.slug }),
    getProducts(),
  ]);
  const categoryNames = Object.fromEntries(categories.map((c) => [c.slug, c.shortName]));
  const seo = category
    ? { kicker: category.seo.kicker, heading: category.seo.title, intro: category.seo.intro }
    : catalogSeo;
  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Catálogo", path: "/catalogo" },
    ...(category ? [{ name: category.name, path: `/catalogo/${category.slug}` }] : []),
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        icon={category ? <CategoryIcon slug={category.slug} /> : <LayoutGrid />}
        breadcrumbs={crumbs.map((c, i) => (i === crumbs.length - 1 ? { label: c.name } : { label: c.name, href: c.path }))}
        title={
          <>
            {category ? (
              category.name
            ) : (
              <>
                Nuestro <em>catálogo</em>
              </>
            )}
            <span className="mt-4 block font-sans text-[0.7rem] font-semibold tracking-[0.2em] text-clay-600 uppercase not-italic sm:text-xs">
              {seo.kicker}
            </span>
          </>
        }
        description={
          category?.description ??
          "Flores en vela que nunca se marchitan, recordatorios y detalles personalizados. Agrega tus favoritos al pedido y te enviamos la cotización por WhatsApp."
        }
      />
      <Container className="pt-6 pb-14 md:pt-10">
        <CategoryTabs categories={categories} active={category?.slug} total={allProducts.length} />
        <div className="mt-4 md:mt-8">
          <Suspense
            fallback={<ProductGrid products={products} categoryNames={categoryNames} className="mt-20" />}
          >
            <CatalogExplorer products={products} occasions={occasions} categoryNames={categoryNames} />
          </Suspense>
        </div>

        <section className="surface mx-auto mt-16 max-w-3xl rounded-[2rem] p-6 sm:mt-20 sm:p-10">
          <h2 className="font-display text-[1.9rem] leading-tight text-balance sm:text-4xl">{seo.heading}</h2>
          {seo.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-4 leading-relaxed text-cacao-700">
              {paragraph}
            </p>
          ))}
        </section>
      </Container>
    </>
  );
}
