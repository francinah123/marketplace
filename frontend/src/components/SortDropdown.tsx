type Props = {
  sortOption: string;
  onChange: (option: string) => void;
};

export default function SortDropdown({ sortOption, onChange }: Props) {
  return (
    <div className="mb-6">
      <label className="mr-2 font-medium">Sort by:</label>
      <select
        value={sortOption}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border px-3 py-2"
      >
        <option value="newest">Newest</option>
        <option value="priceLowHigh">Price: Low to High</option>
        <option value="priceHighLow">Price: High to Low</option>
        <option value="inventoryHighLow">Inventory: High to Low</option>
        <option value="inventoryLowHigh">Inventory: Low to High</option>
      </select>
    </div>
  );
}
