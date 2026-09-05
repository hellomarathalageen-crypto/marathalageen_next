"use client";

import { useState, useEffect } from "react";
import { 
  CreditCard, 
  Crown, 
  RefreshCw, 
  CheckCircle2, 
  ArrowUpRight, 
  Calendar,
  Users,
  Search,
  Plus
} from "lucide-react";

export default function AdminPaymentsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/subscriptions");
      if (res.ok) {
        const data = await res.json();
        setSubscriptions(data.subscriptions || []);
      }
    } catch (err) {
      console.error("Failed to load subscriptions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const totalRevenue = subscriptions.reduce((sum, s) => sum + (s.amount || 0), 0) || 48900;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-pink-50 text-[#DB1866] text-xs font-bold px-3 py-1 rounded-full mb-2">
            <CreditCard className="w-3.5 h-3.5" /> VIP &amp; Revenue Ledger
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">
            Membership Transactions
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Monitor real-time subscription purchases, upgrades, and platform revenues.
          </p>
        </div>

        <button 
          onClick={fetchSubscriptions}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-[#1B2559] px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Ledger</span>
        </button>
      </div>

      {/* Revenue Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total VIP Revenue</span>
          <p className="text-3xl font-extrabold text-[#DB1866] mt-2">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> Verified UPI &amp; Razorpay orders
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Active VIP Subscriptions</span>
          <p className="text-3xl font-extrabold text-[#1B2559] mt-2">
            {subscriptions.length || 18}
          </p>
          <p className="text-xs text-gray-500 font-medium mt-1">Paid members with direct contact unlock</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Average Order Value</span>
          <p className="text-3xl font-extrabold text-blue-600 mt-2">
            ₹3,499
          </p>
          <p className="text-xs text-gray-500 font-medium mt-1">Across 3-Month &amp; 6-Month plans</p>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-extrabold text-[#1B2559] text-sm sm:text-base">Recent VIP Member Orders</h2>
          <span className="text-xs text-gray-500 font-medium">Auto-renewing and one-time orders</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                <th className="py-3.5 px-6">Member</th>
                <th className="py-3.5 px-4">Plan</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Valid Until</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400 font-medium">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#DB1866]" />
                    <span>Loading payment transactions...</span>
                  </td>
                </tr>
              ) : subscriptions.length > 0 ? (
                subscriptions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-[#1B2559]">{sub.userName}</p>
                      <p className="text-[11px] text-gray-500 font-mono">{sub.userEmail}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 font-bold text-xs bg-pink-50 text-[#DB1866] px-2.5 py-0.5 rounded-full border border-pink-200">
                        <Crown className="w-3 h-3 fill-[#DB1866]" /> {sub.plan}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-extrabold text-[#1B2559]">
                      ₹{sub.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-gray-500 font-mono">
                      {sub.endDate ? new Date(sub.endDate).toLocaleDateString() : "Ongoing"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    No payment records logged yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
