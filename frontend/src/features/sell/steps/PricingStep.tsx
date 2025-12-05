import { useState } from "react";
import { http } from "../../../services/http";
import toast from "react-hot-toast";

type Props = {
  productId: string;
  draft: { price: number };
  setDraft: React.Dispatch<React.SetStateAction<any>>;
  onBack: () => void;
  onComplete: () => void;
};

export default function PricingStep({ productId, draft, setDraft, onBack, onComplete }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSave() {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await http.patch(`/products/${productId}/pricing`, { price: draft.price });
      toast.success("Pricing saved successfully!");
      setSuccess(true);
      onComplete();
    } catch (err: any) {
      const msg = err.response?.data?.error || "Failed to save pricing";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Pricing</h3>

      <label className="block text-sm font-medium">Price</label>
      <input
        type="number"
        value={draft.price}
        onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
        className="mb-3 w-full rounded border px-3 py-2"
      />

      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message="Pricing saved successfully!" />}

      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="rounded px-4 py-2 bg-gray-300 hover:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className={`rounded px-4 py-2 text-white ${
            loading ? "bg-gray-400" : "bg-primary hover:bg-indigo-700"
          }`}
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
}

type AlertProps = {
  type: "success" | "error";
  message: string;
};

export function Alert({ type, message }: AlertProps) {
  return (
    <div
      className={`mb-3 rounded px-4 py-2 text-sm ${
        type === "success"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {message}
    </div>
  );
}
