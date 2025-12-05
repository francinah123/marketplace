import mongoose, { Schema, Document } from "mongoose";
import { config } from "../../config"; // ✅ corrected path

export interface IDonation extends Document {
  postId: string;
  userId: string;
  amount: number;
  currency: string;
  status: "PENDING" | "APPROVED" | "DECLINED";
  createdAt: Date;
}

const DonationSchema = new Schema<IDonation>(
  {
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "ZAR" },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "DECLINED"],
      default: "PENDING",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Donation = mongoose.model<IDonation>("Donation", DonationSchema);

// ✅ Example helper to initiate PayGate transaction
export async function initiateDonation(postId: string, userId: string, amount: number) {
  const donation = await Donation.create({
    postId,
    userId,
    amount,
    currency: "ZAR",
    status: "PENDING",
  });

  const payload = {
    PAYGATE_ID: config.paygateId,
    REFERENCE: `donation-${donation._id}`,
    AMOUNT: amount * 100, // cents
    CURRENCY: "ZAR",
    RETURN_URL: `${config.nodeEnv === "production" ? "https://yourdomain.com" : "http://localhost:5173"}/donation-success?postId=${postId}&amount=${amount}&status=APPROVED`,
    NOTIFY_URL: `${config.nodeEnv === "production" ? "https://yourdomain.com" : "http://localhost:5173"}/donation-failed?postId=${postId}&amount=${amount}&status=DECLINED`,
    TRANSACTION_DATE: new Date().toISOString().slice(0, 19).replace("T", " "),
    LOCALE: "en-za",
  };

  // ✅ Node 18+ has fetch built in
  const response = await fetch("https://secure.paygate.co.za/payweb3/initiate.trans", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(payload as any).toString(),
  });

  const text = await response.text();
  return { donation, response: text };
}
