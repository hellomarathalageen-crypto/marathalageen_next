"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { FilterSidebar, FilterState } from "@/components/ui/FilterSidebar";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { Loader2, Users, MapPin, Sparkles, Navigation } from "lucide-react";

function SearchPageContent() {
  const { status } = useSession();
  const searchParams = useSearchParams();

  const urlGender = searchParams.get("gender") || "Female";
  const urlMinAge = parseInt(searchParams.get("minAge") || "21");
  const urlMaxAge = parseInt(searchParams.get("maxAge") || "35");
  const urlCity = searchParams.get("city") || "all";
  const urlCommunity = searchParams.get("community") || "all";
  const urlLat = searchParams.get("userLat") ? parseFloat(searchParams.get("userLat")!) : null;
  const urlLng = searchParams.get("userLng") ? parseFloat(searchParams.get("userLng")!) : null;
  const urlIsLive = Boolean(searchParams.get("live") || (urlLat !== null && urlLng !== null));

  const [matches, setMatches] = useState<any[]>([]);
  const [locationContext, setLocationContext] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    gender: urlGender,
    minAge: urlMinAge,
    maxAge: urlMaxAge,
    maritalStatus: "all",
    community: urlCommunity,
    city: urlCity,
    education: "all",
    userLat: urlLat,
    userLng: urlLng,
    isLiveLocation: urlIsLive,
  });

  const fetchMatches = useCallback(async (currentFilters: FilterState) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        gender: currentFilters.gender,
        minAge: currentFilters.minAge.toString(),
        maxAge: currentFilters.maxAge.toString(),
      });

      if (currentFilters.city && currentFilters.city !== "all") params.set("city", currentFilters.city);
      if (currentFilters.community && currentFilters.community !== "all") params.set("community", currentFilters.community);
      if (currentFilters.maritalStatus && currentFilters.maritalStatus !== "all") params.set("maritalStatus", currentFilters.maritalStatus);
      if (currentFilters.education && currentFilters.education !== "all") params.set("education", currentFilters.education);

      // Geo Proximity Coordinates
      if (currentFilters.userLat && currentFilters.userLng) {
        params.set("userLat", currentFilters.userLat.toString());
        params.set("userLng", currentFilters.userLng.toString());
      }

      const res = await fetch(`/api/search?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setMatches(data.matches || []);
        setLocationContext(data.locationContext || null);
      }
    } catch (error) {
      console.error("Failed to fetch matches:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches(filters);
  }, [filters, fetchMatches]);

  return (
    <div className="min-h-screen bg-[#FFFDFB] pt-24 pb-16">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#FFF1F5] text-[#DB1866] text-xs font-bold px-3.5 py-1 rounded-full mb-2">
              <Users className="w-3.5 h-3.5" /> Verified Community Directory
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-sans text-[#2A3773]">
              Find Your Maratha Partner
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Explore authentic 96 Kuli Maratha candidate profiles with verified backgrounds.
            </p>
          </div>

          <div className="text-sm font-bold text-gray-500 bg-white px-4 py-2 rounded-2xl border border-[#FADADF] shadow-sm self-start sm:self-auto">
            Showing <span className="text-[#DB1866]">{matches.length}</span> Verified Profiles
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Filter Sidebar */}
          <div className="w-full lg:w-80 shrink-0">
            <FilterSidebar
              initialFilters={filters}
              onFilterChange={(newFilters) => setFilters(newFilters)}
            />
          </div>

          {/* Results Grid */}
          <div className="flex-1 w-full min-w-0">
            
            {/* Guest Preview Attraction Banner */}
            {status === "unauthenticated" && (
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#FFF1F5] via-white to-[#FFF5F8] border border-[#FADADF] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-100/70 flex items-center justify-center text-[#DB1866] shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1B2559] flex items-center gap-2">
                      <span>Public Guest Preview Mode</span>
                      <span className="bg-[#DB1866] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        Member Only Actions
                      </span>
                    </h4>
                    <p className="text-[11px] text-gray-600 mt-0.5">
                      Log in or complete free registration to view full biodatas, contact families, and send marriage proposals.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                  <Link
                    href={`/login?from=${encodeURIComponent("/search")}`}
                    className="px-3.5 py-1.5 rounded-xl bg-[#121A3D] hover:bg-[#1A2554] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-3.5 py-1.5 rounded-xl bg-[#DB1866] hover:bg-[#B81456] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    Free Register
                  </Link>
                </div>
              </div>
            )}

            {/* Live GPS Proximity Banner */}
            {filters.isLiveLocation && locationContext && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <Navigation className="w-5 h-5 text-emerald-600 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950 flex items-center gap-2">
                      <span>Proximity Algorithm Active</span>
                      <span className="bg-emerald-200 text-emerald-900 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        Live GPS
                      </span>
                    </h4>
                    <p className="text-[11px] text-emerald-800 mt-0.5">
                      Showing candidates nearest to your detected position in <strong>{locationContext.nearestCity}, {locationContext.state}</strong> (Sorted closest first).
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const updated: FilterState = { ...filters, userLat: null, userLng: null, isLiveLocation: false, city: "all" };
                    setFilters(updated);
                  }}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline shrink-0 self-end sm:self-auto cursor-pointer"
                >
                  Clear GPS
                </button>
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center h-80 bg-white rounded-3xl border border-[#FADADF]">
                <Loader2 className="w-10 h-10 text-[#DB1866] animate-spin mb-4" />
                <p className="text-[#2A3773] font-bold text-sm">Searching verified Maratha candidates...</p>
                <p className="text-gray-400 text-xs mt-1">Refining by community, age, and location</p>
              </div>
            ) : matches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {matches.map((profile: any) => (
                  <ProfileCard key={profile.id} {...profile} distanceKm={profile.distanceKm} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-[#FADADF]">
                <div className="w-20 h-20 bg-[#FFF1F5] text-[#DB1866] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                  🔍
                </div>
                <h3 className="text-xl font-bold font-sans text-[#2A3773] mb-2">No Matching Profiles Found</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                  We could not find candidates matching your exact criteria. Try broadening your age range or clearing location filters.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      gender: "Female",
                      minAge: 18,
                      maxAge: 70,
                      maritalStatus: "all",
                      community: "all",
                      city: "all",
                      education: "all",
                    })
                  }
                  className="bg-[#2A3773] text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-[#1f295c] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFFDFB] pt-24 pb-16 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-[#DB1866] animate-spin" />
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
