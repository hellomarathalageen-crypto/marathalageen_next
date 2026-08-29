"use client";

import { useState, use } from "react";
import Link from "next/link";
import { Crown, CheckCircle2, ShieldCheck, CreditCard, Sparkles, ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const unwrapped = use(searchParams);
  const selectedPlanKey = unwrapped.plan === "premium-plus" ? "premium-plus" : "premium";
  
  const [method, setMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const planDetails = selectedPlanKey === "premium-plus" 
    ? { name: "Premium Plus", price: "₹1,999", duration: "3 Months", badge: "Maximum Visibility" }
    : { name: "Premium", price: "₹999", duration: "3 Months", badge: "Most Popular" };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FFF1F5] pt-24 pb-16">
      <div className="container mx-auto max-w-4xl px-4">
        
        <div className="mb-6">
          <Link href="/membership" className="inline-flex items-center gap-2 text-sm font-bold text-[#2A3773] hover:text-[#DB1866]">
            <ArrowLeft className="w-4 h-4" /> Back to Membership Plans
          </Link>
        </div>

        {success ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow-xl border border-[#FADADF] animate-in zoom-in-95">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold text-[#2A3773] mb-2">Upgrade Successful!</h1>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Welcome to <strong>{planDetails.name}</strong>. Your profile now has full contact view privileges and priority matchmaking.
            </p>
            <Link href="/dashboard" className="bg-[#2A3773] hover:bg-[#1c2755] text-white px-8 py-3.5 rounded-xl font-bold inline-block">
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Checkout Options */}
            <div className="md:col-span-7 bg-white rounded-3xl p-8 shadow-sm border border-[#FADADF]">
              <h2 className="text-2xl font-bold text-[#2A3773] mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#DB1866]" /> Secure Checkout
              </h2>

              <div className="space-y-4 mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase">Select Payment Method</p>
                
                {[
                  { id: "upi", label: "UPI (Google Pay, PhonePe, Paytm, BHIM)", icon: "⚡" },
                  { id: "card", label: "Credit / Debit Card (Visa, Mastercard, RuPay)", icon: "💳" },
                  { id: "netbanking", label: "Net Banking (All Major Indian Banks)", icon: "🏦" },
                ].map(m => (
                  <label 
                    key={m.id} 
                    onClick={() => setMethod(m.id as any)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                      method === m.id ? 'border-[#DB1866] bg-[#FFF1F5] shadow-sm' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input type="radio" name="paymethod" checked={method === m.id} onChange={() => {}} className="text-[#DB1866]" />
                    <span className="text-xl">{m.icon}</span>
                    <span className="text-sm font-bold text-[#2A3773]">{m.label}</span>
                  </label>
                ))}
              </div>

              {method === "upi" && (
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 mb-6">
                  <label className="text-xs font-bold text-[#2A3773]">Enter UPI ID / VPA</label>
                  <input placeholder="example@okhdfcbank" className="w-full h-11 px-3 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:border-[#DB1866]" />
                </div>
              )}

              <Button 
                onClick={handlePay}
                disabled={loading}
                className="w-full h-14 bg-[#DB1866] hover:bg-[#B81456] text-white font-bold rounded-2xl shadow-lg shadow-[#DB1866]/30 text-base"
              >
                {loading ? "Processing Secure Payment..." : `Pay ${planDetails.price} Securely`}
              </Button>

              <p className="text-center text-[11px] text-gray-400 mt-4 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 256-bit SSL Encrypted • 7-Day Refund Guarantee
              </p>
            </div>

            {/* Right: Order Summary */}
            <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-[#FADADF] shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-[#FFF1F5] rounded-2xl flex items-center justify-center text-[#DB1866]">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2A3773]">{planDetails.name}</h3>
                  <p className="text-xs text-gray-400">{planDetails.duration} Access</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Plan Amount</span>
                  <span className="font-bold text-[#2A3773]">{planDetails.price}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span className="text-emerald-600 font-semibold">Included</span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between text-base font-bold text-[#2A3773]">
                  <span>Total Payable</span>
                  <span className="text-2xl text-[#DB1866] font-black">{planDetails.price}</span>
                </div>
              </div>

              <div className="p-4 bg-[#FFF1F5] rounded-2xl text-xs text-[#DB1866] font-medium space-y-2 border border-[#FADADF]">
                <p className="font-bold flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Plan Benefits Included:</p>
                <p>✓ Unlimited Contact Views</p>
                <p>✓ Direct Messaging & Chat</p>
                <p>✓ Verified Profile Badge</p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
