"use client";

import { useState, useEffect } from "react";
import { 
  Check, 
  X, 
  AlertCircle, 
  FileText, 
  RefreshCw, 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Crown,
  ExternalLink,
  CheckCircle2
} from "lucide-react";

export default function AdminApprovalsPage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchApprovals = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/approvals");
      if (res.ok) {
        const data = await res.json();
        setProfiles(data.profiles || []);
      }
    } catch (err) {
      console.error("Failed to load approvals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  const handleAction = async (profileId: string, action: "approve" | "reject", name: string) => {
    try {
      setActionLoading(profileId);
      const res = await fetch("/api/admin/approvals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId, action })
      });

      if (res.ok) {
        setProfiles(prev => prev.filter(p => p.id !== profileId));
        setToastMessage(action === "approve" ? `✅ ${name}'s profile verified successfully!` : `❌ ${name}'s profile rejected.`);
        setTimeout(() => setToastMessage(null), 4000);
      }
    } catch (err) {
      console.error("Failed to process approval:", err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#121A3D] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Verification Queue
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">
            Candidate ID Approvals
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Review unverified member submissions, lineage credentials, and photos before issuing the verified badge.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={fetchApprovals} 
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-[#1B2559] px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Queue</span>
          </button>
          
          <div className="bg-amber-100 text-amber-900 px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 border border-amber-300">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>{profiles.length} Pending Profiles</span>
          </div>
        </div>
      </div>

      {/* Approvals Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-400 font-medium bg-white rounded-3xl border border-gray-100 shadow-xs">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-[#DB1866]" />
          <span>Fetching live verification queue from database...</span>
        </div>
      ) : profiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <div 
              key={profile.id} 
              className="bg-white rounded-3xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Photo Header with Badge */}
                <div className="relative h-48 bg-gray-100 overflow-hidden group">
                  <img 
                    src={profile.photo} 
                    alt={profile.name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold text-[#1B2559] shadow-sm">
                    {profile.gender} • {profile.age} Yrs
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg font-extrabold leading-tight">{profile.name}</h3>
                    <p className="text-xs text-white/80 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-pink-400" /> {profile.city}, {profile.state}
                    </p>
                  </div>
                </div>

                {/* Candidate Lineage & Background Details */}
                <div className="p-4 space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#FFFDF9] border border-amber-200/60 p-2 rounded-xl">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Devak</span>
                      <span className="font-bold text-[#1B2559] truncate block">{profile.devak}</span>
                    </div>
                    <div className="bg-[#FFFDF9] border border-amber-200/60 p-2 rounded-xl">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Gotra</span>
                      <span className="font-bold text-[#1B2559] truncate block">{profile.gotra}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1 text-gray-600">
                    <p className="flex items-center gap-1.5 truncate">
                      <GraduationCap className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{profile.education}</span>
                    </p>
                    <p className="flex items-center gap-1.5 truncate">
                      <Briefcase className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{profile.profession} ({profile.income})</span>
                    </p>
                  </div>

                  <a
                    href={`/profile/${profile.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DB1866] hover:underline pt-1"
                  >
                    <span>Inspect Full Biodata PDF</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2.5">
                <button
                  onClick={() => handleAction(profile.id, "reject", profile.name)}
                  disabled={actionLoading === profile.id}
                  className="flex-1 py-2.5 rounded-xl border border-red-200 bg-white hover:bg-red-50 text-red-600 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <X className="w-3.5 h-3.5" /> Reject
                </button>

                <button
                  onClick={() => handleAction(profile.id, "approve", profile.name)}
                  disabled={actionLoading === profile.id}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-emerald-600/20 disabled:opacity-50"
                >
                  <Check className="w-3.5 h-3.5" /> Approve &amp; Verify
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-xs max-w-lg mx-auto">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
            <Check className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h3 className="text-lg font-extrabold text-[#1B2559] mb-1">Queue is Clear!</h3>
          <p className="text-gray-500 text-xs leading-relaxed">
            All registered candidates currently have verified status or there are no unverified submissions awaiting review.
          </p>
        </div>
      )}

    </div>
  );
}
