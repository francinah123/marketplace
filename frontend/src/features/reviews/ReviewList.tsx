import { useEffect, useState } from "react";

type Review = {
  id: string;
  productId: string;
  user: string;
  rating: number;
  comment: string;
};

export default function ReviewList({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/reviews?productId=${productId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews || []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <div>Loading reviews...</div>;
  if (reviews.length === 0) return <div>No reviews yet.</div>;

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.map((r) => (
        <div key={r.id} style={{ borderBottom: "1px solid #ddd", marginBottom: 8, paddingBottom: 8 }}>
          <strong>{r.user}</strong> — Rating: {r.rating}/5
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
