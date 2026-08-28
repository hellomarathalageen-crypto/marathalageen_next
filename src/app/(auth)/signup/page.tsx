"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { UserPlus, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Something went wrong");
      }

      // Automatically log the user in after successful registration
      const loginRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (loginRes?.error) {
        setError("Account created, but auto-login failed.");
      } else {
        router.push("/onboarding");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-sans text-[#2A3773] mb-2">Create Profile Free</h2>
        <p className="text-gray-500 text-sm flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          Your information is 100% secure & private
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSignup}>
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-[#2A3773]">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
            className="w-full h-12 px-4 rounded-xl border border-[#FADADF] bg-white text-sm focus:outline-none focus:border-[#DB1866] focus:ring-2 focus:ring-[#DB1866]/20 transition-all"
          />
        </div>

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

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-[#2A3773]">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong password"
            required
            className="w-full h-12 px-4 rounded-xl border border-[#FADADF] bg-white text-sm focus:outline-none focus:border-[#DB1866] focus:ring-2 focus:ring-[#DB1866]/20 transition-all"
          />
        </div>
        
        <button 
          disabled={loading}
          className="w-full h-12 mt-2 flex items-center justify-center gap-2 bg-[#DB1866] hover:bg-[#B81456] disabled:bg-gray-400 text-white font-bold rounded-xl shadow-lg shadow-[#DB1866]/30 transition-all hover:-translate-y-0.5"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-8">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-[#DB1866] hover:underline">
          Login Now
        </Link>
      </p>
    </div>
  );
}

