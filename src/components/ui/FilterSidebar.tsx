import { useState } from "react";
import { SlidersHorizontal, RotateCcw, Crosshair, MapPin, Loader2 } from "lucide-react";
import { findNearestCity, reverseGeocodeLive } from "@/lib/geo";

export interface FilterState {
  gender: string;
  minAge: number;
  maxAge: number;
  maritalStatus: string;
  community: string;
  city: string;
  education: string;
  userLat?: number | null;
  userLng?: number | null;
  isLiveLocation?: boolean;
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
}

export function FilterSidebar({ onFilterChange, initialFilters }: FilterSidebarProps) {
  const [detecting, setDetecting] = useState(false);
  const [liveLocationNotice, setLiveLocationNotice] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    gender: initialFilters?.gender || "Female",
    minAge: initialFilters?.minAge || 21,
    maxAge: initialFilters?.maxAge || 35,
    maritalStatus: initialFilters?.maritalStatus || "all",
    community: initialFilters?.community || "all",
    city: initialFilters?.city || "all",
    education: initialFilters?.education || "all",
    userLat: initialFilters?.userLat || null,
    userLng: initialFilters?.userLng || null,
    isLiveLocation: initialFilters?.isLiveLocation || false,
  });

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const loc = await reverseGeocodeLive(latitude, longitude);
        setDetecting(false);
        const displayLocation = loc.state ? `${loc.cityName}, ${loc.state}` : loc.cityName;
        setLiveLocationNotice(displayLocation);
        
        const updated: FilterState = {
          ...filters,
          userLat: latitude,
          userLng: longitude,
          isLiveLocation: true,
          city: loc.cityName,
        };
        setFilters(updated);
        onFilterChange(updated);
      },
      (err) => {
        console.warn("Geolocation failed:", err);
        setDetecting(false);
        const updated: FilterState = {
          ...filters,
          city: "Belagavi",
        };
        setFilters(updated);
        onFilterChange(updated);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleFieldChange = (field: keyof FilterState, value: any) => {
    const updated = { ...filters, [field]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  const handleReset = () => {
    const resetValues: FilterState = {
      gender: "Female",
      minAge: 21,
      maxAge: 35,
      maritalStatus: "all",
      community: "all",
      city: "all",
      education: "all",
    };
    setFilters(resetValues);
    onFilterChange(resetValues);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#FADADF] sticky top-24 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2 font-sans font-bold text-lg text-[#2A3773]">
          <SlidersHorizontal className="w-5 h-5 text-[#DB1866]" />
          Refine Search
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-gray-400 hover:text-[#DB1866] font-bold flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="space-y-5">
        {/* Looking For */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Looking for</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "Female", label: "Bride" },
              { id: "Male", label: "Groom" },
            ].map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => handleFieldChange("gender", g.id)}
                className={`py-2.5 rounded-xl font-bold text-xs transition-all ${
                  filters.gender === g.id
                    ? "bg-[#2A3773] text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Age Range */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Age Range (18 to 70 Yrs)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={18}
              max={70}
              value={filters.minAge}
              onChange={(e) => handleFieldChange("minAge", Number(e.target.value))}
              className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs font-bold text-[#2A3773] focus:border-[#DB1866] outline-none"
            />
            <span className="text-gray-400 font-bold text-xs">to</span>
            <input
              type="number"
              min={18}
              max={70}
              value={filters.maxAge}
              onChange={(e) => handleFieldChange("maxAge", Number(e.target.value))}
              className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs font-bold text-[#2A3773] focus:border-[#DB1866] outline-none"
            />
          </div>
        </div>

        {/* Location / District */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Location / City</label>
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={detecting}
              className="text-[11px] text-[#DB1866] hover:text-[#B81456] font-bold flex items-center gap-1 transition-colors cursor-pointer"
              title="Auto-detect candidates nearest to your current GPS location"
            >
              <Crosshair className={`w-3 h-3 ${detecting ? "animate-spin" : ""}`} />
              <span>{detecting ? "Detecting..." : "Use Live GPS"}</span>
            </button>
          </div>

          <select
            value={filters.city}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "live") {
                handleDetectLocation();
              } else {
                setLiveLocationNotice(null);
                const updated = { ...filters, city: val, userLat: null, userLng: null, isLiveLocation: false };
                setFilters(updated);
                onFilterChange(updated);
              }
            }}
            className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs font-medium focus:border-[#DB1866] outline-none bg-white cursor-pointer"
          >
            <option value="all">All Locations (Karnataka & MH)</option>
            <option value="live">📍 Near My Live Location (GPS)</option>
            <option value="Belagavi">Belagavi (North Karnataka)</option>
            <option value="Pune">Pune (Maharashtra)</option>
            <option value="Kolhapur">Kolhapur (South Maharashtra)</option>
            <option value="Bengaluru">Bengaluru (Karnataka)</option>
            <option value="Hubballi">Hubballi / Dharwad</option>
            <option value="Satara">Satara (Western Maharashtra)</option>
            <option value="Sangli">Sangli (Maharashtra)</option>
            <option value="Mumbai">Mumbai / Navi Mumbai</option>
            <option value="Nashik">Nashik</option>
            <option value="Solapur">Solapur</option>
          </select>

          {liveLocationNotice && (
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-in fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span className="truncate">Live GPS: {liveLocationNotice}</span>
            </div>
          )}
        </div>

        {/* Community */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Community</label>
          <select
            value={filters.community}
            onChange={(e) => handleFieldChange("community", e.target.value)}
            className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs font-medium focus:border-[#DB1866] outline-none bg-white"
          >
            <option value="all">All Maratha Communities</option>
            <option value="96 Kuli Maratha">96 Kuli Maratha</option>
            <option value="Deshastha">Deshastha Maratha</option>
            <option value="Kunbi">Kunbi Maratha</option>
          </select>
        </div>

        {/* Marital Status */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Marital Status</label>
          <select
            value={filters.maritalStatus}
            onChange={(e) => handleFieldChange("maritalStatus", e.target.value)}
            className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs font-medium focus:border-[#DB1866] outline-none bg-white"
          >
            <option value="all">Any Marital Status</option>
            <option value="Never Married">Never Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        {/* Education */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Education</label>
          <select
            value={filters.education}
            onChange={(e) => handleFieldChange("education", e.target.value)}
            className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs font-medium focus:border-[#DB1866] outline-none bg-white"
          >
            <option value="all">Any Qualification</option>
            <option value="Engineering">Engineering / Technology</option>
            <option value="Medical">Medical / Doctor</option>
            <option value="MBA">MBA / Management</option>
            <option value="Chartered Accountant">CA / CS / Finance</option>
          </select>
        </div>
      </div>
    </div>
  );
}
