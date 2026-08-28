"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Camera, User, CheckCircle2 } from "lucide-react";
import { StepProgress } from "@/components/ui/shared";
import { useSession } from "next-auth/react";

const steps = ["Personal Details", "Location", "Education & Career", "Photo"];

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    height: "",
    maritalStatus: "never-married",
    city: "",
    state: "",
    country: "India",
    religion: "Hindu",
    community: "",
    education: "",
    profession: "",
    annualIncome: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
  const handleBack = () => setCurrentStep((prev) => Math.max(0, prev - 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-[#DB1866]/5 border border-gray-100 overflow-hidden">
        <div className="bg-[#2A3773] p-8 text-white text-center">
          <h1 className="text-3xl font-bold font-sans mb-2">Complete Your Profile</h1>
          <p className="text-white/80 text-sm">Tell us more about yourself to find the perfect match.</p>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <StepProgress steps={steps} currentStep={currentStep} />
          </div>

          <div className="space-y-6">
            {currentStep === 0 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#2A3773]">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#DB1866] outline-none" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#2A3773]">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#DB1866] outline-none" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#2A3773]">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#DB1866] outline-none" required>
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#2A3773]">Date of Birth</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#DB1866] outline-none" required />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#2A3773]">Height</label>
                  <select name="height" value={formData.height} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#DB1866] outline-none" required>
                    <option value="">Select Height</option>
                    <option value="5'0&quot;">5'0"</option>
                    <option value="5'5&quot;">5'5"</option>
                    <option value="5'10&quot;">5'10"</option>
                    <option value="6'0&quot;">6'0"</option>
                  </select>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#2A3773]">City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#DB1866] outline-none" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#2A3773]">State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#DB1866] outline-none" required />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#2A3773]">Religion</label>
                  <select name="religion" value={formData.religion} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#DB1866] outline-none">
                    <option value="Hindu">Hindu</option>
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#2A3773]">Community (Caste)</label>
                  <select name="community" value={formData.community} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#DB1866] outline-none" required>
                    <option value="">Select Community</option>
                    <option value="96-kuli">96 Kuli Maratha</option>
                    <option value="deshastha">Deshastha</option>
                    <option value="kunbi">Kunbi</option>
                  </select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#2A3773]">Education</label>
                  <select name="education" value={formData.education} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#DB1866] outline-none" required>
                    <option value="">Highest Education</option>
                    <option value="Bachelors">Bachelors</option>
                    <option value="Masters">Masters</option>
                    <option value="Doctorate">Doctorate</option>
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#2A3773]">Profession</label>
                  <input type="text" name="profession" value={formData.profession} onChange={handleChange} placeholder="e.g. Software Engineer" className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#DB1866] outline-none" required />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#2A3773]">Annual Income</label>
                  <select name="annualIncome" value={formData.annualIncome} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#DB1866] outline-none" required>
                    <option value="">Select Income</option>
                    <option value="0-3L">0 - 3 Lakhs</option>
                    <option value="3L-7L">3 - 7 Lakhs</option>
                    <option value="7L-15L">7 - 15 Lakhs</option>
                    <option value="15L+">15+ Lakhs</option>
                  </select>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col items-center py-6">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6 border-2 border-dashed border-gray-300 relative group cursor-pointer hover:border-[#DB1866] transition-colors">
                  <User className="w-12 h-12 text-gray-400 group-hover:text-[#DB1866] transition-colors" />
                  <div className="absolute bottom-0 right-0 bg-[#DB1866] p-2 rounded-full text-white shadow-lg">
                    <Camera className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#2A3773]">Upload Profile Photo</h3>
                <p className="text-sm text-gray-500 mb-6">Profiles with photos get 10x more responses</p>
                <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
                  Skip for now
                </button>
              </div>
            )}

            <div className="flex justify-between pt-8 border-t border-gray-100">
              <button 
                onClick={handleBack}
                disabled={currentStep === 0}
                className="px-6 py-2.5 rounded-xl font-bold text-[#2A3773] hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
              >
                Back
              </button>
              
              {currentStep < 3 ? (
                <button 
                  onClick={handleNext}
                  className="px-8 py-2.5 rounded-xl font-bold text-white bg-[#DB1866] hover:bg-[#B81456] shadow-md shadow-[#DB1866]/20 transition-all hover:-translate-y-0.5 flex items-center gap-2"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-8 py-2.5 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-2"
                >
                  {loading ? "Saving..." : <><CheckCircle2 className="w-4 h-4" /> Complete Profile</>}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
