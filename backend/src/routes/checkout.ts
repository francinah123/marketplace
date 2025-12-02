import { Router } from "express";
const router = Router();

let orders: any[] = [];

router.post("/", (req, res) => {
  const { address, payment } = req.body;
  const order = {
    id: `o${orders.length + 1}`,
    address,
    payment,
    status: "confirmed",
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  res.status(201).json({ order });
});

export default router;
