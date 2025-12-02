import { useEffect, useRef } from "react";

export type NotificationItem = {
  id: string;
  type: "follow" | "like" | "comment" | "purchase" | "system";
  actor: string;
  message: string;
  timeAgo: string;
  avatarUrl?: string;
};

export default function NotificationPanel({
  open,
  onClose,
  items
}: {
  open: boolean;
  onClose: () => void;
  items: NotificationItem[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/10">
      <div ref={ref} className="m-4 w-full max-w-md rounded-xl bg-white shadow-2xl ring-1 ring-black/5">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-semibold text-dark">Notifications</h3>
          <button onClick={onClose} className="rounded bg-light px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">Close</button>
        </div>
        <ul className="max-h-[60vh] overflow-y-auto p-2">
          {items.length === 0 ? (
            <li className="p-4 text-sm text-gray-500">No notifications yet.</li>
          ) : (
            items.map((n) => (
              <li key={n.id} className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50">
                <img src={n.avatarUrl || "https://via.placeholder.com/40"} alt={n.actor} className="h-10 w-10 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{n.actor}</span> {n.message}
                  </p>
                  <p className="text-xs text-gray-500">{n.timeAgo}</p>
                </div>
                <span className={"mt-1 h-2 w-2 rounded-full " + (
                  n.type === "like" ? "bg-pink-500" :
                  n.type === "follow" ? "bg-secondary" :
                  n.type === "comment" ? "bg-primary" :
                  n.type === "purchase" ? "bg-amber-500" : "bg-gray-400"
                )} aria-hidden />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
