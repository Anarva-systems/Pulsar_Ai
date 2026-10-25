export default function SchemaOrg() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://pulsaragent.in/#organization",
        "name": "PulsarAI",
        "alternateName": [
          "Pulsar AI",
          "Pulsar Agent",
          "PulsarAI Vega",
          "Pulsar Autonomous Agents",
          "pulsaragent.in",
          "pulsarai.com",
          "Pulsar"
        ],
        "url": "https://pulsaragent.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://pulsaragent.in/pulsar-logo-dark.png",
          "width": 512,
          "height": 512,
          "caption": "PulsarAI Official Logo"
        },
        "disambiguatingDescription":
          "PulsarAI is an enterprise AI software company building Vega, an autonomous desktop agent platform for customer support automation—distinct from Apache Pulsar or Pulsar social listening.",
        "sameAs": [
          "https://github.com/Anarva-systems/Pulsar_Ai",
          "https://github.com/pulsarai",
          "https://www.linkedin.com/company/pulsarai",
          "https://x.com/pulsarai",
          "https://twitter.com/pulsaragent"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://pulsaragent.in/#website",
        "url": "https://pulsaragent.in",
        "name": "PulsarAI",
        "alternateName": ["Pulsar AI", "Pulsar Agent", "PulsarAI Vega", "pulsaragent.in"],
        "publisher": {
          "@id": "https://pulsaragent.in/#organization"
        },
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
        "name": "PulsarAI (Powered by Vega)",
        "alternateName": ["PulsarAI", "Vega AI Agent", "Pulsar Agent", "Pulsar AI Desktop Platform"],
        "operatingSystem": "Windows, macOS, Linux, Cloud (AWS)",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Autonomous AI Agent & Customer Support Automation",
        "description":
          "Autonomous desktop platform and AI agent (Vega) that executes end-to-end customer support workflows, verifies ground truth against live ERPs, and executes native desktop actions.",
        "creator": {
          "@id": "https://pulsaragent.in/#organization"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "featureList": [
          "Autonomous Desktop Execution Loop",
          "Deterministic Policy & Financial Risk Gating",
          "Clickable Ground Truth Source Provenance Chips",
          "Air-Gapped Payment & Bank 3DS Perimeter",
          "Sub-180ms Conversational Voice Support",
          "Single-Use Cryptographic Human Approvals",
          "Live OMS and ERP Database Verification",
          "Double-Entry Audit Ledger Logging"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "142",
          "bestRating": "5"
        }
      },
      {
        "@type": "VideoObject",
        "@id": "https://pulsaragent.in/#video",
        "name": "PulsarAI: Autonomous Desktop Agents Powered by Vega (Official Demo)",
        "description":
          "Watch Vega by PulsarAI execute autonomous customer support workflows, verify live order systems, and draft source-grounded resolutions in real time.",
        "thumbnailUrl": "https://pulsaragent.in/pulsar-og.jpg",
        "uploadDate": "2026-10-15T00:00:00+00:00",
        "contentUrl": "https://pulsaragent.in/pulsar-launch-with-music.mp4",
        "embedUrl": "https://pulsaragent.in",
        "publisher": {
          "@id": "https://pulsaragent.in/#organization"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://pulsaragent.in/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is PulsarAI (Powered by Vega)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PulsarAI is an autonomous desktop agent platform powered by Vega for end-to-end customer support automation and desktop execution. Specialised AI agents investigate ground truth, deterministic code decides, and authorized systems execute real-world outcomes without hallucinations."
            }
          },
          {
            "@type": "Question",
            "name": "What is Vega by PulsarAI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vega is the proprietary autonomous AI agent built by PulsarAI. Vega handles customer interactions across email, voice, and chat, verifies live external systems, and executes complex desktop workflows with strict human approvals on financial decisions."
            }
          },
          {
            "@type": "Question",
            "name": "Is PulsarAI related to Apache Pulsar or other Pulsar products?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. PulsarAI (pulsaragent.in) is an enterprise autonomous desktop AI agent company building Vega for customer support automation. It is completely independent and distinct from Apache Pulsar (the open-source distributed messaging system), Pulsar social listening, and Bajaj Pulsar."
            }
          },
          {
            "@type": "Question",
            "name": "How does PulsarAI eliminate hallucinations in customer support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PulsarAI decouples probabilistic AI reasoning from deterministic business authority. Models only draft proposals; formal finite state machines, financial risk ceilings, and live ERP data strictly decide and execute mutations. Every fact in drafted responses links to its authoritative system source."
            }
          },
          {
            "@type": "Question",
            "name": "Does PulsarAI support real-time conversational voice?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, PulsarAI provides sub-180ms voice roundtrip latency with natural speech cadence, instant barge-in interruption handling, and real-time caller verification."
            }
          },
          {
            "@type": "Question",
            "name": "How does PulsarAI protect payment transactions and refunds?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "All monetary refunds require human operator approval with single-use cryptographic tokens. In commerce copilot workflows, sensitive payment steps such as 3DS card verification and bank OTPs stay strictly air-gapped on the customer's native device, never touching AI models."
            }
          },
          {
            "@type": "Question",
            "name": "Where does PulsarAI run and how can I get early access?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PulsarAI runs today as a local desktop workspace with Python, PostgreSQL, and local models for Windows, macOS, and Linux, with managed enterprise cloud hosting available through early access at pulsaragent.in."
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
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
