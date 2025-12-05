export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  inventory: number;
  images: string[];
  videos: string[];
  audios: string[];
  shippingMethod?: string;
  shippingCost?: number;
  shippingRegion?: string;
  status: "draft" | "active" | "archived";
  publishedAt: string | null;
  sellerId: string;   // ✅ seller reference
  category: string;   // ✅ category reference
  rating?: number;    // ⭐ optional rating
  storeName?: string; // 🏪 optional store name
}

// In-memory product store (replace with DB later)
export const products: Product[] = [
  {
    id: "prod1",
    name: "Summer Dress",
    description: "Lightweight cotton dress perfect for summer outings.",
    price: 450,
    inventory: 20,
    status: "active",
    publishedAt: new Date().toISOString(),
    images: ["/images/dress1.jpg"],
    videos: [],
    audios: [],
    shippingMethod: "Courier",
    shippingCost: 50,
    shippingRegion: "South Africa",
    sellerId: "seller1",
    category: "Fashion",
    rating: 4,
    storeName: "Fashion Hub"
  },
  {
    id: "prod2",
    name: "Wireless Earbuds",
    description: "Noise-cancelling earbuds with long battery life.",
    price: 1200,
    inventory: 50,
    status: "active",
    publishedAt: new Date().toISOString(),
    images: ["/images/earbuds1.jpg"],
    videos: [],
    audios: [],
    shippingMethod: "Courier",
    shippingCost: 80,
    shippingRegion: "South Africa",
    sellerId: "seller2",
    category: "Electronics",
    rating: 5,
    storeName: "Tech World"
  },
  {
    id: "prod3",
    name: "Wooden Coffee Table",
    description: "Handcrafted wooden coffee table for modern living rooms.",
    price: 2500,
    inventory: 10,
    status: "active",
    publishedAt: new Date().toISOString(),
    images: ["/images/table1.jpg"],
    videos: [],
    audios: [],
    shippingMethod: "Courier",
    shippingCost: 200,
    shippingRegion: "South Africa",
    sellerId: "seller3",
    category: "Home & Living",
    rating: 3,
    storeName: "Home Decor"
  },
  {
    id: "prod4",
    name: "Denim Jacket",
    description: "Classic denim jacket for all seasons.",
    price: 800,
    inventory: 15,
    status: "active",
    publishedAt: new Date().toISOString(),
    images: ["/images/jacket1.jpg"],
    videos: [],
    audios: [],
    shippingMethod: "Courier",
    shippingCost: 60,
    shippingRegion: "South Africa",
    sellerId: "seller1",
    category: "Fashion",
    rating: 4,
    storeName: "Fashion Hub"
  }
];
