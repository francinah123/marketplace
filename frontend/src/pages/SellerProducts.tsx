import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../services/http";
import ProductList from "../components/ProductList";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  inventory: number;
  status: "draft" | "active" | "archived";
  publishedAt: string | null;
  images: string[];
  category: string;
};

export default function SellerProducts() {
  const { sellerId } = useParams<{ sellerId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSellerProducts() {
      try {
        const res = await http.get(`/sellers/${sellerId}/products`);
        setProducts(res.data.products);
      } catch (err) {
        console.error("Failed to fetch seller products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSellerProducts();
  }, [sellerId]);

  if (loading) return <p className="text-center">Loading seller products...</p>;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h2 className="mb-6 text-2xl font-bold">Seller’s Products</h2>
      <ProductList products={products} />
    </div>
  );
}
