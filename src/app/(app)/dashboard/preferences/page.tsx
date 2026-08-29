"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal, Save, Sparkles, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PartnerPreferencesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    minAge: 21,
    maxAge: 32,
    minHeight: "5'0\"",
    maxHeight: "6'2\"",
    maritalStatus: "Never Married",
    communities: "96 Kuli Maratha",
    education: "Any",
    profession: "Any",
    city: "Karnataka",
  });

  useEffect(() => {
    const fetchPrefs = async () => {
      try {
        const res = await fetch("/api/preferences");
        if (res.ok) {
          const data = await res.json();
          if (data.preferences) {
            setForm({
              minAge: data.preferences.minAge || 21,
              maxAge: data.preferences.maxAge || 32,
              minHeight: data.preferences.minHeight || "5'0\"",
              maxHeight: data.preferences.maxHeight || "6'2\"",
              maritalStatus: data.preferences.maritalStatus || "Never Married",
              communities: data.preferences.communities || "96 Kuli Maratha",
              education: data.preferences.education || "Any",
              profession: data.preferences.profession || "Any",
              city: data.preferences.city || "Karnataka",
            });
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrefs();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF1F5] pt-24 pb-16">
      <div className="container mx-auto max-w-4xl px-4">
        
        <div className="mb-6">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-[#2A3773] hover:text-[#DB1866]">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#FADADF]">
          
          <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF1F5] text-[#DB1866] flex items-center justify-center">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-sans text-[#2A3773]">Partner Preferences</h1>
                <p className="text-gray-500 text-xs mt-0.5">Customize your match criteria to refine recommendations</p>
              </div>
            </div>
            {saved && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" /> Preferences Saved!
              </div>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Age Range */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-[#2A3773]">Preferred Age Range</Label>
              <div className="flex items-center gap-3">
                <Input 
                  type="number" 
                  value={form.minAge} 
                  onChange={e => setForm({...form, minAge: Number(e.target.value)})} 
                  className="h-12 bg-gray-50 rounded-xl"
                  placeholder="Min Age" 
                  min={18} 
                  max={70} 
                />
                <span className="text-gray-400 font-bold text-sm">to</span>
                <Input 
                  type="number" 
                  value={form.maxAge} 
                  onChange={e => setForm({...form, maxAge: Number(e.target.value)})} 
                  className="h-12 bg-gray-50 rounded-xl"
                  placeholder="Max Age" 
                  min={18} 
                  max={70} 
                />
              </div>
            </div>

            {/* Marital Status */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-[#2A3773]">Marital Status</Label>
              <select 
                value={form.maritalStatus} 
                onChange={e => setForm({...form, maritalStatus: e.target.value})} 
                className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-gray-50 text-sm font-medium outline-none focus:border-[#DB1866]"
              >
                <option value="Never Married">Never Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
                <option value="Any">Does Not Matter (Any)</option>
              </select>
            </div>

            {/* Community */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-[#2A3773]">Community / Caste Preference</Label>
              <select 
                value={form.communities} 
                onChange={e => setForm({...form, communities: e.target.value})} 
                className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-gray-50 text-sm font-medium outline-none focus:border-[#DB1866]"
              >
                <option value="Any">Any Maratha Community</option>
                <option value="96 Kuli Maratha">96 Kuli Maratha</option>
                <option value="Deshastha">Deshastha Maratha</option>
                <option value="Kunbi">Kunbi Maratha</option>
              </select>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-[#2A3773]">Preferred Education</Label>
              <select 
                value={form.education} 
                onChange={e => setForm({...form, education: e.target.value})} 
                className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-gray-50 text-sm font-medium outline-none focus:border-[#DB1866]"
              >
                <option value="Any">Any Education Level</option>
                <option value="Bachelors">Bachelors Degree or Higher</option>
                <option value="Masters">Masters / Post Graduate</option>
                <option value="Engineering">B.E / B.Tech / Engineering</option>
                <option value="Medical">MBBS / Doctor / Medical</option>
              </select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-[#2A3773]">Preferred Location</Label>
              <Input 
                value={form.city} 
                onChange={e => setForm({...form, city: e.target.value})} 
                placeholder="e.g. Karnataka, Bengaluru, Belagavi" 
                className="h-12 bg-gray-50 rounded-xl font-medium" 
              />
            </div>

            <Button 
              type="submit" 
              disabled={saving}
              className="w-full h-14 bg-[#DB1866] hover:bg-[#B81456] text-white font-bold rounded-2xl shadow-lg shadow-[#DB1866]/30 text-base"
            >
              {saving ? "Saving Preferences..." : <><Save className="w-5 h-5 mr-2" /> Save & Update Matching Criteria</>}
            </Button>

          </form>

        </div>

      </div>
    </div>
  );
}
