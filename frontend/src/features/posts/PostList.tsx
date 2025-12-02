import { useEffect, useState } from "react";
import PostCreate from "./PostCreate";

type Post = {
  id: string;
  author: string;
  content: string;
  likes: number;
  dislikes: number;
};

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => setPosts([]));
  }, []);

  const handleAction = async (postId: string, action: string) => {
    await fetch(`/api/post-actions/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId })
    });
    // Refresh posts
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data.posts || []);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Community Posts</h2>
      <PostCreate onPostCreated={() => {
        fetch("/api/posts").then(res => res.json()).then(data => setPosts(data.posts || []));
      }} />
      {posts.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
          <strong>{p.author}</strong>
          <p>{p.content}</p>
          <div>
            <button onClick={() => handleAction(p.id, "like")}>👍 {p.likes}</button>
            <button onClick={() => handleAction(p.id, "dislike")}>👎 {p.dislikes}</button>
            <button onClick={() => handleAction(p.id, "repost")}>🔁 Repost</button>
            <button onClick={() => handleAction(p.id, "share")}>📤 Share</button>
          </div>
        </div>
      ))}
    </div>
  );
}
