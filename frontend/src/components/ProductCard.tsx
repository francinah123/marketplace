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
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="rounded border p-4 shadow-sm hover:shadow-md transition">
      {/* Thumbnail */}
      {product.images.length > 0 ? (
        <img
          src={product.images[0]}
          alt={product.name}
          className="mb-3 h-40 w-full rounded object-cover"
        />
      ) : (
        <div className="mb-3 flex h-40 w-full items-center justify-center rounded bg-gray-100 text-gray-500">
          No Image
        </div>
      )}

      {/* Product Info */}
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="mb-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>

      <p className="mb-1">
        <strong>Price:</strong> R{product.price}
      </p>
      <p className="mb-1">
        <strong>Inventory:</strong> {product.inventory}
      </p>
      <p className="mb-2">
        <strong>Status:</strong>{" "}
        {product.status === "active" ? (
          <span className="text-green-600">Active</span>
        ) : (
          <span className="text-gray-600">{product.status}</span>
        )}
      </p>

      {/* Actions */}
      <a
        href={`/products/${product.id}`}
        className="mt-2 inline-block rounded bg-primary px-4 py-2 text-sm text-white hover:bg-indigo-700"
      >
        View Product
      </a>
    </div>
  );
}
