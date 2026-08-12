"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Filter,
  ChevronDown,
  ChevronUp,
  Grid3X3,
  List,
  SlidersHorizontal,
  CheckCircle2,
  Bookmark,
  Send,
  MessageCircle,
  X,
  Search,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
const profiles = [
  { id: 1, name: "Priyanka S.", age: 27, height: "5'4\"", city: "Bangalore", education: "B.E. (IT)", profession: "Software Engineer", community: "96 Kuli Maratha", manglik: "Manglik", matchPercent: 92, isVerified: true, traits: ["Modern yet Traditional", "Family Oriented"], photo: "https://i.pravatar.cc/300?img=1" },
  { id: 2, name: "Sakshi P.", age: 25, height: "5'3\"", city: "Mysore", education: "B.E. (Mech)", profession: "Software Engineer", community: "96 Kuli Maratha", manglik: "Non Manglik", matchPercent: 89, isVerified: true, traits: ["Ambitious", "Values Tradition"], photo: "https://i.pravatar.cc/300?img=2" },
  { id: 3, name: "Rutuja K.", age: 28, height: "5'5\"", city: "Pune", education: "CA", profession: "Auditor", community: "96 Kuli Maratha", manglik: "Manglik", matchPercent: 87, isVerified: true, traits: ["Career Focused", "Spiritual"], photo: "https://i.pravatar.cc/300?img=3" },
  { id: 4, name: "Aishwarya M.", age: 26, height: "5'6\"", city: "Bangalore", education: "BBA, MBA", profession: "Business Analyst", community: "96 Kuli Maratha", manglik: "Non Manglik", matchPercent: 85, isVerified: true, traits: ["Independent", "Family Oriented"], photo: "https://i.pravatar.cc/300?img=4" },
  { id: 5, name: "Snehal P.", age: 27, height: "5'2\"", city: "Nashik", education: "B.Sc (Mktg)", profession: "Marketing Executive", community: "96 Kuli Maratha", manglik: "Non Manglik", matchPercent: 83, isVerified: true, traits: ["Simple Living", "Respectful"], photo: "https://i.pravatar.cc/300?img=5" },
  { id: 6, name: "Madhura K.", age: 24, height: "5'4\"", city: "Mumbai", education: "BMS", profession: "HR Executive", community: "Deshastha", manglik: "Non Manglik", matchPercent: 81, isVerified: true, traits: ["Cheerful", "Family Values"], photo: "https://i.pravatar.cc/300?img=6" },
];

const matchLabels: Record<number, string> = {
  92: "Best Match", 89: "Excellent Match", 87: "Excellent Match",
  85: "Great Match", 83: "Great Match", 81: "Good Match",
};

const filterGroups = [
  { label: "Basic", items: ["Age", "Height", "Marital Status"] },
  { label: "Community", items: ["Religion", "Caste", "Sub-caste", "Mother Tongue"] },
  { label: "Location", items: ["Country", "State", "City"] },
  { label: "Education", items: ["Qualification", "College"] },
  { label: "Career", items: ["Profession", "Income"] },
  { label: "Lifestyle", items: ["Diet", "Smoking", "Drinking"] },
  { label: "Profile", items: ["With Photo", "Verified Only", "Recently Active", "Premium"] },
];

