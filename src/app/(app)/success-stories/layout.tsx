import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories & Blessed Marriages | Maratha Matrimony",
  description: "Read authentic marriage success stories of Maratha couples united through Maratha Lageen platform across Karnataka and Maharashtra.",
  keywords: ["Maratha Matrimony Success Stories","Maratha Marriage Reviews","Maratha Vadhu Var Kundali Matches","Happy Maratha Couples"],
  alternates: {
    canonical: "https://marathalageen.com/success-stories",
  },
  openGraph: {
    title: "Success Stories & Blessed Marriages | Maratha Matrimony",
    description: "Read authentic marriage success stories of Maratha couples united through Maratha Lageen platform across Karnataka and Maharashtra.",
    url: "https://marathalageen.com/success-stories",
    siteName: "Maratha Matrimony",
    type: "website",
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "Success Stories & Blessed Marriages | Maratha Matrimony",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Success Stories & Blessed Marriages | Maratha Matrimony",
    description: "Read authentic marriage success stories of Maratha couples united through Maratha Lageen platform across Karnataka and Maharashtra.",
  },
};

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
