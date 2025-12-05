import { useQuery, useMutation } from "@tanstack/react-query";
import { http } from "../services/http";
import type { NotificationItem } from "../components/NotificationPanel";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async (): Promise<NotificationItem[]> => {
      // For now, reuse users API or create a dedicated one later
      const { data } = await http.get("/users/new"); // placeholder to prove wire-up
      // Map to notifications if needed; replace with /notifications later
      return [
        { id: "1", type: "follow", actor: data[0]?.name ?? "New User", message: "started following you", timeAgo: "moments ago" }
      ];
    }
  });
}

export function useFollowUser() {
  return useMutation({
    mutationFn: async (userId: string) => {
      const { data } = await http.post(`/users/${userId}/follow`);
      return data;
    }
  });
}

export function useUploadAction(action: string) {
  return useMutation({
    mutationFn: async (payload: unknown) => {
      const { data } = await http.post(`/posts/create/${action}`, payload);
      return data;
    }
  });
}
