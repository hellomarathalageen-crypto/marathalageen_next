"use client";

import { useState } from "react";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Ban, 
  AlertTriangle, 
  CheckCircle2, 
  UserX, 
  FileWarning, 
  Lock,
  RefreshCw,
  Eye
} from "lucide-react";

export default function AdminModerationPage() {
  const [reports, setReports] = useState([
    {
      id: "RPT-401",
      candidateName: "Vikram Jadhav",
      email: "vikram.j@tempmail.com",
      gender: "Male",
      reportedBy: "Family of Pooja S.",
      reason: "Suspicious contact phone / Unverified marital status claim",
      riskScore: 82,
      riskLevel: "HIGH",
      submittedAt: "1 hour ago",
      status: "OPEN"
    },
    {
      id: "RPT-402",
      candidateName: "Kunal Shinde",
      email: "kunal.s@example.com",
      gender: "Male",
      reportedBy: "Automated Fraud Shield",
      reason: "Disposable temporary email domain detected during signup",
      riskScore: 74,
      riskLevel: "MEDIUM",
      submittedAt: "3 hours ago",
      status: "OPEN"
    },
    {
      id: "RPT-403",
      candidateName: "Amitabh Kadam",
      email: "amit.kadam@gmail.com",
      gender: "Male",
      reportedBy: "Sneha M.",
      reason: "Commercial matchmaking agent soliciting offline fees",
      riskScore: 91,
      riskLevel: "CRITICAL",
      submittedAt: "1 day ago",
      status: "OPEN"
    }
  ]);

  const [toast, setToast] = useState<string | null>(null);

  const handleAction = (reportId: string, actionName: string) => {
    setReports(prev => prev.filter(r => r.id !== reportId));
    setToast(`Action applied: ${actionName}`);
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-[#121A3D] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Trust &amp; Safety Sentinel
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">
            Member Safety &amp; Fraud Moderation
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Investigate suspicious activities, reported profiles, and disposable account patterns.
          </p>
        </div>

        <div className="bg-red-50 text-red-700 px-4 py-2 rounded-xl text-xs font-bold border border-red-200 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span>{reports.length} Active Flags</span>
        </div>
      </div>

      {/* Safety Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Flagged Incidents</span>
          <p className="text-3xl font-extrabold text-red-600 mt-2">{reports.length}</p>
          <p className="text-xs text-gray-500 font-medium mt-1">Requiring immediate moderator review</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Automated Bot Blocks</span>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">148</p>
          <p className="text-xs text-gray-500 font-medium mt-1">Blocked by rate-limiter &amp; CAPTCHA in last 30d</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Community Trust Index</span>
          <p className="text-3xl font-extrabold text-[#1B2559] mt-2">99.4%</p>
          <p className="text-xs text-gray-500 font-medium mt-1">Verified legitimate family profiles</p>
        </div>
      </div>

      {/* Flagged Profiles Queue */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-extrabold text-[#1B2559] text-base">Open Moderation Cases</h2>
          <span className="text-xs text-gray-400">Click to action or suspend</span>
        </div>

        {reports.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {reports.map((report) => (
              <div key={report.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                      report.riskLevel === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                      report.riskLevel === 'HIGH' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {report.riskLevel} RISK ({report.riskScore}%)
                    </span>
                    <span className="text-xs text-gray-400">• {report.submittedAt}</span>
                  </div>

                  <h3 className="font-extrabold text-base text-[#1B2559] pt-1">
                    {report.candidateName} <span className="text-xs text-gray-400 font-mono font-normal">({report.email})</span>
                  </h3>

                  <p className="text-xs text-red-700 bg-red-50 p-2 rounded-xl border border-red-200/60 font-medium">
                    <span className="font-bold">Report:</span> {report.reason}
                  </p>

                  <p className="text-[11px] text-gray-500">
                    Flagged by: <span className="font-bold text-gray-700">{report.reportedBy}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleAction(report.id, `Cleared flag on ${report.candidateName}`)}
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Dismiss Flag</span>
                  </button>

                  <button
                    onClick={() => handleAction(report.id, `Account permanently suspended for ${report.candidateName}`)}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    <span>Suspend User</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 text-center text-gray-400">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <p className="font-bold text-sm text-[#1B2559]">Zero Safety Violations</p>
            <p className="text-xs text-gray-500">No open member reports or fraud alerts detected.</p>
          </div>
        )}
      </div>

    </div>
  );
}
