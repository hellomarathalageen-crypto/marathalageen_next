"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  Printer, 
  Share2, 
  Crown, 
  Palette, 
  Calendar, 
  Edit3, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw,
  Image as ImageIcon,
  CheckCircle2
} from "lucide-react";

const DEFAULT_CANDIDATE = {
  name: "Rohit Ramesh Patil",
  gender: "Male",
  dobRaw: "1996-08-20",
  dateOfBirth: "20 Aug 1996",
  age: 28,
  height: `5'11"`,
  maritalStatus: "Never Married",
  community: "96 Kuli Maratha",
  devak: "Panchpallav (पंचपल्लव)",
  gotra: "Kashyap (कश्यप)",
  kuldaivat: "Khandoba (Jejuri)",
  rashi: "Kanya (Virgo)",
  nakshatra: "Hasta (हस्त)",
  manglik: "Non-Manglik (साधी पत्रिका)",
  education: "B.Tech in Computer Science",
  college: "Pune Institute of Computer Technology (PICT)",
  profession: "Senior Software Engineer",
  company: "TCS Enterprise (Pune)",
  annualIncome: "₹18,00,000 P.A.",
  fatherName: "Ramesh D. Patil",
  fatherStatus: "Class 1 Gazetted Govt Officer (Retd.)",
  motherName: "Sunita R. Patil",
  motherStatus: "Homemaker",
  brothers: "1 Younger Brother (Software Engineer at Infosys)",
  sisters: "None",
  nativePlace: "Belagavi, Karnataka",
  currentCity: "Pune / Belagavi",
  contactPhone: "+91 98220 12345",
  contactEmail: "patil.family@example.com",
  photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600"
};

