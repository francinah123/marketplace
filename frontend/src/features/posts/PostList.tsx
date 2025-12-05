import { useEffect, useState } from "react";
import PostCreate from "./PostCreate";
import PostCard from "./PostCard";

type Post = {
  id: string;
  author: string;
  content?: string;
  caption?: string;
  imageUrls?: string[];
  video?: {
    url: string;
    thumbnail?: string;
    duration?: number;
    encodingStatus?: "pending" | "ready" | "failed";
  };
  likes: number;
  dislikes: number;
  donation?: {
    enabled: boolean;
    targetAmount?: number;
    raisedAmount?: number;
    currency?: string;
    status?: "PENDING" | "APPROVED" | "DECLINED";
  };
  product?: {
    name: string;
    description?: string;
    price: number;
    currency?: string;
    category?: string;
    imageUrl?: string;
    stock?: number;
    status?: "AVAILABLE" | "SOLD_OUT";
  };
  createdAt?: Date;
};

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data.posts || []);
      setError(null);
    } catch (err: any) {
      setError("Failed to load posts.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAction = async (postId: string, action: string) => {
    try {
      await fetch(`/api/post-actions/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      await fetchPosts();
    } catch {
      setError("Failed to perform action.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Community Posts</h2>

      {/* Post creation */}
      <PostCreate onPostCreated={fetchPosts} />

      {/* Loading state */}
      {loading && <p className="text-gray-500">Loading posts...</p>}

      {/* Error state */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Empty state */}
      {!loading && posts.length === 0 && (
        <p className="text-gray-500">No posts yet. Be the first to share something!</p>
      )}

      {/* Post feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
