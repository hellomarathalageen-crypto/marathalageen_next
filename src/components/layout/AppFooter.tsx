import Link from "next/link";
import { Heart, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

const footerLinks = {
  "Quick Links": [
    { label: "Search", href: "/search" },
    { label: "Matches", href: "/matches" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "About Us", href: "/about" },
    { label: "Premium Membership", href: "/membership" },
  ],
  "Help & Support": [
    { label: "Contact Us", href: "/contact" },
    { label: "Help Center", href: "/help" },
    { label: "Safety Tips", href: "/help#safety" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ],
  Community: [
    { label: "Maratha Community", href: "/about#community" },
    { label: "Events", href: "/events" },
  ],
};

const socialLinks = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Youtube, href: "#", label: "YouTube" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function AppFooter() {
  return (
    <footer className="bg-[#0E2F63] text-white pt-16 pb-8 border-t-4 border-[#F34883]">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/home" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#F34883]" fill="currentColor" />
              </div>
              <div>
                <p className="text-base font-bold font-serif leading-none">Maratha</p>
                <p className="text-xs text-[#F34883] font-semibold leading-none tracking-wide">Matrimony</p>
              </div>
            </Link>
            <p className="text-sm text-blue-200 leading-relaxed mb-6 max-w-xs">
              India's most trusted matrimonial service for the Maratha community. Built on trust, privacy and genuine connections.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F34883] flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-blue-200 hover:text-white transition-colors font-medium"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get the App */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Get the App</h4>
            <p className="text-sm text-blue-200 mb-4">Find matches on the go with our mobile app.</p>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-4 py-2.5 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <p className="text-[10px] text-blue-200 leading-none">Download on the</p>
                  <p className="text-sm font-semibold leading-tight">App Store</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-4 py-2.5 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.32.17.69.19 1.04.06L15.54 12 12 8.46 3.18 23.76M20.09 10.46l-2.88-1.64L13.44 12l3.78 3.78 2.88-1.64c.82-.47.82-1.21-.01-1.68M2.47 1.18A.9.9 0 002.18 2v20a.9.9 0 00.29.82L12 12 2.47 1.18M15.54 12L4.22 1.18c-.36-.14-.73-.11-1.04.06L15.54 12z"/>
                </svg>
                <div>
                  <p className="text-[10px] text-blue-200 leading-none">Get it on</p>
                  <p className="text-sm font-semibold leading-tight">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-300">
          <p className="flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-[#F34883]" fill="currentColor" /> for Maratha Families
          </p>
          <p>© {new Date().getFullYear()} Maratha Matrimony. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
