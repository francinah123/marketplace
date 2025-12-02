import { useState } from "react";

export default function Checkout() {
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/buy/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, payment })
    });
    const data = await res.json();
    alert(`Order confirmed! Order ID: ${data.order.id}`);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Checkout</h2>
      <div>
        <label>Shipping Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ display: "block", marginBottom: 12 }}
        />
      </div>
      <div>
        <label>Payment Method</label>
        <input
          type="text"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          style={{ display: "block", marginBottom: 12 }}
        />
      </div>
      <button onClick={handleSubmit}>Place Order</button>
    </div>
  );
}
