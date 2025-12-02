import { Router } from "express";
const router = Router();

let settings = { feePercent: 5, categories: ["Electronics", "Fashion"] };

router.get("/settings", (_req, res) => {
  res.json({ settings });
});

router.put("/settings", (req, res) => {
  const { feePercent, categories } = req.body;
  if (feePercent !== undefined) settings.feePercent = feePercent;
  if (categories !== undefined) settings.categories = categories;
  res.json({ settings });
});

export default router;
