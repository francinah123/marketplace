import { z } from "zod";

// === Notifications ===
export const NotificationItemSchema = z.object({
  id: z.string(),
  type: z.enum(["follow", "like", "comment", "purchase", "system"]),
  actor: z.string(),
  message: z.string(),
  timeAgo: z.string(),
  avatarUrl: z.string().optional(),
});
export type NotificationItem = z.infer<typeof NotificationItemSchema>;

// === Persisted User (seeded users) ===
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  followers: z.number().min(0),
  avatarUrl: z.string().optional(),
});
export type User = z.infer<typeof UserSchema>;

// === New User Registration DTO ===
export const NewUserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});
export type NewUser = z.infer<typeof NewUserSchema>;
