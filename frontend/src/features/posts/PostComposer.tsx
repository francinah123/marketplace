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

export default function PostComposer() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [product, setProduct] = useState<ProductForm | null>(null);
  const [donation, setDonation] = useState<DonationForm | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("author", "CurrentUser"); // TODO: replace with auth context

      if (text) formData.append("content", text);
      if (image) formData.append("image", image);
      if (video) formData.append("video", video);

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
      setText("");
      setImage(null);
      setVideo(null);
      setProduct(null);
      setDonation(null);
      setError(null);
      setProgress(0);
    } catch (err: any) {
      setError(err.message || "Failed to create post.");
    }
  };

  return (
    <div className="space-y-4 border p-4 rounded-md bg-white shadow">
      <h3 className="text-lg font-semibold">Create a Post</h3>

      {/* Text post */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full border rounded p-2"
      />

      {/* Image upload */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="preview"
          className="h-24 w-full rounded object-cover mt-2"
        />
      )}

      {/* Video upload */}
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files?.[0] || null)}
      />
      {video && (
        <video
          src={URL.createObjectURL(video)}
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

      {/* Progress */}
      {progress > 0 && (
        <div className="h-2 w-full rounded bg-gray-200">
          <div
            className="h-2 rounded bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Post
      </button>
    </div>
  );
}
