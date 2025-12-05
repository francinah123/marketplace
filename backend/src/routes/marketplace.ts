import { Router } from "express";
import { products } from "../data/models/Product";

const router = Router();

/**
 * GET /api/marketplace
 * Query params:
 * - search: string
 * - min: number
 * - max: number
 * - rating: number
 * - store: string
 * - groupByCategory: boolean
 * - sortBy: "price" | "rating" | "name"
 * - order: "asc" | "desc"
 * - page: number (default 1)
 * - limit: number (default 10)
 */
router.get("/", (req, res) => {
  const { search, min, max, rating, store, groupByCategory, sortBy, order, page, limit } = req.query;

  let results = products;

  // 🔍 Search filter
  if (search && typeof search === "string") {
    const lower = search.toLowerCase();
    results = results.filter((p) => p.name.toLowerCase().includes(lower));
  }

  // 💰 Price filter
  const minPrice = min ? Number(min) : 0;
  const maxPrice = max ? Number(max) : Infinity;
  results = results.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  // ⭐ Rating filter
  if (rating) {
    const minRating = Number(rating);
    results = results.filter((p) => (p.rating || 0) >= minRating);
  }

  // 🏪 Store filter
  if (store && typeof store === "string") {
    const lowerStore = store.toLowerCase();
    results = results.filter((p) => (p.storeName || "").toLowerCase().includes(lowerStore));
  }

  // 📊 Sorting
  if (sortBy) {
    results = results.sort((a, b) => {
      let valA: number | string = a[sortBy as keyof typeof a] as any;
      let valB: number | string = b[sortBy as keyof typeof b] as any;

      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return order === "desc" ? 1 : -1;
      if (valA > valB) return order === "desc" ? -1 : 1;
      return 0;
    });
  }

  // 📂 Group by category if requested
  if (groupByCategory === "true") {
    const grouped = results.reduce((acc: Record<string, typeof products>, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {});
    return res.json({ categories: grouped });
  }

  // 📑 Pagination
  const pageNum = page ? Number(page) : 1;
  const limitNum = limit ? Number(limit) : 10;
  const start = (pageNum - 1) * limitNum;
  const end = start + limitNum;

  const paginated = results.slice(start, end);

  res.json({
    total: results.length,
    page: pageNum,
    limit: limitNum,
    products: paginated,
  });
});

export default router;
