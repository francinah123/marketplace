// src/config.ts
// Centralized configuration loader for environment variables

import dotenv from "dotenv";

// Load variables from .env file into process.env
dotenv.config();

function requireEnv(key: string, fallback?: string): string {
  const value = process.env[key] || fallback;
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
  return value;
}

export const config = {
  // Server
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",

  // Database
  dbUrl: requireEnv("DB_URL", "mongodb+srv://Onneile3:IFEP30P59HKy02w7@cluster0.rqsxxt4.mongodb.net/QwertJs?appName=Cluster0"),

  // JWT
  jwtSecret: requireEnv("JWT_SECRET", "supersecretkey"),

  // AWS S3
  awsRegion: requireEnv("AWS_REGION", "your-region"),
  awsAccessKeyId: requireEnv("AWS_ACCESS_KEY_ID", "your-access-key"),
  awsSecretAccessKey: requireEnv("AWS_SECRET_ACCESS_KEY", "your-secret-key"),
  awsBucketName: requireEnv("AWS_BUCKET_NAME", "your-bucket-name"),

  // PayGate
  paygateId: requireEnv("PAYGATE_ID", "your-merchant-id"),
  paygateSecret: requireEnv("PAYGATE_SECRET", "your-merchant-secret"),
};
