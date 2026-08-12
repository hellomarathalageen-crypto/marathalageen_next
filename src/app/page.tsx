"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle2, Bell, Heart, ShieldCheck, 
  User, Users, UserPlus, PlayCircle,
  MapPin, Phone, Mail, MessageCircle
} from "lucide-react";

export default function PreRegisterPage() {
  const brandPink = "#D52367";
  const brandBlue = "#002D72";
  const lightPinkBg = "#fdf5f8";

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#D52367]/20 selection:text-[#D52367]">
      {/* Navbar */}
      <header className="absolute lg:sticky top-0 z-50 w-full bg-transparent lg:bg-white lg:border-b lg:border-gray-100 lg:shadow-sm">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="#home" className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-sm lg:bg-transparent lg:p-0 lg:shadow-none">
              <img src="/logo.jpeg" alt="Maratha Lageen Logo" className="h-9 lg:h-12 w-auto object-contain mix-blend-multiply lg:mix-blend-normal" />
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Button className="bg-[#D52367] hover:bg-[#b01d55] text-white rounded-md px-4 py-2 text-sm md:px-6 md:py-5 md:text-base font-bold shadow-md">
              Pre-Register Now
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-white overflow-hidden" id="home">

          {/* ── MOBILE HERO (hidden on lg) ── */}
          <div className="lg:hidden relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
            {/* Background: couple image fills entire section */}
            <img
              src="/hero.jpg"
              alt="Maratha Couple"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            {/* Dark gradient overlay — heavily fading to transparent at the top so the image is 100% clear */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#001a4d] via-[#002D72]/95 to-transparent via-65%" />

            {/* Content sits on top of image, pushed to the bottom */}
            <div className="relative z-10 px-5 pb-8 pt-28 text-white text-center">
              {/* Pulsing launch badge */}
              <div className="inline-flex items-center gap-2 bg-[#D52367] text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 shadow-lg animate-pulse">
                <Bell className="w-3 h-3" /> 🎉 Limited Pre-Registration Open!
              </div>

              <h1 className="text-[34px] font-extrabold leading-[1.1] tracking-tight mb-3 drop-shadow-lg">
                Karnataka's<br/>
                <span className="text-[#f9a8d4] drop-shadow-md">Exclusive Maratha</span><br/>
                Matrimony Platform
              </h1>

              <p className="text-blue-50 text-[14px] leading-relaxed mb-5 drop-shadow-md font-medium">
                Trusted by Maratha families across Karnataka — verified profiles, privacy-first, genuine connections.
              </p>

              {/* Trust pills */}
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                {[
                  { icon: <ShieldCheck className="w-3.5 h-3.5" />, text: "Privacy Protected" },
                  { icon: <CheckCircle2 className="w-3.5 h-3.5" />, text: "Verified Profiles" },
                  { icon: <Users className="w-3.5 h-3.5" />, text: "Maratha Only" },
                ].map((pill, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/25">
                    {pill.icon} {pill.text}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button className="w-full bg-[#D52367] hover:bg-[#b01d55] active:scale-[0.98] text-white font-bold text-base h-14 rounded-xl shadow-2xl shadow-[#D52367]/50 transition-all duration-150">
                Pre-Register Your Family — It's Free!
              </button>
              <p className="text-blue-200/80 text-xs text-center mt-2.5">🔒 Get Premium Membership Worth ₹2,999 FREE</p>
            </div>

            {/* Trust Badges — 2×2 card strip below hero */}
            <div className="relative z-10 grid grid-cols-2 gap-2.5 px-4 py-4 bg-white border-b border-pink-50">
              {[
                { icon: <Users className="w-4 h-4 text-[#D52367]" />, label: "Exclusive to", sub: "Maratha Community" },
                { icon: <ShieldCheck className="w-4 h-4 text-[#D52367]" />, label: "100%", sub: "Privacy Protected" },
                { icon: <CheckCircle2 className="w-4 h-4 text-[#D52367]" />, label: "Verified", sub: "Profiles at Launch" },
                { icon: <Heart className="w-4 h-4 text-[#D52367]" fill="currentColor" />, label: "Free Premium", sub: "Worth ₹2,999" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#fdf5f8] rounded-xl p-3">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm shrink-0">{b.icon}</div>
                  <div>
                    <p className="text-[11px] font-bold text-[#002D72] leading-tight">{b.label}</p>
                    <p className="text-[10px] text-gray-500 leading-tight">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── DESKTOP HERO (hidden on mobile) ── */}
          <div className="hidden lg:flex relative h-[calc(100vh-80px)] max-h-[680px] items-center">
            {/* Background Image right side */}
            <div className="absolute inset-0 left-[38%] z-0">
              <img
                src="/hero.jpg"
                alt="Maratha Couple"
                className="w-full h-full object-cover object-right"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent w-[45%]"></div>
              {/* Floating Badge */}
              <div className="absolute right-[12%] bottom-14 bg-[#D52367] text-white p-5 rounded-2xl flex items-center gap-4 shadow-2xl max-w-[340px]">
                <ShieldCheck className="w-10 h-10 shrink-0" />
                <p className="font-semibold text-sm leading-snug">Built for Maratha Families.<br/>Focused on Genuine Connections.</p>
              </div>
            </div>

            {/* Desktop text content */}
            <div className="container mx-auto px-8 relative z-10">
              <div className="max-w-[560px]">
                <div className="inline-flex items-center gap-2 bg-[#fdf5f8] border border-pink-200 text-[#D52367] text-xs font-bold px-3 py-1.5 rounded-full mb-6">
                  <Bell className="w-3 h-3" /> Limited Pre-Registration Open — Join Now!
                </div>

                <h1 className="text-[54px] font-extrabold text-[#002D72] leading-[1.1] mb-5 tracking-tight">
                  Karnataka's Exclusive<br/>
                  <span className="text-[#D52367]">Maratha Matrimony</span><br/>
                  Platform
                </h1>

                <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-lg">
                  A trusted platform created exclusively for Maratha families across Karnataka — verified profiles, privacy-first registration and genuine connections.
                </p>

                {/* Trust Badges horizontal desktop */}
                <div className="flex items-center gap-5 mb-8 bg-white py-3 px-5 rounded-xl shadow-sm border border-pink-50 w-fit">
                  {[
                    { icon: <Users className="w-5 h-5 text-[#D52367]" />, text: "Exclusive to\nMaratha Community" },
                    { icon: <ShieldCheck className="w-5 h-5 text-[#D52367]" />, text: "100%\nPrivacy Protected" },
                    { icon: <CheckCircle2 className="w-5 h-5 text-[#D52367]" />, text: "Verified Profiles\nat Launch" },
                    { icon: <Heart className="w-5 h-5 text-[#D52367]" fill="currentColor" />, text: "Free Premium\nWorth ₹2,999" },
                  ].map((b, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {i > 0 && <div className="w-px h-8 bg-gray-200 mr-3" />}
                      <div className="bg-[#fdf5f8] p-2 rounded-lg">{b.icon}</div>
                      <span className="text-[12px] font-semibold text-[#002D72] whitespace-pre-line leading-tight">{b.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-4">
                  <Button className="bg-[#D52367] hover:bg-[#b01d55] text-white rounded-xl px-8 h-14 font-bold text-base shadow-lg shadow-[#D52367]/30 hover:scale-105 transition-transform">
                    Pre-Register Your Family
                  </Button>
                  <Button variant="ghost" className="text-[#002D72] hover:text-[#D52367] font-semibold h-14 px-5 rounded-xl border border-gray-200 hover:border-[#D52367] transition-colors">
                    <PlayCircle className="w-5 h-5 mr-2 text-[#D52367]" /> Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Can Pre-Register? */}
        <section className="bg-[#fdf5f8] py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#002D72] mb-12 tracking-tight">Who Can Pre-Register?</h2>
            
            <div className="flex justify-center flex-wrap gap-4 md:gap-8 max-w-4xl mx-auto">
              {[
                { label: "Bride", icon: "/icons/bride.png" },
                { label: "Groom", icon: "/icons/groom.png" },
                { label: "Parents", icon: "/icons/parents.png" },
                { label: "Guardian /\nRelative", icon: "/icons/guardian.png" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center w-40 md:w-48 aspect-square hover:shadow-md transition-shadow cursor-pointer">
                  <img src={item.icon} alt={item.label} className="w-20 h-20 object-contain mb-3" />
                  <span className="font-bold text-[#002D72] text-sm text-center whitespace-pre-line leading-snug">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section className="bg-white py-16" id="register">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              
              {/* Left: Why Should I Pre-Register? */}
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-3xl font-bold text-[#002D72] mb-8 tracking-tight text-center lg:text-left">Why Should I Pre-Register?</h2>
                  <ul className="space-y-6 max-w-[280px] sm:max-w-sm mx-auto lg:max-w-none lg:mx-0">
                    {[
                      { title: "Complimentary Premium Membership", subtitle: "(Worth ₹2,999)" },
                      { title: "Priority Profile Verification", subtitle: "" },
                      { title: "Early Access to Verified Profiles", subtitle: "" },
                      { title: "First Choice Advantage", subtitle: "" },
                      { title: "Dedicated Launch Support", subtitle: "" }
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="bg-[#fdf5f8] p-2 rounded-md shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-[#D52367]" />
                        </div>
                        <div>
                          <p className="font-bold text-[#002D72] leading-tight mt-0.5">{item.title}</p>
                          {item.subtitle && <p className="text-[#D52367] text-sm font-semibold">{item.subtitle}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Family Image Placeholder */}
                <div className="rounded-2xl overflow-hidden aspect-video bg-gray-100">
                  <img 
                    src="/family.png" 
                    alt="Happy Family" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right: Registration Form Card */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-8 md:p-10">
                  <h3 className="text-2xl font-bold text-[#D52367] text-center mb-8">Pre-Register Your Family</h3>
                  
                  {/* Stepper */}
                  <div className="flex justify-between items-center mb-10 text-xs font-bold text-gray-400">
                    <div className="flex flex-col items-center gap-2 text-[#D52367]">
                      <div className="w-8 h-8 rounded-full bg-[#D52367] text-white flex items-center justify-center">1</div>
                      <span>Basic Details</span>
                    </div>
                    <div className="h-px bg-gray-200 flex-1 mx-2 mt-[-20px]"></div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">2</div>
                      <span>About You</span>
                    </div>
                    <div className="h-px bg-gray-200 flex-1 mx-2 mt-[-20px]"></div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">3</div>
                      <span>Preferences</span>
                    </div>
                    <div className="h-px bg-gray-200 flex-1 mx-2 mt-[-20px]"></div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">4</div>
                      <span>Upload & Submit</span>
                    </div>
                  </div>

                  <form className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-gray-600">I am registering as *</Label>
                        <select className="w-full h-12 px-3 border border-gray-200 rounded-md bg-gray-50 focus:border-[#D52367] focus:ring-1 focus:ring-[#D52367] outline-none text-sm">
                          <option>Select</option>
                          <option>Self</option>
                          <option>Son</option>
                          <option>Daughter</option>
                          <option>Brother</option>
                          <option>Sister</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-gray-600">Name *</Label>
                        <Input placeholder="Enter full name" className="h-12 bg-gray-50" />
                      </div>
                      
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-gray-600">Gender *</Label>
                        <select className="w-full h-12 px-3 border border-gray-200 rounded-md bg-gray-50 focus:border-[#D52367] focus:ring-1 focus:ring-[#D52367] outline-none text-sm">
                          <option>Select</option>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-gray-600">Mobile Number *</Label>
                        <div className="flex gap-2">
                          <Input placeholder="Enter mobile number" className="h-12 bg-gray-50 flex-1" />
                          <Button type="button" className="h-12 bg-[#D52367] hover:bg-[#b01d55] text-white rounded-md px-4 shrink-0">Send OTP</Button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-gray-600">WhatsApp Number *</Label>
                        <Input placeholder="Enter WhatsApp number" className="h-12 bg-gray-50" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-gray-600">Email (Optional)</Label>
                        <Input type="email" placeholder="Enter email address" className="h-12 bg-gray-50" />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-gray-600">Date of Birth *</Label>
                        <Input type="date" className="h-12 bg-gray-50" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-gray-600">Age *</Label>
                        <Input placeholder="Enter age" className="h-12 bg-gray-50" />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-gray-600">City *</Label>
                        <Input placeholder="Enter city" className="h-12 bg-gray-50" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-gray-600">District *</Label>
                        <select className="w-full h-12 px-3 border border-gray-200 rounded-md bg-gray-50 focus:border-[#D52367] focus:ring-1 focus:ring-[#D52367] outline-none text-sm">
                          <option>Select district</option>
                          <option>Bengaluru</option>
                          <option>Belagavi</option>
                          <option>Hubballi</option>
                          <option>Dharwad</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="pt-6">
                      <Button className="w-full bg-[#D52367] hover:bg-[#b01d55] text-white rounded-md h-14 font-bold text-lg">
                        Save & Continue &gt;
                      </Button>
                      <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                        <ShieldCheck className="w-4 h-4" /> Your information is safe with us. We respect your privacy.
                      </p>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-[#002D72] py-16" id="how-it-works">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-16 tracking-tight">How It Works?</h2>
            
            <div className="flex flex-col md:flex-row justify-between items-start max-w-5xl mx-auto relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-[#fce4ee] z-0 border-t-2 border-dashed border-[#D52367]/30"></div>
              
              {[
                { step: 1, title: "Pre-Register Today", desc: "Fill in basic details to reserve your profile." },
                { step: 2, title: "Receive Launch Updates", desc: "We'll keep you informed about the launch." },
                { step: 3, title: "Complete Your Profile", desc: "Add more details and upload photos at launch." },
                { step: 4, title: "Platform Launch", desc: "Verified profiles go live for meaningful matches." },
                { step: 5, title: "Start Connecting", desc: "Express interest and find your perfect match." },
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center w-full md:w-[18%] mb-8 md:mb-0 px-2">
                  <div className="w-20 h-20 bg-white/10 rounded-full border border-white/20 flex items-center justify-center shadow-sm mb-4 relative">
                    <div className="absolute -bottom-2 w-6 h-6 bg-[#D52367] rounded-full text-white text-xs font-bold flex items-center justify-center border-2 border-[#002D72]">
                      {item.step}
                    </div>
                    {/* Placeholder icons based on step */}
                    <div className="text-white">
                      {idx === 0 && <User className="w-8 h-8" />}
                      {idx === 1 && <Bell className="w-8 h-8" />}
                      {idx === 2 && <ShieldCheck className="w-8 h-8" />}
                      {idx === 3 && <PlayCircle className="w-8 h-8" />}
                      {idx === 4 && <Heart className="w-8 h-8" />}
                    </div>
                  </div>
                  <h4 className="font-bold text-white text-sm mb-2">{item.title}</h4>
                  <p className="text-xs text-blue-200">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Maratha Lageen? */}
        <section className="bg-[#fdf5f8] py-20" id="why-us">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#002D72] mb-16 tracking-tight">
              Why Choose <span className="text-[#D52367]">Maratha Lageen?</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { icon: Users, title: "Community Focused", desc: "Exclusively for Maratha families in Karnataka for better understanding and cultural alignment." },
                { icon: ShieldCheck, title: "Privacy First", desc: "Your data is secure. You control what information is visible and to whom." },
                { icon: CheckCircle2, title: "Verified Profiles", desc: "Every profile is manually verified before going live to ensure authenticity." },
                { icon: Phone, title: "Trusted Support", desc: "Our team is here to support you throughout your journey." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-[#D52367] mb-4">
                    <item.icon className="w-12 h-12" />
                  </div>
                  <h4 className="font-bold text-[#002D72] mb-3">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed px-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder & Community Presence */}
        <section className="py-12 bg-white" id="about">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Founder */}
              <div className="bg-gray-50 rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D52367] to-[#002D72]"></div>
                <div className="w-40 h-40 shrink-0 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gray-200">
                  <img src="/founder.jpg" alt="Founder" className="w-full h-full object-cover object-top" />
                </div>
                <div className="relative text-center sm:text-left">
                  <h3 className="text-2xl font-extrabold text-[#002D72] mb-5 tracking-tight">Meet The <span className="text-[#D52367]">Founder</span></h3>
                  <div className="relative z-10">
                    <p className="text-[15px] text-gray-700 leading-relaxed mb-4 italic">
                      "At Maratha Lageen, our mission is simple - to bring Maratha families of Karnataka onto a trusted platform built on values, transparency and respect."
                    </p>
                    <p className="text-[15px] text-gray-700 leading-relaxed mb-5 italic">
                      "We understand the importance of this decision in your life and we are committed to providing a safe and reliable space to help you find the right match."
                    </p>
                    <p className="font-bold text-[#002D72] text-lg">— Founder</p>
                  </div>
                </div>
              </div>

              {/* Community Presence */}
              <div className="bg-[#002D72] rounded-2xl p-8 text-white flex flex-col justify-center text-center sm:text-left">
                <h3 className="text-xl font-bold mb-4">Our Community Presence</h3>
                <p className="text-sm text-blue-100 mb-6">We are proudly connecting Maratha families across Karnataka.</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {["Bengaluru", "Belagavi", "Hubballi", "Dharwad", "Vijayapura", "Mysuru", "Shivamogga", "Mangaluru"].map((city) => (
                    <div key={city} className="border border-blue-400/30 rounded-md py-2 text-center text-xs font-semibold text-blue-50">
                      {city}
                    </div>
                  ))}
                </div>
                <p className="text-center text-sm italic text-blue-200">...and many more districts</p>
              </div>

            </div>
          </div>
        </section>

        {/* WhatsApp Banner */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-[#D52367] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-[#D52367]/20">
              <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-4 md:gap-6">
                <div className="bg-white p-4 rounded-xl shadow-inner text-[#D52367] shrink-0">
                  <Bell className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight">Be the first to know when registrations open!</h3>
                  <p className="text-pink-100 text-sm">Get notified about launch date, offers and updates.</p>
                </div>
              </div>
              <Button className="bg-white text-[#D52367] hover:bg-gray-50 rounded-md px-8 py-6 font-bold shadow-md w-full md:w-auto flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-500" /> Notify Me on WhatsApp
              </Button>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-gray-50 border-t border-gray-100" id="faqs">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-[#002D72] mb-10 tracking-tight">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                "Is this platform only for Maratha community?",
                "Is there any registration fee today?",
                "Will my details be visible to everyone?",
                "When will the platform launch?",
                "Can I edit my profile later?",
                "How will profiles be verified?"
              ].map((q, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-md p-4 flex justify-between items-center cursor-pointer hover:border-gray-300">
                  <span className="text-sm font-semibold text-gray-700">{q}</span>
                  <span className="text-gray-400">∨</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#002D72] pt-16 pb-8 border-t-[8px] border-[#D52367]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-12 mb-12">
            
            <div className="flex flex-col items-center md:items-start max-w-xs">
              <Link href="#home" className="inline-block mb-6">
                <img src="/logo.jpeg" alt="Maratha Lageen Logo" className="h-12 w-auto object-contain bg-white rounded-lg p-2" />
              </Link>
              <p className="text-sm text-blue-200 leading-relaxed">
                Karnataka's exclusive Maratha matrimony platform. Built on trust, privacy and genuine connections.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <h4 className="font-bold text-white mb-6 text-sm tracking-wider uppercase">Quick Links</h4>
              <ul className="space-y-3 text-sm text-blue-200 font-medium flex flex-col items-center">
                <li><Link href="#home" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="#faqs" className="hover:text-white transition-colors">FAQs</Link></li>
              </ul>
            </div>
            
            <div className="flex flex-col items-center">
              <h4 className="font-bold text-white mb-6 text-sm tracking-wider uppercase">Contact</h4>
              <ul className="space-y-4 text-sm text-blue-200 flex flex-col items-center">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D52367]" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#D52367]" />
                  <span>info@marathalageen.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D52367]" />
                  <span>Bengaluru, Karnataka</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center">
              <h4 className="font-bold text-white mb-6 text-sm tracking-wider uppercase">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D52367] text-white flex items-center justify-center transition-all">
                  <svg xmlns="http://www.w3.org/2007/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D52367] text-white flex items-center justify-center transition-all">
                  <svg xmlns="http://www.w3.org/2007/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D52367] text-white flex items-center justify-center transition-all">
                  <svg xmlns="http://www.w3.org/2007/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D52367] text-white flex items-center justify-center transition-all">
                  <svg xmlns="http://www.w3.org/2007/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6 flex flex-col items-center justify-center text-xs text-blue-300 space-y-2">
            <p className="flex items-center gap-1.5 text-sm">
              Made with <Heart className="w-4 h-4 text-[#D52367]" fill="currentColor" /> for Maratha Families
            </p>
            <p>© {new Date().getFullYear()} Maratha Lageen. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
