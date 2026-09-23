"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Phone, Crown, Lock, ChevronRight, Sparkles } from "lucide-react";

const quickLinks = [
  { label: "Search Candidates", href: "/search" },
  { label: "My Matches", href: "/matches" },
  { label: "Saved Shortlist", href: "/shortlist" },
  { label: "36 Gunas Kundali Matcher", href: "/kundali" },
  { label: "Printable Royal Biodata", href: "/biodata" },
  { label: "Vadhu-Var Melavas", href: "/events" },
  { label: "About Maratha Lageen", href: "/#about" },
  { label: "VIP Membership Plans", href: "/membership" },
];

const regionalLinks = [
  { label: "Belagavi Maratha Matrimony", href: "/search?city=Belagavi" },
  { label: "Pune Maratha Vadhu Var", href: "/search?city=Pune" },
  { label: "Kolhapur Maratha Samaj", href: "/search?city=Kolhapur" },
  { label: "Bengaluru Maratha Network", href: "/search?city=Bengaluru" },
  { label: "Hubballi-Dharwad Matches", href: "/search?city=Hubballi" },
  { label: "Satara & Sangli Lineage", href: "/search?city=Satara" },
];

const professionLinks = [
  { label: "Software & IT Engineers", href: "/search?keyword=Software" },
  { label: "Doctors & Healthcare (MBBS)", href: "/search?keyword=Doctor" },
  { label: "Govt & Civil Services (UPSC)", href: "/search?keyword=Govt" },
  { label: "Business & Entrepreneurs", href: "/search?keyword=Business" },
  { label: "Panchpallav & Suryakant Devak", href: "/search?keyword=Panchpallav" },
  { label: "Kalamb & Garud Devak", href: "/search?keyword=Kalamb" },
];

const helpAndPolicies = [
  { label: "Contact Relationship Team", href: "/#contact" },
  { label: "Safety Guidelines & Fraud Alerts", href: "/help#safety" },
  { label: "Privacy & Data Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund & Cancellation Policy", href: "/refund" },
  { label: "About Our Community Mission", href: "/#about" },
];

const socialLinks = [
  { 
    href: "#", 
    label: "Facebook",
    Icon: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
  },
  { 
    href: "#", 
    label: "Instagram",
    Icon: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  },
  { 
    href: "#", 
    label: "YouTube",
    Icon: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
  },
  { 
    href: "#", 
    label: "LinkedIn",
    Icon: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
  },
];

