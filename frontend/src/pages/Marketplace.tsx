import { useEffect, useState } from "react";
import { http } from "../services/http";
import MarketplaceHeader from "../features/marketplace/MarketplaceHeader";
import SellerSection from "../features/marketplace/SellerSection";
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

  const grouped = products.reduce((acc: Record<string, Product[]>, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h2 className="mb-6 text-2xl font-bold">🛒 Marketplace</h2>

      <MarketplaceHeader
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

      {selectedCategory === null && !searchQuery && !selectedSellerId ? (
        Object.entries(grouped).map(([category, items]) => (
          <SellerSection key={category} sellerName={category} products={items} />
        ))
      ) : (
        <ProductGrid products={products} />
      )}

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              const nextPage = page + 1;
              setPage(nextPage);
              fetchProducts(nextPage);
            }}
            className="rounded bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
