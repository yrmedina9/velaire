import type { Category, Occasion, Product } from "../domain/catalog.types";

/**
 * Contrato de acceso a datos del catálogo. Hoy lo implementa un
 * repositorio basado en JSON; cuando exista el backend basta con
 * crear otra implementación (p. ej. `ApiCatalogRepository`) y
 * cambiarla en `catalog.service.ts`.
 */
export interface CatalogRepository {
  findAllProducts(): Promise<Product[]>;
  findProductBySlug(slug: string): Promise<Product | undefined>;
  findAllCategories(): Promise<Category[]>;
  findAllOccasions(): Promise<Occasion[]>;
}
