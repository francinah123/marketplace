import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
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
  updatedAt?: Date;
}

const PostSchema = new Schema<IPost>(
  {
    author: { type: String, required: true },
    content: { type: String },
    caption: { type: String },
    imageUrls: [{ type: String }],
    video: {
      url: { type: String },
      thumbnail: { type: String },
      duration: { type: Number },
      encodingStatus: {
        type: String,
        enum: ["pending", "ready", "failed"],
      },
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    donation: {
      enabled: { type: Boolean, default: false },
      targetAmount: { type: Number },
      raisedAmount: { type: Number, default: 0 },
      currency: { type: String, default: "ZAR" },
      status: {
        type: String,
        enum: ["PENDING", "APPROVED", "DECLINED"],
        default: "PENDING",
      },
    },
    product: {
      name: { type: String },
      description: { type: String },
      price: { type: Number },
      currency: { type: String, default: "ZAR" },
      category: { type: String },
      imageUrl: { type: String },
      stock: { type: Number, default: 0 },
      status: {
        type: String,
        enum: ["AVAILABLE", "SOLD_OUT"],
        default: "AVAILABLE",
      },
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model<IPost>("Post", PostSchema);
