import React from "react";
import { Product } from "../features/product/types"; // ✅ unified type

type Props = {
  product: Product;
  onClick?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export default function ProductCard({
  product,
  onClick,
  actionLabel,
  onAction,
  className = "",
}: Props) {
  const { name, description, price, images, sellerName } = product;
  const imageUrl = images?.[0] ?? "/fallback.jpg";

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1 text-yellow-500 text-xs">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i < rating ? "★" : "☆"}</span>
        ))}
      </div>
    );
  };

  return (
    <div
      className={[
        "bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden",
        "border border-gray-100 group cursor-pointer",
        className,
      ].join(" ")}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => onClick && (e.key === "Enter" || e.key === " ") && onClick()}
    >
      {/* Product image */}
      <div className="relative aspect-square bg-gray-100">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {sellerName && (
          <span className="absolute top-2 left-2 bg-white/80 text-xs px-2 py-1 rounded shadow">
            {sellerName}
          </span>
        )}
      </div>

      {/* Product info */}
      <div className="p-4 space-y-2">
        <h4 className="text-base md:text-lg font-semibold text-gray-900 line-clamp-1">
          {name}
        </h4>

        {description && (
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        )}

        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-bold text-primary">R{price}</span>
          {renderStars(product.rating)}
        </div>

        {actionLabel && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAction?.();
            }}
            className="mt-3 w-full inline-flex items-center justify-center rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
