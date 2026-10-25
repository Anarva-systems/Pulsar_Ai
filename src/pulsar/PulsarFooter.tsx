"use client";

import { useEffect, useRef } from "react";
import "./PulsarFooter.css";
import Image from "next/image";
import PulsarLogo from "../../public/pulsar-logo-dark.png"
const VIDEO = "/pulsar-assets/footer/scene.mp4";
const POSTER = "/pulsar-assets/footer/scene-poster.png";

const SOLUTIONS = [
  "Vega Autonomous Platform",
  "Autonomous Support Engine",
  "Interactive Shopping Copilot",
];

const COMPANY = [
  "Security & Compliance",
  "Terms of Service",
  "Privacy Policy",
];

const CONNECT = [
  { label: "LinkedIn", href: "https://linkedin.com", external: true },
  { label: "X (Twitter)", href: "https://x.com", external: true },
  { label: "Early Access", href: "#", external: false },
];

export default function PulsarFooter() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;

    const sync = () => {
      if (reduced.matches || !inView) {
        video.pause();
        return;
      }
      const attempt = video.play();
      if (attempt) attempt.catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 }
    );

    observer.observe(video);
    reduced.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return (
    <footer className="pfr">
      <div className="pfr-stage" aria-hidden="true">
        <video
          ref={videoRef}
          className="pfr-video"
          src={VIDEO}
          poster={POSTER}
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>

      <p className="pfr-wordmark" aria-hidden="true">
        Pulsar
      </p>
      <div className="pfr-fog" aria-hidden="true" />

      <div className="pfr-content">
        <div className="pfr-brand">
          <a className="pfr-brand-logo" href="https://pulsaragent.in/" aria-label="Pulsar Agent home">
            <span className="pfr-brand-mark">
              <Image src={PulsarLogo} alt="Pulsar Agent logo" width={32} height={32} />
            </span>
            Pulsar Agent
          </a>
          <p className="pfr-brand-text">
            The enterprise deterministic infrastructure layer for autonomous AI agents,
            eliminating hallucination risks in production workflows.
          </p>

          <p className="pfr-copy">© 2026 Pulsar Agent (pulsaragent.in) by Anarva. All rights reserved.</p>
        </div>

        <nav className="pfr-col pfr-col--menu" aria-label="Solutions">
          <h3 className="pfr-col-title">Solutions</h3>
          <ul className="pfr-col-list">
            {SOLUTIONS.map((label) => (
              <li key={label}>
                <a href="#">
                  <span className="pfr-bullet">›</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="pfr-col--menu" aria-label="Company">
          <h3 className="pfr-col-title">Company</h3>
          <ul className="pfr-col-list">
            {COMPANY.map((label) => (
              <li key={label}>
                <a href="#">
                  <span className="pfr-bullet">›</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="pfr-col--menu" aria-label="Connect">
          <h3 className="pfr-col-title">Connect</h3>
          <ul className="pfr-col-list">
            {CONNECT.map(({ label, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="pfr-bullet">›</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
