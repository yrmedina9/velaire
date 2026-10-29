import type { CategorySlug, CategoryWithCount, Product } from "./domain/catalog.types";
import type { CatalogRepository } from "./repository/catalog.repository";
import { jsonCatalogRepository } from "./repository/json-catalog.repository";

/** Fuente de datos activa. Cambiar aquí al conectar el backend. */
const repository: CatalogRepository = jsonCatalogRepository;

/** Destacados primero y luego los más recientes. */
function byRelevance(a: Product, b: Product) {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  return b.publishedAt.localeCompare(a.publishedAt);
}

export async function getProducts(filter: { category?: CategorySlug } = {}) {
  const products = await repository.findAllProducts();
  return products
    .filter((product) => !filter.category || product.category === filter.category)
    .sort(byRelevance);
}

export async function getProductBySlug(slug: string) {
  return repository.findProductBySlug(slug);
}

export async function getFeaturedProducts(limit = 8) {
  const products = await repository.findAllProducts();
  return products.filter((product) => product.featured).sort(byRelevance).slice(0, limit);
}

export async function getLatestProducts(limit = 6) {
  const products = await repository.findAllProducts();
  return [...products].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 4) {
  const products = await repository.findAllProducts();
  const shared = (p: Product) => p.occasions.filter((o) => product.occasions.includes(o)).length;
  return products
    .filter((p) => p.slug !== product.slug)
    .map((p) => ({ p, score: (p.category === product.category ? 3 : 0) + shared(p) }))
    .sort((a, b) => b.score - a.score || byRelevance(a.p, b.p))
    .slice(0, limit)
    .map(({ p }) => p);
}

export async function getCategories(): Promise<CategoryWithCount[]> {
  const [categories, products] = await Promise.all([
    repository.findAllCategories(),
    repository.findAllProducts(),
  ]);
  return categories.map((category) => ({
    ...category,
    productCount: products.filter((p) => p.category === category.slug).length,
  }));
}

export async function getCategoryBySlug(slug: string) {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug);
}

export async function getOccasions() {
  return repository.findAllOccasions();
}
