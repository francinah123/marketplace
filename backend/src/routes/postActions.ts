import { Router } from "express";
const router = Router();

let posts: any[] = [
  { id: "post1", author: "Alice", content: "Loving my new headphones!", likes: 2, dislikes: 0 },
  { id: "post2", author: "Bob", content: "Check out my store update!", likes: 1, dislikes: 1 }
];

router.post("/like", (req, res) => {
  const { postId } = req.body;
  const post = posts.find((p) => p.id === postId);
  if (post) post.likes++;
  res.json({ post });
});

router.post("/dislike", (req, res) => {
  const { postId } = req.body;
  const post = posts.find((p) => p.id === postId);
  if (post) post.dislikes++;
  res.json({ post });
});

router.post("/repost", (req, res) => {
  const { postId } = req.body;
  const post = posts.find((p) => p.id === postId);
  if (post) {
    const repost = { ...post, id: `post${posts.length + 1}`, author: "Francinah (repost)" };
    posts.unshift(repost);
    res.json({ post: repost });
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

router.post("/share", (req, res) => {
  const { postId } = req.body;
  const post = posts.find((p) => p.id === postId);
  if (post) {
    // For now, just acknowledge share
    res.json({ message: `Post ${postId} shared successfully` });
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

export default router;
