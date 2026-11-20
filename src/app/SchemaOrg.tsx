export default function SchemaOrg() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://pulsaragent.in/#organization",
        "name": "Pulsar Agent",
        "alternateName": [
          "Pulsar Agent",
          "Pulsar AI",
          "Pulsar Business Operator",
          "pulsaragent.in",
          "Pulsar"
        ],
        "url": "https://pulsaragent.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://pulsaragent.in/pulsar-logo-dark.png",
          "width": 512,
          "height": 512,
          "caption": "Pulsar Agent Official Logo"
        },
        "disambiguatingDescription":
          "Pulsar Agent is a phone-first, AI-native business assistant and operating platform for small businesses in India—distinct from Apache Pulsar or Pulsar social listening.",
        "sameAs": [
          "https://github.com/Anarva-systems/Pulsar_Ai",
          "https://www.linkedin.com/company/pulsar-agent-ai",
          "https://x.com/PulsarAgentAI"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://pulsaragent.in/#website",
        "url": "https://pulsaragent.in",
        "name": "Pulsar Agent",
        "alternateName": ["Pulsar Agent", "Pulsar AI", "pulsaragent.in"],
        "publisher": {
          "@id": "https://pulsaragent.in/#organization"
        },
        "inLanguage": "en-IN",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://pulsaragent.in/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://pulsaragent.in/#software",
        "name": "Pulsar Agent",
        "alternateName": ["Pulsar Agent", "Pulsar AI", "Pulsar Business Operating Platform"],
        "operatingSystem": "Android, iOS, Web",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Small Business Operating Assistant & Commerce Automation",
        "description":
          "Phone-first, AI-native business operating platform for Indian small businesses, home businesses, and independent merchants. Operates communication, catalogue, orders, and UPI payment collections across WhatsApp in Hindi, Telugu, and English.",
        "creator": {
          "@id": "https://pulsaragent.in/#organization"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        },
        "featureList": [
          "Conversational WhatsApp & Instagram Commerce",
          "Multilingual Voice Notes (Hindi, Telugu, English)",
          "AI Product Catalogue & Inventory Management",
          "Direct Merchant-Owned Razorpay & UPI Payments",
          "Deterministic Owner Financial Gating & Approvals",
          "Bank Webhook Payment Reconciliation",
          "Instant Digital Invoice & Receipt Generation",
          "Automated Website Creation for New Businesses"
        ],
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
            "name": "What is Pulsar Agent?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pulsar Agent is an AI-powered business operator designed for small businesses, independent sellers, home-based businesses, and local shops in India. It enables owners to run their business through conversation across WhatsApp, manage inventory, prepare orders, and collect payments directly via Razorpay and UPI."
            }
          },
          {
            "@type": "Question",
            "name": "Which languages does Pulsar Agent support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pulsar supports Hindi, Telugu, English, and common code-switching (Hinglish/Telugish) in both voice messages and text, enabling business owners and customers to communicate naturally."
            }
          },
          {
            "@type": "Question",
            "name": "How does payment collection work with Pulsar Agent?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Payments flow directly into the merchant's own connected payment account (such as Razorpay or UPI). Pulsar prepares the order and payment link, but sensitive payment links require merchant approval before sending. Pulsar verifies completion via bank webhook events, never from unverified screenshots."
            }
          },
          {
            "@type": "Question",
            "name": "Is Pulsar Agent related to Apache Pulsar or other Pulsar products?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Pulsar Agent (pulsaragent.in) is an AI-powered business operating platform for small businesses by Anarva. It is completely independent and distinct from Apache Pulsar (the open-source distributed messaging system), Pulsar social listening, and Bajaj Pulsar."
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
            "name": "PulsarAI Home",
            "item": "https://pulsaragent.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Customer Support Automation",
            "item": "https://pulsaragent.in#support-engine"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Vega Autonomous Agent",
            "item": "https://pulsaragent.in#commerce-copilot"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Why PulsarAI",
            "item": "https://pulsaragent.in#why-pulsar"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "How It Works",
            "item": "https://pulsaragent.in#how-it-works"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Proof & Transparency",
            "item": "https://pulsaragent.in#proof"
          },
          {
            "@type": "ListItem",
            "position": 7,
            "name": "Frequently Asked Questions",
            "item": "https://pulsaragent.in#faq"
          },
          {
            "@type": "ListItem",
            "position": 8,
            "name": "Early Access & Download",
            "item": "https://pulsaragent.in#early-access"
          }
        ]
      }
    ]
  };

  return (
    <script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
