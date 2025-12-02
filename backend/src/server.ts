import express from "express";
import cors from "cors";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import logger from "./utils/logger";
import { apiLimiter } from "./middleware/rateLimiter";
import { securityHeaders } from "./middleware/security";
import { applySanitizers } from "./middleware/sanitize";
import { config } from "./config";
import helmet from "helmet";
import usersRouter from "./routes/users";
import postsRouter from "./routes/posts";
import path from "path";

import marketplaceRoutes from "./routes/marketplace";
import productRoutes from "./routes/products";
import reviewRoutes from "./routes/reviews";
import cartRoutes from "./routes/cart";
import checkoutRoutes from "./routes/checkout";
import sellRoutes from "./routes/sell";
import storeRoutes from "./routes/store";
import postsRoutes from "./routes/posts";
import postActionsRoutes from "./routes/postActions";
import messengerRoutes from "./routes/messenger";
import walletRoutes from "./routes/wallet";
import donationRoutes from "./routes/donation";
import adminRoutes from "./routes/admin";
import superAdminRoutes from "./routes/superadmin";

const app = express();

// Security + rate limiting
app.use(securityHeaders);
app.use(apiLimiter);
applySanitizers(app);

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(helmet());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/buy/cart", cartRoutes);
app.use("/api/buy/checkout", checkoutRoutes);
app.use("/api/sell", sellRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/posts", postsRouter);
app.use("/api/post-actions", postActionsRoutes);
app.use("/api/messenger", messengerRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/users", usersRouter); // /api/users/new, /api/users/:id/follow
app.use("/api/posts", postsRouter); // upload menu stubs

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API running on ${port}`));
