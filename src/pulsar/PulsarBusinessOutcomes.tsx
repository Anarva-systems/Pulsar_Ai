"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import "./PulsarBusinessOutcomes.css";

const ASSET = "/pulsar-assets/business-outcomes";

type Mode = "production" | "system";

type MetricCopy = {
  dots: string;
  unit: string;
  title: ReactNode;
  caption: ReactNode;
};

const MODE_DATA: Record<Mode, Record<"speed" | "context" | "connections", MetricCopy>> = {
  production: {
    speed: {
      dots: "4.2",
      unit: "s",
      title: (
        <>
          Avg Response Time
          <br />
          Instant AI Resolutions
        </>
      ),
      caption: (
        <>
          Average customer
          <br />
          response time
        </>
      ),
    },
    context: {
      dots: "87",
      unit: "%",
      title: (
        <>
          Resolution Rate
          <br />
          Autonomous Handling
        </>
      ),
      caption: (
        <>
          Autonomous resolution
          <br />
          without human loop
        </>
      ),
    },
    connections: {
      dots: "8.4",
      unit: "K",
      title: (
        <>
          Conversations Handled
          <br />
          Cross-System Context
        </>
      ),
      caption: (
        <>
          Active support
          <br />
          conversations processed
        </>
      ),
    },
  },
  system: {
    speed: {
      dots: "118",
      unit: "ms",
      title: (
        <>
          Inference Speed
          <br />
          AI Response Latency
        </>
      ),
      caption: (
        <>
          Average global
          <br />
          response
        </>
      ),
    },
    context: {
      dots: "2.4",
      unit: "M",
      title: (
        <>
          Context Window
          <br />
          Long-form Understanding
        </>
      ),
      caption: (
        <>
          Tokens processed
          <br />
          simultaneously
        </>
      ),
    },
    connections: {
      dots: "16",
      unit: "K",
      title: (
        <>
          Intelligent Connections
          <br />
          Cross-Source Context
        </>
      ),
      caption: (
        <>
          Connected data
          <br />
          sources
        </>
      ),
    },
  },
};

const PROCESS_STEPS = [
  {
    title: "1. AI Understands & Investigates",
    body: "Specialised AI agents understand the customer, investigate the situation, retrieve the right policy, and propose the best resolution.",
  },
  {
    title: "2. Pulsar Verifies Reality",
    body: "Checks live information from the company's actual systems: orders, accounts, transactions, and delivery status.",
  },
  {
    title: "3. Deterministic Systems Decide",
    body: "Policy, risk, authorization, financial limits, and business rules determine what is actually allowed. AI proposes; deterministic systems decide.",
  },
  {
    title: "4. Pulsar Acts & Audits",
    body: "If authorized, executes through the real connected system, reconciles uncertain operations, and creates a complete audit trail.",
  },
] as const;

const GLYPHS: Record<string, string> = {
  "0": "01110 10001 10011 10101 11001 10001 01110",
  "1": "010 110 010 010 010 010 111",
  "2": "01110 10001 00001 00010 00100 01000 11111",
  "3": "11110 00001 00001 01110 00001 00001 11110",
  "4": "00010 00110 01010 10010 11111 00010 00010",
  "5": "11111 10000 10000 11110 00001 00001 11110",
  "6": "01110 10000 10000 11110 10001 10001 01110",
  "7": "11111 00001 00010 00100 01000 01000 01000",
  "8": "01110 10001 10001 01110 10001 10001 01110",
  "9": "01110 10001 10001 01111 00001 00001 01110",
  ".": "0 0 0 0 0 0 1",
  I: "111 010 010 010 010 010 111",
  a: "00000 00000 01110 00001 01111 10001 01111",
  e: "00000 00000 01110 10001 11111 10000 01110",
  g: "00000 00000 01111 10001 01111 00001 01110",
  i: "1 0 1 1 1 1 1",
  l: "10 10 10 10 10 10 01",
  n: "00000 00000 11110 10001 10001 10001 10001",
  t: "010 010 111 010 010 010 001",
  r: "00000 00000 10110 11001 10000 10000 10000",
};

