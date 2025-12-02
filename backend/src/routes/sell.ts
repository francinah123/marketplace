import { Router } from "express";
import { z } from "zod";
import { validateZod } from "../middleware/validateZod";

const router = Router();

let products: any[] = [];

const productSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  price: z.number().positive(),
  inventory: z.number().int().min(0),
  imageUrl: z.string().url().optional()
});

router.post("/product", validateZod(productSchema), (req, res) => {
  const { title, description, price, inventory, imageUrl } = req.body;
  const product = {
    id: `p${products.length + 1}`,
    title,
    description,
    price,
    inventory,
    imageUrl,
    storeId: "store1"
  };
  products.push(product);
  res.status(201).json({ product });
});

export default router;

