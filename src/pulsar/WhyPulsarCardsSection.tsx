"use client";

const CAPS = [
  {
    n: "01",
    title: "Conversation-first operations",
    desc: "Run your entire business through natural voice or text in Hindi, Telugu, or English without navigating complex forms or dashboards.",
  },
  {
    n: "02",
    title: "Merchant-owned payments",
    desc: "Money settles directly into your own Razorpay or UPI bank account. Pulsar prepares the links but never holds your funds.",
  },
  {
    n: "03",
    title: "Business-specific intelligence",
    desc: "Your personal agent maintains structured memory of your catalogue, pricing, customer preferences, and store policies.",
  },
  {
    n: "04",
    title: "Zero-risk financial gating",
    desc: "Sensitive financial actions stay protected by deterministic rules. AI prepares orders, but every payment link requires owner approval.",
  },
] as const;

function RowArrow() {
  return (
    <svg className="arrow" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WhyPulsarCardsSection() {
  return (
    <section className="ps-section" id="why-pulsar">
      <div className="ps-container">
        <div className="caps-head">
          <div>
            <span className="ps-kicker ps-reveal">Why Pulsar</span>
            <h2 className="ps-h2 ps-reveal" style={{ ["--rd" as string]: "80ms" }}>
              Pulsar proposes. The business owner decides.
            </h2>
          </div>
          <p className="ps-lede ps-reveal" style={{ ["--rd" as string]: "160ms" }}>
            This split is what makes Pulsar an authentic operating partner: conversational delegation with deterministic control over your cash flow and store policies.
          </p>
        </div>

        <ul className="caps-list">
          {CAPS.map((c, i) => (
            <li
              key={c.n}
              className="caps-row ps-reveal"
              style={{ ["--rd" as string]: `${i * 60}ms` }}
            >
              <span className="num">{c.n}</span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <RowArrow />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
