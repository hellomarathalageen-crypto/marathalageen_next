import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marathalageen.com"),
  title: {
    default: "Maratha Matrimony (मराठा लागीन) | Karnataka's #1 Trusted Community Matchmaking",
    template: "%s | Maratha Matrimony",
  },
  description: "🚩 Jai Jijau, Jai Shivray! Karnataka's most trusted Maratha Matrimony platform. Pre-register now to claim ₹4,999 Free VIP Premium access.",
  keywords: [
    "Maratha Matrimony",
    "Karnataka Maratha Matrimony",
    "Maratha Lageen",
    "Maratha Vadhu Var Suchak",
    "Belagavi Maratha Matrimony",
    "Hubli Maratha Matrimony",
    "Bangalore Maratha Matrimony",
    "Dharwad Maratha Samaj",
    "Maratha Matchmaking",
    "Maratha Bride Groom",
    "96 Kuli Maratha Karnataka"
  ],
  authors: [{ name: "Maratha Matrimony Karnataka" }],
  creator: "Maratha Matrimony",
  publisher: "Maratha Matrimony",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Maratha Matrimony (मराठा लागीन) | Karnataka's #1 Trusted Community Matchmaking",
    description: "🚩 Jai Jijau, Jai Shivray! Join Karnataka's exclusive Maratha Matrimony network. Claim ₹4,999 VIP Premium completely Free during pre-registration.",
    url: "https://marathalageen.com",
    siteName: "Maratha Matrimony",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maratha Matrimony (मराठा लागीन) | Karnataka",
    description: "Karnataka's #1 Exclusive Maratha Matrimony platform. Claim ₹4,999 VIP Free Premium.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
