"use client";

import { useState, useEffect } from "react";
import { FilterSidebar } from "@/components/ui/FilterSidebar";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { Loader2 } from "lucide-react";

export default function SearchPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ minAge: 21, maxAge: 35 });

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        minAge: filters.minAge.toString(),
        maxAge: filters.maxAge.toString()
      });
      const res = await fetch(`/api/search?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setMatches(data.matches);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-sans text-[#2A3773]">Find Your Perfect Match</h1>
          <p className="text-gray-500 mt-1">Discover profiles that match your preferences perfectly.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 shrink-0">
            <FilterSidebar onFilterChange={(newFilters) => setFilters(newFilters)} />
          </div>

          {/* Results Area */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-[#DB1866] animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Finding perfect matches for you...</p>
              </div>
            ) : matches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {matches.map((profile: any) => (
                  <ProfileCard key={profile.id} {...profile} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-xl font-bold font-sans text-[#2A3773] mb-2">No matches found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more profiles.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
