import { useState } from "react";

type ProductForm = {
  name: string;
  description?: string;
  price: number;
  currency?: string;
  category?: string;
  image?: File;
};

type DonationForm = {
  targetAmount: number;
  currency: string;
};

interface Props {
  onPostCreated: () => void;
}

export default function PostCreate({ onPostCreated }: Props) {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [product, setProduct] = useState<ProductForm | null>(null);
  const [donation, setDonation] = useState<DonationForm | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files).filter((f) =>
        f.type.startsWith("image/")
      );
      setImages((prev) => [...prev, ...selected]);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("video/")) {
        setVideoFile(file);
      } else {
        setError("Only video files are allowed.");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("author", "Francinah"); // TODO: replace with auth context

      if (content) formData.append("content", content);
      images.forEach((img) => formData.append("images", img));
      if (videoFile) formData.append("video", videoFile);

      if (product) {
        formData.append("name", product.name);
        if (product.description) formData.append("description", product.description);
        formData.append("price", product.price.toString());
        if (product.currency) formData.append("currency", product.currency);
        if (product.category) formData.append("category", product.category);
        if (product.image) formData.append("image", product.image);
      }

      if (donation) {
        formData.append("targetAmount", donation.targetAmount.toString());
        formData.append("currency", donation.currency);
      }

      await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      // Reset state
      setContent("");
      setImages([]);
      setVideoFile(null);
      setProduct(null);
      setDonation(null);
      setError(null);

      onPostCreated();
    } catch (err: any) {
      setError(err.message || "Failed to create post.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 space-y-4">
      <h3 className="text-lg font-semibold">Create a Post</h3>

      {/* Textarea for post content */}
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-24 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />

      {/* Image upload */}
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {images.map((f, i) => (
            <img
              key={i}
              src={URL.createObjectURL(f)}
              alt={f.name}
              className="h-24 w-full rounded object-cover"
            />
          ))}
        </div>
      )}

      {/* Video upload */}
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-indigo-50 file:text-indigo-700
                   hover:file:bg-indigo-100"
      />
      {videoFile && (
        <video
          src={URL.createObjectURL(videoFile)}
          controls
          className="w-full rounded mt-2"
        />
      )}

      {/* Product post */}
      <div>
        <button
          type="button"
          onClick={() =>
            setProduct({
              name: "",
              description: "",
              price: 0,
              currency: "ZAR",
            })
          }
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add Product
        </button>

        {product && (
          <div className="mt-2 space-y-2">
            <input
              type="text"
              placeholder="Product name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="w-full border rounded p-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className="w-full border rounded p-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: Number(e.target.value) })
              }
              className="w-full border rounded p-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setProduct({ ...product, image: e.target.files?.[0] || undefined })
              }
            />
          </div>
        )}
      </div>

      {/* Donation post */}
      <div>
        <button
          type="button"
          onClick={() =>
            setDonation({
              targetAmount: 100,
              currency: "ZAR",
            })
          }
          className="bg-pink-500 text-white px-3 py-1 rounded"
        >
          Add Donation
        </button>

        {donation && (
          <div className="mt-2 space-y-2">
            <input
              type="number"
              placeholder="Target amount"
              value={donation.targetAmount}
              onChange={(e) =>
                setDonation({ ...donation, targetAmount: Number(e.target.value) })
              }
              className="w-full border rounded p-2"
            />
            <input
              type="text"
              placeholder="Currency"
              value={donation.currency}
              onChange={(e) =>
                setDonation({ ...donation, currency: e.target.value })
              }
              className="w-full border rounded p-2"
            />
          </div>
        )}
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors w-full"
      >
        Post
      </button>
    </div>
  );
}

