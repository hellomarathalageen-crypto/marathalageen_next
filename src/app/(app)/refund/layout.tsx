import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Maratha Matrimony",
  description: "Transparent payment, refund, and subscription cancellation guidelines for Maratha Matrimony memberships.",
  keywords: ["Maratha Matrimony Refund Policy","Subscription Terms","Payment Assistance"],
  alternates: {
    canonical: "https://marathalageen.com/refund",
  },
  openGraph: {
    title: "Refund & Cancellation Policy | Maratha Matrimony",
    description: "Transparent payment, refund, and subscription cancellation guidelines for Maratha Matrimony memberships.",
    url: "https://marathalageen.com/refund",
    siteName: "Maratha Matrimony",
    type: "website",
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "Refund & Cancellation Policy | Maratha Matrimony",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund & Cancellation Policy | Maratha Matrimony",
    description: "Transparent payment, refund, and subscription cancellation guidelines for Maratha Matrimony memberships.",
  },
};

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
