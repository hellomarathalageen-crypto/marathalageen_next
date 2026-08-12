"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Heart,
  LayoutDashboard,
  Users,
  ShieldCheck,
  BarChart2,
  CreditCard,
  Star,
  FileText,
  Bell,
  HeadphonesIcon,
  Settings,
  ChevronRight,
  Search,
  LogOut,
  Menu,
  X,
  Layers,
  ClipboardList,
  MessageSquare,
  UserCog,
  AlertTriangle,
  ScrollText,
} from "lucide-react";

const adminNavGroups = [
  {
    label: null,
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "User Management",
    items: [
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Profiles", href: "/admin/profiles", icon: UserCog },
      { label: "Verification", href: "/admin/verification", icon: ShieldCheck },
    ],
  },
  {
    label: "Match & Engagement",
    items: [
      { label: "Matches", href: "/admin/matches", icon: Heart },
      { label: "Interests", href: "/admin/interests", icon: Star },
      { label: "Messages", href: "/admin/messages", icon: MessageSquare },
    ],
  },
  {
    label: "Payments & Plans",
    items: [
      { label: "Subscriptions", href: "/admin/subscriptions", icon: Layers },
      { label: "Payments", href: "/admin/payments", icon: CreditCard },
    ],
  },
  {
    label: "Content Management",
    items: [
      { label: "Success Stories", href: "/admin/success-stories", icon: Star },
      { label: "CMS", href: "/admin/cms", icon: FileText },
    ],
  },
  {
    label: "Reports & Analytics",
    items: [
      { label: "Reports", href: "/admin/reports", icon: AlertTriangle },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart2 },
      { label: "Audit Logs", href: "/admin/audit-logs", icon: ScrollText },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Notifications", href: "/admin/notifications", icon: Bell },
      { label: "Support", href: "/admin/support", icon: HeadphonesIcon },
      { label: "Moderation", href: "/admin/moderation", icon: ClipboardList },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const Sidebar = () => (
    <aside className="w-60 shrink-0 bg-[#0E2F63] min-h-screen flex flex-col overflow-y-auto">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#F34883]/20 flex items-center justify-center">
          <Heart className="w-5 h-5 text-[#F34883]" fill="currentColor" />
        </div>
        <div>
          <p className="text-sm font-bold text-white font-serif leading-none">Maratha</p>
          <p className="text-[10px] text-[#F34883] font-semibold leading-none tracking-wide mt-0.5">MATRIMONY ADMIN</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {adminNavGroups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "pt-4" : ""}>
            {group.label && (
              <p className="px-3 mb-1 text-[10px] font-bold uppercase tracking-widest text-blue-300/60">
                {group.label}
              </p>
            )}
            {group.items.map(({ label, href, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "bg-[#F34883] text-white shadow-lg shadow-[#F34883]/20"
                      : "text-blue-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Help & Logout */}
      <div className="px-3 pb-4 pt-3 border-t border-white/10 space-y-1">
        <div className="bg-[#F34883]/10 rounded-xl p-3 mb-3">
          <p className="text-xs font-bold text-white mb-1">Need Help?</p>
          <p className="text-[11px] text-blue-200 mb-2">Our support team is here to help you.</p>
          <button className="w-full text-xs font-semibold text-[#F34883] border border-[#F34883]/40 rounded-lg py-1.5 hover:bg-[#F34883]/10 transition-colors">
            Contact Support
          </button>
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-blue-200 hover:bg-white/10 hover:text-white transition-colors">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-[#F8F9FC]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-60">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
            </button>
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID, name, email, phone..."
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm w-72 focus:outline-none focus:border-[#F34883] focus:ring-2 focus:ring-[#F34883]/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F34883]" />
            </button>
            {/* Admin Avatar */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-[#173F73] flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-gray-800 leading-none">Admin User</p>
                <p className="text-[10px] text-gray-500 leading-none mt-0.5">Super Admin</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
