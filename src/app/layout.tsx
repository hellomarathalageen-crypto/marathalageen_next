import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import PWAInstallPrompt from "@/components/ui/PWAInstallPrompt";
import GlobalFooter from "@/components/layout/GlobalFooter";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  themeColor: "#121A3D",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://marathalageen.com"),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  title: {
    default: "Maratha Matrimony (मराठा लागीन) | Karnataka's #1 Trusted Community Matchmaking",
    template: "%s | Maratha Matrimony",
  },
  description: "🚩 ಜೈ ಭವಾನಿ, ಜೈ ಶಿವಾಜಿ! Karnataka's most trusted Maratha Matrimony platform. Pre-register now to claim ₹4,999 Free VIP Premium access.",
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
    description: "🚩 ಜೈ ಭವಾನಿ, ಜೈ ಶಿವಾಜಿ! Join Karnataka's exclusive Maratha Matrimony network. Claim ₹4,999 VIP Premium completely Free during pre-registration.",
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
          <div className="flex-1 flex flex-col min-h-0">
            {children}
          </div>
          <GlobalFooter />
          <PWAInstallPrompt />
        </NextAuthProvider>
      </body>
    </html>
  );
}
