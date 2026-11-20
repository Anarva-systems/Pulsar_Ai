import type { Metadata, Viewport } from "next";
import "./globals.css";
import SchemaOrg from "./SchemaOrg";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pulsaragent.in"),
  title: {
    default: "Pulsar Agent — AI-Powered Business Operator for Small Businesses",
    template: "%s | Pulsar Agent",
  },
  description:
    "Run your entire business through a conversation. Phone-first, AI-native business assistant and operating platform for small businesses in India across WhatsApp, orders, and UPI payments in Hindi, Telugu, and English.",
  applicationName: "Pulsar Agent",
  keywords: [
    "Pulsar Agent",
    "Pulsar AI",
    "AI Business Operator",
    "Small Business AI Assistant India",
    "WhatsApp Commerce AI",
    "Hindi Telugu English Business Assistant",
    "UPI Payment Reconciliation",
    "AI Order Management",
    "pulsaragent.in",
    "Anarva Pulsar",
    "Razorpay AI Integration",
    "Voice AI Merchant Assistant",
  ],
  authors: [
    { name: "Pulsar Agent Team", url: "https://pulsaragent.in" },
    { name: "Anarva Systems", url: "https://pulsaragent.in" },
  ],
  creator: "Pulsar Agent",
  publisher: "Pulsar Agent",
  generator: "Next.js",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://pulsaragent.in",
    siteName: "Pulsar Agent",
    title: "Pulsar Agent — Your AI-Powered Business Operator",
    description:
      "Run your entire business through a conversation. Phone-first, AI-native business assistant for small businesses in India.",
    images: [
      {
        url: "/pulsar-og.png",
        width: 1803,
        height: 897,
        alt: "Pulsar Agent — AI-Powered Business Operator for India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulsar Agent — Your AI-Powered Business Operator",
    description:
      "Phone-first, AI-native operating partner for small businesses in India. Multilingual support across Hindi, Telugu, and English.",
    images: ["/pulsar-og.png"],
    creator: "@pulsaragent",
    site: "@pulsaragent",
  },
  icons: {
    icon: [
      { url: "/pulsar-logo-dark.png", sizes: "32x32", type: "image/png" },
      { url: "/pulsar-logo-light.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/pulsar-logo-dark.png",
    apple: "/pulsar-logo-dark.png",
  },
  manifest: "/manifest.json",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://pulsaragent.in" />
        <link rel="preload" href="/wmremove-transformed.webp" as="image" type="image/webp" />
        <link rel="preload" href="/pulsar-logo-light.png" as="image" type="image/png" />
        <link rel="preload" href="/pulsar-logo-dark.png" as="image" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400;1,6..72,500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Bricolage+Grotesque:wght@600;700;800&family=Instrument+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="google-site-verification" content="Upx7NaTP6i2H1dDakQIjqHDP0bELRVoiXapUINdzt48" />
        {/* Enterprise Entity Disambiguation Schema */}
        <SchemaOrg />

        <script
          id="sw-handler"
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                  navigator.serviceWorker.getRegistrations().then(function(regs) {
                    for (var r of regs) { r.unregister(); }
                  });
                  if ('caches' in window) {
                    caches.keys().then(function(names) {
                      for (var n of names) { caches.delete(n); }
                    });
                  }
                } else {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').catch(function(err) {
                      console.warn('SW registration failed:', err);
                    });
                  });
                }
              }
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
