import { Router } from "express";
import { products } from "../data/models/Product"; // existing products array
import { sellers } from "../data/models/Seller";   // new sellers array

const router = Router();

// === Get seller profile ===
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const seller = sellers.find((s) => s.id === id);

  if (!seller) {
    return res.status(404).json({ error: "Seller not found" });
  }

  res.json({ seller });
});

// === Get seller's products ===
router.get("/:id/products", (req, res) => {
  const { id } = req.params;
  const sellerProducts = products.filter((p) => p.sellerId === id);

  res.json({ products: sellerProducts });
});
// List all sellers
router.get("/", (_req, res) => {
  res.json({ sellers });
});

// Get single seller by ID
router.get("/:id", (req, res) => {
  const seller = sellers.find((s) => s.id === req.params.id);
  if (!seller) return res.status(404).json({ error: "Seller not found" });
  res.json({ seller });
});

export default router;
