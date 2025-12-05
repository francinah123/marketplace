import { ObjectId } from "mongodb";
import { getDb } from "../services/db";

const COLLECTION = "posts";

export interface Post {
  _id?: ObjectId;
  id?: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

export async function update(id: string, updates: Partial<Post>): Promise<Post | null> {
  const db = getDb();
  const result = await db.collection<Post>(COLLECTION).findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updates },
    { returnDocument: "after" }
  );

  // result is a FindAndModifyResult-like object with `.value`
  return (result as any).value ?? null;
}

export async function remove(id: string): Promise<Post | null> {
  const db = getDb();
  const result = await db.collection<Post>(COLLECTION).findOneAndDelete({
    _id: new ObjectId(id),
  });

  return (result as any).value ?? null;
}
