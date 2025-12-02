export type QUser = {
  id: string;
  name: string;
  followers: number;
  avatarUrl?: string;
};

export default function QwertyUsersPanel({
  users,
  onFollow
}: {
  users: QUser[];
  onFollow: (userId: string) => void;
}) {
  return (
    <aside className="rounded-xl bg-white p-4 shadow-card ring-1 ring-black/5">
      <h4 className="mb-3 text-base font-semibold text-dark">Qwerty Users</h4>
      <ul className="space-y-3">
        {users.map((u) => (
          <li key={u.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={u.avatarUrl || "https://via.placeholder.com/40"} alt={u.name} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium text-gray-800">{u.name}</p>
                <p className="text-xs text-gray-500">{u.followers} followers</p>
              </div>
            </div>
            <button className="rounded bg-primary px-3 py-1 text-sm text-white hover:bg-indigo-700" onClick={() => onFollow(u.id)}>
              Follow
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
