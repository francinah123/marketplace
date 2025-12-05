import CategoryFilter from "./CategoryFilter";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";
import SellerDropdown from "../components/SellerDropdown";

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

export default function MarketplaceHeader({
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
  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm p-4 flex flex-wrap gap-4">
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
  );
}
