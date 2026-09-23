"use client";

import { compressImage } from "@/lib/image-compression";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppLink, SUPPORT_CONFIG } from "@/lib/constants";
import { Globe, Languages } from "lucide-react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle2, Bell, Heart, ShieldCheck, 
  User, Users, UserPlus, PlayCircle,
  MapPin, Phone, Mail, MessageCircle,
  Sparkles, ArrowRight, ArrowLeft, Lock, BadgeCheck, Camera, Check,
  Share2, Copy, Share, ExternalLink, X, Menu
} from "lucide-react";

export default function PreRegisterPage() {
  const { language, setLanguage, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shareCategory, setShareCategory] = useState<"family" | "friends" | "status">("family");
  const [copiedToast, setCopiedToast] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", district: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryText = `Hello Maratha Matrimony Team, I would like assistance with pre-registration.\n\n*Name:* ${contactForm.name}\n*Mobile:* ${contactForm.phone}\n*District:* ${contactForm.district || "Karnataka"}\n*Inquiry:* ${contactForm.message || "Please call me back regarding matrimonial registration."}`;
    window.open(getWhatsAppLink(queryText), "_blank");
    setContactSent(true);
    setTimeout(() => setContactSent(false), 4000);
  };
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Form Initial State Definition
  const initialFormState = {
    registeringFor: "Self",
    fullName: "",
    surname: "",
    caste: "96 Kuli Maratha",
    gender: "",
    mobile: "",
    whatsapp: "",
    email: "",
    city: "",
    district: "",
    // Personal Details (Step 2)
    dob: "",
    birthHour: "12",
    birthMinute: "00",
    birthAmPm: "AM",
    birthTime: "12:00 AM",
    nakshatra: "",
    rashi: "",
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
    prefEducation: "Any Education",
    // Photo (Step 4)
    photoUrl: "",
    agreeTerms: true,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [priorityPass, setPriorityPass] = useState("ML-2026-VIP");
  const [emailNotice, setEmailNotice] = useState(false);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [compressingPhoto, setCompressingPhoto] = useState(false);
  const [compressionStats, setCompressionStats] = useState<{ savedPercent: number; compressedSize: number } | null>(null);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCompressingPhoto(true);
      try {
        const compressed = await compressImage(file, { maxWidth: 1200, maxHeight: 1200, quality: 0.82 });
        setPhotoPreview(compressed.dataUrl);
        setFormData(prev => ({ ...prev, photoUrl: compressed.dataUrl }));
        setCompressionStats({
          savedPercent: compressed.savedPercent,
          compressedSize: Math.round(compressed.compressedSize / 1024),
        });
      } catch (err) {
        console.warn("Client image compression fallback:", err);
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setPhotoPreview(result);
          setFormData(prev => ({ ...prev, photoUrl: result }));
        };
        reader.readAsDataURL(file);
      } finally {
        setCompressingPhoto(false);
      }
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setCompressionStats(null);
    setFormData(prev => ({ ...prev, photoUrl: "" }));
  };

  const getShareMessage = () => {
    const candidate = formData.fullName ? `(${formData.fullName})` : "";
    const siteUrl = "https://marathalageen.com";
    if (shareCategory === "family") {
      return `🚩 *ಜೈ ಭವಾನಿ, ಜೈ ಶಿವಾಜಿ!* 🙏\n\nಕರ್ನಾಟಕದ ಸಮಸ್ತ ಕ್ಷತ್ರಿಯ ಮರಾಠ ಬಾಂಧವರಿಗಾಗಿ ವಿಶೇಷ ವೈವಾಹಿಕ ವೇದಿಕೆ — *ಮರಾಠ ಲಗ್ನ (Maratha Lageen)*.\n\n✨ ನಮ್ಮ ಕುಟುಂಬದ ವಿವಾಹ ಅಪೇಕ್ಷಿತರ ${candidate ? `${candidate} ಅವರ ` : ""}ಪ್ರೊಫೈಲ್ ನೋಂದಾಯಿಸಿ. ಈಗ ನೋಂದಾಯಿಸಿಕೊಳ್ಳುವ ಮೊದಲ 5,000 ಕುಟುಂಬಗಳಿಗೆ *₹4,999 VIP ಮೆಂಬರ್‌ಶಿಪ್ ಸಂಪೂರ್ಣ ಉಚಿತ!*\n\n👉 ಉಚಿತವಾಗಿ ನೋಂದಾಯಿಸಲು ಭೇಟಿ ನೀಡಿ:\n${siteUrl}`;
    } else if (shareCategory === "friends") {
      return `🚩 *ಜೈ ಭವಾನಿ, ಜೈ ಶಿವಾಜಿ!* ✨\n\nಕರ್ನಾಟಕದ ಮರಾಠ ಸಮಾಜದ ಏಕೈಕ ವಿಶ್ವಾಸಾರ್ಹ ಮ್ಯಾಟ್ರಿಮೋನಿ ವೇದಿಕೆ *Maratha Lageen*.\n\n🌟 Early Bird Privilege: ₹4,999 ಮೌಲ್ಯದ VIP ಪ್ರವೇಶ ಉಚಿತವಾಗಿ ಪಡೆಯಿರಿ!\n\nಈಗಲೇ ನೋಂದಾಯಿಸಿ:\n${siteUrl}`;
    } else {
      return `🚩 *ಜೈ ಭವಾನಿ, ಜೈ ಶಿವಾಜಿ!* ಕರ್ನಾಟಕದ ಕ್ಷತ್ರಿಯ ಮರಾಠ ಸಮಾಜದ ನಂಬಿಕಾರ್ಹ ಮ್ಯಾಟ್ರಿಮೋನಿ ಪೋರ್ಟಲ್. ಉಚಿತ ₹4,999 VIP ಪಾಸ್ ಪಡೆಯಲು ಕ್ಲಿಕ್ ಮಾಡಿ: ${siteUrl}`;
    }
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(getShareMessage());
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Maratha Matrimony - VIP Early Access",
          text: getShareMessage(),
          url: "https://marathalageen.com",
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      handleCopyShare();
    }
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
    try {
      const res = await fetch("/api/preregister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data?.priorityPass) {
        setPriorityPass(data.priorityPass);
      }
      if (data?.emailSent) {
        setEmailNotice(true);
      }
    } catch (err) {
      console.warn("Pre-registration submission network fallback:", err);
    } finally {
      setLoading(false);
      setIsSubmitted(true);
    }
  };

  const handleRegisterAnother = () => {
    setFormData(initialFormState);
    setPhotoPreview(null);
    setIsSubmitted(false);
    setEmailNotice(false);
    setCurrentStep(1);
    try {
      localStorage.removeItem("maratha_prereg_draft");
      sessionStorage.removeItem("maratha_prereg_draft");
    } catch (e) {}
    const elem = document.getElementById("pre-register");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#DB1866]/20 selection:text-[#DB1866]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <a href="#home" className="flex items-center hover:opacity-90 transition-opacity">
              <img 
                src="/logo.png" 
                alt="Maratha Lageen Logo" 
                className="h-10 sm:h-11 lg:h-12 w-auto object-contain transition-transform" 
              />
            </a>
          </div>
          
          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center justify-center gap-3 lg:gap-4 xl:gap-6.5 flex-1 mx-2 lg:mx-4">
            {[
              { href: "#who-can-register", label: t.nav.whoCanRegister },
              { href: "#why-we-exist", label: t.nav.whyWeExist },
              { href: "#how-it-works", label: t.nav.howItWorks },
              { href: "#about", label: t.nav.aboutUs },
              { href: "#contact", label: t.nav.contactUs },
              { href: "#faqs", label: t.nav.faqs },
            ].map((link) => (
              <a 
                key={link.href} 
                href={link.href}
                className="text-xs lg:text-[13px] xl:text-sm font-semibold text-[#2A3773] hover:text-[#DB1866] transition-colors relative py-1 whitespace-nowrap cursor-pointer tracking-tight"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Language Toggle & CTA Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto lg:ml-0">
            {/* Language Switcher Pill */}
            <div className="flex items-center bg-[#FFF1F5] border border-[#FADADF] p-0.5 rounded-full shadow-2xs shrink-0">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer ${language === "en" ? "bg-[#DB1866] text-white shadow-xs" : "text-[#2A3773] hover:text-[#DB1866]"}`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("kn")}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer ${language === "kn" ? "bg-[#DB1866] text-white shadow-xs" : "text-[#2A3773] hover:text-[#DB1866]"}`}
                title="ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ"
              >
                ಕನ್ನಡ
              </button>
            </div>

            <Button 
              onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })} 
              className="bg-[#DB1866] hover:bg-[#B81456] text-white rounded-full px-3.5 sm:px-5 py-2 text-xs sm:text-[13px] h-9 sm:h-9.5 font-bold shadow-md shadow-[#DB1866]/20 transition-all hover:scale-105 cursor-pointer whitespace-nowrap shrink-0"
            >
              {t.nav.registerFree}
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-[#2A3773] hover:text-[#DB1866] rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#FADADF] shadow-xl animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col p-4 divide-y divide-gray-50 text-sm font-bold text-[#2A3773]">
              {/* Language Switcher in Mobile Drawer */}
              <div className="py-2.5 px-3 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Language / ಭಾಷೆ</span>
                <div className="flex items-center gap-1 bg-[#FFF1F5] border border-[#FADADF] p-0.5 rounded-full">
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-1 rounded-full text-xs font-extrabold ${language === "en" ? "bg-[#DB1866] text-white" : "text-[#2A3773]"}`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("kn")}
                    className={`px-3 py-1 rounded-full text-xs font-extrabold ${language === "kn" ? "bg-[#DB1866] text-white" : "text-[#2A3773]"}`}
                  >
                    ಕನ್ನಡ
                  </button>
                </div>
              </div>

              {[
                { href: "#who-can-register", label: t.nav.whoCanRegister },
                { href: "#why-we-exist", label: t.nav.whyWeExist },
                { href: "#how-it-works", label: t.nav.howItWorks },
                { href: "#about", label: t.nav.aboutUs },
                { href: "#contact", label: t.nav.contactUs },
                { href: "#faqs", label: t.nav.faqs },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-3 hover:text-[#DB1866] hover:bg-pink-50/50 rounded-xl transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-[#FFF8FA] overflow-hidden" id="home">

          {/* ── MOBILE HERO (hidden on lg) ── */}
          <div className="lg:hidden relative min-h-[100svh] flex flex-col justify-end items-center overflow-hidden text-center">
            <img
              src="/hero.webp"
              alt="Maratha Couple"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001a4d] via-[#2A3773]/95 to-transparent via-65%" />

            <div className="relative z-10 px-4 pb-8 pt-24 text-white flex flex-col items-center justify-center text-center w-full max-w-sm mx-auto">
              <div className="inline-flex items-center justify-center gap-1.5 bg-[#DB1866] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full mb-3 shadow-lg animate-pulse mx-auto">
                <Bell className="w-3.5 h-3.5" /> {t.hero.communityBadge}
              </div>

              <h1 className="text-[28px] sm:text-[32px] font-bold leading-[1.2] tracking-tight mb-3 drop-shadow-lg text-center w-full mx-auto">
                {t.hero.titleLine1}<br/>
                <span className="text-[#f9a8d4] drop-shadow-md">{t.hero.titleLine2}</span><br/>
                {t.hero.titleLine3}
              </h1>

              <p className="text-blue-50 text-[13px] sm:text-[14px] leading-relaxed mb-5 drop-shadow-md font-normal text-center max-w-[320px] mx-auto">
                {t.hero.subtitle}
              </p>

              <div className="w-full max-w-xs mx-auto flex flex-col items-center justify-center text-center">
                <button 
                  onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="w-full bg-[#DB1866] hover:bg-[#B81456] active:scale-[0.98] text-white font-bold text-sm sm:text-base h-13 py-3.5 rounded-xl shadow-2xl shadow-[#DB1866]/50 transition-all duration-150 text-center cursor-pointer"
                >
                  {t.hero.claimVipCta}
                </button>
                <p className="text-blue-200/90 text-[11px] text-center mt-2 font-medium">🔒 {t.hero.vipNotice}</p>
              </div>
            </div>

            {/* Trust Badges — 2×2 card strip below hero */}
            <div className="relative z-10 grid grid-cols-2 gap-2.5 px-4 py-4 bg-white border-b border-pink-50 w-full max-w-md mx-auto">
              {[
                { icon: <Users className="w-4 h-4 text-[#DB1866]" />, label: "Exclusive to", sub: "Maratha Community" },
                { icon: <ShieldCheck className="w-4 h-4 text-[#DB1866]" />, label: "100%", sub: "Privacy Protected" },
                { icon: <CheckCircle2 className="w-4 h-4 text-[#DB1866]" />, label: "Verified", sub: "Profiles at Launch" },
                { icon: <Heart className="w-4 h-4 text-[#DB1866]" fill="currentColor" />, label: "Free Premium", sub: "Worth ₹4,999" },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center justify-center text-center bg-[#fdf5f8] rounded-xl p-3 border border-pink-100/40">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm mb-1 text-[#DB1866]">{b.icon}</div>
                  <p className="text-[11px] font-bold text-[#2A3773] leading-tight text-center">{b.label}</p>
                  <p className="text-[10px] text-gray-500 leading-tight text-center">{b.sub}</p>
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
                    <Bell className="w-3.5 h-3.5 fill-[#DB1866]" /> {t.hero.communityBadge}
                  </div>

                  <h1 className="text-[44px] xl:text-[50px] font-bold text-[#2A3773] leading-[1.16] tracking-tight">
                    {t.hero.titleLine1}<br/>
                    <span className="text-[#DB1866] font-bold">{t.hero.titleLine2}</span><br/>
                    {t.hero.titleLine3}
                  </h1>

                  <p className="text-gray-600 text-base xl:text-lg leading-relaxed max-w-xl font-normal">
                    {t.hero.subtitle}
                  </p>

                  <div className="flex items-center gap-4 pt-2">
                    <Button onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#DB1866] hover:bg-[#B81456] text-white rounded-xl px-8 h-14 font-bold text-base shadow-lg shadow-[#DB1866]/30 hover:scale-105 transition-transform cursor-pointer">
                      {t.hero.claimVipCta}
                    </Button>
                    <Button onClick={() => document.getElementById('heritage-video')?.scrollIntoView({ behavior: 'smooth' })} variant="ghost" className="text-[#2A3773] hover:text-[#DB1866] font-semibold h-14 px-5 rounded-xl border border-gray-200 hover:border-[#DB1866] transition-colors cursor-pointer">
                      <PlayCircle className="w-5 h-5 mr-2 text-[#DB1866]" /> {t.hero.watchVideoCta}
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
                      src="/hero.webp" 
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

        
        {/* ──────────── ITEM 5: HORIZONTAL MARATHA WEDDING & HERITAGE VIDEO SHOWCASE ──────────── */}
        <section className="py-14 sm:py-18 bg-gradient-to-b from-white via-[#FFF8FA] to-[#fdf5f8] border-b border-pink-100/60" id="heritage-video">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            
            <div className="inline-flex items-center gap-2 bg-[#FFF1F5] border border-[#FADADF] text-[#DB1866] text-xs font-bold px-4 py-1.5 rounded-full mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#DB1866]" /> 
              <span>{t.video.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A3773] tracking-tight mb-3">
              {t.video.title}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              {t.video.subtitle}
            </p>

            {/* 16:9 Cinematic Video Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black/90 aspect-video max-w-4xl mx-auto group">
              <img
                src="/hero.webp"
                alt="Maratha Wedding Rituals"
                className={`w-full h-full object-cover object-center transition-all duration-700 ${isPlayingVideo ? "opacity-20 scale-105 filter blur-xs" : "opacity-85 group-hover:scale-102"}`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {!isPlayingVideo ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white cursor-pointer" onClick={() => setIsPlayingVideo(true)}>
                  <button 
                    aria-label="Play Maratha Wedding Video"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#DB1866] hover:bg-[#B81456] text-white flex items-center justify-center shadow-2xl shadow-[#DB1866]/60 transition-transform duration-300 hover:scale-110 active:scale-95 mb-4 group-hover:ring-8 group-hover:ring-[#DB1866]/30"
                  >
                    <PlayCircle className="w-10 h-10 sm:w-12 sm:h-12" />
                  </button>
                  <p className="text-base sm:text-lg font-bold drop-shadow-md">Watch Cultural Wedding Showcase</p>
                  <p className="text-xs sm:text-sm text-pink-200 mt-1 font-medium flex items-center gap-2">
                    <span>96 Kuli Traditions</span> • <span>Sakharpuda</span> • <span>Mangalashtak</span> • <span>Saptapadi</span>
                  </p>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <div className="w-full h-full rounded-2xl bg-black flex flex-col items-center justify-center text-white p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-[#DB1866]/20 border border-[#DB1866] flex items-center justify-center mb-4">
                        <PlayCircle className="w-8 h-8 text-[#DB1866]" />
                      </div>
                      <h4 className="text-lg font-bold mb-2">Maratha Traditional Wedding Documentary</h4>
                      <p className="text-xs text-gray-300 max-w-md mb-4">Ready to embed your official Maratha wedding video MP4 / YouTube URL anytime.</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); setIsPlayingVideo(false); }}
                        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md transition-colors"
                      >
                        Back to Preview
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                <span className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-semibold text-white/90 border border-white/20">
                  🚩 Authentic 96 Kuli Culture
                </span>
                <span className="bg-[#DB1866]/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-bold text-white shadow-xs">
                  Karnataka Samaj Exclusive
                </span>
              </div>
            </div>



          </div>
        </section>

        {/* ──────────── WHO CAN PRE-REGISTER? (CLIENT FEEDBACK 1) ──────────── */}
        
        {/* ──────────── SEGMENT 3: PRE-REGISTRATION FORM ──────────── */}
        <section className="bg-[#FFF1F5] py-20" id="register" data-section="pre-register">
          <div className="container mx-auto px-4 lg:px-12 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left: Why Should I Pre-Register? */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white border border-[#FADADF] text-[#DB1866] text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 fill-[#DB1866]" /> {t.whyPreRegister.badge}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2A3773] mb-4 tracking-tight">
                    {t.whyPreRegister.title}
                  </h2>
                  <p className="text-gray-600 text-base mb-8">
                    {t.whyPreRegister.subtitle}
                  </p>

                  <ul className="space-y-4">
                    {t.whyPreRegister.benefits.map((item, idx) => (
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
                    src="/family.webp" 
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
                    <div className="text-center py-6 md:py-10 animate-in zoom-in-95 duration-500 space-y-8 max-w-2xl mx-auto">
                      {/* Top Celebration Badge */}
                      <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-4 py-2 rounded-full shadow-sm">
                        <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: '3s' }} /> Pre-Registration Confirmed • Free VIP Premium Reserved
                      </div>

                      {/* Joyful Icon & Heading */}
                      <div>
                        <div className="w-20 h-20 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-600/30 ring-8 ring-emerald-50">
                          <Check className="w-10 h-10 stroke-[3]" />
                        </div>
                        <h3 className="text-2xl md:text-4xl font-bold font-sans text-[#2A3773] mb-3">
                          Application Received with Respect & Care! 🙏
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                          Dhanyawad! We are honored to welcome your family to <strong>Maratha Matrimony</strong>. Your VIP status is locked in for Karnataka's grand community launch.
                        </p>
                      </div>

                      {/* ──────────── GOD-LEVEL VIP DIGITAL PASS CARD ──────────── */}
                      <div className="bg-gradient-to-br from-[#1B2554] via-[#2A3773] to-[#121A3D] rounded-3xl p-6 md:p-8 text-white text-left shadow-2xl relative overflow-hidden border border-white/15 space-y-6">
                        {/* Ambient Glow Orbs */}
                        <div className="absolute -right-16 -top-16 w-52 h-52 bg-[#DB1866]/30 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -left-16 -bottom-16 w-52 h-52 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

                        {/* Pass Header */}
                        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-[#DB1866] flex items-center justify-center shadow-md">
                              <Heart className="w-5 h-5 text-white" fill="currentColor" />
                            </div>
                            <div>
                              <p className="text-sm font-bold tracking-wide font-sans">MARATHA MATRIMONY</p>
                              <p className="text-[10px] text-pink-300 font-semibold tracking-wider uppercase">Karnataka Exclusive Platform</p>
                            </div>
                          </div>
                          <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3 h-3 fill-black" /> VIP PASS
                          </div>
                        </div>

                        {/* Candidate Info Badge */}
                        <div className="relative z-10 flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                          {photoPreview ? (
                            <img src={photoPreview} alt="Candidate" className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-md shrink-0" />
                          ) : (
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#DB1866] to-pink-500 text-white flex items-center justify-center font-bold text-2xl border-2 border-white/30 shrink-0 shadow-inner">
                              {(formData.fullName || "C").charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-lg font-bold text-white truncate">{formData.fullName || "Candidate"}</h4>
                              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 border border-emerald-500/30">
                                <Check className="w-3 h-3 stroke-[3]" /> VIP Early Access
                              </span>
                            </div>
                            <p className="text-xs text-blue-200 mt-0.5 font-medium">
                              {formData.caste} • {formData.district}, Karnataka • Managed by {formData.registeringFor}
                            </p>
                            <p className="text-[11px] text-pink-200 mt-0.5 font-medium">
                              {formData.rashi ? 'Rashi: ' + formData.rashi + ' • ' : ''}{formData.nakshatra ? 'Nakshatra: ' + formData.nakshatra + ' • ' : ''}Birth Time: {formData.birthTime}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 mt-1.5">
                              <span className="text-[11px] font-mono text-amber-300 font-bold tracking-wider bg-black/30 px-2 py-0.5 rounded">
                                Pass ID: {priorityPass}
                              </span>
                              <span className={'text-[10px] px-2 py-0.5 rounded-full font-bold ' + (formData.photoUrl ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-white/10 text-gray-300')}>
                                Photo: {formData.photoUrl ? 'Attached ✓' : 'Skipped (Add later)'}
                              </span>
                            </div>
                            {emailNotice && (
                              <p className="text-[11px] text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg mt-2">
                                ✓ VIP Confirmation dispatch active for {formData.email}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* VIP Perks Grid */}
                        <div className="relative z-10 grid grid-cols-3 gap-2.5 text-xs">
                          <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                            <p className="text-pink-300 font-bold text-[13px]">₹4,999 Premium</p>
                            <p className="text-[10px] text-gray-300 mt-0.5">Free at Launch</p>
                          </div>
                          <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                            <p className="text-emerald-300 font-bold text-[13px]">Priority Review</p>
                            <p className="text-[10px] text-gray-300 mt-0.5">Verified in 24h</p>
                          </div>
                          <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                            <p className="text-amber-300 font-bold text-[13px]">Direct Connect</p>
                            <p className="text-[10px] text-gray-300 mt-0.5">Zero Limits</p>
                          </div>
                        </div>

                        {/* ──────────── MULTI-AUDIENCE VIRAL SHARING ENGINE ──────────── */}
                        <div className="relative z-10 space-y-3 pt-2 border-t border-white/10">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-blue-100 flex items-center gap-1.5">
                              <Share2 className="w-4 h-4 text-pink-400" /> Share with Family & Community:
                            </p>
                            <span className="text-[10px] text-amber-300 font-bold tracking-wide">1-Click Viral Invite</span>
                          </div>

                          {/* Persona Selection Tabs */}
                          <div className="grid grid-cols-3 gap-2 bg-black/30 p-1.5 rounded-xl border border-white/10 text-xs font-bold">
                            <button 
                              type="button" 
                              onClick={() => setShareCategory("family")}
                              className={`py-2 px-2 rounded-lg transition-all text-center ${shareCategory === "family" ? 'bg-[#DB1866] text-white shadow-md scale-105' : 'text-blue-200 hover:text-white'}`}
                            >
                              👨‍👩‍👧 Family Group
                            </button>
                            <button 
                              type="button" 
                              onClick={() => setShareCategory("friends")}
                              className={`py-2 px-2 rounded-lg transition-all text-center ${shareCategory === "friends" ? 'bg-[#DB1866] text-white shadow-md scale-105' : 'text-blue-200 hover:text-white'}`}
                            >
                              👫 Friends
                            </button>
                            <button 
                              type="button" 
                              onClick={() => setShareCategory("status")}
                              className={`py-2 px-2 rounded-lg transition-all text-center ${shareCategory === "status" ? 'bg-[#DB1866] text-white shadow-md scale-105' : 'text-blue-200 hover:text-white'}`}
                            >
                              📱 WhatsApp Status
                            </button>
                          </div>

                          {/* Formatted Message Preview */}
                          <div className="bg-black/40 p-3.5 rounded-xl border border-white/10 text-xs text-gray-200 font-sans leading-relaxed">
                            <p className="whitespace-pre-line text-blue-100">{getShareMessage()}</p>
                          </div>

                          {/* Primary Share Action Buttons */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <a 
                              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(getShareMessage())}`}
                              target="_blank"
                              rel="noreferrer"
                              className="h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 text-sm transition-all hover:scale-[1.02]"
                            >
                              <MessageCircle className="w-5 h-5" /> Share on WhatsApp
                            </a>

                            <button 
                              type="button"
                              onClick={handleCopyShare}
                              className="h-12 bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm transition-all active:scale-95"
                            >
                              {copiedToast ? (
                                <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                                  <Check className="w-4 h-4 stroke-[3]" /> Copied to Clipboard! 🎉
                                </span>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4" /> Copy Invitation Message
                                </>
                              )}
                            </button>
                          </div>

                          {/* Native Device Share Sheet Trigger */}
                          <button
                            type="button"
                            onClick={handleNativeShare}
                            className="w-full text-center text-xs text-blue-300 hover:text-white font-semibold flex items-center justify-center gap-1 pt-1 underline"
                          >
                            <Share2 className="w-3.5 h-3.5" /> Share via other apps (Instagram, Telegram, SMS)
                          </button>
                        </div>
                      </div>

                      {/* What Happens Next Roadmap */}
                      <div className="text-left bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
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

                      {/* Secondary Bottom Navigation Buttons */}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                        <a 
                          href={`https://wa.me/919844295369?text=Hello%20Maratha%20Matrimony,%20I%20have%20pre-registered%20the%20profile%20of%20${encodeURIComponent(formData.fullName || "my family member")}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-full sm:w-auto flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 text-sm transition-all"
                        >
                          <MessageCircle className="w-4 h-4" /> Message Support on WhatsApp
                        </a>
                        <Button 
                          onClick={handleRegisterAnother} 
                          variant="outline"
                          className="w-full sm:w-auto h-12 border-gray-300 text-[#2A3773] rounded-xl px-6 font-bold hover:bg-gray-50 text-sm cursor-pointer"
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
                      
                      {/* Stepper Header — 100% Centered & Responsive */}
                      <div className="relative mb-8 md:mb-10 max-w-xl mx-auto px-1 sm:px-2">
                        {/* Background Connecting Track */}
                        <div className="absolute top-3.5 sm:top-4 left-6 sm:left-8 right-6 sm:right-8 h-1 bg-gray-100 -translate-y-1/2 z-0 rounded-full" />
                        {/* Active Progress Bar Fill */}
                        <div 
                          className="absolute top-3.5 sm:top-4 left-6 sm:left-8 h-1 bg-[#DB1866] -translate-y-1/2 z-0 rounded-full transition-all duration-300"
                          style={{ 
                            width: currentStep === 1 ? '0%' : currentStep === 2 ? '33.33%' : currentStep === 3 ? '66.66%' : 'calc(100% - 3rem)' 
                          }}
                        />

                        {/* Step Nodes */}
                        <div className="relative z-10 flex justify-between items-start">
                          {[
                            { num: 1, label: "Basic", fullLabel: "Basic Details" },
                            { num: 2, label: "Personal", fullLabel: "Personal Details" },
                            { num: 3, label: "Preferences", fullLabel: "Preferences" },
                            { num: 4, label: "Submit", fullLabel: "Upload & Submit" }
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
                                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                  isActive 
                                    ? 'bg-[#DB1866] text-white shadow-md shadow-[#DB1866]/30 ring-4 ring-[#FFF1F5] scale-110' 
                                    : isCompleted
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'bg-white border-2 border-gray-200 text-gray-400'
                                }`}>
                                  {isCompleted ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" /> : s.num}
                                </div>
                                <span className={`text-[10px] sm:text-[11px] font-bold mt-1.5 sm:mt-2 leading-tight px-0.5 transition-colors ${
                                  isActive ? 'text-[#DB1866]' : isCompleted ? 'text-[#2A3773]' : 'text-gray-400'
                                }`}>
                                  <span className="sm:hidden">{s.label}</span>
                                  <span className="hidden sm:inline">{s.fullLabel}</span>
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
                                  <option value="Parents">Parents</option>
                                  <option value="Brother">Brother</option>
                                  <option value="Sister">Sister</option>
                                  <option value="Relative">Guardian / Relative</option>
                                </select>
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">Candidate First & Middle Name *</Label>
                                <Input 
                                  name="fullName" 
                                  value={formData.fullName} 
                                  onChange={handleChange} 
                                  placeholder="e.g. Rohit Ramesh" 
                                  className="h-12 bg-gray-50 rounded-xl font-medium" 
                                  required 
                                />
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">Family Surname (Annav / आडनाव) *</Label>
                                <Input 
                                  name="surname" 
                                  value={formData.surname} 
                                  onChange={handleChange} 
                                  placeholder="(e.g., Morey, Jadhav, Ingle, Patil, etc.)" 
                                  className="h-12 bg-gray-50 rounded-xl font-medium" 
                                  required 
                                />
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">Maratha Caste / Sub-Caste *</Label>
                                <select 
                                  name="caste" 
                                  value={formData.caste} 
                                  onChange={handleChange} 
                                  className="w-full h-12 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-[#DB1866] focus:bg-white outline-none text-sm font-medium"
                                  required
                                >
                                  <option value="96 Kuli Maratha">96 Kuli Maratha (९६ कुळी मराठा)</option>
                                  <option value="Kunbi Maratha">Kunbi Maratha (कुणबी मराठा)</option>
                                  <option value="Deshastha Maratha">Deshastha Maratha (देशस्थ मराठा)</option>
                                  <option value="Kshatriya Maratha">Kshatriya Maratha (क्षत्रिय मराठा)</option>
                                  <option value="Maratha (All / Other)">Maratha (All / Other)</option>
                                </select>
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

                              <div className="space-y-1.5 md:col-span-2">
                                  <Label className="text-xs font-bold text-[#2A3773]">District in Karnataka (All 31 Districts) *</Label>
                                  <select 
                                    name="district" 
                                    value={formData.district} 
                                    onChange={(e) => {
                                      handleChange(e);
                                      setFormData(prev => ({ ...prev, city: e.target.value, district: e.target.value }));
                                    }} 
                                    className="w-full h-12 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-[#DB1866] focus:bg-white outline-none text-sm font-medium"
                                    required
                                  >
                                    <option value="">Select District</option>
                                    <option value="Bagalkote">Bagalkote</option>
                                    <option value="Ballari">Ballari (Bellary)</option>
                                    <option value="Belagavi">Belagavi (Belgaum)</option>
                                    <option value="Bengaluru Rural">Bengaluru Rural</option>
                                    <option value="Bengaluru Urban">Bengaluru Urban</option>
                                    <option value="Bidar">Bidar</option>
                                    <option value="Chamarajanagar">Chamarajanagar</option>
                                    <option value="Chikkaballapura">Chikkaballapura</option>
                                    <option value="Chikkamagaluru">Chikkamagaluru</option>
                                    <option value="Chitradurga">Chitradurga</option>
                                    <option value="Dakshina Kannada">Dakshina Kannada (Mangaluru)</option>
                                    <option value="Davanagere">Davanagere</option>
                                    <option value="Dharwad">Dharwad (Hubballi)</option>
                                    <option value="Gadag">Gadag</option>
                                    <option value="Hassan">Hassan</option>
                                    <option value="Haveri">Haveri</option>
                                    <option value="Kalaburagi">Kalaburagi (Gulbarga)</option>
                                    <option value="Kodagu">Kodagu (Coorg)</option>
                                    <option value="Kolar">Kolar</option>
                                    <option value="Koppal">Koppal</option>
                                    <option value="Mandya">Mandya</option>
                                    <option value="Mysuru">Mysuru (Mysore)</option>
                                    <option value="Raichur">Raichur</option>
                                    <option value="Ramanagara">Ramanagara</option>
                                    <option value="Shivamogga">Shivamogga (Shimoga)</option>
                                    <option value="Tumakuru">Tumakuru (Tumkur)</option>
                                    <option value="Udupi">Udupi</option>
                                    <option value="Uttara Kannada">Uttara Kannada (Karwar)</option>
                                    <option value="Vijayanagara">Vijayanagara (Hospet)</option>
                                    <option value="Vijayapura">Vijayapura (Bijapur)</option>
                                    <option value="Yadgir">Yadgir</option>
                                  </select>
                                </div>
                            </div>
                          </div>
                        )}

                        {/* ──────────── STEP 2: PERSONAL DETAILS (CLIENT FEEDBACK 2: DOB & AGE PLACED HERE) ──────────── */}
                        {currentStep === 2 && (
                          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                            

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
                                <Label className="text-xs font-bold text-[#2A3773]">Time of Birth (12-Hour AM/PM) *</Label>
                                <div className="grid grid-cols-3 gap-2">
                                  <select
                                    name="birthHour"
                                    value={formData.birthHour}
                                    onChange={(e) => {
                                      const h = e.target.value;
                                      setFormData(prev => ({
                                        ...prev,
                                        birthHour: h,
                                        birthTime: h + ':' + prev.birthMinute + ' ' + prev.birthAmPm
                                      }));
                                    }}
                                    className="h-12 px-2 border border-gray-200 rounded-xl bg-gray-50 focus:border-[#DB1866] focus:bg-white outline-none text-xs font-bold"
                                    required
                                  >
                                    {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(h => (
                                      <option key={h} value={h}>{h} Hr</option>
                                    ))}
                                  </select>

                                  <select
                                    name="birthMinute"
                                    value={formData.birthMinute}
                                    onChange={(e) => {
                                      const m = e.target.value;
                                      setFormData(prev => ({
                                        ...prev,
                                        birthMinute: m,
                                        birthTime: prev.birthHour + ':' + m + ' ' + prev.birthAmPm
                                      }));
                                    }}
                                    className="h-12 px-2 border border-gray-200 rounded-xl bg-gray-50 focus:border-[#DB1866] focus:bg-white outline-none text-xs font-bold"
                                    required
                                  >
                                    {['00','05','10','15','20','25','30','35','40','45','50','55'].map(m => (
                                      <option key={m} value={m}>{m} Min</option>
                                    ))}
                                  </select>

                                  <div className="flex rounded-xl overflow-hidden border border-gray-200 p-0.5 bg-gray-50 h-12">
                                    <button
                                      type="button"
                                      onClick={() => setFormData(prev => ({ ...prev, birthAmPm: 'AM', birthTime: prev.birthHour + ':' + prev.birthMinute + ' AM' }))}
                                      className={'flex-1 flex items-center justify-center font-bold text-xs rounded-lg transition-all ' + (formData.birthAmPm === 'AM' ? 'bg-[#DB1866] text-white shadow-xs' : 'text-gray-600 hover:text-black')}
                                    >
                                      AM
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setFormData(prev => ({ ...prev, birthAmPm: 'PM', birthTime: prev.birthHour + ':' + prev.birthMinute + ' PM' }))}
                                      className={'flex-1 flex items-center justify-center font-bold text-xs rounded-lg transition-all ' + (formData.birthAmPm === 'PM' ? 'bg-[#DB1866] text-white shadow-xs' : 'text-gray-600 hover:text-black')}
                                    >
                                      PM
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">Rashi / Moon Sign (रास / राशी)</Label>
                                <select 
                                  name="rashi" 
                                  value={formData.rashi} 
                                  onChange={handleChange} 
                                  className="w-full h-12 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-[#DB1866] focus:bg-white outline-none text-sm font-medium"
                                >
                                  <option value="">Select Rashi (12 Rashis)</option>
                                  <option value="Mesha">1. Mesha / Aries (मेष)</option>
                                  <option value="Vrishabha">2. Vrishabha / Taurus (वृषभ)</option>
                                  <option value="Mithuna">3. Mithuna / Gemini (मिथुन)</option>
                                  <option value="Karka">4. Karka / Cancer (कर्क)</option>
                                  <option value="Simha">5. Simha / Leo (सिंह)</option>
                                  <option value="Kanya">6. Kanya / Virgo (कन्या)</option>
                                  <option value="Tula">7. Tula / Libra (तूळ)</option>
                                  <option value="Vrishchika">8. Vrishchika / Scorpio (वृश्चिक)</option>
                                  <option value="Dhanu">9. Dhanu / Sagittarius (धनु)</option>
                                  <option value="Makara">10. Makara / Capricorn (मकर)</option>
                                  <option value="Kumbha">11. Kumbha / Aquarius (कुंभ)</option>
                                  <option value="Meena">12. Meena / Pisces (मीन)</option>
                                  <option value="Don't Know / Not Sure">Don't Know / Not Sure</option>
                                </select>
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-[#2A3773]">Nakshatra / Birth Star (नक्षत्र)</Label>
                                <select 
                                  name="nakshatra" 
                                  value={formData.nakshatra} 
                                  onChange={handleChange} 
                                  className="w-full h-12 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-[#DB1866] focus:bg-white outline-none text-sm font-medium"
                                >
                                  <option value="">Select Nakshatra (All 27 Stars)</option>
                                  <option value="Ashwini">1. Ashwini (अश्विनी)</option>
                                  <option value="Bharani">2. Bharani (भरणी)</option>
                                  <option value="Krittika">3. Krittika (कृत्तिका)</option>
                                  <option value="Rohini">4. Rohini (रोहिणी)</option>
                                  <option value="Mrigashira">5. Mrigashira (मृगशीर्ष)</option>
                                  <option value="Ardra">6. Ardra (आर्द्रा)</option>
                                  <option value="Punarvasu">7. Punarvasu (पुनर्वसु)</option>
                                  <option value="Pushya">8. Pushya (पुष्य)</option>
                                  <option value="Ashlesha">9. Ashlesha (आश्लेषा)</option>
                                  <option value="Magha">10. Magha (मघा)</option>
                                  <option value="Purva Phalguni">11. Purva Phalguni (पूर्वा फाल्गुनी)</option>
                                  <option value="Uttara Phalguni">12. Uttara Phalguni (उत्तरा फाल्गुनी)</option>
                                  <option value="Hasta">13. Hasta (हस्त)</option>
                                  <option value="Chitra">14. Chitra (चित्रा)</option>
                                  <option value="Swati">15. Swati (स्वाती)</option>
                                  <option value="Vishakha">16. Vishakha (विशाखा)</option>
                                  <option value="Anuradha">17. Anuradha (अनुराधा)</option>
                                  <option value="Jyeshtha">18. Jyeshtha (ज्येष्ठा)</option>
                                  <option value="Mula">19. Mula (मूळ)</option>
                                  <option value="Purva Ashadha">20. Purva Ashadha (पूर्वाषाढा)</option>
                                  <option value="Uttara Ashadha">21. Uttara Ashadha (उत्तराषाढा)</option>
                                  <option value="Shravana">22. Shravana (श्रवण)</option>
                                  <option value="Dhanishta">23. Dhanishta (धनिष्ठा)</option>
                                  <option value="Shatabhisha">24. Shatabhisha (शतभिषा)</option>
                                  <option value="Purva Bhadrapada">25. Purva Bhadrapada (पूर्वा भाद्रपदा)</option>
                                  <option value="Uttara Bhadrapada">26. Uttara Bhadrapada (उत्तरा भाद्रपदा)</option>
                                  <option value="Revati">27. Revati (रेवती)</option>
                                  <option value="Don't Know / Not Sure">Don't Know / Not Sure</option>
                                </select>
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
                                  <option value="Less than 4'5&quot;">Less than 4'5" (135 cm)</option>
                                  <option value="4'6&quot;">4'6" (137 cm)</option>
                                  <option value="4'7&quot;">4'7" (140 cm)</option>
                                  <option value="4'8&quot;">4'8" (142 cm)</option>
                                  <option value="4'9&quot;">4'9" (145 cm)</option>
                                  <option value="4'10&quot;">4'10" (147 cm)</option>
                                  <option value="4'11&quot;">4'11" (150 cm)</option>
                                  <option value="5'0&quot;">5'0" (152 cm)</option>
                                  <option value="5'1&quot;">5'1" (155 cm)</option>
                                  <option value="5'2&quot;">5'2" (157 cm)</option>
                                  <option value="5'3&quot;">5'3" (160 cm)</option>
                                  <option value="5'4&quot;">5'4" (162 cm)</option>
                                  <option value="5'5&quot;">5'5" (165 cm)</option>
                                  <option value="5'6&quot;">5'6" (167 cm)</option>
                                  <option value="5'7&quot;">5'7" (170 cm)</option>
                                  <option value="5'8&quot;">5'8" (172 cm)</option>
                                  <option value="5'9&quot;">5'9" (175 cm)</option>
                                  <option value="5'10&quot;">5'10" (177 cm)</option>
                                  <option value="5'11&quot;">5'11" (180 cm)</option>
                                  <option value="6'0&quot;">6'0" (182 cm)</option>
                                  <option value="6'1&quot;">6'1" (185 cm)</option>
                                  <option value="6'2&quot;">6'2" (188 cm)</option>
                                  <option value="6'3&quot;">6'3" (190 cm)</option>
                                  <option value="6'4&quot;">6'4" (193 cm)</option>
                                  <option value="Above 6'5&quot;">Above 6'5" (196 cm+)</option>
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
                                  <option value="SSLC / 10th">SSLC / 10th Standard</option>
                                  <option value="PUC / 12th">PUC / 12th Standard</option>
                                  <option value="Diploma / Polytechnic">Diploma / Polytechnic</option>
                                  <option value="B.E / B.Tech">B.E / B.Tech / Engineering</option>
                                  <option value="Bachelors (B.Com / B.Sc / B.A / BCA / BBA)">Bachelors (B.Com / B.Sc / B.A / BCA / BBA)</option>
                                  <option value="Masters (M.Com / M.Sc / M.A / MCA / M.Tech)">Masters (M.Com / M.Sc / M.A / MCA / M.Tech)</option>
                                  <option value="MBA / Post Graduate">MBA / Post Graduate</option>
                                  <option value="MBBS / Medical / MD / Dental">MBBS / Medical / MD / Dental</option>
                                  <option value="CA / CS / Finance">CA / CS / Finance</option>
                                  <option value="Doctorate / Ph.D">Doctorate / Ph.D</option>
                                  <option value="Others">Others</option>
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
                                  <option value="Less than 3 Lakhs">Less than ₹3 Lakhs</option>
                                  <option value="3 to 5 Lakhs">₹3 to ₹5 Lakhs</option>
                                  <option value="5 to 7 Lakhs">₹5 to ₹7 Lakhs</option>
                                  <option value="8 to 10 Lakhs">₹8 to ₹10 Lakhs</option>
                                  <option value="11 to 15 Lakhs">₹11 to ₹15 Lakhs</option>
                                  <option value="16 to 20 Lakhs">₹16 to ₹20 Lakhs</option>
                                  <option value="21 to 25 Lakhs">₹21 to ₹25 Lakhs</option>
                                  <option value="Above 25 Lakhs">Above ₹25 Lakhs</option>
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
                                <Label className="text-xs font-bold text-[#2A3773]">Partner Education Preference</Label>
                                <select 
                                  name="prefEducation" 
                                  value={formData.prefEducation} 
                                  onChange={handleChange} 
                                  className="w-full h-12 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-[#DB1866] focus:bg-white outline-none text-sm font-medium"
                                >
                                  <option value="Any Education">Any Education / Degree</option>
                                  <option value="Graduate / Bachelors">Graduate / Bachelors Degree (B.E, B.Tech, B.Com, B.Sc, BCA, etc.)</option>
                                  <option value="Post Graduate / Masters">Post Graduate / Masters (M.Tech, MBA, M.Com, MCA, etc.)</option>
                                  <option value="Professional (CA / Doctor / Engineer)">Professional Degree (Doctor, CA, CS, Engineer, Law)</option>
                                  <option value="SSLC / PUC">SSLC / PUC / 12th Standard</option>
                                  <option value="Doctorate / Ph.D">Doctorate / Ph.D</option>
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
                                    {compressionStats && (
                                      <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full">
                                        ⚡ Auto-Optimized {compressionStats.savedPercent}% ({compressionStats.compressedSize} KB)
                                      </span>
                                    )}
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

                            {!photoPreview && (
                              <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-2xl flex items-center gap-3 text-xs text-amber-900 font-medium">
                                <span className="text-lg shrink-0">📷</span>
                                <p className="leading-relaxed">
                                  <strong>Photo Upload is Optional:</strong> You can submit now without a photo. A traditional avatar is assigned automatically, and you can upload photos later from your dashboard.
                                </p>
                              </div>
                            )}

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
        
        <section className="bg-[#fdf5f8] py-20" id="who-can-register">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white border border-[#FADADF] text-[#DB1866] text-xs font-bold px-4 py-1.5 rounded-full mb-3 shadow-xs">
              <Users className="w-3.5 h-3.5 text-[#DB1866]" /> {t.whoCanRegister.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2A3773] mb-4 tracking-tight">{t.whoCanRegister.title}</h2>
            <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto mb-12">
              {t.whoCanRegister.subtitle}
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
              <Heart className="w-3.5 h-3.5 fill-[#DB1866]" /> {t.whyWeExist.badge}
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-[#2A3773] mb-4 tracking-tight">
              {t.whyWeExist.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-16 leading-relaxed">
              {t.whyWeExist.subtitle}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {t.whyWeExist.pillars.map((item, idx) => {
                const icons = [ShieldCheck, Lock, Users, BadgeCheck];
                const colors = ["bg-blue-50 text-[#2A3773]", "bg-pink-50 text-[#DB1866]", "bg-indigo-50 text-indigo-600", "bg-emerald-50 text-emerald-600"];
                const IconComponent = icons[idx % icons.length];
                const color = colors[idx % colors.length];
                return (
                <div 
                  key={idx} 
                  className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl hover:border-[#DB1866]/30 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${color} group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[#2A3773] mb-3 group-hover:text-[#DB1866] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ──────────── REGISTRATION WIZARD (CLIENT FEEDBACK 2: DOB & AGE IN PERSONAL DETAILS) ──────────── */}
        
        <section className="bg-[#2A3773] py-20" id="how-it-works">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-pink-200 text-xs font-bold px-4 py-1.5 rounded-full mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-pink-300" /> {t.howItWorks.badge}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center tracking-tight">{t.howItWorks.title}</h2>
              <p className="text-blue-100 text-sm mt-2 max-w-lg mx-auto">{t.howItWorks.subtitle}</p>
            </div>
            
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

        {/* ──────────── DEDICATED ABOUT US SECTION (#about) ──────────── */}
        <section className="py-20 bg-gradient-to-b from-[#FFF8FA] via-white to-[#FFF8FA] border-t border-b border-pink-100/60" id="about">
          <div className="container mx-auto px-4 max-w-6xl">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-[#FFF1F5] border border-[#FADADF] text-[#DB1866] text-xs font-bold px-4 py-1.5 rounded-full mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#DB1866]" /> 
                <span>{t.aboutSection.badge}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#2A3773] tracking-tight mb-4">
                {t.aboutSection.title}
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {t.aboutSection.subtitle}
              </p>
            </div>

            {/* Core Narrative & Cultural Pillars Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
              
              {/* Left Col: Mission & Lineage Cards (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg transition-all space-y-4">
                  <div className="flex items-center gap-3 text-[#DB1866]">
                    <div className="w-10 h-10 rounded-2xl bg-[#FFF1F5] flex items-center justify-center font-bold">
                      <Heart className="w-5 h-5 fill-[#DB1866]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#2A3773]">
                      {language === "kn" ? "ಕರ್ನಾಟಕ ಮರಾಠ ಸಮಾಜದ ಏಕೈಕ ವೇದಿಕೆ" : "Uniting Karnataka's Maratha Samaj"}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
                    {t.aboutSection.desc1}
                  </p>
                  <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
                    {t.aboutSection.desc2}
                  </p>
                </div>

                {/* Cultural Pillars Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-pink-100 text-center shadow-xs">
                    <div className="w-9 h-9 rounded-xl bg-pink-50 text-[#DB1866] flex items-center justify-center mx-auto mb-2 font-bold">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-[#2A3773]">{language === "kn" ? "100% ಪರಿಶೀಲನೆ" : "100% Verified"}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{language === "kn" ? "ಕುಟುಂಬ ಗೌರವ" : "Strict Screening"}</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-pink-100 text-center shadow-xs">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2A3773] flex items-center justify-center mx-auto mb-2 font-bold">
                      <Lock className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-[#2A3773]">{language === "kn" ? "ಸಂಪೂರ್ಣ ಗೌಪ್ಯತೆ" : "Privacy Shield"}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{language === "kn" ? "ರಕ್ಷಿತ ಮಾಹಿತಿ" : "Masked Phone & Bio"}</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-pink-100 text-center shadow-xs">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-[#2A3773]">{language === "kn" ? "36 ಗುಣಗಳ ಮಿಲನ" : "36 Gunas Milan"}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{language === "kn" ? "ದೇವಕ & ಗೋತ್ರ ನಿಯಮ" : "Devak Lineage"}</p>
                  </div>
                </div>

              </div>

              {/* Right Col: Founder Card (5 cols) */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#1B2554] via-[#2A3773] to-[#121A3D] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl border border-white/10 flex flex-col justify-between">
                <div className="absolute -right-12 -top-12 w-44 h-44 bg-[#DB1866]/25 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 border-[#DB1866] shadow-lg bg-gray-200">
                      <img src="/founder.webp" alt="Founder" className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-pink-300 uppercase tracking-widest">{t.aboutSection.founderRole}</p>
                      <h4 className="text-lg font-bold font-sans text-white">{t.aboutSection.founderTitle}</h4>
                      <p className="text-xs text-blue-200">Karnataka &amp; South India Maratha Samaj</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-3">
                    <p className="text-[13.5px] text-blue-100/90 leading-relaxed italic">
                      "{t.aboutSection.founderQuote1}"
                    </p>
                    <p className="text-[13.5px] text-blue-100/90 leading-relaxed italic">
                      "{t.aboutSection.founderQuote2}"
                    </p>
                  </div>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-pink-300">🚩 Jai Bhavani, Jai Shivaji</span>
                  <a 
                    href="#register" 
                    className="text-xs font-bold text-white bg-[#DB1866] hover:bg-[#B81456] px-4 py-2 rounded-full shadow-md transition-all cursor-pointer"
                  >
                    {t.nav.registerFree}
                  </a>
                </div>
              </div>

            </div>

            {/* Regional Network Presence Pill Strip */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm text-center">
              <h4 className="text-sm md:text-base font-bold text-[#2A3773] mb-2 uppercase tracking-wide">
                {t.aboutSection.presenceTitle}
              </h4>
              <p className="text-xs text-gray-500 mb-6 max-w-xl mx-auto">
                {t.aboutSection.presenceSubtitle}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                {t.aboutSection.districts.map((city: string) => (
                  <span key={city} className="bg-[#FFF8FA] border border-[#FADADF] text-[#2A3773] hover:text-[#DB1866] hover:border-[#DB1866] text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors shadow-2xs">
                    📍 {city}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>


        {/* ──────────── DEDICATED CONTACT US SECTION (#contact) ──────────── */}
        <section className="py-20 bg-white border-b border-gray-100" id="contact">
          <div className="container mx-auto px-4 max-w-6xl">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-[#FFF1F5] border border-[#FADADF] text-[#DB1866] text-xs font-bold px-4 py-1.5 rounded-full mb-3 shadow-xs">
                <MessageCircle className="w-3.5 h-3.5 text-[#DB1866]" /> 
                <span>{t.contactSection.badge}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#2A3773] tracking-tight mb-4">
                {t.contactSection.title}
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {t.contactSection.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Col: Direct Reach Channels (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* 1. WhatsApp Card */}
                <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-3xl p-6 shadow-lg shadow-emerald-600/20 relative overflow-hidden">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="bg-emerald-400/30 border border-white/30 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-300 animate-ping" /> Online Now
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mb-1">{t.contactSection.whatsappCardTitle}</h4>
                  <p className="text-xs text-emerald-100 mb-5 leading-relaxed">{t.contactSection.whatsappCardSubtitle}</p>
                  <a
                    href={getWhatsAppLink("Hello Maratha Matrimony Support, I would like assistance with pre-registration and matches.")}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-white text-emerald-700 hover:bg-emerald-50 font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all hover:scale-102"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" /> {t.contactSection.whatsappBtnText}
                  </a>
                </div>

                {/* 2. Direct Calling Phone Numbers */}
                <div className="bg-[#FFF8FA] rounded-3xl p-6 border border-[#FADADF] space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-pink-100 text-[#DB1866] flex items-center justify-center font-bold shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2A3773]">{t.contactSection.phoneCardTitle}</h4>
                      <p className="text-[11px] text-gray-500">{t.contactSection.phoneCardSubtitle}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <a 
                      href="tel:+919844295369" 
                      className="flex-1 bg-white hover:bg-[#FFF1F5] border border-gray-200 hover:border-[#DB1866] text-[#2A3773] hover:text-[#DB1866] font-bold text-xs py-2.5 px-3 rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#DB1866]" /> {t.contactSection.phone1}
                    </a>
                    <a 
                      href="tel:+918861962026" 
                      className="flex-1 bg-white hover:bg-[#FFF1F5] border border-gray-200 hover:border-[#DB1866] text-[#2A3773] hover:text-[#DB1866] font-bold text-xs py-2.5 px-3 rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#DB1866]" /> {t.contactSection.phone2}
                    </a>
                  </div>
                </div>

                {/* 3. Email Support & Regional Presence */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#2A3773] flex items-center justify-center font-bold shrink-0 mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2A3773]">{t.contactSection.emailCardTitle}</h4>
                      <a href={`mailto:${t.contactSection.emailAddress}`} className="text-xs font-semibold text-[#DB1866] hover:underline">
                        {t.contactSection.emailAddress}
                      </a>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2A3773]">{t.contactSection.presenceTitle}</h4>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">{t.contactSection.locations}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Col: Instant Callback / Message Form (7 cols) */}
              <div className="lg:col-span-7">
                <div className="bg-[#FFF8FA] rounded-3xl p-6 md:p-8 border border-[#FADADF] shadow-sm">
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-[#2A3773] mb-1">
                      {t.contactSection.formTitle}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      {t.contactSection.formSubtitle}
                    </p>
                  </div>

                  {contactSent && (
                    <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>{language === "kn" ? "ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಸ್ವೀಕರಿಸಲಾಗಿದೆ, ನಮ್ಮ ತಂಡವು ಶೀಘ್ರದಲ್ಲೇ ಸಂಪರ್ಕಿಸುತ್ತದೆ." : "Thank you! WhatsApp inquiry opened. Our relationship desk is reviewing your request."}</span>
                    </div>
                  )}

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#2A3773]">{t.contactSection.nameLabel}</Label>
                        <Input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder={t.contactSection.namePlaceholder}
                          className="bg-white border-gray-200 rounded-xl text-xs h-11 focus:ring-[#DB1866] focus:border-[#DB1866]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#2A3773]">{t.contactSection.phoneLabel}</Label>
                        <Input
                          type="tel"
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder={t.contactSection.phonePlaceholder}
                          className="bg-white border-gray-200 rounded-xl text-xs h-11 focus:ring-[#DB1866] focus:border-[#DB1866]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#2A3773]">{t.contactSection.districtLabel}</Label>
                      <Input
                        type="text"
                        value={contactForm.district}
                        onChange={(e) => setContactForm(prev => ({ ...prev, district: e.target.value }))}
                        placeholder={t.contactSection.districtPlaceholder}
                        className="bg-white border-gray-200 rounded-xl text-xs h-11 focus:ring-[#DB1866] focus:border-[#DB1866]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold text-[#2A3773]">{t.contactSection.messageLabel}</Label>
                      <textarea
                        rows={3}
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder={t.contactSection.messagePlaceholder}
                        className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs focus:ring-[#DB1866] focus:border-[#DB1866] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#DB1866] hover:bg-[#B81456] text-white font-bold text-sm h-12 rounded-xl shadow-lg shadow-[#DB1866]/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                    >
                      <MessageCircle className="w-4 h-4" /> {t.contactSection.submitBtnText}
                    </button>

                    <p className="text-[11px] text-gray-500 text-center font-medium pt-1">
                      {t.contactSection.privacyNotice}
                    </p>
                  </form>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-gray-50 border-t border-gray-100" id="faqs">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-[#FFF1F5] border border-[#FADADF] text-[#DB1866] text-xs font-bold px-4 py-1.5 rounded-full mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#DB1866]" /> {t.faqs.badge}
            </div>
            <h2 className="text-3xl font-bold text-[#2A3773] mb-10 tracking-tight">{t.faqs.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {t.faqs.items.map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-[#DB1866]/30 transition-colors">
                  <h4 className="font-bold text-[#2A3773] text-sm mb-2">{faq.q}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ──────────── FLOATING COMMUNITY SHARE PILL ──────────── */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setShowShareModal(true)}
          className="group flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-4 md:px-5 py-3 rounded-full shadow-2xl shadow-emerald-600/40 hover:scale-105 transition-all text-xs md:text-sm border-2 border-white/30 backdrop-blur-md"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <span className="font-sans">Share on WhatsApp</span>
          <span className="bg-amber-400 text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
            Free VIP
          </span>
        </button>
      </div>

      {/* ──────────── GLOBAL SHARE PLATFORM MODAL ──────────── */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-[#1B2554] via-[#2A3773] to-[#121A3D] rounded-3xl max-w-lg w-full p-6 md:p-8 text-white shadow-2xl border border-white/20 relative overflow-hidden space-y-6">
            
            {/* Ambient Glows */}
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#DB1866]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-emerald-500/25 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#DB1866] flex items-center justify-center shadow-md">
                  <Heart className="w-5 h-5 text-white" fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-wide">Share Maratha Matrimony</h3>
                  <p className="text-[11px] text-pink-300 font-semibold uppercase tracking-wider">Karnataka Community Network</p>
                </div>
              </div>
              <button 
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Persona Selection Tabs */}
            <div className="relative z-10 space-y-2">
              <p className="text-xs font-bold text-blue-200 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-pink-400" /> Choose Invitation Style:
              </p>
              <div className="grid grid-cols-3 gap-2 bg-black/30 p-1.5 rounded-xl border border-white/10 text-xs font-bold">
                <button 
                  type="button" 
                  onClick={() => setShareCategory("family")}
                  className={`py-2 px-1 rounded-lg transition-all text-center ${shareCategory === "family" ? 'bg-[#DB1866] text-white shadow-md scale-105' : 'text-blue-200 hover:text-white'}`}
                >
                  👨‍👩‍👧 Family Group
                </button>
                <button 
                  type="button" 
                  onClick={() => setShareCategory("friends")}
                  className={`py-2 px-1 rounded-lg transition-all text-center ${shareCategory === "friends" ? 'bg-[#DB1866] text-white shadow-md scale-105' : 'text-blue-200 hover:text-white'}`}
                >
                  👫 Friends
                </button>
                <button 
                  type="button" 
                  onClick={() => setShareCategory("status")}
                  className={`py-2 px-1 rounded-lg transition-all text-center ${shareCategory === "status" ? 'bg-[#DB1866] text-white shadow-md scale-105' : 'text-blue-200 hover:text-white'}`}
                >
                  📱 Status
                </button>
              </div>
            </div>

            {/* Message Preview Box */}
            <div className="relative z-10 bg-black/40 p-4 rounded-2xl border border-white/15 text-xs text-blue-100 font-sans leading-relaxed">
              <p className="whitespace-pre-line">{getShareMessage()}</p>
            </div>

            {/* Primary Action Buttons */}
            <div className="relative z-10 space-y-3">
              <a 
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(getShareMessage())}`}
                target="_blank"
                rel="noreferrer"
                className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 text-sm transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5" /> Share Directly to WhatsApp
              </a>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  type="button"
                  onClick={handleCopyShare}
                  className="h-11 bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-xs transition-all active:scale-95"
                >
                  {copiedToast ? (
                    <span className="text-emerald-300 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Copied! 🎉
                    </span>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Message & Link
                    </>
                  )}
                </button>

                <button 
                  type="button"
                  onClick={handleNativeShare}
                  className="h-11 bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-xs transition-all"
                >
                  <Share2 className="w-3.5 h-3.5 text-pink-400" /> Share via Apps
                </button>
              </div>
            </div>

            <p className="relative z-10 text-[11px] text-blue-300/80 text-center">
              🚩 Official Maratha Community Network • Free ₹4,999 VIP Premium Access
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
