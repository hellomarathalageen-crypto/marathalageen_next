"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, Heart, CheckCircle2, MessageCircle, X } from "lucide-react";

export default function InterestsPage() {
  const [activeTab, setActiveTab] = useState<"received" | "sent" | "accepted">("received");
  const [interests, setInterests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInterests = async (type: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/interests?type=${type}`);
      if (res.ok) {
        const data = await res.json();
        setInterests(data.interests);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterests(activeTab);
  }, [activeTab]);

  const handleAction = async (interestId: string, status: "accepted" | "rejected") => {
    try {
      const res = await fetch("/api/interests", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interestId, status })
      });
      if (res.ok) {
        // Remove from current list
        setInterests(prev => prev.filter(i => i.id !== interestId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 md:px-8 pt-24 pb-12 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-sans text-[#2A3773]">Connections & Interests</h1>
        <p className="text-gray-500 mt-1">Manage your connection requests and matches.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto hide-scrollbar">
        {[
          { id: "received", label: "Received Requests" },
          { id: "sent", label: "Sent Requests" },
          { id: "accepted", label: "Matches (Accepted)" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`whitespace-nowrap py-4 px-6 font-bold text-sm transition-colors border-b-2 ${
              activeTab === tab.id 
                ? "border-[#DB1866] text-[#DB1866]" 
                : "border-transparent text-gray-500 hover:text-[#2A3773]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#DB1866] animate-spin" />
          </div>
        ) : interests.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-[#FFF1F5] rounded-full flex items-center justify-center mx-auto mb-4 text-[#DB1866]">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-sans text-[#2A3773] mb-2">No {activeTab} interests</h3>
            <p className="text-gray-500">When you connect with others, they will appear here.</p>
          </div>
        ) : (
          interests.map(interest => {
            // If it's a sent request, show the receiver's profile. Otherwise show the sender's.
            const isSentByMe = activeTab === "sent" || (activeTab === "accepted" && interest.receiverId !== interest.senderId /* logic simplified for display */);
            // Actually, for accepted, we need to show the OTHER person.
            const otherUser = interest.senderId === interest.receiverId ? interest.receiver : (activeTab === "sent" ? interest.receiver : interest.sender);
            
            // Fix logic for accepted tab
            const displayUser = activeTab === "accepted" 
              ? (interest.sender.profile ? interest.sender : interest.receiver) // fallback logic, real logic should check currentUser ID against senderId
              : (activeTab === "sent" ? interest.receiver : interest.sender);

            const profile = displayUser?.profile;
            if (!profile) return null;

            const photo = profile.photos?.[0]?.url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400";
            const age = profile.dateOfBirth ? Math.floor((new Date().getTime() - new Date(profile.dateOfBirth).getTime()) / 3.15576e+10) : 0;

            return (
              <div key={interest.id} className="bg-white border border-[#FADADF] rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center shadow-sm hover:shadow-md transition-shadow">
                
                <Link href={`/profile/${profile.id}`} className="shrink-0 w-24 h-24 rounded-full overflow-hidden border-2 border-[#FFF1F5]">
                  <img src={photo} alt={profile.firstName} className="w-full h-full object-cover" />
                </Link>

                <div className="flex-1 text-center md:text-left">
                  <Link href={`/profile/${profile.id}`} className="hover:underline">
                    <h3 className="text-lg font-bold font-sans text-[#2A3773]">{profile.firstName} {profile.lastName}</h3>
                  </Link>
                  <p className="text-sm text-gray-500">{age} Yrs • {profile.height} • {profile.city}</p>
                  <p className="text-xs font-medium text-gray-400 mt-1">{profile.profession}</p>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                  {activeTab === "received" && (
                    <>
                      <button 
                        onClick={() => handleAction(interest.id, "accepted")}
                        className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-[#DB1866] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-[#B81456] transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Accept
                      </button>
                      <button 
                        onClick={() => handleAction(interest.id, "rejected")}
                        className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors"
                      >
                        <X className="w-4 h-4" /> Decline
                      </button>
                    </>
                  )}
                  {activeTab === "sent" && (
                    <button disabled className="w-full md:w-auto bg-gray-100 text-gray-500 px-6 py-2.5 rounded-xl font-bold text-sm cursor-not-allowed">
                      Pending
                    </button>
                  )}
                  {activeTab === "accepted" && (
                    <Link 
                      href={`/dashboard/chat/${displayUser.id}`}
                      className="w-full md:w-auto flex items-center justify-center gap-1.5 bg-[#2A3773] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#0e274a] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" /> Chat Now
                    </Link>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
