import { useEffect, useState } from "react";

type Campaign = {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
};

export default function DonationCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    fetch("/api/donation/campaigns")
      .then((res) => res.json())
      .then((data) => setCampaigns(data.campaigns || []))
      .catch(() => setCampaigns([]));
  }, []);

  const contribute = async (id: string, amount: number) => {
    await fetch("/api/donation/contribute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ campaignId: id, amount })
    });
    const res = await fetch("/api/donation/campaigns");
    const data = await res.json();
    setCampaigns(data.campaigns || []);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Donation Campaigns</h2>
      {campaigns.map((c) => (
        <div key={c.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <div>Raised: R {c.raised.toFixed(2)} / Goal: R {c.goal.toFixed(2)}</div>
          <button onClick={() => contribute(c.id, 100)}>Contribute R100</button>
        </div>
      ))}
    </div>
  );
}
