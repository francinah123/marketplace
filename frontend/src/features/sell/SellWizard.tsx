import { useState } from "react";

type ProductDraft = {
  title: string;
  description: string;
  price: number;
  inventory: number;
  imageUrl?: string;
};

export default function SellWizard() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<ProductDraft>({
    title: "",
    description: "",
    price: 0,
    inventory: 0
  });

  const handleSubmit = async () => {
    const res = await fetch("/api/sell/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft)
    });
    const data = await res.json();
    alert(`Product created with ID: ${data.product.id}`);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Sell a Product</h2>
      {step === 1 && (
        <div>
          <label>Title</label>
          <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          <label>Description</label>
          <textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          <button onClick={() => setStep(2)}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <label>Price</label>
          <input type="number" value={draft.price} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} />
          <label>Inventory</label>
          <input type="number" value={draft.inventory} onChange={(e) => setDraft({ ...draft, inventory: Number(e.target.value) })} />
          <button onClick={() => setStep(3)}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <label>Image URL</label>
          <input value={draft.imageUrl || ""} onChange={(e) => setDraft({ ...draft, imageUrl: e.target.value })} />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}
