import ProductCard from "./ProductCard";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  inventory: number;
  status: "draft" | "active" | "archived";
  publishedAt: string | null;
  images: string[];
};

type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  if (products.length === 0) {
    return (
      <p className="text-center text-gray-600">
        No products yet. Start by creating one!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
