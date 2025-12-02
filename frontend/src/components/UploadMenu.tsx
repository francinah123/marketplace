export type UploadAction =
  | "text" | "images" | "videos" | "audios" | "link"
  | "filteredImage" | "giphy" | "location" | "watermark" | "product";

const items: { key: UploadAction; label: string; color: string }[] = [
  { key: "text", label: "Post Text", color: "bg-black text-white" },
  { key: "images", label: "Post Images", color: "bg-red-600 text-white" },
  { key: "videos", label: "Post Videos", color: "bg-gray-700 text-white" },
  { key: "audios", label: "Post Audios", color: "bg-purple-600 text-white" },
  { key: "link", label: "Post Link", color: "bg-green-600 text-white" },
  { key: "filteredImage", label: "Post Filtered Image", color: "bg-black text-white" },
  { key: "giphy", label: "Post Giphy", color: "bg-purple-500 text-white" },
  { key: "location", label: "Post Location", color: "bg-blue-600 text-white" },
  { key: "watermark", label: "Post Watermark", color: "bg-pink-500 text-white" },
  { key: "product", label: "Post Product (sell)", color: "bg-amber-500 text-white" }
];

export default function UploadMenu({ onSelect }: { onSelect: (action: UploadAction) => void; }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((it) => (
        <button
          key={it.key}
          className={`rounded-lg px-3 py-3 font-medium shadow-card hover:shadow-lg transition ${it.color}`}
          onClick={() => onSelect(it.key)}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