function DotFigure({ text, word = false, radius = 1.55 }: { text: string; word?: boolean; radius?: number }) {
  const { width, circles } = useMemo(() => {
    const pitchX = word ? 4 : 5;
    const pitchY = 4;
    const gap = 1;
    const dotRadius = word ? 1.8 : radius;
    let currentX = 0;
    const points: ReactNode[] = [];

    for (let i = 0; i < text.length; i++) {
      const glyph = GLYPHS[text[i]];
      if (!glyph) continue;
      const rows = glyph.split(" ");
      const glyphWidth = rows[0].length;

      for (let row = 0; row < 7; row++) {
        for (let col = 0; col < glyphWidth; col++) {
          if (rows[row][col] === "1") {
            points.push(
              <circle
                key={`${i}-${row}-${col}`}
                cx={Number((currentX + col * pitchX + 1.55).toFixed(2))}
                cy={Number((row * pitchY + 1.55).toFixed(2))}
                r={dotRadius}
              />
            );
          }
        }
      }
      currentX += (glyphWidth + gap) * pitchX;
    }

    return { width: currentX, circles: points };
  }, [text, word, radius]);

  return (
    <svg
      className="pbo-dot-svg"
      viewBox={`0 0 ${width} 28`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {circles}
    </svg>
  );
}

const GAUGE_TICKS = Array.from({ length: 23 }, (_, i) => {
  const angle = ((190 + i * 5) * Math.PI) / 180;
  const outer = 142;
  const inner = i % 5 === 0 ? 129 : 133;
  return {
    x1: (163 + inner * Math.cos(angle)).toFixed(2),
    y1: (163 + inner * Math.sin(angle)).toFixed(2),
    x2: (163 + outer * Math.cos(angle)).toFixed(2),
    y2: (163 + outer * Math.sin(angle)).toFixed(2),
    width: i % 5 === 0 ? 1.5 : 1,
  };
});

function FilterDefs() {
  return (
    <svg className="pbo-filter-defs" aria-hidden="true" focusable="false">
      <defs>
        <filter id="pbo-card-noise">
          <feTurbulence type="fractalNoise" baseFrequency=".54" numOctaves="3" seed="27" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.8" intercept="-.25" />
            <feFuncG type="linear" slope="1.8" intercept="-.25" />
            <feFuncB type="linear" slope="1.8" intercept="-.25" />
            <feFuncA type="table" tableValues="0 .52" />
          </feComponentTransfer>
        </filter>

        <linearGradient id="pbo-gauge-arc" gradientUnits="userSpaceOnUse" x1="7" y1="136" x2="312" y2="109">
          <stop offset="0%" stopColor="#ff9ab7" stopOpacity="0.06" />
          <stop offset="8%" stopColor="#ff8caf" stopOpacity="0.44" />
          <stop offset="34%" stopColor="#ff6796" stopOpacity="0.94" />
          <stop offset="58%" stopColor="#ff6796" stopOpacity="1" />
          <stop offset="82%" stopColor="#ffe7ed" stopOpacity="0.74" />
          <stop offset="94%" stopColor="#fff8fa" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="pbo-gauge-shadow" gradientUnits="userSpaceOnUse" x1="11" y1="136" x2="308" y2="110">
          <stop offset="0%" stopColor="#6e1639" stopOpacity="0.04" />
          <stop offset="9%" stopColor="#6e1639" stopOpacity="0.17" />
          <stop offset="52%" stopColor="#72163d" stopOpacity="0.18" />
          <stop offset="78%" stopColor="#7b1a43" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#7b1a43" stopOpacity="0" />
        </linearGradient>

        <radialGradient id="pbo-radar-beam" cx="163" cy="163" r="145" gradientUnits="userSpaceOnUse">
          <stop offset="30%" stopColor="#650f35" stopOpacity="0" />
          <stop offset="45%" stopColor="#650f35" stopOpacity="0.025" />
          <stop offset="70%" stopColor="#650f35" stopOpacity="0.065" />
          <stop offset="90%" stopColor="#650f35" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#650f35" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="pbo-radar-beam-edge" gradientUnits="userSpaceOnUse" x1="238" y1="33" x2="190.5" y2="115.4">
          <stop offset="0%" stopColor="#ffe7ef" stopOpacity="0.19" />
          <stop offset="48%" stopColor="#ffd1df" stopOpacity="0.11" />
          <stop offset="82%" stopColor="#ffc6d7" stopOpacity="0.045" />
          <stop offset="100%" stopColor="#ffc6d7" stopOpacity="0" />
        </linearGradient>

        <filter id="pbo-radar-soft">
          <feGaussianBlur stdDeviation="1.35" />
        </filter>
        <filter id="pbo-radar-halo">
          <feGaussianBlur stdDeviation="5.2" />
        </filter>
        <filter id="pbo-gauge-blur">
          <feGaussianBlur stdDeviation="11" />
        </filter>

        <filter id="pbo-tile-soft">
          <feGaussianBlur stdDeviation="3.4" />
        </filter>
        <filter id="pbo-grout-soft">
          <feGaussianBlur stdDeviation="6.5" />
        </filter>
        <filter id="pbo-wall-noise-f">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" seed="71" result="noise" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <filter id="pbo-deep-noise-f">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" seed="57" result="noise" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <filter id="pbo-panel-noise-f">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" seed="29" result="noise" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <filter id="pbo-wall-noise-f2">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" seed="13" result="noise" />
          <feColorMatrix type="saturate" values="0" />
        </filter>

        <linearGradient id="pbo-t-tl-f" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d4b0ee" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#c6bbff" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="pbo-t-tc-f" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d5c2ff" stopOpacity="0.22" />
          <stop offset="33%" stopColor="#e0bdff" stopOpacity="0.26" />
          <stop offset="66%" stopColor="#f2a0ee" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#ff96da" stopOpacity="0.34" />
        </linearGradient>
        <linearGradient id="pbo-t-tr-f" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffe8da" stopOpacity="0.56" />
          <stop offset="50%" stopColor="#f9c6d0" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#eba4bf" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="pbo-t-ml-f" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e4dcff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#d2a0d9" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id="pbo-t-ml-x" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="pbo-t-mc-f" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e2a0e8" stopOpacity="0.30" />
          <stop offset="50%" stopColor="#d671be" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#b64c92" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="pbo-t-mr-f" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e858b8" stopOpacity="0.52" />
          <stop offset="50%" stopColor="#e6459c" stopOpacity="0.46" />
          <stop offset="100%" stopColor="#de74ba" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id="pbo-mr-l-shade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#56173a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#56173a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="pbo-deep-x" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6e1f38" />
          <stop offset="35%" stopColor="#dd6c56" />
          <stop offset="70%" stopColor="#e893bf" />
          <stop offset="100%" stopColor="#728cd6" />
        </linearGradient>
        <linearGradient id="pbo-g-v1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#461633" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#2d0b20" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#461633" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="pbo-g-v2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#461633" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#2d0b20" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#461633" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="pbo-g-h1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#461633" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#2d0b20" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#461633" stopOpacity="0.5" />
        </linearGradient>

        <mask id="pbo-wall-mask">
          <rect width="429" height="554" fill="#ffffff" />
        </mask>
        <mask id="pbo-deep-mask">
          <linearGradient id="pbo-deep-mask-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
          <rect x="-24" y="384" width="480" height="170" fill="url(#pbo-deep-mask-grad)" />
        </mask>
      </defs>
    </svg>
  );
}

export default function PulsarBusinessOutcomes() {
  const [mode, setMode] = useState<Mode>("production");
  const [openStep, setOpenStep] = useState<number | null>(null);
  const data = MODE_DATA[mode];

  const cardVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cardVideos = cardVideoRefs.current;

    const isVisible = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const syncStage = () => {
      if (reduced.matches) {
        cardVideos.forEach((video) => video?.pause());
        return;
      }

      cardVideos.forEach((video) => {
        if (!video) return;
        if (isVisible(video)) video.play().catch(() => {});
        else video.pause();
      });
    };

    syncStage();
    reduced.addEventListener("change", syncStage);

    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (reduced.matches) return;
          entries.forEach((entry) => {
            const video = entry.target as HTMLVideoElement;
            if (entry.isIntersecting) video.play().catch(() => {});
            else video.pause();
          });
        },
        { threshold: 0.15 }
      );
      cardVideos.forEach((video) => {
        if (video) observer?.observe(video);
      });
    }

    return () => {
      reduced.removeEventListener("change", syncStage);
      observer?.disconnect();
    };
  }, []);

  const openModal = (step: number) => {
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpenStep(step);
  };

  const closeModal = () => setOpenStep(null);

  useEffect(() => {
    if (openStep === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpenStep(null);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      requestAnimationFrame(() => triggerRef.current?.focus());
    };
  }, [openStep]);

  return (
    <section className="pbo" id="outcomes" aria-labelledby="pbo-headline">
      <FilterDefs />

      <div className="pbo-stage">
        <header className="pbo-masthead">
          <div>
            <div className="pbo-eyebrow-container">
              <div className="pbo-metric-switch" role="group" aria-label="Metric source selector">
                <button
                  type="button"
                  className={`pbo-metric-toggle${mode === "production" ? " is-active" : ""}`}
                  aria-pressed={mode === "production"}
                  onClick={() => setMode("production")}
                >
                  Production Lift
                </button>
                <button
                  type="button"
                  className={`pbo-metric-toggle${mode === "system" ? " is-active" : ""}`}
                  aria-pressed={mode === "system"}
                  onClick={() => setMode("system")}
                >
                  System Scale
                </button>
              </div>
            </div>
            <h2 className="pbo-headline" id="pbo-headline">
              <span className="pbo-headline-line">
                Built for{" "}
                <span className="pbo-dot-word" role="img" aria-label="Intelligent">
                  <DotFigure text="Intelligent" word />
                </span>
              </span>
              <span className="pbo-headline-line">Performance</span>
            </h2>
          </div>

          <p className="pbo-intro">
            <span className="pbo-intro-lead">
              Faster support. Happier customers. Greater operational efficiency.
            </span>
            <br className="pbo-desktop-break" /> Reduce repetitive work, accelerate routine resolutions,
            and give support teams greater visibility into operational performance.
          </p>
        </header>

        <div className="pbo-cards">
          <article className="pbo-card pbo-card--speed">
            <video
              ref={(el) => {
                cardVideoRefs.current[0] = el;
              }}
              className="pbo-card-media"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              poster={`${ASSET}/card-speed-poster.png`}
              src={`${ASSET}/card-speed.mp4`}
            />
            <svg className="pbo-card-grain" viewBox="0 0 429 554" preserveAspectRatio="none" aria-hidden="true">
              <rect width="100%" height="100%" filter="url(#pbo-card-noise)" />
            </svg>

            <h3 className="pbo-card-title">{data.speed.title}</h3>

            <svg className="pbo-gauge" viewBox="0 0 326 326" aria-hidden="true" focusable="false">
              <path
                d="M11.34 136.26A154 154 0 0 1 307.71 110.33"
                fill="none"
                strokeWidth="3.2"
                strokeLinecap="round"
                stroke="url(#pbo-gauge-shadow)"
              />
              <path
                d="M6.91 135.48A158.5 158.5 0 0 1 311.94 108.79"
                fill="none"
                strokeWidth="2.2"
                strokeLinecap="round"
                stroke="url(#pbo-gauge-arc)"
              />
              <path
                d="M19.22 137.65A146 146 0 0 1 236 36.56"
                fill="none"
                strokeWidth="1.15"
                stroke="rgba(255,166,194,.31)"
              />
              <path
                d="M238 33.1A150 150 0 0 1 277.9 66.6L199.8 119.5A55 55 0 0 0 190.5 115.4Z"
                fill="#6a1238"
                opacity="0.022"
                filter="url(#pbo-radar-halo)"
              />
              <path
                d="M238 33.1A150 150 0 0 1 277.9 66.6L199.8 119.5A55 55 0 0 0 190.5 115.4Z"
                fill="url(#pbo-radar-beam)"
                filter="url(#pbo-radar-soft)"
              />
              <path
                d="M238 33.1L190.5 115.4"
                stroke="url(#pbo-radar-beam-edge)"
                strokeWidth="1.25"
                strokeLinecap="round"
                filter="url(#pbo-radar-soft)"
              />
              <g>
                {GAUGE_TICKS.map((tick, i) => (
                  <line
                    key={i}
                    className="pbo-tick"
                    x1={tick.x1}
                    y1={tick.y1}
                    x2={tick.x2}
                    y2={tick.y2}
                    strokeWidth={tick.width}
                    strokeLinecap="round"
                  />
                ))}
              </g>
              <ellipse
                cx="225"
                cy="166"
                rx="92"
                ry="76"
                fill="#ffffff"
                opacity="0.055"
                filter="url(#pbo-gauge-blur)"
              />
            </svg>

            <div className="pbo-metric pbo-metric--speed">
              <span className="pbo-dot-number" role="img" aria-label={`${data.speed.dots} ${data.speed.unit}`}>
                <DotFigure text={data.speed.dots} radius={2.05} />
              </span>
              <span className="pbo-metric-unit">{data.speed.unit}</span>
            </div>

            <p className="pbo-caption">{data.speed.caption}</p>

            <button
              type="button"
              className="pbo-learn-more"
              aria-haspopup="dialog"
              onClick={() => openModal(1)}
            >
              Learn More
            </button>
          </article>

          <article className="pbo-card pbo-card--context">
            <video
              ref={(el) => {
                cardVideoRefs.current[1] = el;
              }}
              className="pbo-card-media"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              poster={`${ASSET}/card-context-poster.png`}
              src={`${ASSET}/card-context.mp4`}
            />

            <div className="pbo-context-backdrop" aria-hidden="true">
              <svg viewBox="0 0 429 554" preserveAspectRatio="none">
                <g mask="url(#pbo-wall-mask)">
                  <rect x="-24" y="22" width="106" height="149" rx="15" fill="url(#pbo-t-tl-f)" />
                  <rect x="88" y="22" width="247" height="150" rx="15" fill="url(#pbo-t-tc-f)" />
                  <rect x="88" y="22" width="247" height="46" rx="15" fill="#ffffff" opacity="0.14" />
                  <rect x="346" y="22" width="111" height="147" rx="15" fill="url(#pbo-t-tr-f)" />
                  <rect x="346" y="22" width="111" height="46" rx="15" fill="#ffffff" opacity="0.16" />

                  <rect x="-24" y="177" width="108" height="174" rx="15" fill="url(#pbo-t-ml-f)" />
                  <rect x="-24" y="177" width="108" height="174" rx="15" fill="url(#pbo-t-ml-x)" />
                  <rect x="-24" y="177" width="108" height="52" rx="15" fill="#ffffff" opacity="0.12" />
                  <rect x="88" y="177" width="247" height="174" rx="15" fill="url(#pbo-t-mc-f)" />
                  <rect x="344" y="175" width="113" height="176" rx="15" fill="url(#pbo-t-mr-f)" />
                  <rect x="344" y="175" width="30" height="176" fill="url(#pbo-mr-l-shade)" />

                  <rect x="-24" y="384" width="480" height="170" fill="url(#pbo-deep-x)" mask="url(#pbo-deep-mask)" />

                  <rect x="81" y="30" width="8" height="150" fill="url(#pbo-g-v1)" filter="url(#pbo-grout-soft)" />
                  <rect x="338" y="30" width="8" height="322" fill="url(#pbo-g-v2)" filter="url(#pbo-grout-soft)" />
                  <rect x="0" y="167" width="429" height="12" fill="url(#pbo-g-h1)" filter="url(#pbo-grout-soft)" />

                  <ellipse cx="352" cy="86" rx="140" ry="108" fill="#ffd1e3" opacity="0.18" filter="url(#pbo-tile-soft)" />
                  <ellipse cx="75" cy="150" rx="82" ry="54" fill="#eed5ff" opacity="0.22" filter="url(#pbo-tile-soft)" />
                  <ellipse cx="8" cy="334" rx="76" ry="58" fill="#69143c" opacity="0.24" filter="url(#pbo-tile-soft)" />
                  <ellipse cx="56" cy="215" rx="56" ry="62" fill="#8d308f" opacity="0.20" filter="url(#pbo-tile-soft)" />

                  <rect
                    x="0"
                    y="0"
                    width="429"
                    height="554"
                    filter="url(#pbo-wall-noise-f)"
                    opacity="0.34"
                    style={{ mixBlendMode: "soft-light" }}
                    pointerEvents="none"
                  />
                  <rect
                    x="0"
                    y="400"
                    width="429"
                    height="154"
                    filter="url(#pbo-deep-noise-f)"
                    opacity="0.22"
                    style={{ mixBlendMode: "soft-light" }}
                    pointerEvents="none"
                  />
                  <rect
                    x="-24"
                    y="177"
                    width="108"
                    height="174"
                    filter="url(#pbo-wall-noise-f2)"
                    opacity="0.30"
                    style={{ mixBlendMode: "soft-light" }}
                    pointerEvents="none"
                  />
                  <rect
                    x="344"
                    y="175"
                    width="113"
                    height="176"
                    filter="url(#pbo-wall-noise-f2)"
                    opacity="0.30"
                    style={{ mixBlendMode: "soft-light" }}
                    pointerEvents="none"
                  />
                </g>
              </svg>
            </div>

            <svg className="pbo-card-grain" viewBox="0 0 429 554" preserveAspectRatio="none" aria-hidden="true">
              <rect width="100%" height="100%" filter="url(#pbo-card-noise)" />
            </svg>

            <div className="pbo-context-window" aria-hidden="true">
              <svg className="pbo-window-grain" viewBox="0 0 252 166" preserveAspectRatio="none">
                <rect width="100%" height="100%" filter="url(#pbo-panel-noise-f)" />
              </svg>
              <div className="pbo-window-lines">
                <div className="pbo-window-line-1" />
                <div className="pbo-window-line-2" />
                <div className="pbo-window-line-3" />
              </div>
            </div>

            <h3 className="pbo-card-title">{data.context.title}</h3>

            <div className="pbo-metric pbo-metric--context">
              <span className="pbo-dot-number" role="img" aria-label={`${data.context.dots} ${data.context.unit}`}>
                <DotFigure text={data.context.dots} radius={2.32} />
              </span>
              <span className="pbo-metric-unit">{data.context.unit}</span>
            </div>

            <p className="pbo-caption">{data.context.caption}</p>

            <button
              type="button"
              className="pbo-learn-more"
              aria-haspopup="dialog"
              onClick={() => openModal(2)}
            >
              Learn More
            </button>
          </article>

          <article className="pbo-card pbo-card--connections">
            <video
              ref={(el) => {
                cardVideoRefs.current[2] = el;
              }}
              className="pbo-card-media"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              poster={`${ASSET}/card-connections-poster.png`}
              src={`${ASSET}/card-connections.mp4`}
            />

            <svg className="pbo-card-grain" viewBox="0 0 429 554" preserveAspectRatio="none" aria-hidden="true">
              <rect width="100%" height="100%" filter="url(#pbo-card-noise)" />
            </svg>

            <div className="pbo-connections-map" aria-hidden="true">
              <svg viewBox="0 0 429 238" preserveAspectRatio="none">
                <path
                  opacity="0.20"
                  stroke="#ffffff"
                  strokeWidth="1"
                  fill="none"
                  d="M0 5H128c27 0 36 7 39 26 2 16 9 22 24 22h106c16 0 23-8 25-25 2-16 10-23 31-23h76"
                />
                <path
                  opacity="0.30"
                  stroke="#ffffff"
                  strokeWidth="1"
                  fill="none"
                  d="M0 117h46c15 0 22 8 26 25 5 23 12 31 31 31h174c18 0 25-8 30-31 4-17 11-25 26-25h96"
                />
                <path
                  opacity="0.34"
                  stroke="#ffffff"
                  strokeWidth="1"
                  fill="none"
                  d="M0 173h87c15 0 22 7 27 25 4 15 11 22 28 22h140c17 0 25-7 29-22 5-18 12-25 28-25h90"
                />
                <path
                  opacity="0.16"
                  stroke="#ffffff"
                  strokeWidth="1"
                  fill="none"
                  d="M0 228h120c17 0 25-5 28-18 4-15 10-20 28-20h81c18 0 25 6 28 20 4 13 11 18 28 18h116"
                />
                <path
                  opacity="0.26"
                  stroke="#ffffff"
                  strokeWidth="1"
                  fill="none"
                  d="M0 5H429M0 61H429M0 117H429"
                />
                <path opacity="0.09" stroke="#ffffff" strokeWidth="1" fill="none" d="M0 173H429" />
                <path
                  opacity="0.52"
                  stroke="#fff8dd"
                  strokeWidth="1.15"
                  fill="none"
                  d="M0 61h95c14 0 22-6 27-20 4-13 12-20 27-20h115c15 0 23 6 27 20 5 14 13 20 28 20h110"
                />
                <path
                  opacity="0.94"
                  stroke="#fff8dd"
                  strokeWidth="1.15"
                  fill="none"
                  d="M0 117h88c15 0 22-8 25-25 4-24 12-31 31-31h129c20 0 27 7 31 31 3 17 10 25 26 25h99"
                />
                <circle cx="45" cy="117" r="6.5" fill="#ffffff" />
                <circle cx="133" cy="61" r="6.5" fill="#fff4a7" />
                <circle cx="189" cy="61" r="6.5" fill="#fff1a4" />
                <circle cx="319" cy="61" r="6.5" fill="#fff4a6" />
                <circle cx="319" cy="117" r="6.5" fill="#fff2a0" />
              </svg>
            </div>

            <h3 className="pbo-card-title">{data.connections.title}</h3>

            <div className="pbo-metric pbo-metric--connections">
              <span
                className="pbo-dot-number"
                role="img"
                aria-label={`${data.connections.dots} ${data.connections.unit}`}
              >
                <DotFigure text={data.connections.dots} />
              </span>
              <span className="pbo-metric-unit">{data.connections.unit}</span>
            </div>

            <p className="pbo-caption">{data.connections.caption}</p>

            <button
              type="button"
              className="pbo-learn-more"
              aria-haspopup="dialog"
              onClick={() => openModal(3)}
            >
              Learn More
            </button>
          </article>
        </div>
      </div>

      <div
        className={`pbo-modal-overlay${openStep !== null ? " is-open" : ""}`}
        aria-hidden={openStep === null}
        inert={openStep === null}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeModal();
        }}
      >
        <div
          className="pbo-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pbo-modal-title"
          ref={dialogRef}
        >
          <button
            type="button"
            className="pbo-modal-close"
            aria-label="Close dialog"
            ref={closeRef}
            onClick={closeModal}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <div className="pbo-modal-tag">How Pulsar Operates</div>
          <h3 className="pbo-modal-title" id="pbo-modal-title">
            Deterministic AI for Enterprise Support
          </h3>
          <p className="pbo-modal-desc">
            Specialised AI agents integrate with your live systems to resolve customer issues autonomously,
            safely, and with complete deterministic auditability.
          </p>

          <div className="pbo-process-steps">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.title}
                className={`pbo-process-step${openStep === i + 1 ? " is-highlighted" : ""}`}
              >
                <div className="pbo-process-step-heading">{step.title}</div>
                <div className="pbo-process-step-body">{step.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
