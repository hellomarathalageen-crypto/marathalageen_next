"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Heart,
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  UserPlus,
  LogIn,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/home" },
  { label: "Search", href: "/search" },
  { label: "Matches", href: "/matches" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "About Us", href: "/about" },
];

interface AppNavProps {
  /** Pass `true` when user is logged in to show dashboard nav */
  isLoggedIn?: boolean;
  activePath?: string;
}

export default function AppNav({ isLoggedIn = false, activePath = "" }: AppNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#FADADF] shadow-sm">
      <div className="container mx-auto max-w-7xl px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#FFF1F5] border border-[#FADADF] flex items-center justify-center">
            <Heart className="w-5 h-5 text-[#F34883]" fill="currentColor" />
          </div>
          <div className="leading-tight">
            <p className="text-[15px] font-bold text-[#173F73] font-serif leading-none">Maratha</p>
            <p className="text-[11px] font-semibold text-[#F34883] leading-none tracking-wide">Matrimony</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors pb-0.5 ${
                activePath === link.href
                  ? "text-[#F34883] border-b-2 border-[#F34883]"
                  : "text-[#23344D] hover:text-[#F34883]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <button className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full hover:bg-[#FFF1F5] transition-colors relative">
                <Bell className="w-5 h-5 text-[#173F73]" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F34883]" />
              </button>
              <div className="w-9 h-9 rounded-full bg-[#FFE4EF] overflow-hidden border-2 border-[#F34883] cursor-pointer">
                <img src="https://i.pravatar.cc/40?img=5" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#173F73] hover:text-[#F34883] transition-colors border border-[#FADADF] rounded-lg px-4 py-2 bg-white hover:bg-[#FFF1F5]"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-1.5 text-sm font-bold text-white bg-[#F34883] hover:bg-[#d93870] transition-colors rounded-lg px-4 py-2 shadow-sm shadow-[#F34883]/30"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Create Profile</span>
                <span className="sm:hidden">Join</span>
              </Link>
            </>
          )}

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#FFF1F5] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5 text-[#173F73]" /> : <Menu className="w-5 h-5 text-[#173F73]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#FADADF] px-4 py-4 flex flex-col gap-1 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                activePath === link.href
                  ? "bg-[#FFF1F5] text-[#F34883]"
                  : "text-[#23344D] hover:bg-[#FFF1F5] hover:text-[#F34883]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-[#FADADF] flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#FADADF] text-sm font-semibold text-[#173F73]"
            >
              <LogIn className="w-4 h-4" /> Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#F34883] text-sm font-bold text-white"
            >
              <UserPlus className="w-4 h-4" /> Create Profile
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
