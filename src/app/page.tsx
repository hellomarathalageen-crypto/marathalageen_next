"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Heart, Users, Search, ChevronRight, CheckCircle2, Lock, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden selection:bg-primary/20 selection:text-primary">
      {/* Premium Navigation */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container mx-auto max-w-7xl flex h-20 items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20">
              <Heart className="h-5 w-5 text-white" fill="currentColor" />
            </div>
            <span className="text-2xl font-bold font-serif text-secondary tracking-tight">
              Matrimony
            </span>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <Link href="/browse" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">
              Browse Matches
            </Link>
            <Link href="/success-stories" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">
              Success Stories
            </Link>
            <Link href="/pricing" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">
              Membership
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-sm font-semibold text-secondary hover:text-primary transition-colors">
              Sign In
            </Link>
            <Link href="/signup">
              <Button className="bg-primary text-white hover:bg-primary/90 rounded-full px-7 h-11 shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 font-semibold">
                Create Profile
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-40 md:pt-48 md:pb-56 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] rounded-full bg-gradient-to-bl from-muted to-transparent opacity-60 blur-3xl z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/5 to-transparent opacity-60 blur-3xl z-0 pointer-events-none" />
          
          <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="max-w-2xl"
              >
                <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                  <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-sm font-semibold text-primary tracking-wide uppercase">Premium Matchmaking</span>
                </motion.div>
                
                <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold font-serif text-secondary leading-[1.1] mb-8">
                  Where Trust <br />
                  <span className="relative">
                    Meets Togetherness
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                    </svg>
                  </span>
                </motion.h1>
                
                <motion.p variants={fadeUp} className="text-lg md:text-xl text-foreground/70 mb-10 leading-relaxed max-w-xl font-medium">
                  Find your perfect life partner in a secure, exclusive community designed for meaningful connections and lifelong commitments.
                </motion.p>
                
                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-5">
                  <Link href="/signup" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-secondary text-white hover:bg-secondary/90 rounded-full text-base h-14 px-8 shadow-xl shadow-secondary/20 transition-all hover:-translate-y-1 group">
                      Get Started Free
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/browse" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full rounded-full text-base h-14 px-8 border-2 border-border text-secondary hover:border-primary hover:bg-transparent transition-all hover:-translate-y-1 font-semibold">
                      Browse Members
                    </Button>
                  </Link>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-10 flex items-center gap-4 text-sm font-medium text-foreground/60">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-10 w-10 rounded-full border-2 border-background bg-muted overflow-hidden z-[${10-i}]`}>
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <p>Join <strong className="text-secondary">10,000+</strong> verified couples</p>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="relative lg:ml-auto w-full max-w-lg"
              >
                {/* Image Composition */}
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-secondary/10">
                  <img
                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80"
                    alt="Elegant couple"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
                  
                  {/* Floating Elements */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-lg">100% Verified</p>
                        <p className="text-white/80 text-sm">Every profile is manually checked</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Decorative Pattern */}
                <div className="absolute -top-6 -right-6 z-[-1] text-muted">
                  <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 0 C60 40, 100 50, 100 50 C60 60, 50 100, 50 100 C40 60, 0 50, 0 50 C40 40, 50 0, 50 0 Z" opacity="0.3" />
                  </svg>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Quick Search - Overlapping */}
        <section className="relative z-20 -mt-24 mb-20 px-6">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-background/80 backdrop-blur-2xl border border-white p-4 md:p-6 rounded-[2rem] shadow-2xl shadow-secondary/5 flex flex-col md:flex-row gap-4 items-end"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full flex-1">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider ml-1">I'm looking for a</label>
                  <div className="relative">
                    <select className="w-full h-14 pl-4 pr-10 rounded-xl bg-muted/50 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-base font-medium appearance-none cursor-pointer">
                      <option>Woman</option>
                      <option>Man</option>
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40 rotate-90 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider ml-1">Aged</label>
                  <div className="relative">
                    <select className="w-full h-14 pl-4 pr-10 rounded-xl bg-muted/50 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-base font-medium appearance-none cursor-pointer">
                      <option>22 to 28</option>
                      <option>25 to 32</option>
                      <option>30 to 40</option>
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40 rotate-90 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider ml-1">Community</label>
                  <div className="relative">
                    <select className="w-full h-14 pl-4 pr-10 rounded-xl bg-muted/50 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-base font-medium appearance-none cursor-pointer">
                      <option>Hindu</option>
                      <option>Muslim</option>
                      <option>Christian</option>
                      <option>Sikh</option>
                      <option>Any</option>
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40 rotate-90 pointer-events-none" />
                  </div>
                </div>
              </div>
              <Button className="w-full md:w-auto h-14 bg-primary hover:bg-primary/90 text-white rounded-xl px-10 font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 mt-4 md:mt-0">
                <Search className="h-5 w-5 mr-2" /> Find Match
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-4">Why choose us?</h2>
              <p className="text-foreground/60 text-lg max-w-2xl mx-auto">We prioritize your safety and preferences to deliver a matching experience unlike any other.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { icon: ShieldCheck, title: "100% Verified Profiles", desc: "Every member is ID-verified to ensure authenticity." },
                { icon: Lock, title: "Strict Privacy", desc: "You control who sees your photos and contact details." },
                { icon: Star, title: "Premium Matches", desc: "High-quality, curated profiles based on your preferences." },
                { icon: Heart, title: "Secure Messaging", desc: "Communicate safely only after mutual interest." }
              ].map((feature, idx) => (
                <div key={idx} className="group p-8 rounded-3xl bg-muted/30 hover:bg-white border border-transparent hover:border-muted hover:shadow-xl transition-all duration-300">
                  <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">{feature.title}</h3>
                  <p className="text-foreground/70 leading-relaxed font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Elegant Footer */}
      <footer className="bg-secondary text-white py-16 border-t-[8px] border-primary">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <div className="flex justify-center items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
              <Heart className="h-6 w-6 text-primary" fill="currentColor" />
            </div>
             <span className="text-3xl font-bold font-serif">Matrimony</span>
          </div>
          <p className="text-white/60 max-w-md mx-auto mb-10 font-medium">
            Building lifelong connections in a secure, exclusive, and warm environment.
          </p>
          <div className="flex justify-center gap-8 text-sm font-semibold text-white/80 mb-12">
            <Link href="#" className="hover:text-white transition-colors">About Us</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Matrimony. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