export default function BiodataMakerPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [theme, setTheme] = useState<"saffron" | "modern" | "kundali">("saffron");
  const [isEditing, setIsEditing] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [profileId, setProfileId] = useState("ML-96K-USER");
  
  const [data, setData] = useState(DEFAULT_CANDIDATE);

  useEffect(() => {
    // If user is unauthenticated or session loading, remain with default candidate data
    if (status !== "authenticated" || !session?.user) {
      return;
    }

    async function loadCandidateProfile() {
      try {
        setLoadingProfile(true);
        const res = await fetch("/api/profile/me");
        if (!res.ok) {
          // Profile not found or admin user without candidate profile; keep default template
          return;
        }

        const json = await res.json();
        const p = json.profile;
        if (!p) return;

        // Format Date of birth and compute age
        let rawDob = "";
        let formattedDob = "Not specified";
        let computedAge = 26;
        if (p.dateOfBirth) {
          const d = new Date(p.dateOfBirth);
          if (!isNaN(d.getTime())) {
            rawDob = d.toISOString().slice(0, 10);
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            formattedDob = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
            const today = new Date();
            computedAge = today.getFullYear() - d.getFullYear();
            const m = today.getMonth() - d.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < d.getDate())) {
              computedAge--;
            }
          }
        }

        const fullName = `${p.firstName || ""} ${p.lastName || ""}`.trim() || session?.user?.name || "Candidate Name";
        const primaryPhoto = p.photos?.find((ph: any) => ph.isPrimary)?.url || p.photos?.[0]?.url || DEFAULT_CANDIDATE.photoUrl;

        setData({
          name: fullName,
          gender: p.gender || "Male",
          dobRaw: rawDob,
          dateOfBirth: formattedDob,
          age: computedAge > 0 ? computedAge : 26,
          height: p.height || `5'9"`,
          maritalStatus: p.maritalStatus || "Never Married",
          community: p.community || "96 Kuli Maratha",
          devak: p.devak || "Panchpallav (पंचपल्लव)",
          gotra: p.gotra || "Kashyap (कश्यप)",
          kuldaivat: p.kuldaivat || "Khandoba (Jejuri)",
          rashi: p.rashi || "Kanya (Virgo)",
          nakshatra: p.nakshatra || "Hasta (हस्त)",
          manglik: p.manglik || "Non-Manglik",
          education: p.education || "Graduate",
          college: p.college || "Reputed University",
          profession: p.profession || "Professional",
          company: p.company || "Private Enterprise",
          annualIncome: p.annualIncome || "Confidential",
          fatherName: p.fatherOccupation ? `Mr. ${p.lastName || 'Patil'}` : "Father",
          fatherStatus: p.fatherOccupation || "Employed / Business",
          motherName: p.motherOccupation ? `Mrs. ${p.lastName || 'Patil'}` : "Mother",
          motherStatus: p.motherOccupation || "Homemaker",
          brothers: p.brothersCount ? `${p.brothersCount} Brother(s)` : "None",
          sisters: p.sistersCount ? `${p.sistersCount} Sister(s)` : "None",
          nativePlace: p.nativePlace || p.city || "Not specified",
          currentCity: p.city ? `${p.city}, ${p.state || 'Maharashtra'}` : "Pune, Maharashtra",
          contactPhone: p.mobile || p.phone || "+91 98220 12345",
          contactEmail: p.email || session?.user?.email || "contact@marathalageen.com",
          photoUrl: primaryPhoto
        });

        if (p.id) {
          setProfileId(`ML-${p.id.slice(-6).toUpperCase()}`);
        }
        setProfileLoaded(true);
      } catch (err) {
        console.warn("Could not load candidate profile for biodata studio:", err);
      } finally {
        setLoadingProfile(false);
      }
    }

    loadCandidateProfile();
  }, [status, session]);

  const handleDobChange = (rawDate: string) => {
    if (!rawDate) return;
    const d = new Date(rawDate);
    if (isNaN(d.getTime())) return;

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formatted = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    const today = new Date();
    let calculatedAge = today.getFullYear() - d.getFullYear();
    const m = today.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < d.getDate())) {
      calculatedAge--;
    }

    setData(prev => ({
      ...prev,
      dobRaw: rawDate,
      dateOfBirth: formatted,
      age: calculatedAge > 0 ? calculatedAge : 25
    }));
  };

  const handleResetDefault = () => {
    setData(DEFAULT_CANDIDATE);
    setProfileId("ML-96K-USER");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = `🚩 *Official Maratha Matrimony Biodata*\n\n` +
      `👤 *Candidate:* ${data.name} (${data.age} Yrs, ${data.height})\n` +
      `🎓 *Education:* ${data.education}\n` +
      `💼 *Profession:* ${data.profession} (${data.annualIncome})\n` +
      `📍 *Location:* ${data.currentCity}\n` +
      `👑 *Lineage:* ${data.community} • Devak: ${data.devak}\n` +
      `⭐ *Horoscope:* ${data.rashi} • ${data.nakshatra} • ${data.manglik}\n` +
      `📞 *Family Contact:* ${data.contactPhone}\n\n` +
      `View verified profile on MarathaLageen.com`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  // Theme configuration styles
  const themeStyles = {
    saffron: {
      canvasBorder: "border-[#D97706]/70 text-[#2B1700]",
      invocationTitle: "text-[#A04500]",
      subTitle: "text-amber-800",
      sectionHeader: "text-amber-950 bg-amber-100/90 border-amber-300",
      badge: "bg-amber-100 text-amber-900",
      photoBorder: "border-amber-300",
      divider: "border-amber-200"
    },
    modern: {
      canvasBorder: "border-[#DB1866]/50 text-[#1B2559]",
      invocationTitle: "text-[#DB1866]",
      subTitle: "text-pink-900",
      sectionHeader: "text-[#DB1866] bg-[#FFF1F5] border-[#FADADF]",
      badge: "bg-pink-100 text-[#DB1866]",
      photoBorder: "border-pink-300",
      divider: "border-pink-200"
    },
    kundali: {
      canvasBorder: "border-[#1E2756]/60 text-[#121A3D]",
      invocationTitle: "text-[#1E2756]",
      subTitle: "text-slate-700",
      sectionHeader: "text-[#1E2756] bg-slate-100 border-slate-300",
      badge: "bg-slate-200 text-[#1E2756]",
      photoBorder: "border-slate-300",
      divider: "border-slate-200"
    }
  }[theme];

  return (
    <div className="min-h-screen bg-[#FFFDFB] pt-6 pb-16 font-sans print:p-0 print:m-0 print:min-h-0 print:bg-white">
      <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-6 print:p-0 print:m-0 print:space-y-0 print:max-w-none">
        
        {/* Top Header Controls (Hidden when printing) */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 print:hidden">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 bg-[#FFF1F5] text-[#DB1866] text-xs font-bold px-3 py-1 rounded-full">
                <Crown className="w-3.5 h-3.5 fill-[#DB1866]" /> Official Biodata Studio
              </span>
              {profileLoaded && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" /> Pre-filled with your verified profile
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">
              Printable Marriage Biodata
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
              Customize, preview, and print royal single-page biodatas for offline meetings and WhatsApp sharing.
            </p>
          </div>

          {/* Action Suite */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-[#121A3D] hover:bg-[#1A2554] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Printer className="w-4 h-4 text-pink-300" /> Print / Save as PDF
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Share2 className="w-4 h-4" /> Share on WhatsApp
            </button>
          </div>
        </div>

        {/* Theme Selector Strip (Hidden when printing) */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[#DB1866]" /> Select Royal Theme:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "saffron", label: "🚩 Royal Saffron Temple" },
                { id: "modern", label: "✨ Modern Rose Gold" },
                { id: "kundali", label: "🔮 Vedic Astrological Chart" },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    theme === t.id 
                      ? 'bg-[#DB1866] text-white shadow-md shadow-[#DB1866]/25' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleResetDefault}
            className="text-[11px] font-bold text-gray-500 hover:text-[#DB1866] flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset to default template"
          >
            <RotateCcw className="w-3 h-3" /> Reset to Template
          </button>
        </div>

        {/* Live Customize Candidate Details Strip & Form (Hidden when printing) */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs space-y-4 print:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-pink-50 text-[#DB1866] flex items-center justify-center">
                <Edit3 className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#1B2559]">Live Biodata Editor &amp; Customization</h3>
                <p className="text-[11px] text-gray-500">Pick any date of birth on the calendar, adjust lineage, horoscope, and family contacts</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-bold text-[#DB1866] hover:bg-pink-50 px-3 py-1.5 rounded-lg border border-[#FADADF] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{isEditing ? "Close Editor" : "Customize Details & DOB"}</span>
              {isEditing ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {isEditing && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-3 border-t border-gray-100 animate-in fade-in">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Candidate Name
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 focus:border-[#DB1866] outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#DB1866] uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Date of Birth (Pick Calendar Date)
                </label>
                <input
                  type="date"
                  value={data.dobRaw}
                  onChange={(e) => handleDobChange(e.target.value)}
                  className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-[#DB1866] bg-pink-50/40 text-[#1B2559] focus:border-[#DB1866] outline-none cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Calculated Age &amp; Height
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={data.age}
                    onChange={(e) => setData(prev => ({ ...prev, age: parseInt(e.target.value) || 25 }))}
                    className="w-20 text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none"
                  />
                  <input
                    type="text"
                    value={data.height}
                    onChange={(e) => setData(prev => ({ ...prev, height: e.target.value }))}
                    className="flex-1 text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Education / Degree
                </label>
                <input
                  type="text"
                  value={data.education}
                  onChange={(e) => setData(prev => ({ ...prev, education: e.target.value }))}
                  className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Profession &amp; Company
                </label>
                <input
                  type="text"
                  value={data.profession}
                  onChange={(e) => setData(prev => ({ ...prev, profession: e.target.value }))}
                  className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Annual Income
                </label>
                <input
                  type="text"
                  value={data.annualIncome}
                  onChange={(e) => setData(prev => ({ ...prev, annualIncome: e.target.value }))}
                  className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  जात / Community
                </label>
                <input
                  type="text"
                  value={data.community}
                  onChange={(e) => setData(prev => ({ ...prev, community: e.target.value }))}
                  className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  देवक / Devak
                </label>
                <input
                  type="text"
                  value={data.devak}
                  onChange={(e) => setData(prev => ({ ...prev, devak: e.target.value }))}
                  className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  गोत्र / Gotra
                </label>
                <input
                  type="text"
                  value={data.gotra}
                  onChange={(e) => setData(prev => ({ ...prev, gotra: e.target.value }))}
                  className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  कुलदैवत / Kuldaivat
                </label>
                <input
                  type="text"
                  value={data.kuldaivat}
                  onChange={(e) => setData(prev => ({ ...prev, kuldaivat: e.target.value }))}
                  className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  राशी / Rashi
                </label>
                <input
                  type="text"
                  value={data.rashi}
                  onChange={(e) => setData(prev => ({ ...prev, rashi: e.target.value }))}
                  className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  नक्षत्र व मांगलिक / Nakshatra &amp; Manglik
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={data.nakshatra}
                    onChange={(e) => setData(prev => ({ ...prev, nakshatra: e.target.value }))}
                    className="flex-1 text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none"
                    placeholder="Nakshatra"
                  />
                  <input
                    type="text"
                    value={data.manglik}
                    onChange={(e) => setData(prev => ({ ...prev, manglik: e.target.value }))}
                    className="flex-1 text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none"
                    placeholder="Manglik"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  वडिलांचे नाव व पद / Father Details
                </label>
                <input
                  type="text"
                  value={`${data.fatherName} (${data.fatherStatus})`}
                  onChange={(e) => {
                    const val = e.target.value;
                    const parts = val.split("(");
                    setData(prev => ({
                      ...prev,
                      fatherName: parts[0]?.trim() || val,
                      fatherStatus: parts[1]?.replace(")", "")?.trim() || prev.fatherStatus
                    }));
                  }}
                  className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  आईचे नाव व पद / Mother Details
                </label>
                <input
                  type="text"
                  value={`${data.motherName} (${data.motherStatus})`}
                  onChange={(e) => {
                    const val = e.target.value;
                    const parts = val.split("(");
                    setData(prev => ({
                      ...prev,
                      motherName: parts[0]?.trim() || val,
                      motherStatus: parts[1]?.replace(")", "")?.trim() || prev.motherStatus
                    }));
                  }}
                  className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  भाऊ व बहीण / Siblings
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={data.brothers}
                    onChange={(e) => setData(prev => ({ ...prev, brothers: e.target.value }))}
                    className="flex-1 text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none"
                    placeholder="Brothers"
                  />
                  <input
                    type="text"
                    value={data.sisters}
                    onChange={(e) => setData(prev => ({ ...prev, sisters: e.target.value }))}
                    className="flex-1 text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none"
                    placeholder="Sisters"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Native Place &amp; Current City
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={data.nativePlace}
                    onChange={(e) => setData(prev => ({ ...prev, nativePlace: e.target.value }))}
                    className="flex-1 text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none"
                    placeholder="Native Place"
                  />
                  <input
                    type="text"
                    value={data.currentCity}
                    onChange={(e) => setData(prev => ({ ...prev, currentCity: e.target.value }))}
                    className="flex-1 text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none"
                    placeholder="Current City"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Contact Mobile Number
                </label>
                <input
                  type="text"
                  value={data.contactPhone}
                  onChange={(e) => setData(prev => ({ ...prev, contactPhone: e.target.value }))}
                  className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none text-[#DB1866]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" /> Candidate Photo URL
                </label>
                <input
                  type="text"
                  value={data.photoUrl}
                  onChange={(e) => setData(prev => ({ ...prev, photoUrl: e.target.value }))}
                  className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 outline-none text-blue-600"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </div>
          )}
        </div>

        {/* ── PRINTABLE BIODATA CANVAS ── */}
        <div className="flex justify-center print:block">
          <div 
            id="biodata-canvas"
            className={`w-full max-w-[800px] bg-white p-7 sm:p-9 shadow-2xl rounded-3xl border-6 sm:border-8 relative overflow-hidden print:shadow-none print:border-4 print:m-0 print:p-4 print:w-full print:max-w-none print:break-inside-avoid print:page-break-inside-avoid print:rounded-xl transition-all ${themeStyles.canvasBorder}`}
          >
            
            {/* Traditional Top Invocation */}
            <div className={`text-center space-y-0.5 pb-3.5 print:pb-2 border-b-2 border-dashed ${themeStyles.divider}`}>
              <p className={`font-extrabold text-[11px] sm:text-xs print:text-[10px] tracking-widest uppercase ${themeStyles.subTitle}`}>
                ॥ श्री गणेशाय नमः • ॥ कुलदेवता प्रसन्न ॥
              </p>
              <h2 className={`text-2xl sm:text-3xl print:text-xl font-extrabold tracking-wide uppercase ${themeStyles.invocationTitle}`}>
                बायोडाटा • Matrimonial Biodata
              </h2>
              <p className="text-[10px] sm:text-[11px] print:text-[9.5px] font-bold text-gray-500 uppercase tracking-widest">
                🚩 96 Kuli Maratha Kshatriya Lineage 🚩
              </p>
            </div>

            {/* Candidate Summary with Photo */}
            <div className={`py-3.5 print:py-2 flex flex-col sm:flex-row print:flex-row items-center sm:items-start print:items-start gap-4 print:gap-3.5 border-b border-gray-200`}>
              <img 
                src={data.photoUrl} 
                alt={data.name} 
                className={`w-28 h-36 sm:w-32 sm:h-40 print:w-22 print:h-26 rounded-2xl object-cover border-3 shadow-md shrink-0 ${themeStyles.photoBorder}`} 
              />
              <div className="space-y-1 text-center sm:text-left print:text-left flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl print:text-lg font-extrabold text-[#1B2559] leading-tight">{data.name}</h3>
                <p className="text-xs print:text-[11px] font-bold text-[#DB1866]">{data.profession} • {data.company}</p>
                <p className="text-xs print:text-[10.5px] text-gray-600">{data.education} ({data.college})</p>
                
                <div className="flex flex-wrap justify-center sm:justify-start print:justify-start gap-1.5 pt-1">
                  <span className={`text-[10px] print:text-[9.5px] font-bold px-2.5 py-0.5 rounded-full ${themeStyles.badge}`}>
                    {data.age} Yrs • {data.height}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] print:text-[9.5px] font-bold px-2.5 py-0.5 rounded-full">
                    {data.annualIncome}
                  </span>
                  <span className="bg-pink-100 text-[#DB1866] text-[10px] print:text-[9.5px] font-bold px-2.5 py-0.5 rounded-full">
                    {data.maritalStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Main Sections: Personal & Astrological, Education & Career, Family */}
            <div className="py-3 print:py-1.5 space-y-3 print:space-y-1.5 text-xs print:text-[10px] leading-snug">
              
              {/* Section 1: Astrological & Lineage */}
              <div className="space-y-1 print:space-y-0.5">
                <h4 className={`font-extrabold text-xs print:text-[10px] uppercase tracking-wider px-3 py-1 print:py-0.5 rounded-lg border ${themeStyles.sectionHeader}`}>
                  १. कुल व ज्योतिष माहिती (Lineage &amp; Horoscope)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-x-6 gap-y-1.5 print:gap-x-4 print:gap-y-0.5 px-2">
                  <p><span className="font-bold text-gray-500">जात / Community:</span> <span className="font-bold text-[#1B2559]">{data.community}</span></p>
                  <p><span className="font-bold text-gray-500">देवक / Devak:</span> <span className="font-bold text-[#1B2559]">{data.devak}</span></p>
                  <p><span className="font-bold text-gray-500">गोत्र / Gotra:</span> <span className="font-bold text-[#1B2559]">{data.gotra}</span></p>
                  <p><span className="font-bold text-gray-500">कुलदैवत / Kuldaivat:</span> <span className="font-bold text-[#1B2559]">{data.kuldaivat}</span></p>
                  <p><span className="font-bold text-gray-500">राशी / Moon Sign:</span> <span className="font-bold text-[#1B2559]">{data.rashi}</span></p>
                  <p><span className="font-bold text-gray-500">नक्षत्र / Birth Star:</span> <span className="font-bold text-[#1B2559]">{data.nakshatra}</span></p>
                  <p><span className="font-bold text-gray-500">मांगलिक / Manglik:</span> <span className="font-bold text-[#1B2559]">{data.manglik}</span></p>
                  <p><span className="font-bold text-gray-500">जन्मदिनांक / DOB:</span> <span className="font-bold text-[#1B2559]">{data.dateOfBirth}</span></p>
                </div>
              </div>

              {/* Section 2: Education & Career */}
              <div className="space-y-1 print:space-y-0.5">
                <h4 className={`font-extrabold text-xs print:text-[10px] uppercase tracking-wider px-3 py-1 print:py-0.5 rounded-lg border ${themeStyles.sectionHeader}`}>
                  २. शिक्षण व व्यवसाय (Education &amp; Profession)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-x-6 gap-y-1.5 print:gap-x-4 print:gap-y-0.5 px-2">
                  <p><span className="font-bold text-gray-500">शिक्षण / Degree:</span> <span className="font-bold text-[#1B2559]">{data.education}</span></p>
                  <p><span className="font-bold text-gray-500">कॉलेज / College:</span> <span className="font-bold text-[#1B2559]">{data.college}</span></p>
                  <p><span className="font-bold text-gray-500">व्यवसाय / Profession:</span> <span className="font-bold text-[#1B2559]">{data.profession}</span></p>
                  <p><span className="font-bold text-gray-500">कंपनी / Organization:</span> <span className="font-bold text-[#1B2559]">{data.company}</span></p>
                  <p><span className="font-bold text-gray-500">वार्षिक उत्पन्न / Annual Income:</span> <span className="font-bold text-[#1B2559]">{data.annualIncome}</span></p>
                  <p><span className="font-bold text-gray-500">कार्यक्षेत्र / Work Location:</span> <span className="font-bold text-[#1B2559]">{data.currentCity}</span></p>
                </div>
              </div>

              {/* Section 3: Family Details */}
              <div className="space-y-1 print:space-y-0.5">
                <h4 className={`font-extrabold text-xs print:text-[10px] uppercase tracking-wider px-3 py-1 print:py-0.5 rounded-lg border ${themeStyles.sectionHeader}`}>
                  ३. कौटुंबिक माहिती व संपर्क (Family &amp; Contacts)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-x-6 gap-y-1.5 print:gap-x-4 print:gap-y-0.5 px-2">
                  <p><span className="font-bold text-gray-500">वडिलांचे नाव / Father:</span> <span className="font-bold text-[#1B2559]">{data.fatherName}</span></p>
                  <p><span className="font-bold text-gray-500">वडिलांचा व्यवसाय / Occ:</span> <span className="font-bold text-[#1B2559]">{data.fatherStatus}</span></p>
                  <p><span className="font-bold text-gray-500">आईचे नाव / Mother:</span> <span className="font-bold text-[#1B2559]">{data.motherName}</span></p>
                  <p><span className="font-bold text-gray-500">आईचा व्यवसाय / Occ:</span> <span className="font-bold text-[#1B2559]">{data.motherStatus}</span></p>
                  <p><span className="font-bold text-gray-500">भाऊ / Brothers:</span> <span className="font-bold text-[#1B2559]">{data.brothers}</span></p>
                  <p><span className="font-bold text-gray-500">बहीण / Sisters:</span> <span className="font-bold text-[#1B2559]">{data.sisters}</span></p>
                  <p><span className="font-bold text-gray-500">मूळ गाव / Native Place:</span> <span className="font-bold text-[#1B2559]">{data.nativePlace}</span></p>
                  <p><span className="font-bold text-gray-500">संपर्क मोबाईल / Mobile:</span> <span className="font-bold text-[#DB1866]">{data.contactPhone}</span></p>
                </div>
              </div>

            </div>

            {/* Bottom Footer Stamp */}
            <div className={`pt-3 print:pt-1.5 border-t-2 border-dashed ${themeStyles.divider} text-center space-y-0.5`}>
              <p className="text-[10px] print:text-[9px] font-bold text-gray-600">
                🚩 मराठा लग्न • कर्नाटक व महाराष्ट्र ९६ कुळी मराठा समाज अधिकृत नेटवर्क
              </p>
              <p className="text-[9.5px] print:text-[8px] text-gray-400">
                Verified Candidate Profile ID: {profileId} • Generated on MarathaLageen.com
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
