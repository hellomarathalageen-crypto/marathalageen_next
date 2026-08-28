"use client";

import { Users, CreditCard, Activity, ArrowUpRight, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function AdminDashboard() {
  const kpis = [
    { label: "Total Users", value: "24,592", trend: "+12%", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Premium Members", value: "3,210", trend: "+5%", icon: CreditCard, color: "text-pink-600", bg: "bg-pink-100" },
    { label: "Active Today", value: "8,432", trend: "+18%", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Pending Approvals", value: "142", trend: "-2%", icon: ShieldAlert, color: "text-amber-600", bg: "bg-amber-100" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2A3773]">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, Aditya. Here's what's happening today.</p>
        </div>
        <button className="bg-[#2A3773] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-[#112a4d] transition-all">
          Download Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.bg}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <span className="flex items-center text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-3 h-3 mr-1" /> {kpi.trend}
              </span>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-bold mb-1">{kpi.label}</h3>
              <p className="text-3xl font-bold text-[#0F172A]">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area (Mocked) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-[#2A3773] text-lg">Revenue Growth</h2>
            <select className="bg-gray-50 border border-gray-200 text-sm font-bold text-gray-600 rounded-lg px-3 py-1.5 outline-none">
              <option>This Year</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="flex-1 flex items-end gap-2 sm:gap-4 mt-4 h-64">
            {/* Mock Chart Bars */}
            {[40, 60, 45, 80, 55, 90, 75, 100, 85, 110, 95, 120].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end group">
                <div 
                  className="w-full bg-[#2A3773]/20 group-hover:bg-[#DB1866] transition-colors rounded-t-sm relative"
                  style={{ height: `${h}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded transition-opacity">
                    ${h}k
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="font-bold text-[#2A3773] text-lg mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {[
              { title: "New Premium Member", desc: "Pooja S. upgraded to Gold Plan", time: "2 mins ago", icon: CreditCard, color: "bg-pink-100 text-pink-600" },
              { title: "Profile Approved", desc: "Rahul D. ID verification passed", time: "15 mins ago", icon: CheckCircle2, color: "bg-emerald-100 text-emerald-600" },
              { title: "Profile Reported", desc: "Fake profile reported by 3 users", time: "1 hour ago", icon: ShieldAlert, color: "bg-red-100 text-red-600" },
              { title: "New Registration", desc: "Sneha M. joined the platform", time: "3 hours ago", icon: Users, color: "bg-blue-100 text-blue-600" },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.color}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F172A]">{activity.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{activity.desc}</p>
                  <p className="text-[10px] font-bold text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-bold text-[#2A3773] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
