export type CategorySlug = "bouquets" | "detalles" | "recordatorios" | "navidad" | "decorativas";

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  shortDescription: string;
  description: string;
  /** Precio en COP. `null` = precio a consultar por WhatsApp. */
  price: number | null;
  images: ProductImage[];
  occasions: string[];
  colors: string[];
  features: string[];
  customizable: boolean;
  featured: boolean;
  isNew: boolean;
  seasonal: boolean;
  instagramUrl: string;
  publishedAt: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  image: string;
  order: number;
}

export interface CategoryWithCount extends Category {
  productCount: number;
}

export interface Occasion {
  slug: string;
  name: string;
}
