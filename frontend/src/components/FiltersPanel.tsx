import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import SortDropdown from "../components/SortDropdown";
import SellerDropdown from "../components/SellerDropdown";
import SearchBar from "../components/SearchBar";

type Props = {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (c: string | null) => void;
  searchQuery: string;
  onSearch: (q: string) => void;
  sortOption: string;
  onSortChange: (s: string) => void;
  sellers: { id: string; name: string }[];
  selectedSellerId: string | null;
  onSellerSelect: (id: string | null) => void;
};

export default function FiltersPanel({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearch,
  sortOption,
  onSortChange,
  sellers,
  selectedSellerId,
  onSellerSelect,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4">
      {/* Toggle button for mobile */}
      <button
        onClick={() => setOpen(!open)}
        className="sm:hidden w-full rounded bg-primary text-white px-4 py-2 font-medium hover:bg-indigo-700"
      >
        {open ? "Close Filters" : "Open Filters"}
      </button>

      {/* Desktop filters */}
      <div className="hidden sm:flex flex-wrap gap-4 bg-white shadow-sm p-4 rounded">
        <SearchBar onSearch={onSearch} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={onSelectCategory}
        />
        <SortDropdown sortOption={sortOption} onChange={onSortChange} />
        <SellerDropdown
          sellers={sellers}
          selectedSellerId={selectedSellerId}
          onSelect={onSellerSelect}
        />
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="sm:hidden mt-4 bg-white shadow-lg rounded p-4 space-y-4">
          <SearchBar onSearch={onSearch} />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={onSelectCategory}
          />
          <SortDropdown sortOption={sortOption} onChange={onSortChange} />
          <SellerDropdown
            sellers={sellers}
            selectedSellerId={selectedSellerId}
            onSelect={onSellerSelect}
          />
        </div>
      )}
    </div>
  );
}
