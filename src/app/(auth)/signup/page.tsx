"use client";

import { useState } from "react";
import Link from "next/link";
import { UserPlus, ArrowRight, ShieldCheck } from "lucide-react";
import { StepProgress } from "@/components/ui/shared";

const steps = ["Basic Details", "Personal Info", "Preferences", "Verification"];

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-serif text-[#173F73] mb-2">Create Profile Free</h2>
        <p className="text-gray-500 text-sm flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          Your information is 100% secure & private
        </p>
      </div>

      <div className="mb-10">
        <StepProgress steps={steps} currentStep={currentStep} />
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {currentStep === 0 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#173F73]">Profile created by</label>
              <select className="w-full h-12 px-4 rounded-xl border border-[#FADADF] bg-white text-sm focus:outline-none focus:border-[#F34883] focus:ring-2 focus:ring-[#F34883]/20 transition-all">
                <option value="">Select option</option>
                <option value="self">Self</option>
                <option value="parent">Parent</option>
                <option value="sibling">Sibling</option>
                <option value="relative">Relative</option>
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#173F73]">Gender</label>
              <div className="flex gap-4">
                <label className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border border-[#FADADF] cursor-pointer hover:border-[#F34883] transition-colors has-[:checked]:border-[#F34883] has-[:checked]:bg-[#FFF1F5] has-[:checked]:text-[#F34883]">
                  <input type="radio" name="gender" className="accent-[#F34883]" />
                  <span className="text-sm font-bold">Male</span>
                </label>
                <label className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border border-[#FADADF] cursor-pointer hover:border-[#F34883] transition-colors has-[:checked]:border-[#F34883] has-[:checked]:bg-[#FFF1F5] has-[:checked]:text-[#F34883]">
                  <input type="radio" name="gender" className="accent-[#F34883]" />
                  <span className="text-sm font-bold">Female</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#173F73]">First Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full h-12 px-4 rounded-xl border border-[#FADADF] bg-white text-sm focus:outline-none focus:border-[#F34883] focus:ring-2 focus:ring-[#F34883]/20 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#173F73]">Last Name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full h-12 px-4 rounded-xl border border-[#FADADF] bg-white text-sm focus:outline-none focus:border-[#F34883] focus:ring-2 focus:ring-[#F34883]/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#173F73]">Mobile Number</label>
              <div className="flex gap-2">
                <select className="h-12 px-3 rounded-xl border border-[#FADADF] bg-gray-50 text-sm font-semibold text-gray-600 focus:outline-none focus:border-[#F34883]">
                  <option>+91</option>
                </select>
                <input
                  type="tel"
                  placeholder="Enter 10-digit number"
                  className="flex-1 h-12 px-4 rounded-xl border border-[#FADADF] bg-white text-sm focus:outline-none focus:border-[#F34883] focus:ring-2 focus:ring-[#F34883]/20 transition-all"
                />
              </div>
            </div>
            
            <button 
              type="button" 
              onClick={nextStep}
              className="w-full h-12 mt-2 flex items-center justify-center gap-2 bg-[#F34883] hover:bg-[#d93870] text-white font-bold rounded-xl shadow-lg shadow-[#F34883]/30 transition-all hover:-translate-y-0.5"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#173F73]">Date of Birth</label>
              <input
                type="date"
                className="w-full h-12 px-4 rounded-xl border border-[#FADADF] bg-white text-sm focus:outline-none focus:border-[#F34883] focus:ring-2 focus:ring-[#F34883]/20 transition-all text-gray-600"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#173F73]">Marital Status</label>
              <select className="w-full h-12 px-4 rounded-xl border border-[#FADADF] bg-white text-sm focus:outline-none focus:border-[#F34883] focus:ring-2 focus:ring-[#F34883]/20 transition-all">
                <option value="">Select option</option>
                <option value="never-married">Never Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
                <option value="awaiting-divorce">Awaiting Divorce</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#173F73]">Religion & Community</label>
              <div className="grid grid-cols-2 gap-4">
                <select className="w-full h-12 px-4 rounded-xl border border-[#FADADF] bg-white text-sm focus:outline-none focus:border-[#F34883] focus:ring-2 focus:ring-[#F34883]/20 transition-all">
                  <option value="hindu">Hindu</option>
                </select>
                <select className="w-full h-12 px-4 rounded-xl border border-[#FADADF] bg-white text-sm focus:outline-none focus:border-[#F34883] focus:ring-2 focus:ring-[#F34883]/20 transition-all">
                  <option value="">Select Community</option>
                  <option value="96-kuli">96 Kuli Maratha</option>
                  <option value="deshastha">Deshastha</option>
                  <option value="kunbi">Kunbi</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <button 
                type="button" 
                onClick={() => setCurrentStep(0)}
                className="w-full h-12 flex items-center justify-center bg-white border-2 border-[#173F73] text-[#173F73] font-bold rounded-xl transition-all"
              >
                Back
              </button>
              <button 
                type="button" 
                onClick={() => setCurrentStep(2)} // skip 2/3 for now to show completion
                className="w-full h-12 flex items-center justify-center gap-2 bg-[#F34883] hover:bg-[#d93870] text-white font-bold rounded-xl shadow-lg shadow-[#F34883]/30 transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {currentStep >= 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-[#173F73] mb-3">Profile Created!</h3>
            <p className="text-gray-600 mb-8 max-w-sm mx-auto">
              Your profile has been created successfully. We've sent a verification link to your mobile number.
            </p>
            <Link 
              href="/home" 
              className="inline-flex items-center justify-center gap-2 bg-[#173F73] hover:bg-[#0E2F63] text-white font-bold h-12 px-8 rounded-xl transition-all"
            >
              Go to Dashboard
            </Link>
          </div>
        )}
      </form>

      {currentStep < 2 && (
        <p className="text-center text-sm text-gray-600 mt-8">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#F34883] hover:underline">
            Login Now
          </Link>
        </p>
      )}
    </div>
  );
}
