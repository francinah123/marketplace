// backend/src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // scaffold: attach a fake user; replace with JWT verification
  (req as any).user = { id: "Francinah", role: "seller", verified: true };
  next();
}

export function requireVerifiedUser(req: Request, res: Response, next: NextFunction) {
  if (!(req as any).user?.verified) return res.status(403).json({ error: "Verification required" });
  next();
}

export function adminGuard(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  if (!user || user.role !== "admin") return res.status(403).json({ error: "Admin only" });
  next();
}
