import Link from "next/link";
import { ArrowLeft, ShieldCheck, Crown, Sparkles, CheckCircle2 } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FFFDFB] flex">
      {/* Left Column: Premium Maratha Branding (Desktop only) */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[#1B2559] relative overflow-hidden p-10 text-white">
        
        {/* Background Image with Rich Royal Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/hero.webp" 
            alt="Maratha Matrimony Couple" 
            className="w-full h-full object-cover object-top filter saturate-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B2559]/90 via-[#1B2559]/80 to-[#1B2559]/95" />
        </div>

        {/* Brand Logo in Snug, Elegant Container */}
        <div className="relative z-10">
          <Link href="/home" className="inline-block group">
            <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl inline-flex items-center shadow-md border border-white/20 transition-transform group-hover:scale-105">
              <img 
                src="/logo.png" 
                alt="Maratha Lageen Logo" 
                className="h-9 sm:h-10 w-auto object-contain" 
              />
            </div>
          </Link>
        </div>

        {/* Stately Copy & Trust Metrics */}
        <div className="relative z-10 mb-6 space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#DB1866] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md">
            <Crown className="w-3.5 h-3.5 fill-amber-300 text-amber-300" /> #1 Trusted Maratha Community Network
          </div>

          <h1 className="text-3xl xl:text-4xl font-sans font-extrabold leading-[1.18] tracking-tight">
            Honoring Sacred Lineage, <br />
            <span className="text-[#f9a8d4]">Connecting Destined Souls.</span>
          </h1>

          <p className="text-blue-100 text-sm leading-relaxed max-w-md font-medium">
            Karnataka &amp; Maharashtra&apos;s premier matrimonial platform for 96 Kuli Maratha families. Featuring authentic Devak, Gotra, and 36 Gunas Kundali matching.
          </p>
          
          {/* Trust Stat Boxes */}
          <div className="grid grid-cols-2 gap-3.5 pt-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="flex items-center gap-1.5 text-amber-300 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xl font-sans font-bold text-white">1,000+</span>
              </div>
              <p className="text-xs text-blue-200 font-medium">Govt ID Verified Profiles</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="flex items-center gap-1.5 text-pink-300 mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-xl font-sans font-bold text-white">100%</span>
              </div>
              <p className="text-xs text-blue-200 font-medium">Photo &amp; Contact Shield</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-blue-200/90 pt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Over 5,000+ Maratha families trust Maratha Lageen</span>
          </div>
        </div>

      </div>

      {/* Right Column: Form Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Header Bar */}
        <div className="p-6 md:p-8 flex justify-between items-center">
          
          {/* Mobile Logo from landing page (hidden on desktop to avoid duplicate logo) */}
          <Link href="/home" className="lg:hidden flex items-center gap-2 pl-1">
            <img 
              src="/logo.png" 
              alt="Maratha Lageen Logo" 
              className="h-10 sm:h-11 w-auto object-contain transition-transform" 
            />
          </Link>
          
          <Link 
            href="/home" 
            className="text-xs sm:text-sm font-sans font-bold text-[#1B2559] hover:text-[#DB1866] flex items-center gap-1.5 transition-colors ml-auto bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-full border border-gray-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </div>
        
        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center max-w-[460px] w-full mx-auto px-6 pb-16">
          {children}
        </div>

      </div>
    </div>
  );
}
