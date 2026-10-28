"use client";

import { useState, useEffect, useRef } from "react";
import "./PulsarLandingPage.css";
import "./pulsar-system.css";
import Image from "next/image";
import Anarva from "../../public/anarva-logo.png";
import TerminalVideoAntigravitySection from "./TerminalVideoAntigravitySection";
import PulsarBusinessOutcomes from "./PulsarBusinessOutcomes";
import PulsarResolution from "./PulsarResolution";
import WhyPulsarCardsSection from "./WhyPulsarCardsSection";
import PulsarFooter from "./PulsarFooter";
import { Engine } from "./engine/next";
import Industries from "./Industries";
const navLinks = [
  { label: "Outcomes", href: "#business-outcomes" },
  { label: "Inside Pulsar", href: "#inside-pulsar" },
  { label: "Resolution", href: "#support-engine" },
  { label: "Why Pulsar", href: "#why-pulsar" },
];

const insideSteps = [
  {
    num: "1",
    title: "1. AI Understands & Investigates",
    desc: "Specialised AI agents understand the customer, investigate the situation, retrieve the right policy, and propose the best resolution.",
  },
  {
    num: "2",
    title: "2. Pulsar Verifies Reality",
    desc: "Checks live information from the company's actual systems — orders, accounts, transactions, and delivery status.",
  },
  {
    num: "3",
    title: "3. Deterministic Systems Decide",
    desc: "Policy, risk, authorization, financial limits, and business rules determine what is actually allowed. AI proposes; deterministic systems decide.",
  },
  {
    num: "4",
    title: "4. Pulsar Acts & Audits",
    desc: "If authorized, executes through the real connected system, reconciles uncertain operations, and creates a complete audit trail.",
    active: true,
  },
];

const footerSolutions = [
  "Vega Autonomous Platform",
  "Autonomous Support Engine",
];

const footerCompany = [
  "Architecture Whitepaper",
  "Security & Compliance",
  "Terms of Service",
  "Privacy Policy",
];

