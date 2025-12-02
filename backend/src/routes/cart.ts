import { Router } from "express";
const router = Router();

let cartItems = [
  { id: "p1", title: "Wireless Headphones", price: 899.99, quantity: 1 },
  { id: "p3", title: "Gaming Mouse", price: 499.0, quantity: 2 }
];

router.get("/", (_req, res) => {
  res.json({ items: cartItems });
});

router.post("/add", (req, res) => {
  const { id, title, price, quantity } = req.body;
  cartItems.push({ id, title, price, quantity });
  res.status(201).json({ items: cartItems });
});

export default router;
