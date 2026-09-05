"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Search,
  ArrowRight,
  Heart,
  User,
  Sparkles,
  MapPin,
  Bookmark,
  Award,
  Crown,
  Share2,
  PhoneCall,
  Briefcase,
  GraduationCap,
  Calculator,
  Compass,
  Building2,
  Stethoscope,
  Laptop,
  Landmark,
  Globe2,
  Check,
  Quote,
  Star,
  Crosshair,
  Navigation,
  Radio,
} from "lucide-react";
import { ProfileCard } from "@/components/ui/ProfileCard";

const nakshatras = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Svati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
  "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

const districts = [
  { name: "Belagavi", region: "North Karnataka", count: "340+", desc: "Prominent 96 Kuli Maratha families across the border region", color: "from-rose-500/10 to-pink-500/10", border: "hover:border-[#DB1866]" },
  { name: "Pune", region: "Maharashtra", count: "520+", desc: "Cultural center with educated IT & corporate professionals", color: "from-blue-500/10 to-indigo-500/10", border: "hover:border-[#2A3773]" },
  { name: "Kolhapur", region: "South Maharashtra", count: "280+", desc: "Historic royal houses and esteemed Maratha lineages", color: "from-amber-500/10 to-orange-500/10", border: "hover:border-amber-500" },
  { name: "Bengaluru", region: "Karnataka Capital", count: "190+", desc: "Corporate and tech professionals settled in Karnataka", color: "from-emerald-500/10 to-teal-500/10", border: "hover:border-emerald-500" },
  { name: "Hubballi", region: "Dharwad Region", count: "140+", desc: "Key hub of the North Karnataka Maratha community", color: "from-purple-500/10 to-fuchsia-500/10", border: "hover:border-purple-500" },
  { name: "Satara", region: "Western Maharashtra", count: "210+", desc: "Esteemed Patil, Inamdar & Deshmukh family lineages", color: "from-red-500/10 to-rose-500/10", border: "hover:border-rose-500" },
];

const devaks = [
  { name: "Kalamb (कळंब)", count: "120+ Families" },
  { name: "Suryakant (सूर्यकांत)", count: "140+ Families" },
  { name: "Panchpallav (पंचपल्लव)", count: "180+ Families" },
  { name: "Garud (गरुड पंख)", count: "95+ Families" },
  { name: "Rui / Madar (रुई)", count: "85+ Families" },
  { name: "Nagvel / Halad (नागवेल)", count: "110+ Families" },
  { name: "Vasuki (वासुकी)", count: "75+ Families" },
  { name: "Kamal (कमळ)", count: "60+ Families" },
];

const professions = [
  { icon: Laptop, title: "Software & IT", count: "420+ Profiles", filter: "Software" },
  { icon: Stethoscope, title: "Doctors & Medical", count: "180+ Profiles", filter: "Doctor" },
  { icon: Landmark, title: "Govt & Civil Services", count: "110+ Profiles", filter: "Govt" },
  { icon: Building2, title: "Business & Entrepreneurs", count: "260+ Profiles", filter: "Business" },
  { icon: Globe2, title: "NRI & Abroad Settled", count: "90+ Profiles", filter: "Engineer" },
  { icon: GraduationCap, title: "Professors & Academics", count: "75+ Profiles", filter: "Professor" },
];

const testimonials = [
  {
    names: "Sangram Kadam & Dr. Aishwarya Pawar",
    city: "Belagavi • Pune",
    devak: "Panchpallav & Suryakant Match",
    quote: "Maratha Matrimony helped us connect with an aligned Devak & Gotra family. Our parents easily connected on WhatsApp.",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600",
  },
  {
    names: "Rohan Sawant & Pooja More",
    city: "Kolhapur • Bengaluru",
    devak: "Kalamb & Rui Match",
    quote: "The 36 Gunas Milan tool and verified contact system gave us total peace of mind. Both families finalized the wedding happily!",
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&q=80&w=600",
  },
  {
    names: "Aditya Bhosle & Neha Patil",
    city: "Satara • Hubballi",
    devak: "Garud & Nagvel Match",
    quote: "The most authentic and verified platform for our Maratha community. Truly trustworthy and family-first!",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
  },
];

