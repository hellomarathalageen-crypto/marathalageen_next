"use client";

import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  HeadphonesIcon,
  Search,
  ArrowRight,
  MessageCircle,
  Heart,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";

// ── Sample data ──────────────────────────────────────────────────────────────
const featuredProfiles = [
  { id: 1, name: "Priyanka S.", age: 28, height: "5'4\"", city: "Bangalore", education: "B.Com, MBA", profession: "HR Professional", isVerified: true, photo: "https://i.pravatar.cc/300?img=1" },
  { id: 2, name: "Sakshi P.", age: 26, height: "5'3\"", city: "Mysore", education: "B.E. M.Tech", profession: "Software Engineer", isVerified: true, photo: "https://i.pravatar.cc/300?img=2" },
  { id: 3, name: "Rutuja K.", age: 27, height: "5'5\"", city: "Pune", education: "CA", profession: "Auditor", isVerified: true, photo: "https://i.pravatar.cc/300?img=3" },
  { id: 4, name: "Aishwarya M.", age: 29, height: "5'6\"", city: "Bangalore", education: "BBA, MBA", profession: "Business Analyst", isVerified: true, photo: "https://i.pravatar.cc/300?img=4" },
  { id: 5, name: "Snehal P.", age: 25, height: "5'2\"", city: "Nashik", education: "B.Sc, MBA", profession: "Marketing Executive", isVerified: true, photo: "https://i.pravatar.cc/300?img=5" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FFFDFB]">

      {/* ──────────── HERO SECTION ──────────── */}
      <section className="bg-white overflow-hidden">

        {/* ── MOBILE HERO (hidden on lg) ── */}
        <div className="lg:hidden relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
          <img
            src="/hero.jpg"
            alt="Maratha Couple"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001a4d] via-[#2A3773]/90 to-transparent via-60%" />

          <div className="relative z-10 px-5 pb-32 pt-28 text-white text-center">
            <div className="inline-flex items-center gap-2 bg-[#DB1866] text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 shadow-lg">
              <Heart className="w-3 h-3 fill-white" /> Welcome Back!
            </div>

            <h1 className="text-[34px] font-medium leading-[1.1] tracking-tight mb-3 drop-shadow-lg font-sans">
              Where Trust<br />
              Meets <span className="text-[#f9a8d4] font-semibold">Togetherness</span>
            </h1>

            <p className="text-blue-50 text-[14px] leading-relaxed mb-5 drop-shadow-md font-medium">
              A premium matrimonial platform for Maratha Brides and Grooms across India.
            </p>

          </div>
        </div>

        {/* ── DESKTOP HERO (hidden on mobile) ── */}
        <div className="hidden lg:flex relative h-[calc(100vh-80px)] max-h-[700px] items-center">
          {/* Background Image full width with overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/hero.jpg"
              alt="Maratha Couple"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
          </div>

          {/* Desktop text content */}
          <div className="container mx-auto max-w-7xl px-8 relative z-10 pt-16 flex flex-col items-center text-center">
            <div className="max-w-[650px] flex flex-col items-center">
              <div className="inline-flex items-center gap-2 bg-white border border-[#FADADF] text-[#DB1866] text-xs font-bold px-4 py-2 rounded-full mb-8 shadow-sm">
                <Heart className="w-3.5 h-3.5 fill-[#DB1866]" /> Welcome back to Maratha Matrimony
              </div>

              <h1 className="text-[58px] font-medium text-[#2A3773] leading-[1.1] mb-6 tracking-tight font-sans">
                Where Trust<br />
                Meets <span className="text-[#DB1866] font-semibold">Togetherness</span>
              </h1>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-lg">
                A trusted platform for Maratha families — verified profiles, privacy-first, and genuine connections across India.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* ──────────── TRUST STRIP & SEARCH BAR COMBINED ──────────── */}
      <section className="relative z-20 -mt-24 pb-16">
        <div className="container mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="rounded-2xl shadow-2xl shadow-[#2A3773]/10 flex flex-col">
            
            {/* Top Navy Trust Strip */}
            <div className="bg-[#2A3773] rounded-t-2xl py-5 px-6 lg:px-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 divide-x divide-white/10">
                {[
                  { icon: ShieldCheck, title: "100% Verified Profiles", sub: "Real people. Real connections." },
                  { icon: CheckCircle2, title: "Privacy Our Priority", sub: "Your data is safe with us." },
                  { icon: Users, title: "Maratha Community", sub: "Built for our community." },
                  { icon: HeadphonesIcon, title: "Expert Support", sub: "We're here to help you." },
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-3 ${idx !== 0 ? 'pl-6 lg:pl-10' : ''}`}>
                    <item.icon className="w-8 h-8 text-[#DB1866] shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-white text-sm font-bold">{item.title}</p>
                      <p className="text-blue-200 text-xs mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom White Search Bar */}
            <div className="bg-white rounded-b-2xl px-6 py-6 flex flex-col lg:flex-row items-center gap-4 border-x border-b border-[#FADADF]">
              
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                
                <div className="flex flex-col relative px-4 py-2 md:py-0">
                  <div className="absolute left-4 top-8 text-[#DB1866]/70"><User className="w-4 h-4" /></div>
                  <label className="text-[10px] font-bold text-gray-500 mb-1 ml-6">I am looking for a</label>
                  <select className="w-full h-8 pl-6 pr-4 bg-transparent text-[13px] font-bold text-[#23344D] appearance-none focus:outline-none cursor-pointer">
                    <option>Bride</option>
                    <option>Groom</option>
                  </select>
                </div>
                
                <div className="flex flex-col relative px-4 py-2 md:py-0">
                  <label className="text-[10px] font-bold text-gray-500 mb-1">Age</label>
                  <select className="w-full h-8 bg-transparent text-[13px] font-bold text-[#23344D] appearance-none focus:outline-none cursor-pointer">
                    <option>21 - 35</option>
                    <option>25 - 40</option>
                  </select>
                </div>

                <div className="flex flex-col relative px-4 py-2 md:py-0">
                  <div className="absolute left-4 top-8 text-[#DB1866]/70"><Search className="w-4 h-4" /></div>
                  <label className="text-[10px] font-bold text-gray-500 mb-1 ml-6">Location</label>
                  <select className="w-full h-8 pl-6 pr-4 bg-transparent text-[13px] font-bold text-[#23344D] appearance-none focus:outline-none cursor-pointer">
                    <option>Bangalore, Karnataka</option>
                    <option>Pune, Maharashtra</option>
                  </select>
                </div>

                <div className="flex flex-col relative px-4 py-2 md:py-0">
                  <label className="text-[10px] font-bold text-gray-500 mb-1">Community</label>
                  <select className="w-full h-8 bg-transparent text-[13px] font-bold text-[#23344D] appearance-none focus:outline-none cursor-pointer">
                    <option>Maratha</option>
                  </select>
                </div>
              </div>

              <div className="shrink-0 w-full lg:w-auto mt-2 lg:mt-0 px-4 md:px-0">
                <Link href="/search" className="w-full flex items-center justify-center gap-2 bg-[#DB1866] hover:bg-[#B81456] text-white font-bold px-10 h-[50px] rounded-[14px] shadow-sm transition-all hover:-translate-y-0.5">
                  <Search className="w-4 h-4" /> Find Matches
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ──────────── FEATURED PROFILES & SUCCESS STORIES (Side by Side) ──────────── */}
      <section className="py-10 bg-white">
        <div className="container mx-auto max-w-[1500px] px-4 md:px-8">
          <div className="flex flex-col xl:flex-row gap-10">
            
            {/* Left: Featured Profiles */}
            <div className="flex-[3]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-sans text-[#2A3773]">Featured Profiles</h2>
                <Link href="/search" className="text-[#DB1866] font-bold text-xs hover:underline flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
                {featuredProfiles.map((p) => (
                  <div key={p.id} className="bg-[#FFFDFB] rounded-[16px] border border-[#FADADF] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    <Link href={`/profile/${p.id}`} className="block relative aspect-square p-1.5">
                      <img src={p.photo} alt={p.name} className="w-full h-full object-cover rounded-t-[12px] rounded-b-[4px]" />
                    </Link>
                    <div className="p-3 pt-2">
                      <div className="flex items-center gap-1 mb-1">
                        <p className="font-bold text-[#2A3773] text-[13px] truncate">{p.name}</p>
                        {p.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-[#DB1866] shrink-0" fill="currentColor" stroke="white" />}
                      </div>
                      <p className="text-[9px] text-[#6B7280] leading-[1.4] mb-2 font-medium">
                        {p.age} Yrs • {p.height}<br/>
                        {p.city}<br/>
                        {p.education}<br/>
                        {p.profession}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <button className="text-gray-400 hover:text-[#DB1866] transition-colors">
                          <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                        <button className="text-[#DB1866] hover:bg-[#FFF1F5] rounded-full transition-colors">
                          <Heart className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Success Stories Slider */}
            <div className="flex-[1.5]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-sans text-[#2A3773]">Success Stories</h2>
                <Link href="/success-stories" className="text-[#DB1866] font-bold text-xs hover:underline flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="relative bg-[#FFFDFB] rounded-[20px] overflow-visible h-full min-h-[300px] flex mx-4 xl:mx-0 mt-8 xl:mt-0 shadow-lg shadow-pink-100">
                {/* Left Arrow */}
                <button className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-[#FADADF] rounded-full shadow-md flex items-center justify-center z-20 text-[#DB1866] hover:bg-[#FFF1F5] transition-colors">
                  <ChevronLeft className="w-4 h-4" strokeWidth={3} />
                </button>
                {/* Right Arrow */}
                <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-[#FADADF] rounded-full shadow-md flex items-center justify-center z-20 text-[#DB1866] hover:bg-[#FFF1F5] transition-colors">
                  <ChevronRight className="w-4 h-4" strokeWidth={3} />
                </button>

                {/* Content */}
                <div className="flex w-full overflow-hidden rounded-[20px]">
                  {/* Photo Side */}
                  <div className="w-1/2 relative h-full min-h-[300px]">
                    <img 
                      src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500&h=600&fit=crop" 
                      alt="Couple" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  {/* Text Side */}
                  <div className="w-1/2 p-6 flex flex-col justify-center relative bg-gradient-to-br from-[#FFF1F5]/80 to-[#FFF1F5]/20">
                    <p className="text-[#2A3773] font-bold text-xl leading-tight font-sans relative z-10">
                      "From a simple profile to a lifetime of love."
                    </p>
                    <p className="text-xs font-semibold text-gray-500 mt-4 relative z-10">
                      - Karan & Pooja
                    </p>
                    
                    {/* Dots indicator */}
                    <div className="absolute bottom-4 right-1/2 translate-x-1/2 flex gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#DB1866]"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
