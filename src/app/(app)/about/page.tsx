"use client";

import Link from "next/link";
import { Heart, Users, ShieldCheck, Award, Sparkles, CheckCircle2, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFF1F5] pt-24 pb-16">
      <div className="container mx-auto max-w-5xl px-4">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#FADADF] text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#FFF1F5] border border-[#FADADF] text-[#DB1866] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Heart className="w-3.5 h-3.5 fill-[#DB1866]" /> Our Mission & Heritage
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-sans text-[#2A3773] mb-4">About Maratha Matrimony</h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Karnataka's exclusive, trusted matrimonial platform dedicated to preserving the cultural heritage, traditions, and sacred bonds of Maratha families.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#FADADF]">
            <div className="w-12 h-12 bg-pink-100 text-[#DB1866] rounded-2xl flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#2A3773] mb-3">Why We Started</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Maratha families across Karnataka have always prioritized mutual respect, gotra alignment, community trust, and family values when seeking matrimonial alliances.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Traditional brokers often lack transparency, while generalized matrimony apps are crowded and unverified. Maratha Matrimony was built to give families a dignified, authentic, and modern experience.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#FADADF]">
            <div className="w-12 h-12 bg-blue-100 text-[#2A3773] rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#2A3773] mb-3">Our Core Commitments</h2>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#DB1866] shrink-0" />
                <span><strong>100% Verified Profiles:</strong> Manual review of identity and community credentials.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#DB1866] shrink-0" />
                <span><strong>Privacy First:</strong> Your phone number and photos remain protected.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#DB1866] shrink-0" />
                <span><strong>Community Focused:</strong> Specifically tailored for Karnataka Maratha families.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Founder Quote */}
        <div className="bg-[#2A3773] text-white rounded-3xl p-8 md:p-10 shadow-xl mb-8 flex flex-col md:flex-row items-center gap-8">
          <img src="/founder.jpg" alt="Founder" className="w-32 h-32 rounded-2xl object-cover border-4 border-white/20 shrink-0" />
          <div>
            <p className="text-pink-200 text-lg italic mb-4 leading-relaxed">
              "At Maratha Lageen, our mission is simple - to bring Maratha families of Karnataka onto a trusted platform built on values, transparency and respect."
            </p>
            <p className="font-bold text-white text-base">— Founder & Managing Director</p>
            <p className="text-xs text-blue-200">Maratha Matrimony Services</p>
          </div>
        </div>

      </div>
    </div>
  );
}
