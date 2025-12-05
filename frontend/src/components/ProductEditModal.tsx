import { useState } from "react";
import ProductForm from "./ProductForm";

type ProductEditModalProps = {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    inventory: number;
    category: string;
    status: "draft" | "active" | "archived";
  };
  onClose: () => void;
  onSuccess: () => void;
};

export default function ProductEditModal({ product, onClose, onSuccess }: ProductEditModalProps) {
  const [open, setOpen] = useState(true);

  function handleClose() {
    setOpen(false);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded bg-white p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">✏️ Edit Product</h2>
          <button onClick={handleClose} className="text-gray-600 hover:text-black">✖</button>
        </div>

        <ProductForm
          initialData={product}
          onSuccess={() => {
            onSuccess();
            handleClose();
          }}
        />
      </div>
    </div>
  );
}
