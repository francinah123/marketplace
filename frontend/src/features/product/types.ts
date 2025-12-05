export type ProductStatus = "draft" | "active" | "archived";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  inventory: number;
  category: string;
  status: ProductStatus;
  publishedAt: string | null; // ✅ always defined, can be null
  images: string[];
}
