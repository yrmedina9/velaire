import type { MetadataRoute } from "next";
import { getCategories, getProducts } from "@/modules/catalog/catalog.service";
import { absoluteUrl } from "@/modules/seo/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const latest = products.map((p) => p.publishedAt).sort().at(-1);

  return [
    { url: absoluteUrl("/"), lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/catalogo"), lastModified: latest, changeFrequency: "weekly", priority: 0.9 },
    ...categories.map((c) => ({
      url: absoluteUrl(`/catalogo/${c.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [absoluteUrl(c.image)],
    })),
    ...products.map((p) => ({
      url: absoluteUrl(`/producto/${p.slug}`),
      lastModified: p.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      // Fotos del producto para Google Imágenes.
      images: p.images.map((image) => absoluteUrl(image.src)),
    })),
    { url: absoluteUrl("/envios"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/contacto"), changeFrequency: "yearly", priority: 0.5 },
  ];
}
