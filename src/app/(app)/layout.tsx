import AppNav from "@/components/layout/AppNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNav />
      <main className="flex-1 min-h-0 flex flex-col">{children}</main>
    </>
  );
}
