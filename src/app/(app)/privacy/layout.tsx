import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy & Photo Security | Maratha Matrimony",
  description: "Learn how Maratha Matrimony safeguards candidate biodatas, phone masking, photo privacy shields, and family confidentiality.",
  keywords: ["Maratha Matrimony Privacy","Photo Privacy Shield","Candidate Data Protection","Verified Biodata Security"],
  alternates: {
    canonical: "https://marathalageen.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy & Photo Security | Maratha Matrimony",
    description: "Learn how Maratha Matrimony safeguards candidate biodatas, phone masking, photo privacy shields, and family confidentiality.",
    url: "https://marathalageen.com/privacy",
    siteName: "Maratha Matrimony",
    type: "website",
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "Privacy Policy & Photo Security | Maratha Matrimony",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy & Photo Security | Maratha Matrimony",
    description: "Learn how Maratha Matrimony safeguards candidate biodatas, phone masking, photo privacy shields, and family confidentiality.",
  },
};

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
