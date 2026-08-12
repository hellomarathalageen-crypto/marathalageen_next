"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [method, setMethod] = useState<"email" | "phone">("email");

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-serif text-[#173F73] mb-2">Welcome Back</h2>
        <p className="text-gray-500 text-sm">Log in to your Maratha Matrimony account.</p>
      </div>

      <div className="flex bg-[#FFF1F5] p-1 rounded-xl mb-6">
        <button
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${method === "email" ? "bg-white text-[#F34883] shadow-sm" : "text-gray-500 hover:text-[#173F73]"}`}
          onClick={() => setMethod("email")}
        >
          Email ID / Profile ID
        </button>
        <button
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${method === "phone" ? "bg-white text-[#F34883] shadow-sm" : "text-gray-500 hover:text-[#173F73]"}`}
          onClick={() => setMethod("phone")}
        >
          Mobile Number
        </button>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {method === "email" ? (
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#173F73]">Email ID or Profile ID</label>
            <input
              type="text"
              placeholder="e.g. MM123456 or name@example.com"
              className="w-full h-12 px-4 rounded-xl border border-[#FADADF] bg-white text-sm focus:outline-none focus:border-[#F34883] focus:ring-2 focus:ring-[#F34883]/20 transition-all"
            />
          </div>
        ) : (
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
        )}

        <div className="space-y-1.5 relative">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-[#173F73]">Password</label>
            <Link href="/forgot-password" className="text-xs font-semibold text-[#F34883] hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full h-12 pl-4 pr-12 rounded-xl border border-[#FADADF] bg-white text-sm focus:outline-none focus:border-[#F34883] focus:ring-2 focus:ring-[#F34883]/20 transition-all"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#173F73] transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button className="w-full h-12 mt-4 flex items-center justify-center gap-2 bg-[#F34883] hover:bg-[#d93870] text-white font-bold rounded-xl shadow-lg shadow-[#F34883]/30 transition-all hover:-translate-y-0.5">
          <LogIn className="w-5 h-5" /> Login to Account
        </button>
      </form>

      {method === "phone" && (
        <div className="mt-4 relative flex items-center gap-4 py-2">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
      )}
      
      {method === "phone" && (
        <button className="w-full h-12 mt-2 flex items-center justify-center gap-2 bg-white border-2 border-[#173F73] text-[#173F73] font-bold rounded-xl hover:bg-[#173F73] hover:text-white transition-all">
          Login via OTP
        </button>
      )}

      <p className="text-center text-sm text-gray-600 mt-8">
        Don't have an account?{" "}
        <Link href="/signup" className="font-bold text-[#F34883] hover:underline">
          Create Profile Free
        </Link>
      </p>
    </div>
  );
}
