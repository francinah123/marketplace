import { Post } from "../data/models/Post";

// In-memory store for demo purposes.
// Later you can swap this out for MongoDB or another persistence layer.
let posts: Post[] = [];

// === Repository functions ===
// Raw data access only — no business logic.

export function findAll(): Post[] {
  return posts;
}

export function findById(id: string): Post | undefined {
  return posts.find((p: Post) => p.id === id);
}

export function insert(post: Post): Post {
  posts.unshift(post);
  return post;
}

export function update(id: string, updates: Partial<Post>): Post | null {
  const post = posts.find((p: Post) => p.id === id);
  if (!post) return null;
  Object.assign(post, updates);
  return post;
}

export function remove(id: string): Post | null {
  const index = posts.findIndex((p: Post) => p.id === id);
  if (index === -1) return null;
  const [deleted] = posts.splice(index, 1);
  return deleted;
}
