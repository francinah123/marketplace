import { Router } from "express";
import { uploadImages } from "../middleware/upload";
import { ImagePostSchema } from "../utils/validators";
import { posts } from "../data/models/Post";
import { buildFileUrl } from "../services/storage";

const router = Router();

// === Core Post CRUD ===

// Get all posts
router.get("/", (_req, res) => {
  res.json({ posts });
});

// Create a new text-only post
router.post("/", (req, res) => {
  const { author, content } = req.body;
  const newPost = {
    id: `post${posts.length + 1}`,
    author,
    content,
    likes: 0,
    dislikes: 0
  };
  posts.unshift(newPost);
  res.status(201).json({ post: newPost });
});

// === Upload Menu Endpoints ===

// Text post stub (can later validate with Zod)
router.post("/create/text", (req, res) => {
  res.json({ ok: true, type: "text", body: req.body });
});

// ✅ Real image upload endpoint
router.post("/create/images", uploadImages.array("images", 5), (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    const { author, caption } = req.body;

    // Build URLs for each uploaded file
    const imageUrls = files.map((f) => buildFileUrl(f.filename));

    // Validate payload with Zod
    const parsed = ImagePostSchema.parse({ author, caption, imageUrls });

    const newPost = {
      id: `post${posts.length + 1}`,
      author: parsed.author,
      caption: parsed.caption,
      imageUrls: parsed.imageUrls,
      likes: 0,
      dislikes: 0
    };
    posts.unshift(newPost);

    res.status(201).json({ post: newPost });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Stubs for other media types
router.post("/create/videos", (req, res) => {
  res.json({ ok: true, type: "videos", body: req.body });
});

router.post("/create/audios", (req, res) => {
  res.json({ ok: true, type: "audios", body: req.body });
});

router.post("/create/link", (req, res) => {
  res.json({ ok: true, type: "link", body: req.body });
});

export default router;
