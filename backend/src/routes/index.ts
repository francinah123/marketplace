// src/routes/index.ts
import { Router } from "express";

import usersRouter from "./users";
import postsRouter from "./posts";
import marketplaceRoutes from "./marketplace";
import productRoutes from "./products";
import reviewRoutes from "./reviews";
import cartRoutes from "./cart";
import checkoutRoutes from "./checkout";
import sellRoutes from "./sell";
import storeRoutes from "./store";
import postActionsRoutes from "./postActions";
import messengerRoutes from "./messenger";
import walletRoutes from "./wallet";
import donationRoutes from "./donation";
import adminRoutes from "./admin";
import superAdminRoutes from "./superadmin";

const router = Router();

// === Route Aggregation ===
router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/marketplace", marketplaceRoutes);
router.use("/products", productRoutes);
router.use("/reviews", reviewRoutes);
router.use("/buy/cart", cartRoutes);
router.use("/buy/checkout", checkoutRoutes);
router.use("/sell", sellRoutes);
router.use("/store", storeRoutes);
router.use("/post-actions", postActionsRoutes);
router.use("/messenger", messengerRoutes);
router.use("/wallet", walletRoutes);
router.use("/donation", donationRoutes);
router.use("/admin", adminRoutes);
router.use("/superadmin", superAdminRoutes);

export default router;
