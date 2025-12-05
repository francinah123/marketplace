import { useState } from "react";
import { http } from "../../../services/http";
import toast from "react-hot-toast"; // ✅ Toast integration

type Props = {
  productId: string;
  draft: {
    inventory: number;
  };
  setDraft: React.Dispatch<React.SetStateAction<any>>;
  onBack: () => void;
  onComplete: () => void;
};

export default function InventoryStep({ productId, draft, setDraft, onBack, onComplete }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    try {
      await http.patch(`/products/${productId}/inventory`, {
        inventory: draft.inventory
      });
      toast.success("Inventory saved successfully!"); // ✅ Success toast
      onComplete();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to save inventory"); // ✅ Error toast
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Set Product Inventory</h3>

      <label className="block text-sm font-medium">Stock Quantity</label>
      <input
        type="number"
        value={draft.inventory}
        onChange={(e) => setDraft({ ...draft, inventory: Number(e.target.value) })}
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
          onClick={handleSave}
          disabled={loading}
          className={`rounded px-4 py-2 text-sm font-medium text-white ${
            loading ? "bg-gray-400" : "bg-primary hover:bg-indigo-700"
          }`}
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
}
