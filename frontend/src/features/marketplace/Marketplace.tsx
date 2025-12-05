import { useEffect, useState } from "react";
import { http } from "../services/http";
import FiltersPanel from "../features/marketplace/FiltersPanel";
import ProductGrid from "../features/marketplace/ProductGrid";
import { Product } from "../features/product/types";

export default function Marketplace() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);

  async function fetchProducts(pageNum: number, reset = false) {
    try {
      const res = await http.get(
        `/products?page=${pageNum}&limit=9` +
          (selectedCategory ? `&category=${selectedCategory}` : "") +
          (searchQuery ? `&search=${searchQuery}` : "") +
          (sortOption ? `&sort=${sortOption}` : "") +
          (selectedSellerId ? `&sellerId=${selectedSellerId}` : "")
      );

      const normalized: Product[] = res.data.products.map((p: any) => ({
        ...p,
        images: p.images ?? [],
        category: p.category ?? "",
        publishedAt: p.publishedAt ?? null,
        sellerId: p.sellerId ?? "",
        sellerName: p.sellerName ?? "",
      }));

      if (reset) {
        setProducts(normalized);
      } else {
        setProducts((prev) => [...prev, ...normalized]);
      }

      setHasMore(pageNum < res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch marketplace products", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    setPage(1);
    fetchProducts(1, true);
  }, [selectedCategory, searchQuery, sortOption, selectedSellerId]);

  if (loading) return <p className="text-center">Loading marketplace...</p>;

  const categories = Array.from(new Set(products.map((p) => p.category)));
  const sellers = Array.from(
    new Map(products.map((p) => [p.sellerId, p.sellerName])).entries()
  ).map(([id, name]) => ({ id, name }));

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h2 className="mb-6 text-2xl font-bold">🛒 Marketplace</h2>

      {/* ✅ Refined FiltersPanel */}
      <FiltersPanel
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        sortOption={sortOption}
        onSortChange={setSortOption}
        sellers={sellers}
        selectedSellerId={selectedSellerId}
        onSellerSelect={setSelectedSellerId}
      />

      {/* ✅ Animated ProductGrid with infinite scroll */}
      <ProductGrid
        products={products}
        hasMore={hasMore}
        loadMore={() => {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchProducts(nextPage);
        }}
      />
    </div>
  );
}
