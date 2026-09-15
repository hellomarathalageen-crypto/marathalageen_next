import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Karnataka Premier Maratha Matrimonial Platform",
  description: "Learn about Maratha Lageen mission to unite Maratha families across Karnataka & Maharashtra with trust, authentic lineage verification, and Vedic Kundali matchmaking.",
  keywords: ["About Maratha Lageen","Maratha Matrimony Mission","Maratha Community Matchmaking Karnataka","96 Kuli Maratha Trust"],
  alternates: {
    canonical: "https://marathalageen.com/about",
  },
  openGraph: {
    title: "About Us | Karnataka Premier Maratha Matrimonial Platform",
    description: "Learn about Maratha Lageen mission to unite Maratha families across Karnataka & Maharashtra with trust, authentic lineage verification, and Vedic Kundali matchmaking.",
    url: "https://marathalageen.com/about",
    siteName: "Maratha Matrimony",
    type: "website",
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "About Us | Karnataka Premier Maratha Matrimonial Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Karnataka Premier Maratha Matrimonial Platform",
    description: "Learn about Maratha Lageen mission to unite Maratha families across Karnataka & Maharashtra with trust, authentic lineage verification, and Vedic Kundali matchmaking.",
  },
};

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
