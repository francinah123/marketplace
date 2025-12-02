import { useEffect, useState } from "react";

type Product = {
  id: string;
  title: string;
  price: number;
  inventory: number;
};

export default function StoreDashboard() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/store/mystore")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => setProducts([]));
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>My Store</h2>
      {products.length === 0 ? (
        <div>No products yet</div>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              {p.title} — R {p.price.toFixed(2)} (Inventory: {p.inventory})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
