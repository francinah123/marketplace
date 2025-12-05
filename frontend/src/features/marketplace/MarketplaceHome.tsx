import { useEffect, useState, useRef, useCallback } from "react";
import ProductGrid from "./ProductGrid";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import { LoadingSpinner, ProductSkeletonGrid } from "../../components";





type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  rating?: number;
  storeName?: string;
  category?: string;
};

export default function MarketplaceHome() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);

  // ✅ Filter state
  const [search, setSearch] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(Infinity);
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [store, setStore] = useState<string | undefined>(undefined);

  // ✅ Pagination & infinite scroll state
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  // ✅ Sorting state
  const [sortBy, setSortBy] = useState<"price" | "rating" | "name">("price");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  // ✅ UI state
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const fetchProducts = useCallback(async () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (min) params.append("min", String(min));
    if (max !== Infinity) params.append("max", String(max));
    if (rating) params.append("rating", String(rating));
    if (store) params.append("store", store);
    params.append("page", String(page));
    params.append("limit", String(limit));
    params.append("sortBy", sortBy);
    params.append("order", order);

    if (page === 1) setLoading(true);
    else setFetchingMore(true);

    try {
      const res = await fetch(`/api/marketplace?${params.toString()}`);
      const data = await res.json();

      setProducts((prev) =>
        page === 1 ? data.products || [] : [...prev, ...(data.products || [])]
      );
      setHasMore(data.products?.length === limit);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  }, [search, min, max, rating, store, page, limit, sortBy, order]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ✅ Infinite scroll sentinel
  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || fetchingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, fetchingMore, hasMore]
  );

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="p-6 space-y-6 relative">
      <h2 className="text-2xl font-bold text-gray-900">Marketplace</h2>

      {/* Sticky bar with filters */}
      <div className="sticky top-0 z-20 bg-white shadow-md p-4">
        {/* Mobile toggle */}
        <div className="flex md:hidden justify-between items-center">
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium"
          >
            {mobileOpen ? "Close Filters" : "Open Filters"}
          </button>
        </div>

        {/* Controls */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out
            ${mobileOpen ? "max-h-screen opacity-100 mt-4" : "max-h-0 opacity-0 md:opacity-100 md:max-h-full md:mt-0"}
            flex-col md:flex-row md:flex md:items-center md:justify-between gap-4`}
        >
          <SearchBar onSearch={setSearch} />
          <Filters
            onFilter={(min, max, rating, store) => {
              setMin(min);
              setMax(max);
              setRating(rating);
              setStore(store);
              setPage(1);
            }}
          />
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as "price" | "rating" | "name");
                setPage(1);
              }}
              className="border rounded p-1 text-sm"
            >
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
            <select
              value={order}
              onChange={(e) => {
                setOrder(e.target.value as "asc" | "desc");
                setPage(1);
              }}
              className="border rounded p-1 text-sm"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product grid or skeleton */}
      {loading ? (
        <ProductSkeletonGrid count={8} show={loading} />
      ) : products.length > 0 ? (
        <ProductGrid
          products={products}
          hasMore={hasMore}
          loadMore={() => setPage((prev) => prev + 1)}
        />
      ) : (
        <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No products found</p>
        </div>
      )}

      {/* Spinner sentinel for infinite scroll */}
      {fetchingMore && <LoadingSpinner />}

      {/* Back to Top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-full shadow-lg transition-opacity"
        >
          ↑ Top
        </button>
      )}
    </div>
  );
}
