import { Router } from "express";
import { newUsersSeed } from "../data/db";
import { UserSchema, NewUserSchema } from "../utils/validators";

const router = Router();

// === GET seeded users (Qwerty Users) ===
router.get("/new", (_req, res) => {
  // Validate each seeded user against UserSchema
  return res.json(newUsersSeed.map(u => UserSchema.parse(u)));
});

// === POST follow user (mock) ===
router.post("/:id/follow", (req, res) => {
  const { id } = req.params;
  const user = newUsersSeed.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.followers += 1;
  return res.json({ ok: true, followers: user.followers });
});

// === POST register new user (DTO validation) ===
router.post("/register", (req, res) => {
  try {
    // Validate incoming payload against NewUserSchema
    const newUser = NewUserSchema.parse(req.body);

    // Normally you’d insert into DB here
    // For now, just return the validated payload
    return res.status(201).json({ ok: true, user: newUser });
  } catch (err) {
    return res.status(400).json({ error: "Invalid user data", details: err });
  }
});

export default router;
