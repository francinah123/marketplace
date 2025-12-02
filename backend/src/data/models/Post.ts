export type Post = {
  id: string;
  author: string;
  content?: string;
  caption?: string;
  imageUrls?: string[];
  likes: number;
  dislikes: number;
};

export const posts: Post[] = [];
