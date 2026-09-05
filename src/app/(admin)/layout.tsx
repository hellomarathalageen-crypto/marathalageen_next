"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  CreditCard,
  Settings, 
  Bell, 
  Search,
  Menu, 
  X, 
  LogOut, 
  ArrowLeft,
  ExternalLink,
  Crown,
  Sparkles,
  ShieldAlert,
  Megaphone,
  Download
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "User Management", icon: Users },
  { href: "/admin/approvals", label: "Profile Approvals", icon: ShieldCheck },
  { href: "/admin/matchmaker", label: "Assisted Matchmaker", icon: Sparkles },
  { href: "/admin/moderation", label: "Safety & Moderation", icon: ShieldAlert },
  { href: "/admin/broadcast", label: "Platform Broadcasts", icon: Megaphone },
  { href: "/admin/payments", label: "VIP & Payments", icon: CreditCard },
  { href: "/admin/export", label: "Melava Data Exports", icon: Download },
  { href: "/admin/settings", label: "Platform Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" || !session?.user) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
      return;
    }

    if ((session.user as any)?.role !== "ADMIN") {
      router.replace("/home?error=unauthorized_admin");
      return;
    }
  }, [status, session, router, pathname]);

  if (!mounted || status === "loading" || (session?.user as any)?.role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-[#121A3D] flex flex-col items-center justify-center text-white p-6 text-center font-sans">
        <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center mb-4 text-[#DB1866] animate-pulse border border-white/20">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-extrabold text-white">Verifying Admin Access...</h2>
        <p className="text-xs text-blue-200 mt-1.5 max-w-sm">
          Checking cryptographic session tokens and administrator privileges.
        </p>
      </div>
    );
  }

  const adminName = session?.user?.name || "Super Admin";
  const adminEmail = session?.user?.email || "admin@marathalageen.com";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-[#0F172A] font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#0F172A]/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Super Admin Sidebar ── */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#121A3D] text-white z-50
        transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0 justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="bg-white px-3 py-1.5 rounded-xl shadow-md">
              <img 
                src="/logo.png" 
                alt="Maratha Lageen Logo" 
                className="h-9 w-auto object-contain" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold leading-tight text-white flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-400 fill-amber-400" /> Admin Suite
              </span>
              <span className="text-[10px] text-pink-300 tracking-widest uppercase font-bold">Control Center</span>
            </div>
          </Link>
          <button className="lg:hidden text-white/70 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          <div className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-3 px-3">
            Core Modules
          </div>
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/admin/dashboard" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-bold text-xs transition-all group relative overflow-hidden ${
                  isActive 
                    ? 'text-white bg-[#DB1866] shadow-lg shadow-[#DB1866]/30' 
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <link.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-blue-300 group-hover:text-white'}`} />
                <span className="truncate">{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-6 text-[11px] font-bold text-white/40 uppercase tracking-widest mb-3 px-3">
            Quick Navigation
          </div>
          <Link
            href="/home"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-blue-300" />
            <span>Return to Web App</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-blue-300" />
            <span>Member Dashboard</span>
          </Link>
        </nav>

        {/* Admin Profile & Logout */}
        <div className="p-4 shrink-0 border-t border-white/10 space-y-2">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-white/5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#DB1866] to-pink-400 flex items-center justify-center font-bold text-white text-xs shadow-inner">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate text-white">{adminName}</p>
              <p className="text-[10px] text-pink-300 truncate font-mono">{adminEmail}</p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/10 hover:bg-red-500/20 text-blue-200 hover:text-red-400 text-xs font-bold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout of Admin
          </button>
        </div>
      </aside>

      {/* ── Main Admin Content Surface ── */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-18 bg-white/90 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 shadow-xs">
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-gray-600">Production Node: Connected</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-[#FFF1F5] text-[#DB1866] text-xs font-bold px-3 py-1.5 rounded-full border border-[#FADADF]">
              <ShieldCheck className="w-3.5 h-3.5" /> Super Admin Authenticated
            </div>
            <Link
              href="/home"
              className="text-xs font-bold text-gray-600 hover:text-[#DB1866] bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Live Site
            </Link>
          </div>
        </header>

        {/* Child Pages */}
        <div className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          {children}
        </div>
      </main>

    </div>
  );
}
