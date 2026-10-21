"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Download, 
  Search, 
  RefreshCw, 
  Filter, 
  Phone, 
  MessageCircle, 
  Mail, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Crown, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  User, 
  Briefcase, 
  GraduationCap, 
  Heart,
  ChevronDown,
  X,
  ExternalLink,
  Layers
} from "lucide-react";

export default function AdminPreRegistrationsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    total: 0,
    todayCount: 0,
    maleCount: 0,
    femaleCount: 0,
    topDistricts: []
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [districtFilter, setDistrictFilter] = useState("All");
  const [casteFilter, setCasteFilter] = useState("All");
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);

  const fetchRecords = async () => {
    try {
      setRefreshing(true);
      const params = new URLSearchParams();
      if (search) params.set("query", search);
      if (genderFilter !== "All") params.set("gender", genderFilter);
      if (districtFilter !== "All") params.set("district", districtFilter);
      if (casteFilter !== "All") params.set("caste", casteFilter);

      const res = await fetch('/api/admin/preregistrations?' + params.toString());
      if (res.ok) {
        const json = await res.json();
        setRecords(json.records || []);
        if (json.stats) setStats(json.stats);
      }
    } catch (err) {
      console.error("Failed to load pre-registrations:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [genderFilter, districtFilter, casteFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecords();
  };

  const handleExportCsv = () => {
    const params = new URLSearchParams();
    params.set("format", "csv");
    if (search) params.set("query", search);
    if (genderFilter !== "All") params.set("gender", genderFilter);
    if (districtFilter !== "All") params.set("district", districtFilter);
    if (casteFilter !== "All") params.set("caste", casteFilter);

    window.open('/api/admin/preregistrations?' + params.toString(), "_blank");
  };

  const getWhatsAppLink = (phone?: string, name?: string) => {
    if (!phone) return "#";
    const clean = phone.replace(/\D/g, "");
    const text = encodeURIComponent('Namaskara ' + (name || "") + ' ji, Greetings from Maratha Matrimony (Maratha Lageen). Regarding your pre-registration profile on our Karnataka platform, our relationship team is here to assist you.');
    return 'https://wa.me/91' + clean + '?text=' + text;
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      
      {/* ── 1. Compact Executive Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-5 py-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#2A3773] tracking-tight">
              Pre-Registration Leads
            </h1>
            <span className="bg-[#FFF1F5] text-[#DB1866] border border-[#FADADF] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Crown className="w-3 h-3 text-[#DB1866]" /> Launch Registry
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Verified Karnataka Maratha Samaj pre-registered families & biodatas.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={fetchRecords}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-2xs"
          >
            <RefreshCw className={"w-3.5 h-3.5 " + (refreshing ? "animate-spin text-[#DB1866]" : "")} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold shadow-sm shadow-emerald-600/25 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Excel</span>
          </button>
        </div>
      </div>

      {/* ── 2. Sleek Unified Executive KPI Strip ── */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 overflow-hidden">
        
        {/* KPI 1: Total Leads */}
        <div className="p-4 sm:p-5 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-pink-50 text-[#DB1866] flex items-center justify-center font-bold shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Leads</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-[#2A3773]">{stats.total}</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">100% Free VIP</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Today Count */}
        <div className="p-4 sm:p-5 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Registered Today</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-[#2A3773]">{stats.todayCount}</span>
              <span className="text-[10px] text-gray-500 font-medium">New in 24h</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Demographics */}
        <div className="p-4 sm:p-5 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Demographics</span>
            <div className="flex items-center gap-2 mt-1 text-xs font-bold">
              <span className="text-pink-600">{stats.femaleCount} Brides</span>
              <span className="text-gray-300">•</span>
              <span className="text-blue-600">{stats.maleCount} Grooms</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Top Districts */}
        <div className="p-4 sm:p-5 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Top Districts</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {stats.topDistricts?.length > 0 ? (
                stats.topDistricts.slice(0, 3).map((d: any) => (
                  <span key={d.name} className="bg-gray-100 text-[#2A3773] text-[10px] font-bold px-1.5 py-0.2 rounded truncate">
                    {d.name} ({d.count})
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400 font-medium truncate">Belagavi, Bengaluru</span>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* ── 3. Table Card with Integrated Toolbar ── */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
        
        {/* Integrated Filter Toolbar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search candidate, mobile, VIP pass..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 bg-white focus:border-[#DB1866] focus:ring-1 focus:ring-[#DB1866]/20 outline-none text-xs font-medium transition-all"
            />
          </form>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            <div className="relative inline-flex items-center">
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2 rounded-full border border-gray-200 bg-white text-xs font-semibold text-[#2A3773] outline-none hover:border-gray-300 focus:border-[#DB1866] focus:ring-1 focus:ring-[#DB1866]/20 cursor-pointer transition-all shadow-xs"
              >
                <option value="All">All Genders</option>
                <option value="Female">Brides</option>
                <option value="Male">Grooms</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="relative inline-flex items-center">
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2 rounded-full border border-gray-200 bg-white text-xs font-semibold text-[#2A3773] outline-none hover:border-gray-300 focus:border-[#DB1866] focus:ring-1 focus:ring-[#DB1866]/20 cursor-pointer max-w-[145px] truncate transition-all shadow-xs"
              >
                <option value="All">All Districts</option>
                <option value="Belagavi">Belagavi</option>
                <option value="Bengaluru Urban">Bengaluru</option>
                <option value="Dharwad">Dharwad</option>
                <option value="Hubballi">Hubballi</option>
                <option value="Uttara Kannada">Uttara Kannada</option>
                <option value="Vijayapura">Vijayapura</option>
                <option value="Bagalkote">Bagalkote</option>
                <option value="Kalaburagi">Kalaburagi</option>
                <option value="Ballari">Ballari</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="relative inline-flex items-center">
              <select
                value={casteFilter}
                onChange={(e) => setCasteFilter(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2 rounded-full border border-gray-200 bg-white text-xs font-semibold text-[#2A3773] outline-none hover:border-gray-300 focus:border-[#DB1866] focus:ring-1 focus:ring-[#DB1866]/20 cursor-pointer max-w-[155px] truncate transition-all shadow-xs"
              >
                <option value="All">All Sub-Castes</option>
                <option value="Shivaji">Shivaji</option>
                <option value="Bhavsar">Bhavsar</option>
                <option value="Pattegar">Pattegar</option>
                <option value="96 kuli">96 kuli</option>
                <option value="Kshatriya">Kshatriya</option>
                <option value="Maratha ( All / Others )">Maratha ( All / Others )</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="bg-[#FFF1F5] text-[#DB1866] border border-[#FADADF] text-xs font-bold px-3.5 py-2 rounded-full shrink-0 shadow-xs">
              {records.length} Profiles
            </div>
          </div>
        </div>

        {/* Data Table */}
        {loading ? (
          <div className="py-16 text-center text-gray-400">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#DB1866] mb-3" />
            <p className="text-xs font-bold text-gray-600">Loading verified candidate leads...</p>
          </div>
        ) : records.length === 0 ? (
          <div className="py-16 px-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-pink-50 text-[#DB1866] flex items-center justify-center mx-auto mb-3">
              <Users className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-[#2A3773]">No Candidate Leads Found</h4>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              {search || genderFilter !== "All" || districtFilter !== "All"
                ? "No candidates matched your filter criteria. Try resetting the filters."
                : "New pre-registration submissions will appear here live in real-time."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/90 text-gray-500 font-bold uppercase text-[10px] tracking-wider border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">VIP Pass ID</th>
                  <th className="py-3 px-4">Candidate & Family</th>
                  <th className="py-3 px-4">Gender / Age</th>
                  <th className="py-3 px-4">Sub-Caste & Kundali</th>
                  <th className="py-3 px-4">District</th>
                  <th className="py-3 px-4">Contact Channels</th>
                  <th className="py-3 px-4">Profession / Income</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {records.map((r) => {
                  const displayName = (r.fullName || "Candidate") + " " + (r.surname || "");
                  return (
                    <tr 
                      key={r.priorityPass || r.mobile} 
                      className="hover:bg-pink-50/20 transition-colors cursor-pointer group"
                      onClick={() => setSelectedCandidate(r)}
                    >
                      {/* Pass ID (Guaranteed single line, never wraps!) */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-mono font-bold text-xs bg-[#FFF1F5] border border-[#FADADF] text-[#DB1866] px-2.5 py-1 rounded-md inline-block">
                          {r.priorityPass || "ML-2026-VIP"}
                        </span>
                        <div className="text-[10px] text-gray-400 font-normal mt-0.5">
                          {r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-IN") : "Recent"}
                        </div>
                      </td>

                      {/* Name & Avatar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          {r.photoUrl ? (
                            <img src={r.photoUrl} alt={displayName} className="w-8 h-8 rounded-xl object-cover border border-gray-200 shrink-0" />
                          ) : (
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#DB1866] to-pink-400 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                              {displayName.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-bold text-[#2A3773] text-[13px] group-hover:text-[#DB1866] transition-colors truncate">
                              {displayName}
                            </p>
                            <p className="text-[10px] text-gray-500 font-medium truncate">
                              By {r.registeringFor || "Self"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Gender & Age */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={"inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold " + (
                          r.gender?.toLowerCase() === "female" ? "bg-pink-100 text-pink-700" : "bg-blue-100 text-blue-700"
                        )}>
                          {r.gender || "Candidate"}
                        </span>
                        <div className="text-gray-700 font-semibold text-xs mt-0.5">
                          {r.age ? r.age + " Yrs" : (r.dob || "N/A")}
                        </div>
                      </td>

                      {/* Sub-Caste & Kundali */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-gray-800 text-xs block">{r.caste || "Kshatriya Maratha"}</span>
                        {r.rashi && (
                          <div className="text-[10px] text-purple-700 font-medium truncate max-w-[160px] mt-0.5">
                            {r.rashi} {r.nakshatra ? "• " + r.nakshatra : ""}
                          </div>
                        )}
                      </td>

                      {/* District */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 font-bold text-[#2A3773] text-xs">
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          {r.district || "Karnataka"}
                        </span>
                      </td>

                      {/* Contact Channels */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                          <a
                            href={getWhatsAppLink(r.whatsapp || r.mobile, displayName)}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors inline-flex items-center gap-1 font-bold text-[11px]"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                            <span>{r.mobile}</span>
                          </a>
                          <a
                            href={"tel:+91" + r.mobile}
                            className="p-1.5 bg-gray-100 hover:bg-[#FFF1F5] hover:text-[#DB1866] rounded-lg text-gray-700 transition-colors"
                            title={"Call +91 " + r.mobile}
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        </div>
                        {r.email && (
                          <div className="text-[10px] text-gray-400 truncate max-w-[150px] mt-0.5">
                            {r.email}
                          </div>
                        )}
                      </td>

                      {/* Profession / Income */}
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-gray-800 truncate max-w-[180px]">
                          {r.profession || r.education || "N/A"}
                        </p>
                        <p className="text-[10px] text-emerald-700 font-bold mt-0.5">
                          {r.annualIncome || "Income Not Disclosed"}
                        </p>
                      </td>

                      {/* Action Button */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedCandidate(r)}
                          className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-[#DB1866] hover:text-white text-[#2A3773] text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
                        >
                          View Biodata
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Clean Table Bottom Bar */}
            <div className="px-5 py-3 bg-gray-50/80 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Showing <strong>{records.length}</strong> verified pre-registration leads • Live sync</span>
              </div>
              <button
                onClick={handleExportCsv}
                className="inline-flex items-center gap-1.5 text-[#DB1866] hover:text-[#B01351] font-bold cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export entire list to Excel</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Candidate Details Modal ── */}
      {selectedCandidate && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedCandidate(null)}
        >
          <div 
            className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-7 shadow-2xl relative my-8 animate-in zoom-in-95 duration-200 border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#DB1866] to-pink-500 text-white flex items-center justify-center font-bold text-xl shadow-md">
                  {(selectedCandidate.fullName || "C").charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2A3773]">
                    {selectedCandidate.fullName} {selectedCandidate.surname || ""}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-mono font-bold text-[#DB1866] bg-[#FFF1F5] px-2 py-0.5 rounded">
                      VIP PASS: {selectedCandidate.priorityPass || "ML-2026-VIP"}
                    </span>
                    <span className="text-xs text-gray-400">Registered by {selectedCandidate.registeringFor || "Self"}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCandidate(null)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Bar */}
            <div className="py-3 flex flex-wrap items-center gap-3 border-b border-gray-100">
              <a
                href={"tel:+91" + selectedCandidate.mobile}
                className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-[#DB1866] rounded-xl font-bold text-xs hover:bg-pink-100 transition-colors"
              >
                <Phone className="w-4 h-4" /> Call +91 {selectedCandidate.mobile}
              </a>

              <a
                href={getWhatsAppLink(selectedCandidate.whatsapp || selectedCandidate.mobile, selectedCandidate.fullName)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-xs hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>

              {selectedCandidate.email && (
                <a
                  href={"mailto:" + selectedCandidate.email}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold text-xs hover:bg-gray-200 transition-colors"
                >
                  <Mail className="w-4 h-4" /> Send Email
                </a>
              )}
            </div>

            {/* Detailed Grid */}
            <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
                <p className="font-bold text-[#2A3773] text-sm mb-2 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#DB1866]" /> Personal & Cultural
                </p>
                <p><span className="text-gray-500">Gender:</span> <strong>{selectedCandidate.gender}</strong></p>
                <p><span className="text-gray-500">Sub-Caste:</span> <strong>{selectedCandidate.caste}</strong></p>
                <p><span className="text-gray-500">Age / DOB:</span> <strong>{selectedCandidate.age ? selectedCandidate.age + " Yrs" : ""} ({selectedCandidate.dob || "N/A"})</strong></p>
                <p><span className="text-gray-500">Height:</span> <strong>{selectedCandidate.height || "N/A"}</strong></p>
                <p><span className="text-gray-500">Marital Status:</span> <strong>{selectedCandidate.maritalStatus || "Never Married"}</strong></p>
                <p><span className="text-gray-500">District:</span> <strong>{selectedCandidate.district}, Karnataka</strong></p>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
                <p className="font-bold text-[#2A3773] text-sm mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-[#DB1866]" /> Education & Career
                </p>
                <p><span className="text-gray-500">Education:</span> <strong>{selectedCandidate.education || "N/A"}</strong></p>
                <p><span className="text-gray-500">Profession:</span> <strong>{selectedCandidate.profession || "N/A"}</strong></p>
                <p><span className="text-gray-500">Annual Income:</span> <strong className="text-emerald-700">{selectedCandidate.annualIncome || "N/A"}</strong></p>
                <p><span className="text-gray-500">Registration Date:</span> <strong>{selectedCandidate.createdAt ? new Date(selectedCandidate.createdAt).toLocaleString("en-IN") : "Recent"}</strong></p>
              </div>

              <div className="bg-[#FFF8FA] p-4 rounded-2xl border border-pink-100 space-y-2">
                <p className="font-bold text-[#2A3773] text-sm mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#DB1866]" /> Kundali & Astrology
                </p>
                <p><span className="text-gray-500">Rashi (Zodiac):</span> <strong>{selectedCandidate.rashi || "N/A"}</strong></p>
                <p><span className="text-gray-500">Nakshatra:</span> <strong>{selectedCandidate.nakshatra || "N/A"}</strong></p>
                <p><span className="text-gray-500">Birth Time:</span> <strong>{selectedCandidate.birthTime || "N/A"}</strong></p>
              </div>

              <div className="bg-[#FFF8FA] p-4 rounded-2xl border border-pink-100 space-y-2">
                <p className="font-bold text-[#2A3773] text-sm mb-2 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#DB1866]" /> Partner Expectations
                </p>
                <p><span className="text-gray-500">Sub-Caste Pref:</span> <strong>{selectedCandidate.prefSubCaste || "Any"}</strong></p>
                <p><span className="text-gray-500">Age Range:</span> <strong>{selectedCandidate.prefAgeMin && selectedCandidate.prefAgeMax ? selectedCandidate.prefAgeMin + " to " + selectedCandidate.prefAgeMax + " Yrs" : "Any"}</strong></p>
                <p><span className="text-gray-500">Education Pref:</span> <strong>{selectedCandidate.prefEducation || "Any"}</strong></p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> 1-Year Complimentary VIP Access Active
              </span>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
