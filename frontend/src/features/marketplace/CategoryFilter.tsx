type Props = {
  categories: string[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
};

export default function CategoryFilter({ categories, selectedCategory, onSelect }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onSelect(null)}
        className={`px-3 py-1 rounded ${selectedCategory === null ? "bg-primary text-white" : "bg-gray-200"}`}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={`px-3 py-1 rounded ${selectedCategory === c ? "bg-primary text-white" : "bg-gray-200"}`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
