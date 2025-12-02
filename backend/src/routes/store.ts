import { Router } from "express";
const router = Router();

let products: any[] = [
  { id: "p1", title: "Wireless Headphones", price: 899.99, inventory: 10, storeId: "store1" }
];

router.get("/mystore", (_req, res) => {
  const myProducts = products.filter((p) => p.storeId === "store1");
  res.json({ products: myProducts });
});

export default router;
