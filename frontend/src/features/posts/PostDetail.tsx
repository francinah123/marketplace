import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { http } from "../../services/http";

type Post = {
  id: string;
  author: string;
  content: string;
  caption?: string;
  imageUrls?: string[];
  video?: { url: string; encodingStatus: "pending" | "ready" | "failed" };
  audioUrl?: string;
  likes: number;
  dislikes: number;
};

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await http.get<{ post: Post }>(`/posts/${id}`);
      return res.data.post;
    },
    enabled: !!id, // only run if id exists
  });

  if (isLoading) return <p className="text-gray-500">Loading post...</p>;
  if (error) return <p className="text-red-500">Error loading post</p>;
  if (!post) return <p className="text-gray-500">Post not found</p>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Post Details</h2>
      <p>
        <strong>Author:</strong> {post.author}
      </p>
      <p>{post.content}</p>

      {post.caption && <p className="italic text-gray-600">{post.caption}</p>}

      {post.imageUrls && (
        <div className="grid grid-cols-2 gap-2">
          {post.imageUrls.map((url) => (
            <img key={url} src={url} alt="Post image" className="rounded" />
          ))}
        </div>
      )}

      {/* ✅ Fixed video rendering */}
      {post.video?.url && (
        <video controls width="100%">
          <source src={post.video.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {post.audioUrl && (
        <audio controls src={post.audioUrl} className="w-full" />
      )}

      <div className="flex gap-4 mt-4">
        <span>👍 {post.likes}</span>
        <span>👎 {post.dislikes}</span>
      </div>
    </div>
  );
}
