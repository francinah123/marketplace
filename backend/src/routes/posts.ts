import { Router } from "express";
import {
  uploadImages,
  uploadVideos,
  uploadAudios,
} from "../middleware/upload";
import {
  createTextPost,
  createDonationPost,
  createProductPost,
  createVideoPost,
  createAudioPost,
} from "../controllers/postController";
import { posts } from "../data/models/Post";

const router = Router();

// === Core Post CRUD ===

// Get all posts
router.get("/", (_req, res) => {
  res.json({ posts });
});

// Get single post by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json({ post });
});

// Update post by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  // Merge updates into the post
  Object.assign(post, req.body);

  res.json({ post });
});

// Delete post by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  const deleted = posts.splice(index, 1)[0];
  res.json({ deleted });
});

// === Post creation routes ===

// Text-only post
router.post("/", createTextPost);

// Donation post
router.post("/create/donation", createDonationPost);

// Product post (with optional image upload)
router.post("/create/product", uploadImages.single("image"), createProductPost);

// Video post
router.post("/create/video", uploadVideos.single("video"), createVideoPost);

// Audio post
router.post("/create/audio", uploadAudios.single("audio"), createAudioPost);

export default router;
