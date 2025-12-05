import { useState } from "react";
import DetailsStep from "./steps/DetailsStep";
import PricingStep from "./steps/PricingStep";
import InventoryStep from "./steps/InventoryStep";
import ShippingStep from "./steps/ShippingStep";
import MediaStep from "../product/media/MediaStep";
import PublishStep from "./steps/PublishStep";

type Step = "details" | "pricing" | "inventory" | "shipping" | "media" | "publish";

type ProductDraft = {
  title: string;
  description: string;
  price: number;
  inventory: number;
  imageUrls?: string[];
  videoUrls?: string[];
  audioUrls?: string[];
};

export default function SellWizard() {
  const [step, setStep] = useState<Step>("details");
  const [draft, setDraft] = useState<ProductDraft>({
    title: "",
    description: "",
    price: 0,
    inventory: 0
  });
  const [productId, setProductId] = useState<string | null>(null);

  const stepOrder: Step[] = ["details", "pricing", "inventory", "shipping", "media", "publish"];

  function nextStep(current: Step) {
    const idx = stepOrder.indexOf(current);
    if (idx >= 0 && idx < stepOrder.length - 1) {
      setStep(stepOrder[idx + 1]);
    }
  }

  function prevStep(current: Step) {
    const idx = stepOrder.indexOf(current);
    if (idx > 0) {
      setStep(stepOrder[idx - 1]);
    }
  }

  async function handleSubmit() {
    const res = await fetch("/api/sell/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft)
    });
    const data = await res.json();
    alert(`Product created with ID: ${data.product.id}`);
  }

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-card">
      <h2 className="mb-6 text-2xl font-bold">Create a Product Listing</h2>

      {step === "details" && (
        <DetailsStep
          draft={draft}
          setDraft={setDraft}
          onComplete={(newProductId) => {
            setProductId(newProductId);
            nextStep("details");
          }}
        />
      )}

      {step === "pricing" && (
        <PricingStep
          draft={draft}
          setDraft={setDraft}
          onBack={() => prevStep("pricing")}
          onComplete={() => nextStep("pricing")}
        />
      )}

      {step === "inventory" && (
        <InventoryStep
          draft={draft}
          setDraft={setDraft}
          onBack={() => prevStep("inventory")}
          onComplete={() => nextStep("inventory")}
        />
      )}

      {step === "shipping" && (
        <ShippingStep
          draft={draft}
          setDraft={setDraft}
          onBack={() => prevStep("shipping")}
          onComplete={() => nextStep("shipping")}
        />
      )}

      {step === "media" && productId && (
        <MediaStep productId={productId} />
      )}

      {step === "publish" && (
        <PublishStep
          draft={draft}
          onBack={() => prevStep("publish")}
          onSubmit={handleSubmit}
        />
      )}

      {/* Navigation controls */}
      <div className="mt-6 flex justify-between">
        {step !== "details" && (
          <button
            onClick={() => prevStep(step)}
            className="rounded bg-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-400"
          >
            Back
          </button>
        )}
        {step !== "publish" && (
          <button
            onClick={() => nextStep(step)}
            className="rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
type AlertProps = {
  type: "success" | "error";
  message: string;
};

export function Alert({ type, message }: AlertProps) {
  return (
    <div
      className={`mb-3 rounded px-4 py-2 text-sm ${
        type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {message}
    </div>
  );
}

