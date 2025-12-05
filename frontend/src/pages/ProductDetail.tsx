import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../services/http";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  inventory: number;
  status: "draft" | "active" | "archived";
  publishedAt: string | null;
  images: string[];
  videos: string[];
  audios: string[];
  shippingMethod?: string;
  shippingCost?: number;
  shippingRegion?: string;
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await http.get(`/products`);
        const found = res.data.products.find((p: Product) => p.id === id);
        setProduct(found || null);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center text-red-600">Product not found.</p>;
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h2 className="mb-4 text-2xl font-bold">{product.name}</h2>
      <p className="mb-4 text-gray-700">{product.description}</p>

      <p className="mb-2">
        <strong>Price:</strong> R{product.price}
      </p>
      <p className="mb-2">
        <strong>Inventory:</strong> {product.inventory}
      </p>
      <p className="mb-2">
        <strong>Status:</strong>{" "}
        {product.status === "active" ? (
          <span className="text-green-600">Active</span>
        ) : (
          <span className="text-gray-600">{product.status}</span>
        )}
      </p>
      {product.publishedAt && (
        <p className="mb-2">
          <strong>Published At:</strong>{" "}
          {new Date(product.publishedAt).toLocaleString()}
        </p>
      )}

      {product.shippingMethod && (
        <p className="mb-2">
          <strong>Shipping:</strong> {product.shippingMethod} (
          {product.shippingCost} in {product.shippingRegion})
        </p>
      )}

      {/* Media */}
      {product.images.length > 0 && (
        <div className="mt-4">
          <strong>Images:</strong>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {product.images.map((url, i) => (
              <img
                key={i}
                src={url}
                alt="Product"
                className="h-24 w-full rounded object-cover"
              />
            ))}
          </div>
        </div>
      )}

      {product.videos.length > 0 && (
        <div className="mt-4">
          <strong>Videos:</strong>
          {product.videos.map((url, i) => (
            <video key={i} src={url} controls className="mt-2 w-full rounded" />
          ))}
        </div>
      )}

      {product.audios.length > 0 && (
        <div className="mt-4">
          <strong>Audios:</strong>
          {product.audios.map((url, i) => (
            <audio key={i} src={url} controls className="mt-2 w-full" />
          ))}
        </div>
      )}
    </div>
  );
}
