import { useEffect, useState } from "react";
import { http } from "../services/http";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductList";
import ProductTableActions from "../components/ProductTableActions";
import ProductEditModal from "../components/ProductEditModal";
import ProductDeleteModal from "../components/ProductDeleteModal";
import { useProductActions } from "../hooks/useProductActions";
import { Product } from "../features/product/types"; // ✅ unified type

type User = {
  id: string;
  role: "admin" | "seller";
};

export default function Dashboard() {
  const {
    products,
    loading,
    editingProduct,
    setEditingProduct,
    deletingProduct,
    setDeletingProduct,
    refreshProducts,
    page,
    setPage,
    statusFilter,
    setStatusFilter,
  } = useProductActions("/products");

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await http.get("/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    }
    fetchUser();
  }, []);

  if (loading) return <p className="text-center">Loading products...</p>;

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h2 className="mb-6 text-2xl font-bold">📦 My Products</h2>

      {/* Filter & Pagination Controls */}
      <div className="flex justify-between items-center mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded border px-3 py-2"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setPage(Math.max(page - 1, 1))}
            disabled={page === 1}
            className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => setPage(page + 1)}
            className="rounded bg-gray-200 px-3 py-1"
          >
            Next
          </button>
        </div>
      </div>

      {/* List + Grid */}
      <ProductList products={products} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {products.map((p: Product) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Table view */}
      <div className="mt-6">
        <h2 className="mb-6 text-2xl font-bold">📦 My Products</h2>

        {products.length === 0 ? (
          <p className="text-gray-600">No products yet. Start by creating one!</p>
        ) : (
          <table className="w-full border-collapse rounded border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Price</th>
                <th className="border px-4 py-2 text-left">Inventory</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Published At</th>
                {user?.role === "admin" && (
                  <th className="border px-4 py-2 text-left">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {products.map((p: Product) => (
                <tr key={p.id}>
                  <td className="border px-4 py-2">{p.name}</td>
                  <td className="border px-4 py-2">R{p.price}</td>
                  <td className="border px-4 py-2">{p.inventory}</td>
                  <td className="border px-4 py-2">
                    {p.status === "active" ? (
                      <span className="text-green-600">Active</span>
                    ) : (
                      <span className="text-gray-600">{p.status}</span>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {p.publishedAt ? new Date(p.publishedAt).toLocaleString() : "-"}
                  </td>
                  {user?.role === "admin" && (
                    <td className="border px-4 py-2">
                      <ProductTableActions
                        onEdit={() => setEditingProduct(p)}
                        onDelete={() => setDeletingProduct(p)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modals */}
      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={refreshProducts}
        />
      )}
      {deletingProduct && (
        <ProductDeleteModal
          productId={deletingProduct.id}
          productName={deletingProduct.name}
          onClose={() => setDeletingProduct(null)}
          onSuccess={refreshProducts}
        />
      )}
    </div>
  );
}
