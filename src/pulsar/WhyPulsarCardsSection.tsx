"use client";

const CAPS = [
  {
    n: "01",
    title: "Deterministic decisions",
    desc: "Policy, risk, and authorization rules evaluate every proposal. The answer is identical on the first ticket and the millionth.",
  },
  {
    n: "02",
    title: "Verified against live systems",
    desc: "Orders, accounts, transactions, and delivery status are checked before anything is promised or executed.",
  },
  {
    n: "03",
    title: "Safe by construction",
    desc: "Idempotent actions inside financial ceilings execute automatically. Everything else stops for a human.",
  },
  {
    n: "04",
    title: "Auditable end to end",
    desc: "Every proposal, check, and action lands in a complete audit trail you can replay ticket by ticket.",
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
              AI proposes. Deterministic systems decide.
            </h2>
          </div>
          <p className="ps-lede ps-reveal" style={{ ["--rd" as string]: "160ms" }}>
            This split is what moves Pulsar from AI that talks about solving problems
            to AI that solves them in production, under your rules.
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
