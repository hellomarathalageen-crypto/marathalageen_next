"use client";

import { Check, X, AlertCircle, FileText, ZoomIn } from "lucide-react";

const MOCK_APPROVALS = [
  { 
    id: "APP-101", 
    name: "Karan Shinde", 
    age: 28, 
    city: "Pune, MH", 
    submitted: "2 hours ago",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    idDoc: "Aadhaar Card",
    risk: "Low"
  },
  { 
    id: "APP-102", 
    name: "Sneha Patil", 
    age: 25, 
    city: "Mumbai, MH", 
    submitted: "5 hours ago",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    idDoc: "Passport",
    risk: "Low"
  },
  { 
    id: "APP-103", 
    name: "Vikram Desai", 
    age: 32, 
    city: "Bangalore, KA", 
    submitted: "1 day ago",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    idDoc: "Driving License",
    risk: "High"
  },
];

export default function AdminApprovals() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2A3773]">Profile Approvals</h1>
          <p className="text-gray-500 text-sm mt-1">Review government IDs and profile photos to ensure platform trust.</p>
        </div>
        <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> 142 Profiles Pending
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_APPROVALS.map((profile) => (
          <div key={profile.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400">ID: {profile.id}</span>
                {profile.risk === 'High' && (
                  <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">High Risk</span>
                )}
              </div>
              <span className="text-xs font-bold text-gray-400">{profile.submitted}</span>
            </div>
            
            {/* Body */}
            <div className="p-4 flex-1">
              <div className="flex gap-4">
                <div className="relative group cursor-pointer">
                  <img src={profile.photo} alt={profile.name} className="w-24 h-24 rounded-xl object-cover border border-gray-200" />
                  <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-[#2A3773] text-lg">{profile.name}</h3>
                  <p className="text-sm text-gray-500">{profile.age} Yrs • {profile.city}</p>
                  
                  <div className="mt-3 flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <FileText className="w-4 h-4 text-blue-500" /> {profile.idDoc}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-red-200 text-red-600 font-bold py-2.5 rounded-xl hover:bg-red-50 transition-colors shadow-sm">
                <X className="w-4 h-4" /> Reject
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold py-2.5 rounded-xl hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-500/20">
                <Check className="w-4 h-4" /> Approve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
