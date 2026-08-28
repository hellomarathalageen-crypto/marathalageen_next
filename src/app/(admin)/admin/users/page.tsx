"use client";

import { useState } from "react";
import { Search, Filter, MoreVertical, ShieldCheck, Ban, Edit, Mail, Eye } from "lucide-react";

const MOCK_USERS = [
  { id: "USR-001", name: "Rahul Deshmukh", email: "rahul.d@example.com", joined: "2024-03-12", status: "Active", plan: "Premium", verified: true },
  { id: "USR-002", name: "Sneha Patil", email: "sneha.p@example.com", joined: "2024-03-14", status: "Active", plan: "Free", verified: true },
  { id: "USR-003", name: "Karan Shinde", email: "karan.s@example.com", joined: "2024-03-15", status: "Pending", plan: "Free", verified: false },
  { id: "USR-004", name: "Pooja Kadam", email: "pooja.k@example.com", joined: "2024-03-15", status: "Suspended", plan: "Free", verified: false },
  { id: "USR-005", name: "Amit Pawar", email: "amit.p@example.com", joined: "2024-03-16", status: "Active", plan: "Gold", verified: true },
];

export default function AdminUsers() {
  const [activeTab, setActiveTab] = useState("All Users");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2A3773]">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and monitor all registered members.</p>
        </div>
        <button className="bg-[#DB1866] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-[#B81456] transition-all">
          + Add User Manually
        </button>
      </div>

      {/* Filters & Tabs */}
      <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-1 bg-gray-50 p-1 rounded-lg">
          {["All Users", "Premium", "Pending Verification", "Suspended"].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${
                activeTab === tab ? 'bg-white text-[#2A3773] shadow-sm' : 'text-gray-500 hover:text-[#2A3773]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 px-2">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 focus-within:border-[#2A3773] transition-colors">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="bg-transparent border-none outline-none text-sm w-48 font-medium"
            />
          </div>
          <button className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 hover:text-[#2A3773] hover:bg-gray-100 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">User</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Plan</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Joined Date</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 flex items-center justify-center font-bold text-white">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-[#0F172A] text-sm">{user.name}</p>
                          {user.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />}
                        </div>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider ${
                      user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                      user.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-sm font-bold ${user.plan !== 'Free' ? 'text-[#DB1866]' : 'text-gray-500'}`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 font-medium">
                    {user.joined}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 bg-blue-50 rounded-md transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-emerald-600 bg-emerald-50 rounded-md transition-colors"><Edit className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 bg-red-50 rounded-md transition-colors"><Ban className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing <span className="font-bold text-[#0F172A]">1</span> to <span className="font-bold text-[#0F172A]">5</span> of <span className="font-bold text-[#0F172A]">24,592</span> entries</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded-md text-sm font-bold text-gray-400 cursor-not-allowed">Prev</button>
            <button className="px-3 py-1 bg-[#2A3773] rounded-md text-sm font-bold text-white">1</button>
            <button className="px-3 py-1 hover:bg-gray-50 rounded-md text-sm font-bold text-gray-600">2</button>
            <button className="px-3 py-1 hover:bg-gray-50 rounded-md text-sm font-bold text-gray-600">3</button>
            <button className="px-3 py-1 border border-gray-200 rounded-md text-sm font-bold text-[#2A3773] hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
