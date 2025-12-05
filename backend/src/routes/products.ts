import { Router } from "express";
import { products, Product } from "../data/models/Product";

const router = Router();

// === Get Products with Pagination, Search, Category Filter, Sorting, Seller Filter ===
router.get("/", (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 9;
  const category = req.query.category as string | undefined;
  const search = (req.query.search as string | undefined)?.toLowerCase();
  const sort = req.query.sort as string | undefined;
  const sellerId = req.query.sellerId as string | undefined;

  let filtered = products;

  // Seller filter
  if (sellerId) {
    filtered = filtered.filter((p) => p.sellerId === sellerId);
  }

  // Category filter
  if (category) {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  // Search filter
  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
    );
  }

  // Sorting
  if (sort) {
    filtered = [...filtered].sort((a, b) => {
      switch (sort) {
        case "priceLowHigh":
          return a.price - b.price;
        case "priceHighLow":
          return b.price - a.price;
        case "inventoryHighLow":
          return b.inventory - a.inventory;
        case "inventoryLowHigh":
          return a.inventory - b.inventory;
        case "newest":
        default:
          return (
            new Date(b.publishedAt || "").getTime() -
            new Date(a.publishedAt || "").getTime()
          );
      }
    });
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filtered.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    total: filtered.length,
    totalPages: Math.ceil(filtered.length / limit),
    products: paginatedProducts
  });
});

export default router;
