"use client";

import { useState, use } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Share2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Info,
  Users,
  Camera,
  X
} from "lucide-react";

import { MatchPercent } from "@/components/ui/shared";

// ── Mock Data ───────────────────────────────────────────────────────────────
const profileData = {
  id: "M123456",
  name: "Priyanka Patil",
  age: 27,
  height: "5'4\" (163 cm)",
  maritalStatus: "Never Married",
  community: "96 Kuli Maratha",
  manglik: "Non-Manglik",
  religion: "Hindu",
  motherTongue: "Marathi",
  city: "Pune",
  state: "Maharashtra",
  country: "India",
  education: "M.Tech in Computer Science",
  college: "Pune University",
  profession: "Senior Software Engineer",
  company: "Top MNC",
  income: "₹15 - 20 Lakhs",
  diet: "Vegetarian",
  drinking: "No",
  smoking: "No",
  familyType: "Nuclear",
  familyValues: "Moderate",
  fatherStatus: "Retired",
  motherStatus: "Homemaker",
  brothers: "1 (Married)",
  sisters: "None",
  about: "I am a career-oriented yet family-loving person. I believe in a balanced life where work and family go hand in hand. I enjoy traveling, reading, and exploring new cuisines. I am looking for an understanding, supportive, and ambitious partner who values our culture and traditions.",
  matchPercent: 92,
  isVerified: true,
  lastActive: "Online 2 hours ago",
  photos: [
    "https://i.pravatar.cc/600?img=1",
    "https://i.pravatar.cc/600?img=5",
    "https://i.pravatar.cc/600?img=9",
  ]
};

const partnerPreferences = {
  age: "28 to 32",
  height: "5'6\" to 6'0\"",
  maritalStatus: "Never Married",
  community: "96 Kuli Maratha, Deshastha",
  education: "B.E, B.Tech, Master's degree",
  profession: "Software Professional, Entrepreneur, CA",
  location: "Pune, Mumbai, Bangalore",
  diet: "Vegetarian",
};

