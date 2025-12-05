type Props = {
  sellers: { id: string; name: string }[];
  selectedSellerId: string | null;
  onSelect: (sellerId: string | null) => void;
};

export default function SellerDropdown({ sellers, selectedSellerId, onSelect }: Props) {
  return (
    <div className="mb-6">
      <label className="mr-2 font-medium">Filter by Seller:</label>
      <select
        value={selectedSellerId || ""}
        onChange={(e) => onSelect(e.target.value || null)}
        className="rounded border px-3 py-2"
      >
        <option value="">All Sellers</option>
        {sellers.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
    </div>
  );
}
