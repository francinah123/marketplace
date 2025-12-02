import { useState } from "react";

export default function Filters({ onFilter }: { onFilter: (min: number, max: number) => void }) {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  return (
    <div style={{ marginBottom: 16 }}>
      <input
        type="number"
        placeholder="Min price"
        value={min}
        onChange={(e) => setMin(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <input
        type="number"
        placeholder="Max price"
        value={max}
        onChange={(e) => setMax(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <button onClick={() => onFilter(Number(min) || 0, Number(max) || Infinity)}>
        Apply
      </button>
    </div>
  );
}
