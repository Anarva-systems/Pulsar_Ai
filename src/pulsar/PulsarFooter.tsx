"use client";

import React from "react";
import "./PulsarFooter.css";
import Image from "next/image";
import { motion } from "framer-motion";
import PulsarLogo from "../../public/pulsar-logo-dark.png";

const SOLUTIONS = [
  { label: "Vega Autonomous Platform", href: "#support-engine" },
  { label: "Autonomous Support Engine", href: "#support-engine" },
  { label: "Interactive Shopping Copilot", href: "#inside-pulsar" },
];

const COMPANY = [
  { label: "Security & Compliance", href: "#why-pulsar" },
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const CONNECT = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/pulsar-agent-ai", external: true },
  { label: "X (Twitter)", href: "https://x.com/PulsarAgentAI", external: true },
  { label: "Early Access", href: "#early-access", external: false },
];

export interface PulsarFooterProps {
  onOpenEarlyAccess?: () => void;
}

export default function PulsarFooter({ onOpenEarlyAccess }: PulsarFooterProps) {
  const handleEarlyAccessClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onOpenEarlyAccess) {
      e.preventDefault();
      onOpenEarlyAccess();
    }
  };

  return (
    <footer className="footer-hero" role="contentinfo">
      {/* Immersive Photo Background */}
      <div className="footer-hero-bg" aria-hidden="true">
        <Image
          src="/footer-hero-bg.jpg"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          quality={90}
          className="footer-hero-bg-img"
        />
      </div>

      {/* Atmospheric Contrast Overlay */}
      <div className="footer-hero-overlay" aria-hidden="true" />

      {/* Floating Glassmorphic Footer Card */}
      <motion.div
        className="footer-card"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left Column: Brand block */}
        <div className="footer-card-brand">
          <div>
            <a
              href="https://pulsaragent.in/"
              className="footer-card-logo-lockup"
              aria-label="Pulsar Agent home"
            >
              <Image
                src={PulsarLogo}
                alt="Pulsar Agent logo"
                width={26}
                height={26}
                className="footer-card-logo-img"
              />
              <span className="footer-card-logo-text">Pulsar Agent</span>
            </a>

            <p className="footer-card-tagline">
              Autonomous. Accountable. Deterministic.
            </p>

            <div className="footer-card-actions">
              <a
                href="#early-access"
                onClick={handleEarlyAccessClick}
                className="footer-btn footer-btn-primary"
              >
                Get Early Access
              </a>
              <a
                href="#why-pulsar"
                className="footer-btn footer-btn-secondary"
              >
                Security &amp; Compliance
              </a>
            </div>
          </div>

          <p className="footer-card-copy">
            © 2026 Pulsar Agent by Anarva. All rights reserved.
          </p>
        </div>

        {/* Right Columns: Semantic Navigation Links */}
        <div className="footer-card-nav">
          <nav aria-label="Footer" className="footer-card-grid">
            {/* Solutions */}
            <div className="footer-nav-col">
              <h3 className="footer-nav-heading">Solutions</h3>
              <ul className="footer-nav-list">
                {SOLUTIONS.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="footer-nav-link">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="footer-nav-col">
              <h3 className="footer-nav-heading">Company</h3>
              <ul className="footer-nav-list">
                {COMPANY.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="footer-nav-link">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="footer-nav-col">
              <h3 className="footer-nav-heading">Connect</h3>
              <ul className="footer-nav-list">
                {CONNECT.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="footer-nav-link"
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      onClick={item.href === "#early-access" ? handleEarlyAccessClick : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </motion.div>
    </footer>
  );
}
