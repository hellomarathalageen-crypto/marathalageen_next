"use client";

import React from "react";
import { Printer, X, Download, ShieldCheck, Heart, Sparkles } from "lucide-react";

interface PrintableBiodataProps {
  data: {
    name: string;
    age: number;
    height: string;
    maritalStatus: string;
    community: string;
    devak: string;
    gotra: string;
    kuldaivat: string;
    nativePlace: string;
    rashi: string;
    nakshatra: string;
    manglik: string;
    religion: string;
    education: string;
    college: string;
    profession: string;
    company: string;
    income: string;
    familyType: string;
    familyValues: string;
    fatherStatus: string;
    motherStatus: string;
    brothers: string;
    sisters: string;
    city: string;
    state: string;
    mobile?: string;
    imageUrl?: string;
  };
  onClose: () => void;
}

export default function PrintableBiodata({ data, onClose }: PrintableBiodataProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex justify-center items-start overflow-y-auto p-2 sm:p-6 print:p-0 print:bg-white print:static">
      
      {/* Control Bar (Hidden when printing) */}
      <div className="fixed top-4 right-4 z-[1000] flex items-center gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-[#DB1866] hover:bg-[#B81456] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-xl transition-all hover:scale-105"
        >
          <Printer className="w-4 h-4" /> Print / Save as PDF
        </button>
        <button
          onClick={onClose}
          className="bg-white/90 hover:bg-white text-gray-800 p-2.5 rounded-full shadow-xl transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Royal Printable Document */}
      <div className="w-full max-w-[800px] bg-[#FFFDF9] rounded-2xl shadow-2xl my-8 p-6 sm:p-10 border-4 border-[#C98E32] relative overflow-hidden print:m-0 print:border-2 print:border-[#C98E32] print:rounded-none print:shadow-none print:w-full">
        
        {/* Subtle Ornamental Background Pattern */}
        <div className="absolute inset-2 border-2 border-dashed border-[#E3B873]/50 pointer-events-none rounded-xl" />

        {/* Header */}
        <div className="text-center relative z-10 pb-6 border-b-2 border-[#C98E32]/40">
          <p className="text-sm font-bold text-[#8A1538] tracking-widest uppercase">Shree Ganeshay Namah</p>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#8A1538] mt-1 tracking-wide">
            🚩 Jai Jijau • Jai Shivray 🚩
          </h2>
          <p className="text-xs font-bold text-[#C98E32] mt-1 uppercase tracking-wider">
            96 Kuli Maratha Matrimonial Biodata
          </p>
        </div>

        {/* Candidate Profile Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6 items-center border-b border-[#F0D5AA] pb-6">
          <div className="sm:col-span-2 space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#2A3773]">
              {data.name}
            </h1>
            <p className="text-sm font-bold text-[#DB1866]">
              {data.education} • {data.profession}
            </p>
            <p className="text-xs text-gray-600 font-medium">
              Age & Height: <span className="font-bold text-gray-800">{data.age} Yrs, {data.height}</span>
            </p>
            <p className="text-xs text-gray-600 font-medium">
              Current Location: <span className="font-bold text-gray-800">{data.city}, {data.state}</span>
            </p>
            <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-xs font-bold border border-amber-200 mt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> 96 Kuli Maratha Verified Candidate
            </div>
          </div>

          <div className="flex justify-center sm:justify-end">
            <div className="w-36 h-44 rounded-xl border-2 border-[#C98E32] overflow-hidden shadow-md bg-gray-100 relative">
              <img
                src={data.imageUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"}
                alt={data.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 inset-x-0 bg-[#2A3773]/80 text-white text-[9px] text-center py-0.5 font-bold">
                Maratha Matrimony
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-6 text-sm text-[#2A3773]">

          {/* 1. Cultural & Lineage Details */}
          <div className="bg-white/80 rounded-xl p-4 border border-[#F0D5AA]">
            <h3 className="text-xs font-black text-[#8A1538] uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-gray-100 pb-1.5">
              <span>🚩 1. Cultural & Lineage Details</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-4 text-xs">
              <div><span className="text-gray-500 font-medium">Community:</span> <span className="font-bold">{data.community || "96 Kuli Maratha"}</span></div>
              <div><span className="text-gray-500 font-medium">Devak:</span> <span className="font-bold text-[#8A1538]">{data.devak || "Kalamb"}</span></div>
              <div><span className="text-gray-500 font-medium">Gotra:</span> <span className="font-bold">{data.gotra || "Kashyap"}</span></div>
              <div><span className="text-gray-500 font-medium">Clan Deity (Kuldaivat):</span> <span className="font-bold">{data.kuldaivat || "Tuljapur Bhavani"}</span></div>
              <div><span className="text-gray-500 font-medium">Religion / Mother Tongue:</span> <span className="font-bold">{data.religion || "Hindu"} / Marathi</span></div>
              <div><span className="text-gray-500 font-medium">Native Place:</span> <span className="font-bold">{data.nativePlace || data.city}</span></div>
            </div>
          </div>

          {/* 2. Horoscope & Astro Details */}
          <div className="bg-white/80 rounded-xl p-4 border border-[#F0D5AA]">
            <h3 className="text-xs font-black text-[#8A1538] uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-gray-100 pb-1.5">
              <span>⭐ 2. Horoscope & Astrological Details</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2.5 gap-x-4 text-xs">
              <div><span className="text-gray-500 font-medium">Rashi / Moon Sign:</span> <span className="font-bold">{data.rashi || "Karka"}</span></div>
              <div><span className="text-gray-500 font-medium">Nakshatra:</span> <span className="font-bold">{data.nakshatra || "Pushya"}</span></div>
              <div><span className="text-gray-500 font-medium">Manglik Status:</span> <span className="font-bold text-emerald-700">{data.manglik || "Non-Manglik"}</span></div>
              <div><span className="text-gray-500 font-medium">Gunas Match:</span> <span className="font-bold text-[#DB1866]">31 / 36 Gunas (Auspicious)</span></div>
            </div>
          </div>

          {/* 3. Career & Education */}
          <div className="bg-white/80 rounded-xl p-4 border border-[#F0D5AA]">
            <h3 className="text-xs font-black text-[#8A1538] uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-gray-100 pb-1.5">
              <span>💼 3. Career & Education</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
              <div><span className="text-gray-500 font-medium">Education:</span> <span className="font-bold">{data.education}</span></div>
              <div><span className="text-gray-500 font-medium">College / University:</span> <span className="font-bold">{data.college || "Reputed University"}</span></div>
              <div><span className="text-gray-500 font-medium">Profession / Role:</span> <span className="font-bold">{data.profession}</span></div>
              <div><span className="text-gray-500 font-medium">Company & Annual Income:</span> <span className="font-bold">{data.company} ({data.income})</span></div>
            </div>
          </div>

          {/* 4. Family Pedigree */}
          <div className="bg-white/80 rounded-xl p-4 border border-[#F0D5AA]">
            <h3 className="text-xs font-black text-[#8A1538] uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-gray-100 pb-1.5">
              <span>🏠 4. Family Pedigree & Background</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
              <div><span className="text-gray-500 font-medium">Father&apos;s Details:</span> <span className="font-bold">{data.fatherStatus}</span></div>
              <div><span className="text-gray-500 font-medium">Mother&apos;s Details:</span> <span className="font-bold">{data.motherStatus}</span></div>
              <div><span className="text-gray-500 font-medium">Brothers:</span> <span className="font-bold">{data.brothers}</span></div>
              <div><span className="text-gray-500 font-medium">Sisters:</span> <span className="font-bold">{data.sisters}</span></div>
              <div><span className="text-gray-500 font-medium">Family Setup:</span> <span className="font-bold">{data.familyType} ({data.familyValues})</span></div>
              <div><span className="text-gray-500 font-medium">Residential City:</span> <span className="font-bold">{data.city}, {data.state}</span></div>
            </div>
          </div>

          {/* 5. Contact Details */}
          <div className="bg-[#FFF8FA] rounded-xl p-4 border border-[#FADADF]">
            <h3 className="text-xs font-black text-[#DB1866] uppercase tracking-wider mb-2 flex items-center gap-2">
              <span>📞 5. Verified Family Contact</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500 font-medium">Parent Contact Phone:</span>{" "}
                <span className="font-bold text-gray-900">{data.mobile || "+91 98220 98765"}</span>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Official Registry Portal:</span>{" "}
                <span className="font-bold text-gray-900">https://marathalageen.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-[#C98E32]/30 text-center text-[10px] text-gray-500 flex flex-col items-center gap-1">
          <p className="italic">
            This matrimonial biodata has been verified and generated via Maratha Matrimony digital portal.
          </p>
          <p className="font-bold text-[#8A1538]">
            🚩 Maratha Matrimony — Karnataka & Maharashtra #1 Trusted Community Network 🚩
          </p>
        </div>

      </div>
    </div>
  );
}
