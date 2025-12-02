import { Router } from "express";
const router = Router();

const products = [
  { id: "p1", title: "Wireless Headphones", description: "Noise-cancelling over-ear headphones.", price: 899.99, rating: 4.5, storeName: "AudioHub" },
  { id: "p2", title: "Smart Watch", description: "Fitness tracking with heart rate monitor.", price: 1299.0, rating: 4.2, storeName: "TechWorld" },
  { id: "p3", title: "Gaming Mouse", description: "High precision with RGB lighting.", price: 499.0, rating: 4.7, storeName: "ProGear" }
];

router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json({ product });
});

export default router;

