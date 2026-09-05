"use client";

import { useState } from "react";
import { 
  Megaphone, 
  Send, 
  CheckCircle2, 
  Crown, 
  Bell, 
  Sparkles, 
  Eye, 
  Calendar,
  Layers
} from "lucide-react";

export default function AdminBroadcastPage() {
  const [title, setTitle] = useState("🚩 Jai Shivray! Special Melava Registration is Now Open in Belagavi");
  const [message, setMessage] = useState("We invite all 96 Kuli Maratha families to verify their candidates for the upcoming state-level Vadhu Var Melava. Free verified badges issued until Sunday!");
  const [type, setType] = useState<"festive" | "urgent" | "info">("festive");
  const [audience, setAudience] = useState("all");
  const [activeBanner, setActiveBanner] = useState<any>({
    title: "🚩 Jai Shivray! Special Melava Registration is Now Open in Belagavi",
    message: "We invite all 96 Kuli Maratha families to verify their candidates for the upcoming state-level Vadhu Var Melava.",
    type: "festive"
  });
  const [toast, setToast] = useState<string | null>(null);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveBanner({ title, message, type });
    setToast("📢 Site-wide Announcement broadcasted successfully to all online members!");
    setTimeout(() => setToast(null), 4000);
  };

  const handleDismiss = () => {
    setActiveBanner(null);
    setToast("Active broadcast banner dismissed.");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl">
      
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-[#121A3D] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full mb-2">
          <Megaphone className="w-3.5 h-3.5 text-amber-600" /> Broadcast Station
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">
          Platform Broadcasts &amp; Alerts
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
          Publish site-wide announcements, festival greetings, and Vadhu Var Melava notifications to all members.
        </p>
      </div>

      {/* ── Active Broadcast Preview ── */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <Eye className="w-4 h-4 text-pink-500" />
            <span>Live Member Banner Preview</span>
          </div>
          {activeBanner && (
            <button
              onClick={handleDismiss}
              className="text-xs font-bold text-red-600 hover:underline"
            >
              Take Down Live Banner
            </button>
          )}
        </div>

        {activeBanner ? (
          <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
            activeBanner.type === 'festive' ? 'bg-gradient-to-r from-[#DB1866] to-[#B81456] text-white border-pink-500 shadow-md' :
            activeBanner.type === 'urgent' ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white border-red-500 shadow-md' :
            'bg-gradient-to-r from-[#121A3D] to-[#2A3773] text-white border-blue-900 shadow-md'
          }`}>
            <div className="space-y-0.5 min-w-0">
              <p className="font-extrabold text-sm sm:text-base flex items-center gap-2 truncate">
                <span>{activeBanner.title}</span>
              </p>
              <p className="text-xs text-white/90 truncate">{activeBanner.message}</p>
            </div>
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold shrink-0 border border-white/30">
              Live Everywhere
            </span>
          </div>
        ) : (
          <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-gray-400 text-xs">
            No broadcast banner is currently active on the platform.
          </div>
        )}
      </div>

      {/* ── Create New Broadcast Form ── */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-5">
        <h2 className="font-extrabold text-[#1B2559] text-base border-b border-gray-100 pb-3 flex items-center gap-2">
          <Send className="w-4 h-4 text-[#DB1866]" />
          <span>Dispatch New Announcement</span>
        </h2>

        <form onSubmit={handleBroadcast} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#1B2559] block mb-1">
              Banner Headline:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 🚩 Happy Shiv Jayanti to all Maratha Families!"
              required
              className="w-full h-11 px-4 rounded-xl border border-gray-200 text-xs font-bold text-[#1B2559] focus:outline-none focus:border-[#DB1866] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#1B2559] block mb-1">
              Announcement Message Body:
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Enter full announcement details..."
              required
              className="w-full p-4 rounded-xl border border-gray-200 text-xs font-medium text-[#1B2559] focus:outline-none focus:border-[#DB1866] transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#1B2559] block mb-1">
                Visual Style:
              </label>
              <select
                value={type}
                onChange={(e: any) => setType(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs font-bold text-[#1B2559] bg-gray-50 outline-none"
              >
                <option value="festive">🚩 Royal Maratha Magenta (Festivals & Celebrations)</option>
                <option value="urgent">🚨 Red Alert (System &amp; Verification Deadlines)</option>
                <option value="info">ℹ️ Royal Navy (General Community Information)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#1B2559] block mb-1">
                Target Audience:
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs font-bold text-[#1B2559] bg-gray-50 outline-none"
              >
                <option value="all">Every Registered Member (Public + Logged In)</option>
                <option value="unverified">Unverified Profiles Only (Encourage Verification)</option>
                <option value="vip">VIP Members Only</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-[#DB1866] to-[#B81456] hover:from-[#B81456] hover:to-[#9E1048] text-white font-bold text-xs rounded-xl shadow-md shadow-[#DB1866]/30 flex items-center justify-center gap-2 transition-all"
          >
            <Send className="w-4 h-4" /> Publish Announcement Instantly
          </button>
        </form>
      </div>

    </div>
  );
}
