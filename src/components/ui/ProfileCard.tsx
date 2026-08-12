import Link from "next/link";
import { CheckCircle2, MessageCircle, Heart, Send, Bookmark } from "lucide-react";

interface ProfileCardProps {
  id: string | number;
  name: string;
  age: number;
  height: string;
  city: string;
  education: string;
  profession: string;
  photo?: string;
  matchPercent?: number;
  isVerified?: boolean;
  community?: string;
  maritalStatus?: string;
  variant?: "grid" | "list";
}

export default function ProfileCard({
  id,
  name,
  age,
  height,
  city,
  education,
  profession,
  photo,
  matchPercent,
  isVerified = false,
  community,
  maritalStatus,
  variant = "grid",
}: ProfileCardProps) {
  const avatarSrc = photo || `https://i.pravatar.cc/300?img=${typeof id === "number" ? id : 10}`;

  if (variant === "list") {
    return (
      <div className="bg-white rounded-2xl border border-[#FADADF] overflow-hidden flex gap-0 hover:shadow-md transition-shadow">
        {/* Photo */}
        <Link href={`/profile/${id}`} className="relative w-36 h-40 shrink-0">
          <img src={avatarSrc} alt={name} className="w-full h-full object-cover" />
          {isVerified && (
            <span className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-green-600 flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-green-200">
              <CheckCircle2 className="w-3 h-3" /> 100% Verified
            </span>
          )}
        </Link>
        {/* Info */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <Link href={`/profile/${id}`} className="font-bold text-[#173F73] text-base hover:text-[#F34883] transition-colors flex items-center gap-1.5">
                {name}
                {isVerified && <CheckCircle2 className="w-4 h-4 text-[#F34883] shrink-0" />}
              </Link>
              {matchPercent && (
                <div className="text-center shrink-0">
                  <p className="text-lg font-black text-[#F34883] leading-none">{matchPercent}%</p>
                  <p className="text-[10px] text-gray-500 leading-none">Match</p>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {age} Yrs · {height} · {city}
            </p>
            <p className="text-sm text-gray-600">{education} · {profession}</p>
            {community && (
              <p className="text-xs text-gray-500 mt-1">{community}{maritalStatus ? ` · ${maritalStatus}` : ""}</p>
            )}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Link
              href={`/profile/${id}`}
              className="text-xs font-bold text-white bg-[#F34883] hover:bg-[#d93870] px-3 py-1.5 rounded-lg transition-colors"
            >
              View Profile
            </Link>
            <button className="flex items-center gap-1 text-xs font-semibold text-[#173F73] border border-[#FADADF] hover:border-[#F34883] hover:text-[#F34883] px-3 py-1.5 rounded-lg transition-colors">
              <Send className="w-3 h-3" /> Interest
            </button>
            <button className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-[#F34883] border border-[#FADADF] px-3 py-1.5 rounded-lg transition-colors">
              <Bookmark className="w-3 h-3" /> Shortlist
            </button>
            <button className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-[#F34883] border border-[#FADADF] px-3 py-1.5 rounded-lg transition-colors">
              <MessageCircle className="w-3 h-3" /> Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid variant
  return (
    <div className="bg-white rounded-2xl border border-[#FADADF] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group">
      {/* Photo */}
      <Link href={`/profile/${id}`} className="relative block aspect-[4/5] overflow-hidden">
        <img
          src={avatarSrc}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Match badge */}
        {matchPercent && (
          <div className="absolute top-2.5 left-2.5 bg-[#F34883] text-white text-[11px] font-bold px-2 py-1 rounded-full shadow-sm">
            {matchPercent}% Match
          </div>
        )}
        {/* Verified badge */}
        {isVerified && (
          <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm rounded-full p-1">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </div>
        )}
        {/* Shortlist heart */}
        <button className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-[#F34883] group/heart transition-colors">
          <Heart className="w-4 h-4 text-gray-400 group-hover/heart:text-white transition-colors" />
        </button>
        {/* Name overlay */}
        <div className="absolute bottom-3 left-3 right-10">
          <p className="text-white font-bold text-sm leading-tight">{name}</p>
          <p className="text-white/80 text-xs">{age} Yrs · {city}</p>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs text-gray-500 mb-3 line-clamp-1">{education} · {profession}</p>
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1 text-xs font-bold text-white bg-[#F34883] hover:bg-[#d93870] py-2 rounded-lg transition-colors">
            <Send className="w-3 h-3" /> Interest
          </button>
          <button className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold text-[#173F73] border border-[#FADADF] hover:border-[#F34883] hover:text-[#F34883] py-2 rounded-lg transition-colors">
            <MessageCircle className="w-3 h-3" /> Chat
          </button>
        </div>
      </div>
    </div>
  );
}
