import categoriesData from "@/data/catalog/categories.json";
import occasionsData from "@/data/catalog/occasions.json";
import productsData from "@/data/catalog/products.json";
import type { Category, Occasion, Product } from "../domain/catalog.types";
import type { CatalogRepository } from "./catalog.repository";

const products = productsData as Product[];
const categories = categoriesData as Category[];
const occasions = occasionsData as Occasion[];

export const jsonCatalogRepository: CatalogRepository = {
  async findAllProducts() {
    return products;
  },
  async findProductBySlug(slug) {
    return products.find((product) => product.slug === slug);
  },
  async findAllCategories() {
    return [...categories].sort((a, b) => a.order - b.order);
  },
  async findAllOccasions() {
    return occasions;
  },
};
