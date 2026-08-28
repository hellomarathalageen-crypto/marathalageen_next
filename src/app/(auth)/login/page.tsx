"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
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
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-sans text-[#2A3773] mb-2">Welcome Back</h2>
        <p className="text-gray-500 text-sm">Log in to your Maratha Matrimony account.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleLogin}>
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-[#2A3773]">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            className="w-full h-12 px-4 rounded-xl border border-[#FADADF] bg-white text-sm focus:outline-none focus:border-[#DB1866] focus:ring-2 focus:ring-[#DB1866]/20 transition-all"
          />
        </div>

        <div className="space-y-1.5 relative">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-[#2A3773]">Password</label>
            <Link href="/forgot-password" className="text-xs font-semibold text-[#DB1866] hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full h-12 pl-4 pr-12 rounded-xl border border-[#FADADF] bg-white text-sm focus:outline-none focus:border-[#DB1866] focus:ring-2 focus:ring-[#DB1866]/20 transition-all"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2A3773] transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button 
          disabled={loading}
          className="w-full h-12 mt-4 flex items-center justify-center gap-2 bg-[#DB1866] hover:bg-[#B81456] disabled:bg-gray-400 text-white font-bold rounded-xl shadow-lg shadow-[#DB1866]/30 transition-all hover:-translate-y-0.5"
        >
          {loading ? "Logging in..." : <><LogIn className="w-5 h-5" /> Login to Account</>}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-8">
        Don't have an account?{" "}
        <Link href="/signup" className="font-bold text-[#DB1866] hover:underline">
          Create Profile Free
        </Link>
      </p>
    </div>
  );
}
