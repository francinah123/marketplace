import { useEffect, useState } from "react";
import { http } from "../services/http";
import SellerLayout from "../components/SellerLayout";
import SellerCard from "../components/SellerCard";
import SellerProductsGrid from "../components/SellerProductsGrid";
import ProductForm from "../components/ProductForm";
import ProductEditModal from "../components/ProductEditModal";
import ProductDeleteModal from "../components/ProductDeleteModal";
import ProductActions from "../components/ProductActions";
import { useProductActions } from "../hooks/useProductActions"; // ✅ shared hook

type Seller = {
  id: string;
  name: string;
  bio: string;
  avatarUrl?: string;
};

type User = {
  id: string;
  role: "admin" | "seller";
};

export default function SellerDashboard() {
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
  } = useProductActions("/me/products"); // ✅ unified product logic

  const [seller, setSeller] = useState<Seller | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const sellerRes = await http.get("/me/seller");
        setSeller(sellerRes.data.seller);

        const userRes = await http.get("/me");
        setUser(userRes.data.user);

        await refreshProducts();
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-center">Loading dashboard...</p>;
  if (!seller) return <p className="text-center text-red-600">Seller not found.</p>;

  return (
    <SellerLayout
      title="📊 Seller Dashboard"
      sidebar={
        <SellerCard
          id={seller.id}
          name={seller.name}
          bio={seller.bio}
          avatarUrl={seller.avatarUrl}
          showLink={false}
        />
      }
    >
      {/* Stats Section */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded border p-4 bg-gray-50 text-center">
          <h4 className="text-lg font-semibold">Total Products</h4>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <div className="rounded border p-4 bg-gray-50 text-center">
          <h4 className="text-lg font-semibold">Active Listings</h4>
          <p className="text-2xl font-bold">
            {products.filter((p) => p.status === "active").length}
          </p>
        </div>
        <div className="rounded border p-4 bg-gray-50 text-center">
          <h4 className="text-lg font-semibold">Drafts</h4>
          <p className="text-2xl font-bold">
            {products.filter((p) => p.status === "draft").length}
          </p>
        </div>
      </div>

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

      {/* Product Management Section */}
      <h3 className="mb-4 text-xl font-semibold">Your Products</h3>
      <SellerProductsGrid
        products={products.map((p) => ({
          ...p,
          actions:
            user?.role === "seller" ? (
              <ProductActions
                onEdit={() => setEditingProduct(p)}
                onDelete={() => setDeletingProduct(p)}
              />
            ) : null,
        }))}
      />

      {/* Edit Modal */}
      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={refreshProducts}
        />
      )}

      {/* Delete Modal */}
      {deletingProduct && (
        <ProductDeleteModal
          productId={deletingProduct.id}
          productName={deletingProduct.name}
          onClose={() => setDeletingProduct(null)}
          onSuccess={refreshProducts}
        />
      )}

      {/* Add Product Form (only for sellers) */}
      {user?.role === "seller" && (
        <div className="mt-6">
          <ProductForm onSuccess={refreshProducts} />
        </div>
      )}
    </SellerLayout>
  );
}
