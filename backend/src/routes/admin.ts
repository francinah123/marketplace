import { Router } from "express";
import { adminGuard } from "../middleware/auth";
import { posts } from "../data/models/Post";

const router = Router();

// === User Management ===
let users = [
  { id: "u1", name: "Alice", role: "buyer", banned: false },
  { id: "u2", name: "Bob", role: "seller", banned: false },
];

router.get("/users", (_req, res) => res.json({ users }));

router.post("/users/:id/ban", adminGuard, (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.banned = true;
  res.json({ user });
});

// === Product Moderation ===
let products = [
  { id: "p1", title: "Wireless Headphones", flagged: false },
  { id: "p2", title: "Smart Watch", flagged: true },
];

router.get("/products", (_req, res) => res.json({ products }));

// === Post Moderation ===
let modPosts = [
  { id: "post1", content: "Great product!", flagged: false },
  { id: "post2", content: "Spam content", flagged: true },
];

router.get("/posts", (_req, res) => res.json({ posts: modPosts }));

// === Video Streaming & Moderation ===

// Stream all ready videos
router.get("/stream/videos", adminGuard, async (_req, res) => {
  try {
    const videos = posts.filter((p) => p.video?.encodingStatus === "ready");
    res.json({ videos });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Flag a video post
router.post("/videos/:id/flag", adminGuard, (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post || !post.video) return res.status(404).json({ error: "Video post not found" });
  (post as any).flagged = true;
  res.json({ post });
});

// Unflag a video post
router.post("/videos/:id/unflag", adminGuard, (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post || !post.video) return res.status(404).json({ error: "Video post not found" });
  (post as any).flagged = false;
  res.json({ post });
});

// Delete a video post
router.delete("/videos/:id", adminGuard, (req, res) => {
  const idx = posts.findIndex((p) => p.id === req.params.id && p.video);
  if (idx === -1) return res.status(404).json({ error: "Video post not found" });
  posts.splice(idx, 1);
  res.json({ ok: true });
});

export default router;
