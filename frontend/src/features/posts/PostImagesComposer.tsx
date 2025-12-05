import { useState } from "react";
import { http } from "../../services/http";

export default function PostImagesComposer() {
  const [files, setFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState<number>(0);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    setFiles((prev) => [...prev, ...droppedFiles]);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter((f) =>
        f.type.startsWith("image/")
      );
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  }

  async function handleSubmit() {
    if (files.length === 0) {
      setError("Please select at least one image.");
      return;
    }

    setError(null);
    const formData = new FormData();
    files.forEach((f) => formData.append("images", f));
    formData.append("author", "CurrentUser"); // TODO: replace with auth context
    if (caption) formData.append("caption", caption);

    try {
      const { data } = await http.post("/posts/create/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded * 100) / e.total));
        },
      });

      setUploadedUrls(data.post.imageUrls || []);
      setFiles([]);
      setCaption("");
      setProgress(0);
    } catch (err: any) {
      setError(err.message || "Upload failed. Please try again.");
    }
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-card">
      <h3 className="mb-3 text-lg font-semibold">Post Images</h3>

      {/* Drag & drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="mb-3 flex h-32 items-center justify-center rounded border-2 border-dashed border-gray-300 cursor-pointer"
      >
        <p className="text-gray-500">Drag & drop images here</p>
      </div>

      {/* File input fallback */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="mb-3"
      />

      {/* Preview selected files */}
      {files.length > 0 && (
        <div className="mb-3 grid grid-cols-3 gap-2">
          {files.map((f, i) => (
            <img
              key={i}
              src={URL.createObjectURL(f)}
              alt={f.name}
              className="h-24 w-full rounded object-cover"
            />
          ))}
        </div>
      )}

      {/* Caption */}
      <input
        type="text"
        placeholder="Add a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="mb-3 w-full rounded border px-3 py-2"
      />

      {/* Progress bar */}
      {progress > 0 && (
        <div className="mb-3 h-2 w-full rounded bg-gray-200">
          <div
            className="h-2 rounded bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Error message */}
      {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="w-full rounded bg-primary px-4 py-2 text-white hover:bg-indigo-700"
      >
        Upload
      </button>

      {/* Uploaded preview */}
      {uploadedUrls.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {uploadedUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt="Uploaded"
              className="h-24 w-full rounded object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}
