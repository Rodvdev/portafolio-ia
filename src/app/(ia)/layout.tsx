import { Navigation } from "@/components/layout/Navigation";

export default function IALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
      <aside className="lg:col-span-1">
        <Navigation />
      </aside>
      <main className="lg:col-span-4 p-4">
        {children}
      </main>
    </div>
  );
} 