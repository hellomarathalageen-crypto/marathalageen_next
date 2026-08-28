"use client";

import Link from "next/link";
import { User, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/search", label: "Search" },
  { href: "/matches", label: "Matches" },
  { href: "/dashboard/interests", label: "Inbox" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/about", label: "About Us" },
];

export default function AppNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="absolute top-0 z-50 w-full bg-transparent">
      <div className="container mx-auto max-w-7xl px-4 md:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2.5 shrink-0 pl-2 w-[180px] lg:w-[240px]">
          <img src="/logo.png" alt="Maratha Lageen Logo" className="h-12 md:h-16 w-auto object-contain scale-150 origin-left" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`text-sm font-bold transition-colors relative ${isActive ? 'text-[#DB1866]' : 'text-[#2A3773] hover:text-[#DB1866]'}`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#DB1866] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          {session ? (
            <>
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 text-sm font-bold text-white bg-[#2A3773] border border-[#2A3773] rounded-full px-6 py-2.5 hover:bg-[#1f295c] transition-all shadow-md shrink-0"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 text-sm font-bold text-[#2A3773] bg-[#FFF1F5] rounded-full px-6 py-2.5 hover:bg-[#FFE4EF] transition-all shrink-0"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="text-sm font-bold text-[#2A3773] border border-gray-300 rounded-full px-6 py-2.5 hover:bg-white hover:border-[#2A3773] transition-all"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="flex items-center gap-2 text-sm font-bold text-white bg-[#DB1866] rounded-full px-6 py-2.5 hover:bg-[#B81456] shadow-md shadow-[#DB1866]/20 transition-all hover:-translate-y-0.5"
              >
                <User className="w-4 h-4" /> Create Profile
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-[#2A3773]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-[#FADADF] shadow-lg animate-in slide-in-from-top-2">
          <nav className="flex flex-col p-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="py-3 px-4 text-sm font-bold text-[#2A3773] border-b border-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 p-4 mt-2">
              {session ? (
                <>
                  <Link href="/dashboard" className="text-center text-sm font-bold text-white bg-[#2A3773] rounded-full py-2.5 shadow-md">
                    Dashboard
                  </Link>
                  <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center justify-center gap-2 text-sm font-bold text-[#2A3773] bg-[#FFF1F5] rounded-full py-2.5">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-center text-sm font-bold text-[#2A3773] border border-gray-300 rounded-full py-2.5">
                    Login
                  </Link>
                  <Link href="/signup" className="flex items-center justify-center gap-2 text-sm font-bold text-white bg-[#DB1866] rounded-full py-2.5 shadow-md shadow-[#DB1866]/20">
                    <User className="w-4 h-4" /> Create Profile
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}


