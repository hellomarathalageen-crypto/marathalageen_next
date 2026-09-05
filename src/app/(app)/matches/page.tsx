"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { Loader2, Sparkles } from "lucide-react";

export default function MatchesPage() {
  const router = useRouter();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch(`/api/matches`);
        if (res.status === 401) {
          router.replace("/login?from=/matches");
          return;
        }
        if (res.status === 403) {
          router.replace("/onboarding");
          return;
        }
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
    fetchMatches();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 bg-[#FFF1F5] rounded-xl flex items-center justify-center text-[#DB1866]">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-sans text-[#2A3773]">Your Recommended Matches</h1>
            <p className="text-gray-500 mt-1">Curated specially for you based on your partner preferences.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-[#DB1866] animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Curating your perfect matches...</p>
          </div>
        ) : matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {matches.map((profile: any) => (
              <ProfileCard key={profile.id} {...profile} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 max-w-2xl mx-auto mt-12">
            <div className="w-20 h-20 bg-[#FFF1F5] rounded-full flex items-center justify-center mx-auto mb-4 text-[#DB1866]">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-sans text-[#2A3773] mb-2">No recommendations yet</h3>
            <p className="text-gray-500 mb-6">We need a bit more time to find profiles that match your exact preferences. Try broadening your partner preferences.</p>
          </div>
        )}

      </div>
    </div>
  );
}
