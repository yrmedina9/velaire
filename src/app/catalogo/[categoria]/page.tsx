import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCategories, getCategoryBySlug } from "@/modules/catalog/catalog.service";
import { CatalogView } from "@/modules/catalog/components/CatalogView";
import { CatalogSkeleton } from "@/modules/catalog/components/Skeletons";

type Params = PageProps<"/catalogo/[categoria]">["params"];

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ categoria: category.slug }));
}

export async function generateMetadata({ params }: PageProps<"/catalogo/[categoria]">): Promise<Metadata> {
  const { categoria } = await params;
  const category = await getCategoryBySlug(categoria);
  if (!category) notFound();
  const url = `/catalogo/${category.slug}`;
  return {
    title: category.seo.title,
    description: category.seo.description,
    alternates: { canonical: url },
    // La imagen para redes la genera ./opengraph-image.tsx
    openGraph: {
      title: `${category.seo.title} | Velaire`,
      description: category.seo.description,
      url,
    },
  };
}

export default function CategoryPage({ params }: PageProps<"/catalogo/[categoria]">) {
  // Los params se leen dentro de <Suspense> para que la navegación sea instantánea.
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }: { params: Params }) {
  const { categoria } = await params;
  const category = await getCategoryBySlug(categoria);
  if (!category) notFound();

  return <CatalogView category={category} />;
}
