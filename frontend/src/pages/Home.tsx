import { useState } from "react";
import NotificationPanel from "../components/NotificationPanel";
import QwertyUsersPanel, { QUser } from "../components/QwertyUsersPanel";
import UploadMenu, { UploadAction } from "../components/UploadMenu";
import { useNotifications, useFollowUser, useUploadAction } from "../hooks/hooks";

export default function Home() {
  const [notifOpen, setNotifOpen] = useState(false);
  const { data: notifications = [] } = useNotifications();
  const followMutation = useFollowUser();

  const qUsers: QUser[] = [
    { id: "a", name: "LUKOSI PRIMARY SCHOOL", followers: 0 },
    { id: "b", name: "NKOSIBOMVU PRIMARY SCHOOL", followers: 0 },
    { id: "c", name: "LUVISI PRIMARY SCHOOL", followers: 0 }
  ];

  function handleUploadSelect(action: UploadAction) {
    if (action === "product") {
      // open sell wizard modal in your sell feature (future step)
    }
    useUploadAction(action).mutate({}); // demo call
  }

  return (
    <div className="min-h-screen bg-light">
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <h2 className="text-xl font-semibold text-dark">The Qwerty World</h2>
          <button className="rounded-full bg-primary px-3 py-1 text-white hover:bg-indigo-700" onClick={() => setNotifOpen(true)}>
            Notifications
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[1fr_320px]">
        <main className="space-y-6">
          <section className="rounded-xl bg-white p-4 shadow-card ring-1 ring-black/5">
            <h3 className="mb-4 text-lg font-semibold text-dark">Create</h3>
            <UploadMenu onSelect={handleUploadSelect} />
          </section>

          <section className="rounded-xl bg-white p-4 shadow-card ring-1 ring-black/5">
            <h3 className="mb-3 text-lg font-semibold text-dark">Latest Posts</h3>
            <p className="text-sm text-gray-600">Feed placeholder…</p>
          </section>
        </main>

        <aside className="space-y-6">
          <QwertyUsersPanel
            users={qUsers}
            onFollow={(id) => followMutation.mutate(id)}
          />
        </aside>
      </div>

      <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} items={notifications} />
    </div>
  );
}
