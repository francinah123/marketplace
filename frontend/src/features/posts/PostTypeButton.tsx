import React from "react";

type Variant =
  | "text"
  | "images"
  | "videos"
  | "audios"
  | "link"
  | "filtered"
  | "giphy"
  | "location"
  | "watermark"
  | "product";

type Props = {
  label: string;
  variant: Variant;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const variantClasses: Record<Variant, string> = {
  text: "bg-gray-900 hover:bg-black",
  images: "bg-red-600 hover:bg-red-700",
  videos: "bg-gray-600 hover:bg-gray-700",
  audios: "bg-purple-600 hover:bg-purple-700",
  link: "bg-green-600 hover:bg-green-700",
  filtered: "bg-gray-800 hover:bg-gray-900",
  giphy: "bg-violet-600 hover:bg-violet-700",
  location: "bg-blue-600 hover:bg-blue-700",
  watermark: "bg-pink-500 hover:bg-pink-600",
  product: "bg-orange-500 hover:bg-orange-600",
};

export default function PostTypeButton({
  label,
  variant,
  onClick,
  className = "",
  disabled,
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
  const disabledClasses = disabled ? "opacity-60 cursor-not-allowed" : "";

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={[base, variantClasses[variant], disabledClasses, className].join(" ")}
    >
      {label}
    </button>
  );
}
