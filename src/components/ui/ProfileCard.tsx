"use client";

import { calculateCompatibilityScore } from "@/lib/compatibility";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MapPin, Briefcase, GraduationCap, Ruler, Heart, ShieldCheck, Sparkles, Crown, ArrowRight, Send, Lock as LockIcon } from "lucide-react";
import { useState } from "react";

interface ProfileCardProps {
  id: string;
  name: string;
  age: number;
  height: string;
  city: string;
  state: string;
  education: string;
  profession: string;
  community?: string;
  devak?: string;
  userId?: string;
  isVerified?: boolean;
  imageUrl?: string;
  matchPercent?: number;
  initialShortlisted?: boolean;
  onShortlistToggle?: (isShortlisted: boolean) => void;
  distanceKm?: number;
  gotra?: string;
  photoPrivacy?: string;
}

export function ProfileCard({
  id,
  userId,
  name,
  age,
  height,
  city,
  state,
  education,
  profession,
  community = "96 Kuli Maratha",
  devak,
  isVerified = true,
  imageUrl,
  matchPercent = 88,
  initialShortlisted = false,
  onShortlistToggle,
  distanceKm,
  gotra,
  photoPrivacy = "all",
}: ProfileCardProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [shortlisted, setShortlisted] = useState(initialShortlisted);
  const [interestSent, setInterestSent] = useState(false);

  // Dynamic Compatibility Calculation
  const comp = calculateCompatibilityScore(
    null,
    { city, state, age, gotra, education, profession }
  );
  const displayScore = matchPercent || comp.score;
  const matchTags = comp.tags;
  const [loading, setLoading] = useState(false);

  const getReturnUrl = (customPath?: string) => {
    if (customPath) return customPath;
    if (typeof window !== "undefined") {
      return window.location.pathname + window.location.search;
    }
    return "/search";
  };

  const checkAuthOrRedirect = (destination?: string): boolean => {
    if (status === "unauthenticated" || !session?.user) {
      const from = getReturnUrl(destination);
      router.push(`/login?from=${encodeURIComponent(from)}`);
      return false;
    }

    if ((session.user as any)?.hasProfile === false && (session.user as any)?.role !== "ADMIN") {
      router.push("/onboarding");
      return false;
    }

    return true;
  };

  const handleViewProfile = (e: React.MouseEvent) => {
    if (!checkAuthOrRedirect(`/profile/${id}`)) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  };

  const toggleShortlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!checkAuthOrRedirect()) {
      return;
    }

    const nextState = !shortlisted;
    setShortlisted(nextState);
    if (onShortlistToggle) onShortlistToggle(nextState);

    try {
      setLoading(true);
      const res = await fetch("/api/shortlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId: id }),
      });
      if (res.status === 401) {
        router.push(`/login?from=${encodeURIComponent(getReturnUrl())}`);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setShortlisted(data.shortlisted);
      }
    } catch (err) {
      console.error("Failed to toggle shortlist:", err);
      setShortlisted(!nextState);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickInterest = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!checkAuthOrRedirect()) {
      return;
    }

    if (interestSent) return;

    setInterestSent(true);
    try {
      const res = await fetch("/api/interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId: userId || id }),
      });
      if (res.status === 401) {
        router.push(`/login?from=${encodeURIComponent(getReturnUrl())}`);
      }
    } catch (err) {
      console.error("Failed to send interest:", err);
      setInterestSent(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-[#F5E6EC] hover:border-[#DB1866]/40 transition-all duration-300 hover:-translate-y-1 group flex flex-col">
      
      {/* ── Photo Container ── */}
      <div 
        onClick={handleViewProfile}
        className="relative h-52 sm:h-56 w-full bg-gradient-to-br from-[#FFF5F8] to-[#F0F3FF] overflow-hidden cursor-pointer"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/hero.webp";
            }}
            className={`w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ${
              photoPrivacy === "request" ? "filter blur-md scale-105" : ""
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-indigo-50 text-[#2A3773]/30">
            <span className="text-3xl font-sans font-bold">{name.charAt(0)}</span>
          </div>
        )}

        {/* Top Badges Bar */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            {isVerified && (
              <span className="bg-white/95 backdrop-blur-md text-[#1B2559] border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verified</span>
              </span>
            )}
            <span className="bg-[#DB1866] backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 fill-white" />
              <span>{displayScore}% Match</span>
            </span>
          </div>

          {/* Heart / Shortlist button */}
          <button
            onClick={toggleShortlist}
            disabled={loading}
            className={`p-2 rounded-full shadow-md backdrop-blur-md transition-all ${
              shortlisted
                ? "bg-[#DB1866] text-white scale-105"
                : "bg-white/90 text-gray-400 hover:text-[#DB1866] hover:bg-white hover:scale-105"
            }`}
            title={shortlisted ? "Remove from Shortlist" : "Save to Shortlist"}
            aria-label="Save profile"
          >
            <Heart className={`w-3.5 h-3.5 ${shortlisted ? "fill-white text-white" : ""}`} />
          </button>
        </div>

                {photoPrivacy === "request" && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-3 z-10 pointer-events-none">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-1 shadow-sm">
              <LockIcon className="w-4 h-4 text-pink-300" />
            </div>
            <span className="text-[11px] font-bold text-white drop-shadow-xs">Photo Protected</span>
            <span className="text-[9px] text-pink-100">Tap to request view</span>
          </div>
        )}

        {/* Bottom Cinematic Gradient & Lineage Badge */}
        <div className="absolute inset-x-0 bottom-0 pt-8 pb-2 px-3 bg-gradient-to-t from-[#1B2559]/95 via-[#1B2559]/45 to-transparent pointer-events-none flex items-end justify-between text-white">
          <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1 drop-shadow-xs truncate max-w-[65%]">
            <Crown className="w-3 h-3 fill-amber-300 text-amber-300 shrink-0" /> 
            <span className="truncate">{community}</span>
          </span>
          <span className="text-[10px] text-pink-200 font-semibold drop-shadow-xs shrink-0">
            {devak && devak !== "Not specified" ? devak.split(" ")[0] : "Verified Clan"}
          </span>
        </div>
      </div>

      {/* ── Details Section ── */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          
          {/* Name */}
          <h3 
            onClick={handleViewProfile}
            className="text-[15px] font-sans font-bold text-[#1B2559] group-hover:text-[#DB1866] transition-colors truncate mb-1.5 cursor-pointer"
          >
            {name}
          </h3>

          {/* Quick Stats Pills */}
          <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
            <span className="bg-[#FFF1F5] text-[#DB1866] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#FADADF]">
              {age} Yrs
            </span>
            <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
              {height}
            </span>
            <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-md truncate max-w-[100px]">
              {city}
            </span>
            {distanceKm !== undefined && (
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                <MapPin className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                <span>{distanceKm <= 5 ? "In Your City" : `${distanceKm} km away`}</span>
              </span>
            )}
          </div>

          {/* Education & Profession Rows */}
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center gap-1.5 text-gray-800 font-medium">
              <Briefcase className="w-3 h-3 text-[#DB1866] shrink-0" />
              <span className="truncate">{profession}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <GraduationCap className="w-3 h-3 text-gray-400 shrink-0" />
              <span className="truncate">{education}</span>
            </div>
          </div>

        </div>

        {/* ── Action Buttons Bar ── */}
        <div className="flex items-center gap-2 pt-1">
          <Link
            href={`/profile/${id}`}
            onClick={handleViewProfile}
            className="flex-1 text-center py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#DB1866] to-[#B81456] hover:from-[#B81456] hover:to-[#9E1048] shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>View Biodata</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          {/* Quick Connect / Send Interest Button */}
          <button
            onClick={handleQuickInterest}
            disabled={interestSent}
            className={`p-2 rounded-xl transition-all border shrink-0 ${
              interestSent
                ? "bg-emerald-50 text-emerald-600 border-emerald-200 cursor-default"
                : "bg-[#FFF1F5] text-[#DB1866] hover:bg-[#DB1866] hover:text-white border-[#FADADF]"
            }`}
            title={interestSent ? "Interest Sent!" : "Express Interest"}
            aria-label="Send interest"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
