"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Crown, 
  CheckCircle2, 
  Ticket, 
  QrCode, 
  Printer, 
  ArrowRight,
  ExternalLink,
  Sparkles,
  X
} from "lucide-react";

interface MelavaEvent {
  id: string;
  title: string;
  regionalTitle: string;
  city: string;
  state: string;
  date: string;
  time: string;
  venue: string;
  expectedProfiles: string;
  entryFee: string;
  status: "Registrations Open" | "Filling Fast" | "Upcoming";
  image: string;
}

const MELAVA_EVENTS: MelavaEvent[] = [
  {
    id: "EVT-BLG-2026",
    title: "Maha Vadhu-Var Melava Belagavi 2026",
    regionalTitle: "भव्य ९६ कुळी मराठा वधू-वर मेळावा बेळगाव",
    city: "Belagavi",
    state: "Karnataka",
    date: "Sunday, 22 March 2026",
    time: "9:00 AM - 5:00 PM IST",
    venue: "Shivaji Garden Kalyan Mantap, Congress Road, Tilakwadi, Belagavi",
    expectedProfiles: "1,200+ Verified Candidates",
    entryFee: "Free for Registered Members",
    status: "Registrations Open",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "EVT-PUN-2026",
    title: "Pune State Maratha Matrimonial Conclave",
    regionalTitle: "पुणे राज्यस्तरीय मराठा विवाह संमेलन",
    city: "Pune",
    state: "Maharashtra",
    date: "Sunday, 12 April 2026",
    time: "9:30 AM - 6:00 PM IST",
    venue: "Ganesh Kala Krida Manch, Swargate, Pune",
    expectedProfiles: "2,500+ Engineers, Doctors & Govt Officers",
    entryFee: "Free Entry with Pre-Registration",
    status: "Filling Fast",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "EVT-KOL-2026",
    title: "Kolhapur Royal Vadhu-Var Parichay",
    regionalTitle: "कोल्हापूर राजर्षी शाहू वधू-वर परिचय मेळावा",
    city: "Kolhapur",
    state: "Maharashtra",
    date: "Sunday, 3 May 2026",
    time: "10:00 AM - 4:30 PM IST",
    venue: "Mahalaxmi Dharmashala Auditorium, Bhavani Mandap, Kolhapur",
    expectedProfiles: "900+ Traditional Families",
    entryFee: "Free Pass",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "EVT-BLR-2026",
    title: "Bengaluru Maratha Tech & NRI Meet",
    regionalTitle: "बंगळुरू मराठा प्रोफेशनल्स वधू-वर संमेलन",
    city: "Bengaluru",
    state: "Karnataka",
    date: "Sunday, 24 May 2026",
    time: "10:00 AM - 3:00 PM IST",
    venue: "Chhatrapati Shivaji Convention Hall, Rajajinagar, Bengaluru",
    expectedProfiles: "650+ IT Professionals & Entrepreneurs",
    entryFee: "Free Entry",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
  }
];

