import { useState } from "react";
import { http } from "../../../services/http";
import toast from "react-hot-toast";

type Props = {
  draft: {
    title: string;
    description: string;
    price: number;
    inventory: number;
  };
  setDraft: React.Dispatch<React.SetStateAction<any>>;
  onComplete: (productId: string) => void;
};

export default function DetailsStep({ draft, setDraft, onComplete }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleCreate() {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data } = await http.post("/products", {
        name: draft.title,
        description: draft.description,
        price: draft.price,
        inventory: draft.inventory,
      });

      setSuccess(true);
      toast.success("Product created successfully!");
      onComplete(data.product.id);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create product");
      toast.error(err.response?.data?.error || "Failed to create product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Product Details</h3>

      <label className="block text-sm font-medium">Title</label>
      <input
        value={draft.title}
        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        className="mb-3 w-full rounded border px-3 py-2"
      />

      <label className="block text-sm font-medium">Description</label>
      <textarea
        value={draft.description}
        onChange={(e) => setDraft({ ...draft, description: e.target.value })}
        className="mb-3 w-full rounded border px-3 py-2"
        rows={4}
      />

      {/* ✅ Inline alerts */}
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message="Product created successfully!" />}

      <button
        onClick={handleCreate}
        disabled={loading}
        className={`w-full rounded px-4 py-2 text-white ${
          loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Creating..." : "Save & Continue"}
      </button>
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
