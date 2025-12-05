import { useState } from "react";
import { http } from "../../../services/http";
import toast from "react-hot-toast";

type Props = {
  productId: string;
  draft: {
    shippingMethod?: string;
    shippingCost?: number;
    shippingRegion?: string;
  };
  setDraft: React.Dispatch<React.SetStateAction<any>>;
  onBack: () => void;
  onComplete: () => void;
};

export default function ShippingStep({ productId, draft, setDraft, onBack, onComplete }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    try {
      await http.patch(`/products/${productId}/shipping`, {
        method: draft.shippingMethod,
        cost: draft.shippingCost,
        region: draft.shippingRegion,
      });
      toast.success("Shipping details saved successfully!");
      onComplete();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to save shipping details");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Set Shipping Details</h3>

      {/* Shipping Method */}
      <label className="block text-sm font-medium mb-1">Shipping Method</label>
      <input
        type="text"
        value={draft.shippingMethod || ""}
        onChange={(e) => setDraft({ ...draft, shippingMethod: e.target.value })}
        className="mb-3 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="e.g. Courier, Pickup"
      />

      {/* Shipping Cost */}
      <label className="block text-sm font-medium mb-1">Shipping Cost</label>
      <input
        type="number"
        value={draft.shippingCost ?? ""}
        onChange={(e) => setDraft({ ...draft, shippingCost: Number(e.target.value) })}
        className="mb-3 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter cost in Rands"
      />

      {/* Shipping Region */}
      <label className="block text-sm font-medium mb-1">Shipping Region</label>
      <input
        type="text"
        value={draft.shippingRegion || ""}
        onChange={(e) => setDraft({ ...draft, shippingRegion: e.target.value })}
        className="mb-6 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="e.g. Gauteng, Nationwide"
      />

      {/* Action buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
