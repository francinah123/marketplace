type Props = {
  productId: string;
  onFinish: () => void;
};

export default function PublishSuccess({ productId, onFinish }: Props) {
  return (
    <div className="text-center">
      <h2 className="mb-4 text-2xl font-bold text-green-600">
        🎉 Your product is live!
      </h2>
      <p className="mb-6 text-gray-700">
        Buyers can now view and purchase your product. You can manage it anytime in your dashboard.
      </p>

      <div className="flex justify-center gap-4">
        <a
          href={`/products/${productId}`}
          className="rounded bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          View Product
        </a>
        <button
          onClick={onFinish}
          className="rounded bg-gray-300 px-5 py-2 text-sm font-medium hover:bg-gray-400"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
