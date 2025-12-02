import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  rating?: number;
  storeName?: string;
};

type Review = {
  id: string;
  productId: string;
  author: string;
  text: string;
  rating: number;
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/products/${id}`).then((res) => res.json()),
      fetch(`/api/reviews?productId=${id}`).then((res) => res.json())
    ])
      .then(([productData, reviewData]) => {
        setProduct(productData.product);
        setReviews(reviewData.reviews || []);
      })
      .catch(() => {
        setProduct(null);
        setReviews([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading product...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>{product.title}</h2>
      <img
        src={product.imageUrl || "https://via.placeholder.com/400x300"}
        alt={product.title}
        style={{ width: "100%", maxWidth: 400, borderRadius: 8 }}
      />
      <p>{product.description}</p>
      <div>Price: R {product.price.toFixed(2)}</div>
      {product.rating && <div>Rating: {product.rating}/5</div>}
      {product.storeName && <div>Sold by: {product.storeName}</div>}
      <button style={{ marginTop: 12 }}>Add to Cart</button>

      <h3 style={{ marginTop: 24 }}>Reviews</h3>
      {reviews.length === 0 ? (
        <div>No reviews yet</div>
      ) : (
        <ul>
          {reviews.map((r) => (
            <li key={r.id}>
              <strong>{r.author}</strong> ({r.rating}/5): {r.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