export default function MelavaEventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<MelavaEvent | null>(null);
  const [passData, setPassData] = useState<any>(null);
  const [candidateName, setCandidateName] = useState("Rohit Ramesh Patil");
  const [candidateCity, setCandidateCity] = useState("Belagavi");
  const [mobileNumber, setMobileNumber] = useState("+91 98220 12345");
  const [attendeeCount, setAttendeeCount] = useState("2 Family Members");

  const handleGeneratePass = (e: React.FormEvent) => {
    e.preventDefault();
    setPassData({
      passId: `ML-PASS-${Math.floor(Math.random() * 900000 + 100000)}`,
      candidateName,
      candidateCity,
      mobileNumber,
      attendeeCount,
      event: selectedEvent
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] pt-8 pb-16 font-sans">
      <div className="container mx-auto max-w-6xl px-4 md:px-8 space-y-8">
        
        {/* Top Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[#FFF1F5] text-[#DB1866] text-xs font-bold px-3.5 py-1 rounded-full border border-[#FADADF]">
            <Crown className="w-3.5 h-3.5 fill-[#DB1866]" /> Official Community Gatherings
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B2559] tracking-tight">
            Vadhu-Var Melavas &amp; Meets
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            Meet verified 96 Kuli Maratha families face-to-face at organized regional conclaves across Karnataka &amp; Maharashtra.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MELAVA_EVENTS.map((event) => (
            <div 
              key={event.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Event Photo Header */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold text-[#1B2559] shadow-sm">
                    {event.city}, {event.state}
                  </div>

                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-extrabold shadow-sm ${
                    event.status === 'Registrations Open' ? 'bg-emerald-500 text-white' :
                    event.status === 'Filling Fast' ? 'bg-amber-500 text-white' :
                    'bg-blue-600 text-white'
                  }`}>
                    {event.status}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg font-extrabold leading-snug">{event.title}</h3>
                    <p className="text-xs text-pink-300 font-medium">{event.regionalTitle}</p>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-5 space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2 bg-[#FFFDF9] p-3 rounded-2xl border border-amber-200/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold block">Date</span>
                        <span className="font-bold text-[#1B2559]">{event.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold block">Time</span>
                        <span className="font-bold text-[#1B2559]">{event.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-gray-600 pt-1">
                    <MapPin className="w-4 h-4 text-[#DB1866] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{event.venue}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-gray-100">
                    <span className="font-bold text-gray-500 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-blue-600" /> {event.expectedProfiles}
                    </span>
                    <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {event.entryFee}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
                <button
                  onClick={() => { setSelectedEvent(event); setPassData(null); }}
                  className="w-full py-2.5 rounded-xl bg-[#DB1866] hover:bg-[#B81456] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#DB1866]/20"
                >
                  <Ticket className="w-4 h-4" /> Book Free Family Entry Pass
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* ── Booking & Pass Generation Modal ── */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 text-[#1B2559] shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!passData ? (
              <form onSubmit={handleGeneratePass} className="space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <span className="bg-pink-50 text-[#DB1866] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    Melava RSVP Entry Pass
                  </span>
                  <h3 className="font-extrabold text-lg text-[#1B2559] mt-1">{selectedEvent.title}</h3>
                  <p className="text-xs text-gray-500">{selectedEvent.date} • {selectedEvent.venue}</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Registered Candidate Name:</label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    required
                    className="w-full h-10 px-3 border border-gray-200 rounded-xl text-xs font-bold text-[#1B2559] focus:outline-none focus:border-[#DB1866]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Native / Current City:</label>
                  <input
                    type="text"
                    value={candidateCity}
                    onChange={(e) => setCandidateCity(e.target.value)}
                    required
                    className="w-full h-10 px-3 border border-gray-200 rounded-xl text-xs font-bold text-[#1B2559] focus:outline-none focus:border-[#DB1866]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">WhatsApp Mobile for SMS Pass:</label>
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                    className="w-full h-10 px-3 border border-gray-200 rounded-xl text-xs font-bold text-[#1B2559] focus:outline-none focus:border-[#DB1866]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Number of Attending Family Members:</label>
                  <select
                    value={attendeeCount}
                    onChange={(e) => setAttendeeCount(e.target.value)}
                    className="w-full h-10 px-3 border border-gray-200 rounded-xl text-xs font-bold text-[#1B2559] bg-gray-50 outline-none"
                  >
                    <option value="1 Candidate Only">1 Person (Candidate Only)</option>
                    <option value="2 Family Members">2 Persons (Candidate + Parent)</option>
                    <option value="3-4 Family Members">3-4 Persons (Full Family Delegation)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-[#DB1866] hover:bg-[#B81456] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Ticket className="w-4 h-4" /> Issue Official Entry Pass
                </button>
              </form>
            ) : (
              /* ── Digital Pass Display ── */
              <div className="space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                
                <h3 className="font-extrabold text-xl text-[#1B2559]">Entry Pass Confirmed!</h3>
                
                {/* Physical Ticket Simulation */}
                <div className="p-5 bg-gradient-to-br from-[#121A3D] to-[#2A3773] text-white rounded-3xl text-left space-y-3 shadow-xl relative overflow-hidden">
                  <div className="flex justify-between items-start border-b border-white/20 pb-3">
                    <div>
                      <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">Official Melava Pass</span>
                      <p className="font-extrabold text-base leading-tight text-white">{passData.event.city} Conclave 2026</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-pink-300 bg-white/10 px-2 py-0.5 rounded">
                      {passData.passId}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-blue-200 block">Candidate Name</span>
                      <span className="font-bold">{passData.candidateName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-200 block">Delegation</span>
                      <span className="font-bold">{passData.attendeeCount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-200 block">Date &amp; Time</span>
                      <span className="font-bold text-amber-300">{passData.event.date}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-200 block">City</span>
                      <span className="font-bold">{passData.candidateCity}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[11px] text-blue-200">
                    <span className="truncate max-w-[200px]">{passData.event.venue}</span>
                    <div className="w-8 h-8 rounded bg-white text-[#121A3D] flex items-center justify-center">
                      <QrCode className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-xs font-bold text-[#1B2559] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Entry Pass
                  </button>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="flex-1 py-2.5 rounded-xl bg-[#121A3D] hover:bg-[#1A2554] text-xs font-bold text-white transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
