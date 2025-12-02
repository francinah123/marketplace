import { Router } from "express";
const router = Router();

const products = [
  { id: "p1", title: "Wireless Headphones", price: 899.99, rating: 4.5, storeName: "AudioHub" },
  { id: "p2", title: "Smart Watch", price: 1299.0, rating: 4.2, storeName: "TechWorld" },
  { id: "p3", title: "Gaming Mouse", price: 499.0, rating: 4.7, storeName: "ProGear" }
];

router.get("/", (req, res) => {
  const { search, min, max } = req.query;
  let filtered = products;

  if (search) {
    const term = (search as string).toLowerCase();
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(term));
  }
  if (min) {
    filtered = filtered.filter((p) => p.price >= Number(min));
  }
  if (max) {
    filtered = filtered.filter((p) => p.price <= Number(max));
  }

  res.json({ products: filtered });
});

export default router;
