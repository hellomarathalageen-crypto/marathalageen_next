"use client";

import { Heart, Users } from "lucide-react";

const stories = [
  {
    names: "Sneha & Pratik",
    location: "Pune & Belagavi",
    quote: "Maratha Matrimony helped us connect with complete trust and cultural alignment. Our families met and bonded instantly.",
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop"
  },
  {
    names: "Rutuja & Abhishek",
    location: "Bengaluru & Kolhapur",
    quote: "The verified profile system gave our parents peace of mind. We are happily married today!",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop"
  },
  {
    names: "Kiran & Manasi",
    location: "Hubballi & Dharwad",
    quote: "Found my soulmate in just 3 weeks! The customer support team was always ready to guide us.",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop"
  }
];

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-[#FFF1F5] pt-24 pb-16">
      <div className="container mx-auto max-w-6xl px-4">
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#FADADF] text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FFF1F5] border border-[#FADADF] text-[#DB1866] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Heart className="w-3.5 h-3.5 fill-[#DB1866]" /> Real Maratha Weddings
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-sans text-[#2A3773] mb-4">Success Stories</h1>
          <p className="text-gray-600 text-base max-w-xl mx-auto">
            Celebrating the sacred beginnings and eternal journeys of Maratha couples across Karnataka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((s, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-[#FADADF] shadow-sm hover:shadow-xl transition-all">
              <div className="aspect-[4/3] bg-gray-100">
                <img src={s.image} alt={s.names} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2A3773] mb-1">{s.names}</h3>
                <p className="text-xs text-[#DB1866] font-bold mb-4">{s.location}</p>
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  "{s.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
