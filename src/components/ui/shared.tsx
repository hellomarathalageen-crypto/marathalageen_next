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
import { 
  Heart, Send, MessageCircle, Bookmark, ShieldCheck, 
  MapPin, Briefcase, GraduationCap, Calendar, 
  User, ChevronLeft, ChevronRight, X,
  Clock, Award, Sparkles, Phone, Mail, Eye, BadgeCheck
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
    lastActive: string;
    photos: string[];
  };
}

export function ProfileView({ initialData }: ProfileViewProps) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "family" | "horoscope" | "preferences">("overview");
  
  // Interest & Actions State
  const [interestStatus, setInterestStatus] = useState<"none" | "sent" | "received" | "accepted" | "loading">("loading");
  const [interestId, setInterestId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/interests/status?targetUserId=${initialData.userId}`);
        if (res.ok) {
          const data = await res.json();
          setInterestStatus(data.status || "none");
          setInterestId(data.interestId || null);
        } else {
          setInterestStatus("none");
        }
      } catch (err) {
        console.error(err);
        setInterestStatus("none");
      }
    };
    fetchStatus();
  }, [initialData.userId]);

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

  const handleShortlist = () => {
    setIsShortlisted(prev => !prev);
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
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Verified Badge */}
                {initialData.isVerified && (
                  <div className="absolute top-3 left-3 bg-[#2A3773] text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5 text-pink-400" /> Verified Profile
                  </div>
                )}

                {/* Match Percentage */}
                <div className="absolute top-3 right-3 bg-[#DB1866] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 fill-white" /> {initialData.matchPercent}% Match
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

              {/* Contact Gating Banner */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#DB1866]" /> Phone & Email</span>
                  <span className="font-bold text-[#DB1866]">🔒 Premium Only</span>
                </div>
                <Link 
                  href="/membership" 
                  className="block text-center py-2.5 rounded-xl bg-[#2A3773] hover:bg-[#1f295c] text-white font-bold text-xs transition-colors shadow-sm"
                >
                  Upgrade to View Contact Details
                </Link>
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
                </div>
                <div className="bg-[#FFF1F5] px-4 py-2 rounded-2xl border border-[#FADADF] text-center shrink-0">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-[#DB1866]">Community</p>
                  <p className="text-sm font-bold text-[#2A3773]">{initialData.community}</p>
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
                      </div>
                      <div className="p-4 rounded-2xl bg-[#FFF1F5] border border-[#FADADF]">
                        <p className="text-xs text-gray-400 font-bold uppercase">Profession / Job</p>
                        <p className="font-bold text-[#2A3773] text-sm mt-0.5">{initialData.profession}</p>
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
                  </div>
                </div>
              )}

              {activeTab === "horoscope" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-[#2A3773] mb-4">Horoscope & Astro Details</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-[#FFF1F5] border border-[#FADADF]">
                      <p className="text-xs text-gray-400 font-bold uppercase">Gotra / Devak</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">Kashyap / Kalas</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FFF1F5] border border-[#FADADF]">
                      <p className="text-xs text-gray-400 font-bold uppercase">Manglik Status</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">Non-Manglik</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FFF1F5] border border-[#FADADF]">
                      <p className="text-xs text-gray-400 font-bold uppercase">Raasi / Moon Sign</p>
                      <p className="font-bold text-[#2A3773] text-sm mt-0.5">Karka (Cancer)</p>
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
    </div>
  );
}
