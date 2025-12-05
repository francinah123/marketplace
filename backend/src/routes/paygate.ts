import { Router } from "express";

const router = Router();

router.get("/initiate", (req, res) => {
  const { postId, amount, currency, returnUrl } = req.query;

  // TODO: Call PayGate API here with credentials
  // Example payload:
  // {
  //   reference: `donation-${postId}-${Date.now()}`,
  //   amount,
  //   currency,
  //   returnUrl
  // }

  // For now, simulate redirect
  res.redirect(returnUrl as string);
});

export default router;
