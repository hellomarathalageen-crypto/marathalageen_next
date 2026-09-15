import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Maratha Matrimony",
  description: "Official terms of service and community guidelines for registered candidates and families on Maratha Lageen platform.",
  keywords: ["Maratha Matrimony Terms","Community Guidelines","Membership Policy"],
  alternates: {
    canonical: "https://marathalageen.com/terms",
  },
  openGraph: {
    title: "Terms & Conditions | Maratha Matrimony",
    description: "Official terms of service and community guidelines for registered candidates and families on Maratha Lageen platform.",
    url: "https://marathalageen.com/terms",
    siteName: "Maratha Matrimony",
    type: "website",
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "Terms & Conditions | Maratha Matrimony",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Maratha Matrimony",
    description: "Official terms of service and community guidelines for registered candidates and families on Maratha Lageen platform.",
  },
};

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
