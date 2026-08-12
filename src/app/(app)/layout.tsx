import AppNav from "@/components/layout/AppNav";
import AppFooter from "@/components/layout/AppFooter";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNav />
      <main className="flex-1">{children}</main>
      <AppFooter />
    </>
  );
}
