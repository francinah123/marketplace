import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../services/http";
import DashboardCard from "../../components/DashboardCard";

type User = { id: string; name: string; role: string; banned?: boolean };
type Product = { id: string; title: string; flagged?: boolean };
type Post = { id: string; content: string; flagged?: boolean };

function AdminVideoStream() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminVideos"],
    queryFn: async () => {
      const res = await http.get<{ videos: { id: string; video: { url: string } }[] }>(
        "/admin/stream/videos"
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="text-gray-500">Loading videos...</p>;
  if (error) return <p className="text-red-500">Error loading videos</p>;

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3">Videos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.videos?.map((v) => (
          <div
            key={v.id}
            className="bg-white rounded-lg shadow-md p-3 flex flex-col gap-2"
          >
            <video controls src={v.video.url} className="w-full rounded-md" />
            <p className="text-sm text-gray-600">
              <strong>ID:</strong> {v.id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const queryClient = useQueryClient();

  // ✅ Users
  const { data: usersData } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const res = await http.get<{ users: User[] }>("/admin/users");
      return res.data.users;
    },
  });

  const banUserMutation = useMutation({
    mutationFn: async (id: string) => {
      await http.post(`/admin/users/${id}/ban`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
  });

  // ✅ Products
  const { data: productsData } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: async () => {
      const res = await http.get<{ products: Product[] }>("/admin/products");
      return res.data.products;
    },
  });

  // ✅ Posts
  const { data: postsData } = useQuery({
    queryKey: ["adminPosts"],
    queryFn: async () => {
      const res = await http.get<{ posts: Post[] }>("/admin/posts");
      return res.data.posts;
    },
  });

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      {/* ✅ Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard icon="👥" title="Users" value={usersData?.length ?? 0} />
        <DashboardCard icon="📦" title="Products" value={productsData?.length ?? 0} />
        <DashboardCard icon="📝" title="Posts" value={postsData?.length ?? 0} />
      </div>

      {/* Users list */}
      <section>
        <h3 className="text-xl font-semibold mt-6 mb-2">Users</h3>
        <ul className="space-y-2">
          {usersData?.map((u) => (
            <li
              key={u.id}
              className="flex justify-between items-center bg-white p-3 rounded shadow"
            >
              <span>
                {u.name} ({u.role}) {u.banned ? "🚫" : ""}
              </span>
              {!u.banned && (
                <button
                  onClick={() => banUserMutation.mutate(u.id)}
                  disabled={banUserMutation.isPending} 
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                >
                  {banUserMutation.isPending ? "Banning..." : "Ban"} {/* ✅ fixed */}
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Products list */}
      <section>
        <h3 className="text-xl font-semibold mt-6 mb-2">Products</h3>
        <ul className="space-y-2">
          {productsData?.map((p) => (
            <li
              key={p.id}
              className="bg-white p-3 rounded shadow flex justify-between"
            >
              <span>{p.title}</span>
              {p.flagged && <span className="text-yellow-600">⚠️</span>}
            </li>
          ))}
        </ul>
      </section>

      {/* Posts list */}
      <section>
        <h3 className="text-xl font-semibold mt-6 mb-2">Posts</h3>
        <ul className="space-y-2">
          {postsData?.map((po) => (
            <li
              key={po.id}
              className="bg-white p-3 rounded shadow flex justify-between"
            >
              <span>{po.content}</span>
              {po.flagged && <span className="text-yellow-600">⚠️</span>}
            </li>
          ))}
        </ul>
      </section>

      {/* ✅ Video streaming section */}
      <AdminVideoStream />
    </div>
  );
}
