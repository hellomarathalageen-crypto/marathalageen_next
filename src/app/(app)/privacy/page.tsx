"use client";

import { ShieldCheck, Lock } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FFF1F5] pt-24 pb-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#FADADF] space-y-6 text-gray-700 leading-relaxed">
          <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
            <Lock className="w-8 h-8 text-[#DB1866]" />
            <div>
              <h1 className="text-3xl font-bold text-[#2A3773]">Privacy Policy</h1>
              <p className="text-xs text-gray-400">Last updated: August 2026</p>
            </div>
          </div>

          <p className="text-sm">
            At <strong>Maratha Matrimony</strong>, we take your trust and privacy with utmost seriousness. This Privacy Policy details how we collect, store, protect, and handle your information.
          </p>

          <h3 className="text-xl font-bold text-[#2A3773]">1. Information We Collect</h3>
          <p className="text-sm">
            We collect personal information such as candidate name, gender, contact numbers, email, date of birth, gotra, community details, educational background, and photos strictly for matching and authentication purposes.
          </p>

          <h3 className="text-xl font-bold text-[#2A3773]">2. Privacy & Masking</h3>
          <p className="text-sm">
            <strong>Your data is secured with us. The details entered is shown to the intended audience.</strong> Your mobile number is not displayed publicly to unverified or unauthorized users.
          </p>

          <h3 className="text-xl font-bold text-[#2A3773]">3. Data Security & Storage</h3>
          <p className="text-sm">
            All user data is encrypted with 256-bit SSL technology. We do not sell, rent, or trade your personal information to third-party marketing companies.
          </p>

          <h3 className="text-xl font-bold text-[#2A3773]">4. Contact Our Grievance Officer</h3>
          <p className="text-sm">
            For privacy queries or data deletion requests, contact us at <code>privacy@marathamarry.com</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