export default function AppFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard/chat")) return null;

  return (
    <footer className="bg-[#121A3D] text-white pt-14 pb-12 border-t-4 border-[#DB1866] relative overflow-hidden font-sans print:hidden">
      
      {/* Ambient Lighting Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#DB1866]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        
        {/* ── Starting 2 Sections: LEFT (Brand & Helpline) & RIGHT (4 Trust Badges in 2x2 Grid) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pb-12 mb-12 border-b border-white/10">
          
          {/* Left Column: Brand Identity, Mission, Social & Helpline (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Prominent Visible Logo from landing page */}
            <div>
              <Link href="/home" className="inline-block group">
                <div className="bg-white px-4 py-1.5 rounded-xl shadow-lg transition-transform group-hover:scale-105 inline-flex items-center justify-center border border-white/20">
                  <img 
                    src="/logo.png" 
                    alt="Maratha Lageen Logo" 
                    className="h-11 sm:h-12 w-auto object-contain transition-transform" 
                  />
                </div>
              </Link>
            </div>

            <p className="text-amber-300 font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" /> 🚩 Jai Jijau, Jai Shivray 🚩
            </p>

            <p className="text-blue-100/90 text-xs sm:text-sm leading-relaxed max-w-xl font-normal">
              Karnataka &amp; Maharashtra&apos;s #1 trusted matrimonial platform for the 96 Kuli Maratha community. Dedicated to preserving authentic clan lineage, Devak, Gotra, and sacred 36 Gunas Kundali compatibility.
            </p>

            {/* Social Channels & Helpline */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
              
              {/* Helpline Pill */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 text-xs">
                <Phone className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span className="font-bold text-white">Helpline:</span>
                <a href="tel:+919822012345" className="font-mono font-bold text-amber-300 hover:text-amber-200 transition-colors">
                  +91 98220 12345
                </a>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300/80 mr-1">Connect:</span>
                {socialLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#DB1866] flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>

            </div>

          </div>

          {/* Right Column: 4 Trust Badges in a 2x2 Grid (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            <div className="flex items-start gap-3 bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-2xl border border-white/10">
              <ShieldCheck className="w-7 h-7 text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.75} />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">100% ID Verified</p>
                <p className="text-[11px] text-blue-200 leading-snug">Govt ID &amp; mobile checked profiles</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-2xl border border-white/10">
              <Crown className="w-7 h-7 text-amber-400 shrink-0 mt-0.5" strokeWidth={1.75} />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">96 Kuli Lineage</p>
                <p className="text-[11px] text-blue-200 leading-snug">Authentic Devak &amp; Gotra</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-2xl border border-white/10">
              <Lock className="w-7 h-7 text-pink-400 shrink-0 mt-0.5" strokeWidth={1.75} />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">Privacy Shield</p>
                <p className="text-[11px] text-blue-200 leading-snug">Photo &amp; contact lock</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-2xl border border-white/10">
              <Sparkles className="w-7 h-7 text-[#DB1866] shrink-0 mt-0.5" strokeWidth={1.75} />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">36 Gunas Milan</p>
                <p className="text-[11px] text-blue-200 leading-snug">Vedic horoscope compatibility</p>
              </div>
            </div>

          </div>

        </div>

        {/* ── 3. Rest of Footer: Spacious 4-Column Directory ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
          
          {/* Column 1: Quick Explore */}
          <div className="space-y-3.5">
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

          {/* Column 2: Regional Matrimony */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-pink-400 pb-2 border-b border-white/10 flex items-center gap-1.5">
              <span>Regional Matrimony</span>
            </h4>
            <ul className="space-y-2.5">
              {regionalLinks.map(({ label, href }) => (
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

          {/* Column 3: Profession & Clan */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-pink-400 pb-2 border-b border-white/10 flex items-center gap-1.5">
              <span>Professions &amp; Clan</span>
            </h4>
            <ul className="space-y-2.5">
              {professionLinks.map(({ label, href }) => (
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

          {/* Column 4: Help & Policies */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-pink-400 pb-2 border-b border-white/10 flex items-center gap-1.5">
              <span>Help &amp; Policies</span>
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

        {/* ── 4. Centered Popular Searches Badges ── */}
        <div className="border-t border-white/10 pt-8 pb-8 text-center space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-pink-300">
            Popular Maratha Matrimonial Searches:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {[
              "Maratha Vadhu Var Suchak Mandal",
              "96 Kuli Maratha Vivah",
              "Karnataka Maratha Samaj",
              "Belagavi Maratha Matrimony",
              "Pune Maratha Lageen",
              "Kolhapur Maratha Brides",
              "Bengaluru Maratha Grooms",
              "36 Gunas Kundali Milan",
              "Panchpallav Devak Maratha",
              "Suryakant Devak Vivah",
              "Authentic Maratha Biodata PDF",
            ].map((tag) => (
              <span key={tag} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[11px] text-blue-200 hover:text-white hover:border-[#DB1866] transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── 5. Centered Bottom Legal & Disclaimer Bar ── */}
        <div className="border-t border-white/10 pt-6 text-center space-y-2 text-xs text-blue-300/80">
          <p className="flex items-center justify-center gap-1.5 font-medium">
            <span>🚩</span>
            <span>Dedicated with honor to Maratha families across Karnataka, Maharashtra &amp; Worldwide</span>
          </p>
          <p className="text-[11px] text-blue-300/60 max-w-2xl mx-auto">
            Disclaimer: Maratha Matrimony is strictly an authentic matrimonial matchmaking service for families seeking life partners. Not a dating or casual networking app.
          </p>
          <p className="text-[11px] text-blue-400 pt-1">
            &copy; {new Date().getFullYear()} Maratha Matrimony. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
