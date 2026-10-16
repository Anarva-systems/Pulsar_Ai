import type { Metadata, Viewport } from "next";
import "./globals.css";
import SchemaOrg from "./components/SchemaOrg";

export const viewport: Viewport = {
  themeColor: "#ffd9dd",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pulsaragent.in"),
  title: {
    default: "PulsarAI — Autonomous Desktop AI Agents & Customer Support Automation",
    template: "%s | PulsarAI",
  },
  description:
    "PulsarAI is the autonomous desktop agent platform powered by Vega. Automate end-to-end customer support workflows and complex desktop tasks in real time.",
  applicationName: "PulsarAI",
  keywords: [
    "PulsarAI",
    "Pulsar AI",
    "Vega AI Agent",
    "PulsarAI Vega",
    "Autonomous Desktop Agent",
    "AI Customer Support Automation",
    "Agentic Workflow Platform",
    "Pulsar Agent",
    "pulsaragent.in",
    "Pulsar vs Apache Pulsar",
    "Deterministic AI Agent",
    "Pulsar Support Engine",
    "Anarva Pulsar",
    "Sub-180ms Voice AI Support",
  ],
  authors: [
    { name: "PulsarAI Team", url: "https://pulsaragent.in" },
    { name: "Anarva Systems", url: "https://pulsaragent.in" },
  ],
  creator: "PulsarAI",
  publisher: "PulsarAI",
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
    locale: "en_US",
    url: "https://pulsaragent.in",
    siteName: "PulsarAI",
    title: "PulsarAI — Autonomous Desktop AI Agents (Powered by Vega)",
    description:
      "Meet Vega, the autonomous desktop agent by PulsarAI that sees, reasons, and resolves complex customer support workflows natively.",
    images: [
      {
        url: "/pulsar-og.jpg",
        width: 1200,
        height: 630,
        alt: "PulsarAI Autonomous Desktop Platform and Vega AI Agent Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PulsarAI — Autonomous Desktop Agents Powered by Vega",
    description:
      "End-to-end customer support automation and native desktop execution with Vega by PulsarAI.",
    images: ["/pulsar-og.jpg"],
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
    <html lang="en">
      <head>
        <link rel="canonical" href="https://pulsaragent.in" />
        <link rel="preload" href="/wmremove-transformed.webp" as="image" type="image/webp" />
        <link rel="preload" href="/footer.webp" as="image" type="image/webp" />
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

        {/* Enterprise Entity Disambiguation Schema */}
        <SchemaOrg />

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
