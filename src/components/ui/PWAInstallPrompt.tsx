"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Download, X, Smartphone, Crown } from "lucide-react";

export default function PWAInstallPrompt() {
  const pathname = usePathname();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if dismissed before
    const dismissed = localStorage.getItem("pwa_prompt_dismissed");
    if (dismissed) return;

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // If iOS and not standalone mode
    if (isIosDevice && !(window.navigator as any).standalone) {
      const timer = setTimeout(() => setIsVisible(true), 4000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("pwa_prompt_dismissed", "true");
  };

  if (!isVisible || pathname?.startsWith("/dashboard/chat")) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-[calc(100%-2.5rem)] bg-[#121A3D] text-white p-4 rounded-3xl shadow-2xl border border-white/20 animate-in slide-in-from-bottom-5 font-sans block md:hidden">
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-2xl bg-white p-1 flex items-center justify-center shrink-0 shadow-md">
          <img src="/logo.png" alt="Maratha App" className="w-full h-auto object-contain" />
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <p className="font-extrabold text-xs flex items-center gap-1.5 text-white">
            <span>Install Maratha App</span>
            <span className="bg-[#DB1866] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">Fast</span>
          </p>
          <p className="text-[11px] text-blue-200 leading-snug">
            {isIOS 
              ? "Tap the Share icon and select 'Add to Home Screen' for instant mobile access."
              : "Install to your phone for faster access, instant match alerts, and full-screen view."}
          </p>
        </div>

        <button 
          onClick={handleDismiss} 
          className="text-white/60 hover:text-white p-1 rounded-full transition-colors"
          aria-label="Dismiss app install banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {!isIOS && deferredPrompt && (
        <div className="mt-3 pt-2.5 border-t border-white/10 flex gap-2">
          <button
            onClick={handleInstall}
            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#DB1866] to-[#B81456] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Install App Now
          </button>
          <button
            onClick={handleDismiss}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
          >
            Later
          </button>
        </div>
      )}
    </div>
  );
}
