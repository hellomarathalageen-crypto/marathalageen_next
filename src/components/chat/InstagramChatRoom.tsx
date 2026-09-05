"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  Send, Heart, Smile, Image as ImageIcon, Phone, Video, 
  Info, Check, CheckCheck, ChevronLeft, Search, Sparkles, 
  ShieldCheck, Crown, Lock, X, Mic, Calendar, ExternalLink
} from "lucide-react";

// Web Audio API Sound Effects (Instagram-style subtle pop)
function playPopSound(type: "send" | "receive") {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "send") {
      osc.frequency.setValueAtTime(540, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(860, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else {
      osc.frequency.setValueAtTime(750, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1050, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    }
  } catch {
    // AudioContext blocked or not supported
  }
}

interface MessageItem {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  isRead?: boolean;
  isLiked?: boolean;
}

interface ChatContact {
  id: string;
  userId: string;
  name: string;
  photoUrl: string;
  verified: boolean;
  community: string;
  location: string;
  profession: string;
  education: string;
  gotra: string;
  devak: string;
  online: boolean;
  lastSeen?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

const DEFAULT_ICEBREAKERS = [
  "🚩 Pranam! Happy to connect with your family.",
  "📋 Could we exchange verified biodata PDFs?",
  "🔮 Would you be open to Kundali Milan / Gunas check?",
  "☕ Can our families speak on a phone call this weekend?",
];

const EMOJI_LIST = ["❤️", "🙏", "🚩", "💍", "✨", "👍", "💐", "😊", "🌸", "🙌"];

export default function InstagramChatRoom({ initialUserId }: { initialUserId?: string }) {
  const router = useRouter();
  const { data: session } = useSession();
  const currentUserId = (session?.user as any)?.id || "current_user";

  // Conversations Directory
  const [contacts, setContacts] = useState<ChatContact[]>([
    {
      id: "cm1-priya",
      userId: "user_priya_patil",
      name: "Priya Patil",
      photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
      verified: true,
      community: "96 Kuli Maratha",
      location: "Pune, Maharashtra",
      profession: "Senior Software Engineer",
      education: "B.Tech in Computer Science",
      gotra: "Kashyap",
      devak: "Panchpallav",
      online: true,
      lastMessage: "🚩 Pranam! Our family reviewed your profile.",
      lastMessageTime: "2m",
      unreadCount: 1,
    },
    {
      id: "cm2-sneha",
      userId: "user_sneha_deshmukh",
      name: "Sneha Deshmukh",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      verified: true,
      community: "96 Kuli Maratha",
      location: "Belagavi, Karnataka",
      profession: "Clinical Psychologist",
      education: "M.Sc Psychology",
      gotra: "Bharadwaj",
      devak: "Kalamb",
      online: true,
      lastMessage: "Looking forward to speaking with elders.",
      lastMessageTime: "1h",
      unreadCount: 0,
    },
    {
      id: "cm3-pooja",
      userId: "user_pooja_jadhav",
      name: "Pooja Jadhav",
      photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
      verified: true,
      community: "96 Kuli Maratha",
      location: "Bengaluru, Karnataka",
      profession: "Financial Analyst (Goldman Sachs)",
      education: "MBA Finance",
      gotra: "Vasishtha",
      devak: "Suryakant",
      online: false,
      lastSeen: "Active 3h ago",
      lastMessage: "Sent horoscope for 36 Gunas check.",
      lastMessageTime: "Yesterday",
      unreadCount: 0,
    },
  ]);

  const [activeContactId, setActiveContactId] = useState<string>(initialUserId || "user_priya_patil");
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "unread">("all");
  
  // Modals
  const [showInfoDrawer, setShowInfoDrawer] = useState(false);
  const [showCallModal, setShowCallModal] = useState<"audio" | "video" | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Active Contact Record
  const activeContact = contacts.find(c => c.userId === activeContactId || c.id === activeContactId) || contacts[0];

  // Load Accepted Matches from API on mount
  useEffect(() => {
    async function loadMatches() {
      try {
        const res = await fetch("/api/interests?type=accepted");
        if (res.ok) {
          const data = await res.json();
          if (data.interests && data.interests.length > 0) {
            const apiContacts: ChatContact[] = data.interests.map((item: any) => {
              const other = item.senderId === currentUserId ? item.receiver : item.sender;
              const p = other?.profile;
              return {
                id: item.id,
                userId: other?.id || item.senderId,
                name: p ? `${p.firstName} ${p.lastName}`.trim() : other?.name || "Priya Patil",
                photoUrl: p?.photos?.[0]?.url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
                verified: p?.isVerified ?? true,
                community: p?.community || "96 Kuli Maratha",
                location: p?.city ? `${p.city}, ${p.state || "Karnataka"}` : "Pune, Maharashtra",
                profession: p?.profession || "Software Engineer",
                education: p?.education || "Graduate",
                gotra: p?.gotra || "Kashyap",
                devak: p?.devak || "Panchpallav",
                online: true,
                lastMessage: "Mutual interest accepted",
                lastMessageTime: "Just now",
                unreadCount: 0,
              };
            });

            // Merge API contacts with defaults ensuring no duplicate userId
            setContacts(prev => {
              const existingIds = new Set(apiContacts.map(c => c.userId));
              const nonDuplicates = prev.filter(c => !existingIds.has(c.userId));
              return [...apiContacts, ...nonDuplicates];
            });

            if (initialUserId) {
              setActiveContactId(initialUserId);
            } else if (apiContacts.length > 0) {
              setActiveContactId(apiContacts[0].userId);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load contacts:", err);
      }
    }
    loadMatches();
  }, [initialUserId, currentUserId]);

  // Load Messages for Active Contact
  useEffect(() => {
    if (!activeContact) return;

    // Load initial seed messages for realistic Instagram DM feel
    const seedMessages: MessageItem[] = [
      {
        id: "m-1",
        senderId: activeContact.userId,
        receiverId: currentUserId,
        content: `🚩 Pranam! Our family was very happy to see your profile on Maratha Matrimony.`,
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        isRead: true,
      },
      {
        id: "m-2",
        senderId: currentUserId,
        receiverId: activeContact.userId,
        content: `Namaskar ${activeContact.name}! Thank you so much. My parents also reviewed your details and loved your family background.`,
        createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        isRead: true,
        isLiked: true,
      },
      {
        id: "m-3",
        senderId: activeContact.userId,
        receiverId: currentUserId,
        content: `We belong to the ${activeContact.community} (${activeContact.gotra} Gotra, ${activeContact.devak} Devak). Would you be open to exchanging Kundali charts this week?`,
        createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
        isRead: true,
      }
    ];

    setMessages(seedMessages);

    // Fetch live messages from API if available
    async function loadLiveMessages() {
      try {
        const res = await fetch(`/api/chat?userId=${activeContact.userId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages);
          }
        }
      } catch (e) {
        console.error("Chat fetch error:", e);
      }
    }
    loadLiveMessages();
  }, [activeContact?.userId, currentUserId]);

  const chatScrollContainerRef = useRef<HTMLDivElement>(null);

  // Keep window strictly at top on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  // Auto-scroll the inner chat container ONLY (never scrolls the window/page)
  useEffect(() => {
    if (chatScrollContainerRef.current) {
      chatScrollContainerRef.current.scrollTop = chatScrollContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Handle Send Message
  const handleSendMessage = async (customContent?: string) => {
    const textToSend = (customContent || inputText).trim();
    if (!textToSend || !activeContact) return;

    setInputText("");
    setShowEmojiPicker(false);
    playPopSound("send");

    const newMsg: MessageItem = {
      id: `local-${Date.now()}`,
      senderId: currentUserId,
      receiverId: activeContact.userId,
      content: textToSend,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    // Optimistic UI Append
    setMessages(prev => [...prev, newMsg]);

    // Update contacts sidebar preview
    setContacts(prev => prev.map(c => 
      c.userId === activeContact.userId 
        ? { ...c, lastMessage: textToSend, lastMessageTime: "Now" }
        : c
    ));

    // Save to backend API
    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId: activeContact.userId, content: textToSend })
      });
    } catch (e) {
      console.error("API send failed:", e);
    }

    // Realistic Candidate Interactive Auto-Reply (Instagram-style)
    setTimeout(() => {
      setIsTyping(true);
    }, 1200);

    setTimeout(() => {
      setIsTyping(false);
      playPopSound("receive");

      const replies = [
        `🚩 Thank you for your warm message! I shared this with my parents in ${activeContact.location.split(",")[0]}. They are very pleased.`,
        `That sounds wonderful! Our Gotra is ${activeContact.gotra}. We would be glad to arrange a family phone conversation this weekend.`,
        `I appreciate your response! Let me share our verified horoscope details for 36 Gunas matching.`,
        `Auspicious! Our elders will call your family contact number tomorrow evening around 6 PM.`
      ];
      const replyContent = replies[Math.floor(Math.random() * replies.length)];

      const replyMsg: MessageItem = {
        id: `reply-${Date.now()}`,
        senderId: activeContact.userId,
        receiverId: currentUserId,
        content: replyContent,
        createdAt: new Date().toISOString(),
        isRead: true,
      };

      setMessages(prev => [...prev, replyMsg]);
      setContacts(prev => prev.map(c => 
        c.userId === activeContact.userId 
          ? { ...c, lastMessage: replyContent, lastMessageTime: "Now", unreadCount: 0 }
          : c
      ));
    }, 3200);
  };

  // Toggle Heart Reaction on Message (Instagram Double Tap)
  const toggleLikeMessage = (msgId: string) => {
    playPopSound("send");
    setMessages(prev => prev.map(m => 
      m.id === msgId ? { ...m, isLiked: !m.isLiked } : m
    ));
  };

  // Filter Contacts
  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.profession.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === "unread") {
      return matchesSearch && (c.unreadCount || 0) > 0;
    }
    return matchesSearch;
  });

  return (
    <div className="w-full bg-[#FAFAFA] h-[calc(100dvh-4.5rem)] sm:h-[calc(100dvh-5rem)] flex items-center justify-center p-0 sm:p-3 md:p-4 font-sans overflow-hidden">
      
      {/* ── Main Instagram Container ── */}
      <div className="w-full max-w-7xl h-full bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden flex flex-col md:flex-row relative">
        
        {/* ════════════════ LEFT SIDEBAR: THREADS / INBOX ════════════════ */}
        <div className={`w-full md:w-80 lg:w-[380px] border-r border-gray-100 flex flex-col bg-white shrink-0 ${
          activeContactId && "hidden md:flex"
        }`}>
          
          {/* Top User Header */}
          <div className="h-16 px-5 border-b border-gray-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-[#1B2559] tracking-tight">
                {session?.user?.name ? session.user.name.split(" ")[0].toLowerCase() : "rohit_patil"}
              </span>
              <ShieldCheck className="w-4 h-4 text-[#DB1866]" />
            </div>

            <span className="text-[11px] font-bold text-[#DB1866] bg-[#FFF1F5] px-2.5 py-1 rounded-full border border-[#FADADF]">
              Direct DM
            </span>
          </div>

          {/* Search Bar */}
          <div className="p-3 border-b border-gray-100 space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full bg-gray-100/80 focus:bg-white border border-transparent focus:border-[#DB1866] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#1B2559] outline-none transition-all placeholder:text-gray-400 font-medium"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1">
              <button
                onClick={() => setActiveFilter("all")}
                className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                  activeFilter === "all" 
                    ? "bg-[#1B2559] text-white" 
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                All Matches ({contacts.length})
              </button>
              <button
                onClick={() => setActiveFilter("unread")}
                className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                  activeFilter === "unread" 
                    ? "bg-[#DB1866] text-white" 
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                Unread
              </button>
            </div>
          </div>

          {/* Thread Rows */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => {
                const isSelected = activeContact.userId === contact.userId;
                return (
                  <div
                    key={contact.userId}
                    onClick={() => {
                      setActiveContactId(contact.userId);
                      // Clear unread indicator on select
                      setContacts(prev => prev.map(c => c.userId === contact.userId ? { ...c, unreadCount: 0 } : c));
                    }}
                    className={`p-3.5 flex items-center gap-3 cursor-pointer transition-all ${
                      isSelected 
                        ? "bg-[#FFF5F8] border-l-4 border-[#DB1866]" 
                        : "hover:bg-gray-50/80"
                    }`}
                  >
                    {/* Avatar with Story / Online Ring */}
                    <div className="relative shrink-0">
                      <div className="w-13 h-13 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-[#DB1866] to-purple-600">
                        <img
                          src={contact.photoUrl}
                          alt={contact.name}
                          className="w-full h-full rounded-full object-cover border-2 border-white"
                        />
                      </div>
                      {contact.online && (
                        <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#1B2559] truncate">{contact.name}</h4>
                          {contact.verified && (
                            <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 shrink-0 font-medium">
                          {contact.lastMessageTime}
                        </span>
                      </div>

                      <p className="text-[11px] text-gray-500 truncate mt-0.5 font-normal">
                        {contact.lastMessage || `${contact.location} • ${contact.community}`}
                      </p>

                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[9px] font-bold text-[#DB1866] bg-pink-50 px-1.5 py-0.2 rounded">
                          {contact.gotra}
                        </span>
                        <span className="text-[9px] text-gray-400 truncate">
                          {contact.profession}
                        </span>
                      </div>
                    </div>

                    {/* Unread Pill */}
                    {(contact.unreadCount || 0) > 0 && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#DB1866] shrink-0" />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center text-gray-400 p-4">
                <p className="text-xs font-semibold">No direct messages found</p>
              </div>
            )}
          </div>

          {/* Privacy Note at Bottom */}
          <div className="p-3 border-t border-gray-100 bg-[#FFFDFB] flex items-center gap-2 text-[10px] text-gray-500">
            <Lock className="w-3.5 h-3.5 text-[#DB1866] shrink-0" />
            <span className="truncate">End-to-End Private Matrimonial Room</span>
          </div>

        </div>

        {/* ════════════════ RIGHT MAIN: INSTAGRAM CHAT ROOM ════════════════ */}
        <div className={`flex-1 flex flex-col bg-white ${!activeContactId && "hidden md:flex"}`}>
          
          {/* Top Instagram Action Bar */}
          <div className="h-16 px-4 md:px-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white/95 backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
              {/* Mobile Back Button */}
              <button
                onClick={() => router.push("/dashboard/chat")}
                className="md:hidden p-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Back to threads"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Avatar + Status */}
              <div className="relative cursor-pointer" onClick={() => setShowInfoDrawer(true)}>
                <img
                  src={activeContact.photoUrl}
                  alt={activeContact.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                {activeContact.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-extrabold text-[#1B2559] leading-tight hover:text-[#DB1866] cursor-pointer transition-colors" onClick={() => setShowInfoDrawer(true)}>
                    {activeContact.name}
                  </h3>
                  {activeContact.verified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-gray-400 font-medium leading-none mt-0.5 flex items-center gap-1">
                  <span>{activeContact.online ? "Active now" : activeContact.lastSeen || "Offline"}</span>
                  <span>•</span>
                  <span className="text-[#DB1866] font-semibold">{activeContact.community}</span>
                </p>
              </div>
            </div>

            {/* Instagram Header Call & Info Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setShowCallModal("audio")}
                className="p-2 text-gray-600 hover:text-[#DB1866] hover:bg-[#FFF5F8] rounded-full transition-colors"
                title="Phone call with family"
              >
                <Phone className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowCallModal("video")}
                className="p-2 text-gray-600 hover:text-[#DB1866] hover:bg-[#FFF5F8] rounded-full transition-colors"
                title="Virtual family video call"
              >
                <Video className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowInfoDrawer(!showInfoDrawer)}
                className={`p-2 rounded-full transition-colors ${
                  showInfoDrawer 
                    ? "bg-[#FFF5F8] text-[#DB1866]" 
                    : "text-gray-600 hover:text-[#DB1866] hover:bg-gray-100"
                }`}
                title="View lineage & biodata preview"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ── Conversation Stream ── */}
          <div ref={chatScrollContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FFFDFB]/40">
            
            {/* Top Profile Intro (Instagram Style) */}
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-2 border-b border-gray-100/80 mb-4">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-[#DB1866] to-purple-600 shadow-md">
                <img
                  src={activeContact.photoUrl}
                  alt={activeContact.name}
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>

              <div>
                <h2 className="text-base font-extrabold text-[#1B2559] flex items-center justify-center gap-1.5">
                  <span>{activeContact.name}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {activeContact.community} • {activeContact.gotra} Gotra • {activeContact.devak} Devak
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {activeContact.profession} ({activeContact.location})
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setShowInfoDrawer(true)}
                  className="bg-gray-100 hover:bg-gray-200 text-[#1B2559] text-xs font-bold px-4 py-1.5 rounded-full transition-colors"
                >
                  View Profile &amp; Gunas
                </button>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Heart className="w-2.5 h-2.5 fill-emerald-600" /> Mutual Match
                </span>
              </div>
            </div>

            {/* Date Pill */}
            <div className="flex justify-center my-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-100/80 px-3 py-0.5 rounded-full">
                Today
              </span>
            </div>

            {/* Message Stream */}
            {messages.map((msg) => {
              const isMe = msg.senderId === currentUserId;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"} group relative`}
                  onDoubleClick={() => toggleLikeMessage(msg.id)}
                >
                  <div className="flex items-end gap-2 max-w-[82%] sm:max-w-[70%]">
                    {!isMe && (
                      <img
                        src={activeContact.photoUrl}
                        alt=""
                        className="w-7 h-7 rounded-full object-cover shrink-0 mb-1"
                      />
                    )}

                    <div className="relative group/bubble">
                      <div
                        className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed select-text transition-all ${
                          isMe
                            ? "bg-gradient-to-tr from-[#DB1866] via-[#E11D48] to-[#4F46E5] text-white rounded-br-xs shadow-xs"
                            : "bg-[#EFEFEF] text-gray-900 rounded-bl-xs"
                        }`}
                      >
                        <p className="break-words whitespace-pre-wrap">{msg.content}</p>
                      </div>

                      {/* Instagram Heart Reaction Badge */}
                      {msg.isLiked && (
                        <div className="absolute -bottom-2 right-1 bg-white border border-gray-100 shadow-md rounded-full p-0.5 text-xs animate-in zoom-in-50">
                          ❤️
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timestamp & Double Check / Seen */}
                  <div className={`flex items-center gap-1 mt-1 text-[10px] text-gray-400 ${isMe ? "pr-1" : "pl-9"}`}>
                    <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    {isMe && (
                      <span className="text-[#DB1866] flex items-center">
                        <CheckCheck className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <img
                  src={activeContact.photoUrl}
                  alt=""
                  className="w-7 h-7 rounded-full object-cover shrink-0 mb-1"
                />
                <div className="bg-[#EFEFEF] rounded-2xl rounded-bl-xs px-4 py-3 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Quick Cultural Starters Bar (Instagram One-Tap Chips) ── */}
          <div className="px-4 py-2 border-t border-gray-100 bg-white flex gap-2 overflow-x-auto no-scrollbar shrink-0">
            {DEFAULT_ICEBREAKERS.map((ice, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(ice)}
                className="text-[11px] font-semibold text-gray-700 bg-gray-100/90 hover:bg-[#FFF1F5] hover:text-[#DB1866] border border-gray-200 hover:border-[#FADADF] px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all shrink-0 hover:scale-102"
              >
                {ice}
              </button>
            ))}
          </div>

          {/* ── Emoji Tray Drawer ── */}
          {showEmojiPicker && (
            <div className="px-4 py-2 bg-[#FFFDFB] border-t border-gray-100 flex items-center gap-3 overflow-x-auto shrink-0 animate-in slide-in-from-bottom-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Quick:</span>
              {EMOJI_LIST.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    setInputText(prev => prev + emoji);
                    inputRef.current?.focus();
                  }}
                  className="text-lg hover:scale-125 transition-transform p-1"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* ── Bottom Input Capsule (Instagram Direct Style) ── */}
          <div className="p-3 sm:p-4 bg-white border-t border-gray-100 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-gray-100/90 focus-within:bg-white border border-gray-200 focus-within:border-[#DB1866] rounded-full px-4 py-1.5 transition-all shadow-xs"
            >
              {/* Emoji Button */}
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-gray-500 hover:text-[#DB1866] transition-colors p-1"
                title="Choose emoji"
              >
                <Smile className="w-5 h-5" />
              </button>

              {/* Input Field */}
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Message ${activeContact.name}...`}
                className="flex-1 bg-transparent py-2 text-xs sm:text-sm text-[#1B2559] outline-none font-medium placeholder:text-gray-400"
              />

              {/* Action Buttons: Heart when empty, Send when typed (Instagram style!) */}
              {inputText.trim() ? (
                <button
                  type="submit"
                  className="font-bold text-xs sm:text-sm text-[#DB1866] hover:text-[#B81456] px-2 py-1 transition-transform hover:scale-105"
                >
                  Send
                </button>
              ) : (
                <div className="flex items-center gap-1.5 text-gray-500">
                  <button
                    type="button"
                    onClick={() => handleSendMessage("❤️")}
                    className="p-1 hover:text-red-500 hover:scale-115 transition-all"
                    title="Send a quick heart"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* ════════════════ RIGHT SLIDE-OUT: PROFILE & KUNDALI PREVIEW ════════════════ */}
        {showInfoDrawer && (
          <div className="w-full md:w-80 lg:w-96 border-l border-gray-100 bg-[#FFFDFB] flex flex-col absolute md:static inset-y-0 right-0 z-30 shadow-2xl md:shadow-none animate-in slide-in-from-right-4">
            <div className="h-16 px-5 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
              <h3 className="font-extrabold text-sm text-[#1B2559]">Candidate Biodata</h3>
              <button
                onClick={() => setShowInfoDrawer(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Photo & Identity */}
              <div className="text-center space-y-2">
                <img
                  src={activeContact.photoUrl}
                  alt={activeContact.name}
                  className="w-24 h-24 rounded-2xl object-cover mx-auto shadow-md border-2 border-[#DB1866]"
                />
                <h4 className="font-extrabold text-base text-[#1B2559]">{activeContact.name}</h4>
                <p className="text-xs text-gray-500">{activeContact.profession}</p>
                <span className="inline-block bg-[#FFF1F5] text-[#DB1866] text-[11px] font-bold px-3 py-1 rounded-full border border-[#FADADF]">
                  {activeContact.community}
                </span>
              </div>

              {/* Lineage & Horoscope */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-3">
                <h5 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-[#DB1866]" /> Cultural Lineage
                </h5>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Gotra:</span>
                    <span className="font-bold text-[#1B2559]">{activeContact.gotra}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Devak:</span>
                    <span className="font-bold text-[#1B2559]">{activeContact.devak}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Education:</span>
                    <span className="font-bold text-[#1B2559] truncate block">{activeContact.education}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Location:</span>
                    <span className="font-bold text-[#1B2559] truncate block">{activeContact.location}</span>
                  </div>
                </div>
              </div>

              {/* Kundali 36 Gunas Card */}
              <div className="bg-gradient-to-br from-[#FFF5F8] to-indigo-50/50 p-4 rounded-2xl border border-pink-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1B2559] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#DB1866]" /> 36 Gunas Compatibility
                  </span>
                  <span className="text-xs font-black text-[#DB1866]">31 / 36</span>
                </div>
                <p className="text-[11px] text-gray-600">
                  Auspicious alignment between Kashyap and {activeContact.gotra} Gotra with positive Gana match.
                </p>
                <Link
                  href="/kundali"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DB1866] hover:underline pt-1"
                >
                  <span>Open Full Ashtakoot Report</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              {/* Direct Call / Action button */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setShowCallModal("audio")}
                  className="w-full bg-[#1B2559] hover:bg-[#121A3D] text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="w-4 h-4 text-pink-300" />
                  <span>Request Family Phone Call</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── Call / Video Modal ── */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full text-center space-y-4 shadow-2xl border border-gray-100 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-[#FFF1F5] text-[#DB1866] flex items-center justify-center mx-auto shadow-sm">
              {showCallModal === "audio" ? <Phone className="w-8 h-8" /> : <Video className="w-8 h-8" />}
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#1B2559]">
                {showCallModal === "audio" ? "Schedule Family Phone Call" : "Virtual Family Video Meeting"}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Connect directly with {activeContact.name}&apos;s family elders in a verified matrimonial session.
              </p>
            </div>

            <div className="p-3.5 bg-gray-50 rounded-2xl text-xs text-gray-700 space-y-1.5 text-left border border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-400">Candidate:</span>
                <span className="font-bold text-[#1B2559]">{activeContact.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Lineage:</span>
                <span className="font-bold text-[#1B2559]">{activeContact.community} ({activeContact.gotra})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Location:</span>
                <span className="font-bold text-[#1B2559]">{activeContact.location}</span>
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setShowCallModal(null)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleSendMessage(`📞 Hello! I have requested to schedule an auspicious family ${showCallModal === "audio" ? "phone call" : "video session"}. Looking forward to connecting!`);
                  setShowCallModal(null);
                }}
                className="flex-1 py-2.5 bg-[#DB1866] hover:bg-[#B81456] text-white rounded-xl text-xs font-bold transition-colors shadow-md shadow-[#DB1866]/30"
              >
                Send Request in Chat
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
