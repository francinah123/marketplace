import { useEffect, useState } from "react";

type User = { id: string; name: string; role: string; banned?: boolean };
type Product = { id: string; title: string; flagged?: boolean };
type Post = { id: string; content: string; flagged?: boolean };

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/users").then((res) => res.json()),
      fetch("/api/admin/products").then((res) => res.json()),
      fetch("/api/admin/posts").then((res) => res.json())
    ]).then(([u, p, po]) => {
      setUsers(u.users || []);
      setProducts(p.products || []);
      setPosts(po.posts || []);
    });
  }, []);

  const banUser = async (id: string) => {
    await fetch(`/api/admin/users/${id}/ban`, { method: "POST" });
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data.users || []);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Admin Dashboard</h2>
      <h3>Users</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.role}) {u.banned ? "🚫" : ""}
            {!u.banned && <button onClick={() => banUser(u.id)}>Ban</button>}
          </li>
        ))}
      </ul>
      <h3>Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.title} {p.flagged ? "⚠️" : ""}</li>
        ))}
      </ul>
      <h3>Posts</h3>
      <ul>
        {posts.map((po) => (
          <li key={po.id}>{po.content} {po.flagged ? "⚠️" : ""}</li>
        ))}
      </ul>
    </div>
  );
}
