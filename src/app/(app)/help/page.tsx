"use client";

import { useState } from "react";
import { ShieldCheck, HelpCircle, ChevronDown, ChevronUp, Lock, Phone } from "lucide-react";

const faqs = [
  { q: "How do I create and verify my profile?", a: "Simply sign up with your mobile number, fill in your personal, educational, and astrological details, and upload a clear photo. Our team reviews and verifies profiles within 24 hours." },
  { q: "Is Maratha Matrimony exclusive to Karnataka?", a: "Yes, our primary focus is serving Maratha families (including 96 Kuli, Deshastha, and Kunbi) living across Karnataka and neighboring regions." },
  { q: "Can my parents manage my profile?", a: "Absolutely. Profiles can be registered and managed by the candidate, parents, siblings, or guardians." },
  { q: "How is my privacy protected?", a: "Your phone number and contact details are masked and only revealed to members you accept or who have verified credentials. Photos can also be blurred upon request." },
  { q: "How do I contact a match?", a: "You can click 'Send Interest'. Once the member accepts your interest, in-app chat is immediately unlocked." },
  { q: "What should I do if I encounter a fake profile?", a: "Use the 'Report Profile' button on their page or contact our WhatsApp support line immediately. We take authenticity very seriously." },
];

export default function HelpPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#FFF1F5] pt-24 pb-16">
      <div className="container mx-auto max-w-4xl px-4">
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#FADADF] text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#FFF1F5] border border-[#FADADF] text-[#DB1866] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <HelpCircle className="w-3.5 h-3.5" /> Help Center & Guidelines
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-sans text-[#2A3773] mb-4">How Can We Help You?</h1>
          <p className="text-gray-600 text-base max-w-xl mx-auto">
            Find answers to common questions, safety tips, and guidance for your matrimonial journey.
          </p>
        </div>

        {/* Safety Tips Card */}
        <div className="bg-[#2A3773] text-white rounded-3xl p-8 shadow-xl mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-8 h-8 text-[#DB1866]" />
            <h2 className="text-2xl font-bold">Safety & Trust Guidelines</h2>
          </div>
          <ul className="space-y-3 text-sm text-blue-100">
            <li className="flex items-start gap-2">
              <span className="text-[#DB1866] font-bold">•</span>
              <span><strong>Never send money:</strong> Do not transfer funds or share bank details under any circumstance.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#DB1866] font-bold">•</span>
              <span><strong>Meet in public places:</strong> Always arrange initial family meetings in safe, public venues.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#DB1866] font-bold">•</span>
              <span><strong>Verify independently:</strong> Confirm family references and background through common community elders.</span>
            </li>
          </ul>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#FADADF]">
          <h2 className="text-2xl font-bold text-[#2A3773] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-[#2A3773] hover:bg-[#FFF1F5] transition-colors"
                >
                  <span className="text-base">{faq.q}</span>
                  {openIdx === idx ? <ChevronUp className="w-5 h-5 text-[#DB1866]" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                {openIdx === idx && (
                  <div className="p-5 pt-0 text-sm text-gray-600 leading-relaxed bg-[#FFF1F5]/30">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
