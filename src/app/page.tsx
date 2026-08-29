"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle2, Bell, Heart, ShieldCheck, 
  User, Users, UserPlus, PlayCircle,
  MapPin, Phone, Mail, MessageCircle,
  Sparkles, ArrowRight, ArrowLeft, Lock, BadgeCheck, Camera, Check
} from "lucide-react";

export default function PreRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    registeringFor: "Self",
    fullName: "",
    gender: "",
    mobile: "",
    whatsapp: "",
    email: "",
    city: "",
    district: "",
    // Personal Details (Step 2)
    dob: "",
    age: "",
    height: "",
    maritalStatus: "Never Married",
    education: "",
    profession: "",
    annualIncome: "",
    // Preferences (Step 3)
    prefAgeMin: "21",
    prefAgeMax: "30",
    prefSubCaste: "Any",
    prefLocation: "Karnataka",
    // Photo (Step 4)
    photoUrl: "",
    agreeTerms: true,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setFormData(prev => ({ ...prev, photoUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setFormData(prev => ({ ...prev, photoUrl: "" }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // Auto-calculate age if DOB changes
      if (name === "dob" && value) {
        const birthDate = new Date(value);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
        if (!isNaN(calculatedAge) && calculatedAge > 0 && calculatedAge < 100) {
          updated.age = calculatedAge.toString();
        }
      }
      return updated;
    });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate server action
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#DB1866]/20 selection:text-[#DB1866]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="#home" className="flex items-center gap-2 pl-2">
              <img 
                src="/logo.png" 
                alt="Maratha Lageen Logo" 
                className="h-12 md:h-16 lg:h-20 w-auto object-contain scale-125 lg:scale-150 origin-left transition-transform" 
              />
            </Link>
          </div>
          
          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {[
              { href: "#home", label: "Home" },
              { href: "#who-can-register", label: "Who Can Register" },
              { href: "#why-we-exist", label: "Why We Exist" },
              { href: "/success-stories", label: "Success Stories" },
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-sm font-semibold text-[#2A3773] hover:text-[#DB1866] transition-colors relative py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Button onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#DB1866] hover:bg-[#B81456] text-white rounded-full px-5 py-2.5 text-sm md:px-7 md:py-5 md:text-base font-bold shadow-md shadow-[#DB1866]/20 transition-all hover:scale-105">
              Pre-Register Now
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-[#FFF8FA] overflow-hidden" id="home">

          {/* ── MOBILE HERO (hidden on lg) ── */}
          <div className="lg:hidden relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
            <img
              src="/hero.jpg"
              alt="Maratha Couple"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001a4d] via-[#2A3773]/95 to-transparent via-65%" />

            <div className="relative z-10 px-5 pb-8 pt-28 text-white text-center">
              <div className="inline-flex items-center gap-2 bg-[#DB1866] text-white text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 shadow-lg animate-pulse">
                <Bell className="w-3.5 h-3.5" /> 🎉 Limited Pre-Registration Open!
              </div>

              <h1 className="text-[32px] font-semibold leading-[1.15] tracking-tight mb-3 drop-shadow-lg">
                Karnataka's<br/>
                <span className="text-[#f9a8d4] drop-shadow-md font-bold">Exclusive Maratha</span><br/>
                Matrimony Platform
              </h1>

              <p className="text-blue-50 text-[14px] leading-relaxed mb-5 drop-shadow-md font-normal">
                Trusted by Maratha families across Karnataka — verified profiles, privacy-first, genuine connections.
              </p>

              <button onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-[#DB1866] hover:bg-[#B81456] active:scale-[0.98] text-white font-bold text-base h-14 rounded-xl shadow-2xl shadow-[#DB1866]/50 transition-all duration-150">
                Pre-Register Your Family — It's Free!
              </button>
              <p className="text-blue-200/80 text-xs text-center mt-2.5">🔒 Get Premium Membership Worth ₹2,999 FREE</p>
            </div>

            {/* Trust Badges — 2×2 card strip below hero */}
            <div className="relative z-10 grid grid-cols-2 gap-2.5 px-4 py-4 bg-white border-b border-pink-50">
              {[
                { icon: <Users className="w-4 h-4 text-[#DB1866]" />, label: "Exclusive to", sub: "Maratha Community" },
                { icon: <ShieldCheck className="w-4 h-4 text-[#DB1866]" />, label: "100%", sub: "Privacy Protected" },
                { icon: <CheckCircle2 className="w-4 h-4 text-[#DB1866]" />, label: "Verified", sub: "Profiles at Launch" },
                { icon: <Heart className="w-4 h-4 text-[#DB1866]" fill="currentColor" />, label: "Free Premium", sub: "Worth ₹2,999" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#fdf5f8] rounded-xl p-3">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm shrink-0">{b.icon}</div>
                  <div>
                    <p className="text-[11px] font-bold text-[#2A3773] leading-tight">{b.label}</p>
                    <p className="text-[10px] text-gray-500 leading-tight">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── DESKTOP HERO (hidden on mobile) ── */}
          <div className="hidden lg:block relative min-h-[calc(100vh-80px)] max-h-[760px] bg-gradient-to-r from-[#FFF8FA] via-white to-[#FFF1F5]/40">
            <div className="container mx-auto px-8 h-full flex items-center py-12">
              <div className="grid grid-cols-12 gap-10 items-center w-full">
                
                {/* Left Col: Text Content */}
                <div className="col-span-7 space-y-6 pr-4">
                  <div className="inline-flex items-center gap-2 bg-white border border-[#FADADF] text-[#DB1866] text-xs font-bold px-4 py-2 rounded-full shadow-sm">
                    <Bell className="w-3.5 h-3.5 fill-[#DB1866]" /> 🎉 Limited Pre-Registration Open — Free Premium Worth ₹2,999
                  </div>

                  <h1 className="text-[46px] xl:text-[50px] font-semibold text-[#2A3773] leading-[1.16] tracking-tight">
                    Karnataka's Exclusive<br/>
                    <span className="text-[#DB1866] font-bold">Maratha Matrimony</span><br/>
                    Platform
                  </h1>

                  <p className="text-gray-600 text-base xl:text-lg leading-relaxed max-w-xl font-normal">
                    A trusted platform created exclusively for Maratha families across Karnataka — verified profiles, privacy-first registration and genuine connections.
                  </p>

                  <div className="flex items-center gap-4 pt-2">
                    <Button onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#DB1866] hover:bg-[#B81456] text-white rounded-xl px-8 h-14 font-bold text-base shadow-lg shadow-[#DB1866]/30 hover:scale-105 transition-transform">
                      Pre-Register Your Family
                    </Button>
                    <Button onClick={() => document.getElementById('why-we-exist')?.scrollIntoView({ behavior: 'smooth' })} variant="ghost" className="text-[#2A3773] hover:text-[#DB1866] font-semibold h-14 px-5 rounded-xl border border-gray-200 hover:border-[#DB1866] transition-colors">
                      <PlayCircle className="w-5 h-5 mr-2 text-[#DB1866]" /> Learn More
                    </Button>
                  </div>

                  {/* Desktop Trust Strip */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 max-w-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#DB1866] flex items-center justify-center font-bold">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#2A3773]">100% Maratha</p>
                        <p className="text-[11px] text-gray-500">Community Exclusive</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2A3773] flex items-center justify-center font-bold">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#2A3773]">Privacy First</p>
                        <p className="text-[11px] text-gray-500">Protected Data</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                        <BadgeCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#2A3773]">Verified Profiles</p>
                        <p className="text-[11px] text-gray-500">Strict Screening</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Col: Full-size Couple Image with realistic soft edge gradient fade */}
                <div className="col-span-5 relative h-full min-h-[560px] flex items-center justify-center">
                  <div className="relative w-full h-[540px] rounded-3xl overflow-hidden shadow-2xl">
                    <img 
                      src="/hero.jpg" 
                      alt="Maratha Couple" 
                      className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" 
                    />
                    
                    {/* Natural soft edge fades */}
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FFF8FA] via-[#FFF8FA]/30 to-transparent pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#2A3773]/90 via-[#2A3773]/30 to-transparent pointer-events-none" />
                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#FFF8FA]/40 to-transparent pointer-events-none" />

                    {/* Floating Trust Badge */}
                    <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                      <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 shadow-lg">
                        <p className="text-xs font-bold text-pink-200 uppercase tracking-wider">Karnataka Maratha Matrimony</p>
                        <p className="text-sm font-medium mt-0.5">Connecting Traditional Families With Modern Trust</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ──────────── WHO CAN PRE-REGISTER? (CLIENT FEEDBACK 1) ──────────── */}
        <section className="bg-[#fdf5f8] py-20" id="who-can-register">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2A3773] mb-4 tracking-tight">Who Can Pre-Register?</h2>
            <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto mb-12">
              Profiles can be created by the candidate or by their caring family members.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
              {[
                { 
                  label: "Bride / Groom", 
                  icon: "/icons/bride.png", 
                  sub: "Candidate Direct", 
                  badge: "Self",
                  customIcon: (
                    <div className="flex items-center justify-center -space-x-4 mb-2">
                      <img src="/icons/bride.png" alt="Bride" className="w-16 h-16 object-contain z-10 drop-shadow-sm" />
                      <img src="/icons/groom.png" alt="Groom" className="w-16 h-16 object-contain drop-shadow-sm" />
                    </div>
                  )
                },
                { 
                  label: "Parents", 
                  icon: "/icons/parents.png", 
                  sub: "Father / Mother", 
                  badge: "Family",
                  customIcon: <img src="/icons/parents.png" alt="Parents" className="w-20 h-20 object-contain mb-2" />
                },
                { 
                  label: "Siblings", 
                  icon: "/icons/guardian.png", 
                  sub: "Brother / Sister", 
                  badge: "Family",
                  customIcon: (
                    <div className="w-20 h-20 rounded-2xl bg-[#FFF1F5] flex items-center justify-center mb-2 text-[#DB1866]">
                      <Users className="w-10 h-10" />
                    </div>
                  )
                },
                { 
                  label: "Guardian /\nRelative", 
                  icon: "/icons/guardian.png", 
                  sub: "Uncle / Aunt / Caretaker", 
                  badge: "Guardian",
                  customIcon: <img src="/icons/guardian.png" alt="Guardian" className="w-20 h-20 object-contain mb-2" />
                }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    setFormData(prev => ({ ...prev, registeringFor: item.label.split("/")[0].trim() }));
                    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center aspect-square hover:shadow-xl hover:border-[#DB1866]/30 hover:-translate-y-1 transition-all cursor-pointer group"
                >
                  <div className="w-full flex justify-end">
                    <span className="text-[10px] font-bold text-[#DB1866] bg-[#FFF1F5] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>
                  {item.customIcon}
                  <span className="font-bold text-[#2A3773] text-base text-center whitespace-pre-line leading-tight group-hover:text-[#DB1866] transition-colors">
                    {item.label}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────── WHY WE EXIST (CLIENT FEEDBACK 4: 4 CARDS) ──────────── */}
        <section className="bg-white py-20 border-y border-gray-100" id="why-we-exist">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            
            <div className="inline-flex items-center gap-2 bg-[#FFF1F5] border border-[#FADADF] text-[#DB1866] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
              <Heart className="w-3.5 h-3.5 fill-[#DB1866]" /> Our Core Purpose
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-[#2A3773] mb-4 tracking-tight">
              Why We Exist
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-16 leading-relaxed">
              Parents don't need another website.<br className="hidden sm:inline" />
              <span className="text-[#DB1866] font-semibold">They need peace of mind.</span>
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {[
                { 
                  icon: ShieldCheck, 
                  title: "Genuine Profiles", 
                  desc: "We focus on quality over quantity.",
                  color: "bg-blue-50 text-[#2A3773]"
                },
                { 
                  icon: Lock, 
                  title: "Privacy", 
                  desc: "Your data is secured with us. The details entered is shown to the intended audience.",
                  color: "bg-pink-50 text-[#DB1866]"
                },
                { 
                  icon: Users, 
                  title: "Community", 
                  desc: "Built exclusively for Maratha families in Karnataka.",
                  color: "bg-indigo-50 text-indigo-600"
                },
                { 
                  icon: BadgeCheck, 
                  title: "Verification", 
                  desc: "Every profile goes through verification before becoming active.",
                  color: "bg-emerald-50 text-emerald-600"
                }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl hover:border-[#DB1866]/30 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[#2A3773] mb-3 group-hover:text-[#DB1866] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-50 flex items-center gap-1 text-xs font-bold text-[#DB1866]">
                    <span>Maratha Trust Guarantee</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ──────────── REGISTRATION WIZARD (CLIENT FEEDBACK 2: DOB & AGE IN PERSONAL DETAILS) ──────────── */}
        <section className="bg-[#FFF1F5] py-20" id="register">
          <div className="container mx-auto px-4 lg:px-12 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left: Why Should I Pre-Register? */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white border border-[#FADADF] text-[#DB1866] text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 fill-[#DB1866]" /> Early Bird Privileges
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2A3773] mb-4 tracking-tight">
                    Why Should I Pre-Register?
                  </h2>
                  <p className="text-gray-600 text-base mb-8">
                    Join early to unlock exclusive benefits before our grand public launch.
                  </p>

                  <ul className="space-y-4">
                    {[
                      { title: "Complimentary Premium Membership", subtitle: "(Worth ₹2,999 Free for Life)" },
                      { title: "Priority Profile Verification", subtitle: "Instant review by our team" },
                      { title: "Early Access to Verified Profiles", subtitle: "Be the first to explore curated matches" },
                      { title: "First Choice Advantage", subtitle: "Direct connect without contact view limits" },
                      { title: "Dedicated Launch Support", subtitle: "Personalized assistance on WhatsApp" }
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#FADADF]">
                        <div className="bg-[#FFF1F5] p-2 rounded-xl shrink-0 text-[#DB1866]">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-[#2A3773] text-sm md:text-base leading-snug">{item.title}</p>
                          {item.subtitle && <p className="text-[#DB1866] text-xs font-bold mt-0.5">{item.subtitle}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Family Photo Card */}
                <div className="rounded-3xl overflow-hidden aspect-video bg-gray-100 shadow-md border-4 border-white relative">
                  <img 
                    src="/family.png" 
                    alt="Happy Maratha Family" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A3773]/90 via-transparent to-transparent flex items-end p-6">
                    <p className="text-white text-sm font-semibold italic">
                      "A trusted matrimonial bond for generations to come."
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Registration Form Card */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl shadow-xl shadow-[#2A3773]/5 border border-gray-100 p-6 md:p-10">
                  
                  {isSubmitted ? (
                    <div className="text-center py-8 md:py-12 animate-in zoom-in-95 duration-500 space-y-8">
                      {/* Top Celebration Badge */}
                      <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-4 py-2 rounded-full shadow-sm">
                        <Sparkles className="w-4 h-4 text-emerald-600" /> Pre-Registration Confirmed • Free Premium Reserved
                      </div>

                      {/* Joyful Icon & Heading */}
                      <div>
                        <div className="w-20 h-20 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-600/30">
                          <Check className="w-10 h-10 stroke-[3]" />
                        </div>
                        <h3 className="text-2xl md:text-4xl font-bold font-sans text-[#2A3773] mb-3">
                          Application Received with Respect & Care! 🙏
                        </h3>
                        <p className="text-gray-600 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
                          Dhanyawad! We are honored to welcome your family to <strong>Maratha Matrimony</strong>. Your profile has been registered and prioritized for Karnataka's grand launch.
                        </p>
                      </div>

                      {/* Profile Application Summary Card */}
                      <div className="bg-gradient-to-br from-[#FFF8FA] to-[#FFF1F5] p-6 md:p-8 rounded-3xl max-w-lg mx-auto text-left border border-[#FADADF] shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-[#DB1866] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl tracking-wider">
                          VIP Early Access
                        </div>
                        
                        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-pink-200/60">
                          {photoPreview ? (
                            <img 
                              src={photoPreview} 
                              alt="Candidate" 
                              className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md shrink-0" 
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-2xl bg-pink-100 text-[#DB1866] flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm shrink-0">
                              {(formData.fullName || "C").charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="text-xs text-[#DB1866] font-bold uppercase tracking-wider flex items-center gap-1.5">
                              <BadgeCheck className="w-4 h-4" /> Registration Summary
                            </p>
                            <p className="text-base font-bold text-[#2A3773] mt-0.5">{formData.fullName || "Candidate"}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-xs text-gray-400 font-bold uppercase">Candidate Name</p>
                            <p className="font-bold text-[#2A3773] text-base mt-0.5">{formData.fullName || "Candidate"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 font-bold uppercase">Profile Created By</p>
                            <p className="font-bold text-[#2A3773] text-base mt-0.5">{formData.registeringFor}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 font-bold uppercase">Primary Contact</p>
                            <p className="font-bold text-[#2A3773] text-sm mt-0.5">{formData.mobile || "Provided"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 font-bold uppercase">Location</p>
                            <p className="font-bold text-[#2A3773] text-sm mt-0.5">{formData.city || "Karnataka"}, {formData.district}</p>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-pink-200/60 flex items-center justify-between text-xs text-gray-600">
                          <span>Membership Privilege:</span>
                          <span className="font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-md">
                            ₹2,999 Premium Free for Life
                          </span>
                        </div>
                      </div>

                      {/* What Happens Next Roadmap */}
                      <div className="max-w-lg mx-auto text-left bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">What Happens Next?</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-pink-100 text-[#DB1866] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</div>
                            <p className="text-gray-600"><strong>Verification Review:</strong> Our desk verifies details within 24 hours to keep the community authentic.</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-[#2A3773] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</div>
                            <p className="text-gray-600"><strong>Launch Alert:</strong> You will receive match alerts and access details directly on WhatsApp.</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</div>
                            <p className="text-gray-600"><strong>Direct Connect:</strong> Browse and connect directly without contact limits.</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-lg mx-auto">
                        <a 
                          href={`https://wa.me/919844295369?text=Hello%20Maratha%20Matrimony,%20I%20have%20pre-registered%20the%20profile%20of%20${encodeURIComponent(formData.fullName || "my family member")}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-full sm:w-auto flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 text-sm transition-all"
                        >
                          <MessageCircle className="w-4 h-4" /> Message Support on WhatsApp
                        </a>
                        <Button 
                          onClick={() => {
                            setIsSubmitted(false);
                            setCurrentStep(1);
                          }} 
                          variant="outline"
                          className="w-full sm:w-auto h-12 border-gray-300 text-[#2A3773] rounded-xl px-6 font-bold hover:bg-gray-50 text-sm"
                        >
                          Register Another Profile
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-center mb-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-[#2A3773]">Pre-Register Your Family</h3>
                        <p className="text-gray-500 text-sm mt-1">100% Free • Zero Hidden Charges • Privacy Guaranteed</p>
                      </div>
                      
                      {/* Stepper Header — 100% Centered & Balanced */}
                      <div className="relative mb-10 max-w-xl mx-auto px-2">
                        {/* Background Connecting Track */}
                        <div className="absolute top-4 left-8 right-8 h-1 bg-gray-100 -translate-y-1/2 z-0 rounded-full" />
                        {/* Active Progress Bar Fill */}
                        <div 
                          className="absolute top-4 left-8 h-1 bg-[#DB1866] -translate-y-1/2 z-0 rounded-full transition-all duration-300"
                          style={{ 
                            width: currentStep === 1 ? '0%' : currentStep === 2 ? '33.33%' : currentStep === 3 ? '66.66%' : 'calc(100% - 4rem)' 
                          }}
                        />

                        {/* Step Nodes */}
                        <div className="relative z-10 flex justify-between items-start">
                          {[
                            { num: 1, label: "Basic Details" },
                            { num: 2, label: "Personal Details" },
                            { num: 3, label: "Preferences" },
                            { num: 4, label: "Upload & Submit" }
                          ].map((s) => {
                            const isActive = currentStep === s.num;
                            const isCompleted = currentStep > s.num;
                            return (
                              <div 
                                key={s.num} 
                                onClick={() => isCompleted && setCurrentStep(s.num)}
                                className={`flex flex-col items-center text-center ${isCompleted ? 'cursor-pointer' : ''}`}
                                style={{ width: '25%' }}
                              >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                  isActive 
                                    ? 'bg-[#DB1866] text-white shadow-md shadow-[#DB1866]/30 ring-4 ring-[#FFF1F5] scale-110' 
                                    : isCompleted
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'bg-white border-2 border-gray-200 text-gray-400'
                                }`}>
                                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                                </div>
                                <span className={`text-[11px] font-bold mt-2 leading-tight px-1 transition-colors ${
                                  isActive ? 'text-[#DB1866]' : isCompleted ? 'text-[#2A3773]' : 'text-gray-400'
                                }`}>
                                  {s.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <form onSubmit={handleNext} className="space-y-6">
                        
                        {/* ──────────── STEP 1: BASIC DETAILS ──────────── */}
                        {currentStep === 1 && (
                          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">I am registering as *</Label>
                                <select 
                                  name="registeringFor" 
                                  value={formData.registeringFor} 
                                  onChange={handleChange} 
                                  className="w-full h-12 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-[#DB1866] focus:bg-white outline-none text-sm font-medium"
                                  required
                                >
                                  <option value="Self">Self (Bride / Groom)</option>
                                  <option value="Son">Son</option>
                                  <option value="Daughter">Daughter</option>
                                  <option value="Brother">Brother</option>
                                  <option value="Sister">Sister</option>
                                  <option value="Relative">Guardian / Relative</option>
                                </select>
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">Full Name *</Label>
                                <Input 
                                  name="fullName" 
                                  value={formData.fullName} 
                                  onChange={handleChange} 
                                  placeholder="Enter candidate's full name" 
                                  className="h-12 bg-gray-50 rounded-xl font-medium" 
                                  required 
                                />
                              </div>
                              
                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">Gender *</Label>
                                <select 
                                  name="gender" 
                                  value={formData.gender} 
                                  onChange={handleChange} 
                                  className="w-full h-12 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-[#DB1866] focus:bg-white outline-none text-sm font-medium" 
                                  required
                                >
                                  <option value="">Select Gender</option>
                                  <option value="Female">Bride (Female)</option>
                                  <option value="Male">Groom (Male)</option>
                                </select>
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">Mobile Number *</Label>
                                <Input 
                                  name="mobile" 
                                  value={formData.mobile} 
                                  onChange={handleChange} 
                                  type="tel"
                                  placeholder="10-digit mobile number" 
                                  className="h-12 bg-gray-50 rounded-xl font-medium" 
                                  required 
                                />
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">WhatsApp Number *</Label>
                                <Input 
                                  name="whatsapp" 
                                  value={formData.whatsapp} 
                                  onChange={handleChange} 
                                  placeholder="WhatsApp number for match alerts" 
                                  className="h-12 bg-gray-50 rounded-xl font-medium" 
                                  required 
                                />
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">Email (Optional)</Label>
                                <Input 
                                  name="email" 
                                  value={formData.email} 
                                  onChange={handleChange} 
                                  type="email" 
                                  placeholder="Enter email address" 
                                  className="h-12 bg-gray-50 rounded-xl font-medium" 
                                />
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">City / Town *</Label>
                                <Input 
                                  name="city" 
                                  value={formData.city} 
                                  onChange={handleChange} 
                                  placeholder="e.g. Belagavi, Bengaluru" 
                                  className="h-12 bg-gray-50 rounded-xl font-medium" 
                                  required 
                                />
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">District in Karnataka *</Label>
                                <select 
                                  name="district" 
                                  value={formData.district} 
                                  onChange={handleChange} 
                                  className="w-full h-12 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-[#DB1866] focus:bg-white outline-none text-sm font-medium"
                                  required
                                >
                                  <option value="">Select district</option>
                                  <option value="Bengaluru Urban">Bengaluru Urban</option>
                                  <option value="Belagavi">Belagavi</option>
                                  <option value="Hubballi-Dharwad">Hubballi - Dharwad</option>
                                  <option value="Vijayapura">Vijayapura</option>
                                  <option value="Kalaburagi">Kalaburagi</option>
                                  <option value="Shivamogga">Shivamogga</option>
                                  <option value="Mysuru">Mysuru</option>
                                  <option value="Bagalkot">Bagalkot</option>
                                  <option value="Uttara Kannada">Uttara Kannada</option>
                                  <option value="Other">Other District</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ──────────── STEP 2: PERSONAL DETAILS (CLIENT FEEDBACK 2: DOB & AGE PLACED HERE) ──────────── */}
                        {currentStep === 2 && (
                          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="p-4 bg-[#FFF1F5] rounded-2xl border border-[#FADADF] mb-4">
                              <p className="text-xs text-[#DB1866] font-bold">
                                🎂 Step 2: Personal Details — As requested, Date of Birth & Age are recorded here.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">Date of Birth *</Label>
                                <Input 
                                  type="date" 
                                  name="dob" 
                                  value={formData.dob} 
                                  onChange={handleChange} 
                                  className="h-12 bg-gray-50 rounded-xl font-medium" 
                                  required 
                                />
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">Age * (Auto-calculated)</Label>
                                <Input 
                                  type="number" 
                                  name="age" 
                                  value={formData.age} 
                                  onChange={handleChange} 
                                  placeholder="e.g. 26" 
                                  className="h-12 bg-gray-50 rounded-xl font-medium" 
                                  required 
                                />
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">Height *</Label>
                                <select 
                                  name="height" 
                                  value={formData.height} 
                                  onChange={handleChange} 
                                  className="w-full h-12 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-[#DB1866] focus:bg-white outline-none text-sm font-medium"
                                  required
                                >
                                  <option value="">Select Height</option>
                                  <option value="5'0&quot;">5'0" (152 cm)</option>
                                  <option value="5'2&quot;">5'2" (157 cm)</option>
                                  <option value="5'4&quot;">5'4" (162 cm)</option>
                                  <option value="5'6&quot;">5'6" (167 cm)</option>
                                  <option value="5'8&quot;">5'8" (172 cm)</option>
                                  <option value="5'10&quot;">5'10" (177 cm)</option>
                                  <option value="6'0&quot;">6'0" (182 cm)</option>
                                  <option value="6'2&quot;+">6'2"+ (188 cm)</option>
                                </select>
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">Marital Status *</Label>
                                <select 
                                  name="maritalStatus" 
                                  value={formData.maritalStatus} 
                                  onChange={handleChange} 
                                  className="w-full h-12 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-[#DB1866] focus:bg-white outline-none text-sm font-medium"
                                  required
                                >
                                  <option value="Never Married">Never Married</option>
                                  <option value="Divorced">Divorced</option>
                                  <option value="Widowed">Widowed</option>
                                  <option value="Awaiting Divorce">Awaiting Divorce</option>
                                </select>
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">Highest Education *</Label>
                                <select 
                                  name="education" 
                                  value={formData.education} 
                                  onChange={handleChange} 
                                  className="w-full h-12 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-[#DB1866] focus:bg-white outline-none text-sm font-medium"
                                  required
                                >
                                  <option value="">Select Education</option>
                                  <option value="B.E / B.Tech">B.E / B.Tech / Engineering</option>
                                  <option value="MBA / Post Graduate">MBA / Post Graduate</option>
                                  <option value="MBBS / Medical / MD">MBBS / Medical / MD</option>
                                  <option value="Bachelors (B.Com / B.Sc / B.A)">Bachelors (B.Com / B.Sc / B.A)</option>
                                  <option value="Masters (M.Com / M.Sc / M.A)">Masters (M.Com / M.Sc / M.A)</option>
                                  <option value="CA / CS / Finance">CA / CS / Finance</option>
                                  <option value="Diploma / Polytechnic">Diploma / Polytechnic</option>
                                  <option value="Doctorate / Ph.D">Doctorate / Ph.D</option>
                                </select>
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">Profession / Occupation *</Label>
                                <Input 
                                  name="profession" 
                                  value={formData.profession} 
                                  onChange={handleChange} 
                                  placeholder="e.g. Software Engineer, Banker, Business" 
                                  className="h-12 bg-gray-50 rounded-xl font-medium" 
                                  required 
                                />
                              </div>

                              <div className="space-y-1.5 md:col-span-2">
                                <Label className="text-xs font-bold text-[#2A3773]">Annual Income *</Label>
                                <select 
                                  name="annualIncome" 
                                  value={formData.annualIncome} 
                                  onChange={handleChange} 
                                  className="w-full h-12 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-[#DB1866] focus:bg-white outline-none text-sm font-medium"
                                  required
                                >
                                  <option value="">Select Annual Income</option>
                                  <option value="Below 3 Lakhs">Below ₹3 Lakhs</option>
                                  <option value="3 - 6 Lakhs">₹3 - ₹6 Lakhs</option>
                                  <option value="6 - 10 Lakhs">₹6 - ₹10 Lakhs</option>
                                  <option value="10 - 15 Lakhs">₹10 - ₹15 Lakhs</option>
                                  <option value="15 - 25 Lakhs">₹15 - ₹25 Lakhs</option>
                                  <option value="25 - 50 Lakhs">₹25 - ₹50 Lakhs</option>
                                  <option value="50 Lakhs+">₹50 Lakhs+</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ──────────── STEP 3: PREFERENCES ──────────── */}
                        {currentStep === 3 && (
                          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 mb-4">
                              <p className="text-xs text-indigo-700 font-bold">
                                🎯 Tell us your expectations to receive tailor-made match recommendations at launch.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">Preferred Partner Age (Min - Max)</Label>
                                <div className="flex items-center gap-2">
                                  <Input 
                                    name="prefAgeMin" 
                                    value={formData.prefAgeMin} 
                                    onChange={handleChange} 
                                    type="number" 
                                    className="h-12 bg-gray-50 rounded-xl font-medium" 
                                    placeholder="21" 
                                  />
                                  <span className="text-gray-400 text-sm font-bold">to</span>
                                  <Input 
                                    name="prefAgeMax" 
                                    value={formData.prefAgeMax} 
                                    onChange={handleChange} 
                                    type="number" 
                                    className="h-12 bg-gray-50 rounded-xl font-medium" 
                                    placeholder="30" 
                                  />
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">Sub-Community / Caste</Label>
                                <select 
                                  name="prefSubCaste" 
                                  value={formData.prefSubCaste} 
                                  onChange={handleChange} 
                                  className="w-full h-12 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-[#DB1866] focus:bg-white outline-none text-sm font-medium"
                                >
                                  <option value="Any">Any Maratha Sub-Community</option>
                                  <option value="96 Kuli Maratha">96 Kuli Maratha</option>
                                  <option value="Deshastha">Deshastha Maratha</option>
                                  <option value="Kunbi">Kunbi Maratha</option>
                                </select>
                              </div>

                              <div className="space-y-1.5 md:col-span-2">
                                <Label className="text-xs font-bold text-[#2A3773]">Preferred Location</Label>
                                <select 
                                  name="prefLocation" 
                                  value={formData.prefLocation} 
                                  onChange={handleChange} 
                                  className="w-full h-12 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-[#DB1866] focus:bg-white outline-none text-sm font-medium"
                                >
                                  <option value="Karnataka">Karnataka (Any District)</option>
                                  <option value="Karnataka & Maharashtra">Karnataka & Maharashtra</option>
                                  <option value="All India & Abroad">All India & Abroad</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ──────────── STEP 4: UPLOAD & SUBMIT ──────────── */}
                        {currentStep === 4 && (
                          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="border-2 border-dashed border-[#FADADF] hover:border-[#DB1866] rounded-3xl p-6 md:p-8 text-center bg-[#FFF1F5]/40 transition-colors relative flex flex-col items-center justify-center">
                              {photoPreview ? (
                                <div className="flex flex-col items-center space-y-4 animate-in zoom-in-95">
                                  <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-gray-100 group">
                                    <img src={photoPreview} alt="Profile Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                                      Candidate Photo
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Photo Attached
                                    </span>
                                    <button 
                                      type="button" 
                                      onClick={removePhoto} 
                                      className="text-xs font-bold text-red-600 hover:text-red-700 bg-white border border-red-200 px-3 py-1 rounded-full shadow-sm hover:bg-red-50"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                  <label className="cursor-pointer text-xs font-bold text-[#DB1866] hover:underline mt-1">
                                    Choose different photo
                                    <input type="file" onChange={handlePhotoChange} className="hidden" accept="image/*" />
                                  </label>
                                </div>
                              ) : (
                                <>
                                  <div className="w-16 h-16 rounded-2xl bg-[#FFF1F5] text-[#DB1866] flex items-center justify-center mb-3 shadow-inner">
                                    <Camera className="w-8 h-8" />
                                  </div>
                                  <h4 className="font-bold text-[#2A3773] text-base mb-1">Add Profile Photo (Optional for Pre-Registration)</h4>
                                  <p className="text-xs text-gray-500 max-w-sm mb-5">
                                    You can upload a photo now or add it later after launch. Profiles with photos get 10x more responses.
                                  </p>
                                  <label className="cursor-pointer bg-[#DB1866] hover:bg-[#B81456] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md shadow-[#DB1866]/30 transition-all hover:scale-105 inline-flex items-center gap-2">
                                    <Camera className="w-4 h-4" /> Select Photo from Device
                                    <input type="file" onChange={handlePhotoChange} className="hidden" accept="image/*" />
                                  </label>
                                </>
                              )}
                            </div>

                            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-3">
                              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                              <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                                <strong>Privacy Guarantee:</strong> Your data is secured with us. The details entered will only be shown to genuine, verified Maratha families.
                              </p>
                            </div>

                            <label className="flex items-center gap-3 cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={formData.agreeTerms} 
                                onChange={(e) => setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))} 
                                className="w-4 h-4 text-[#DB1866] rounded border-gray-300 focus:ring-[#DB1866]" 
                                required
                              />
                              <span className="text-xs text-gray-600 font-medium">
                                I agree to the <Link href="/terms" className="text-[#DB1866] underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#DB1866] underline">Privacy Policy</Link>.
                              </span>
                            </label>
                          </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                          {currentStep > 1 ? (
                            <Button 
                              type="button" 
                              onClick={handleBack} 
                              variant="outline" 
                              className="h-12 px-6 rounded-xl border-gray-300 text-[#2A3773] font-bold flex items-center gap-2 hover:bg-gray-50"
                            >
                              <ArrowLeft className="w-4 h-4" /> Back
                            </Button>
                          ) : <div />}

                          {currentStep < 4 ? (
                            <Button 
                              type="submit" 
                              className="h-12 px-8 rounded-xl bg-[#DB1866] hover:bg-[#B81456] text-white font-bold flex items-center gap-2 shadow-lg shadow-[#DB1866]/30 transition-all hover:scale-105"
                            >
                              Save & Continue <ArrowRight className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button 
                              type="submit" 
                              disabled={loading} 
                              className="h-14 px-10 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-base flex items-center gap-2 shadow-xl shadow-green-600/30 transition-all hover:scale-105"
                            >
                              {loading ? "Pre-Registering..." : <>Complete Pre-Registration <Sparkles className="w-5 h-5" /></>}
                            </Button>
                          )}
                        </div>

                      </form>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-[#2A3773] py-20" id="how-it-works">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16 tracking-tight">How It Works?</h2>
            
            <div className="flex flex-col md:flex-row justify-between items-start max-w-5xl mx-auto relative">
              <div className="hidden md:block absolute top-[39px] left-[10%] right-[10%] border-t-2 border-dashed border-white/30 z-0"></div>
              
              {[
                { step: 1, title: "Pre-Register Today", desc: "Fill in basic details to reserve your profile." },
                { step: 2, title: "Receive Launch Updates", desc: "We'll keep you informed about the launch." },
                { step: 3, title: "Complete Your Profile", desc: "Add more details and upload photos at launch." },
                { step: 4, title: "Platform Launch", desc: "Verified profiles go live for meaningful matches." },
                { step: 5, title: "Start Connecting", desc: "Express interest and find your perfect match." },
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center w-full md:w-[18%] mb-8 md:mb-0 px-2">
                  <div className="w-20 h-20 bg-[#2A3773] rounded-full border border-white/20 flex items-center justify-center shadow-lg mb-4 relative">
                    <div className="absolute -bottom-2 w-6 h-6 bg-[#DB1866] rounded-full text-white text-xs font-bold flex items-center justify-center border-2 border-[#2A3773]">
                      {item.step}
                    </div>
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

        {/* Founder & Community Presence */}
        <section className="py-16 bg-white" id="about">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Founder */}
              <div className="bg-gray-50 rounded-3xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#DB1866] to-[#2A3773]"></div>
                <div className="w-36 h-36 shrink-0 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gray-200">
                  <img src="/founder.jpg" alt="Founder" className="w-full h-full object-cover object-top" />
                </div>
                <div className="relative text-center sm:text-left">
                  <h3 className="text-2xl font-semibold text-[#2A3773] mb-4 tracking-tight">Meet The <span className="text-[#DB1866]">Founder</span></h3>
                  <div className="relative z-10">
                    <p className="text-[14px] text-gray-700 leading-relaxed mb-3 italic">
                      "At Maratha Lageen, our mission is simple - to bring Maratha families of Karnataka onto a trusted platform built on values, transparency and respect."
                    </p>
                    <p className="text-[14px] text-gray-700 leading-relaxed mb-4 italic">
                      "We understand the importance of this decision in your life and we are committed to providing a safe and reliable space to help you find the right match."
                    </p>
                    <p className="font-bold text-[#2A3773] text-base">— Founder</p>
                  </div>
                </div>
              </div>

              {/* Community Presence */}
              <div className="bg-[#2A3773] rounded-3xl p-8 text-white flex flex-col justify-center text-center sm:text-left">
                <h3 className="text-xl font-bold mb-3">Our Community Presence</h3>
                <p className="text-sm text-blue-100 mb-6">Proudly connecting Maratha families across all key districts in Karnataka.</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {["Bengaluru", "Belagavi", "Hubballi", "Dharwad", "Vijayapura", "Mysuru", "Shivamogga", "Mangaluru"].map((city) => (
                    <div key={city} className="border border-blue-400/30 rounded-xl py-2.5 text-center text-xs font-semibold text-blue-50 bg-white/5">
                      {city}
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs italic text-blue-200">...and many more taluks and rural pockets</p>
              </div>

            </div>
          </div>
        </section>

        {/* WhatsApp Banner */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-[#DB1866] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-[#DB1866]/20">
              <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-4 md:gap-6">
                <div className="bg-white p-4 rounded-2xl shadow-inner text-[#DB1866] shrink-0">
                  <Bell className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight">Be the first to know when registrations go live!</h3>
                  <p className="text-pink-100 text-sm">Get notified about launch date, verified matches, and exclusive community events.</p>
                </div>
              </div>
              <a 
                href="https://wa.me/919844295369?text=Hello%20Maratha%20Matrimony,%20please%20notify%20me%20when%20registrations%20open" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white text-[#DB1866] hover:bg-gray-50 rounded-2xl px-8 py-4 font-bold shadow-md w-full md:w-auto flex items-center justify-center gap-2 shrink-0 transition-transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 text-green-500" /> Notify Me on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-gray-50 border-t border-gray-100" id="faqs">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-[#2A3773] mb-10 tracking-tight">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                { q: "Is this platform only for Maratha community?", a: "Yes, Maratha Lageen is Karnataka's dedicated platform created exclusively for the Maratha community." },
                { q: "Is there any registration fee today?", a: "No, pre-registration is 100% free and comes with a Complimentary Premium Membership worth ₹2,999." },
                { q: "Will my details be visible to everyone?", a: "No. Your data is secured with us. Details are shown strictly to intended, verified members." },
                { q: "When will the platform launch?", a: "We are currently completing pre-registrations and will launch shortly with thousands of verified profiles." }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h4 className="font-bold text-[#2A3773] text-sm mb-2">{faq.q}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
