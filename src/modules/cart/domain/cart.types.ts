export interface CartItem {
  slug: string;
  name: string;
  image: string;
  price: number | null;
  quantity: number;
}

export type DeliveryMode = "neiva" | "nacional";

export interface CustomerDetails {
  name: string;
  city: string;
  notes: string;
  delivery: DeliveryMode;
}
