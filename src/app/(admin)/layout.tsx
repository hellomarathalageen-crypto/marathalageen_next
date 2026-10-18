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
  Menu, 
  X, 
  LogOut, 
  ArrowLeft,
  ExternalLink,
  Crown,
  Sparkles,
  ShieldAlert,
  Megaphone,
  Download,
  CalendarCheck
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
  { href: "/admin/preregistrations", label: "Pre-Registrations (Launch)", icon: Crown },
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
      router.replace('/login?from=' + encodeURIComponent(pathname));
      return;
    }

    if ((session.user as any)?.role !== "ADMIN") {
      router.replace("/home?error=unauthorized_admin");
      return;
    }
  }, [status, session, router, pathname]);

  if (!mounted || status === "loading" || (session?.user as any)?.role !== "ADMIN") {
    return (
      <div className="h-screen w-screen bg-[#1B2559] flex flex-col items-center justify-center text-white p-6 text-center font-sans">
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
    <div className="h-screen w-screen overflow-hidden flex bg-[#F8FAFC] text-[#0F172A] font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#0F172A]/40 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── World-Class Unified Admin Sidebar (Light Luxury Edition) ── */}
      <aside className={
        "fixed lg:static top-0 left-0 h-full w-64 bg-white border-r border-gray-200/90 z-50 shrink-0 transform transition-transform duration-300 ease-in-out flex flex-col shadow-xl lg:shadow-none " +
        (sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0")
      }>
        
        {/* Brand / Logo Area */}
        <div className="h-16 flex items-center px-5 border-b border-gray-100 shrink-0 justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <img 
              src="/logo.png" 
              alt="Maratha Lageen Logo" 
              className="h-8 w-auto object-contain" 
            />
            <div className="flex flex-col">
              <span className="text-sm font-extrabold leading-tight text-[#1B2559] tracking-tight">
                Maratha Lageen
              </span>
              <span className="text-[10px] text-[#DB1866] font-bold tracking-wider uppercase flex items-center gap-1">
                <Crown className="w-2.5 h-2.5 fill-[#DB1866]" /> Admin Suite
              </span>
            </div>
          </Link>
          <button className="lg:hidden text-gray-400 hover:text-gray-700" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 px-3">
            Core Modules
          </div>
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/admin/dashboard" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={
                  "flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all group " +
                  (isActive 
                    ? "bg-[#FFF1F5] text-[#DB1866] font-extrabold border-r-3 border-[#DB1866] shadow-2xs" 
                    : "text-gray-600 hover:text-[#1B2559] hover:bg-gray-50/80 font-semibold")
                }
              >
                <link.icon className={"w-4 h-4 shrink-0 transition-transform group-hover:scale-105 " + (isActive ? "text-[#DB1866]" : "text-gray-400 group-hover:text-[#1B2559]")} />
                <span className="truncate">{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 px-3">
            Quick Navigation
          </div>
          <Link
            href="/home"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl font-medium text-xs text-gray-500 hover:text-[#1B2559] hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gray-400" />
            <span>Return to Web App</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl font-medium text-xs text-gray-500 hover:text-[#1B2559] hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            <span>Member Dashboard</span>
          </Link>

          {/* Launch Status Card (Fills gap seamlessly & gives purposeful context) */}
          <div className="pt-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[#FFF8FA] via-[#FFF1F5] to-pink-50/40 border border-[#FADADF]/80 shadow-2xs">
              <div className="flex items-center gap-1.5 mb-1">
                <Crown className="w-3.5 h-3.5 text-[#DB1866] fill-[#DB1866]" />
                <span className="text-[11px] font-extrabold text-[#1B2559]">Vijayadashami Launch</span>
              </div>
              <p className="text-[10px] text-gray-500 leading-snug">
                Pre-registration registry active with 100% Free VIP pass reservation.
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Registry Live</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Admin Profile & Logout Bar */}
        <div className="p-3 shrink-0 border-t border-gray-100 bg-gray-50/60">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#DB1866] to-pink-400 flex items-center justify-center font-bold text-white text-xs shadow-inner shrink-0">
                SA
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold truncate text-[#1B2559]">{adminName}</p>
                <p className="text-[10px] text-gray-400 truncate font-mono">{adminEmail}</p>
              </div>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              title="Logout of Admin"
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Admin Content Surface ── */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shrink-0 flex items-center justify-between px-4 lg:px-8 shadow-2xs z-30">
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
              <span className="text-xs font-bold text-gray-700">Production Node: Connected</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 bg-[#FFF1F5] text-[#DB1866] text-xs font-bold px-3 py-1.5 rounded-full border border-[#FADADF]">
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

        {/* Scrollable Content Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7">
          {children}
        </main>
      </div>

    </div>
  );
}
