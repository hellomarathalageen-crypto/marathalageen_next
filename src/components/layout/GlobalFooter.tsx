"use client";

import { usePathname } from "next/navigation";
import AppFooter from "./AppFooter";

export default function GlobalFooter() {
  const pathname = usePathname();

  // Exclude from admin portal (which has its own full-height admin layout & sidebar)
  // and full-screen chat interface
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard/chat")) {
    return null;
  }

  return <AppFooter />;
}
