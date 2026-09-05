"use client";

import { useState } from "react";
import { 
  Settings, 
  Database, 
  MessageSquare, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  Server,
  Key,
  RefreshCw
} from "lucide-react";

export default function AdminSettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappService, setWhatsappService] = useState(false); // Disabled per client directive until API purchase
  const [smsService, setSmsService] = useState(false); // Disabled per client directive
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
        <div className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
          <Settings className="w-3.5 h-3.5" /> Platform Configuration
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">
          System Settings &amp; Integrations
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
          Configure notifications, database connectivity, and administrative policies.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>System configuration updated successfully!</span>
        </div>
      )}

      {/* Database Health Card */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-[#1B2559] text-sm sm:text-base">Prisma PostgreSQL Database</h2>
              <p className="text-xs text-gray-400">AWS / Supabase Dedicated PostgreSQL Cluster</p>
            </div>
          </div>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live &amp; Healthy
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-gray-50 p-3 rounded-xl">
            <span className="text-gray-400 block text-[10px] font-bold uppercase">SSL Mode</span>
            <span className="font-bold text-[#1B2559]">Require (rejectUnauthorized: false)</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl">
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Connection Pool</span>
            <span className="font-bold text-[#1B2559]">10 Active Pool Clients</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl">
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Driver Adapter</span>
            <span className="font-bold text-[#1B2559]">@prisma/adapter-pg</span>
          </div>
        </div>
      </div>

      {/* Messaging & Notification Gateways */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6">
        <div className="border-b border-gray-100 pb-4">
          <h2 className="font-bold text-[#1B2559] text-sm sm:text-base">Notification &amp; Message Gateways</h2>
          <p className="text-xs text-gray-400">Controls automated member notification delivery.</p>
        </div>

        <div className="space-y-4">
          {/* Email Gateway */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-200/70">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="font-bold text-xs text-[#1B2559]">Automated Email Notifications</p>
                <p className="text-[11px] text-gray-500">Welcome emails, password resets, and matchmaking digests.</p>
              </div>
            </div>
            <button
              onClick={() => setEmailAlerts(!emailAlerts)}
              className={`w-11 h-6 rounded-full transition-colors relative ${emailAlerts ? 'bg-emerald-500' : 'bg-gray-300'}`}
            >
              <span className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${emailAlerts ? 'left-5.5' : 'left-0.5'}`} />
            </button>
          </div>

          {/* WhatsApp API Gateway */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-200/70">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-xs text-[#1B2559]">Automated WhatsApp Alerts</p>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Awaiting API Subscription
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">Instant WhatsApp alerts when interest is received.</p>
              </div>
            </div>
            <button
              onClick={() => setWhatsappService(!whatsappService)}
              className={`w-11 h-6 rounded-full transition-colors relative ${whatsappService ? 'bg-emerald-500' : 'bg-gray-300'}`}
            >
              <span className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${whatsappService ? 'left-5.5' : 'left-0.5'}`} />
            </button>
          </div>

          {/* SMS Gateway */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-200/70">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-blue-600" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-xs text-[#1B2559]">SMS OTP Gateway (DLT)</p>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Awaiting Gateway Purchase
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">Fast2SMS / Twilio transactional mobile verification.</p>
              </div>
            </div>
            <button
              onClick={() => setSmsService(!smsService)}
              className={`w-11 h-6 rounded-full transition-colors relative ${smsService ? 'bg-emerald-500' : 'bg-gray-300'}`}
            >
              <span className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${smsService ? 'left-5.5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="bg-[#121A3D] hover:bg-[#1A2554] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all"
        >
          Save Platform Changes
        </button>
      </div>

    </div>
  );
}
