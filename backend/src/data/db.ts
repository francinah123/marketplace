import type { NotificationItem, NewUser } from "../utils/validators";

export const notificationsSeed: NotificationItem[] = [
  { id: "1", type: "follow", actor: "Africa Facts Zone", message: "started following you", timeAgo: "4 months ago" },
  { id: "2", type: "like", actor: "Chitrang Vyas", message: "liked your post: Phila Ndwandwe…", timeAgo: "7 months ago" }
];

export const newUsersSeed: NewUser[] = [
  { id: "a", name: "LUKOSI PRIMARY SCHOOL", followers: 0 },
  { id: "b", name: "NKOSIBOMVU PRIMARY SCHOOL", followers: 0 },
  { id: "c", name: "LUVISI PRIMARY SCHOOL", followers: 0 },
  { id: "d", name: "NTODENI", followers: 0 }
];
