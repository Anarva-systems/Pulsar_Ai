"use client";

import { useState, useEffect, useRef } from "react";
import "./PulsarLandingPage.css";
import Image from "next/image";
import Anarva from "../../public/anarva-logo.png";
import TerminalVideoAntigravitySection from "./TerminalVideoAntigravitySection";
const navLinks = [
  { label: "Support Engine", href: "#support-engine" },
  { label: "Commerce Copilot", href: "#commerce-copilot" },
  { label: "Architecture", href: "#architecture" },
];

const pipelineSteps = [
  {
    stage: "1. Customer reaches out",
    title: "Customer reaches out",
    desc: "A customer speaks, chats, or sends an email.",
    footer: "Voice · Chat · Email",
  },
  {
    stage: "2. AI understands",
    title: "AI understands",
    desc: "Specialised agents identify intent, entities, context, and what the customer is actually trying to accomplish.",
    footer: "Intent & Entity Extraction",
  },
  {
    stage: "3. Pulsar verifies reality",
    title: "Pulsar verifies reality",
    desc: "The system checks live information from the company's actual systems — orders, accounts, transactions, delivery status, and other authoritative data.",
    footer: "Live Authoritative Sync",
    active: true,
  },
  {
    stage: "4. Agents research & reason",
    title: "Agents research & reason",
    desc: "Policy and reasoning agents gather the relevant information and propose a resolution.",
    footer: "Policy & Vector RAG",
  },
  {
    stage: "5. Deterministic systems decide",
    title: "Deterministic systems decide",
    desc: "Policy, risk, authorization, financial limits, and business rules determine what is actually allowed.",
    footer: "Deterministic Rule Engine",
  },
  {
    stage: "6. Pulsar acts",
    title: "Pulsar acts",
    desc: "If authorized, the system executes the action through the real connected system.",
    footer: "Idempotent Execution",
  },
  {
    stage: "7. Everything is verified",
    title: "Everything is verified",
    desc: "Pulsar verifies the external result, reconciles uncertain operations, records the outcome, and creates a complete audit trail.",
    footer: "Audit Trail Committed",
  },
  {
    stage: "8. Customer gets an answer",
    title: "Customer gets an answer",
    desc: "The customer receives a natural response through the same channel — including a real-time voice response when using voice support.",
    footer: "Natural Multi-Turn Response",
  },
];

const awsTiers = [
  {
    label: "INFERENCE & COMPUTE",
    theme: "pink",
    desc: "Amazon Bedrock, Amazon EC2 G5/G6 (quantized local SLMs via vLLM for <150ms extraction), and Amazon EKS.",
    tags: ["Bedrock", "EC2 G5/G6", "EKS"],
  },
  {
    label: "STATE & MESSAGING",
    theme: "green",
    desc: "Amazon Aurora PostgreSQL (with pgvector for tenant policy RAG & double-entry ledger), Amazon SQS FIFO, and Amazon ElastiCache.",
    tags: [
      { text: "Aurora pgvector", highlight: true },
      { text: "SQS FIFO" },
      { text: "ElastiCache" },
    ],
  },
  {
    label: "SECURITY & AUDIT",
    theme: "purple",
    desc: "AWS KMS (multi-tenant key isolation & encryption) and Amazon S3 (immutable WORM audit logging for ACID governance).",
    tags: ["AWS KMS", "S3 WORM Audit"],
  },
];

