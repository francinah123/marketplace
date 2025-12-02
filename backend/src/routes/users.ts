import { Router } from "express";
import { newUsersSeed } from "../data/db";
import { NewUserSchema } from "../utils/validators";

const router = Router();

// GET new registered users (Qwerty Users)
router.get("/new", (req, res) => {
  return res.json(newUsersSeed.map(u => NewUserSchema.parse(u)));
});

// POST follow user (mock)
router.post("/:id/follow", (req, res) => {
  const { id } = req.params;
  const user = newUsersSeed.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.followers += 1;
  return res.json({ ok: true, followers: user.followers });
});

export default router;
