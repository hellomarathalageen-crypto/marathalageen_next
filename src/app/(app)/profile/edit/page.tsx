"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Sparkles,
  Home,
  Save,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "astro" | "family">("basic");
  const [profileId, setProfileId] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    height: "",
    maritalStatus: "Never Married",
    city: "",
    state: "Karnataka",
    country: "India",
    nativePlace: "",
    community: "96 Kuli Maratha",
    devak: "",
    gotra: "",
    kuldaivat: "",
    rashi: "",
    nakshatra: "",
    manglik: "Non-Manglik",
    education: "",
    college: "",
    profession: "",
    company: "",
    annualIncome: "",
    diet: "Non-Veg",
    familyType: "Nuclear",
    familyValues: "Moderate & Traditional",
    fatherOccupation: "",
    motherOccupation: "",
    brothersCount: 0,
    sistersCount: 0,
    about: "",
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile/me");
        if (res.status === 401) {
          router.replace("/login?from=/profile/edit");
          return;
        }
        if (res.status === 403) {
          router.replace("/onboarding");
          return;
        }
        if (res.ok) {
          const data = await res.json();
          if (data.profile) {
            setProfileId(data.profile.id);
            setForm({
              firstName: data.profile.firstName || "",
              lastName: data.profile.lastName || "",
              height: data.profile.height || "",
              maritalStatus: data.profile.maritalStatus || "Never Married",
              city: data.profile.city || "",
              state: data.profile.state || "Karnataka",
              country: data.profile.country || "India",
              nativePlace: data.profile.nativePlace || "",
              community: data.profile.community || "96 Kuli Maratha",
              devak: data.profile.devak || "",
              gotra: data.profile.gotra || "",
              kuldaivat: data.profile.kuldaivat || "",
              rashi: data.profile.rashi || "",
              nakshatra: data.profile.nakshatra || "",
              manglik: data.profile.manglik || "Non-Manglik",
              education: data.profile.education || "",
              college: data.profile.college || "",
              profession: data.profile.profession || "",
              company: data.profile.company || "",
              annualIncome: data.profile.annualIncome || "",
              diet: data.profile.diet || "Non-Veg",
              familyType: data.profile.familyType || "Nuclear",
              familyValues: data.profile.familyValues || "Moderate & Traditional",
              fatherOccupation: data.profile.fatherOccupation || "",
              motherOccupation: data.profile.motherOccupation || "",
              brothersCount: data.profile.brothersCount || 0,
              sistersCount: data.profile.sistersCount || 0,
              about: data.profile.about || "",
            });
          }
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaveSuccess(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch("/api/profile/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDFB] pt-28 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#DB1866] animate-spin mb-3" />
        <p className="text-sm font-bold text-[#2A3773]">Loading your Biodata...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDFB] pt-24 pb-20">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#DB1866] mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold font-sans text-[#2A3773] flex items-center gap-2">
              Edit Your Biodata
              <span className="text-xs bg-[#FFF1F5] text-[#DB1866] px-3 py-1 rounded-full font-bold">
                Live Profile
              </span>
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Keep your matrimonial profile complete and verified to attract the highest matching Maratha families.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {profileId && (
              <Link
                href={`/profile/${profileId}`}
                target="_blank"
                className="inline-flex items-center gap-2 bg-white border border-[#FADADF] hover:border-[#DB1866] text-[#2A3773] px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all"
              >
                Preview Public Biodata <ExternalLink className="w-3.5 h-3.5 text-[#DB1866]" />
              </Link>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-[#DB1866] hover:bg-[#B81456] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-[#DB1866]/20 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            Your biodata changes have been saved and updated successfully!
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex gap-2 p-1.5 bg-white rounded-2xl border border-[#FADADF] shadow-xs mb-8 overflow-x-auto">
          {[
            { id: "basic", label: "Personal & Career", icon: User },
            { id: "astro", label: "Devak & Horoscope", icon: Sparkles },
            { id: "family", label: "Family & Lifestyle", icon: Home },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex-1 justify-center ${
                  active
                    ? "bg-[#2A3773] text-white shadow-sm"
                    : "text-gray-600 hover:text-[#DB1866] hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Form Container */}
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 md:p-10 border border-[#FADADF] shadow-sm space-y-8">
          
          {/* TAB 1: BASIC & CAREER */}
          {activeTab === "basic" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h2 className="text-lg font-bold text-[#2A3773] border-b pb-3 border-gray-100">
                Personal & Career Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">First Name</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none"
                    placeholder="e.g. Rohan"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Last Name / Surname</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none"
                    placeholder="e.g. Patil"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Height</label>
                  <input
                    type="text"
                    value={form.height}
                    onChange={(e) => handleChange("height", e.target.value)}
                    placeholder='e.g. 5ft 10in (5&apos;10")'
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Marital Status</label>
                  <select
                    value={form.maritalStatus}
                    onChange={(e) => handleChange("maritalStatus", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none bg-white"
                  >
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Awaiting Divorce">Awaiting Divorce</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Current City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none"
                    placeholder="e.g. Belagavi / Pune / Bengaluru"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Native Place</label>
                  <input
                    type="text"
                    value={form.nativePlace}
                    onChange={(e) => handleChange("nativePlace", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none"
                    placeholder="e.g. Khanapur, Belagavi / Karad, Satara"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Highest Education Degree</label>
                  <input
                    type="text"
                    value={form.education}
                    onChange={(e) => handleChange("education", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none"
                    placeholder="e.g. B.E. Computer Science / MBA"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">College / University</label>
                  <input
                    type="text"
                    value={form.college}
                    onChange={(e) => handleChange("college", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none"
                    placeholder="e.g. KLE Technological University"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Profession / Role</label>
                  <input
                    type="text"
                    value={form.profession}
                    onChange={(e) => handleChange("profession", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none"
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Employer / Company Name</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none"
                    placeholder="e.g. MNC / TCS / Government"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Annual Package (CTC)</label>
                  <input
                    type="text"
                    value={form.annualIncome}
                    onChange={(e) => handleChange("annualIncome", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none"
                    placeholder="e.g. 15 LPA - 18 LPA"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HOROSCOPE & CULTURAL */}
          {activeTab === "astro" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h2 className="text-lg font-bold text-[#2A3773] border-b pb-3 border-gray-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#DB1866]" /> Maratha Lineage & Kundali Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Community</label>
                  <select
                    value={form.community}
                    onChange={(e) => handleChange("community", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none bg-white"
                  >
                    <option value="96 Kuli Maratha">96 Kuli Maratha</option>
                    <option value="Deshastha Maratha">Deshastha Maratha</option>
                    <option value="Kunbi Maratha">Kunbi Maratha</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Devak</label>
                  <input
                    type="text"
                    value={form.devak}
                    onChange={(e) => handleChange("devak", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none"
                    placeholder="e.g. Kalamb / Suryakant / Panchpallav"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Devak is essential for traditional Maratha sagotra & devak matching.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Gotra</label>
                  <input
                    type="text"
                    value={form.gotra}
                    onChange={(e) => handleChange("gotra", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none"
                    placeholder="e.g. Kashyap / Bharadwaj / Vashistha"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Clan Deity (Kuldaivat)</label>
                  <input
                    type="text"
                    value={form.kuldaivat}
                    onChange={(e) => handleChange("kuldaivat", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none"
                    placeholder="e.g. Bhavani Mata, Tuljapur / Khandoba, Jejuri"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Rashi (Moon Sign)</label>
                  <input
                    type="text"
                    value={form.rashi}
                    onChange={(e) => handleChange("rashi", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none"
                    placeholder="e.g. Karka (Cancer) / Simha (Leo) / Kanya"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Birth Star (Nakshatra)</label>
                  <input
                    type="text"
                    value={form.nakshatra}
                    onChange={(e) => handleChange("nakshatra", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none"
                    placeholder="e.g. Pushya / Rohini / Magha"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Manglik Status</label>
                  <select
                    value={form.manglik}
                    onChange={(e) => handleChange("manglik", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none bg-white"
                  >
                    <option value="Non-Manglik">Non-Manglik</option>
                    <option value="Manglik">Manglik</option>
                    <option value="Anshik Manglik">Anshik Manglik</option>
                    <option value="Don't Know">Don't Know / Not Checked</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FAMILY & LIFESTYLE */}
          {activeTab === "family" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h2 className="text-lg font-bold text-[#2A3773] border-b pb-3 border-gray-100">
                Family Background & About Me
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Family Type</label>
                  <select
                    value={form.familyType}
                    onChange={(e) => handleChange("familyType", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none bg-white"
                  >
                    <option value="Nuclear">Nuclear Family</option>
                    <option value="Joint">Joint Family</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Family Values</label>
                  <select
                    value={form.familyValues}
                    onChange={(e) => handleChange("familyValues", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none bg-white"
                  >
                    <option value="Moderate & Traditional">Moderate & Traditional</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Liberal / Modern">Liberal / Modern</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Father's Occupation</label>
                  <input
                    type="text"
                    value={form.fatherOccupation}
                    onChange={(e) => handleChange("fatherOccupation", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none"
                    placeholder="e.g. Businessman / Agriculture / Retired Govt Officer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Mother's Occupation</label>
                  <input
                    type="text"
                    value={form.motherOccupation}
                    onChange={(e) => handleChange("motherOccupation", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none"
                    placeholder="e.g. Homemaker / School Teacher"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Brothers Count</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={form.brothersCount}
                    onChange={(e) => handleChange("brothersCount", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Sisters Count</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={form.sistersCount}
                    onChange={(e) => handleChange("sistersCount", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Diet</label>
                  <select
                    value={form.diet}
                    onChange={(e) => handleChange("diet", e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none bg-white"
                  >
                    <option value="Non-Veg">Non-Vegetarian</option>
                    <option value="Veg">Pure Vegetarian</option>
                    <option value="Eggetarian">Eggetarian</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">About Myself & Expectations</label>
                <textarea
                  rows={4}
                  value={form.about}
                  onChange={(e) => handleChange("about", e.target.value)}
                  className="w-full p-4 rounded-2xl border border-gray-200 text-sm font-medium focus:border-[#DB1866] outline-none leading-relaxed"
                  placeholder="Describe your personality, hobbies, background, and what you are looking for in your Maratha life partner..."
                />
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <Link
              href="/dashboard/photos"
              className="text-xs font-bold text-[#DB1866] hover:underline flex items-center gap-1.5"
            >
              Manage Profile Photos & Privacy &rarr;
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-[#DB1866] hover:bg-[#B81456] text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-md shadow-[#DB1866]/20 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Saving Changes..." : "Save Biodata"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
