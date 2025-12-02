import { Router } from "express";
const router = Router();

const reviews = [
  { id: "r1", productId: "p1", author: "Alice", text: "Great sound quality!", rating: 5 },
  { id: "r2", productId: "p1", author: "Bob", text: "Comfortable but pricey.", rating: 4 },
  { id: "r3", productId: "p3", author: "Charlie", text: "Perfect for gaming.", rating: 5 }
];

router.get("/", (req, res) => {
  const { productId } = req.query;
  const filtered = reviews.filter((r) => r.productId === productId);
  res.json({ reviews: filtered });
});

router.post("/", (req, res) => {
  const { productId, author, text, rating } = req.body;
  const newReview = { id: `r${reviews.length + 1}`, productId, author, text, rating };
  reviews.push(newReview);
  res.status(201).json({ review: newReview });
});

export default router;
