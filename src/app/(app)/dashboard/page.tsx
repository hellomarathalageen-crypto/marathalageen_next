"use client";

import Link from "next/link";
import { 
  Bell, Heart, Eye, CheckCircle2, ChevronRight, MessageCircle, Star, Sparkles
} from "lucide-react";
import ProfileCard from "@/components/ui/ProfileCard";

const recentMatches = [
  { id: 1, name: "Priyanka S.", age: 27, height: "5'4\"", city: "Bangalore", education: "B.E. (IT)", profession: "Software Engineer", matchPercent: 92, isVerified: true, photo: "https://i.pravatar.cc/300?img=1" },
  { id: 2, name: "Sakshi P.", age: 25, height: "5'3\"", city: "Mysore", education: "B.E. (Mech)", profession: "Software Engineer", matchPercent: 89, isVerified: true, photo: "https://i.pravatar.cc/300?img=2" },
  { id: 3, name: "Rutuja K.", age: 28, height: "5'5\"", city: "Pune", education: "CA", profession: "Auditor", matchPercent: 87, isVerified: true, photo: "https://i.pravatar.cc/300?img=3" },
];

export default function UserDashboard() {
  return (
    <div className="bg-[#FFF1F5] min-h-screen py-8">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8 bg-white p-6 rounded-2xl border border-[#FADADF] shadow-sm">
          <div className="relative">
            <img src="https://i.pravatar.cc/300?img=11" alt="User" className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover" />
            <div className="absolute bottom-0 right-0 bg-[#F34883] p-1.5 rounded-full border-2 border-white">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold font-serif text-[#173F73] mb-1">Welcome back, Aditya!</h1>
            <p className="text-sm text-gray-500 mb-3">Profile ID: MM987654 | Profile Completeness: <strong className="text-green-500">85%</strong></p>
            <div className="w-full bg-gray-100 rounded-full h-2 max-w-sm mx-auto md:mx-0">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className="shrink-0 flex gap-3 w-full md:w-auto">
            <Link href="/profile/edit" className="flex-1 md:flex-none text-center bg-white border border-[#FADADF] hover:border-[#F34883] text-[#173F73] px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors">
              Edit Profile
            </Link>
            <Link href="/membership" className="flex-1 md:flex-none text-center flex items-center justify-center gap-1.5 bg-[#F34883] hover:bg-[#d93870] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm shadow-[#F34883]/30 transition-all">
              <Sparkles className="w-4 h-4" /> Upgrade
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left / Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Pending Interests", value: "12", icon: Heart, color: "#F34883", bg: "#FFF1F5" },
                { label: "Profile Views", value: "48", icon: Eye, color: "#173F73", bg: "#E8F0FE" },
                { label: "Shortlisted Me", value: "05", icon: Star, color: "#F59E0B", bg: "#FEF3C7" },
                { label: "Unread Msgs", value: "02", icon: MessageCircle, color: "#10B981", bg: "#D1FAE5" },
              ].map((stat) => (
                <Link href="#" key={stat.label} className="bg-white rounded-2xl p-4 border border-[#FADADF] hover:shadow-md transition-shadow text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: stat.bg, color: stat.color }}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-black text-[#173F73] leading-none mb-1">{stat.value}</p>
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                </Link>
              ))}
            </div>

            {/* New Matches */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold font-serif text-[#173F73]">New Matches For You</h2>
                <Link href="/matches" className="text-sm font-semibold text-[#F34883] hover:underline flex items-center">
                  See All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recentMatches.map(p => (
                  <ProfileCard key={p.id} {...p} variant="grid" />
                ))}
              </div>
            </div>

            {/* Premium Banner */}
            <div className="bg-[#173F73] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <div className="relative z-10 max-w-md text-center md:text-left">
                <h3 className="text-xl font-bold font-serif mb-2">Connect Directly with Premium!</h3>
                <p className="text-sm text-blue-200 leading-relaxed">Upgrade to view contact numbers, send direct messages, and rank higher in search results.</p>
              </div>
              <Link href="/membership" className="relative z-10 shrink-0 bg-[#F34883] hover:bg-[#d93870] text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-[#F34883]/30 transition-all hover:-translate-y-0.5">
                View Plans
              </Link>
            </div>
            
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-[#FADADF] p-5">
              <h3 className="text-base font-bold text-[#173F73] mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#F34883]" /> Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  { title: "Snehal P. viewed your profile", time: "2 hours ago", icon: Eye, color: "text-blue-500", bg: "bg-blue-50" },
                  { title: "Rutuja K. accepted your interest", time: "5 hours ago", icon: Heart, color: "text-[#F34883]", bg: "bg-[#FFF1F5]" },
                  { title: "You have a new message", time: "1 day ago", icon: MessageCircle, color: "text-green-500", bg: "bg-green-50" },
                ].map((act, i) => (
                  <div key={i} className="flex gap-3 items-start border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${act.bg}`}>
                      <act.icon className={`w-4 h-4 ${act.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 leading-tight mb-0.5">{act.title}</p>
                      <p className="text-[10px] text-gray-400">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 border border-[#FADADF] rounded-lg text-xs font-semibold text-[#173F73] hover:bg-[#FFF1F5] transition-colors">
                View All Notifications
              </button>
            </div>

            {/* Profile Completion Tips */}
            <div className="bg-white rounded-2xl border border-[#FADADF] p-5">
              <h3 className="text-base font-bold text-[#173F73] mb-4">Complete Your Profile</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-gray-500 line-through">Add Basic Details</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-gray-500 line-through">Upload Photo</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />
                  <span className="text-gray-800 font-semibold text-[#173F73]">Verify Government ID</span>
                  <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold ml-auto">+10%</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />
                  <span className="text-gray-800 font-semibold text-[#173F73]">Add Horoscope</span>
                  <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold ml-auto">+5%</span>
                </li>
              </ul>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
}
