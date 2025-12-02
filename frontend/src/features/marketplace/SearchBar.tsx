import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (term: string) => void }) {
  const [term, setTerm] = useState("");

  return (
    <div style={{ marginBottom: 16 }}>
      <input
        type="text"
        placeholder="Search products..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        style={{ padding: 8, width: "60%" }}
      />
      <button onClick={() => onSearch(term)} style={{ marginLeft: 8 }}>
        Search
      </button>
    </div>
  );
}
