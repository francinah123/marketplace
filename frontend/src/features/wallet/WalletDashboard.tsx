import { useEffect, useState } from "react";

type Transaction = {
  id: string;
  type: "topup" | "payout" | "purchase" | "donation";
  amount: number;
  timestamp: string;
};

export default function WalletDashboard() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/wallet")
      .then((res) => res.json())
      .then((data) => {
        setBalance(data.balance);
        setTransactions(data.transactions || []);
      })
      .catch(() => {
        setBalance(0);
        setTransactions([]);
      });
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Wallet</h2>
      <div>Balance: R {balance.toFixed(2)}</div>
      <h3>Transactions</h3>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.type} — R {t.amount.toFixed(2)} ({new Date(t.timestamp).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}
