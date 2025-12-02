import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err.statusCode || 500;
  const message = status === 500 ? "Internal Server Error" : err.message || "Error";

  logger.error({
    status,
    message,
    stack: err.stack
  });

  res.status(status).json({ error: message });
}
