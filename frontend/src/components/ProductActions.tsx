import { useState } from "react";

type ProductActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function ProductActions({ onEdit, onDelete }: ProductActionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="rounded bg-gray-200 px-3 py-1 text-sm font-medium hover:bg-gray-300"
      >
        ⋮
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 rounded border bg-white shadow-lg z-10">
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100"
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
}
