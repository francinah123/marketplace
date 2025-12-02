import { useState } from "react";

export default function PostCreate({ onPostCreated }: { onPostCreated: () => void }) {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author: "Francinah", content })
    });
    setContent("");
    onPostCreated();
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", height: 80 }}
      />
      <button onClick={handleSubmit} style={{ marginTop: 8 }}>Post</button>
    </div>
  );
}
