import { useState } from "react";
import PublishSuccess from "./PublishSuccess";
import { http } from "../../../services/http";
import toast from "react-hot-toast";

type Props = {
  draft: any;
  productId: string;
  onBack: () => void;
};

export default function PublishStep({ draft, productId, onBack }: Props) {
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(false);

  async function handlePublish() {
    setLoading(true);
    try {
      await http.patch(`/products/${productId}/publish`, {
        ...draft,
        status: "active"
      });
      toast.success("Product published successfully! 🎉");
      setPublished(true); // ✅ Switch to success screen
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to publish product");
    } finally {
      setLoading(false);
    }
  }

  if (published) {
    return (
      <PublishSuccess
        productId={productId}
        onFinish={() => (window.location.href = "/dashboard")}
      />
    );
  }

  return (
    <div>
      {/* ...existing review UI... */}
      <div className="flex justify-between">
        <button onClick={onBack}>Back</button>
        <button onClick={handlePublish} disabled={loading}>
          {loading ? "Publishing..." : "Publish Product"}
        </button>
      </div>
    </div>
  );
}
