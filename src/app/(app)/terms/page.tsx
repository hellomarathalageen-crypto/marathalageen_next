"use client";

import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FFF1F5] pt-24 pb-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#FADADF] space-y-6 text-gray-700 leading-relaxed">
          <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
            <FileText className="w-8 h-8 text-[#2A3773]" />
            <div>
              <h1 className="text-3xl font-bold text-[#2A3773]">Terms & Conditions</h1>
              <p className="text-xs text-gray-400">Effective Date: August 2026</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#2A3773]">1. Eligibility</h3>
          <p className="text-sm">
            By registering, you confirm that you are of legal marriageable age under Indian law (18 years for females, 21 years for males) and belong to the Maratha community.
          </p>

          <h3 className="text-xl font-bold text-[#2A3773]">2. Authentic Profile Information</h3>
          <p className="text-sm">
            You agree to provide accurate and truthful details regarding your marital status, education, gotra, and identity. Misrepresentation may result in immediate suspension.
          </p>

          <h3 className="text-xl font-bold text-[#2A3773]">3. Code of Conduct</h3>
          <p className="text-sm">
            Members must interact with dignity and respect. Any harassment, solicitation, or fraudulent activity is strictly prohibited and subject to legal action.
          </p>
        </div>
      </div>
    </div>
  );
}
