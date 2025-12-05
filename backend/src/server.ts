import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";

import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import { apiLimiter } from "./middleware/rateLimiter";
import { securityHeaders } from "./middleware/security";
import { applySanitizers } from "./middleware/sanitize";
import { config } from "./config";
import { connectDb } from "./services/db"; // MongoDB connection utility

// Routers
import usersRouter from "./routes/users";
import postsRouter from "./routes/posts";
import marketplaceRoutes from "./routes/marketplace";
import productRoutes from "./routes/products";
import reviewRoutes from "./routes/reviews";
import cartRoutes from "./routes/cart";
import checkoutRoutes from "./routes/checkout";
import sellRoutes from "./routes/sell";
import storeRoutes from "./routes/store";
import postActionsRoutes from "./routes/postActions";
import messengerRoutes from "./routes/messenger";
import walletRoutes from "./routes/wallet";
import donationRoutes from "./routes/donation";
import adminRoutes from "./routes/admin";
import superAdminRoutes from "./routes/superadmin";

const app = express();

// === Security + Middleware ===
app.use(securityHeaders);
app.use(apiLimiter);
applySanitizers(app);

app.use(cors({ origin: "*" })); // allow all origins for now, refine later
app.use(express.json({ limit: "10mb" })); // handle larger payloads safely
app.use(requestLogger);
app.use(helmet());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// === Health Check & Info ===
app.get("/api/health", (_req, res) =>
  res.json({
    status: "ok",
    environment: config.nodeEnv,
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  })
);

// === Routes ===
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/buy/cart", cartRoutes);
app.use("/api/buy/checkout", checkoutRoutes);
app.use("/api/sell", sellRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/posts", postsRouter);
app.use("/api/post-actions", postActionsRoutes);
app.use("/api/messenger", messengerRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/users", usersRouter);

// === Error Handling ===
app.use(notFound);
app.use(errorHandler);

// === Start Server with DB Connection ===
(async () => {
  try {
    await connectDb(config.dbUrl, "QwertJs"); // connect to MongoDB Atlas (QwertJs DB)
    app.listen(config.port, () => {
      console.log("=======================================");
      console.log(`🚀 Server running on http://localhost:${config.port}`);
      console.log(`📦 Connected to MongoDB at ${config.dbUrl}`);
      console.log(`🌍 Environment: ${config.nodeEnv}`);
      console.log("=======================================");
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
  }
})();