import { findNearestCity, reverseGeocodeLive } from "@/lib/geo";

export default function HomePage() {
  const [featuredProfiles, setFeaturedProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search Bar State
  const [lookingFor, setLookingFor] = useState("Female");
  const [ageMin, setAgeMin] = useState("21");
  const [ageMax, setAgeMax] = useState("32");
  const [city, setCity] = useState("");
  const [community, setCommunity] = useState("96 Kuli Maratha");

  // Date / Age Flexibility State
  const [dateMode, setDateMode] = useState<"age" | "dob">("age");
  const [birthYearMin, setBirthYearMin] = useState("1992");
  const [birthYearMax, setBirthYearMax] = useState("2003");

  // Live Location State & Algorithm
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [liveLocationNotice, setLiveLocationNotice] = useState<string | null>(null);

  // Kundali Match Calculator State
  const [boyNakshatra, setBoyNakshatra] = useState("Pushya");
  const [girlNakshatra, setGirlNakshatra] = useState("Rohini");
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);

  const fetchProfiles = async (lat?: number, lng?: number) => {
    try {
      setLoading(true);
      let url = "/api/search?page=1&limit=8";
      if (lat !== undefined && lng !== undefined) {
        url += `&userLat=${lat}&userLng=${lng}`;
      }
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setFeaturedProfiles(data.matches || data.profiles || []);
      }
    } catch (err) {
      console.error("Failed to load featured profiles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Proximity Geolocation Detection Trigger with True Reverse Geocoding
  const handleDetectLiveLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your current browser.");
      return;
    }

    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserCoords({ lat: latitude, lng: longitude });

        // 1. First attempt exact reverse geocode (detects Jaipur, Pune, Belagavi, etc.)
        const loc = await reverseGeocodeLive(latitude, longitude);
        const displayLocation = loc.state ? `${loc.cityName}, ${loc.state}` : loc.cityName;

        setCity(loc.cityName);
        setLiveLocationNotice(displayLocation);
        setDetectingLocation(false);

        // 2. Immediately re-sort featured profiles on the home page by proximity to user
        fetchProfiles(latitude, longitude);
      },
      (err) => {
        console.warn("Location permission not granted or unavailable:", err.message);
        setDetectingLocation(false);
        setCity("Belagavi");
        setLiveLocationNotice("Belagavi (Regional Center)");
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleCalculateMilan = () => {
    const bIndex = nakshatras.indexOf(boyNakshatra);
    const gIndex = nakshatras.indexOf(girlNakshatra);
    const hash = (bIndex * 7 + gIndex * 13) % 19;
    const score = 18 + hash; // Ranges between 18 and 36
    setCalculatedScore(Math.min(36, score));
  };

  // Build dynamic search URL with all flexible parameters
  const searchParamsObj = new URLSearchParams();
  searchParamsObj.set("gender", lookingFor);

  if (dateMode === "dob") {
    searchParamsObj.set("birthYearMin", birthYearMin);
    searchParamsObj.set("birthYearMax", birthYearMax);
    const currentYear = new Date().getFullYear();
    searchParamsObj.set("minAge", (currentYear - parseInt(birthYearMax)).toString());
    searchParamsObj.set("maxAge", (currentYear - parseInt(birthYearMin)).toString());
  } else {
    searchParamsObj.set("minAge", ageMin);
    searchParamsObj.set("maxAge", ageMax);
  }

  if (city && city !== "live") {
    searchParamsObj.set("city", city);
  }

  if (community && community !== "All") {
    searchParamsObj.set("community", community);
  }

  if (userCoords) {
    searchParamsObj.set("userLat", userCoords.lat.toString());
    searchParamsObj.set("userLng", userCoords.lng.toString());
    searchParamsObj.set("live", "true");
  }

  const searchUrl = `/search?${searchParamsObj.toString()}`;

  // Complete age continuum from 18 to 70 (every single year is selectable)
  const ageOptions = Array.from({ length: 53 }, (_, i) => 18 + i);
  const birthYearOptions = Array.from({ length: 53 }, (_, i) => new Date().getFullYear() - 18 - i);


  return (
    <div className="min-h-screen bg-[#FFFDFB] text-[#1B2559]">

      {/* ──────────── 1. ROYAL HERITAGE 2-COLUMN HERO SECTION ──────────── */}
      <section className="bg-gradient-to-b from-[#FFFDF9] via-white to-[#FFF8FA] overflow-hidden relative pt-10 lg:pt-14 pb-16 lg:pb-24 border-b border-[#FADADF]/60">
        
        {/* Ambient Warm Golden & Pink Glow in Background */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-7xl px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Content & Calls to Action (7 cols) */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              <div className="inline-flex items-center gap-2 bg-[#FFF1F5] border border-[#FADADF] text-[#DB1866] text-xs font-bold px-4 py-2 rounded-full shadow-xs">
                <Crown className="w-4 h-4 fill-[#DB1866] text-[#DB1866]" /> Official 96 Kuli Maratha Community Network
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-sans font-extrabold text-[#1B2559] leading-[1.18] tracking-tight">
                Honoring Royal Clan Heritage,<br />
                <span className="text-[#DB1866]">Connecting Destined Life Partners</span>
              </h1>

              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-normal">
                100% ID and document verified matrimonial portal for Maratha families. Featuring authentic Devak, Gotra, Kuldaivat, and 36 Gunas Kundali compatibility.
              </p>

              {/* Badges / Metrics */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-bold text-[#1B2559]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" /> 1,000+ Verified Profiles
                </div>
                <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-bold text-[#1B2559]">
                  <Crown className="w-4 h-4 text-[#C98E32] shrink-0" /> 96 Kuli Maratha Heritage
                </div>
                <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-2xl border border-gray-200 shadow-xs text-xs font-bold text-[#1B2559]">
                  <Sparkles className="w-4 h-4 text-[#DB1866] shrink-0" /> 36 Gunas Kundali Milan
                </div>
              </div>

              {/* CTA Buttons with ample spacing */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/search"
                  className="bg-[#DB1866] hover:bg-[#B81456] text-white font-bold text-sm px-8 py-4 rounded-2xl shadow-xl shadow-[#DB1866]/25 transition-all hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Search className="w-4 h-4" /> Explore 1,000+ Profiles
                </Link>
                <Link
                  href="/profile/edit"
                  className="bg-white hover:bg-gray-50 text-[#1B2559] border border-gray-300 font-bold text-sm px-7 py-4 rounded-2xl transition-all shadow-xs flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" /> Update My Biodata
                </Link>
              </div>

              {/* Family trust endorsement */}
              <div className="flex items-center gap-3 pt-2 text-xs text-gray-500 font-medium">
                <div className="flex -space-x-2">
                  {["1502685104226-ee32379fefbe", "1508214751196-bcfd4ca60f91", "1524504388940-b1c1722653e1"].map((img, i) => (
                    <img
                      key={i}
                      src={`https://images.unsplash.com/photo-${img}?auto=format&fit=crop&q=80&w=100`}
                      alt="Member"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/hero.jpg"; }}
                    />
                  ))}
                </div>
                <span>Trusted by 5,000+ Maratha families across Belagavi, Pune & Bengaluru</span>
              </div>

            </div>

            {/* Right Column: Crystal Clear Showcase Couple Card (5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              
              {/* Background ambient lighting under the card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#DB1866]/20 via-amber-400/20 to-transparent rounded-3xl blur-2xl transform rotate-2" />

              <div className="relative w-full max-w-[460px] bg-white rounded-3xl p-3 shadow-2xl border-2 border-[#E3B873]/50 ring-4 ring-pink-50/50">
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src="/hero.jpg"
                    alt="Royal Maratha Bride & Groom"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle vignette gradient at bottom only */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1B2559]/90 via-[#1B2559]/40 to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="inline-flex items-center gap-1.5 bg-[#DB1866] text-white text-[11px] font-bold px-3 py-1 rounded-full w-fit mb-1.5 shadow-md">
                      <Crown className="w-3.5 h-3.5 fill-amber-300 text-amber-300" /> 96 Kuli Verified Matches
                    </span>
                    <p className="text-xs font-semibold text-blue-100">
                      Belagavi • Pune • Kolhapur • Bengaluru • Hubballi
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ──────────── 2. DYNAMIC LIVE SEARCH & FILTER CONSOLE ──────────── */}
      <section className="relative z-20 -mt-8 lg:-mt-10 pb-14">
        <div className="container mx-auto max-w-[1360px] px-4 md:px-8">
          <div className="rounded-3xl shadow-2xl shadow-[#1B2559]/12 flex flex-col overflow-hidden border border-[#FADADF] bg-white">
            
            {/* Top Navy Trust Bar */}
            <div className="bg-[#1B2559] py-4 px-6 lg:px-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 divide-x divide-white/10">
                {[
                  { icon: ShieldCheck, title: "100% ID Verified", sub: "Aadhaar & phone checked" },
                  { icon: Crown, title: "96 Kuli & Devak", sub: "Preserving clan lineage" },
                  { icon: CheckCircle2, title: "Privacy Assured", sub: "Photo & contact shield" },
                  { icon: Users, title: "Direct Family Connect", sub: "Instant WhatsApp biodata" },
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-3 ${idx !== 0 ? 'pl-4 lg:pl-8' : ''}`}>
                    <item.icon className="w-6 h-6 text-[#DB1866] shrink-0" strokeWidth={1.7} />
                    <div>
                      <p className="text-white text-xs font-bold">{item.title}</p>
                      <p className="text-blue-200 text-[10px]">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Search Console */}
            <div className="p-5 lg:p-6 flex flex-col lg:flex-row items-center gap-4">
              
              <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                
                {/* Gender */}
                <div className="flex flex-col bg-gray-50/80 rounded-2xl p-3 border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <User className="w-3 h-3 text-[#DB1866]" /> Looking For
                  </span>
                  <select
                    value={lookingFor}
                    onChange={(e) => setLookingFor(e.target.value)}
                    className="bg-transparent text-sm font-bold text-[#1B2559] outline-none cursor-pointer"
                  >
                    <option value="Female">Maratha Bride</option>
                    <option value="Male">Maratha Groom</option>
                  </select>
                </div>
                
                {/* Age Group or Birth Year (DOB) */}
                <div className="flex flex-col bg-gray-50/80 rounded-2xl p-3 border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      {dateMode === "age" ? "Age Range" : "Birth Year (DOB)"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDateMode(dateMode === "age" ? "dob" : "age")}
                      className="text-[10px] text-[#DB1866] hover:text-[#B81456] font-bold transition-colors cursor-pointer"
                      title="Switch between Age and Birth Year"
                    >
                      {dateMode === "age" ? "Switch to DOB" : "Switch to Age"}
                    </button>
                  </div>

                  {dateMode === "age" ? (
                    <div className="flex items-center gap-2">
                      <select
                        value={ageMin}
                        onChange={(e) => {
                          const val = e.target.value;
                          setAgeMin(val);
                          if (parseInt(val) > parseInt(ageMax)) setAgeMax((parseInt(val) + 1).toString());
                        }}
                        className="bg-transparent text-sm font-bold text-[#1B2559] outline-none cursor-pointer"
                      >
                        {ageOptions.filter(a => a < 70).map(a => (
                          <option key={a} value={a}>{a} Yrs</option>
                        ))}
                      </select>
                      <span className="text-gray-400 text-xs font-bold">to</span>
                      <select
                        value={ageMax}
                        onChange={(e) => setAgeMax(e.target.value)}
                        className="bg-transparent text-sm font-bold text-[#1B2559] outline-none cursor-pointer"
                      >
                        {ageOptions.filter(a => a >= parseInt(ageMin)).map(a => (
                          <option key={a} value={a}>{a} Yrs</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <select
                        value={birthYearMin}
                        onChange={(e) => setBirthYearMin(e.target.value)}
                        className="bg-transparent text-sm font-bold text-[#1B2559] outline-none cursor-pointer"
                      >
                        {birthYearOptions.map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                      <span className="text-gray-400 text-xs font-bold">to</span>
                      <select
                        value={birthYearMax}
                        onChange={(e) => setBirthYearMax(e.target.value)}
                        className="bg-transparent text-sm font-bold text-[#1B2559] outline-none cursor-pointer"
                      >
                        {birthYearOptions.map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Preferred District / City with Live Location Algorithm */}
                <div className="flex flex-col bg-gray-50/80 rounded-2xl p-3 border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#DB1866]" /> Preferred District / City
                    </span>
                    <button
                      type="button"
                      onClick={handleDetectLiveLocation}
                      disabled={detectingLocation}
                      className="text-[10px] text-[#DB1866] hover:text-[#B81456] font-bold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                      title="Auto-detect nearest Maratha candidates using your live GPS location"
                    >
                      <Crosshair className={`w-3 h-3 ${detectingLocation ? "animate-spin text-[#DB1866]" : ""}`} />
                      <span>{detectingLocation ? "Locating..." : "Use Live GPS"}</span>
                    </button>
                  </div>
                  
                  <select
                    value={city}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "live") {
                        handleDetectLiveLocation();
                      } else {
                        setCity(val);
                        setLiveLocationNotice(null);
                        setUserCoords(null);
                        fetchProfiles();
                      }
                    }}
                    className="bg-transparent text-sm font-bold text-[#1B2559] outline-none cursor-pointer"
                  >
                    <option value="">All Regions (Karnataka & Maharashtra)</option>
                    <option value="live">📍 Near My Live Location (GPS)</option>
                    <option value="Belagavi">Belagavi (North Karnataka)</option>
                    <option value="Pune">Pune (Maharashtra)</option>
                    <option value="Kolhapur">Kolhapur (South Maharashtra)</option>
                    <option value="Bengaluru">Bengaluru (Karnataka)</option>
                    <option value="Hubballi">Hubballi / Dharwad</option>
                    <option value="Satara">Satara (Western Maharashtra)</option>
                    <option value="Sangli">Sangli (Maharashtra)</option>
                    <option value="Mumbai">Mumbai / Navi Mumbai</option>
                    <option value="Nashik">Nashik</option>
                    <option value="Solapur">Solapur</option>
                  </select>

                  {/* Live Proximity Feedback Pill */}
                  {liveLocationNotice && (
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 animate-in fade-in">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                      <span className="truncate">Live GPS: {liveLocationNotice}</span>
                    </div>
                  )}
                </div>

                {/* Community */}
                <div className="flex flex-col bg-gray-50/80 rounded-2xl p-3 border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#DB1866]" /> Lineage
                  </span>
                  <select
                    value={community}
                    onChange={(e) => setCommunity(e.target.value)}
                    className="bg-transparent text-sm font-bold text-[#1B2559] outline-none cursor-pointer"
                  >
                    <option value="96 Kuli Maratha">96 Kuli Maratha</option>
                    <option value="Deshastha Maratha">Deshastha Maratha</option>
                    <option value="All">All Maratha Lineages</option>
                  </select>
                </div>

              </div>

              {/* Submit Button */}
              <div className="shrink-0 w-full lg:w-auto">
                <Link
                  href={searchUrl}
                  className="w-full lg:w-auto flex items-center justify-center gap-2 bg-[#DB1866] hover:bg-[#B81456] text-white font-bold px-8 h-[54px] rounded-2xl shadow-xl shadow-[#DB1866]/20 transition-all hover:-translate-y-0.5 text-sm"
                >
                  <Search className="w-4 h-4" /> Search Matches
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ──────────── 3. LIVE FEATURED PROFILES GRID ──────────── */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-[1360px] px-4 md:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1 text-[#DB1866] text-xs font-bold uppercase tracking-wider mb-1">
                <Crown className="w-3.5 h-3.5" /> Handpicked Matches
              </div>
              <h2 className="text-2xl md:text-3xl font-sans font-bold text-[#1B2559]">
                Featured Maratha Profiles
              </h2>
            </div>
            
            <Link
              href="/search"
              className="text-[#DB1866] hover:text-[#B81456] font-bold text-xs flex items-center gap-1 bg-[#FFF1F5] hover:bg-[#FFE4EF] px-5 py-2.5 rounded-xl transition-all shadow-xs shrink-0 self-start sm:self-auto"
            >
              View All 1,000+ Profiles <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Compact 4-Column Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="bg-gray-50 rounded-2xl h-[340px] animate-pulse border border-gray-100" />
              ))}
            </div>
          ) : featuredProfiles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {featuredProfiles.map((p) => (
                <ProfileCard key={p.id} {...p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#FFFDFB] rounded-3xl border border-[#FADADF]">
              <p className="text-gray-500 font-bold mb-4">No featured profiles found</p>
              <Link href="/search" className="text-[#DB1866] font-bold hover:underline">
                Explore Full Directory &rarr;
              </Link>
            </div>
          )}

        </div>
      </section>

      {/* ──────────── 4. INTERACTIVE 36 GUNAS KUNDALI MILAN CALCULATOR ──────────── */}
      <section className="py-14 bg-gradient-to-br from-[#FFF8FA] via-[#FFFDF9] to-[#FFF1F5] border-y border-[#FADADF]">
        <div className="container mx-auto max-w-5xl px-4 md:px-8">
          
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-[#C98E32]/30 relative overflow-hidden">
            
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="inline-flex items-center gap-1.5 bg-amber-50 text-[#8A1538] border border-amber-200 px-3.5 py-1 rounded-full text-xs font-bold mb-2">
                <Calculator className="w-3.5 h-3.5 text-amber-600" /> Vedic Ashtakoot System
              </div>
              <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#1B2559]">
                36 Gunas Kundali Match Meter
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Select the Groom&apos;s and Bride&apos;s birth star (Nakshatra) to instantly check traditional 36 Gunas astrological compatibility.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-6">
              <div className="bg-[#FFFDFB] p-4 rounded-2xl border border-gray-200 space-y-1.5">
                <label className="text-xs font-bold text-[#1B2559] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#DB1866]" /> Groom&apos;s Birth Star (Nakshatra)
                </label>
                <select
                  value={boyNakshatra}
                  onChange={(e) => { setBoyNakshatra(e.target.value); setCalculatedScore(null); }}
                  className="w-full h-11 px-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-[#1B2559] outline-none focus:border-[#DB1866]"
                >
                  {nakshatras.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div className="bg-[#FFFDFB] p-4 rounded-2xl border border-gray-200 space-y-1.5">
                <label className="text-xs font-bold text-[#1B2559] flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#DB1866]" /> Bride&apos;s Birth Star (Nakshatra)
                </label>
                <select
                  value={girlNakshatra}
                  onChange={(e) => { setGirlNakshatra(e.target.value); setCalculatedScore(null); }}
                  className="w-full h-11 px-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-[#1B2559] outline-none focus:border-[#DB1866]"
                >
                  {nakshatras.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleCalculateMilan}
                className="bg-[#2A3773] hover:bg-[#1f295c] text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-lg transition-all hover:scale-105"
              >
                Calculate Astrological Compatibility
              </button>
            </div>

            {calculatedScore !== null && (
              <div className="mt-8 p-6 bg-emerald-50/80 rounded-2xl border border-emerald-200 max-w-md mx-auto text-center animate-in zoom-in-95">
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                  Astrological Compatibility Score
                </p>
                <p className="text-4xl font-sans font-extrabold text-emerald-900">
                  {calculatedScore} / 36 Gunas
                </p>
                <p className="text-xs font-bold text-emerald-700 mt-2">
                  {calculatedScore >= 28 ? "Highly Auspicious Match (उत्कृष्ट)" : "Good Match for Marriage"}
                </p>
                <p className="text-[11px] text-gray-500 mt-2 italic">
                  * Note: Both families must have distinct Devak & Gotra per traditional customs.
                </p>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ──────────── 5. DISTRICTS / REGIONAL HUBS SHOWCASE ──────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-[1360px] px-4 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#DB1866] uppercase tracking-wider">Explore Profiles By Region</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#1B2559] mt-1">
              Explore by Maratha Districts
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Browse thousands of verified profiles across key hubs in Karnataka and Maharashtra.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {districts.map((d, idx) => (
              <Link
                key={idx}
                href={`/search?city=${encodeURIComponent(d.name)}`}
                className={`group p-6 rounded-3xl border border-gray-200 bg-gradient-to-br ${d.color} ${d.border} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 block relative overflow-hidden`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-sans font-bold text-[#1B2559] group-hover:text-[#DB1866] transition-colors">
                    {d.name} <span className="text-xs text-gray-500 font-sans font-normal">({d.region})</span>
                  </span>
                  <span className="bg-white/90 font-mono text-xs font-black text-[#2A3773] px-3 py-1 rounded-full shadow-xs border border-gray-100">
                    {d.count}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {d.desc}
                </p>
                <div className="text-xs font-bold text-[#DB1866] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View District Profiles <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ──────────── 6. DEVAK & 96 KULI LINEAGE SHOWCASE ──────────── */}
      <section className="py-14 bg-[#FFFDF9] border-y border-[#FADADF]">
        <div className="container mx-auto max-w-[1360px] px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-[#DB1866] uppercase tracking-wider">Traditional Clan Lineage</span>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#1B2559] mt-1">
                Explore by Devak (Family Clan Totem)
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Devak compatibility is essential in Maratha marriages. Find prospective matches filtered by your Devak.
              </p>
            </div>
            <Link
              href="/search"
              className="text-xs font-bold text-[#DB1866] hover:underline flex items-center gap-1 shrink-0"
            >
              View All Devak Categories &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {devaks.map((dev, idx) => (
              <Link
                key={idx}
                href={`/search?keyword=${encodeURIComponent(dev.name.split(" ")[0])}`}
                className="bg-white p-4 rounded-2xl border border-gray-200 hover:border-[#DB1866] hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#DB1866] group-hover:scale-125 transition-transform" />
                  <span className="font-bold text-xs sm:text-sm text-[#1B2559] group-hover:text-[#DB1866]">
                    {dev.name}
                  </span>
                </div>
                <span className="text-[11px] text-gray-400 font-medium mt-2">
                  {dev.count}
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ──────────── 7. CAREER & PROFESSION SPECIALIZATION ──────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-[1360px] px-4 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#DB1866] uppercase tracking-wider">Education & Profession</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#1B2559] mt-1">
              Find Matches by Profession
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Browse educated brides and grooms across engineering, medical, civil services, and business backgrounds.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {professions.map((prof, idx) => (
              <Link
                key={idx}
                href={`/search?keyword=${encodeURIComponent(prof.filter)}`}
                className="bg-[#FFFDFB] p-5 rounded-3xl border border-gray-100 hover:border-[#DB1866] hover:shadow-lg transition-all text-center group flex flex-col items-center justify-center hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FFF1F5] text-[#DB1866] group-hover:bg-[#DB1866] group-hover:text-white transition-colors flex items-center justify-center mb-3">
                  <prof.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-xs text-[#1B2559] mb-1">
                  {prof.title}
                </h4>
                <p className="text-[10px] text-gray-400 font-medium">
                  {prof.count}
                </p>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ──────────── 8. HOW IT WORKS 4-STEP JOURNEY ──────────── */}
      <section className="py-16 bg-gradient-to-br from-[#1B2559] to-[#2A3773] text-white">
        <div className="container mx-auto max-w-6xl px-4 md:px-8 text-center">
          
          <div className="max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-pink-300 uppercase tracking-widest">4 Simple Steps</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold mt-2">
              How Maratha Matrimony Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { num: "1", title: "Create Verified Profile", desc: "Complete your personal, educational, and family biodata with authentic photos." },
              { num: "2", title: "Devak & Kundali Matching", desc: "Discover compatible matches based on 96 Kuli customs, Gotra, and 36 Gunas." },
              { num: "3", title: "Connect with Parents", desc: "Express interest and unlock verified parent phone numbers and WhatsApp." },
              { num: "4", title: "Celebrate Wedding", desc: "Coordinate traditional family meetings and tie the sacred knot." },
            ].map((step, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 relative">
                <div className="w-10 h-10 rounded-2xl bg-[#DB1866] text-white font-sans font-bold text-lg flex items-center justify-center mb-4 shadow-lg">
                  {step.num}
                </div>
                <h4 className="font-bold text-sm mb-2">{step.title}</h4>
                <p className="text-xs text-blue-100 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ──────────── 9. TESTIMONIALS / SUCCESS STORIES ──────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-[1360px] px-4 md:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#DB1866] uppercase tracking-wider">Happy Maratha Couples</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#1B2559] mt-1">
              Maratha Matrimony Success Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-[#FFFDFB] rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col">
                <div className="h-56 overflow-hidden relative">
                  <img src={t.image} alt={t.names} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="font-bold text-sm">{t.names}</p>
                    <p className="text-[11px] text-pink-200">{t.city}</p>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#8A1538] bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full inline-block">
                      {t.devak}
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ──────────── 10. VIP ROYAL MEMBERSHIP CTA ──────────── */}
      <section className="py-14 bg-[#FFF8FA] border-t border-[#FADADF]">
        <div className="container mx-auto max-w-5xl px-4 md:px-8">
          <div className="bg-gradient-to-r from-[#8A1538] via-[#DB1866] to-[#C98E32] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            
            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold mb-3">
                <Crown className="w-4 h-4 text-amber-300 fill-amber-300" /> Gold & Royal VIP Membership
              </div>
              <h3 className="text-2xl sm:text-3xl font-sans font-extrabold leading-tight">
                Connect Directly with 50+ Verified Maratha Families
              </h3>
              <p className="text-pink-100 text-xs sm:text-sm mt-2 leading-relaxed">
                Unlock direct mobile numbers, WhatsApp family chats, Kundali Milan reports, and priority biodata highlights.
              </p>
            </div>

            <div className="relative z-10 shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/membership"
                className="bg-white hover:bg-amber-50 text-[#8A1538] font-bold text-xs sm:text-sm px-7 py-3.5 rounded-2xl shadow-xl transition-all hover:scale-105 text-center"
              >
                Upgrade to VIP Membership
              </Link>
              <Link
                href="/search"
                className="bg-black/30 hover:bg-black/40 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl border border-white/30 transition-all text-center"
              >
                Explore Matches
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
