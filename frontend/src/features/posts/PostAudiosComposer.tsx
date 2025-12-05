import { useState } from "react";
import { http } from "../../services/http";

type User = { isVerified: boolean };

export default function PostAudiosComposer({ user }: { user?: User }) {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!file) return;

    // ✅ Verification check only if user prop is provided
    if (user && !user.isVerified) {
      setError("You must be verified to upload audio.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", file);
    formData.append("author", "CurrentUser"); // replace with auth context
    formData.append("caption", caption);

    try {
      const { data } = await http.post("/posts/create/audios", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded * 100) / e.total));
        }
      });

      setAudioUrl(data.post.audioUrl);
      setFile(null);
      setCaption("");
      setProgress(0);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || "Upload failed");
    }
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-card">
      <h3 className="mb-3 text-lg font-semibold">Post Audio</h3>

      {/* Show warning if user exists but is not verified */}
      {user && !user.isVerified && (
        <p className="mb-3 text-sm text-red-600">
          Only verified users can upload songs.
        </p>
      )}

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <input
        type="text"
        placeholder="Add a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="mb-3 w-full rounded border px-3 py-2"
      />

      {progress > 0 && (
        <div className="mb-3 h-2 w-full bg-gray-200">
          <div
            className="h-2 bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={user ? !user.isVerified : false}
        className={`w-full rounded px-4 py-2 text-white ${
          user && !user.isVerified
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary hover:bg-indigo-700"
        }`}
      >
        Upload
      </button>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {audioUrl && <audio src={audioUrl} controls className="mt-3 w-full" />}
    </div>
  );
}
