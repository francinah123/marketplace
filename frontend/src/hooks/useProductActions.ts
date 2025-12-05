import { useState, useEffect } from "react";
import { http } from "../services/http";
import { Product } from "../features/product/types";

export function useProductActions(endpoint: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  async function refreshProducts() {
    setLoading(true);
    try {
      const res = await http.get<{ products: Product[] }>(endpoint, {
        params: { page, status: statusFilter },
      });
      // ✅ normalize missing fields
      const normalized = res.data.products.map((p) => ({
        ...p,
        images: p.images ?? [],
        category: p.category ?? "",
      }));
      setProducts(normalized);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshProducts();
  }, [page, statusFilter]);

  return {
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
  };
}
