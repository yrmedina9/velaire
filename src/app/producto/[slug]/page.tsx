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
import { ProductActionBar } from "@/modules/catalog/components/ProductActionBar";
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
  // La imagen para redes la genera ./opengraph-image.tsx
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} · Velaire`,
      description: product.shortDescription,
      url: `/producto/${product.slug}`,
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
      <Container className="pb-14 md:pt-8 md:pb-24">
        <div className="hidden md:block">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Catálogo", href: "/catalogo" },
              ...(category ? [{ label: category.shortName, href: `/catalogo/${category.slug}` }] : []),
              { label: product.name },
            ]}
          />
        </div>
        <div className="grid md:mt-8 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />
          {/* En móvil la información sube como una hoja sobre la foto */}
          <div className="relative z-10 -mx-4 -mt-8 rounded-t-[2rem] bg-blush-50 px-4 pt-6 shadow-[0_-16px_32px_-24px_rgb(58_38_33/0.45)] sm:-mx-6 sm:px-6 md:mx-0 md:mt-10 md:rounded-none md:bg-transparent md:px-0 md:pt-0 md:shadow-none lg:mt-0">
            <ProductInfo product={product} category={category} occasions={occasions} shipping={shipping} />
          </div>
        </div>
      </Container>

      <section className="bg-white/60 py-14 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="También te puede gustar"
            title={
              <>
                Más detalles que <em>enamoran</em>
              </>
            }
          />
          <ProductGrid products={related} categoryNames={categoryNames} layout="rail" className="mt-8 sm:mt-12" />
        </Container>
      </section>

      <ProductActionBar product={product} />
    </>
  );
}