// ── Section Component ───────────────────────────────────────────────────────
function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-[#FADADF] p-6 mb-6">
      <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-[#FADADF]">
        <div className="w-8 h-8 rounded-full bg-[#FFF1F5] flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#F34883]" />
        </div>
        <h3 className="text-lg font-bold text-[#173F73] font-serif">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function InfoGrid({ data }: { data: Record<string, string> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
      {Object.entries(data).map(([label, value]) => (
        <div key={label} className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label.replace(/([A-Z])/g, ' $1').trim()}</span>
          <span className="text-sm font-medium text-[#23344D]">{value}</span>
        </div>
      ))}
    </div>
  );
}

export default function ProfileDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [activePhoto, setActivePhoto] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div className="bg-[#FFF1F5] min-h-screen pb-24 lg:pb-12">
      {/* ── Top Header / Breadcrumb ── */}
      <div className="bg-white border-b border-[#FADADF] py-3 sticky top-16 z-30 shadow-sm hidden md:block">
        <div className="container mx-auto max-w-6xl px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <Link href="/search" className="hover:text-[#F34883] transition-colors flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" /> Back to Search
            </Link>
            <span className="mx-2">|</span>
            <span>Profile ID: <strong className="text-[#173F73]">{profileData.id}</strong></span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <button className="flex items-center gap-1.5 text-gray-500 hover:text-[#F34883] transition-colors">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 transition-colors">
              <AlertTriangle className="w-4 h-4" /> Report
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 pt-6 lg:pt-8 flex flex-col lg:flex-row gap-8 relative">
        
        {/* ── Left Column: Details ── */}
        <div className="flex-1 min-w-0">
          
          {/* Profile Hero Mobile Only (Photo goes here on mobile) */}
          <div className="lg:hidden bg-white rounded-2xl border border-[#FADADF] overflow-hidden mb-6">
            <div className="relative aspect-[4/5] w-full" onClick={() => setShowGallery(true)}>
              <img src={profileData.photos[activePhoto]} alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h1 className="text-2xl font-bold font-serif mb-1">{profileData.name} {profileData.isVerified && <CheckCircle2 className="w-5 h-5 text-green-400 inline-block align-middle ml-1" />}</h1>
                <p className="text-sm text-white/90">{profileData.age} Yrs, {profileData.height} • {profileData.city}</p>
              </div>
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 text-white text-xs font-semibold flex items-center gap-1.5">
                <Camera className="w-4 h-4" /> {profileData.photos.length}
              </div>
            </div>
            {/* Quick Match Indicator Mobile */}
            <div className="p-4 flex items-center justify-between border-b border-[#FADADF] bg-[#FFF1F5]/50">
              <div className="flex items-center gap-3">
                <MatchPercent percent={profileData.matchPercent} size={50} />
                <div>
                  <p className="text-sm font-bold text-[#173F73]">Excellent Match</p>
                  <p className="text-xs text-gray-500">Based on your preferences</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <Section title="About Me" icon={Info}>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              "{profileData.about}"
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 bg-[#FFF1F5] text-[#F34883] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#FADADF]">
                {profileData.isVerified ? <CheckCircle2 className="w-3.5 h-3.5" /> : null} Profile Managed by Self
              </span>
              <span className="inline-flex items-center gap-1 bg-white text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full border border-[#FADADF]">
                <Calendar className="w-3.5 h-3.5" /> {profileData.lastActive}
              </span>
            </div>
          </Section>

          {/* Basic Details */}
          <Section title="Basic Details" icon={Heart}>
            <InfoGrid data={{
              Age: `${profileData.age} Years`,
              Height: profileData.height,
              MaritalStatus: profileData.maritalStatus,
              MotherTongue: profileData.motherTongue,
              Religion: profileData.religion,
              Community: profileData.community,
              Manglik: profileData.manglik,
              Diet: profileData.diet
            }} />
          </Section>

          {/* Education & Career */}
          <Section title="Education & Career" icon={GraduationCap}>
            <InfoGrid data={{
              Education: profileData.education,
              College: profileData.college,
              Profession: profileData.profession,
              Company: profileData.company,
              AnnualIncome: profileData.income
            }} />
          </Section>

          {/* Location */}
          <Section title="Location" icon={MapPin}>
            <InfoGrid data={{
              City: profileData.city,
              State: profileData.state,
              Country: profileData.country,
              Citizenship: "Indian"
            }} />
          </Section>

          {/* Family Details */}
          <Section title="Family Details" icon={Users}>
            <InfoGrid data={{
              FamilyType: profileData.familyType,
              FamilyValues: profileData.familyValues,
              Father: profileData.fatherStatus,
              Mother: profileData.motherStatus,
              Brothers: profileData.brothers,
              Sisters: profileData.sisters
            }} />
          </Section>

          {/* Partner Preferences */}
          <div className="bg-[#173F73] rounded-2xl p-6 mb-6 shadow-xl relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute right-0 top-0 w-64 h-64 opacity-5 pointer-events-none">
               <svg viewBox="0 0 200 200" fill="currentColor" className="text-white"><path d="M100 0C100 0 150 50 200 100C150 150 100 200 100 200C100 200 50 150 0 100C50 50 100 0 100 0Z" /></svg>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-white/10">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-[#F34883]" />
                </div>
                <h3 className="text-lg font-bold text-white font-serif">What She is Looking For</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
                {Object.entries(partnerPreferences).map(([label, value]) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-[11px] font-bold text-blue-200/70 uppercase tracking-widest mb-1">
                      {label.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-sm font-medium text-white flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F34883] mt-1.5 shrink-0" />
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">You match 7/8 of her preferences!</p>
                  <p className="text-xs text-blue-200 mt-0.5">Your profile is a strong fit.</p>
                </div>
                <MatchPercent percent={87} size={48} />
              </div>
            </div>
          </div>
          
        </div>

        {/* ── Right Column: Sticky Photo & Actions (Desktop) ── */}
        <div className="hidden lg:block w-80 shrink-0">
          <div className="sticky top-24">
            
            {/* Photo Card */}
            <div className="bg-white rounded-2xl border border-[#FADADF] overflow-hidden shadow-sm mb-4">
              <div className="relative aspect-[3/4] cursor-pointer group" onClick={() => setShowGallery(true)}>
                <img src={profileData.photos[activePhoto]} alt="Profile" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                
                {profileData.isVerified && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-md">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                  </div>
                )}
                
                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                  <Camera className="w-4 h-4" /> {profileData.photos.length} Photos
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h1 className="text-2xl font-bold font-serif text-white mb-1 leading-tight">
                    {profileData.name}
                  </h1>
                  <p className="text-sm text-white/90">{profileData.age} Yrs • {profileData.height}</p>
                  <p className="text-xs text-white/70 mt-1">{profileData.profession} • {profileData.city}</p>
                </div>
              </div>
              
              <div className="p-4 bg-[#FFF1F5] flex items-center justify-between border-t border-[#FADADF]">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Match Score</p>
                  <p className="text-sm font-bold text-[#173F73]">Excellent Match</p>
                </div>
                <MatchPercent percent={profileData.matchPercent} size={48} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl border border-[#FADADF] p-4 shadow-sm space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-[#F34883] hover:bg-[#d93870] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#F34883]/30 transition-all hover:-translate-y-0.5">
                <Send className="w-4 h-4" /> Send Interest
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-1.5 border border-[#FADADF] hover:border-[#F34883] hover:text-[#F34883] text-[#173F73] font-semibold py-2.5 rounded-xl transition-colors text-sm">
                  <MessageCircle className="w-4 h-4" /> Chat
                </button>
                <button className="flex items-center justify-center gap-1.5 border border-[#FADADF] hover:border-[#F34883] hover:text-[#F34883] text-gray-500 font-semibold py-2.5 rounded-xl transition-colors text-sm">
                  <Bookmark className="w-4 h-4" /> Shortlist
                </button>
              </div>
            </div>
            
          </div>
        </div>

      </div>

      {/* ── Mobile Sticky Bottom Action Bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#FADADF] p-3 flex gap-2 z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] pb-safe">
        <button className="flex items-center justify-center w-12 h-12 border border-[#FADADF] rounded-xl text-gray-500">
          <Bookmark className="w-5 h-5" />
        </button>
        <button className="flex items-center justify-center w-12 h-12 border border-[#FADADF] rounded-xl text-[#173F73]">
          <MessageCircle className="w-5 h-5" />
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-[#F34883] text-white font-bold h-12 rounded-xl shadow-lg shadow-[#F34883]/30">
          <Send className="w-4 h-4" /> Send Interest
        </button>
      </div>

      {/* ── Photo Gallery Modal ── */}
      {showGallery && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col">
          <div className="p-4 flex justify-between items-center text-white border-b border-white/10">
            <div>
              <p className="font-bold">{profileData.name}</p>
              <p className="text-xs text-white/60">{activePhoto + 1} of {profileData.photos.length}</p>
            </div>
            <button onClick={() => setShowGallery(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 relative flex items-center justify-center p-4">
            <button 
              onClick={() => setActivePhoto(Math.max(0, activePhoto - 1))}
              className={`absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all ${activePhoto === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={activePhoto === 0}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <img src={profileData.photos[activePhoto]} alt={`Photo ${activePhoto + 1}`} className="max-w-full max-h-full object-contain rounded-lg" />
            
            <button 
              onClick={() => setActivePhoto(Math.min(profileData.photos.length - 1, activePhoto + 1))}
              className={`absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all ${activePhoto === profileData.photos.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={activePhoto === profileData.photos.length - 1}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          {/* Thumbnails */}
          <div className="p-4 flex justify-center gap-2 overflow-x-auto">
            {profileData.photos.map((photo, idx) => (
              <button 
                key={idx}
                onClick={() => setActivePhoto(idx)}
                className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activePhoto === idx ? 'border-[#F34883] scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
              >
                <img src={photo} className="w-full h-full object-cover" alt={`Thumb ${idx+1}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
