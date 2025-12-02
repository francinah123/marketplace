import { Router } from "express";
const router = Router();

let campaigns = [
  { id: "c1", title: "School Supplies", description: "Help kids get books and stationery.", goal: 5000, raised: 1200 },
  { id: "c2", title: "Community Garden", description: "Support local food sustainability.", goal: 3000, raised: 800 }
];

router.get("/campaigns", (_req, res) => {
  res.json({ campaigns });
});

router.post("/contribute", (req, res) => {
  const { campaignId, amount } = req.body;
  const campaign = campaigns.find((c) => c.id === campaignId);
  if (!campaign) return res.status(404).json({ error: "Campaign not found" });
  campaign.raised += amount;
  res.status(201).json({ campaign });
});

export default router;
