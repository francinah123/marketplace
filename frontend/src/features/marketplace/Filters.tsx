import { useState } from "react";

type Props = {
  onFilter: (min: number, max: number, rating?: number, store?: string) => void;
};

export default function Filters({ onFilter }: Props) {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(Infinity);
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [store, setStore] = useState("");

  const applyFilters = () => {
    onFilter(min, max, rating, store || undefined);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4 items-center">
      {/* Price range */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min"
          value={min || ""}
          onChange={(e) => setMin(Number(e.target.value))}
          className="w-20 border rounded p-1 text-sm"
        />
        <span>-</span>
        <input
          type="number"
          placeholder="Max"
          value={max === Infinity ? "" : max}
          onChange={(e) => setMax(Number(e.target.value) || Infinity)}
          className="w-20 border rounded p-1 text-sm"
        />
      </div>

      {/* Rating filter */}
      <select
        value={rating || ""}
        onChange={(e) => setRating(e.target.value ? Number(e.target.value) : undefined)}
        className="border rounded p-1 text-sm"
      >
        <option value="">Any rating</option>
        <option value="5">★★★★★ (5)</option>
        <option value="4">★★★★☆ (4+)</option>
        <option value="3">★★★☆☆ (3+)</option>
        <option value="2">★★☆☆☆ (2+)</option>
        <option value="1">★☆☆☆☆ (1+)</option>
      </select>

      {/* Store filter */}
      <input
        type="text"
        placeholder="Store name"
        value={store}
        onChange={(e) => setStore(e.target.value)}
        className="border rounded p-1 text-sm"
      />

      {/* Apply button */}
      <button
        onClick={applyFilters}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm"
      >
        Apply
      </button>
    </div>
  );
}
