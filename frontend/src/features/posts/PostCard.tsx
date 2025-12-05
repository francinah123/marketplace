import React from "react";
import DonationModal from "./DonationModal";
import { useDonation } from "./useDonation"; // keep your hook separate if you prefer

type Post = {
  id: string;
  author: string;
  content?: string;
  caption?: string;
  imageUrls?: string[];
  video?: {
    url: string;
    thumbnail?: string;
    duration?: number;
    encodingStatus?: "pending" | "ready" | "failed";
  };
  likes: number;
  dislikes: number;
  donation?: {
    enabled: boolean;
    targetAmount?: number;
    raisedAmount?: number;
    currency?: string;
    status?: "PENDING" | "APPROVED" | "DECLINED";
  };
  product?: {
    name: string;
    description?: string;
    price: number;
    currency?: string;
    category?: string;
    imageUrl?: string;
    stock?: number;
    status?: "AVAILABLE" | "SOLD_OUT";
  };
  createdAt?: Date;
};

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const { openDonationModal, DonationUI } = useDonation();

  return (
    <div className="rounded-lg border bg-white p-4 shadow mb-4">
      {/* Author */}
      <h4 className="font-semibold text-gray-800">{post.author}</h4>
      <p className="text-sm text-gray-500">
        {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
      </p>

      {/* Text content */}
      {post.content && (
        <p className="mt-2 text-gray-700 whitespace-pre-line">{post.content}</p>
      )}

      {/* Caption */}
      {post.caption && (
        <p className="mt-1 text-gray-600 italic">{post.caption}</p>
      )}

      {/* Images */}
      {post.imageUrls && post.imageUrls.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {post.imageUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Post image ${i + 1}`}
              className="rounded object-cover w-full h-48"
            />
          ))}
        </div>
      )}

      {/* Video */}
      {post.video?.url && (
        <div className="mt-3">
          <video src={post.video.url} controls className="w-full rounded" />
        </div>
      )}

      {/* Product */}
      {post.product && (
        <div className="mt-3 border rounded p-3 bg-gray-50">
          <h5 className="font-bold text-gray-800">{post.product.name}</h5>
          {post.product.imageUrl && (
            <img
              src={post.product.imageUrl}
              alt={post.product.name}
              className="mt-2 h-40 w-full object-cover rounded"
            />
          )}
          <p className="mt-1 text-gray-700">{post.product.description}</p>
          <p className="mt-1 font-semibold text-green-600">
            {post.product.price} {post.product.currency || "ZAR"}
          </p>
          <p className="text-sm text-gray-500">
            {post.product.status === "AVAILABLE" ? "In stock" : "Sold out"}
          </p>
          <button className="mt-2 w-full bg-green-600 text-white py-1 rounded hover:bg-green-700">
            Buy Now
          </button>
        </div>
      )}

      {/* Donation */}
      {post.donation?.enabled && (
        <div className="mt-3 border rounded p-3 bg-pink-50">
          <h5 className="font-bold text-pink-700">Donation</h5>
          <p className="text-gray-700">
            Target: {post.donation.targetAmount} {post.donation.currency}
          </p>
          <p className="text-gray-700">
            Raised: {post.donation.raisedAmount || 0} {post.donation.currency}
          </p>
          <p className="text-sm text-gray-500">Status: {post.donation.status}</p>
          <button
            onClick={() => openDonationModal(post.id)}
            className="mt-2 w-full bg-pink-600 text-white py-1 rounded hover:bg-pink-700"
          >
            Donate
          </button>
          {/* Donation modal UI */}
          <DonationUI />
        </div>
      )}

      {/* Engagement */}
      <div className="mt-3 flex gap-4 text-gray-600">
        <button className="flex items-center gap-1 hover:text-blue-600">
          👍 {post.likes}
        </button>
        <button className="flex items-center gap-1 hover:text-red-600">
          👎 {post.dislikes}
        </button>
        <button className="hover:text-gray-800">🔁 Repost</button>
        <button className="hover:text-gray-800">📤 Share</button>
      </div>
    </div>
  );
}
