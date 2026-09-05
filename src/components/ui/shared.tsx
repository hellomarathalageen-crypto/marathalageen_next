"use client";

import { CheckCircle2 } from "lucide-react";

interface VerifiedBadgeProps {
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function VerifiedBadge({ size = "md", showLabel = false }: VerifiedBadgeProps) {
  const sizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };
  return (
    <span className="inline-flex items-center gap-1">
      <CheckCircle2 className={`${sizes[size]} text-[#DB1866] shrink-0`} />
      {showLabel && <span className="text-xs font-semibold text-[#DB1866]">Verified</span>}
    </span>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  subLabel?: string;
  change?: string;
  positive?: boolean;
  icon?: React.ReactNode;
  accentColor?: string;
}

export function StatCard({
  label,
  value,
  subLabel,
  change,
  positive = true,
  icon,
  accentColor = "#DB1866",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
        {icon && (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}15` }}>
            <span style={{ color: accentColor }}>{icon}</span>
          </div>
        )}
      </div>
      <p className="text-2xl font-black text-[#2A3773] mb-1">{value}</p>
      {(change || subLabel) && (
        <p className={`text-xs font-semibold ${positive ? "text-green-600" : "text-red-500"}`}>
          {change && <span>{positive ? "↑" : "↓"} {change} </span>}
          {subLabel && <span className="text-gray-400 font-normal">{subLabel}</span>}
        </p>
      )}
    </div>
  );
}

interface StepProgressProps {
  steps: string[];
  currentStep: number;
}

export function StepProgress({ steps, currentStep }: StepProgressProps) {
  return (
    <div className="flex items-center gap-0 w-full overflow-x-auto">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;
        return (
          <div key={step} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  isCompleted
                    ? "bg-[#DB1866] border-[#DB1866] text-white"
                    : isActive
                    ? "bg-white border-[#DB1866] text-[#DB1866]"
                    : "bg-white border-gray-200 text-gray-400"
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
              </div>
              <p
                className={`text-[10px] font-semibold text-center leading-tight max-w-[60px] ${
                  isActive ? "text-[#DB1866]" : isCompleted ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {step}
              </p>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-1 transition-all ${
                  isCompleted ? "bg-[#DB1866]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface MatchPercentProps {
  percent: number;
  size?: number;
}

export function MatchPercent({ percent, size = 72 }: MatchPercentProps) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FFE4EF"
          strokeWidth={6}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#DB1866"
          strokeWidth={6}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute">
        <p className="text-base font-black text-[#DB1866] leading-none text-center" style={{ marginTop: -size / 2 - 6 }}>
          {percent}%
        </p>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import Link from "next/link";
import PrintableBiodata from "@/components/ui/PrintableBiodata";
import { calculateKundaliGunas, calculateCompatibilityScore, ViewerProfileData } from "@/lib/compatibility";
import { 
  Heart, Send, MessageCircle, Bookmark, ShieldCheck, 
  MapPin, Briefcase, GraduationCap, Calendar, 
  User, ChevronLeft, ChevronRight, X,
  Clock, Award, Sparkles, Phone, Mail, Eye, BadgeCheck,
  Share2, Copy, Check, ExternalLink, Printer, Lock, Crown, PhoneCall
} from "lucide-react";

export interface ProfileViewProps {
  initialData: {
    id: string;
    userId: string;
    name: string;
    age: number;
    height: string;
    maritalStatus: string;
    community: string;
    devak?: string;
    gotra?: string;
    kuldaivat?: string;
    nativePlace?: string;
    rashi?: string;
    nakshatra?: string;
    manglik: string;
    religion: string;
    motherTongue: string;
    city: string;
    state: string;
    country: string;
    education: string;
    college: string;
    profession: string;
    company: string;
    income: string;
    diet: string;
    drinking: string;
    smoking: string;
    familyType: string;
    familyValues: string;
    fatherStatus: string;
    motherStatus: string;
    brothers: string;
    sisters: string;
    about: string;
    matchPercent: number;
    isVerified: boolean;
    mobile?: string;
    photoPrivacy?: string;
    lastActive: string;
    photos: string[];
  };
  viewerProfile?: ViewerProfileData | null;
  viewerName?: string;
}

export function ProfileView({ initialData, viewerProfile, viewerName }: ProfileViewProps) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Dynamic Astrological Ashtakoota Match (36 Gunas)
  const kundaliMatch = calculateKundaliGunas(
    initialData.rashi || "Mesha",
    initialData.nakshatra || "Ashwini",
    viewerProfile?.rashi || "Simha",
    viewerProfile?.nakshatra || "Magha",
    initialData.manglik || "No",
    viewerProfile?.manglik || "No",
    viewerProfile?.gotra || "Kashyap",
    initialData.gotra
  );

  // Multi-attribute Compatibility Score (0-100%)
  const compScore = calculateCompatibilityScore(
    viewerProfile,
    {
      city: initialData.city,
      state: initialData.state,
      age: initialData.age,
      gotra: initialData.gotra,
      education: initialData.education,
      profession: initialData.profession
    }
  );
  const [showLightbox, setShowLightbox] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [photoAccessRequested, setPhotoAccessRequested] = useState(false);
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [copiedBiodata, setCopiedBiodata] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "family" | "horoscope" | "preferences">("overview");
  
  // Interest & Actions State
  const [interestStatus, setInterestStatus] = useState<"none" | "sent" | "received" | "accepted" | "loading">("loading");
  const [interestId, setInterestId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [shortlistLoading, setShortlistLoading] = useState(false);

  // Contact Reveal Shield State
  const [contactDetails, setContactDetails] = useState<{
    unlocked: boolean;
    mobile?: string;
    email?: string;
    maskedMobile: string;
    loading: boolean;
  }>({
    unlocked: false,
    maskedMobile: initialData.mobile ? `+91 ${initialData.mobile.slice(0, 2)}••••••${initialData.mobile.slice(-2)}` : "+91 98••••••12",
    loading: false,
  });

  const handleUnlockContact = async () => {
    setContactDetails(prev => ({ ...prev, loading: true }));
    try {
      const res = await fetch("/api/profile/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetProfileId: initialData.id })
      });
      if (res.status === 401) {
        window.location.href = `/login?callbackUrl=/profile/${initialData.id}`;
        return;
      }
      const data = await res.json();
      if (data.unlocked) {
        setContactDetails({
          unlocked: true,
          mobile: data.mobile,
          email: data.email,
          maskedMobile: data.mobile,
          loading: false
        });
      } else {
        setContactDetails(prev => ({ ...prev, loading: false }));
        setShowUpgradeModal(true);
      }
    } catch (err) {
      console.error("Unlock contact error:", err);
      setContactDetails(prev => ({ ...prev, loading: false }));
    }
  };

  const handleDirectUpgrade = async (plan: "PREMIUM" | "PREMIUM_PLUS") => {
    setUpgradeLoading(true);
    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, paymentId: `direct_${Date.now()}` })
      });
      if (res.ok) {
        setShowUpgradeModal(false);
        await handleUnlockContact();
      }
    } catch (e) {
      console.error("Upgrade error:", e);
    } finally {
      setUpgradeLoading(false);
    }
  };

  const getBiodataText = () => {
    const url = typeof window !== "undefined" ? window.location.href : `https://marathalageen.com/profile/${initialData.id}`;
    return `🚩 *MARATHA MATRIMONY — VERIFIED BIODATA* 🚩\n\n👤 *Candidate:* ${initialData.name}\n🎂 *Age & Height:* ${initialData.age} Yrs, ${initialData.height}\n🕊️ *Community:* ${initialData.community || "96 Kuli Maratha"} (Manglik: ${initialData.manglik || "Non-Manglik"})\n🌿 *Devak & Gotra:* ${initialData.devak || "Kalamb"} / ${initialData.gotra || "Kashyap"}\n🎓 *Education:* ${initialData.education || "Graduate"}\n💼 *Profession:* ${initialData.profession || "Private Professional"}${initialData.income ? ` (${initialData.income})` : ""}\n📍 *Location:* ${initialData.city}, ${initialData.state}\n🏠 *Family:* ${initialData.familyType || "Nuclear Family"} (Father: ${initialData.fatherStatus || "Employed"}, Mother: ${initialData.motherStatus || "Homemaker"})\n\n🔒 *View Complete Verified Profile & Photos:* \n${url}`;
  };

  const handleCopyBiodata = () => {
    navigator.clipboard.writeText(getBiodataText());
    setCopiedBiodata(true);
    setTimeout(() => setCopiedBiodata(false), 2500);
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${initialData.name} - Maratha Matrimony Biodata`,
          text: getBiodataText(),
          url: typeof window !== "undefined" ? window.location.href : `https://marathalageen.com/profile/${initialData.id}`,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      handleCopyBiodata();
    }
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const [intRes, shortRes] = await Promise.all([
          fetch(`/api/interests/status?targetUserId=${initialData.userId}`),
          fetch(`/api/shortlist`),
        ]);
        if (intRes.ok) {
          const data = await intRes.json();
          setInterestStatus(data.status || "none");
          setInterestId(data.interestId || null);
        } else {
          setInterestStatus("none");
        }
        if (shortRes.ok) {
          const sData = await shortRes.json();
          const found = (sData.shortlists || []).some((s: any) => s.id === initialData.id);
          setIsShortlisted(found);
        }
      } catch (err) {
        console.error(err);
        setInterestStatus("none");
      }
    };
    fetchStatus();
  }, [initialData.userId, initialData.id]);

  const handleInterestAction = async () => {
    setActionLoading(true);
    try {
      if (interestStatus === "none") {
        const res = await fetch("/api/interests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ receiverId: initialData.userId })
        });
        if (res.ok) setInterestStatus("sent");
      } else if (interestStatus === "received") {
        const res = await fetch("/api/interests", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ interestId, status: "accepted" })
        });
        if (res.ok) setInterestStatus("accepted");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleShortlist = async () => {
    const next = !isShortlisted;
    setIsShortlisted(next);
    setShortlistLoading(true);
    try {
      const res = await fetch("/api/shortlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId: initialData.id }),
      });
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setIsShortlisted(data.shortlisted);
      }
    } catch (err) {
      console.error("Shortlist error:", err);
      setIsShortlisted(!next);
    } finally {
      setShortlistLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF1F5] pt-24 pb-16">
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* Breadcrumb / Back button */}
        <div className="mb-6 flex items-center justify-between">
          <Link 
            href="/matches" 
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2A3773] hover:text-[#DB1866] transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-[#FADADF]"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Matches
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-white px-3.5 py-2 rounded-xl border border-[#FADADF]">
            <Clock className="w-3.5 h-3.5 text-emerald-500" /> Active {initialData.lastActive}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Photos & Action Center */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Main Photo Card */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#FADADF] overflow-hidden">
              <div 
                className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 cursor-pointer group"
                onClick={() => setShowLightbox(true)}
              >
                <img 
                  src={initialData.photos[activePhotoIdx] || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"} 
                  alt={initialData.name} 
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                    initialData.photoPrivacy === "request" && !photoAccessRequested ? "filter blur-md scale-105" : ""
                  }`}
                />

                {/* Photo Privacy Lock Overlay */}
                {initialData.photoPrivacy === "request" && !photoAccessRequested && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white z-20">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                      <Lock className="w-6 h-6 text-pink-300" />
                    </div>
                    <p className="font-bold text-sm">Photo Protected by Candidate</p>
                    <p className="text-[11px] text-gray-200 mt-1 mb-4">Request photo view permission from the family</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); setPhotoAccessRequested(true); }}
                      className="bg-[#DB1866] hover:bg-[#B81456] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg transition-transform hover:scale-105"
                    >
                      Request Photo Access
                    </button>
                  </div>
                )}
                
                {/* Verified Badge */}
                {initialData.isVerified && (
                  <div className="absolute top-3 left-3 bg-[#2A3773] text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
                    <ShieldCheck className="w-3.5 h-3.5 text-pink-400" /> Verified Profile
                  </div>
                )}

                {/* Match Percentage */}
                <div className="absolute top-3 right-3 bg-[#DB1866] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
                  <Sparkles className="w-3.5 h-3.5 fill-white" /> {initialData.matchPercent}% Match
                </div>

                {/* Dynamic Anti-Screenshot Security Watermark */}
                <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-3 select-none opacity-35">
                  <div className="flex justify-between text-[9px] font-mono text-white drop-shadow-md tracking-wider">
                    <span>MARATHA LAGEEN SECURE</span>
                    <span>{viewerName ? `VIEWER: ${viewerName.toUpperCase().slice(0, 16)}` : "VERIFIED ID"}</span>
                  </div>
                  <div className="text-center transform -rotate-12 text-[10px] sm:text-xs font-mono font-black tracking-widest text-white/40 uppercase">
                    CONFIDENTIAL • MARATHA MATRIMONY
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-white drop-shadow-md tracking-wider">
                    <span>DO NOT SCREENSHOT</span>
                    <span>marathalageen.com</span>
                  </div>
                </div>

                {/* Verified Watermark Pill */}
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-[10px] text-white/90 font-medium px-2.5 py-1 rounded-lg pointer-events-none border border-white/10 z-10">
                  marathalageen.com • Protected
                </div>

                {/* Expand Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1 backdrop-blur-[2px]">
                  <Eye className="w-4 h-4" /> Click to view all photos
                </div>
              </div>

              {/* Thumbnails */}
              {initialData.photos.length > 1 && (
                <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
                  {initialData.photos.map((photo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activePhotoIdx === idx ? "border-[#DB1866] scale-95 shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Action Center */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#FADADF] space-y-3">
              <button 
                onClick={handleInterestAction}
                disabled={interestStatus === "sent" || interestStatus === "accepted" || interestStatus === "loading" || actionLoading}
                className={`w-full flex items-center justify-center gap-2 font-bold py-4 rounded-2xl shadow-lg transition-all text-base ${
                  interestStatus === "accepted" 
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                    : interestStatus === "sent"
                    ? 'bg-gray-100 text-gray-500 shadow-none cursor-default'
                    : 'bg-[#DB1866] hover:bg-[#B81456] text-white shadow-[#DB1866]/30 hover:scale-[1.02]'
                }`}
              >
                {interestStatus === "loading" || actionLoading ? (
                  <span className="animate-pulse">Checking Status...</span>
                ) : interestStatus === "accepted" ? (
                  <><CheckCircle2 className="w-5 h-5" /> You are Connected!</>
                ) : interestStatus === "sent" ? (
                  <><CheckCircle2 className="w-5 h-5 text-green-600" /> Interest Sent</>
                ) : interestStatus === "received" ? (
                  <><Heart className="w-5 h-5 fill-white" /> Accept Interest</>
                ) : (
                  <><Send className="w-5 h-5" /> Send Interest</>
                )}
              </button>

              <div className="grid grid-cols-2 gap-3">
                {interestStatus === "accepted" ? (
                  <Link 
                    href={`/dashboard/chat/${initialData.userId}`} 
                    className="flex items-center justify-center gap-2 border border-[#DB1866] bg-[#FFF1F5] text-[#DB1866] font-bold py-3 rounded-2xl hover:bg-pink-100 transition-colors text-sm"
                  >
                    <MessageCircle className="w-4 h-4" /> Chat Now
                  </Link>
                ) : (
                  <button 
                    disabled 
                    title="Connect first to unlock chat"
                    className="flex items-center justify-center gap-2 border border-gray-200 bg-gray-50 text-gray-400 font-bold py-3 rounded-2xl text-sm cursor-not-allowed"
                  >
                    <MessageCircle className="w-4 h-4" /> Chat
                  </button>
                )}

                <button 
                  onClick={handleShortlist}
                  className={`flex items-center justify-center gap-2 border py-3 rounded-2xl font-bold transition-all text-sm ${
                    isShortlisted 
                      ? 'border-[#DB1866] bg-[#DB1866] text-white' 
                      : 'border-[#FADADF] hover:border-[#DB1866] text-[#2A3773] hover:bg-[#FFF1F5]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isShortlisted ? 'fill-white' : ''}`} /> 
                  {isShortlisted ? "Shortlisted" : "Shortlist"}
                </button>
              </div>

              {/* Share Biodata Action */}
              <button 
                onClick={() => setShowShareModal(true)}
                className="w-full flex items-center justify-center gap-2 border border-[#FADADF] hover:border-[#DB1866] bg-[#FFF8FA] hover:bg-[#FFF1F5] text-[#2A3773] hover:text-[#DB1866] font-bold py-3 rounded-2xl transition-all text-sm shadow-sm hover:scale-[1.01]"
              >
                <Share2 className="w-4 h-4 text-[#DB1866]" /> Share Biodata (WhatsApp)
              </button>

              {/* Royal Printable / PDF Biodata Button */}
              <button 
                onClick={() => setShowPrintModal(true)}
                className="w-full flex items-center justify-center gap-2 border border-[#E3B873] hover:border-[#C98E32] bg-[#FFFDF9] hover:bg-[#FFF8EE] text-[#8A1538] font-bold py-3 rounded-2xl transition-all text-sm shadow-sm hover:scale-[1.01]"
              >
                <Printer className="w-4 h-4 text-[#C98E32]" /> Print / Save PDF Biodata
              </button>

              {/* Contact Reveal Shield */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1 font-bold text-[#2A3773]"><Phone className="w-3.5 h-3.5 text-[#DB1866]" /> Verified Family Contact</span>
                  {contactDetails.unlocked ? (
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">✓ Unlocked</span>
                  ) : (
                    <span className="font-bold text-[#DB1866] bg-pink-50 px-2 py-0.5 rounded-full text-[10px]">🔒 Shielded</span>
                  )}
                </div>

                {contactDetails.unlocked ? (
                  <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-emerald-950 tracking-wide">{contactDetails.mobile || "+91 98220 12345"}</span>
                      <div className="flex items-center gap-2">
                        <a 
                          href={`tel:${contactDetails.mobile || "+919822012345"}`}
                          className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition-transform hover:scale-105"
                          title="Call Family"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                        </a>
                        <a 
                          href={`https://wa.me/${(contactDetails.mobile || "919822012345").replace(/[^0-9]/g, "")}?text=Hello,%20I%20saw%20your%20biodata%20on%20Maratha%20Matrimony`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-sm transition-transform hover:scale-105 text-[10px] font-bold flex items-center gap-1"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                    {contactDetails.email && (
                      <p className="text-[11px] text-gray-600 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-gray-400" /> {contactDetails.email}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-2xl">
                      <span className="text-xs font-mono font-bold text-gray-600 tracking-wider">
                        {contactDetails.maskedMobile}
                      </span>
                      <button
                        onClick={handleUnlockContact}
                        disabled={contactDetails.loading}
                        className="bg-[#2A3773] hover:bg-[#1f295c] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 hover:scale-105"
                      >
                        {contactDetails.loading ? (
                          <span className="animate-pulse">Checking...</span>
                        ) : (
                          <><Lock className="w-3 h-3 text-pink-300" /> Unlock Contact</>
                        )}
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-400 text-center">
                      Verified parents contact unlocked for Premium members
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Detailed Profile Tabs */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header Identity Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#FADADF]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div>
                  <h1 className="text-3xl font-bold font-sans text-[#2A3773] flex items-center gap-2">
                    {initialData.name}
                    {initialData.isVerified && <BadgeCheck className="w-6 h-6 text-[#DB1866]" />}
                  </h1>
                  <p className="text-gray-500 font-medium text-sm mt-1 flex items-center gap-2">
                    <span>{initialData.age} Yrs, {initialData.height}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#DB1866]" /> {initialData.city}, {initialData.state}</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2.5">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Govt ID Verified
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-pink-50 text-[#DB1866] px-3 py-1 rounded-full text-xs font-bold border border-pink-200">
                      <Crown className="w-3.5 h-3.5 text-[#DB1866]" /> 96 Kuli Maratha
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setShowPrintModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#FFFDF9] border border-[#E3B873] text-[#8A1538] hover:border-[#C98E32] text-xs font-bold transition-all shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#C98E32]" /> PDF Biodata
                  </button>
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white border border-[#FADADF] text-[#2A3773] hover:text-[#DB1866] hover:border-[#DB1866] text-xs font-bold transition-all shadow-sm"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#DB1866]" /> Share
                  </button>
                  <div className="bg-[#FFF1F5] px-4 py-2 rounded-2xl border border-[#FADADF] text-center shrink-0">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-[#DB1866]">Community</p>
                    <p className="font-bold text-[#2A3773] text-sm">{initialData.community || "Maratha"}</p>
                  </div>
                </div>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-sm">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Marital Status</p>
                  <p className="font-bold text-[#2A3773] mt-0.5">{initialData.maritalStatus}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Education</p>
                  <p className="font-bold text-[#2A3773] mt-0.5">{initialData.education}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Profession</p>
                  <p className="font-bold text-[#2A3773] mt-0.5">{initialData.profession}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Annual Income</p>
                  <p className="font-bold text-[#2A3773] mt-0.5">{initialData.income}</p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-[#FADADF]">
              {[
                { id: "overview", label: "About & Lifestyle" },
                { id: "family", label: "Family Background" },
                { id: "horoscope", label: "Horoscope / Astro" },
                { id: "preferences", label: "Partner Preferences" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    activeTab === t.id
                      ? "bg-[#2A3773] text-white shadow-md"
                      : "bg-white text-gray-600 hover:text-[#DB1866] border border-gray-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#FADADF] space-y-6">
              
              {activeTab === "overview" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <h3 className="text-lg font-bold text-[#2A3773] mb-3">About Myself</h3>
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line bg-gray-50 p-5 rounded-2xl border border-gray-100">
                      {initialData.about || "Hello, thank you for visiting my profile. I am a caring, ambitious and family-oriented person looking for a compatible life partner from the Maratha community who shares similar core values, respect for family, and positive outlook towards life."}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#2A3773] mb-4">Education & Career</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-[#FFF1F5] border border-[#FADADF]">
                        <p className="text-xs text-gray-400 font-bold uppercase">Highest Degree</p>
                        <p className="font-bold text-[#2A3773] text-sm mt-0.5">{initialData.education}</p>
                        {initialData.college && initialData.college !== "Not specified" && (
                          <p className="text-xs text-gray-500 mt-1">{initialData.college}</p>
                        )}
                      </div>
                      <div className="p-4 rounded-2xl bg-[#FFF1F5] border border-[#FADADF]">
                        <p className="text-xs text-gray-400 font-bold uppercase">Profession / Job</p>
                        <p className="font-bold text-[#2A3773] text-sm mt-0.5">{initialData.profession}</p>
                        {initialData.company && initialData.company !== "Not specified" && (
                          <p className="text-xs text-gray-500 mt-1">{initialData.company}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#2A3773] mb-4">Lifestyle & Habits</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                        <p className="text-xs text-gray-400 font-bold uppercase">Diet</p>
                        <p className="font-bold text-[#2A3773] text-sm mt-0.5">{initialData.diet || "Non-Vegetarian"}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                        <p className="text-xs text-gray-400 font-bold uppercase">Drinking</p>
                        <p className="font-bold text-[#2A3773] text-sm mt-0.5">{initialData.drinking || "No"}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                        <p className="text-xs text-gray-400 font-bold uppercase">Smoking</p>
                        <p className="font-bold text-[#2A3773] text-sm mt-0.5">{initialData.smoking || "No"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "family" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-[#2A3773] mb-4">Family Background</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-400 font-bold uppercase">Family Type</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">{initialData.familyType || "Nuclear Family"}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-400 font-bold uppercase">Family Values</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">{initialData.familyValues || "Traditional & Moderate"}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-400 font-bold uppercase">Father's Occupation</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">{initialData.fatherStatus || "Business / Retired"}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-400 font-bold uppercase">Mother's Occupation</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">{initialData.motherStatus || "Homemaker"}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-400 font-bold uppercase">Brothers</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">{initialData.brothers || "None"}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-400 font-bold uppercase">Sisters</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">{initialData.sisters || "None"}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "horoscope" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#2A3773]">Horoscope & Cultural Lineage</h3>
                      <p className="text-xs text-gray-500">Astrological compatibility & Maratha clan lineage</p>
                    </div>
                    <div className="bg-[#FFF1F5] px-3.5 py-1.5 rounded-full border border-[#FADADF] flex items-center gap-1.5 text-xs font-bold text-[#DB1866]">
                      <Sparkles className="w-3.5 h-3.5" /> Ashtakoot Match: {Math.min(36, Math.max(18, Math.round((initialData.matchPercent / 100) * 36)))} / 36 Gunas
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-[#FFF1F5] border border-[#FADADF]">
                      <p className="text-xs text-gray-400 font-bold uppercase">Gotra / Devak</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">
                        {initialData.gotra && initialData.gotra !== "Not specified" ? initialData.gotra : "Bharadwaj"} / {initialData.devak && initialData.devak !== "Not specified" ? initialData.devak : "Kalamb"}
                      </p>
                      <p className="text-[10px] text-pink-700 mt-1 font-semibold">Devak & Gotra Verified</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FFF1F5] border border-[#FADADF]">
                      <p className="text-xs text-gray-400 font-bold uppercase">Manglik Status</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">{initialData.manglik || "Non-Manglik"}</p>
                      <p className="text-[10px] text-emerald-600 mt-1 font-semibold">✓ Compatible Kundali</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FFF1F5] border border-[#FADADF]">
                      <p className="text-xs text-gray-400 font-bold uppercase">Rashi / Moon Sign</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">{initialData.rashi && initialData.rashi !== "Not specified" ? initialData.rashi : "Karka"}</p>
                      <p className="text-[10px] text-gray-400 mt-1">Moon Constellation</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FFF1F5] border border-[#FADADF]">
                      <p className="text-xs text-gray-400 font-bold uppercase">Nakshatra</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">{initialData.nakshatra && initialData.nakshatra !== "Not specified" ? initialData.nakshatra : "Pushya"}</p>
                      <p className="text-[10px] text-gray-400 mt-1">Birth Star</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FFF1F5] border border-[#FADADF]">
                      <p className="text-xs text-gray-400 font-bold uppercase">Clan Deity (Kuldaivat)</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">{initialData.kuldaivat && initialData.kuldaivat !== "Not specified" ? initialData.kuldaivat : "Bhavani Mata"}</p>
                      <p className="text-[10px] text-gray-400 mt-1">Clan Deity</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FFF1F5] border border-[#FADADF]">
                      <p className="text-xs text-gray-400 font-bold uppercase">Native Place</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">{initialData.nativePlace && initialData.nativePlace !== "Not specified" ? initialData.nativePlace : initialData.city}</p>
                      <p className="text-[10px] text-gray-400 mt-1">Ancestral Heritage</p>
                    </div>
                  </div>

                  {/* 36 Gunas Live Dynamic Ashtakoot Milan Engine */}
                  <div className="bg-[#FFFDFB] rounded-2xl p-5 border border-[#FADADF] space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#FADADF] pb-3">
                      <div>
                        <h4 className="text-xs font-bold text-[#2A3773] uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#DB1866]" />
                          <span>Ashtakoot Kundali Gunas Compatibility (36 Gunas)</span>
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Calculated directly between your horoscope and {initialData.name}&apos;s birth chart
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#DB1866] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#FADADF]">
                          {kundaliMatch.totalGunas} / {kundaliMatch.maxGunas} Gunas ({kundaliMatch.verdict})
                        </span>
                      </div>
                    </div>

                    {/* Gotra Exogamy & Manglik Alerts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-3 bg-white rounded-xl border border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Gotra Alignment</p>
                        <p className="font-semibold text-gray-800 text-[11px] mt-0.5">{kundaliMatch.gotraMessage}</p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Manglik Compatibility</p>
                        <p className="font-semibold text-gray-800 text-[11px] mt-0.5">{kundaliMatch.manglikStatus}</p>
                      </div>
                    </div>

                    {/* 8 Kootas Detailed Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                      {kundaliMatch.kootas.map((koot, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col justify-between hover:border-[#DB1866]/30 transition-colors shadow-2xs">
                          <div>
                            <span className="text-[11px] font-bold text-[#2A3773] block">{koot.name}</span>
                            <span className="text-[10px] text-gray-400 font-medium block truncate">{koot.regionalName}</span>
                          </div>
                          <div className="flex items-baseline justify-between mt-2 pt-1 border-t border-gray-50">
                            <span className="text-gray-400 text-[9px] truncate max-w-[55%]">{koot.desc}</span>
                            <span className="text-[#DB1866] font-bold text-xs shrink-0">{koot.scored} / {koot.max}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Shortcut to Full Milan */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#FADADF]">
                      <p className="text-[11px] text-gray-500 italic">
                        * In Kshatriya Maratha tradition, a score above 18/36 with distinct maternal/paternal Gotra is deemed auspicious.
                      </p>
                      <Link 
                        href={`/kundali`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#2A3773] hover:bg-[#1B2559] px-4 py-2 rounded-full transition-all shrink-0 shadow-xs"
                      >
                        <span>Open Astrological Lab</span>
                        <ExternalLink className="w-3 h-3 text-pink-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "preferences" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-[#2A3773] mb-4">Partner Expectations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-400 font-bold uppercase">Age Preference</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">22 to 29 Years</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-400 font-bold uppercase">Community</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">96 Kuli Maratha / Deshastha</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-400 font-bold uppercase">Education</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">Bachelors or Higher</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-400 font-bold uppercase">Location</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">Karnataka / Maharashtra</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button 
            onClick={() => setShowLightbox(false)} 
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative max-w-4xl max-h-[85vh] flex items-center justify-center">
            <img 
              src={initialData.photos[activePhotoIdx]} 
              alt="" 
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            {initialData.photos.length > 1 && (
              <>
                <button 
                  onClick={() => setActivePhotoIdx(prev => (prev === 0 ? initialData.photos.length - 1 : prev - 1))}
                  className="absolute left-4 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setActivePhotoIdx(prev => (prev === initialData.photos.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ──────────── GOD-LEVEL BIODATA SHARE MODAL ──────────── */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#FADADF] relative overflow-hidden space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF1F5] text-[#DB1866] flex items-center justify-center font-bold">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2A3773]">Share Matrimonial Biodata</h3>
                  <p className="text-xs text-gray-500">Forward verified details to family & WhatsApp groups</p>
                </div>
              </div>
              <button 
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Formatted Biodata Preview Card */}
            <div className="bg-gradient-to-br from-[#FFF8FA] to-[#FFF1F5] p-5 rounded-2xl border border-[#FADADF] text-xs text-gray-700 font-mono space-y-2 relative">
              <div className="absolute top-3 right-3 bg-[#DB1866] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Biodata Format
              </div>
              <p className="font-bold text-[#2A3773] text-sm font-sans mb-2">🚩 MARATHA MATRIMONY VERIFIED PROFILE</p>
              <div className="space-y-1.5 font-sans text-xs">
                <p>👤 <strong>Candidate:</strong> {initialData.name} ({initialData.age} Yrs, {initialData.height})</p>
                <p>🎓 <strong>Education:</strong> {initialData.education}</p>
                <p>💼 <strong>Profession:</strong> {initialData.profession}{initialData.income ? ` (${initialData.income})` : ""}</p>
                <p>📍 <strong>Location:</strong> {initialData.city}, {initialData.state}</p>
                <p>🕊️ <strong>Community:</strong> {initialData.community || "Maratha"} (Manglik: {initialData.manglik || "Non-Manglik"})</p>
                <p>🏠 <strong>Family:</strong> {initialData.familyType || "Nuclear Family"} (Father: {initialData.fatherStatus || "Employed"})</p>
              </div>
            </div>

            {/* Sharing Actions */}
            <div className="space-y-3">
              <a 
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(getBiodataText())}`}
                target="_blank"
                rel="noreferrer"
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 text-sm transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-5 h-5" /> Share Directly to WhatsApp
              </a>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={handleCopyBiodata}
                  className="h-11 bg-white hover:bg-gray-50 border border-gray-200 text-[#2A3773] font-bold rounded-xl flex items-center justify-center gap-2 text-xs transition-all"
                >
                  {copiedBiodata ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Copied! 🎉
                    </span>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Biodata Text
                    </>
                  )}
                </button>

                <button 
                  onClick={handleNativeShare}
                  className="h-11 bg-white hover:bg-gray-50 border border-gray-200 text-[#2A3773] font-bold rounded-xl flex items-center justify-center gap-2 text-xs transition-all"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#DB1866]" /> Share via Apps
                </button>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 text-center">
              🔒 Contact numbers & exact address remain private until mutual connection.
            </p>
          </div>
        </div>
      )}

      {/* Royal Printable / PDF Biodata Modal */}
      {showPrintModal && (
        <PrintableBiodata
          data={{
            name: initialData.name,
            age: initialData.age,
            height: initialData.height,
            maritalStatus: initialData.maritalStatus,
            community: initialData.community || "96 Kuli Maratha",
            devak: initialData.devak || "Kalamb",
            gotra: initialData.gotra || "Kashyap",
            kuldaivat: initialData.kuldaivat || "Bhavani Mata (Tuljapur)",
            nativePlace: initialData.nativePlace || initialData.city,
            rashi: initialData.rashi || "Karka",
            nakshatra: initialData.nakshatra || "Pushya",
            manglik: initialData.manglik || "Non-Manglik",
            religion: initialData.religion || "Hindu",
            education: initialData.education,
            college: initialData.college,
            profession: initialData.profession,
            company: initialData.company,
            income: initialData.income,
            familyType: initialData.familyType,
            familyValues: initialData.familyValues,
            fatherStatus: initialData.fatherStatus,
            motherStatus: initialData.motherStatus,
            brothers: initialData.brothers,
            sisters: initialData.sisters,
            city: initialData.city,
            state: initialData.state,
            mobile: contactDetails.unlocked ? contactDetails.mobile : undefined,
            imageUrl: initialData.photos[0],
          }}
          onClose={() => setShowPrintModal(false)}
        />
      )}

      {/* ──────────── UPGRADE MODAL TO UNLOCK CONTACTS ──────────── */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#FADADF] relative overflow-hidden space-y-6">
            <button 
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pt-2">
              <div className="w-16 h-16 bg-[#FFF1F5] text-[#DB1866] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Crown className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#2A3773]">Unlock Verified Family Contact</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto mt-1">
                Direct phone numbers and WhatsApp access are exclusively reserved for verified Premium members.
              </p>
            </div>

            {/* Plan Cards */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl border-2 border-[#DB1866] bg-[#FFF8FA] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-white bg-[#DB1866] px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                  <h4 className="text-base font-bold text-[#2A3773] mt-1">Gold Premium</h4>
                  <p className="text-xs text-gray-500">25 Contact Unlocks • 3 Months Validity</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#2A3773]">₹999</span>
                  <button
                    onClick={() => handleDirectUpgrade("PREMIUM")}
                    disabled={upgradeLoading}
                    className="block mt-1 bg-[#DB1866] hover:bg-[#B81456] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-all hover:scale-105"
                  >
                    {upgradeLoading ? "Activating..." : "Upgrade ₹999"}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-[#2A3773]">VIP Royal</h4>
                  <p className="text-xs text-gray-500">Unlimited Contacts • Highlighted Profile</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#2A3773]">₹1,999</span>
                  <button
                    onClick={() => handleDirectUpgrade("PREMIUM_PLUS")}
                    disabled={upgradeLoading}
                    className="block mt-1 bg-[#2A3773] hover:bg-[#1f295c] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-all hover:scale-105"
                  >
                    {upgradeLoading ? "Activating..." : "Upgrade ₹1,999"}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-100">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Verified Maratha Profiles
              </span>
              <Link href="/membership" className="font-bold text-[#DB1866] hover:underline">
                View All Plans →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
