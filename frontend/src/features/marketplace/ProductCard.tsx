import { Link } from "react-router-dom";

type ProductCardProps = {
  id: string;
  title: string;
  description?: string;
  price: number;
  currency?: string; // default "R"
  imageUrl?: string;
  rating?: number;
  storeName?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function ProductCard({
  id,
  title,
  description,
  price,
  currency = "R",
  imageUrl,
  rating,
  storeName,
  actionLabel,
  onAction,
}: ProductCardProps) {
  return (
    <Link
      to={`/product/${id}`}
      className="block no-underline text-inherit"
    >
      <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
        <img
          src={imageUrl || "/images/placeholder.png"}
          alt={title}
          className="w-full rounded-md mb-3 object-cover aspect-video"
          loading="lazy"
        />
        <div className="font-semibold text-gray-900">{title}</div>
        {description && (
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        )}
        <div className="mt-1 text-primary font-bold">
          {currency} {price.toFixed(2)}
        </div>
        {rating !== undefined && (
          <div className="text-sm text-yellow-500">Rating: {rating}/5</div>
        )}
        {storeName && (
          <div className="text-xs text-gray-500 mt-1">{storeName}</div>
        )}
        {actionLabel && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onAction?.();
            }}
            className="mt-3 w-full rounded bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-3 py-2 transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </Link>
  );
}
