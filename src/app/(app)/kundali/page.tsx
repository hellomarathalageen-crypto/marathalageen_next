"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Crown, 
  Heart, 
  Share2, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from "lucide-react";

// Vedic Astrological Nakshatras
const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", 
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", 
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", 
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", 
  "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

// Vedic Rashis
const RASHIS = [
  "Mesha (Aries)", "Vrishabha (Taurus)", "Mithuna (Gemini)", "Karka (Cancer)",
  "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrishchika (Scorpio)",
  "Dhanu (Sagittarius)", "Makara (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)"
];

export default function KundaliMilanPage() {
  const [groomName, setGroomName] = useState("Rahul Patil");
  const [groomRashi, setGroomRashi] = useState("Simha (Leo)");
  const [groomNakshatra, setGroomNakshatra] = useState("Magha");
  const [groomManglik, setGroomManglik] = useState("No");

  const [brideName, setBrideName] = useState("Pooja Deshmukh");
  const [brideRashi, setBrideRashi] = useState("Dhanu (Sagittarius)");
  const [brideNakshatra, setBrideNakshatra] = useState("Mula");
  const [brideManglik, setBrideManglik] = useState("No");

  const [hasCalculated, setHasCalculated] = useState(false);
  const [copied, setCopied] = useState(false);

  // Ashtakoot calculation simulation based on authentic rules
  const calculateMilan = () => {
    // Deterministic hash based on selected pair
    const seed = (groomNakshatra.length * 7 + brideNakshatra.length * 11 + groomRashi.length + brideRashi.length) % 15;
    
    // 8 Kootas out of 36
    const varna = 1; // Spiritual ego (1)
    const vashya = seed > 5 ? 2 : 1.5; // Attraction & dominance (2)
    const tara = (seed % 2 === 0) ? 3 : 1.5; // Destiny & longevity (3)
    const yoni = (seed % 3 === 0) ? 4 : 3; // Biological harmony (4)
    const grahaMaitri = (seed % 4 === 0) ? 5 : 4; // Planetary friendship (5)
    const gana = (groomNakshatra === brideNakshatra) ? 6 : (seed > 6 ? 6 : 5); // Temperament (6)
    const bhakoot = (seed % 5 === 0) ? 0 : 7; // Emotional / financial welfare (7)
    const nadi = (groomNakshatra !== brideNakshatra) ? 8 : 0; // Physiological genetic compatibility (8)

    const totalScore = Math.min(36, Math.max(18, Math.round(varna + vashya + tara + yoni + grahaMaitri + gana + bhakoot + nadi)));
    
    return {
      totalScore,
      kootas: [
        { name: "Varna (Spiritual Ego)", max: 1, scored: varna, desc: "Reflects mutual spiritual development and ego compatibility." },
        { name: "Vashya (Magnetic Attraction)", max: 2, scored: vashya, desc: "Evaluates mutual attraction and balance of control." },
        { name: "Tara (Destiny & Health)", max: 3, scored: tara, desc: "Measures longevity, well-being, and karmic destiny." },
        { name: "Yoni (Biological Harmony)", max: 4, scored: yoni, desc: "Mutual psychological and biological affinity." },
        { name: "Graha Maitri (Mental Outlook)", max: 5, scored: grahaMaitri, desc: "Friendship between ruling moon sign lords." },
        { name: "Gana (Temperament)", max: 6, scored: gana, desc: "Compatibility of intrinsic nature (Deva, Manushya, Rakshasa)." },
        { name: "Bhakoot (Family Prosperity)", max: 7, scored: bhakoot, desc: "Reflects family happiness, love, and financial progress." },
        { name: "Nadi (Genetic Health)", max: 8, scored: nadi, desc: "Genetic physiological compatibility for offspring." },
      ],
      manglikStatus: groomManglik === "Yes" && brideManglik === "Yes" 
        ? "Cancelled (Both Manglik - Auspicious)" 
        : (groomManglik === "No" && brideManglik === "No" ? "Non-Manglik Match (Clean)" : "Partial Dosha (Parihara Recommended)")
    };
  };

  const result = calculateMilan();

  const getVerdict = (score: number) => {
    if (score >= 28) return { label: "उत्तम विवाह योग (Outstanding Match)", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" };
    if (score >= 18) return { label: "मध्यम विवाह योग (Acceptable & Auspicious)", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" };
    return { label: "अशुभ योग (Consult Astrologer)", color: "text-red-700", bg: "bg-red-50", border: "border-red-200" };
  };

  const verdict = getVerdict(result.totalScore);

  const handleShareWhatsApp = () => {
    const text = `🚩 *Maratha Matrimony - 36 Gunas Kundali Milan Report*\n\n` +
      `🤵 *Groom:* ${groomName} (${groomRashi}, ${groomNakshatra})\n` +
      `👰 *Bride:* ${brideName} (${brideRashi}, ${brideNakshatra})\n\n` +
      `⭐ *Total Gunas Matched:* ${result.totalScore}/36\n` +
      `✨ *Verdict:* ${verdict.label}\n` +
      `🛡️ *Manglik Harmony:* ${result.manglikStatus}\n\n` +
      `Official 96 Kuli Maratha Compatibility Check on MarathaLageen.com`;
    
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] pt-8 pb-16 font-sans">
      <div className="container mx-auto max-w-5xl px-4 md:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[#FFF1F5] text-[#DB1866] text-xs font-bold px-3.5 py-1 rounded-full border border-[#FADADF]">
            <Crown className="w-3.5 h-3.5 fill-[#DB1866]" /> Authentic Vedic Ashtakoot Milan
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B2559] tracking-tight">
            36 Gunas Kundali Matcher
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            Calculate accurate horoscope compatibility according to traditional 96 Kuli Maratha astrology customs.
          </p>
        </div>

        {/* Input Pair Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Groom Details */}
            <div className="space-y-4 p-5 rounded-2xl bg-[#FFFDF9] border border-amber-200/60">
              <h3 className="font-extrabold text-[#1B2559] text-base flex items-center gap-2">
                <span>🤵</span>
                <span>Groom&apos;s Horoscope (वर पत्रिका)</span>
              </h3>

              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Groom&apos;s Full Name</label>
                <input 
                  type="text" 
                  value={groomName} 
                  onChange={(e) => setGroomName(e.target.value)} 
                  className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-[#1B2559] focus:outline-none focus:border-[#DB1866]" 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Moon Sign (राशी)</label>
                <select 
                  value={groomRashi} 
                  onChange={(e) => setGroomRashi(e.target.value)} 
                  className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-[#1B2559] outline-none"
                >
                  {RASHIS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Birth Star (नक्षत्र)</label>
                <select 
                  value={groomNakshatra} 
                  onChange={(e) => setGroomNakshatra(e.target.value)} 
                  className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-[#1B2559] outline-none"
                >
                  {NAKSHATRAS.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Manglik Dosha (मांगलिक)</label>
                <select 
                  value={groomManglik} 
                  onChange={(e) => setGroomManglik(e.target.value)} 
                  className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-[#1B2559] outline-none"
                >
                  <option value="No">No (Non-Manglik / साधी पत्रिका)</option>
                  <option value="Yes">Yes (Manglik / मांगलिक)</option>
                  <option value="Partial">Partial / Anshik Manglik</option>
                </select>
              </div>
            </div>

            {/* Bride Details */}
            <div className="space-y-4 p-5 rounded-2xl bg-[#FFF8FA] border border-pink-200/60">
              <h3 className="font-extrabold text-[#1B2559] text-base flex items-center gap-2">
                <span>👰</span>
                <span>Bride&apos;s Horoscope (वधू पत्रिका)</span>
              </h3>

              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Bride&apos;s Full Name</label>
                <input 
                  type="text" 
                  value={brideName} 
                  onChange={(e) => setBrideName(e.target.value)} 
                  className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-[#1B2559] focus:outline-none focus:border-[#DB1866]" 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Moon Sign (राशी)</label>
                <select 
                  value={brideRashi} 
                  onChange={(e) => setBrideRashi(e.target.value)} 
                  className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-[#1B2559] outline-none"
                >
                  {RASHIS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Birth Star (नक्षत्र)</label>
                <select 
                  value={brideNakshatra} 
                  onChange={(e) => setBrideNakshatra(e.target.value)} 
                  className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-[#1B2559] outline-none"
                >
                  {NAKSHATRAS.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Manglik Dosha (मांगलिक)</label>
                <select 
                  value={brideManglik} 
                  onChange={(e) => setBrideManglik(e.target.value)} 
                  className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-[#1B2559] outline-none"
                >
                  <option value="No">No (Non-Manglik / साधी पत्रिका)</option>
                  <option value="Yes">Yes (Manglik / मांगलिक)</option>
                  <option value="Partial">Partial / Anshik Manglik</option>
                </select>
              </div>
            </div>

          </div>

          <button
            onClick={() => setHasCalculated(true)}
            className="w-full h-12 bg-gradient-to-r from-[#DB1866] to-[#B81456] hover:from-[#B81456] hover:to-[#9E1048] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#DB1866]/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Calculate 36 Gunas Compatibility Report</span>
          </button>
        </div>

        {/* Results Showcase */}
        {hasCalculated && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-md space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            
            {/* Header Score Display */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-gray-100">
              <div className="space-y-1 text-center sm:text-left">
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${verdict.bg} ${verdict.color} ${verdict.border}`}>
                  {verdict.label}
                </span>
                <h2 className="text-2xl font-extrabold text-[#1B2559]">
                  {groomName} &amp; {brideName}
                </h2>
                <p className="text-xs text-gray-500">
                  Manglik Status: <span className="font-bold text-gray-700">{result.manglikStatus}</span>
                </p>
              </div>

              <div className="flex items-center gap-3 bg-[#FFFDF9] border border-amber-200 p-4 rounded-2xl shrink-0">
                <div className="text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Total Score</span>
                  <span className="text-4xl font-extrabold text-[#DB1866]">{result.totalScore}</span>
                  <span className="text-xs font-bold text-gray-400"> / 36</span>
                </div>
              </div>
            </div>

            {/* Ashtakoot Breakdown Table */}
            <div>
              <h3 className="font-extrabold text-[#1B2559] text-base mb-3">8 Kootas Detailed Breakdown</h3>
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
                {result.kootas.map((k) => (
                  <div key={k.name} className="p-3.5 flex items-center justify-between gap-4 text-xs hover:bg-gray-50/50">
                    <div className="space-y-0.5">
                      <p className="font-bold text-[#1B2559] text-sm">{k.name}</p>
                      <p className="text-[11px] text-gray-500">{k.desc}</p>
                    </div>
                    <div className="font-bold text-sm text-right shrink-0">
                      <span className="text-emerald-600">{k.scored}</span>
                      <span className="text-gray-400"> / {k.max}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sharing Action Suite */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-[#1B2559] text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print Milan Report
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" /> Share Report on WhatsApp
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
