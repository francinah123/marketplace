import { useState } from "react";
import { http } from "../../services/http";

export default function PostVideosComposer() {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState<number>(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  async function handleSubmit() {
    if (!file) return;
    const formData = new FormData();
    formData.append("video", file);
    formData.append("author", "CurrentUser");
    formData.append("caption", caption);

    const { data } = await http.post("/posts/create/videos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        if (e.total) setProgress(Math.round((e.loaded * 100) / e.total));
      }
    });

    setVideoUrl(data.post.videoUrl);
    setFile(null);
    setCaption("");
    setProgress(0);
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-card">
      <h3 className="mb-3 text-lg font-semibold">Post Video</h3>
      <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <input
        type="text"
        placeholder="Add a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="mb-3 w-full rounded border px-3 py-2"
      />
      {progress > 0 && <div className="mb-3 h-2 w-full bg-gray-200"><div className="h-2 bg-primary" style={{ width: `${progress}%` }} /></div>}
      <button onClick={handleSubmit} className="w-full rounded bg-primary px-4 py-2 text-white">Upload</button>
      {videoUrl && <video src={videoUrl} controls className="mt-3 w-full rounded" />}
    </div>
  );
}
