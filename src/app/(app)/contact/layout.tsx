import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Helpline Support | Maratha Matrimony",
  description: "Get in touch with Maratha Matrimony family assistance team. Reach our Belagavi & Bengaluru customer care via WhatsApp, phone, or email.",
  keywords: ["Contact Maratha Matrimony","Maratha Lageen Helpline","Maratha Vadhu Var Customer Care","Belagavi Matrimony Contact"],
  alternates: {
    canonical: "https://marathalageen.com/contact",
  },
  openGraph: {
    title: "Contact & Helpline Support | Maratha Matrimony",
    description: "Get in touch with Maratha Matrimony family assistance team. Reach our Belagavi & Bengaluru customer care via WhatsApp, phone, or email.",
    url: "https://marathalageen.com/contact",
    siteName: "Maratha Matrimony",
    type: "website",
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "Contact & Helpline Support | Maratha Matrimony",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Helpline Support | Maratha Matrimony",
    description: "Get in touch with Maratha Matrimony family assistance team. Reach our Belagavi & Bengaluru customer care via WhatsApp, phone, or email.",
  },
};

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
