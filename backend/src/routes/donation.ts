import { Router, Request, Response } from "express";
import { config } from "../config"; // ✅ use your config object

const router = Router();

// ✅ Existing campaign logic
let campaigns = [
  {
    id: "c1",
    title: "School Supplies",
    description: "Help kids get books and stationery.",
    goal: 5000,
    raised: 1200,
  },
  {
    id: "c2",
    title: "Community Garden",
    description: "Support local food sustainability.",
    goal: 3000,
    raised: 800,
  },
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

// ✅ New post-level donation route
router.get("/paygate/initiate", async (req: Request, res: Response) => {
  const { amount, postId, returnUrl } = req.query;

  if (!amount || !postId || !returnUrl) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const payload = {
    PAYGATE_ID: config.paygateId,
    REFERENCE: `post-${postId}`,
    AMOUNT: Number(amount) * 100, // cents
    CURRENCY: "ZAR",
    RETURN_URL: String(returnUrl),
    TRANSACTION_DATE: new Date().toISOString().slice(0, 19).replace("T", " "),
    LOCALE: "en-za",
  };

  try {
    // ✅ Node 18+ has fetch built in
    const response = await fetch("https://secure.paygate.co.za/payweb3/initiate.trans", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(payload as any).toString(),
    });

    const text = await response.text();
    const payRequestId = /PAY_REQUEST_ID=(\w+)/.exec(text)?.[1];
    const checksum = /CHECKSUM=(\w+)/.exec(text)?.[1];

    if (!payRequestId || !checksum) {
      return res.status(500).json({ error: "Failed to initiate PayGate transaction" });
    }

    const redirectUrl = `https://secure.paygate.co.za/payweb3/process.trans?PAY_REQUEST_ID=${payRequestId}&CHECKSUM=${checksum}`;
    res.redirect(redirectUrl);
  } catch (err) {
    console.error("PayGate error:", err);
    res.status(500).json({ error: "PayGate initiation failed" });
  }
});

export default router;
