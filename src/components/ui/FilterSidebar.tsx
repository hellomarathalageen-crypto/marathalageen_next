"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown, Check } from "lucide-react";

export function FilterSidebar({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
  const [minAge, setMinAge] = useState(21);
  const [maxAge, setMaxAge] = useState(35);
  
  const handleApply = () => {
    onFilterChange({ minAge, maxAge });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
      <div className="flex items-center gap-2 font-sans font-bold text-xl text-[#2A3773] mb-6">
        <SlidersHorizontal className="w-5 h-5 text-[#DB1866]" />
        Refine Search
      </div>

      <div className="space-y-6">
        {/* Age Range */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-gray-700">Age Range</h4>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              value={minAge}
              onChange={(e) => setMinAge(Number(e.target.value))}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:border-[#DB1866] outline-none" 
            />
            <span className="text-gray-400">to</span>
            <input 
              type="number" 
              value={maxAge}
              onChange={(e) => setMaxAge(Number(e.target.value))}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:border-[#DB1866] outline-none" 
            />
          </div>
        </div>

        {/* Marital Status */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-gray-700">Marital Status</h4>
          <div className="space-y-2">
            {["Never Married", "Divorced", "Widowed"].map((status) => (
              <label key={status} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center group-hover:border-[#DB1866] transition-colors">
                  <Check className="w-3.5 h-3.5 text-transparent" />
                </div>
                <span className="text-sm text-gray-600">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Community */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-gray-700">Community</h4>
          <select className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:border-[#DB1866] outline-none bg-white">
            <option value="">Any Community</option>
            <option value="96-kuli">96 Kuli Maratha</option>
            <option value="deshastha">Deshastha</option>
            <option value="kunbi">Kunbi</option>
          </select>
        </div>

        <button 
          onClick={handleApply}
          className="w-full h-12 bg-[#DB1866] hover:bg-[#B81456] text-white font-bold rounded-xl shadow-md shadow-[#DB1866]/20 transition-all hover:-translate-y-0.5"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
