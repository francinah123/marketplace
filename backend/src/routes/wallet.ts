import { Router } from "express";
const router = Router();

let balance = 1000;
let transactions: any[] = [
  { id: "t1", type: "topup", amount: 500, timestamp: new Date().toISOString() },
  { id: "t2", type: "purchase", amount: 200, timestamp: new Date().toISOString() }
];

router.get("/", (_req, res) => {
  res.json({ balance, transactions });
});

router.post("/topup", (req, res) => {
  const { amount } = req.body;
  balance += amount;
  const tx = { id: `t${transactions.length + 1}`, type: "topup", amount, timestamp: new Date().toISOString() };
  transactions.push(tx);
  res.status(201).json({ balance, transaction: tx });
});

router.post("/payout", (req, res) => {
  const { amount } = req.body;
  balance -= amount;
  const tx = { id: `t${transactions.length + 1}`, type: "payout", amount, timestamp: new Date().toISOString() };
  transactions.push(tx);
  res.status(201).json({ balance, transaction: tx });
});

export default router;
