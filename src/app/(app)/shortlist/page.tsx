"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bookmark, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { ProfileCard } from "@/components/ui/ProfileCard";

export default function ShortlistPage() {
  const router = useRouter();
  const [shortlists, setShortlists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchShortlists = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/shortlist");
      if (res.status === 401) {
        router.replace("/login?from=/shortlist");
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setShortlists(data.shortlists || []);
      }
    } catch (err) {
      console.error("Failed to load shortlists:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShortlists();
  }, []);

  const handleRemove = (profileId: string) => {
    setShortlists((prev) => prev.filter((p) => p.id !== profileId));
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] pt-24 pb-16">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#FFF1F5] text-[#DB1866] text-xs font-bold px-3.5 py-1 rounded-full mb-2">
              <Bookmark className="w-3.5 h-3.5" /> Family Shortlist Vault
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-sans text-[#2A3773]">
              Your Shortlisted Candidates
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Profiles you have bookmarked to review with parents and elders.
            </p>
          </div>

          <div className="text-sm font-bold text-gray-500 bg-white px-4 py-2 rounded-2xl border border-[#FADADF] shadow-sm self-start sm:self-auto">
            Total Saved: <span className="text-[#DB1866]">{shortlists.length}</span> Profiles
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-80 bg-white rounded-3xl border border-[#FADADF]">
            <Loader2 className="w-10 h-10 text-[#DB1866] animate-spin mb-4" />
            <p className="text-[#2A3773] font-bold text-sm">Loading your bookmarked profiles...</p>
          </div>
        ) : shortlists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
            {shortlists.map((profile) => (
              <ProfileCard
                key={profile.id}
                {...profile}
                initialShortlisted={true}
                onShortlistToggle={(isShortlisted) => {
                  if (!isShortlisted) handleRemove(profile.id);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-[#FADADF] max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-[#FFF1F5] text-[#DB1866] rounded-full flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-[#2A3773] mb-3">No Profiles Shortlisted Yet</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md mx-auto">
              Whenever you see an interesting Maratha bride or groom profile, tap the heart icon to save them here for quick family discussions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/matches"
                className="inline-flex items-center gap-2 bg-[#DB1866] hover:bg-[#B81456] text-white px-6 py-3 rounded-2xl font-bold text-sm transition-transform hover:scale-105 shadow-md shadow-[#DB1866]/20"
              >
                <Sparkles className="w-4 h-4" /> View Matches
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 bg-white text-[#2A3773] border border-gray-200 hover:border-[#2A3773] px-6 py-3 rounded-2xl font-bold text-sm transition-all"
              >
                Search Directory <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
