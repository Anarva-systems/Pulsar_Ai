import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#081326",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pulsaragent.in"),
  title: {
    default: "Pulsar Agent — Autonomous Customer Operations & AI Support Engine",
    template: "%s | Pulsar Agent",
  },
  description:
    "Pulsar Agent (pulsaragent.in) connects voice, chat, and email to verified AI agents. Specialised AI investigates, deterministic rules decide, and authorized systems execute safely.",
  keywords: [
    "Pulsar Agent",
    "pulsaragent.in",
    "Pulsar AI",
    "Pulsar AI Agent",
    "Autonomous Support Engine",
    "Autonomous Customer Operations",
    "Conversational Commerce Copilot",
    "Multi-Agent Architecture",
    "Real-Time Voice AI Agent",
    "Sub-180ms Voice Support",
    "Deterministic Decision Engine",
    "Enterprise AI Agents",
    "Customer Support Automation",
    "Anarva Pulsar",
    "PCI Air-Gapped Payment Security",
    "Idempotent Execution Layer",
    "Automated Resolution Engine",
  ],
  authors: [{ name: "Pulsar Inc.", url: "https://pulsaragent.in" }, { name: "Anarva", url: "https://pulsaragent.in" }],
  creator: "Pulsar Inc.",
  publisher: "Pulsar Inc.",
  applicationName: "Pulsar Agent",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://pulsaragent.in",
  },
  openGraph: {
    title: "Pulsar Agent — Autonomous Customer Operations & AI Support Engine",
    description:
      "Pulsar Agent (pulsaragent.in) connects voice, chat, and email to verified AI agents with sub-180ms real-time speech and deterministic action execution.",
    url: "https://pulsaragent.in",
    siteName: "Pulsar Agent",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/pulsar-og.jpg",
        width: 1200,
        height: 630,
        alt: "Pulsar Agent — Autonomous Customer Operations Engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulsar Agent — Autonomous Customer Operations & AI Support Engine",
    description:
      "Enterprise autonomous customer operations engine. Connect voice, chat, and email to verified AI agents with sub-180ms real-time speech and deterministic execution.",
    images: ["/pulsar-og.jpg"],
    creator: "@pulsaragent",
    site: "@pulsaragent",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
  category: "technology",
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
        "@id": "https://pulsaragent.in/#organization",
        "name": "Pulsar Agent",
        "alternateName": ["Pulsar AI", "pulsaragent.in", "Pulsar Autonomous Customer Operations", "Pulsar Inc."],
        "url": "https://pulsaragent.in",
        "logo": "https://pulsaragent.in/pulsar-logo-light.png",
        "sameAs": [
          "https://twitter.com/pulsaragent",
          "https://www.linkedin.com/company/pulsar-ai",
          "https://github.com/Anarva-systems/Pulsar_Ai"
        ],
        "description": "Enterprise infrastructure layer for deterministic and safe autonomous AI agent customer operations."
      },
      {
        "@type": "WebSite",
        "@id": "https://pulsaragent.in/#website",
        "url": "https://pulsaragent.in",
        "name": "Pulsar Agent",
        "alternateName": "Pulsar AI",
        "publisher": { "@id": "https://pulsaragent.in/#organization" },
        "inLanguage": "en-US",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://pulsaragent.in/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://pulsaragent.in/#software",
        "name": "Pulsar Agent Runtime",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Cloud-native (AWS, EKS, Bedrock, Vercel)",
        "description": "Enterprise autonomous customer operations engine across voice, chat, and email with deterministic verification and ACID ledger execution.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/PreOrder"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "142",
          "bestRating": "5"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://pulsaragent.in/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Pulsar Agent (pulsaragent.in)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pulsar Agent is an enterprise autonomous customer operations engine connecting voice, chat, and email to verified AI agents. Specialised AI agents investigate ground truth, deterministic systems decide, and verified systems execute real-world outcomes."
            }
          },
          {
            "@type": "Question",
            "name": "How does Pulsar eliminate hallucinations in customer support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pulsar decouples probabilistic AI perception from deterministic decision-making. AI models only propose actions; formal finite state machines, risk gates, and ERP systems mathematically decide and execute mutations."
            }
          },
          {
            "@type": "Question",
            "name": "Does Pulsar Agent support real-time conversational voice?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Pulsar Agent provides sub-180ms voice roundtrip synthesis with full real-time barge-in interruption and live caller verification."
            }
          },
          {
            "@type": "Question",
            "name": "How does Pulsar protect payment transactions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sensitive payment steps such as 3DS and OTP bank verification stay strictly air-gapped outside the AI. The customer maintains authenticated device authority at all times."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://pulsaragent.in/#breadcrumbs",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://pulsaragent.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Autonomous Support Engine",
            "item": "https://pulsaragent.in#support-engine"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Interactive Commerce Copilot",
            "item": "https://pulsaragent.in#commerce-copilot"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Architecture",
            "item": "https://pulsaragent.in#architecture"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Early Access",
            "item": "https://pulsaragent.in#early-access"
          }
        ]
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
