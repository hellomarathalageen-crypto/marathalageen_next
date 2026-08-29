"use client";

import { useState } from "react";
import { MessageCircle, Phone, Mail, MapPin, Send, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF1F5] pt-24 pb-16">
      <div className="container mx-auto max-w-5xl px-4">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#FADADF] text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold font-sans text-[#2A3773] mb-4">Contact Our Support Team</h1>
          <p className="text-gray-600 text-base max-w-xl mx-auto">
            Have questions about registration, profile verification, or membership plans? We're here to help you 7 days a week.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Quick Channels */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Card */}
            <a 
              href="https://wa.me/919844295369?text=Hello%20Maratha%20Matrimony%20Support,%20I%20have%20a%20query"
              target="_blank"
              rel="noreferrer"
              className="block bg-emerald-600 text-white rounded-3xl p-6 shadow-lg shadow-emerald-600/20 hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-emerald-100">Direct WhatsApp Help</p>
                  <p className="text-xl font-bold">+91 98442 95369</p>
                </div>
              </div>
              <p className="text-xs text-emerald-100 mt-4">Instant replies within 15 minutes during business hours.</p>
            </a>

            {/* Helpline Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#FADADF] shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF1F5] text-[#DB1866] flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Phone Helpline</p>
                  <p className="text-lg font-bold text-[#2A3773]">+91 98442 95369</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 font-medium">
                <Clock className="w-4 h-4 text-gray-400" /> Mon - Sun: 9:00 AM to 8:00 PM IST
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#FADADF] shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2A3773] flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Email Inquiries</p>
                  <p className="text-base font-bold text-[#2A3773]">support@marathamarry.com</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-3xl p-6 border border-[#FADADF] shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#DB1866] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Main Center</p>
                  <p className="text-sm font-bold text-[#2A3773] mt-1">Maratha Matrimony Services</p>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                    Bengaluru & Belagavi Operations, Karnataka, India.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-[#FADADF]">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#2A3773] mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                    Thank you for reaching out. One of our community relationship officers will connect with you shortly.
                  </p>
                  <Button onClick={() => setSubmitted(false)} className="bg-[#2A3773] text-white rounded-xl">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-2xl font-bold text-[#2A3773] mb-2">Send a Message</h3>
                  <p className="text-gray-500 text-xs mb-6">Fill in the form below and we will get back to you promptly.</p>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-[#2A3773]">Your Name *</Label>
                    <Input 
                      value={form.name} 
                      onChange={e => setForm({...form, name: e.target.value})} 
                      placeholder="Enter your full name" 
                      className="h-12 bg-gray-50 rounded-xl" 
                      required 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-[#2A3773]">Mobile Number *</Label>
                    <Input 
                      value={form.phone} 
                      onChange={e => setForm({...form, phone: e.target.value})} 
                      placeholder="10-digit mobile number" 
                      className="h-12 bg-gray-50 rounded-xl" 
                      required 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-[#2A3773]">Message / Query *</Label>
                    <textarea 
                      value={form.message} 
                      onChange={e => setForm({...form, message: e.target.value})} 
                      rows={4} 
                      placeholder="How can we assist you?" 
                      className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:border-[#DB1866] focus:bg-white outline-none text-sm font-medium"
                      required 
                    />
                  </div>

                  <Button type="submit" className="w-full h-12 bg-[#DB1866] hover:bg-[#B81456] text-white font-bold rounded-xl shadow-lg shadow-[#DB1866]/30">
                    <Send className="w-4 h-4 mr-2" /> Send Inquiry
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
