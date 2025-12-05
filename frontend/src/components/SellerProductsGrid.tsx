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
  category: string;
  sellerId: string;
  sellerName: string;
  actions?: React.ReactNode; // ✅ optional actions (Edit/Delete dropdown)
};

type Props = {
  products: Product[];
};

export default function SellerProductsGrid({ products }: Props) {
  if (!products.length) {
    return <p className="text-center text-gray-500">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <div key={p.id} className="relative border rounded shadow-sm p-2">
          {/* Product Card */}
          <ProductCard product={p} />

          {/* Actions dropdown in top-right corner */}
          {p.actions && (
            <div className="absolute top-2 right-2">
              {p.actions}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
