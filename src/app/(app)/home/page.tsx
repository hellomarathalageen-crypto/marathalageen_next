"use client";

import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  HeadphonesIcon,
  Heart,
  Search,
  ChevronRight,
  PlayCircle,
  Star,
  Bell,
  ArrowRight,
  Crown,
} from "lucide-react";
import ProfileCard from "@/components/ui/ProfileCard";

// ── Sample data ──────────────────────────────────────────────────────────────
const featuredProfiles = [
  { id: 1, name: "Priyanka S.", age: 27, height: "5'4\"", city: "Bangalore", education: "B.Com, MBA", profession: "HR Professional", matchPercent: 92, isVerified: true, community: "Maratha" },
  { id: 2, name: "Sakshi P.", age: 25, height: "5'3\"", city: "Mysore", education: "B.E. Mech", profession: "Software Engineer", matchPercent: 89, isVerified: true, community: "Maratha" },
  { id: 3, name: "Rutuja K.", age: 28, height: "5'5\"", city: "Pune", education: "CA", profession: "Auditor", matchPercent: 87, isVerified: true, community: "Maratha" },
  { id: 4, name: "Aishwarya M.", age: 26, height: "5'6\"", city: "Bangalore", education: "BBA, MBA", profession: "Business Analyst", matchPercent: 85, isVerified: true, community: "Maratha" },
  { id: 5, name: "Snehal P.", age: 27, height: "5'2\"", city: "Nashik", education: "B.Sc Mktg", profession: "Marketing Executive", matchPercent: 83, isVerified: true, community: "Maratha" },
];

