"use client";

import Link from "next/link";
import { User, Menu, X, LogOut, LayoutDashboard, Crown, Sparkles } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

// Public navigation links shown when NOT logged in
const publicNavLinks = [
  { href: "/", label: "Home" },
  { href: "/#register", label: "Pre-Register" },
  { href: "/search", label: "Search Profiles" },
  { href: "/#about", label: "About Us" },
  { href: "/#contact", label: "Contact Us" },
];

// Member navigation links shown ONLY when logged in
const memberNavLinks = [
  { href: "/home", label: "Home" },
  { href: "/search", label: "Search" },
  { href: "/matches", label: "Matches" },
  { href: "/dashboard/chat", label: "Chat" },
  { href: "/kundali", label: "Kundali Milan" },
  { href: "/biodata", label: "Biodata" },
  { href: "/events", label: "Melavas" },
];

export default function AppNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated" && Boolean(session?.user);
  const isLoading = status === "loading";

  // Pick appropriate links based on auth state
  const activeNavLinks = isAuthenticated ? memberNavLinks : publicNavLinks;

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/home" });
  };

  const userName = session?.user?.name ? session.user.name.split(" ")[0] : null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs print:static print:border-none print:shadow-none print:bg-transparent print:h-auto print:py-2">
      <div className="container mx-auto max-w-7xl px-4 md:px-8 h-18 sm:h-20 flex items-center justify-between print:h-auto print:justify-center print:px-0">
        
        {/* Logo from landing page */}
        <div className="flex items-center gap-2 print:m-0">
          <Link href={isAuthenticated ? "/home" : "/"} className="flex items-center gap-2 pl-1 sm:pl-2">
            <img 
              src="/logo.png" 
              alt="Maratha Lageen Logo" 
              className="h-11 sm:h-12 lg:h-14 w-auto object-contain transition-transform" 
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 print:hidden">
          {activeNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`text-sm font-sans font-semibold transition-colors relative ${
                  isActive ? "text-[#DB1866]" : "text-[#1B2559] hover:text-[#DB1866]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#DB1866] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth Actions */}
        <div className="hidden lg:flex items-center gap-3 shrink-0 print:hidden">
          {isLoading ? (
            // Neutral skeleton while NextAuth validates session
            <div className="flex items-center gap-2 animate-pulse">
              <div className="w-20 h-9 bg-gray-200/60 rounded-full" />
              <div className="w-28 h-9 bg-gray-200/60 rounded-full" />
            </div>
          ) : isAuthenticated ? (
            // Authenticated Member Controls
            <div className="flex items-center gap-3">
              {userName && (
                <span className="text-xs font-sans font-bold text-[#1B2559] bg-[#FFF1F5] px-3 py-1.5 rounded-full border border-[#FADADF] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#DB1866]" />
                  <span>Hi, {userName}</span>
                </span>
              )}
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 text-sm font-sans font-bold text-white bg-[#1B2559] hover:bg-[#2A3773] rounded-full px-5 py-2.5 transition-all shadow-md hover:shadow-lg"
              >
                <LayoutDashboard className="w-4 h-4 text-pink-300" /> Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-sans font-bold text-[#1B2559] bg-white hover:bg-[#FFF1F5] border border-gray-200 hover:border-[#DB1866] rounded-full px-4 py-2.5 transition-all shadow-xs"
                title="Sign out of account"
              >
                <LogOut className="w-3.5 h-3.5 text-gray-500 hover:text-[#DB1866]" /> Logout
              </button>
            </div>
          ) : (
            // Logged-out Visitor Controls
            <div className="flex items-center gap-3">
              <Link 
                href="/login" 
                className="text-sm font-sans font-bold text-[#1B2559] border border-gray-300 rounded-full px-5 py-2 hover:bg-white hover:border-[#1B2559] transition-all"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="flex items-center gap-1.5 text-sm font-sans font-bold text-white bg-[#DB1866] hover:bg-[#B81456] rounded-full px-5 py-2 shadow-md shadow-[#DB1866]/20 transition-all hover:-translate-y-0.5"
              >
                <User className="w-4 h-4" /> Create Profile
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="lg:hidden p-2 text-[#1B2559] print:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-[#FADADF] shadow-xl animate-in slide-in-from-top-2 print:hidden">
          <nav className="flex flex-col p-4">
            {activeNavLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="py-3 px-4 text-sm font-sans font-bold text-[#1B2559] border-b border-gray-100 hover:text-[#DB1866] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="flex flex-col gap-2.5 p-4 mt-2">
              {isLoading ? (
                <div className="w-full h-10 bg-gray-100 rounded-full animate-pulse" />
              ) : isAuthenticated ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-center text-sm font-sans font-bold text-white bg-[#1B2559] rounded-full py-3 shadow-md flex items-center justify-center gap-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4 text-pink-300" /> Go to Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center justify-center gap-2 text-sm font-sans font-bold text-[#1B2559] bg-[#FFF1F5] rounded-full py-2.5"
                  >
                    <LogOut className="w-4 h-4 text-[#DB1866]" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="text-center text-sm font-sans font-bold text-[#1B2559] border border-gray-300 rounded-full py-2.5"
                    onClick={() => setMobileOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup" 
                    className="flex items-center justify-center gap-2 text-sm font-sans font-bold text-white bg-[#DB1866] rounded-full py-3 shadow-md shadow-[#DB1866]/20"
                    onClick={() => setMobileOpen(false)}
                  >
                    <User className="w-4 h-4" /> Create Profile Free
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
