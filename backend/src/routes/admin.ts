import { Router } from "express";
const router = Router();

let users = [
  { id: "u1", name: "Alice", role: "buyer", banned: false },
  { id: "u2", name: "Bob", role: "seller", banned: false }
];
let products = [
  { id: "p1", title: "Wireless Headphones", flagged: false },
  { id: "p2", title: "Smart Watch", flagged: true }
];
let posts = [
  { id: "post1", content: "Great product!", flagged: false },
  { id: "post2", content: "Spam content", flagged: true }
];

router.get("/users", (_req, res) => res.json({ users }));
router.post("/users/:id/ban", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (user) user.banned = true;
  res.json({ user });
});

router.get("/products", (_req, res) => res.json({ products }));
router.get("/posts", (_req, res) => res.json({ posts }));

export default router;
