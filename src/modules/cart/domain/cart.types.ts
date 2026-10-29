export interface CartItem {
  slug: string;
  name: string;
  image: string;
  price: number | null;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  city: string;
  notes: string;
}
