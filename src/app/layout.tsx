import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#081326",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pulsar.ai"),
  title: {
    default: "Pulsar — Turns Customer Conversations into Verified, Controlled Action",
    template: "%s | Pulsar",
  },
  description:
    "Pulsar is an AI-native customer operations platform across voice, chat, and email where specialised AI agents understand, investigate, and propose — while deterministic systems decide and authorized systems execute.",
  keywords: [
    "Pulsar",
    "Customer Operations",
    "Autonomous Support Engine",
    "Conversational Commerce",
    "Multi-Agent Architecture",
    "Voice Support",
    "Deterministic Decision Engine",
    "Enterprise AI",
  ],
  authors: [{ name: "Pulsar Inc.", url: "https://pulsar.ai" }],
  creator: "Pulsar Inc.",
  publisher: "Pulsar Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://pulsar.ai",
  },
  openGraph: {
    title: "Pulsar — Turns Customer Conversations into Verified, Controlled Action",
    description:
      "Pulsar is an AI-native customer operations platform across voice, chat, and email. Specialised AI agents propose, deterministic systems decide, and authorized systems execute.",
    url: "https://pulsar.ai",
    siteName: "Pulsar AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/pulsar-og.jpg",
        width: 1200,
        height: 630,
        alt: "Pulsar Customer Operations Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulsar — Turns Customer Conversations into Verified, Controlled Action",
    description:
      "AI-native customer operations platform. AI proposes. Deterministic systems decide. Authorized systems execute.",
    images: ["/pulsar-og.jpg"],
    creator: "@pulsar_ai",
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
  icons: {
    icon: "/pulsar-logo-dark.png",
    shortcut: "/pulsar-logo-dark.png",
    apple: "/pulsar-logo-dark.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://pulsar.ai/#organization",
        "name": "Pulsar Inc.",
        "url": "https://pulsar.ai",
        "logo": "https://pulsar.ai/pulsar-logo-light.png",
        "sameAs": [
          "https://twitter.com/pulsar_ai",
          "https://www.linkedin.com/company/pulsar-ai"
        ],
        "description": "Enterprise infrastructure layer for deterministic and safe autonomous AI agent execution."
      },
      {
        "@type": "WebSite",
        "@id": "https://pulsar.ai/#website",
        "url": "https://pulsar.ai",
        "name": "Pulsar AI",
        "publisher": { "@id": "https://pulsar.ai/#organization" },
        "inLanguage": "en-US"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://pulsar.ai/#software",
        "name": "Pulsar Runtime",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Cloud-native (AWS, EKS, Bedrock)",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/PreOrder"
        },
        "description": "Production-ready runtime decoupling probabilistic AI perception from deterministic state transitions with ACID ledger commits."
      }
    ]
  };
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/wmremove-transformed.webp" as="image" type="image/webp" />
        <link rel="preload" href="/footer.webp" as="image" type="image/webp" />
        <link rel="preload" href="/pulsar-logo-light.png" as="image" type="image/png" />
        <link rel="preload" href="/pulsar-logo-dark.png" as="image" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400;1,6..72,500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.warn('SW registration failed:', err);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
