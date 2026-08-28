import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column: Image / Branding */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[#2A3773] relative overflow-hidden p-10 text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&h=1400&fit=crop" 
            alt="Maratha Matrimony" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A3773]/90 via-[#2A3773]/70 to-[#2A3773]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Heart className="w-5 h-5 text-[#DB1866]" fill="currentColor" />
          </div>
          <div>
            <p className="text-xl font-bold font-sans leading-none">Maratha</p>
            <p className="text-xs text-[#DB1866] font-semibold tracking-wide">Matrimony</p>
          </div>
        </div>

        <div className="relative z-10 mb-10">
          <h1 className="text-4xl font-bold font-sans mb-4 leading-tight">
            Find Your Perfect <br />
            <span className="text-[#DB1866]">Maratha Partner.</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-sm leading-relaxed">
            Join the most trusted matchmaking platform built exclusively for the Maratha community.
          </p>
          
          <div className="mt-8 flex gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <p className="text-2xl font-bold text-white mb-1">10k+</p>
              <p className="text-xs text-blue-200">Verified Profiles</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <p className="text-2xl font-bold text-white mb-1">100%</p>
              <p className="text-xs text-blue-200">Privacy Control</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Form Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="p-6 md:p-8 flex justify-between items-center lg:justify-end">
          {/* Mobile Logo */}
          <Link href="/home" className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FFF1F5] flex items-center justify-center border border-[#FADADF]">
              <Heart className="w-4 h-4 text-[#DB1866]" fill="currentColor" />
            </div>
            <div>
              <p className="text-sm font-bold font-sans text-[#2A3773] leading-none">Maratha</p>
              <p className="text-[10px] text-[#DB1866] font-semibold tracking-wide">Matrimony</p>
            </div>
          </Link>
          
          <Link href="/home" className="text-sm font-semibold text-gray-500 hover:text-[#2A3773] flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
        
        <div className="flex-1 flex flex-col justify-center max-w-[480px] w-full mx-auto px-6 pb-20">
          {children}
        </div>
      </div>
    </div>
  );
}
