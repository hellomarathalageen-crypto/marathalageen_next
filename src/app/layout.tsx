import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import PWAInstallPrompt from "@/components/ui/PWAInstallPrompt";
import GlobalFooter from "@/components/layout/GlobalFooter";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#121A3D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://marathalageen.com/#organization",
      "name": "Maratha Matrimony (मराठा लागीन)",
      "alternateName": [
        "Maratha Lageen",
        "Maratha Matrimony Karnataka",
        "Maratha Vadhu Var Suchak",
        "96 Kuli Maratha Matrimony"
      ],
      "url": "https://marathalageen.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://marathalageen.com/logo.png",
        "caption": "Maratha Matrimony Logo"
      },
      "image": "https://marathalageen.com/hero.webp",
      "description": "Karnataka & Maharashtra premier Maratha Matrimony platform for 96 Kuli Maratha, Kunbi Maratha, Deshastha Maratha, and Kshatriya Maratha families.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-8861962026",
        "contactType": "customer service",
        "areaServed": ["IN", "KA", "MH"],
        "availableLanguage": ["English", "Marathi", "Kannada", "Hindi"]
      },
      "sameAs": [
        "https://www.facebook.com/marathalageen",
        "https://www.instagram.com/marathalageen"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://marathalageen.com/#website",
      "url": "https://marathalageen.com",
      "name": "Maratha Matrimony",
      "description": "Karnataka #1 Trusted Maratha Community Matchmaking Network",
      "publisher": {
        "@id": "https://marathalageen.com/#organization"
      },
      "inLanguage": ["en-IN", "mr-IN", "kn-IN"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://marathalageen.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Service",
      "@id": "https://marathalageen.com/#service",
      "name": "Maratha Community Matrimonial & Matchmaking Services",
      "serviceType": "Matrimony, Vedic Kundali Milan & Devak Matching",
      "provider": {
        "@id": "https://marathalageen.com/#organization"
      },
      "areaServed": [
        { "@type": "State", "name": "Karnataka" },
        { "@type": "State", "name": "Maharashtra" },
        { "@type": "Country", "name": "India" }
      ],
      "offers": {
        "@type": "Offer",
        "name": "Early Bird VIP Pre-Registration Membership",
        "price": "0",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "description": "Complimentary VIP Premium membership worth ₹4,999 during early registration."
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://marathalageen.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is this platform exclusively for the Maratha community?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Maratha Lageen is dedicated solely to Maratha families across Karnataka (including 96 Kuli Maratha, Kunbi Maratha, Deshastha Maratha, and Kshatriya Maratha)."
          }
        },
        {
          "@type": "Question",
          "name": "Is there any fee or charge to pre-register today?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, pre-registration is 100% free. The first 5,000 families receive a Complimentary VIP Membership worth ₹4,999 with zero hidden charges."
          }
        },
        {
          "@type": "Question",
          "name": "Can parents, siblings, or guardians register on behalf of the candidate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Parents, brothers, sisters, or legal guardians can register and manage the matrimonial profile with complete family consent."
          }
        },
        {
          "@type": "Question",
          "name": "How is candidate privacy and photo security safeguarded?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Your contact number is masked and protected. Photos can be kept private upon request, and contact details are only unlocked for verified members with mutual family interest."
          }
        },
        {
          "@type": "Question",
          "name": "How does the platform match Gotras and Devak?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our system checks traditional Maratha lineage rules, respecting Devak alignment and Gotra exclusions to suggest culturally authentic alliances."
          }
        },
        {
          "@type": "Question",
          "name": "What is included in the Complimentary ₹4,999 VIP Membership?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Early bird VIP access includes direct WhatsApp connects, contact number unlocking, 36 Gunas Vedic Kundali Milan, and priority placement in match recommendations."
          }
        },
        {
          "@type": "Question",
          "name": "Can I update my photo, education, or horoscope after pre-registering?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, once you log in to your dashboard, you can update your bio, upload additional gallery photos, update horoscope charts, and adjust partner preferences anytime."
          }
        },
        {
          "@type": "Question",
          "name": "When will the platform officially launch with live matching?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We are concluding our initial Karnataka pre-registration drive and rolling out live matching and direct messaging shortly with thousands of verified profiles."
          }
        }
      ]
    }
  ]
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
    default: "Maratha Matrimony (मराठा लागीन) | Karnataka #1 Trusted Community Matchmaking",
    template: "%s | Maratha Matrimony",
  },
  description: "🚩 ಜೈ ಭವಾನಿ, ಜೈ ಶಿವಾಜಿ! Karnataka premier Maratha Matrimony platform. Connect with 96 Kuli Maratha, Kunbi, Deshastha brides & grooms with authentic Devak, Gotra & Kundali matching. Claim ₹4,999 Free VIP access.",
  keywords: [
    "Maratha Matrimony",
    "Karnataka Maratha Matrimony",
    "Maratha Lageen",
    "Maratha Vadhu Var Suchak",
    "96 Kuli Maratha Matrimony",
    "Belagavi Maratha Matrimony",
    "Hubli Maratha Matrimony",
    "Bangalore Maratha Matrimony",
    "Dharwad Maratha Samaj",
    "Maratha Matchmaking",
    "Maratha Bride Groom",
    "Vedic Kundali Milan Maratha",
    "Maratha Gotra Devak Match"
  ],
  authors: [{ name: "Maratha Matrimony Karnataka" }],
  creator: "Maratha Matrimony",
  publisher: "Maratha Matrimony",
  alternates: {
    canonical: "https://marathalageen.com",
    languages: {
      "en-IN": "https://marathalageen.com",
      "mr-IN": "https://marathalageen.com",
      "kn-IN": "https://marathalageen.com",
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Maratha Matrimony (मराठा लागीन) | Karnataka #1 Trusted Community Matchmaking",
    description: "🚩 ಜೈ ಭವಾನಿ, ಜೈ ಶಿವಾಜಿ! Join Karnataka exclusive Maratha Matrimony network. Claim ₹4,999 VIP Premium completely Free during pre-registration.",
    url: "https://marathalageen.com",
    siteName: "Maratha Matrimony",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "Maratha Matrimony - Sacred Lineage, Destined Souls",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maratha Matrimony (मराठा लागीन) | Karnataka",
    description: "Karnataka #1 Exclusive Maratha Matrimony platform. Claim ₹4,999 VIP Free Premium.",
    images: ["/hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/hero.webp" type="image/webp" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${poppins.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <NextAuthProvider>
          <LanguageProvider>
          <div className="flex-1 flex flex-col min-h-0">
            {children}
          </div>
          <GlobalFooter />
          <PWAInstallPrompt />
        </LanguageProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
