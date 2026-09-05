"use client";

import { useState, useEffect } from "react";
import { 
  Sparkles, 
  Crown, 
  Heart, 
  Search, 
  Check, 
  ArrowRight, 
  RefreshCw, 
  UserCheck, 
  ExternalLink,
  ShieldCheck,
  Send,
  AlertCircle
} from "lucide-react";

export default function AssistedMatchmakerPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [targetCandidate, setTargetCandidate] = useState<any>(null);
  const [rankedMatches, setRankedMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load candidate list
  useEffect(() => {
    async function loadCandidates() {
      try {
        const res = await fetch("/api/admin/matchmaker");
        if (res.ok) {
          const data = await res.json();
          setCandidates(data.candidates || []);
          if (data.candidates?.length > 0) {
            setSelectedCandidateId(data.candidates[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to load candidates:", err);
      }
    }
    loadCandidates();
  }, []);

  // Run matchmaking when candidate changes
  useEffect(() => {
    if (!selectedCandidateId) return;

    async function runAlgorithm() {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/matchmaker?candidateId=${selectedCandidateId}`);
        if (res.ok) {
          const data = await res.json();
          setTargetCandidate(data.targetCandidate);
          setRankedMatches(data.rankedMatches || []);
        }
      } catch (err) {
        console.error("Failed to run matchmaking algorithm:", err);
      } finally {
        setLoading(false);
      }
    }
    runAlgorithm();
  }, [selectedCandidateId]);

  const handleRecommend = async (matchName: string) => {
    setToastMessage(`💌 Official VIP Matchmaker Recommendation sent to ${matchName}!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#121A3D] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-pink-50 text-[#DB1866] text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Crown className="w-3.5 h-3.5 fill-[#DB1866]" /> VIP Matchmaker Suite
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">
            Assisted Matchmaker Engine
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Select any registered bride or groom to run real-time 36 Gunas &amp; Devak lineage algorithms across the database.
          </p>
        </div>

        {/* Candidate Selector Dropdown */}
        <div className="w-full md:w-80">
          <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
            Select Member to Match:
          </label>
          <select
            value={selectedCandidateId}
            onChange={(e) => setSelectedCandidateId(e.target.value)}
            className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#1B2559] outline-none focus:border-[#DB1866] focus:bg-white transition-all shadow-xs"
          >
            {candidates.map((c) => (
              <option key={c.id} value={c.id}>
                {c.firstName} {c.lastName} ({c.gender}, {c.city || 'KA'})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Target Candidate Overview Bar */}
      {targetCandidate && (
        <div className="bg-gradient-to-r from-[#121A3D] to-[#2A3773] text-white p-5 rounded-3xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {targetCandidate.photo ? (
              <img 
                src={targetCandidate.photo} 
                alt={targetCandidate.name} 
                className="w-14 h-14 rounded-2xl object-cover border-2 border-white/30 shrink-0" 
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center font-bold text-lg shrink-0">
                {targetCandidate.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                  Target Candidate
                </span>
                <span className="text-xs text-pink-300 font-bold">{targetCandidate.gender} • {targetCandidate.age} Yrs</span>
              </div>
              <h2 className="text-xl font-extrabold text-white mt-0.5">{targetCandidate.name}</h2>
              <p className="text-xs text-blue-200">
                {targetCandidate.city} • Devak: {targetCandidate.devak || '96 Kuli'} • {targetCandidate.education}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs text-pink-300 font-bold block">Finding Best Matched</span>
            <span className="text-lg font-extrabold text-white">
              {targetCandidate.gender === "Male" ? "Maratha Brides" : "Maratha Grooms"}
            </span>
          </div>
        </div>
      )}

      {/* Ranked Matches Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-[#1B2559] text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
            <span>Ranked Compatible Candidates ({rankedMatches.length})</span>
          </h3>
          <span className="text-xs font-bold text-gray-500">Sorted by Astrological &amp; Lineage Score</span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-400 bg-white rounded-3xl border border-gray-100 shadow-xs">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-[#DB1866]" />
            <p className="text-xs font-bold">Computing 36 Gunas, Devak &amp; Age compatibility matrix...</p>
          </div>
        ) : rankedMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rankedMatches.map((match) => (
              <div 
                key={match.id}
                className="bg-white rounded-3xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Photo & Match Score */}
                  <div className="relative h-44 bg-gray-100 overflow-hidden">
                    <img 
                      src={match.photo} 
                      alt={match.name} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    {/* Compatibility Meter Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold text-[#DB1866] shadow-sm flex items-center gap-1 border border-pink-200">
                      <Heart className="w-3.5 h-3.5 fill-[#DB1866]" />
                      <span>{match.matchScore}% Match</span>
                    </div>

                    <div className="absolute bottom-3 left-3 text-white">
                      <h4 className="font-extrabold text-base">{match.name}</h4>
                      <p className="text-xs text-white/80">{match.age} Yrs • {match.city}</p>
                    </div>
                  </div>

                  {/* Compatibility Reasons */}
                  <div className="p-4 space-y-3">
                    <div className="space-y-1">
                      {match.reasons.slice(0, 3).map((reason: string, i: number) => (
                        <p key={i} className="text-[11px] font-medium text-gray-600 flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0 stroke-[2.5]" />
                          <span>{reason}</span>
                        </p>
                      ))}
                    </div>

                    <div className="bg-[#FFFDF9] p-2.5 rounded-xl border border-amber-200/60 text-xs">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Lineage / Devak</span>
                      <span className="font-bold text-[#1B2559] truncate block">{match.devak}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
                  <a
                    href={`/profile/${match.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 text-[#1B2559] font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" /> View Biodata
                  </a>
                  <button
                    onClick={() => handleRecommend(match.name)}
                    className="flex-1 py-2 rounded-xl bg-[#DB1866] hover:bg-[#B81456] text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors shadow-sm"
                  >
                    <Send className="w-3 h-3" /> Recommend
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-xs max-w-md mx-auto">
            <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-xs text-gray-500 font-medium">No candidate matches found.</p>
          </div>
        )}
      </div>

    </div>
  );
}
