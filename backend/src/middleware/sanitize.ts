import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import { Express } from "express";

export function applySanitizers(app: Express) {
  // Prevent XSS attacks by sanitizing user input
  app.use(xss());

  // Prevent NoSQL injection by removing $ and . from inputs
  app.use(mongoSanitize());
}
