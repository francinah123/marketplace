import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  sidebar?: ReactNode; // optional sidebar content
};

export default function SellerLayout({ title, children, sidebar }: Props) {
  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* Page Header */}
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar (optional) */}
        {sidebar && (
          <aside className="lg:col-span-1 border rounded p-4 bg-gray-50">
            {sidebar}
          </aside>
        )}

        {/* Main Content */}
        <main className={sidebar ? "lg:col-span-3" : "lg:col-span-4"}>
          {children}
        </main>
      </div>
    </div>
  );
}
