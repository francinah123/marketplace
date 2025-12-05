// src/services/postService.ts
import type { Post } from "../repositories/postRepository";
import * as postRepository from "../repositories/postRepository";

// === Service functions ===
// These wrap repository calls and can add business logic later.

export function getAllPosts(): Post[] {
  return postRepository.findAll();
}

export function getPostById(id: string): Post | undefined {
  return postRepository.findById(id);
}

export function createPost(post: Post): Post {
  // Example: add business rules before saving
  return postRepository.insert(post);
}

export function updatePost(id: string, updates: Partial<Post>): Post | null {
  return postRepository.update(id, updates);
}

export function deletePost(id: string): Post | null {
  return postRepository.remove(id);
}
