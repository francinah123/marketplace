type Props = {
  categories: string[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
};

export default function CategoryFilter({ categories, selectedCategory, onSelect }: Props) {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {/* "All" option */}
      <button
        onClick={() => onSelect(null)}
        className={`rounded px-4 py-2 text-sm font-medium ${
          selectedCategory === null
            ? "bg-primary text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        All
      </button>

      {/* Category buttons */}
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`rounded px-4 py-2 text-sm font-medium ${
            selectedCategory === cat
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
