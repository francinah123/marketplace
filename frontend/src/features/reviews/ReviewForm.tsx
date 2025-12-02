import { useState } from "react";

export default function ReviewForm({ productId, onReviewAdded }: { productId: string; onReviewAdded: () => void }) {
  const [user, setUser] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, user, rating, comment })
    })
      .then(() => {
        setUser("");
        setRating(5);
        setComment("");
        onReviewAdded();
      })
      .catch((err) => console.error("Error adding review:", err));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <h3>Add a Review</h3>
      <input
        type="text"
        placeholder="Your name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        required
      />
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      <textarea
        placeholder="Your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
}
