import { z } from "zod";

export const NotificationItemSchema = z.object({
  id: z.string(),
  type: z.enum(["follow", "like", "comment", "purchase", "system"]),
  actor: z.string(),
  message: z.string(),
  timeAgo: z.string(),
  avatarUrl: z.string().optional()
});
export type NotificationItem = z.infer<typeof NotificationItemSchema>;

export const NewUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  followers: z.number().min(0),
  avatarUrl: z.string().optional()
});
export const ImagePostSchema = z.object({
  author: z.string().min(1),
  caption: z.string().optional(),
  imageUrls: z.array(z.string().url())
});
export type ImagePostPayload = z.infer<typeof ImagePostSchema>;