const agentRoster = [
  {
    name: "Perception Agent",
    role: "Understands the conversation.",
    metric: "Intent & Context",
    badge: "Specialised Agent",
    theme: "pink",
    detail: "Identifies customer intent, extracted entities, and multi-turn conversational goals without hallucination.",
  },
  {
    name: "Policy Research Agent",
    role: "Finds relevant company policy and evidence.",
    metric: "Policy & RAG",
    badge: "Knowledge Engine",
    theme: "sky",
    detail: "Retrieves company policies, evidentiary SLA clauses, and warranty conditions relevant to the situation.",
  },
  {
    name: "Verification Workers",
    role: "Check live external state.",
    metric: "Live Reality Check",
    badge: "Ground Truth",
    theme: "green",
    detail: "Checks live information from the company's actual systems — orders, accounts, transactions, and delivery status.",
  },
  {
    name: "Risk Engine",
    role: "Evaluates operational and financial risk.",
    metric: "Financial Limits",
    badge: "Risk Governance",
    theme: "amber",
    detail: "Policy, risk, authorization, financial limits, and deterministic business rules determine what is actually allowed.",
  },
  {
    name: "Response Agent",
    role: "Turns verified outcomes into natural language.",
    metric: "Natural Speech & Chat",
    badge: "Response Synthesis",
    theme: "purple",
    detail: "Transforms verified decisions into natural responses across voice, chat, and email — including real-time speech.",
  },
  {
    name: "Execution Layer",
    role: "Performs only explicitly authorised actions.",
    metric: "Real System Actions",
    badge: "Safe Execution",
    theme: "pink",
    detail: "If authorized, executes the action safely through the real connected system with single-use cryptographic tokens.",
  },
  {
    name: "Reconciliation Layer",
    role: "Confirms what actually happened in the external system.",
    metric: "Complete Audit Trail",
    badge: "Audit & Ledger",
    theme: "sky",
    detail: "Verifies the external result, reconciles uncertain operations, records the outcome, and creates an audit trail.",
  },
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

const whyCards = [
  {
    num: "01",
    title: "Specialised Multi-Agent Reasoning",
    desc: "Specialised agents understand the customer, investigate the situation, retrieve the right policy, and propose the best resolution.",
    points: ["Intent & entity parsing", "Structured versioned artifacts"],
    theme: "rose",
  },
  {
    num: "02",
    title: "Deterministic Business Authority",
    desc: "Policy, risk, authorization, financial limits, and business rules determine what is actually allowed. LLMs never decide outcomes alone.",
    points: ["Financial limits & risk gates", "Formally verified rules"],
    theme: "sky",
  },
  {
    num: "03",
    title: "Real-World System Action",
    desc: "If authorized, Pulsar executes the action through the real connected system — moving from AI that talks about solving problems to AI that solves them.",
    points: ["Real connected APIs", "Zero double-spend"],
    theme: "amber",
  },
  {
    num: "04",
    title: "Reconciled & Audited Outcomes",
    desc: "Pulsar verifies the external result, reconciles uncertain operations, records the outcome, and creates a complete audit trail.",
    points: ["Post-execution verification", "Complete immutable audit trail"],
    theme: "emerald",
  },
];

const footerSolutions = [
  "Vega Autonomous Platform",
  "Autonomous Support Engine",
  "Interactive Shopping Copilot",
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

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.6668 3.5L5.25016 9.91667L2.3335 7" stroke={color} strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GoogleMicIcon({ size = 15, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}

function GoogleChatIcon({ size = 15, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function GoogleMailIcon({ size = 15, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function GooglePlayIcon({ size = 12, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function GooglePaymentIcon({ size = 12, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z" />
    </svg>
  );
}


function GooglePauseIcon({ size = 12, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

export default function PulsarLandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeStage, setActiveStage] = useState("STAGE 04");
  const [supportGateTab, setSupportGateTab] = useState<"auto" | "hitl">("auto");
  const [channelTab, setChannelTab] = useState<"email" | "voice">("email");
  const [commerceTab, setCommerceTab] = useState<"catalog" | "checkout">("catalog");
  const [pipelineView, setPipelineView] = useState<"stages" | "agents">("stages");
  const [activeAgentIndex, setActiveAgentIndex] = useState(0);
  const [chartPeriod, setChartPeriod] = useState<"weekly" | "monthly">("weekly");
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [specStatus, setSpecStatus] = useState<"idle" | "verifying" | "committed">("idle");
  const [activeCascadeStep, setActiveCascadeStep] = useState(2);
  const [activeJsonToken, setActiveJsonToken] = useState<string | null>(null);
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoplayPendingRef = useRef(false);
  const [mascotBubbleDismissed, setMascotBubbleDismissed] = useState(false);
  const [mascotWiggle, setMascotWiggle] = useState(false);

  const getMascotMessage = () => {
    if (specStatus === "verifying") {
      if (activeCascadeStep === 0) return "Ingesting customer voice call via SQS FIFO... 📥";
      if (activeCascadeStep === 1) return "SLM extracting intent & order entities (<120ms)... ⚡";
      if (activeCascadeStep === 2) return "Matching pgvector policy & SAP OMS timestamps... 🔍";
      return "Drafting dual-key idempotent refund proposal ($38.50)... 📝";
    }
    if (isPlayingSpeech) {
      return "Response Agent speaking! Sub-180ms voice barge-in active 🎙️";
    }
    if (specStatus === "committed") {
      return "Verified & committed to ACID ledger! Zero double-spend ✨";
    }
    return "Hi! I'm Vega 👋 Tap me to test live AI resolution!";
  };

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

  const playSpeechAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio("/voice.mpeg");
      audio.preload = "auto";
      audio.volume = 1.0;
      audio.onended = () => setIsPlayingSpeech(false);
      audio.onpause = () => setIsPlayingSpeech(false);
      audio.onplay = () => setIsPlayingSpeech(true);
      audioRef.current = audio;
    }

    try {
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlayingSpeech(true);
            autoplayPendingRef.current = false;
          })
          .catch((err) => {
            console.warn("Audio autoplay policy notice:", err);
            autoplayPendingRef.current = true;
          });
      }
    } catch (e) {
      console.warn("Audio error:", e);
      autoplayPendingRef.current = true;
    }
  };

  const toggleSpeechAudio = () => {
    if (!audioRef.current) {
      playSpeechAudio();
      return;
    }

    if (isPlayingSpeech) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlayingSpeech(false);
      autoplayPendingRef.current = false;
    } else {
      autoplayPendingRef.current = false;
      playSpeechAudio();
    }
  };

  useEffect(() => {
    // Eagerly instantiate audio instance
    const audio = new Audio("/voice.mpeg");
    audio.preload = "auto";
    audio.volume = 1.0;
    audio.onended = () => setIsPlayingSpeech(false);
    audio.onpause = () => setIsPlayingSpeech(false);
    audio.onplay = () => setIsPlayingSpeech(true);
    audioRef.current = audio;

    // Listener to play audio on first user gesture if autoplay was held by browser policy
    const handleUserGesture = () => {
      if (autoplayPendingRef.current && audioRef.current) {
        autoplayPendingRef.current = false;
        audioRef.current.currentTime = 0;
        audioRef.current.play().then(() => {
          setIsPlayingSpeech(true);
        }).catch(() => {});
      }
    };

    window.addEventListener("pointerdown", handleUserGesture, { passive: true });
    window.addEventListener("touchstart", handleUserGesture, { passive: true });
    window.addEventListener("click", handleUserGesture, { passive: true });
    window.addEventListener("keydown", handleUserGesture, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handleUserGesture);
      window.removeEventListener("touchstart", handleUserGesture);
      window.removeEventListener("click", handleUserGesture);
      window.removeEventListener("keydown", handleUserGesture);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);


  // Lock scroll and handle ESC when terminal modal is open
  useEffect(() => {
    if (terminalModalOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setTerminalModalOpen(false);
          if (audioRef.current) {
            audioRef.current.pause();
            setIsPlayingSpeech(false);
          }
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [terminalModalOpen]);

  // 3D Parallax & Scroll animation state
  const [terminalTilt, setTerminalTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setScrolled(y > 25);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleTerminalMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -6; // subtle tilt: -6 to +6 deg
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    const gx = (x / rect.width) * 100;
    const gy = (y / rect.height) * 100;
    setTerminalTilt({ rx, ry, gx, gy, active: true });
  };

  const handleTerminalMouseLeave = () => {
    setTerminalTilt({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });
  };

  // Terminal Auto-Click Simulation with Mac Cursor
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const runButtonRef = useRef<HTMLButtonElement | null>(null);
  const autoClickFiredRef = useRef(false);
  const [macCursor, setMacCursor] = useState<{
    x: number;
    y: number;
    visible: boolean;
    clicking: boolean;
    showRipple: boolean;
  }>({
    x: 0,
    y: 0,
    visible: false,
    clicking: false,
    showRipple: false,
  });

  const handleRunVerification = () => {
    autoClickFiredRef.current = true;
    setMacCursor((prev) => ({ ...prev, visible: false }));
    if (specStatus === "verifying") return;
    setSpecStatus("verifying");
    setActiveCascadeStep(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
    setIsPlayingSpeech(false);

    // Sequence through stages dynamically
    setTimeout(() => setActiveCascadeStep(1), 220);
    setTimeout(() => setActiveCascadeStep(2), 480);
    setTimeout(() => setActiveCascadeStep(3), 720);
    setTimeout(() => {
      setSpecStatus("committed");
      playSpeechAudio();
      setTimeout(() => {
        setSpecStatus("idle");
      }, 5000);
    }, 1000);
  };

  useEffect(() => {
    const terminalEl = terminalRef.current;
    if (!terminalEl) return;

    const triggerMacCursorSimulation = () => {
      if (autoClickFiredRef.current) return;
      autoClickFiredRef.current = true;

      // Small delay after coming into view
      setTimeout(() => {
        if (!terminalRef.current || !runButtonRef.current) return;

        const termRect = terminalRef.current.getBoundingClientRect();
        const btnRect = runButtonRef.current.getBoundingClientRect();

        // Mac pointer tip offset is at (3, 1) in SVG coordinates
        // Target: Center of the prompt action button relative to the terminal
        const targetX = btnRect.left - termRect.left + btnRect.width / 2 - 3;
        const targetY = btnRect.top - termRect.top + btnRect.height / 2 - 1;

        // Start position: entering smoothly into the terminal from bottom-right corner
        const startX = Math.max(termRect.width - 70, termRect.width * 0.75);
        const startY = Math.min(termRect.height - 35, 380);

        // 1. Cursor appears at the bottom-right of terminal
        setMacCursor({
          x: startX,
          y: startY,
          visible: true,
          clicking: false,
          showRipple: false,
        });

        // 2. Cursor glides with macOS physics to the top run button
        const glideTimer = setTimeout(() => {
          setMacCursor((prev) => ({
            ...prev,
            x: targetX,
            y: targetY,
          }));
        }, 160);

        // 3. Arrives on button and clicks
        const clickTimer = setTimeout(() => {
          setMacCursor((prev) => ({
            ...prev,
            clicking: true,
            showRipple: true,
          }));
          handleRunVerification();

          // 4. Release click
          const releaseTimer = setTimeout(() => {
            setMacCursor((prev) => ({
              ...prev,
              clicking: false,
              showRipple: false,
            }));

            // 5. Fade out cleanly
            const fadeTimer = setTimeout(() => {
              setMacCursor((prev) => ({
                ...prev,
                visible: false,
              }));
            }, 600);

            return () => clearTimeout(fadeTimer);
          }, 320);

          return () => clearTimeout(releaseTimer);
        }, 1150);

        return () => {
          clearTimeout(glideTimer);
          clearTimeout(clickTimer);
        };
      }, 500);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !autoClickFiredRef.current) {
            triggerMacCursorSimulation();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(terminalEl);

    // Auto-trigger fallback on desktop viewport so animation always runs reliably
    const fallbackTimer = setTimeout(() => {
      if (!autoClickFiredRef.current && typeof window !== "undefined" && window.innerWidth >= 768) {
        triggerMacCursorSimulation();
      }
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

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

  const renderTerminalContent = (isModal = false) => (
    <>
      <div className="terminal-dots">
        <span className="dot dot-red" />
        <span className="dot dot-yellow" />
        <span className="dot dot-green" />
        <span className="terminal-header-tag">PERCEPTION &bull; DETERMINISTIC FSM ENGINE</span>
      </div>

      <div
        className="terminal-promptbar"
        onClick={handleRunVerification}
        title="Click to simulate execution verification"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleRunVerification(); }}
        style={{ cursor: "pointer" }}
      >
        <div className="terminal-promptbar-left">
          <span className={`pulse-dot${specStatus === "verifying" ? " pulse-dot-active" : ""}`} />
          <span className="prompt-label">voice · live&gt;</span>
          <span className="prompt-text">
            &quot;I received order #ORD-9821 yesterday, but it&apos;s damaged. Can I get a replacement or refund?&quot;
          </span>
        </div>
        <div className="terminal-promptbar-right">
          <span className={`badge ${specStatus === "committed" ? "badge-pink" : specStatus === "verifying" ? "badge-amber" : "badge-green"}`}>
            {specStatus === "verifying" ? "VERIFYING REALITY (18MS)..." : specStatus === "committed" ? "RESOLVED & COMMITTED" : "AUTO-RESOLVE <150MS"}
          </span>
          <button
            ref={!isModal ? runButtonRef : undefined}
            type="button"
            className={`icon-btn${specStatus === "verifying" ? " icon-btn-active" : ""}`}
            aria-label="Run specification"
            onClick={(e) => {
              e.stopPropagation();
              handleRunVerification();
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.47955 12.6502C8.52493 12.7634 8.63586 12.8363 8.7577 12.8332C8.87954 12.8301 8.98659 12.7515 9.02613 12.6362L12.8178 1.55291C12.8559 1.4474 12.8296 1.32936 12.7503 1.25004C12.6709 1.17071 12.5529 1.14439 12.4474 1.1825L1.36405 4.97416C1.24876 5.0137 1.17021 5.12075 1.16709 5.24259C1.16397 5.36443 1.23693 5.47536 1.35005 5.52075L5.97588 7.37575C6.27138 7.49406 6.50571 7.72796 6.62455 8.02325L8.47955 12.6502"
                stroke="black"
                strokeWidth="1.16667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12.7479 1.25244L6.36621 7.63352" stroke="black" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="terminal-columns">
        <article className="terminal-card terminal-card-light card-noisy card-gradient-rose">
          <header className="terminal-card-header">
            <span className="terminal-card-title">AI UNDERSTANDS &amp; REASONS</span>
            <span className="badge badge-amber">Agents Propose &lt;150ms</span>
          </header>
          <ol className="cascade-list">
            {[
              {
                idx: "[01]",
                agent: "Customer Ingress",
                desc: "Real-time Voice Call, Live Chat & Email intake routed via SQS FIFO.",
                telemetry: "SQS FIFO · 0 dropped messages",
              },
              {
                idx: "[02]",
                agent: "Perception Agent (SLM)",
                desc: 'Identifies intent ("DAMAGED_RETURN") & entities in <120ms.',
                telemetry: "<120ms token intent & entity extraction",
              },
              {
                idx: "[03]",
                agent: "Investigation Agent",
                desc: "Retrieves SLA, purchase history & warehouse delivery timestamps via pgvector.",
                telemetry: "pgvector similarity: 0.941 · SLA verified",
              },
              {
                idx: "[04]",
                agent: "Proposal Agent",
                desc: 'Drafts idempotent refund proposal ($38.50) & return pickup.',
                telemetry: "Dual-key signature prepared",
              },
            ].map((item, index) => (
              <li
                key={item.idx}
                className={`cascade-item${activeCascadeStep === index ? " cascade-item-active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCascadeStep(index);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveCascadeStep(index); }}
              >
                <span className="cascade-index">{item.idx}</span>
                <div className="cascade-body">
                  <p>
                    <strong>{item.agent}:</strong> {item.desc}
                  </p>
                  {activeCascadeStep === index && (
                    <span className="cascade-step-telemetry">
                      <span className="telemetry-dot" />
                      {item.telemetry}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div className="perception-output">
            <div className="perception-output-top">
              <span className="perception-output-label">Perception Token Inspector:</span>
              {activeJsonToken && (
                <span className="token-tooltip-pill">
                  {activeJsonToken === "intent" && "Intent: Confidence 0.994 verified by fine-tuned SLM"}
                  {activeJsonToken === "val" && "Value: $38.50 checks within dual-key financial ceiling ($50.00)"}
                  {activeJsonToken === "policy" && "Policy: pgvector cosine match to 14D_ELIGIBLE return clause"}
                  {activeJsonToken === "fraud" && "Anomaly: 0.02 score confirms safe low-risk transaction"}
                </span>
              )}
            </div>
            <code>
              intent:{" "}
              <span
                className="tok-string tok-interactive"
                onMouseEnter={() => setActiveJsonToken("intent")}
                onMouseLeave={() => setActiveJsonToken(null)}
                title="Hover to inspect intent classification confidence"
              >
                &quot;damaged_return&quot;
              </span>
              , val:{" "}
              <span
                className="tok-number tok-interactive"
                onMouseEnter={() => setActiveJsonToken("val")}
                onMouseLeave={() => setActiveJsonToken(null)}
                title="Hover to inspect financial ceiling check"
              >
                38.50
              </span>
              ,<br />
              order_id: <span className="tok-string">&quot;#ORD-9821&quot;</span>, policy:{" "}
              <span
                className="tok-string tok-interactive"
                onMouseEnter={() => setActiveJsonToken("policy")}
                onMouseLeave={() => setActiveJsonToken(null)}
                title="Hover to inspect pgvector RAG match"
              >
                &quot;14D_ELIGIBLE&quot;
              </span>
              , fraud:{" "}
              <span
                className="tok-number-alt tok-interactive"
                onMouseEnter={() => setActiveJsonToken("fraud")}
                onMouseLeave={() => setActiveJsonToken(null)}
                title="Hover to inspect anomaly score"
              >
                0.02
              </span>{" "}
              {"}"}
            </code>
          </div>
        </article>

        <article className="terminal-card terminal-card-fsm card-noisy card-gradient-sky">
          <header className="terminal-card-header">
            <span className="terminal-card-title">DETERMINISTIC SYSTEMS DECIDE &amp; ACT</span>
            <span className="badge badge-neutral">Airgap Gate: Active</span>
          </header>

          <div className="fsm-block">
            <div className="fsm-block-header">
              <span>Dual-Key Financial Risk Gate (Risk Engine)</span>
              <span className="badge badge-ceiling">Ceiling: $50.00</span>
            </div>
            <p className="fsm-line">Action Value: $38.50 &lt; $50.00 ceiling</p>
            <p className="fsm-line">Deterministic auto-execution authorized without HITL block.</p>
          </div>

          <div className="fsm-block">
            <div className="fsm-block-header">
              <span>Connected System Execution (Execution Layer)</span>
              <span className="fsm-sync">Sync: 18ms</span>
            </div>
            <p className="fsm-line-small">• Stripe API: Refund $38.50 dispatched (Idempotent #IDEM-94827)</p>
            <p className="fsm-line-small">• SAP OMS: Return label generated &amp; carrier pickup scheduled</p>
          </div>

          <div className="fsm-ledger">
            <span className="fsm-ledger-left">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.16699 7.00008C1.16699 10.2196 3.78082 12.8334 7.00033 12.8334C10.2198 12.8334 12.8337 10.2196 12.8337 7.00008C12.8337 3.78058 10.2198 1.16675 7.00033 1.16675C3.78082 1.16675 1.16699 3.78058 1.16699 7.00008V7.00008"
                  stroke="#34D399"
                  strokeWidth="1.16667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M9.33366 5.25L6.12533 8.45833L4.66699 7" stroke="#34D399" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              ACID Ledger Commit (Reconciliation)
            </span>
            <span className="fsm-ledger-tx">TX #94827-AURORA</span>
          </div>

          <div
            className="terminal-speech-reply"
            onClick={toggleSpeechAudio}
            title="Click to play synthesized voice output"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleSpeechAudio(); }}
            style={{ cursor: "pointer" }}
          >
            <span className={`speech-icon-wrap${isPlayingSpeech ? " speech-icon-playing" : ""}`} aria-hidden="true">
              <img src="/greet_480.webp" alt="" className="speech-mascot-icon" width={20} height={20} />
            </span>
            <span className="speech-text">
              <strong className="speech-agent-name">Response Agent (Vega):</strong>{" "}
              <span className="speech-quote">&quot;I&apos;ve verified order #ORD-9821 and processed your $38.50 refund. Your return label has been sent via SMS.&quot;</span>
            </span>
            <div className="speech-playback-control" aria-label={isPlayingSpeech ? "Pause voice response" : "Play voice response"}>
              <span className="speech-btn-icon" aria-hidden="true">
                {isPlayingSpeech ? (
                  <GooglePauseIcon size={11} color="#7c3aed" />
                ) : (
                  <GooglePlayIcon size={11} color="#7c3aed" />
                )}
              </span>
              <span className="audio-play-label">
                {isPlayingSpeech ? "Pause" : "Play"}
              </span>
            </div>
          </div>
        </article>
      </div>
    </>
  );

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
              <span>Deploy Runtime</span>
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
                <span>Deploy Runtime</span>
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
              <span className="hero-title-line">From Conversation</span>
              <span className="hero-title-line hero-title-accent">
                to <em>Resolution</em>.
              </span>
            </h1>
            <p className="hero-subtitle">
              Pulsar connects voice, chat, and email to an intelligent support engine that verifies live systems and safely executes real-world outcomes.
            </p>

            <div className="hero-actions">
              <a className="btn btn-light" href="#early-access">
                <span>Deploy Pulsar Runtime</span>
                <ArrowUpRightCircleIcon circleFill="#0a0a0a" arrowColor="#ffffff" size={20} />
              </a>
              <a className="btn btn-ghost" href="#architecture">
                <span>Inspect Technical Architecture</span>
                <ChevronDownIcon />
              </a>
            </div>

            {/* In the exact place of the terminal */}
            <TerminalVideoAntigravitySection />
          </div>
        </section>

        <section className="partners">
          <p className="partners-label">PARTNERED WITH</p>
          <div className="partners-logo">
            <Image src={Anarva} alt="Anarva" width={25} height={25} style={{ width: "auto", height: "auto" }} />
            <span>Anarva</span>
          </div>
        </section>

        <section className="paradigm-section">
          <div className="section-intro">
            <h2>One conversation. An entire resolution engine.</h2>
            <p>
              Pulsar separates intelligence from authority across voice, chat, and email —
              specialised agents propose, deterministic systems decide, and authorised systems execute.
            </p>
          </div>

          <div className="paradigm-grid">
            <div className="paradigm-card paradigm-card-legacy card-noisy card-gradient-rose">
              <div>
                <div className="paradigm-header">
                  <span className="paradigm-badge paradigm-badge-legacy">MOST AI SYSTEMS</span>
                  <span className="paradigm-system-title">Talks Without Action</span>
                </div>
                <div className="paradigm-flow-box paradigm-flow-box-legacy">
                  <div className="flow-track">
                    <span className="flow-step">Customer</span>
                    <span className="flow-arrow flow-arrow-muted">→</span>
                    <span className="flow-step flow-step-legacy">AI</span>
                    <span className="flow-arrow flow-arrow-muted">→</span>
                    <span className="flow-step flow-step-legacy-danger">Answer (Unverified)</span>
                  </div>
                </div>
                <div className="paradigm-principles">
                  <div className="principle-item principle-item-legacy">
                    <div className="principle-content">
                      <h4>Unchecked AI Proposals.</h4>
                      <p>Raw LLMs hallucinate advice without grounding, risking incorrect answers, double-refunds, and data errors.</p>
                    </div>
                  </div>
                  <div className="principle-item principle-item-legacy">
                    <div className="principle-content">
                      <h4>No Deterministic Gates.</h4>
                      <p>Lacks hard financial ceilings, supervisor escalation rules, and air-gapped business constraints.</p>
                    </div>
                  </div>
                  <div className="principle-item principle-item-legacy">
                    <div className="principle-content">
                      <h4>Disconnected from Live State.</h4>
                      <p>Cannot verify ground truth against live enterprise ERP, OMS, or payment ledgers — trapped in dead-ends.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="paradigm-footer paradigm-footer-legacy">
                <span>Operational Outcome</span>
                <strong>Conversational Advice Only · Zero Execution</strong>
              </div>
            </div>

            <div className="paradigm-card paradigm-card-pulsar card-noisy card-gradient-emerald">
              <div>
                <div className="paradigm-header">
                  <span className="paradigm-badge paradigm-badge-pulsar">PULSAR RESOLUTION ENGINE</span>
                  <span className="paradigm-system-title">Verified Execution</span>
                </div>
                <div className="paradigm-flow-box paradigm-flow-box-pulsar">
                  <div className="flow-track">
                    <span className="flow-step">Customer</span>
                    <span className="flow-arrow">→</span>
                    <span className="flow-step">AI</span>
                    <span className="flow-arrow">→</span>
                    <span className="flow-step">Understand</span>
                    <span className="flow-arrow">→</span>
                    <span className="flow-step">Verify</span>
                    <span className="flow-arrow">→</span>
                    <span className="flow-step">Reason</span>
                    <span className="flow-arrow">→</span>
                    <span className="flow-step">Decide</span>
                    <span className="flow-arrow">→</span>
                    <span className="flow-step">Authorize</span>
                    <span className="flow-arrow">→</span>
                    <span className="flow-step">Act</span>
                    <span className="flow-arrow">→</span>
                    <span className="flow-step">Verify</span>
                    <span className="flow-arrow">→</span>
                    <span className="flow-step flow-step-pulsar-resolve">Resolve</span>
                  </div>
                </div>
                <div className="paradigm-principles">
                  <div className="principle-item">
                    <div className="principle-content">
                      <h4>AI Proposes.</h4>
                      <p>Specialised agents investigate context, retrieve company policy, and draft proposed resolutions.</p>
                    </div>
                  </div>
                  <div className="principle-item">
                    <div className="principle-content">
                      <h4>Deterministic Systems Decide.</h4>
                      <p>Policy, risk, authorization, and financial limits determine what is strictly allowed.</p>
                    </div>
                  </div>
                  <div className="principle-item">
                    <div className="principle-content">
                      <h4>Authorized Systems Execute.</h4>
                      <p>If authorized, executes safely through real connected systems and commits an immutable audit trail.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="paradigm-footer paradigm-footer-pulsar">
                <span>Operational Outcome</span>
                <strong>Deterministic Resolution · 100% ACID Audit Committed</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="architecture" id="architecture">
          <div className="section-intro">
            <h2>Multi-Agent Architecture</h2>
            <p>
              Specialised agents handle distinct operational roles, communicating through structured versioned artifacts while a deterministic orchestration layer governs execution.
            </p>
          </div>

          <div className="architecture-layout">
            <div className="architecture-control-bar">
              <div className="topology-toggle-pills">
                <button
                  type="button"
                  className={`topology-toggle-btn${pipelineView === "stages" ? " topology-toggle-btn-active" : ""}`}
                  onClick={() => setPipelineView("stages")}
                >
                  How It Works (8 Steps)
                </button>
                <button
                  type="button"
                  className={`topology-toggle-btn${pipelineView === "agents" ? " topology-toggle-btn-active" : ""}`}
                  onClick={() => setPipelineView("agents")}
                >
                  Specialised Multi-Agent Roster (7 Agents)
                </button>
              </div>
            </div>

            {pipelineView === "stages" ? (
              <div className="flowing-cards-viewport" title="Live architecture stream. Hover to pause.">
                <div className="flowing-cards-track">
                  {[...pipelineSteps, ...pipelineSteps].map((step, index) => {
                    const isActive = activeStage === step.stage;
                    return (
                      <div
                        key={`${step.stage}-${index}`}
                        className={`pipeline-node-chip${isActive ? " pipeline-node-chip-active" : ""}`}
                        onClick={() => setActiveStage(step.stage)}
                        style={{ cursor: "pointer" }}
                        title={`Click to inspect ${step.stage}`}
                      >
                        <div className="pipeline-node-top">
                          <span className="pipeline-stage">{step.stage}</span>
                          <span className="pipeline-node-dot" />
                        </div>
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                        <p className={`pipeline-footer${isActive ? " pipeline-footer-active" : ""}`}>{step.footer}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flowing-cards-viewport" title="Live multi-agent stream. Hover to pause.">
                <div className="flowing-cards-track flowing-cards-track-agents">
                  {[...agentRoster, ...agentRoster].map((agent, index) => {
                    const isAgentActive = activeAgentIndex === (index % agentRoster.length);
                    return (
                      <div
                        key={`${agent.name}-${index}`}
                        className={`agent-node-chip${isAgentActive ? " agent-node-chip-active" : ""}`}
                        onClick={() => setActiveAgentIndex(index % agentRoster.length)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="agent-card-top">
                          <span className={`badge badge-${agent.theme}`}>{agent.badge}</span>
                          <span className="agent-metric">{agent.metric}</span>
                        </div>
                        <h4>{agent.name}</h4>
                        <p className="agent-role">{agent.role}</p>
                        <p className="agent-detail">{agent.detail}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="aws-specs-strip">
              <span className="aws-specs-label">ENTERPRISE CLOUD RUNTIME (NATIVE AWS ARCHITECTURE)</span>
              <div className="aws-specs-columns">
                {awsTiers.map((tier) => (
                  <div key={tier.label} className="aws-spec-col">
                    <span className={`aws-spec-tier-label aws-tier-label-${tier.theme}`}>
                      <span className="spec-bullet-dot" />
                      {tier.label}
                    </span>
                    <p className="aws-spec-desc">{tier.desc}</p>
                    <div className="aws-tier-tags">
                      {tier.tags.map((tag) =>
                        typeof tag === "string" ? (
                          <span key={tag} className="aws-tag">
                            {tag}
                          </span>
                        ) : (
                          <span key={tag.text} className={`aws-tag${tag.highlight ? " aws-tag-highlight" : ""}`}>
                            {tag.text}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flagship" id="support-engine">
          <div className="section-intro">
            <h2>Two Flagship Enterprise Systems</h2>
            <p>
              Two enterprise runtimes engineered for deterministic accuracy and zero hallucination risk.
            </p>
          </div>

          <div className="flagship-grid">
            <article className="flagship-card flagship-card-amber card-noisy card-gradient-amber">
              <div>
                <h3>Autonomous Support Engine</h3>
                <p>
                  Unified engine ingesting emails and calls, enforcing deterministic business rules before mutating live systems.
                </p>

                <div className="channel-selector-wrap">
                  <span className="channel-selector-label">SELECT OMNICHANNEL INGRESS:</span>
                  <div className="channel-pills">
                    <button
                      type="button"
                      className={`channel-pill${channelTab === "email" ? " channel-pill-active" : ""}`}
                      onClick={() => setChannelTab("email")}
                    >
                      <GoogleMailIcon size={14} />
                      <span>Email Intake</span>
                      <span className="pill-metric">SQS FIFO</span>
                    </button>
                    <button
                      type="button"
                      className={`channel-pill${channelTab === "voice" ? " channel-pill-active" : ""}`}
                      onClick={() => setChannelTab("voice")}
                    >
                      <GoogleMicIcon size={14} />
                      <span>Voice Support</span>
                      <span className="pill-metric">&lt;180ms</span>
                    </button>
                  </div>
                </div>

                {channelTab === "email" ? (
                  <div className="email-channel-card">
                    <div className="email-card-top">
                      <div className="email-status-wrap">
                        <span className="email-status-beacon" />
                        <span className="email-status-text">SQS FIFO Ingress Active · Zero Dropped Packets</span>
                      </div>
                      <span className="badge badge-sky">&lt;120ms Ingestion SLA</span>
                    </div>

                    <div className="email-flow-steps animated-flow-track">
                      <span className="email-flow-step">
                        <span className="email-step-dot" />
                        Inbound
                      </span>
                      <span className="flow-arrow">→</span>
                      <span className="email-flow-step">
                        <span className="email-step-dot" />
                        Intent
                      </span>
                      <span className="flow-arrow">→</span>
                      <span className="email-flow-step">
                        <span className="email-step-dot" />
                        ERP Check
                      </span>
                      <span className="flow-arrow">→</span>
                      <span className="email-flow-step">
                        <span className="email-step-dot" />
                        Risk Gate
                      </span>
                      <span className="flow-arrow">→</span>
                      <span className="email-flow-step email-step-resolve">
                        <span className="email-step-dot email-step-dot-green" />
                        Resolved
                      </span>
                    </div>

                    <div className="flagship-panel">
                      <div className="flagship-panel-header">
                        <span>Dual-Key Financial Risk Gate</span>
                        <span className="flagship-panel-pink">Deterministic FSM</span>
                      </div>
                      <div className="flagship-segments">
                        <button
                          type="button"
                          className={`flagship-segment${supportGateTab === "auto" ? " flagship-segment-active" : ""}`}
                          onClick={() => setSupportGateTab("auto")}
                        >
                          &lt;$50 Auto-Resolve
                        </button>
                        <button
                          type="button"
                          className={`flagship-segment${supportGateTab === "hitl" ? " flagship-segment-active" : ""}`}
                          onClick={() => setSupportGateTab("hitl")}
                        >
                          &gt;$50 HITL Queue
                        </button>
                      </div>
                      <ul className="flagship-points">
                        {supportGateTab === "auto" ? (
                          <>
                            <li>
                              <CheckIcon color="#10B981" />
                              Live ERP/OMS verification via REST &amp; pgvector policy RAG
                            </li>
                            <li>
                              <CheckIcon color="#10B981" />
                              Automated settlement &amp; idempotent refund dispatch
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <CheckIcon color="#3B82F6" />
                              Air-gapped supervisor escalation ticket generated in &lt;120ms
                            </li>
                            <li>
                              <CheckIcon color="#3B82F6" />
                              Cryptographic token required before ledger commit
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="voice-channel-card">
                    <div className="voice-card-top">
                      <div className="voice-waveform-wrap">
                        <span className="waveform-bar bar-1" />
                        <span className="waveform-bar bar-2" />
                        <span className="waveform-bar bar-3" />
                        <span className="waveform-bar bar-4" />
                        <span className="waveform-bar bar-5" />
                        <span className="voice-status-text">Real-Time Speech Ingress Active</span>
                      </div>
                      <span className="badge badge-purple">&lt;180ms Roundtrip</span>
                    </div>
                    <div className="voice-flow-steps animated-flow-track">
                      <span>Listen</span>
                      <span className="flow-arrow">→</span>
                      <span>Understand</span>
                      <span className="flow-arrow">→</span>
                      <span>Verify</span>
                      <span className="flow-arrow">→</span>
                      <span>Reason</span>
                      <span className="flow-arrow">→</span>
                      <span>Act</span>
                      <span className="flow-arrow">→</span>
                      <span>Speak Back</span>
                    </div>
                    <ul className="voice-highlights">
                      <li>
                        <CheckIcon color="#A855F7" />
                        <span><strong>Real-Time Speech &amp; Barge-in:</strong> Natural speaking cadence and interruption handling.</span>
                      </li>
                      <li>
                        <CheckIcon color="#A855F7" />
                        <span><strong>Live Verification &amp; Handoff:</strong> Real order checks, action confirmation, and supervisor handoff.</span>
                      </li>
                      <li>
                        <CheckIcon color="#A855F7" />
                        <span><strong>Unified AI Engine:</strong> Enters the same deterministic engine as email and chat.</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="flagship-footer">
                <span>Deterministic Support SLA</span>
                <strong>{channelTab === "email" ? (supportGateTab === "auto" ? "99.98% Verification" : "<45s Supervisor SLA") : "Zero Separate AI Brains"}</strong>
              </div>
            </article>

            <article className="flagship-card flagship-card-sky card-noisy card-gradient-sky" id="commerce-copilot">
              <div>
                <h3>Interactive Commerce Copilot</h3>
                <p>
                  Conversational shopping from discovery to cart checkout, keeping sensitive payment steps strictly air-gapped.
                </p>

                <div className="channel-selector-wrap">
                  <span className="channel-selector-label">SELECT COMMERCE WORKFLOW:</span>
                  <div className="channel-pills">
                    <button
                      type="button"
                      className={`channel-pill${commerceTab === "catalog" ? " channel-pill-active" : ""}`}
                      onClick={() => setCommerceTab("catalog")}
                    >
                      <span className="material-symbols-outlined">shopping_cart</span>
                      <span>Cart Copilot</span>
                      <span className="pill-metric">Live Stock</span>
                    </button>
                    <button
                      type="button"
                      className={`channel-pill${commerceTab === "checkout" ? " channel-pill-active" : ""}`}
                      onClick={() => setCommerceTab("checkout")}
                    >
                      <span className="material-symbols-outlined">payments</span>
                      <span>Payment Airgap</span>
                      <span className="pill-metric">Bank 3DS</span>
                    </button>
                  </div>
                </div>

                <div className="email-channel-card">
                  <div className="email-card-top">
                    <div className="email-status-wrap">
                      <span className={`email-status-beacon${commerceTab === "checkout" ? " email-status-beacon-rose" : ""}`} />
                      <span className="email-status-text">
                        {commerceTab === "catalog"
                          ? "Catalog Vector Sync Active · Real-Time Stock & SKU Ground Truth"
                          : "Air-Gapped Payment Perimeter · Sensitive Tokens Kept Outside AI"}
                      </span>
                    </div>
                    <span className={`badge ${commerceTab === "catalog" ? "badge-sky" : "badge-pink"}`}>
                      {commerceTab === "catalog" ? "<150ms Vector RAG" : "Zero Cardholder Touch"}
                    </span>
                  </div>

                  <div className="commerce-flow-bar animated-flow-track">
                    <span>Discover</span>
                    <span className="flow-arrow">→</span>
                    <span>Compare</span>
                    <span className="flow-arrow">→</span>
                    <span>Rank</span>
                    <span className="flow-arrow">→</span>
                    <span>Cart</span>
                    <span className="flow-arrow">→</span>
                    <span>Confirm</span>
                    <span className="flow-arrow">→</span>
                    <span className="flow-step-pulsar-resolve">Execute</span>
                  </div>

                  <div className={`flagship-panel${commerceTab === "checkout" ? " flagship-panel-airgap" : ""}`}>
                    <div className="flagship-panel-header">
                      <span>Autonomous Commerce Safety Protocol</span>
                      <span className={commerceTab === "catalog" ? "flagship-panel-sky" : "flagship-alert-tag-red"}>
                        {commerceTab === "catalog" ? "Deterministic State" : "Airgap Enforced"}
                      </span>
                    </div>
                    <div className="flagship-segments">
                      <button
                        type="button"
                        className={`flagship-segment${commerceTab === "catalog" ? " flagship-segment-active-sky" : ""}`}
                        onClick={() => setCommerceTab("catalog")}
                      >
                        &lt; ₹5,000 Auto-Cart
                      </button>
                      <button
                        type="button"
                        className={`flagship-segment${commerceTab === "checkout" ? " flagship-segment-active-rose" : ""}`}
                        onClick={() => setCommerceTab("checkout")}
                      >
                        Bank OTP Airgap
                      </button>
                    </div>
                    <ul className="flagship-points">
                      {commerceTab === "catalog" ? (
                        <>
                          <li>
                            <CheckIcon color="#0284c7" />
                            Live SKU price &amp; inventory verification against ERP catalog
                          </li>
                          <li>
                            <CheckIcon color="#0284c7" />
                            Cart mutations prepared idempotently with explicit confirmation
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <CheckIcon color="#e11d48" />
                            Sensitive payment steps (OTP/3DS) stay strictly outside AI
                          </li>
                          <li>
                            <CheckIcon color="#e11d48" />
                            Customer maintains full authority on authenticated bank screen
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flagship-footer">
                <span>Customer in full control</span>
                <strong>Sensitive payment steps (OTP/3DS) stay outside AI</strong>
              </div>
            </article>
          </div>
        </section>

        <section className="inside">
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
                    <h3>AI Agents vs Human Support</h3>
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

        <section className="why">
          <div className="section-intro">
            <h2>Why Pulsar?</h2>
            <p>
              AI proposes. Deterministic systems decide. Authorized systems execute. This is what lets Pulsar move from AI that talks about solving problems to AI that can actually solve them in production.
            </p>
          </div>

          <div className="why-pillars-row">
            {whyCards.map((card) => (
              <div key={card.num} className="why-pillar">
                <div className="why-pillar-header">
                  <span className="why-pillar-num">{card.num}</span>
                </div>
                <h3 className="why-pillar-title">{card.title}</h3>
                <p className="why-pillar-desc">{card.desc}</p>
                <div className="why-pillar-points">
                  {card.points.map((point) => (
                    <div key={point} className="why-pillar-point">
                      <CheckIcon color={card.theme === "rose" ? "#e11d48" : card.theme === "sky" ? "#0284c7" : card.theme === "amber" ? "#d97706" : "#059669"} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

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

      <footer className="site-footer">
        <div className="site-footer-bg" aria-hidden="true">
          <picture>
            <source srcSet="/footer.webp" type="image/webp" />
            <img
              src="/footer.png"
              alt=""
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>

        <div className="site-footer-content">
          <div className="footer-columns">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/pulsar-logo-light.png" alt="Pulsar Agent" className="footer-logo-icon" />
                <span>Pulsar Agent</span>
              </div>
              <p>
                The enterprise deterministic infrastructure layer for autonomous AI agents, eliminating
                hallucination risks in production workflows.
              </p>
              <p className="footer-copyright">© 2026 Pulsar Agent (pulsaragent.in) by Anarva. All rights reserved.</p>
            </div>

            <div className="footer-list">
              <span className="footer-list-title">Solutions</span>
              <ul>
                {footerSolutions.map((item) => (
                  <li key={item}>
                    <span className="footer-bullet">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-list">
              <span className="footer-list-title">Company</span>
              <ul>
                {footerCompany.map((item) => (
                  <li key={item}>
                    <span className="footer-bullet">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-list">
              <span className="footer-list-title">Connect</span>
              <div className="footer-social">
                <a href="#" aria-label="LinkedIn" className="footer-social-link">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.6667 2C13.4026 2 14 2.59745 14 3.33333V12.6667C14 13.4026 13.4026 14 12.6667 14H3.33333C2.59745 14 2 13.4026 2 12.6667V3.33333C2 2.59745 2.59745 2 3.33333 2H12.6667ZM12.3333 12.3333V8.8C12.3333 7.5997 11.3603 6.62667 10.16 6.62667C9.59333 6.62667 8.93333 6.97333 8.64 7.49333V6.75333H6.78V12.3333H8.64V9.04667C8.64 8.53333 9.05333 8.11333 9.56667 8.11333C10.0821 8.11333 10.5 8.5312 10.5 9.04667V12.3333H12.3333ZM4.30667 5.84C4.82179 5.84 5.24 5.42179 5.24 4.90667C5.24 4.39155 4.82179 3.97333 4.30667 3.97333C3.79155 3.97333 3.37333 4.39155 3.37333 4.90667C3.37333 5.42179 3.79155 5.84 4.30667 5.84ZM5.24 12.3333V6.75333H3.37333V12.3333H5.24Z"
                      fill="#F5F5F5"
                    />
                  </svg>
                </a>
                <a href="#" aria-label="X" className="footer-social-link">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.1626 1.5H14.3679L9.54994 7.00667L15.2179 14.5H10.7799L7.30394 9.95533L3.3266 14.5H1.11994L6.27327 8.61L0.835938 1.5H5.3866L8.5286 5.654L12.1626 1.5ZM11.3886 13.18H12.6106L4.7226 2.75067H3.41127L11.3886 13.18Z"
                      fill="#F5F5F5"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <p className="footer-watermark">Pulsar</p>
        </div>
      </footer>

      {/* Floating Screen Mascot Bot Companion (Only the bot with hand waving, no text) */}
      <div
        className="fixed bottom-6 right-6 z-50 pointer-events-auto cursor-pointer group transition-transform duration-300 hover:scale-110 active:scale-95"
        aria-label="Vega Mascot Bot"
      >
        <img
          src="/greet_480.webp"
          alt="Vega Mascot Bot"
          width={80}
          height={80}
          className="w-16 h-16 md:w-20 md:h-20 object-contain select-none drop-shadow-xl"
          loading="eager"
        />
      </div>

    </div>
  );
}

