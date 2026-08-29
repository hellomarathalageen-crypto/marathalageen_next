"use client";

import { CheckCircle2, RotateCcw } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FFF1F5] pt-24 pb-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#FADADF] space-y-6 text-gray-700 leading-relaxed">
          <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
            <RotateCcw className="w-8 h-8 text-[#DB1866]" />
            <div>
              <h1 className="text-3xl font-bold text-[#2A3773]">Refund Policy</h1>
              <p className="text-xs text-gray-400">7-Day Money Back Guarantee</p>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-100 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <p className="text-sm font-bold">
              We offer a 100% money-back guarantee within 7 days of upgrading to any premium tier if you are not satisfied.
            </p>
          </div>

          <h3 className="text-xl font-bold text-[#2A3773]">Refund Eligibility</h3>
          <p className="text-sm">
            To be eligible for a refund, submit a request to <code>support@marathamarry.com</code> within 7 calendar days of your payment transaction.
          </p>
        </div>
      </div>
    </div>
  );
}
