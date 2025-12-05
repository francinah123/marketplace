import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../services/http";
import { useState } from "react";

export default function AdminVideoStream() {
  const queryClient = useQueryClient();

  // Fetch videos
  const { data, isLoading, error } = useQuery(["adminVideos"], () =>
    http.get("/api/admin/stream/videos").then((res) => res.data)
  );

  // Mutations for moderation
  const flagVideo = useMutation(
    (id: string) => http.post(`/api/admin/videos/${id}/flag`),
    { onSuccess: () => queryClient.invalidateQueries(["adminVideos"]) }
  );

  const unflagVideo = useMutation(
    (id: string) => http.post(`/api/admin/videos/${id}/unflag`),
    { onSuccess: () => queryClient.invalidateQueries(["adminVideos"]) }
  );

  const deleteVideo = useMutation(
    (id: string) => http.delete(`/api/admin/videos/${id}`),
    { onSuccess: () => queryClient.invalidateQueries(["adminVideos"]) }
  );

  if (isLoading) return <p>Loading videos...</p>;
  if (error) return <p>Error loading videos</p>;

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Videos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.videos?.map((v: any) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </div>
  );
}

// === Video Card with Comments ===
function VideoCard({ video }: { video: any }) {
  const queryClient = useQueryClient();
  const [showComments, setShowComments] = useState(false);

  // Fetch comments for this video
  const { data: commentsData } = useQuery(
    ["comments", video.id],
    () => http.get(`/api/posts/${video.id}/comments`).then((res) => res.data),
    { enabled: showComments }
  );

  // Delete comment mutation
  const deleteComment = useMutation(
    (commentId: string) =>
      http.delete(`/api/posts/${video.id}/comments/${commentId}`),
    { onSuccess: () => queryClient.invalidateQueries(["comments", video.id]) }
  );

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 12,
        background: "#fafafa",
      }}
    >
      {/* Video player */}
      <video
        controls
        src={video.video.url}
        style={{ width: "100%", borderRadius: 8 }}
      />

      {/* Metadata */}
      <p style={{ marginTop: 8, fontSize: 14 }}>
        <strong>ID:</strong> {video.id}
        {video.flagged && <span style={{ color: "red" }}> ⚠️ Flagged</span>}
      </p>
      {video.video?.duration && (
        <p style={{ fontSize: 12, color: "gray" }}>
          Duration: {Math.floor(video.video.duration / 60)}m{" "}
          {Math.floor(video.video.duration % 60)}s
        </p>
      )}

      {/* Analytics */}
      <div style={{ marginTop: 8, fontSize: 13 }}>
        <p>👀 Views: {video.videoViews || 0}</p>
        <p>⏱️ Watch Time: {video.watchTime || 0} seconds</p>
        <p>✅ Completions: {video.completions || 0}</p>
      </div>

      {/* Moderation actions */}
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        {!video.flagged ? (
          <button
            onClick={() => http.post(`/api/admin/videos/${video.id}/flag`)}
            style={{
              background: "#fdd",
              padding: "4px 8px",
              borderRadius: 4,
            }}
          >
            Flag
          </button>
        ) : (
          <button
            onClick={() => http.post(`/api/admin/videos/${video.id}/unflag`)}
            style={{
              background: "#dfd",
              padding: "4px 8px",
              borderRadius: 4,
            }}
          >
            Unflag
          </button>
        )}
        <button
          onClick={() => http.delete(`/api/admin/videos/${video.id}`)}
          style={{
            background: "#f88",
            padding: "4px 8px",
            borderRadius: 4,
            color: "#fff",
          }}
        >
          Delete
        </button>
      </div>

      {/* Comments moderation */}
      <div style={{ marginTop: 12 }}>
        <button
          onClick={() => setShowComments((prev) => !prev)}
          style={{ padding: "4px 8px", borderRadius: 4 }}
        >
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>

        {showComments && (
          <div style={{ marginTop: 8 }}>
            <h4>Comments</h4>
            {commentsData?.comments?.length === 0 && (
              <p style={{ fontSize: 12, color: "gray" }}>No comments yet.</p>
            )}
            <ul>
              {commentsData?.comments?.map((c: any) => (
                <li
                  key={c.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <span>
                    <strong>{c.author}</strong>: {c.text}
                  </span>
                  <button
                    onClick={() => deleteComment.mutate(c.id)}
                    style={{
                      background: "#f88",
                      color: "#fff",
                      padding: "2px 6px",
                      borderRadius: 4,
                      fontSize: 12,
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