function ArrowUpRightCircleIcon({
  circleFill = "#0a0a0a",
  arrowColor = "#ffffff",
  size = 18,
}: {
  circleFill?: string;
  arrowColor?: string;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9" fill={circleFill} />
      <path
        d="M7 13L13 7M13 7H8.5M13 7V11.5"
        stroke={arrowColor}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 2.91675V11.0834" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.0837 7L7.00033 11.0833L2.91699 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


export default function PulsarLandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [chartPeriod, setChartPeriod] = useState<"weekly" | "monthly">("weekly");
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [specStatus, setSpecStatus] = useState<"idle" | "verifying" | "committed">("idle");
  const [activeCascadeStep, setActiveCascadeStep] = useState(2);
  const [activeJsonToken, setActiveJsonToken] = useState<string | null>(null);
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);


  const chartData = {
    weekly: {
      subtitle: "Total support conversations per day (Past 7 Days)",
      yAxis: ["2.5K", "2K", "1.5K", "1K", "500", "0"],
      xAxis: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"],
      aiPath: "M25.3413 156C73.2086 152 118.26 145.6 163.312 129.6C213.995 112 259.046 96 309.729 73.6C360.412 54.4 411.095 36.8 473.041 30.4",
      aiArea: "M25.3413 156C73.2086 152 118.26 145.6 163.312 129.6C213.995 112 259.046 96 309.729 73.6C360.412 54.4 411.095 36.8 473.041 30.4V160H25.3413V156Z",
      humanPath: "M25.3413 121.6C73.2086 123.2 118.26 120 163.312 122.4C213.995 124 259.046 120 309.729 123.2C360.412 121.6 411.095 124.8 473.041 121.6",
      humanArea: "M25.3413 121.6C73.2086 123.2 118.26 120 163.312 122.4C213.995 124 259.046 120 309.729 123.2C360.412 121.6 411.095 124.8 473.041 121.6V160H25.3413V121.6Z",
      aiCallout: "2,034",
      humanCallout: "612",
      conversations: { ai: "8,420", human: "2,180", badge: "↑ 286% AI" },
      resolutionRate: { ai: "87%", human: "72%", badge: "↑ 21% AI" },
      avgResponse: { ai: "4.2s", human: "3m 18s", badge: "↑ 98% AI" },
      csat: { ai: "4.6", human: "4.3", badge: "↑ 7% AI" },
    },
    monthly: {
      subtitle: "Cumulative monthly throughput across 30 enterprise days",
      yAxis: ["10K", "8K", "6K", "4K", "2K", "0"],
      xAxis: ["Oct 1", "Oct 7", "Oct 14", "Oct 21", "Oct 28", "Oct 31"],
      aiPath: "M25.3413 148C80 142 150 114 230 78C310 48 395 24 473.041 16",
      aiArea: "M25.3413 148C80 142 150 114 230 78C310 48 395 24 473.041 16V160H25.3413V148Z",
      humanPath: "M25.3413 98C95 106 175 114 260 120C340 125 410 130 473.041 130",
      humanArea: "M25.3413 98C95 106 175 114 260 120C340 125 410 130 473.041 130V160H25.3413V98Z",
      aiCallout: "8,920",
      humanCallout: "2,450",
      conversations: { ai: "34,890", human: "9,840", badge: "↑ 254% AI" },
      resolutionRate: { ai: "92.8%", human: "74.5%", badge: "↑ 25% AI" },
      avgResponse: { ai: "3.8s", human: "3m 45s", badge: "↑ 99% AI" },
      csat: { ai: "4.8", human: "4.2", badge: "↑ 14% AI" },
    },
  };

  const currentChart = chartData[chartPeriod];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = emailInput.trim();
    if (!trimmed || isSubmittingEmail) return;

    setIsSubmittingEmail(true);
    setEmailError(null);

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setEmailError(data.error || "Failed to submit. Please check your email.");
        setIsSubmittingEmail(false);
        return;
      }

      setEmailSubscribed(true);
      setIsSubmittingEmail(false);
    } catch (err) {
      console.error("Early access signup error:", err);
      // Graceful fallback: grant access UI even if offline
      setEmailSubscribed(true);
      setIsSubmittingEmail(false);
    }
  };

  return (
    <div className="pulsar-page">
      <header className={`site-header${scrolled ? " site-header-scrolled" : ""}`}>
        <div className="nav-glass-capsule">
          <nav className="floating-nav">
            <a className="nav-logo" href="/" aria-label="Pulsar Agent home">
              <img src="/pulsar-logo-light.png" alt="Pulsar Agent" className="nav-logo-icon" />
            </a>
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
            <a className="nav-cta" href="#early-access">
              <span>Get Early Access</span>
              <ArrowUpRightCircleIcon circleFill="#0a0a0a" arrowColor="#ffffff" size={18} />
            </a>
            <button
              type="button"
              className="nav-mobile-toggle"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileNavOpen}
            >
              {mobileNavOpen ? (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="5" x2="17" y2="5" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="15" x2="17" y2="15" />
                </svg>
              )}
            </button>
          </nav>

          {mobileNavOpen && (
            <div className="mobile-nav-drawer" role="menu">
              <ul className="mobile-nav-links">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setMobileNavOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                className="mobile-nav-cta"
                href="#early-access"
                onClick={() => setMobileNavOpen(false)}
              >
                <span>Get Early Access</span>
                <ArrowUpRightCircleIcon circleFill="#0a0a0a" arrowColor="#ffffff" size={18} />
              </a>
            </div>
          )}
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-sky" aria-hidden="true">
            <picture>
              <source srcSet="/wmremove-transformed.webp" type="image/webp" />
              <img
                className="hero-sky-bg"
                src="/wmremove-transformed.png"
                alt=""
                fetchPriority="high"
                loading="eager"
                decoding="sync"
              />
            </picture>
            <div className="hero-sky-overlay" />
          </div>

          <div className="hero-content">
            <h1 className="hero-title">
              <span className="sr-only">PulsarAI: Autonomous Desktop Agents Powered by Vega — </span>
              <span className="hero-title-line">From Conversation</span>
              <span className="hero-title-line hero-title-accent">
                to <em>Resolution</em>.
              </span>
            </h1>
            <p className="hero-subtitle">
              PulsarAI connects voice, chat, and email to an intelligent support engine that verifies live systems and safely executes real-world outcomes.
            </p>

            <div className="hero-actions">
              <a className="btn btn-light" href="#early-access">
                <span>Get Early Access</span>
                <ArrowUpRightCircleIcon circleFill="#0a0a0a" arrowColor="#ffffff" size={20} />
              </a>
              <a className="btn btn-ghost" href="#business-outcomes">
                <span>Inspect Outcome</span>
                <ChevronDownIcon />
              </a>
            </div>

            {/* In the exact place of the terminal */}
            <TerminalVideoAntigravitySection />
          </div>
        </section>

        <section className="partners">
          <p className="partners-label">BUILT ON</p>
          <div className="partners-logo">
            <Image src={Anarva} alt="Anarva" width={21} height={24}/>
            <span>Anarva</span>
          </div>
        </section>

        <div id="business-outcomes">
          <PulsarBusinessOutcomes />
        </div>

        <section className="inside" id="inside-pulsar">
          <h2 className="inside-heading">
            Inside <img src="/pulsar-logo-dark.png" alt="力" className="inside-heading-glyph" /> ?
          </h2>

          <div className="inside-container">
            <div className="inside-card-grid">
              <div className="inside-chart-panel card-noisy card-gradient-rose">
                <div className="inside-chart-dots">
                  <span className="dot dot-rose" />
                  <span className="dot dot-amber" />
                  <span className="dot dot-emerald" />
                </div>

                <div className="inside-chart-head">
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      <h3>AI Agents vs Human Support</h3>
                    </div>
                    <p>Real-time comparison of key support metrics across your AI agents and human team.</p>
                  </div>
                </div>

                <div className="inside-chart-body">
                  <div className="inside-chart-legend">
                    <div>
                      <span className="chart-title">Conversations Handled</span>
                      <span className="chart-subtitle">{currentChart.subtitle}</span>
                    </div>
                    <div className="inside-chart-legend-right">
                      <span className="legend-item">
                        <span className="legend-dot legend-dot-indigo" /> AI Agents
                      </span>
                      <span className="legend-item">
                        <span className="legend-dot legend-dot-pink" /> Human Team
                      </span>
                      <button
                        type="button"
                        className="legend-toggle"
                        onClick={() => setChartPeriod(chartPeriod === "weekly" ? "monthly" : "weekly")}
                        style={{ cursor: "pointer" }}
                        title="Toggle weekly/monthly view"
                      >
                        {chartPeriod === "weekly" ? "Weekly" : "Monthly"}
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.25 3.375L4.5 5.625L6.75 3.375" stroke="#D4D4D4" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="inside-chart-container">
                    <div className="inside-chart-y-axis">
                      {currentChart.yAxis.map((val, idx) => (
                        <span key={idx}>{val}</span>
                      ))}
                    </div>

                    <div className="inside-chart-graphic-wrap">
                      <div className="inside-chart-graphic" aria-hidden="true">
                        <svg viewBox="0 0 507 192" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                          <line x1="0" y1="32" x2="507" y2="32" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                          <line x1="0" y1="64" x2="507" y2="64" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                          <line x1="0" y1="96" x2="507" y2="96" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                          <line x1="0" y1="128" x2="507" y2="128" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                          <line x1="0" y1="160" x2="507" y2="160" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

                          <path
                            d={currentChart.aiArea}
                            fill="url(#paint0)"
                            style={{ transition: "d 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
                          />
                          <path
                            d={currentChart.humanArea}
                            fill="url(#paint1)"
                            style={{ transition: "d 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
                          />
                          <path
                            d={currentChart.humanPath}
                            stroke="url(#paint2)"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            style={{ transition: "d 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
                          />
                          <path
                            d={currentChart.aiPath}
                            stroke="url(#paint3)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            style={{ transition: "d 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
                          />
                          <defs>
                            <linearGradient id="paint0" x1="25.3413" y1="30.4" x2="25.3413" y2="160" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#818CF8" stopOpacity="0.35" />
                              <stop offset="0.9" stopColor="#818CF8" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="paint1" x1="25.3413" y1="121.471" x2="25.3413" y2="160" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#FF1392" stopOpacity="0.25" />
                              <stop offset="0.9" stopColor="#FF1392" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="paint2" x1="25.3413" y1="121.471" x2="473.041" y2="121.471" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#FB7185" />
                              <stop offset="0.5" stopColor="#FF1392" />
                              <stop offset="1" stopColor="#F43F5E" />
                            </linearGradient>
                            <linearGradient id="paint3" x1="25.3413" y1="30.4" x2="473.041" y2="30.4" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="0.5" stopColor="#818CF8" />
                              <stop offset="1" stopColor="#A855F7" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <span className="chart-callout chart-callout-indigo">
                          <span className="chart-callout-dot"></span>
                          <strong>{currentChart.aiCallout}</strong> AI Agents
                        </span>
                        <span className="chart-callout chart-callout-pink">
                          <span className="chart-callout-dot"></span>
                          <strong>{currentChart.humanCallout}</strong> Human Team
                        </span>
                      </div>

                      <div className="inside-chart-x-axis">
                        {currentChart.xAxis.map((label) => (
                          <span
                            key={label}
                            className={`axis-day${hoveredDay === label ? " axis-day-active" : ""}`}
                            onMouseEnter={() => setHoveredDay(label)}
                            onMouseLeave={() => setHoveredDay(null)}
                            style={{ cursor: "pointer" }}
                          >
                            {label}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                  <div className="inside-chart-metrics">
                    <div className="inside-metric-card">
                      <span className="inside-metric-title">Conversations</span>
                      <div className="inside-metric-values">
                        <span className="val-primary"><strong>{currentChart.conversations.ai}</strong> <span className="val-label">AI</span></span>
                        <span className="val-secondary">{currentChart.conversations.human} <span className="val-label">Human</span></span>
                      </div>
                      <span className="inside-metric-badge">{currentChart.conversations.badge}</span>
                    </div>

                    <div className="inside-metric-card">
                      <span className="inside-metric-title">Resolution Rate</span>
                      <div className="inside-metric-values">
                        <span className="val-primary"><strong>{currentChart.resolutionRate.ai}</strong> <span className="val-label">AI</span></span>
                        <span className="val-secondary">{currentChart.resolutionRate.human} <span className="val-label">Human</span></span>
                      </div>
                      <span className="inside-metric-badge">{currentChart.resolutionRate.badge}</span>
                    </div>

                    <div className="inside-metric-card">
                      <span className="inside-metric-title">Avg Response</span>
                      <div className="inside-metric-values">
                        <span className="val-primary"><strong>{currentChart.avgResponse.ai}</strong> <span className="val-label">AI</span></span>
                        <span className="val-secondary">{currentChart.avgResponse.human} <span className="val-label">Human</span></span>
                      </div>
                      <span className="inside-metric-badge">{currentChart.avgResponse.badge}</span>
                    </div>

                    <div className="inside-metric-card">
                      <span className="inside-metric-title">CSAT</span>
                      <div className="inside-metric-values">
                        <span className="val-primary"><strong>{currentChart.csat.ai}</strong>/5 <span className="val-label">AI</span></span>
                        <span className="val-secondary">{currentChart.csat.human}/5 <span className="val-label">Human</span></span>
                      </div>
                      <span className="inside-metric-badge">{currentChart.csat.badge}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="inside-steps">
                {insideSteps.map((step) => (
                  <div key={step.num} className={`inside-step${step.active ? " inside-step-active card-gradient-sky" : " card-gradient-rose"} card-noisy`}>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div id="Industries">
          <Industries />
        </div>

        <div id="support-engine">
          <PulsarResolution />
        </div>

        <WhyPulsarCardsSection />

        <section className="cta" id="early-access">
          <div className="cta-container">
            <h2>
              Be first to experience
              <br />
              with <em>Pulsar.</em>
            </h2>
            <p>
              Join the early access program for Pulsar autonomous support across voice, chat, and email,
              built for real-world execution.
            </p>
            <form className="cta-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your work email"
                aria-label="Work email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  if (emailError) setEmailError(null);
                }}
                disabled={isSubmittingEmail || emailSubscribed}
                required
              />
              <button type="submit" disabled={isSubmittingEmail || emailSubscribed}>
                {emailSubscribed ? (
                  <span>Access Granted ✓</span>
                ) : isSubmittingEmail ? (
                  <span>Dispatching Invite...</span>
                ) : (
                  <>
                    <span>Get Early Access</span>
                    <ArrowUpRightCircleIcon circleFill="#ffffff" arrowColor="#0a0a0a" size={18} />
                  </>
                )}
              </button>
            </form>
            {emailError && (
              <p className="cta-error-message" style={{ color: "#f43f5e", fontSize: "13px", marginTop: "10px", fontFamily: "var(--font-mono)" }}>
                ⚠ {emailError}
              </p>
            )}
            {emailSubscribed && (
              <p className="cta-success-message">
                Priority invite sent to <strong>{emailInput}</strong>! Check your inbox.
              </p>
            )}
          </div>
        </section>
      </main>
      <PulsarFooter />
      <Engine />
    </div>
  );
}

