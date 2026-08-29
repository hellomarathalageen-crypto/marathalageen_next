"use client";
import Link from "next/link";
import { Bookmark, Sparkles, ArrowRight } from "lucide-react";

export default function ShortlistPage() {
  return (
    <div className="min-h-screen bg-[#FFF1F5] pt-24 pb-16">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-[#FADADF]">
          <div className="w-20 h-20 bg-[#FFF1F5] text-[#DB1866] rounded-full flex items-center justify-center mx-auto mb-6">
            <Bookmark className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-[#2A3773] mb-3">Saved & Shortlisted Profiles</h1>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            You can bookmark potential matches while browsing and review them with your family anytime.
          </p>
          <Link href="/matches" className="inline-flex items-center gap-2 bg-[#DB1866] hover:bg-[#B81456] text-white px-8 py-3.5 rounded-xl font-bold transition-transform hover:scale-105 shadow-md">
            Explore Recommended Matches <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
