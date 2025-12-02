import helmet from "helmet";

export const securityHeaders = helmet({
  contentSecurityPolicy: false, // disable CSP for now, can configure later
  crossOriginEmbedderPolicy: false // allow cross-origin resources
});
