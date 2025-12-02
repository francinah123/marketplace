import rateLimit from "express-rate-limit";

// Limit each IP to 100 requests per 15 minutes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,  // Disable X-RateLimit headers
  message: { error: "Too many requests, please try again later." }
});