export default function SearchPage() {
  const [gridView, setGridView] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState<string[]>(["Basic"]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleFilter = (label: string) => {
    setExpandedFilters((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const FilterSidebar = () => (
    <div className="bg-white rounded-2xl border border-[#FADADF] overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-[#FADADF]">
        <h3 className="font-bold text-[#173F73] flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filter Results
        </h3>
        <button className="text-xs text-[#F34883] font-semibold hover:underline">Clear All</button>
      </div>

      {filterGroups.map((group) => {
        const expanded = expandedFilters.includes(group.label);
        return (
          <div key={group.label} className="border-b border-[#FADADF] last:border-0">
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-[#173F73] hover:bg-[#FFF1F5] transition-colors"
              onClick={() => toggleFilter(group.label)}
            >
              {group.label}
              {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {expanded && (
              <div className="px-4 pb-3 space-y-2">
                {group.items.map((item) => (
                  <label key={item} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-[#F34883] transition-colors">
                    <input type="checkbox" className="accent-[#F34883] w-3.5 h-3.5" />
                    {item}
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="p-4 space-y-2">
        <button className="w-full bg-[#F34883] hover:bg-[#d93870] text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
          <SlidersHorizontal className="w-4 h-4" /> Apply Filters
        </button>
        <button className="w-full border border-[#FADADF] text-[#173F73] font-semibold py-2.5 rounded-xl text-sm transition-colors hover:bg-[#FFF1F5]">
          Save Search
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FFF1F5] min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 md:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/home" className="hover:text-[#F34883]">Home</Link>
          <span>›</span>
          <Link href="/search" className="hover:text-[#F34883]">Search</Link>
          <span>›</span>
          <span className="text-[#173F73] font-semibold">Results</span>
        </div>

        <div className="flex gap-8">
          {/* Left: Filter Sidebar (desktop) */}
          <div className="hidden lg:block w-64 shrink-0">
            <FilterSidebar />
          </div>

          {/* Right: Results */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-2xl font-bold font-serif text-[#173F73]">Search Results</h1>
                <p className="text-sm text-gray-500 mt-0.5"><span className="text-[#F34883] font-bold">1,248</span> Matches Found</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  className="lg:hidden flex items-center gap-1.5 text-sm font-semibold text-[#173F73] border border-[#FADADF] rounded-xl px-3 py-2 bg-white"
                  onClick={() => setFiltersOpen(true)}
                >
                  <Filter className="w-4 h-4" /> Filters
                </button>
                {/* Sort */}
                <select className="text-sm border border-[#FADADF] rounded-xl px-3 py-2 bg-white text-[#173F73] font-semibold focus:outline-none focus:border-[#F34883]">
                  <option>Best Match</option>
                  <option>Recently Active</option>
                  <option>Newest</option>
                  <option>Age</option>
                </select>
                {/* View toggle */}
                <div className="flex items-center bg-white border border-[#FADADF] rounded-xl overflow-hidden">
                  <button
                    className={`p-2 ${!gridView ? "bg-[#F34883] text-white" : "text-gray-400 hover:text-[#F34883]"} transition-colors`}
                    onClick={() => setGridView(false)}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    className={`p-2 ${gridView ? "bg-[#F34883] text-white" : "text-gray-400 hover:text-[#F34883]"} transition-colors`}
                    onClick={() => setGridView(true)}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Profile List */}
            {!gridView ? (
              <div className="space-y-4">
                {profiles.map((p) => (
                  <div key={p.id} className="bg-white rounded-2xl border border-[#FADADF] overflow-hidden flex hover:shadow-md transition-shadow">
                    {/* Photo */}
                    <Link href={`/profile/${p.id}`} className="relative w-36 md:w-48 shrink-0">
                      <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                      {p.isVerified && (
                        <span className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-green-600 flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-green-200">
                          <CheckCircle2 className="w-3 h-3" /> 100% Verified
                        </span>
                      )}
                    </Link>

                    {/* Info */}
                    <div className="flex-1 p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Link href={`/profile/${p.id}`} className="font-bold text-[#173F73] text-base hover:text-[#F34883] transition-colors">
                            {p.name}
                          </Link>
                          {p.isVerified && <CheckCircle2 className="w-4 h-4 text-[#F34883] shrink-0" />}
                        </div>
                        <p className="text-sm text-gray-600">{p.age} Yrs · {p.height} · {p.city}</p>
                        <p className="text-sm text-gray-600">{p.education} · {p.profession}</p>
                        <p className="text-xs text-gray-400 mt-1">{p.community} · {p.manglik}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {p.traits.map((t) => (
                            <span key={t} className="text-[11px] bg-[#FFF1F5] text-[#F34883] border border-[#FADADF] px-2 py-0.5 rounded-full font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Match score */}
                      <div className="text-center md:mx-4 shrink-0">
                        <div className="w-16 h-16 rounded-full border-4 border-[#F34883] flex items-center justify-center mx-auto mb-1">
                          <p className="text-base font-black text-[#F34883]">{p.matchPercent}%</p>
                        </div>
                        <p className="text-[10px] text-gray-500 font-semibold">{matchLabels[p.matchPercent]}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 shrink-0 min-w-[120px]">
                        <Link href={`/profile/${p.id}`} className="text-xs font-bold text-white bg-[#F34883] hover:bg-[#d93870] px-4 py-2 rounded-lg transition-colors text-center">
                          View Profile
                        </Link>
                        <button className="flex items-center justify-center gap-1 text-xs font-semibold text-[#173F73] border border-[#FADADF] hover:border-[#F34883] hover:text-[#F34883] px-3 py-2 rounded-lg transition-colors">
                          <Send className="w-3 h-3" /> Send Interest
                        </button>
                        <button className="flex items-center justify-center gap-1 text-xs font-semibold text-gray-400 hover:text-[#F34883] border border-[#FADADF] px-3 py-2 rounded-lg transition-colors">
                          <Bookmark className="w-3 h-3" /> Shortlist
                        </button>
                        <button className="flex items-center justify-center gap-1 text-xs font-semibold text-gray-400 hover:text-[#F34883] border border-[#FADADF] px-3 py-2 rounded-lg transition-colors">
                          <MessageCircle className="w-3 h-3" /> Message
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {profiles.map((p) => (
                  <div key={p.id} className="bg-white rounded-2xl border border-[#FADADF] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group">
                    <Link href={`/profile/${p.id}`} className="relative block aspect-[3/4] overflow-hidden">
                      <img src={p.photo} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-2 left-2 bg-[#F34883] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">{p.matchPercent}%</div>
                      {p.isVerified && <div className="absolute top-2 right-2 bg-white/90 rounded-full p-0.5"><CheckCircle2 className="w-4 h-4 text-green-500" /></div>}
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white font-bold text-sm">{p.name}</p>
                        <p className="text-white/80 text-xs">{p.age} Yrs · {p.city}</p>
                      </div>
                    </Link>
                    <div className="p-3">
                      <p className="text-xs text-gray-500 mb-2 line-clamp-1">{p.profession}</p>
                      <div className="flex gap-1.5">
                        <button className="flex-1 text-xs font-bold text-white bg-[#F34883] hover:bg-[#d93870] py-1.5 rounded-lg transition-colors">
                          Interest
                        </button>
                        <button className="flex-1 text-xs font-semibold text-[#173F73] border border-[#FADADF] hover:border-[#F34883] hover:text-[#F34883] py-1.5 rounded-lg transition-colors">
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {["← Previous", "1", "2", "3", "4", "5", "...", "25", "Next →"].map((p) => (
                <button
                  key={p}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    p === "1"
                      ? "bg-[#F34883] text-white"
                      : "bg-white border border-[#FADADF] text-[#173F73] hover:border-[#F34883] hover:text-[#F34883]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filtersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-80 bg-white overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-[#FADADF]">
              <h3 className="font-bold text-[#173F73]">Filters</h3>
              <button onClick={() => setFiltersOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <FilterSidebar />
          </div>
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
        </div>
      )}
    </div>
  );
}
