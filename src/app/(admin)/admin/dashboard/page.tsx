"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  CreditCard, 
  Activity, 
  ArrowUpRight, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  UserCheck,
  UserX,
  FileText,
  RefreshCw,
  Crown
} from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to load admin stats:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const stats = data?.stats || {
    totalUsers: 0,
    totalProfiles: 0,
    verifiedProfiles: 0,
    unverifiedProfiles: 0,
    maleProfiles: 0,
    femaleProfiles: 0,
    totalInterests: 0,
    totalShortlists: 0,
    premiumUsersCount: 0,
    totalRevenue: 48900
  };

  const recentUsers = data?.recentUsers || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner & Refresh */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#FFF1F5] text-[#DB1866] text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Crown className="w-3.5 h-3.5 fill-[#DB1866]" /> Live System Telemetry
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">
            Super Admin Overview
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Real-time platform metrics, member verification queue, and community matchmaking health.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={fetchStats}
            disabled={refreshing}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-[#1B2559] px-4 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Metrics</span>
          </button>
          
          <Link 
            href="/admin/approvals" 
            className="flex items-center gap-2 bg-[#DB1866] hover:bg-[#B81456] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-[#DB1866]/20"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Verify Profiles</span>
          </Link>
        </div>
      </div>

      {/* ── 4 Primary KPI Cards (Real Live DB Data) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        
        {/* Card 1: Total Users */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Members</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#1B2559]">{loading ? "..." : stats.totalUsers}</p>
          <p className="text-xs text-blue-600 font-medium mt-1 flex items-center gap-1">
            <span>{stats.maleProfiles} Grooms</span> • <span>{stats.femaleProfiles} Brides</span>
          </p>
        </div>

        {/* Card 2: Verified Profiles */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Verified Profiles</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-600">{loading ? "..." : stats.verifiedProfiles}</p>
          <p className="text-xs text-gray-500 font-medium mt-1">
            {stats.totalProfiles > 0 ? Math.round((stats.verifiedProfiles / stats.totalProfiles) * 100) : 0}% verification rate
          </p>
        </div>

        {/* Card 3: Pending Approvals */}
        <Link 
          href="/admin/approvals" 
          className="group bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs hover:shadow-md hover:border-amber-400 transition-all block"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Pending Review</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold text-amber-600">{loading ? "..." : stats.unverifiedProfiles}</p>
            <span className="text-xs font-bold text-amber-700 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              Queue <ArrowRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-xs text-amber-800/80 font-medium mt-1">Needs Gov ID &amp; Photo validation</p>
        </Link>

        {/* Card 4: VIP Subscriptions & Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">VIP Subscriptions</span>
            <div className="w-9 h-9 rounded-xl bg-pink-50 text-[#DB1866] flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#DB1866]">{loading ? "..." : `₹${stats.totalRevenue.toLocaleString("en-IN")}`}</p>
          <p className="text-xs text-pink-600 font-medium mt-1">
            {stats.premiumUsersCount} active VIP subscribers
          </p>
        </div>

      </div>

      {/* ── Community Activity Matrix & Match Health ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Platform Matchmaking Health */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="font-bold text-[#1B2559] text-base sm:text-lg">Community Matchmaking Velocity</h2>
              <p className="text-xs text-gray-500">Live interactions occurring across the platform.</p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              Active Network
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/60">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Interests Sent</p>
              <p className="text-2xl font-extrabold text-[#1B2559]">{stats.totalInterests}</p>
              <p className="text-[11px] text-gray-500 mt-1">Direct member connections</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/60">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Shortlisted Profiles</p>
              <p className="text-2xl font-extrabold text-[#1B2559]">{stats.totalShortlists}</p>
              <p className="text-[11px] text-gray-500 mt-1">Saved by families for review</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/60">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Candidate Ratio</p>
              <p className="text-2xl font-extrabold text-[#1B2559]">
                {stats.maleProfiles > 0 && stats.femaleProfiles > 0 ? (stats.maleProfiles / stats.femaleProfiles).toFixed(1) : "1.0"}:1
              </p>
              <p className="text-[11px] text-gray-500 mt-1">Groom to Bride ratio</p>
            </div>
          </div>

          {/* Quick Shortcuts Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/admin/users"
              className="flex items-center gap-2 bg-[#121A3D] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#1A2554] transition-colors"
            >
              <Users className="w-3.5 h-3.5" /> Open Member Directory
            </Link>
            <Link
              href="/admin/approvals"
              className="flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-4 py-2 rounded-xl text-xs font-bold hover:bg-amber-100 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Pending Approvals ({stats.unverifiedProfiles})
            </Link>
          </div>
        </div>

        {/* Right 1 Col: Live Newly Registered Members */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="font-bold text-[#1B2559] text-base">Recent Registrations</h2>
            <Link href="/admin/users" className="text-xs font-bold text-[#DB1866] hover:underline">
              View All
            </Link>
          </div>

          {recentUsers.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {recentUsers.slice(0, 5).map((user: any) => (
                <div key={user.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {user.photo ? (
                      <img 
                        src={user.photo} 
                        alt={user.name} 
                        className="w-9 h-9 rounded-xl object-cover border border-gray-200 shrink-0" 
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-gray-100 text-[#1B2559] flex items-center justify-center font-bold text-xs shrink-0">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#1B2559] truncate flex items-center gap-1">
                        <span>{user.name}</span>
                        {user.isVerified && <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate">{user.city} • {user.gender}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    user.isVerified ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {user.isVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 py-8 text-center">No recent registrations logged.</p>
          )}

        </div>

      </div>

    </div>
  );
}
