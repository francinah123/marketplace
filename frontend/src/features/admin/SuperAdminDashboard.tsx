import { useEffect, useState } from "react";

export default function SuperAdminDashboard() {
  const [settings, setSettings] = useState({ feePercent: 5, categories: ["Electronics", "Fashion"] });

  useEffect(() => {
    fetch("/api/superadmin/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data.settings));
  }, []);

  const updateFee = async (fee: number) => {
    await fetch("/api/superadmin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feePercent: fee })
    });
    const res = await fetch("/api/superadmin/settings");
    const data = await res.json();
    setSettings(data.settings);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Super Admin Dashboard</h2>
      <div>
        <label>Platform Fee %</label>
        <input
          type="number"
          value={settings.feePercent}
          onChange={(e) => updateFee(Number(e.target.value))}
        />
      </div>
      <h3>Categories</h3>
      <ul>
        {settings.categories.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  );
}
