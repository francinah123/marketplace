import { useState } from "react";
import { http } from "../../../services/http";
import toast from "react-hot-toast"; // ✅ Toast integration

type Props = {
  productId: string;
  draft: {
    imageUrls?: string[];
    videoUrls?: string[];
    audioUrls?: string[];
  };
  setDraft: React.Dispatch<React.SetStateAction<any>>;
  onBack: () => void;
  onComplete: () => void;
};

export default function MediaStep({ productId, draft, setDraft, onBack, onComplete }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleUpload(type: "images" | "videos" | "audios", files: FileList | null) {
    if (!files || files.length === 0) return;

    setLoading(true);
    const formData = new FormData();

    if (type === "images") {
      Array.from(files).forEach((file) => formData.append("images", file));
    } else if (type === "videos") {
      formData.append("video", files[0]);
    } else if (type === "audios") {
      formData.append("audio", files[0]);
    }

    try {
      const res = await http.post(`/products/upload/${type}/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const updatedProduct = res.data.product;

      // Update draft state
      setDraft({
        ...draft,
        imageUrls: updatedProduct.images,
        videoUrls: updatedProduct.videos,
        audioUrls: updatedProduct.audios
      });

      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully!`); // ✅ Success toast
    } catch (err: any) {
      toast.error(err.response?.data?.error || `Failed to upload ${type}`); // ✅ Error toast
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Upload Media</h3>

      <label className="block text-sm font-medium">Images</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleUpload("images", e.target.files)}
        className="mb-3 w-full rounded border px-3 py-2"
      />

      <label className="block text-sm font-medium">Video</label>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => handleUpload("videos", e.target.files)}
        className="mb-3 w-full rounded border px-3 py-2"
      />

      <label className="block text-sm font-medium">Audio</label>
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => handleUpload("audios", e.target.files)}
        className="mb-3 w-full rounded border px-3 py-2"
      />

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="rounded bg-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={onComplete}
          disabled={loading}
          className={`rounded px-4 py-2 text-sm font-medium text-white ${
            loading ? "bg-gray-400" : "bg-primary hover:bg-indigo-700"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
