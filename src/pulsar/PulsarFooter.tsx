import "./PulsarFooter.css";
import Image from "next/image";
import PulsarLogo from "../../public/pulsar-logo-dark.png";
import MeadowSceneBackground from "./MeadowSceneBackground";

const SOLUTIONS = [
  "Reply — Customer Communication",
  "Sell — Business Operations",
  "Grow — Business Growth & Intelligence",
];

const COMPANY = [
  "Merchant Safeguards",
  "Terms of Service",
  "Privacy Policy",
];

const CONNECT = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/pulsar-agent-ai", external: true },
  { label: "X (Twitter)", href: "https://x.com/PulsarAgentAI", external: true },
  { label: "Early Access", href: "#early-access", external: false },
];

export default function PulsarFooter() {
  return (
    <footer className="pfr">
      <div className="pfr-stage" aria-hidden="true">
        <MeadowSceneBackground />
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
            The phone-first, AI-native operating platform for small businesses in India.
            Unifying customer communication, sales, payments, and business records through conversation.
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
