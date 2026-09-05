"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  Trash2, 
  Eye, 
  Check, 
  X, 
  RefreshCw, 
  Crown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  Briefcase,
  GraduationCap
} from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all, verified, pending, admin
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  // Selected user for quick preview modal
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        search,
        filter,
        page: page.toString(),
        limit: "15"
      });
      const res = await fetch(`/api/admin/users?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
        setTotalPages(data.totalPages || 1);
        setTotalCount(data.totalCount || 0);
      }
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  }, [search, filter, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Toggle user verification
  const handleToggleVerification = async (userId: string, currentStatus: boolean) => {
    try {
      setActionLoading(userId);
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, isVerified: !currentStatus })
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, isVerified: !currentStatus } : u));
        if (selectedUser?.id === userId) {
          setSelectedUser((prev: any) => ({ ...prev, isVerified: !currentStatus }));
        }
      }
    } catch (err) {
      console.error("Failed to toggle verification:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId: string, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete ${name}? This action cannot be undone.`)) {
      return;
    }

    try {
      setActionLoading(userId);
      const res = await fetch(`/api/admin/users?userId=${userId}`, { method: "DELETE" });
      if (res.ok) {
        setUsers(prev => prev.filter(u => u.id !== userId));
        setTotalCount(prev => prev - 1);
        if (selectedUser?.id === userId) setSelectedUser(null);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete user");
      }
    } catch (err) {
      console.error("Failed to delete user:", err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#FFF1F5] text-[#DB1866] text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Crown className="w-3.5 h-3.5 fill-[#DB1866]" /> Member Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">
            Registered Members
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Total of {totalCount} members registered in the database. Manage verification and roles.
          </p>
        </div>

        <button 
          onClick={fetchUsers} 
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-[#1B2559] px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row justify-between gap-4 items-center">
        
        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {[
            { id: "all", label: "All Members" },
            { id: "verified", label: "Verified Only" },
            { id: "pending", label: "Pending Verification" },
            { id: "admin", label: "Administrators" }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => { setFilter(t.id); setPage(1); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === t.id 
                  ? 'bg-[#121A3D] text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search name, email, city..."
            className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#DB1866] focus:bg-white transition-all font-medium text-[#1B2559]"
          />
        </div>

      </div>

      {/* Members Data Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                <th className="py-3.5 px-6">Member Profile</th>
                <th className="py-3.5 px-4">Gender &amp; Location</th>
                <th className="py-3.5 px-4">Profession &amp; Education</th>
                <th className="py-3.5 px-4">Plan / Role</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-6 text-right">Quick Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-50 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-gray-400 font-medium">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#DB1866]" />
                    <span>Loading real database profiles...</span>
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-[#FFFDF9] transition-colors group">
                    
                    {/* User Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {user.photo ? (
                          <img 
                            src={user.photo} 
                            alt={user.name} 
                            className="w-10 h-10 rounded-xl object-cover border border-gray-200 shrink-0" 
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-gray-100 text-[#1B2559] flex items-center justify-center font-bold text-sm shrink-0">
                            {user.name.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-[#1B2559] text-sm truncate flex items-center gap-1.5">
                            <span>{user.name}</span>
                            {user.isVerified && (
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            )}
                          </p>
                          <p className="text-[11px] text-gray-500 truncate font-mono">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Gender & Location */}
                    <td className="py-4 px-4 text-gray-600">
                      <p className="font-bold text-[#1B2559]">{user.gender}</p>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" /> {user.city}
                      </p>
                    </td>

                    {/* Profession & Education */}
                    <td className="py-4 px-4 text-gray-600">
                      <p className="font-bold text-[#1B2559] truncate max-w-[160px]">{user.profession}</p>
                      <p className="text-[11px] text-gray-500 truncate max-w-[160px]">{user.education}</p>
                    </td>

                    {/* Plan / Role */}
                    <td className="py-4 px-4">
                      {user.role === "ADMIN" ? (
                        <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                          SUPER ADMIN
                        </span>
                      ) : (
                        <span className="bg-pink-50 text-[#DB1866] text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-200">
                          {user.plan || "FREE MEMBER"}
                        </span>
                      )}
                    </td>

                    {/* Status Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleVerification(user.id, user.isVerified)}
                        disabled={actionLoading === user.id}
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                          user.isVerified 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200' 
                            : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200'
                        }`}
                      >
                        {user.isVerified ? (
                          <>
                            <Check className="w-3 h-3" /> Verified
                          </>
                        ) : (
                          <>
                            <ShieldAlert className="w-3 h-3" /> Unverified
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedUser(user)}
                          title="Preview full profile"
                          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        
                        {user.role !== "ADMIN" && (
                          <button
                            onClick={() => handleDeleteUser(user.id, user.name)}
                            disabled={actionLoading === user.id}
                            title="Delete user"
                            className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    No members found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <p>
            Showing Page <span className="font-bold text-[#1B2559]">{page}</span> of{" "}
            <span className="font-bold text-[#1B2559]">{totalPages}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* ── User Quick Biodata Preview Modal ── */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 text-[#1B2559] shadow-2xl border border-gray-100 space-y-5 relative">
            <button 
              onClick={() => setSelectedUser(null)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3.5 border-b border-gray-100 pb-4">
              {selectedUser.photo ? (
                <img 
                  src={selectedUser.photo} 
                  alt={selectedUser.name} 
                  className="w-14 h-14 rounded-2xl object-cover border border-gray-200"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center font-bold text-xl text-[#1B2559]">
                  {selectedUser.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="font-extrabold text-lg">{selectedUser.name}</h3>
                <p className="text-xs text-gray-500 font-mono">{selectedUser.email}</p>
                <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  selectedUser.isVerified ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {selectedUser.isVerified ? 'ID Verified ✅' : 'Pending Verification ⚠️'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-400 block mb-0.5 text-[10px] font-bold uppercase">Gender</span>
                <span className="font-bold">{selectedUser.gender}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-400 block mb-0.5 text-[10px] font-bold uppercase">Location</span>
                <span className="font-bold">{selectedUser.city}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-400 block mb-0.5 text-[10px] font-bold uppercase">Education</span>
                <span className="font-bold truncate block">{selectedUser.education}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-400 block mb-0.5 text-[10px] font-bold uppercase">Profession</span>
                <span className="font-bold truncate block">{selectedUser.profession}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => handleToggleVerification(selectedUser.id, selectedUser.isVerified)}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors ${
                  selectedUser.isVerified 
                    ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200' 
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {selectedUser.isVerified ? "Revoke Verification" : "Mark as Verified"}
              </button>
              
              {selectedUser.profileId && (
                <a
                  href={`/profile/${selectedUser.profileId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl font-bold text-xs bg-gray-100 hover:bg-gray-200 text-[#1B2559] flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View Public Profile
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
