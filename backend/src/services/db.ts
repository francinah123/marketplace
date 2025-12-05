// src/services/db.ts
import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

/**
 * Connect to MongoDB and reuse the client/db across the app.
 */
export async function connectDb(uri: string, dbName: string): Promise<Db> {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log(`✅ Connected to MongoDB: ${dbName}`);
  }
  return db!;
}

/**
 * Get the active database connection.
 */
export function getDb(): Db {
  if (!db) {
    throw new Error("❌ Database not initialized. Call connectDb() first.");
  }
  return db;
}

/**
 * Close the MongoDB connection.
 */
export async function closeDb(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log("🔌 MongoDB connection closed");
  }
}
