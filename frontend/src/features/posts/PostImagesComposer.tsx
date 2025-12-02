import { useState } from "react";
import { http } from "../../services/http";

export default function PostImagesComposer() {
  const [files, setFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState<number>(0);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setFiles([...files, ...Array.from(e.dataTransfer.files)]);
  }

  async function handleSubmit() {
    const formData = new FormData();
    files.forEach((f) => formData.append("images", f));
    formData.append("author", "CurrentUser"); // replace with auth context
    formData.append("caption", caption);

    const { data } = await http.post("/posts/create/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        if (e.total) setProgress(Math.round((e.loaded * 100) / e.total));
      }
    });

    setUploadedUrls(data.post.imageUrls || []);
    setFiles([]);
    setCaption("");
    setProgress(0);
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-card">
      <h3 className="mb-3 text-lg font-semibold">Post Images</h3>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="mb-3 flex h-32 items-center justify-center rounded border-2 border-dashed border-gray-300"
      >
        <p className="text-gray-500">Drag & drop images here</p>
      </div>

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

      <input
        type="text"
        placeholder="Add a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="mb-3 w-full rounded border px-3 py-2"
      />

      {progress > 0 && (
        <div className="mb-3 h-2 w-full rounded bg-gray-200">
          <div
            className="h-2 rounded bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full rounded bg-primary px-4 py-2 text-white hover:bg-indigo-700"
      >
        Upload
      </button>

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
