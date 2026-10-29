import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getCategories, getProducts } from "@/modules/catalog/catalog.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const url = (path: string) => `${siteConfig.url}${path}`;

  return [
    { url: url("/"), priority: 1 },
    { url: url("/catalogo"), priority: 0.9 },
    ...categories.map((c) => ({ url: url(`/catalogo/${c.slug}`), priority: 0.8 })),
    ...products.map((p) => ({ url: url(`/producto/${p.slug}`), lastModified: p.publishedAt, priority: 0.7 })),
    { url: url("/envios"), priority: 0.5 },
    { url: url("/contacto"), priority: 0.5 },
  ];
}
