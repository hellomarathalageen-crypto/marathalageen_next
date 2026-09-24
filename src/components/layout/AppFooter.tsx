"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Phone, Mail, Lock, ChevronRight, Sparkles, HeartHandshake } from "lucide-react";

const quickLinks = [
  { label: "About Maratha Lageen", href: "/#about" },
  { label: "Pre-Register Free", href: "/#register" },
  { label: "Why We Exist", href: "/#why-we-exist" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Frequently Asked Questions", href: "/#faqs" },
];

const helpAndPolicies = [
  { label: "About Our Community Mission", href: "/#about" },
  { label: "Contact Relationship Desk", href: "/#contact" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Safety & Verification Guidelines", href: "/help#safety" },
];

export function AppFooter() {
  const pathname = usePathname();

  // Hide on authentication and admin dashboards for focused UX
  if (pathname?.startsWith("/login") || pathname?.startsWith("/signup") || pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-gradient-to-b from-[#1E2756] via-[#161D42] to-[#0E132D] text-white pt-16 pb-12 border-t-4 border-[#DB1866] relative overflow-hidden">
      {/* Soft Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#DB1866]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* ── 1. Top Brand, Contact & Helpline Card ── */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#DB1866] to-[#FA709A] flex items-center justify-center text-white font-black text-lg shadow-lg shadow-[#DB1866]/30">
                M
              </span>
              <div>
                <h3 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>Maratha Matrimony</span>
                  <span className="text-xs font-semibold text-pink-300 bg-pink-500/20 border border-pink-400/30 px-2 py-0.5 rounded-full">
                    ಮರಾಠ ಲಗ್ನ
                  </span>
                </h3>
                <p className="text-xs text-blue-200/90 font-medium">
                  🚩 ಜೈ ಭವಾನಿ, ಜೈ ಶಿವಾಜಿ • Jai Bhavani, Jai Shivaji
                </p>
              </div>
            </div>
            <p className="text-xs text-blue-200/70 max-w-md">
              Karnataka’s premier community matchmaking platform — preserving culture, lineage integrity, and family trust.
            </p>
          </div>

          {/* Quick Helpline CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+919844295369"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 hover:scale-102"
            >
              <Phone className="w-3.5 h-3.5 text-pink-400" />
              <span>+91 98442 95369</span>
            </a>
            <a
              href="mailto:hello@marathalageen.com"
              className="bg-[#DB1866] hover:bg-[#B81456] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-[#DB1866]/30 flex items-center gap-2 hover:scale-102"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>hello@marathalageen.com</span>
            </a>
          </div>
        </div>

        {/* ── 2. Streamlined Feature Badges Strip ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          
          <div className="flex items-start gap-3 bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-2xl border border-white/10">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.75} />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">100% ID Verified</p>
              <p className="text-[11px] text-blue-200 leading-snug">Govt ID &amp; mobile checked profiles</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-2xl border border-white/10">
            <HeartHandshake className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" strokeWidth={1.75} />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">Authentic Lineage</p>
              <p className="text-[11px] text-blue-200 leading-snug">Verified Maratha Samaj roots</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-2xl border border-white/10">
            <Lock className="w-6 h-6 text-pink-400 shrink-0 mt-0.5" strokeWidth={1.75} />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">Privacy Shield</p>
              <p className="text-[11px] text-blue-200 leading-snug">Photo &amp; contact lock protection</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-2xl border border-white/10">
            <Sparkles className="w-6 h-6 text-[#DB1866] shrink-0 mt-0.5" strokeWidth={1.75} />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">Vedic Kundali Milan</p>
              <p className="text-[11px] text-blue-200 leading-snug">36 Gunas horoscope matching</p>
            </div>
          </div>

        </div>

        {/* ── 3. Streamlined Essential Link Columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
          
          {/* Column 1: Quick Links */}
          <div className="space-y-3.5 bg-white/5 p-6 rounded-2xl border border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-widest text-pink-400 pb-2 border-b border-white/10 flex items-center gap-1.5">
              <span>Quick Explore</span>
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-xs text-blue-200 hover:text-white hover:translate-x-1 flex items-center gap-1.5 transition-all font-medium group"
                  >
                    <ChevronRight className="w-3 h-3 text-pink-400/60 group-hover:text-pink-400 transition-colors shrink-0" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Community Mission & Policies */}
          <div className="space-y-3.5 bg-white/5 p-6 rounded-2xl border border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-widest text-pink-400 pb-2 border-b border-white/10 flex items-center gap-1.5">
              <span>Community &amp; Legal Policies</span>
            </h4>
            <ul className="space-y-2.5">
              {helpAndPolicies.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-xs text-blue-200 hover:text-white hover:translate-x-1 flex items-center gap-1.5 transition-all font-medium group"
                  >
                    <ChevronRight className="w-3 h-3 text-pink-400/60 group-hover:text-pink-400 transition-colors shrink-0" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── 4. Centered Bottom Legal & Disclaimer Bar ── */}
        <div className="border-t border-white/10 pt-6 text-center space-y-2 text-xs text-blue-300/80">
          <p className="flex items-center justify-center gap-1.5 font-medium">
            <span>🚩</span>
            <span>Dedicated with honor to Maratha families across Karnataka &amp; Worldwide</span>
          </p>
          <p className="text-[11px] text-blue-300/60 max-w-2xl mx-auto">
            Disclaimer: Maratha Matrimony (ಮರಾಠ ಲಗ್ನ) is strictly an authentic matrimonial matchmaking service for families seeking life partners. Not a dating or casual networking app.
          </p>
          <p className="text-[11px] text-blue-400 pt-1 font-medium">
            &copy; {new Date().getFullYear()} Maratha Matrimony. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default AppFooter;
