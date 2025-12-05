import { useState } from "react";
import { http } from "../services/http";

type ProductFormProps = {
  initialData?: {
    id?: string;
    name: string;
    description: string;
    price: number;
    inventory: number;
    category: string;
    status: "draft" | "active" | "archived";
  };
  onSuccess: () => void; // callback after save
};

export default function ProductForm({ initialData, onSuccess }: ProductFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      description: "",
      price: 0,
      inventory: 0,
      category: "",
      status: "draft" as "draft" | "active" | "archived",
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (formData.id) {
        // ✅ Update existing product
        await http.put(`/products/${formData.id}`, formData);
      } else {
        // ✅ Create new product
        await http.post("/products", formData);
      }
      onSuccess();
    } catch (err) {
      console.error("Failed to save product", err);
      setError("Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded border p-6 shadow">
      <h3 className="text-xl font-semibold">
        {formData.id ? "✏️ Edit Product" : "➕ Add New Product"}
      </h3>

      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label className="block font-medium">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded border px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full rounded border px-3 py-2"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Inventory</label>
          <input
            type="number"
            value={formData.inventory}
            onChange={(e) => setFormData({ ...formData, inventory: Number(e.target.value) })}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>
      </div>

      <div>
        <label className="block font-medium">Category</label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium">Status</label>
        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value as "draft" | "active" | "archived" })
          }
          className="w-full rounded border px-3 py-2"
        >
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : formData.id ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
}