const successStories = [
  { id: 1, names: "Sneha & Pratik", city: "Pune, Maharashtra", quote: "Maratha Matrimony helped us find each other at the perfect time. We're forever grateful.", img: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop" },
  { id: 2, names: "Rutuja & Abhishek", city: "Nagpur, Maharashtra", quote: "The trust, the matches, the support — everything felt so personal and meaningful.", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop" },
  { id: 3, names: "Kiran & Manasi", city: "Kolhapur, Maharashtra", quote: "We found not just a life partner, but a best friend for life. Thank you Maratha Matrimony!", img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop" },
];

const howItWorks = [
  { step: 1, title: "Create Your Profile", desc: "Register in minutes with basic details. It's completely free.", icon: "👤" },
  { step: 2, title: "Get Verified", desc: "Upload your ID and photo for the verified profile badge.", icon: "✅" },
  { step: 3, title: "Explore Matches", desc: "Browse curated matches based on your preferences.", icon: "💑" },
  { step: 4, title: "Send Interest", desc: "Connect with profiles that match your expectations.", icon: "💌" },
  { step: 5, title: "Start Your Journey", desc: "Chat, meet, and begin your happily ever after.", icon: "💕" },
];

const whyChooseUs = [
  { icon: ShieldCheck, title: "100% Verified Profiles", desc: "Every profile is manually reviewed and ID-verified before going live." },
  { icon: Users, title: "Maratha Community", desc: "Exclusively built for Maratha families across Karnataka & Maharashtra." },
  { icon: CheckCircle2, title: "Privacy First", desc: "You decide who sees your photos, contact, and personal details." },
  { icon: HeadphonesIcon, title: "Expert Support", desc: "Our relationship managers are available to assist you throughout." },
];

const membershipPlans = [
  {
    name: "Free",
    price: "₹0",
    period: "Lifetime",
    icon: "👤",
    features: ["Create Profile", "Browse Profiles", "Express Interest (Limited)", "Basic Filters", "Receive Interests (Limited)"],
    cta: "Get Started",
    ctaStyle: "border border-[#FADADF] text-[#173F73] hover:bg-[#FFF1F5]",
    popular: false,
  },
  {
    name: "Premium",
    price: "₹999",
    period: "3 Months",
    icon: "💎",
    features: ["Everything in Free", "View Contact Details", "Send Direct Messages", "Advanced Search Filters", "See Who Viewed Your Profile", "Express Interest (Unlimited)", "Priority Customer Support"],
    cta: "Choose Premium",
    ctaStyle: "bg-[#F34883] text-white hover:bg-[#d93870] shadow-lg shadow-[#F34883]/30",
    popular: true,
  },
  {
    name: "Premium Plus",
    price: "₹1,999",
    period: "3 Months",
    icon: "👑",
    features: ["Everything in Premium", "Profile Highlight", "Featured in Search Results", "Verified Profile Badge", "Personalised Match Suggestions", "Relationship Manager Support", "Early Access to New Features"],
    cta: "Choose Premium Plus",
    ctaStyle: "bg-[#173F73] text-white hover:bg-[#0E2F63]",
    popular: false,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FFF1F5]">

      {/* ──────────── HERO ──────────── */}
      <section className="relative bg-white overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -right-20 top-0 w-[600px] h-[600px] opacity-[0.07]">
            <svg viewBox="0 0 600 600" fill="none">
              <path d="M300 0C300 0 400 200 600 300C400 400 300 600 300 600C300 600 200 400 0 300C200 200 300 0 300 0Z" fill="#F34883" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-64px)] py-12 lg:py-0">
            {/* Left: Text */}
            <div className="max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#FFF1F5] border border-[#FADADF] text-[#F34883] text-xs font-bold px-3 py-1.5 rounded-full mb-6">
                <Bell className="w-3 h-3" />
                Limited Pre-Registration Open — Join Now!
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold font-serif text-[#173F73] leading-[1.1] mb-5">
                Where Trust<br />
                Meets <span className="text-[#F34883]">Togetherness</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                A premium matrimonial platform for Maratha Brides and Grooms. Trusted by thousands of Maratha families across Karnataka and Maharashtra.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/signup" className="flex items-center justify-center gap-2 bg-[#F34883] hover:bg-[#d93870] text-white font-bold px-7 py-4 rounded-xl shadow-lg shadow-[#F34883]/30 transition-all hover:-translate-y-0.5">
                  <Users className="w-5 h-5" /> Create Profile
                </Link>
                <Link href="/search" className="flex items-center justify-center gap-2 border-2 border-[#FADADF] text-[#173F73] font-bold px-7 py-4 rounded-xl hover:border-[#F34883] hover:text-[#F34883] transition-all hover:-translate-y-0.5 bg-white">
                  <Search className="w-5 h-5" /> Search Matches
                </Link>
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <ShieldCheck className="w-4 h-4" />, text: "Privacy Protected" },
                  { icon: <CheckCircle2 className="w-4 h-4" />, text: "Verified Profiles" },
                  { icon: <Users className="w-4 h-4" />, text: "Maratha Only" },
                  { icon: <Star className="w-4 h-4" />, text: "10,000+ Families" },
                ].map((pill) => (
                  <span key={pill.text} className="inline-flex items-center gap-1.5 bg-white border border-[#FADADF] text-[#173F73] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                    <span className="text-[#F34883]">{pill.icon}</span> {pill.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-[#F34883]/10 border border-[#FADADF] aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=750&fit=crop&crop=faces"
                    alt="Maratha Couple"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#173F73]/40 via-transparent to-transparent" />
                </div>
                {/* Floating badge */}
                <div className="absolute -left-8 bottom-20 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-[#FADADF]">
                  <div className="flex -space-x-2">
                    {[11, 12, 13, 14].map((i) => (
                      <img key={i} src={`https://i.pravatar.cc/32?img=${i}`} alt="" className="w-8 h-8 rounded-full border-2 border-white" />
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#173F73]">Trusted by</p>
                    <p className="text-xs text-gray-500">Thousands of Maratha Families</p>
                  </div>
                </div>
                {/* Verified badge */}
                <div className="absolute -right-4 top-20 bg-[#F34883] rounded-2xl shadow-lg p-3 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-white" />
                  <div>
                    <p className="text-white text-[11px] font-bold leading-none">100% Verified</p>
                    <p className="text-white/80 text-[10px] leading-none">Profiles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── TRUST STRIP ──────────── */}
      <section className="bg-[#173F73] py-5">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-x divide-white/10">
            {[
              { icon: <ShieldCheck className="w-5 h-5" />, title: "100% Verified Profiles", sub: "Real people. Real connections." },
              { icon: <CheckCircle2 className="w-5 h-5" />, title: "Privacy Our Priority", sub: "Your data is safe with us." },
              { icon: <Users className="w-5 h-5" />, title: "Maratha Community", sub: "Built for our community." },
              { icon: <HeadphonesIcon className="w-5 h-5" />, title: "Expert Support", sub: "We're here to help you." },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 px-4 first:pl-0">
                <span className="text-[#F34883] shrink-0">{item.icon}</span>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">{item.title}</p>
                  <p className="text-blue-200 text-xs">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── QUICK SEARCH ──────────── */}
      <section className="bg-white py-8 border-b border-[#FADADF]">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="bg-[#FFF1F5] rounded-2xl p-5 border border-[#FADADF] shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#173F73] uppercase tracking-wider">I am looking for a</label>
                <select className="w-full h-11 px-3 rounded-xl border border-[#FADADF] bg-white text-sm font-medium focus:outline-none focus:border-[#F34883] focus:ring-2 focus:ring-[#F34883]/20">
                  <option>Bride</option>
                  <option>Groom</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#173F73] uppercase tracking-wider">Age</label>
                <select className="w-full h-11 px-3 rounded-xl border border-[#FADADF] bg-white text-sm font-medium focus:outline-none focus:border-[#F34883] focus:ring-2 focus:ring-[#F34883]/20">
                  <option>21 – 35</option>
                  <option>25 – 40</option>
                  <option>30 – 45</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#173F73] uppercase tracking-wider">Location</label>
                <select className="w-full h-11 px-3 rounded-xl border border-[#FADADF] bg-white text-sm font-medium focus:outline-none focus:border-[#F34883] focus:ring-2 focus:ring-[#F34883]/20">
                  <option>Bangalore, Karnataka</option>
                  <option>Pune, Maharashtra</option>
                  <option>Mumbai, Maharashtra</option>
                  <option>Nagpur, Maharashtra</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#173F73] uppercase tracking-wider">Community</label>
                <select className="w-full h-11 px-3 rounded-xl border border-[#FADADF] bg-white text-sm font-medium focus:outline-none focus:border-[#F34883] focus:ring-2 focus:ring-[#F34883]/20">
                  <option>Maratha</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Link href="/search" className="flex items-center gap-2 bg-[#F34883] hover:bg-[#d93870] text-white font-bold px-8 py-3 rounded-xl shadow-sm shadow-[#F34883]/30 transition-all">
                <Search className="w-4 h-4" /> Find Matches
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── FEATURED PROFILES ──────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold font-serif text-[#173F73] mb-1">Featured Profiles</h2>
              <p className="text-gray-500 text-sm">Handpicked verified Maratha profiles just for you</p>
            </div>
            <Link href="/search" className="text-[#F34883] font-bold text-sm hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredProfiles.map((p) => (
              <ProfileCard key={p.id} {...p} variant="grid" />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── HOW IT WORKS ──────────── */}
      <section className="py-16 bg-[#173F73]" id="how-it-works">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif text-white mb-3">How It Works?</h2>
            <p className="text-blue-200 text-sm">Find your perfect match in just a few simple steps</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0 max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] border-t-2 border-dashed border-white/20" />
            {howItWorks.map((item, idx) => (
              <div key={item.step} className="relative z-10 flex flex-col items-center text-center w-full md:w-[18%] px-2">
                <div className="w-20 h-20 bg-[#0a3579] rounded-full border border-white/20 flex items-center justify-center shadow-lg mb-4 relative">
                  <span className="text-3xl">{item.icon}</span>
                  <div className="absolute -bottom-2 w-6 h-6 bg-[#F34883] rounded-full text-white text-xs font-bold flex items-center justify-center border-2 border-[#173F73]">
                    {item.step}
                  </div>
                </div>
                <h4 className="font-bold text-white text-sm mb-2">{item.title}</h4>
                <p className="text-xs text-blue-200 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── WHY CHOOSE US ──────────── */}
      <section className="py-16 bg-[#FFF1F5]" id="why-us">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif text-[#173F73] mb-3">
              Why Choose <span className="text-[#F34883]">Maratha Matrimony?</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">We prioritize your safety, privacy, and happiness to deliver a matchmaking experience unlike any other.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-[#FADADF] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#FFF1F5] flex items-center justify-center mb-4 mx-auto group-hover:bg-[#F34883] transition-colors">
                  <Icon className="w-7 h-7 text-[#F34883] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-[#173F73] mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── SUCCESS STORIES ──────────── */}
      <section className="py-16 bg-white" id="success-stories">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold font-serif text-[#173F73] mb-1">Success Stories</h2>
              <p className="text-gray-500 text-sm">Real people. Real stories. Real happiness.</p>
            </div>
            <Link href="/success-stories" className="text-[#F34883] font-bold text-sm hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story) => (
              <div key={story.id} className="bg-[#FFF1F5] rounded-2xl overflow-hidden border border-[#FADADF] group hover:shadow-md transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img src={story.img} alt={story.names} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-bold text-sm">{story.names}</p>
                    <p className="text-white/70 text-xs">{story.city}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm italic leading-relaxed">
                    <span className="text-[#F34883] text-2xl font-serif leading-none">"</span>
                    {story.quote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── MEMBERSHIP PREVIEW ──────────── */}
      <section className="py-16 bg-[#FFF1F5]" id="membership">
        <div className="container mx-auto max-w-5xl px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold font-serif text-[#173F73] mb-2">Premium Memberships</h2>
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="h-px w-16 bg-[#F34883]" />
            <Heart className="w-4 h-4 text-[#F34883]" fill="currentColor" />
            <div className="h-px w-16 bg-[#F34883]" />
          </div>
          <p className="text-gray-500 mb-12 text-sm">Choose the plan that helps you connect with the one who completes your world.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipPlans.map((plan) => (
              <div key={plan.name} className={`relative bg-white rounded-2xl border p-7 text-left ${plan.popular ? "border-[#173F73] shadow-2xl shadow-[#173F73]/10 scale-105" : "border-[#FADADF] shadow-sm"}`}>
                {plan.popular && (
                  <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                    <span className="bg-[#173F73] text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <Crown className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}
                <div className="text-3xl mb-3">{plan.icon}</div>
                <h3 className={`text-xl font-bold mb-1 ${plan.popular ? "text-[#F34883]" : "text-[#173F73]"}`}>{plan.name}</h3>
                <p className="text-3xl font-black text-[#173F73] mb-1">
                  {plan.price} <span className="text-sm font-normal text-gray-400">/ {plan.period}</span>
                </p>
                <ul className="space-y-2.5 my-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-[#F34883] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/membership" className={`block w-full text-center py-3 rounded-xl text-sm font-bold transition-all ${plan.ctaStyle}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── CTA BANNER ──────────── */}
      <section className="py-16 bg-[#F34883]">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-16 bg-white/40" />
            <Heart className="w-5 h-5 text-white" fill="currentColor" />
            <div className="h-px w-16 bg-white/40" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4">
            "Two hearts. One journey. A lifetime of togetherness."
          </h2>
          <p className="text-pink-100 mb-8 text-base">Start your journey today. Your perfect match is waiting.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-white text-[#F34883] hover:bg-pink-50 font-bold px-8 py-4 rounded-xl shadow-lg transition-all hover:-translate-y-0.5">
            <Users className="w-5 h-5" /> Create Your Profile — It's Free!
          </Link>
        </div>
      </section>

    </div>
  );
}
