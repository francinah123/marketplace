import ProductCard from "./ProductCard";

type Product = {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
  rating?: number;
  storeName?: string;
};

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  );
}
