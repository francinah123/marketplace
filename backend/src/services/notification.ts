import { notificationsSeed } from "../data/db";

export function getNotificationsForUser(userId: string) {
  // In real impl, filter by userId from DB
  return notificationsSeed;
}
