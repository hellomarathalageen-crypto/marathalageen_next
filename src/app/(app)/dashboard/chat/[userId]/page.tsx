"use client";

import { useState, useEffect, useRef, use } from "react";
import Link from "next/link";
import { ChevronLeft, Send, Loader2 } from "lucide-react";

export default function ChatPage({ params }: { params: Promise<{ userId: string }> }) {
  const unwrappedParams = use(params);
  const otherUserId = unwrappedParams.userId;

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [otherUser, setOtherUser] = useState<any>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/chat?userId=${otherUserId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsersInfo = async () => {
    try {
      // Very basic way to get other user profile info. A dedicated API route would be better, but we can reuse /api/profile/[id] logic indirectly or just fetch interests.
      // For now, let's just fetch the interests to find the other user's info since they are our accepted match.
      const res = await fetch('/api/interests?type=accepted');
      if (res.ok) {
        const data = await res.json();
        const match = data.interests.find((i: any) => i.senderId === otherUserId || i.receiverId === otherUserId);
        if (match) {
          const isSender = match.senderId === otherUserId;
          setOtherUser(isSender ? match.sender : match.receiver);
          setCurrentUserId(isSender ? match.receiverId : match.senderId);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersInfo();
    fetchMessages();

    // Polling for new messages every 5 seconds
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [otherUserId]);

  useEffect(() => {
    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);
    const content = newMessage;
    setNewMessage(""); // Optimistically clear input

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId: otherUserId, content })
      });
      if (res.ok) {
        fetchMessages();
      }
    } catch (err) {
      console.error(err);
      setNewMessage(content); // Restore if failed
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-[#DB1866] animate-spin" />
      </div>
    );
  }

  const otherProfile = otherUser?.profile;
  const photo = otherProfile?.photos?.[0]?.url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400";

  return (
    <div className="flex flex-col h-screen pt-16 bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/interests" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          {otherProfile && (
            <Link href={`/profile/${otherProfile.id}`} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                <img src={photo} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="font-bold text-[#2A3773]">{otherProfile.firstName} {otherProfile.lastName}</h2>
                <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-2">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
              <span className="text-2xl">👋</span>
            </div>
            <p className="font-medium text-gray-700">Say hi to {otherProfile?.firstName}!</p>
            <p className="text-sm">You matched, now it's time to break the ice.</p>
          </div>
        ) : (
          messages.map(msg => {
            const isMe = msg.senderId === currentUserId;
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[75%] md:max-w-[60%] px-4 py-2.5 rounded-2xl ${
                    isMe 
                      ? "bg-[#2A3773] text-white rounded-tr-sm" 
                      : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm"
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed break-words">{msg.content}</p>
                  <div className={`text-[10px] mt-1 text-right ${isMe ? "text-blue-200" : "text-gray-400"}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 shrink-0 pb-safe">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 focus:outline-none focus:border-[#DB1866] focus:ring-1 focus:ring-[#DB1866] transition-all"
            disabled={sending}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || sending}
            className="w-12 h-12 shrink-0 bg-[#DB1866] text-white rounded-full flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#B81456] transition-colors"
          >
            {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
}
