import { useEffect, useState } from "react";

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/buy/cart")
      .then((res) => res.json())
      .then((data) => setItems(data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading cart...</div>;

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div style={{ padding: 16 }}>
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <div>Cart is empty</div>
      ) : (
        <ul>
          {items.map((i) => (
            <li key={i.id}>
              {i.title} — R {i.price.toFixed(2)} × {i.quantity}
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginTop: 12 }}>Total: R {total.toFixed(2)}</div>
      <button style={{ marginTop: 12 }}>Proceed to Checkout</button>
    </div>
  );
}
