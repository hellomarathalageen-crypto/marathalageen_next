"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  LogOut,
  ChevronDown
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "User Management", icon: Users },
  { href: "/admin/approvals", label: "Profile Approvals", icon: ShieldCheck },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-[#0F172A]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#0F172A]/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#2A3773] text-white z-50
        transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative flex items-center justify-center text-[#DB1866] bg-white rounded-xl shadow-lg">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" className="w-6 h-6">
                <path d="M50 10 L60 35 L85 25 L70 45 L95 60 L70 65 L80 90 L55 75 L40 95 L40 70 L15 80 L35 60 L10 40 L35 40 L25 15 L45 35 Z" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[18px] font-bold font-sans leading-tight">Maratha</span>
              <span className="text-[12px] text-white/70 tracking-widest uppercase font-bold">Admin Pro</span>
            </div>
          </div>
          <button className="lg:hidden text-white/70 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <div className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4 px-3">Menu</div>
          {sidebarLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl font-bold transition-all duration-200 group relative overflow-hidden ${
                  isActive 
                    ? 'text-[#DB1866] bg-white shadow-md' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#DB1866] rounded-r-full" />}
                <link.icon className={`w-5 h-5 ${isActive ? 'text-[#DB1866]' : 'text-white/70 group-hover:text-white'}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Profile */}
        <div className="p-4 shrink-0 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors border border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#DB1866] to-[#FF7E9F] flex items-center justify-center font-bold text-white shadow-inner">
              AK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">Aditya K.</p>
              <p className="text-xs text-white/50 truncate">Super Admin</p>
            </div>
            <LogOut className="w-4 h-4 text-white/50 hover:text-white transition-colors" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-gray-100/80 px-4 py-2.5 rounded-full border border-gray-200 focus-within:border-[#2A3773] focus-within:bg-white transition-all w-80 shadow-inner">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search users, IDs, or transactions..." 
                className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-gray-400 text-gray-700"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 lg:gap-6">
            <button className="relative p-2 text-gray-400 hover:text-[#2A3773] transition-colors rounded-full hover:bg-gray-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#DB1866] rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" className="w-9 h-9 rounded-full ring-2 ring-transparent group-hover:ring-[#2A3773] transition-all object-cover shadow-sm" alt="Admin" />
              <div className="hidden md:block text-sm">
                <p className="font-bold text-[#2A3773]">Aditya K.</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#2A3773] transition-colors" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
