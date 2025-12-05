import { Request, Response } from "express";
import { buildFileUrl } from "../services/storage";
import {
  getAllPosts,
  getPostById as getPostByIdService,
  createPost,
  updatePost as updatePostService,
  deletePost as deletePostService,
} from "../services/postService";

// === Get all posts ===
export async function getPosts(_req: Request, res: Response) {
  res.json({ posts: getAllPosts() });
}

// === Get single post ===
export async function getPostById(req: Request, res: Response) {
  const post = getPostByIdService(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json({ post });
}

// === Create text post ===
export async function createTextPost(req: Request, res: Response) {
  try {
    const { author, content } = req.body;
    if (!author || !content) {
      return res.status(400).json({ error: "Author and content are required." });
    }
    const newPost = {
      id: `post${getAllPosts().length + 1}`,
      author,
      content,
      likes: 0,
      dislikes: 0,
    };
    res.status(201).json({ post: createPost(newPost) });
  } catch {
    res.status(500).json({ error: "Failed to create text post." });
  }
}

// === Donation post ===
export async function createDonationPost(req: Request, res: Response) {
  try {
    const { author, targetAmount, currency } = req.body;
    if (!author || !targetAmount) {
      return res.status(400).json({ error: "Author and targetAmount are required." });
    }
    const newPost = {
      id: `post${getAllPosts().length + 1}`,
      author,
      likes: 0,
      dislikes: 0,
      donation: {
        enabled: true,
        targetAmount: Number(targetAmount),
        raisedAmount: 0,
        currency: currency || "ZAR",
        status: "PENDING" as const,
      },
    };
    res.status(201).json({ post: createPost(newPost) });
  } catch {
    res.status(500).json({ error: "Failed to create donation post." });
  }
}

// === Product post ===
export async function createProductPost(req: Request, res: Response) {
  try {
    const { author, name, description, price, currency, category } = req.body;
    if (!author || !name || !price) {
      return res.status(400).json({ error: "Author, name, and price are required." });
    }
    const file = req.file as Express.Multer.File | undefined;
    const imageUrl = file ? buildFileUrl(file.filename) : undefined;
    const newPost = {
      id: `post${getAllPosts().length + 1}`,
      author,
      likes: 0,
      dislikes: 0,
      product: {
        name,
        description,
        price: Number(price),
        currency: currency || "ZAR",
        category,
        imageUrl,
        stock: 1,
        status: "AVAILABLE" as const,
      },
    };
    res.status(201).json({ post: createPost(newPost) });
  } catch {
    res.status(500).json({ error: "Failed to create product post." });
  }
}

// === Video post ===
export async function createVideoPost(req: Request, res: Response) {
  try {
    const { author, caption } = req.body;
    if (!author) return res.status(400).json({ error: "Author is required." });
    const file = req.file as Express.Multer.File | undefined;
    if (!file) return res.status(400).json({ error: "Video file is required." });
    const videoUrl = buildFileUrl(file.filename);
    const newPost = {
      id: `post${getAllPosts().length + 1}`,
      author,
      caption,
      likes: 0,
      dislikes: 0,
      video: { url: videoUrl, encodingStatus: "ready" as const },
    };
    res.status(201).json({ post: createPost(newPost) });
  } catch {
    res.status(500).json({ error: "Failed to create video post." });
  }
}

// === Audio post ===
export async function createAudioPost(req: Request, res: Response) {
  try {
    const { author, caption } = req.body;
    if (!author) return res.status(400).json({ error: "Author is required." });
    const file = req.file as Express.Multer.File | undefined;
    if (!file) return res.status(400).json({ error: "Audio file is required." });
    const audioUrl = buildFileUrl(file.filename);
    const newPost = {
      id: `post${getAllPosts().length + 1}`,
      author,
      caption,
      likes: 0,
      dislikes: 0,
      audio: { url: audioUrl },
    };
    res.status(201).json({ post: createPost(newPost) });
  } catch {
    res.status(500).json({ error: "Failed to create audio post." });
  }
}

// === Update post ===
export async function updatePost(req: Request, res: Response) {
  const updated = updatePostService(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Post not found" });
  res.json({ post: updated });
}

// === Delete post ===
export async function deletePost(req: Request, res: Response) {
  const deleted = deletePostService(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Post not found" });
  res.json({ deleted });
}
