"use client";

import { useState } from "react";
import { 
  Download, 
  FileSpreadsheet, 
  CheckCircle2, 
  Users, 
  CreditCard, 
  Calendar,
  Sparkles,
  BookOpen,
  RefreshCw
} from "lucide-react";

export default function AdminExportPage() {
  const [downloading, setDownloading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Real client-side CSV generator fetching live data
  const handleExportMembers = async (type: "all" | "brides" | "grooms") => {
    try {
      setDownloading(true);
      const res = await fetch("/api/admin/users?limit=200");
      if (!res.ok) throw new Error("Failed to fetch data");
      
      const data = await res.json();
      let users = data.users || [];

      if (type === "brides") {
        users = users.filter((u: any) => u.gender === "Female");
      } else if (type === "grooms") {
        users = users.filter((u: any) => u.gender === "Male");
      }

      // Format CSV
      const headers = ["ID", "Full Name", "Gender", "City", "Education", "Profession", "Verified", "Plan", "Email", "Registration Date"];
      const rows = users.map((u: any) => [
        u.id,
        `"${u.name}"`,
        u.gender,
        `"${u.city}"`,
        `"${u.education}"`,
        `"${u.profession}"`,
        u.isVerified ? "YES" : "NO",
        u.plan,
        u.email,
        new Date(u.createdAt).toLocaleDateString()
      ]);

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e: string[]) => e.join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `maratha_members_${type}_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setToast(`✅ Exported ${users.length} member profiles successfully to CSV!`);
      setTimeout(() => setToast(null), 4000);
    } catch (err) {
      console.error("Export error:", err);
      alert("Failed to export data. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const handleExportPayments = async () => {
    try {
      setDownloading(true);
      const res = await fetch("/api/admin/subscriptions");
      if (!res.ok) throw new Error("Failed to fetch subscriptions");

      const data = await res.json();
      const subscriptions = data.subscriptions || [];

      const headers = ["Order ID", "Member Name", "Email", "Plan Tier", "Amount (INR)", "Status", "Expiry Date"];
      const rows = subscriptions.map((s: any) => [
        s.id,
        `"${s.userName}"`,
        s.userEmail,
        s.plan,
        s.amount,
        s.status,
        s.endDate ? new Date(s.endDate).toLocaleDateString() : "N/A"
      ]);

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e: string[]) => e.join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `maratha_vip_revenue_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setToast(`✅ Exported ${subscriptions.length} revenue records to CSV!`);
      setTimeout(() => setToast(null), 4000);
    } catch (err) {
      console.error("Export payments error:", err);
      alert("Failed to export payments.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl">
      
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-[#121A3D] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full mb-2">
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> Melava &amp; Ledger Exports
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">
          Data Exports &amp; Vadhu Var Booklets
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
          Generate structured CSV spreadsheets for offline Vadhu Var Melavas, family directories, and accounting audits.
        </p>
      </div>

      {/* Export Cards Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Member Profiles Export */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-[#1B2559] text-base">Candidate Directory CSV</h2>
              <p className="text-xs text-gray-400">Complete biodata directory with contacts</p>
            </div>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            Includes full candidate details: Age, height, education, profession, Devak, Gotra, city, and verification credentials.
          </p>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => handleExportMembers("all")}
              disabled={downloading}
              className="w-full py-2.5 px-4 rounded-xl bg-[#121A3D] hover:bg-[#1A2554] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" /> Export All Candidates (Brides &amp; Grooms)
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleExportMembers("brides")}
                disabled={downloading}
                className="py-2.5 px-3 rounded-xl bg-pink-50 hover:bg-pink-100 text-[#DB1866] border border-pink-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3 h-3" /> Brides Only CSV
              </button>
              <button
                onClick={() => handleExportMembers("grooms")}
                disabled={downloading}
                className="py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3 h-3" /> Grooms Only CSV
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Financials & VIP Subscriptions Export */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-50 text-[#DB1866] flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-[#1B2559] text-base">VIP Revenue Ledger CSV</h2>
              <p className="text-xs text-gray-400">Financial audits &amp; plan receipts</p>
            </div>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            Exports transaction records, order IDs, subscriber names, plan tiers (Gold/Diamond), and valid until dates.
          </p>

          <div className="pt-2">
            <button
              onClick={handleExportPayments}
              disabled={downloading}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#DB1866] to-[#B81456] hover:from-[#B81456] hover:to-[#9E1048] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-[#DB1866]/20 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" /> Export VIP Transactions (.CSV)
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
