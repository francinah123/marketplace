import { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";
import SearchBar from "./SearchBar";
import Filters from "./Filters";

type Product = {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
  rating?: number;
  storeName?: string;
};

export default function MarketplaceHome() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(Infinity);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (min) params.append("min", String(min));
    if (max !== Infinity) params.append("max", String(max));

    fetch(`/api/marketplace?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [search, min, max]);

  if (loading) return <div>Loading marketplace...</div>;
  return (
    <div style={{ padding: 16 }}>
      <h2>Marketplace</h2>
      <SearchBar onSearch={setSearch} />
      <Filters onFilter={(min, max) => { setMin(min); setMax(max); }} />
      <ProductGrid products={products} />
    </div>
  );
}
