import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getCategories,
  getOccasions,
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from "@/modules/catalog/catalog.service";
import { CareGuide } from "@/modules/catalog/components/CareGuide";
import { ProductGallery } from "@/modules/catalog/components/ProductGallery";
import { ProductGrid } from "@/modules/catalog/components/ProductGrid";
import { ProductInfo } from "@/modules/catalog/components/ProductInfo";
import { ProductSkeleton } from "@/modules/catalog/components/Skeletons";
import { getCareGuide, getShippingInfo } from "@/modules/content/content.service";

type Params = PageProps<"/producto/[slug]">["params"];

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/producto/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const [cover] = product.images;
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.alt }],
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/producto/[slug]">) {
  const care = await getCareGuide();

  // Los params se leen dentro de <Suspense> para que la navegación sea instantánea.
  return (
    <>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
      <CareGuide guide={care} />
    </>
  );
}

async function ProductContent({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [categories, occasions, related, shipping] = await Promise.all([
    getCategories(),
    getOccasions(),
    getRelatedProducts(product, 4),
    getShippingInfo(),
  ]);
  const category = categories.find((c) => c.slug === product.category);
  const categoryNames = Object.fromEntries(categories.map((c) => [c.slug, c.shortName]));

  return (
    <>
      <Container className="pt-8 pb-16 sm:pb-24">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Catálogo", href: "/catalogo" },
            ...(category ? [{ label: category.shortName, href: `/catalogo/${category.slug}` }] : []),
            { label: product.name },
          ]}
        />
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />
          <ProductInfo
            product={product}
            category={category}
            occasions={occasions}
            productionEstimate={shipping.production.estimate}
          />
        </div>
      </Container>

      <section className="bg-white/60 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="También te puede gustar"
            title={
              <>
                Más detalles que <em>enamoran</em>
              </>
            }
          />
          <ProductGrid products={related} categoryNames={categoryNames} className="mt-12" />
        </Container>
      </section>
    </>
  );
}
