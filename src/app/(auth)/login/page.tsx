"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, LogIn, AlertCircle, Mail, Lock, Crown, ShieldCheck, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email.trim().toLowerCase(),
        password,
      });

      if (res?.error) {
        setError("Invalid email or password. Please verify your credentials.");
      } else {
        // Direct admin users straight to super admin dashboard
        if (email.trim().toLowerCase() === "admin@marathalageen.com") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/dashboard";
        }
      }
    } catch (err) {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Quick fill helper for testing
  const fillCredentials = (userEmail: string, userPass: string) => {
    setEmail(userEmail);
    setPassword(userPass);
    setError("");
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      
      {/* Top Badge & Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 bg-[#FFF1F5] text-[#DB1866] text-xs font-bold px-3 py-1 rounded-full border border-[#FADADF] mb-3 shadow-2xs">
          <Crown className="w-3.5 h-3.5 fill-[#DB1866] text-[#DB1866]" /> Official Member Portal
        </div>
        <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-[#1B2559] tracking-tight mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-sm font-medium leading-relaxed">
          Log in to your Maratha Matrimony account to view your matches and family biodatas.
        </p>
      </div>

      {/* Error Alert Box */}
      {error && (
        <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-2xl flex items-center gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Login Form */}
      <form className="space-y-4" onSubmit={handleLogin}>
        
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1B2559] uppercase tracking-wider">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white text-sm text-[#1B2559] placeholder:text-gray-400 focus:outline-none focus:border-[#DB1866] focus:ring-2 focus:ring-[#DB1866]/20 transition-all font-medium"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#1B2559] uppercase tracking-wider">
              Password
            </label>
            <Link 
              href="/forgot-password" 
              className="text-xs font-semibold text-[#DB1866] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full h-12 pl-11 pr-12 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white text-sm text-[#1B2559] placeholder:text-gray-400 focus:outline-none focus:border-[#DB1866] focus:ring-2 focus:ring-[#DB1866]/20 transition-all font-medium"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B2559] transition-colors p-1"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          disabled={loading}
          className="w-full h-12 mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-[#DB1866] to-[#B81456] hover:from-[#B81456] hover:to-[#9E1048] disabled:opacity-60 text-white font-sans font-bold text-sm rounded-xl shadow-lg shadow-[#DB1866]/25 transition-all hover:-translate-y-0.5"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Logging in securely...</span>
            </span>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              <span>Login to Account</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </form>

      {/* ── Quick Demo / Admin Test Credentials Helper ── */}
      <div className="mt-6 p-3.5 rounded-2xl bg-[#FFFDF9] border border-amber-200/80 space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Quick 1-Click Login Credentials:
        </p>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Super Admin Quick Button */}
          <button
            type="button"
            onClick={() => fillCredentials("admin@marathalageen.com", "Admin@123")}
            className="text-left p-2 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 transition-all group"
          >
            <p className="font-bold text-[#1B2559] flex items-center gap-1 text-[11px]">
              <Crown className="w-3 h-3 text-amber-500 fill-amber-500" /> Super Admin
            </p>
            <p className="text-[10px] text-gray-500 truncate font-mono">admin@marathalageen.com</p>
          </button>

          {/* Member Demo Quick Button */}
          <button
            type="button"
            onClick={() => fillCredentials("demo@maratha.com", "Demo@123")}
            className="text-left p-2 rounded-xl bg-white hover:bg-pink-50 border border-pink-200 transition-all group"
          >
            <p className="font-bold text-[#1B2559] flex items-center gap-1 text-[11px]">
              👤 Demo Member
            </p>
            <p className="text-[10px] text-gray-500 truncate font-mono">demo@maratha.com</p>
          </button>
        </div>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-xs text-gray-600 mt-6 font-medium">
        Don&apos;t have an account yet?{" "}
        <Link href="/signup" className="font-bold text-[#DB1866] hover:underline">
          Create Profile Free
        </Link>
      </p>

    </div>
  );
}
