type ProductDeleteModalProps = {
  productId: string;
  productName: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ProductDeleteModal({
  productId,
  productName,
  onClose,
  onSuccess,
}: ProductDeleteModalProps) {
  async function handleDelete() {
    try {
      await fetch(`/products/${productId}`, { method: "DELETE" });
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">🗑️ Delete Product</h2>
        <p className="mb-6">
          Are you sure you want to delete <strong>{productName}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
