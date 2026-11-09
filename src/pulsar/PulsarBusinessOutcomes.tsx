"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { animate, useInView } from "framer-motion";
import "./PulsarBusinessOutcomes.css";

const GLYPHS: Record<string, string> = {
  "0": "01110 10001 10001 10001 10001 10001 01110",
  "1": "010 110 010 010 010 010 111",
  "4": "00010 00110 01010 10010 11111 00010 00010",
  A: "01110 10001 10001 11111 10001 10001 10001",
  b: "10000 10000 11110 10001 10001 10001 11110",
  c: "00000 00000 01110 10000 10000 10001 01110",
  o: "00000 00000 01110 10001 10001 10001 01110",
  u: "00000 00000 10001 10001 10001 10011 01101",
  a: "00000 00000 01110 00001 01111 10001 01111",
  e: "00000 00000 01110 10001 11111 10000 01110",
  l: "10 10 10 10 10 10 01",
  n: "00000 00000 11110 10001 10001 10001 10001",
  t: "010 010 111 010 010 010 001",
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

const BACKDROP = (
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
);

/* ---------- Round-dot numerals, from the same glyph table as the heading's accent word ---------- */

const PITCH = 5;
const DOT_R = 2.05;
const NUM_H = 6 * PITCH + 2 * DOT_R;

function numberLayout(final: string) {
  let x = 0;
  const slots = [...final].map((ch) => {
    const columns = GLYPHS[ch].split(" ")[0].length;
    const slot = { x, columns };
    x += (columns + 1) * PITCH;
    return slot;
  });
  return { slots, width: x - PITCH - (PITCH - 2 * DOT_R) };
}

/**
 * `final` fixes the layout, so counting up never moves anything. `shown` is the number on display,
 * right-aligned to the same slots. With `settle` the dots fade in one by one instead (used for 0).
 */
function DotNumber({ final, shown, settle = false }: { final: string; shown: string; settle?: boolean }) {
  const layout = useMemo(() => numberLayout(final), [final]);
  const padded = shown.padStart(final.length, " ");
  const circles: ReactNode[] = [];
  let n = 0;

  layout.slots.forEach((slot, i) => {
    const glyph = GLYPHS[padded[i]];
    if (!glyph) return;
    glyph.split(" ").forEach((row, r) => {
      [...row].forEach((cell, c) => {
        if (cell !== "1") return;
        circles.push(
          <circle
            key={`${i}-${r}-${c}`}
            className={settle ? "pbo-dot-settle" : undefined}
            style={settle ? ({ "--d": `${200 + (n % 7) * 70 + r * 40}ms` } as CSSProperties) : undefined}
            cx={slot.x + c * PITCH + DOT_R}
            cy={r * PITCH + DOT_R}
            r={DOT_R}
          />
        );
        n++;
      });
    });
  });

  return (
    <svg className="pbo-num-svg" viewBox={`0 0 ${layout.width} ${NUM_H}`} fill="currentColor" aria-hidden="true" focusable="false">
      {circles}
    </svg>
  );
}

function Numeral({
  final,
  unit,
  label,
  mode,
  armed,
  active,
}: {
  final: string;
  unit?: string;
  label: string;
  mode: "count" | "settle";
  armed: boolean; // motion allowed: start from nothing and play when active
  active: boolean; // the section has come into view
}) {
  const target = Number(final);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!armed || !active || mode !== "count") return;
    const controls = animate(0, target, {
      duration: 1.3,
      delay: 0.25,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [armed, active, mode, target]);

  const shown = mode === "count" && armed ? String(value) : final;

  return (
    <div className="pbo-num" role="img" aria-label={label}>
      <DotNumber final={final} shown={shown} settle={mode === "settle"} />
      {unit && (
        <span className="pbo-num-unit" aria-hidden="true">
          {unit}
        </span>
      )}
    </div>
  );
}

/* ---------- Illustrations (drawn in the mock's own geometry) ---------- */

const at = (i: number) => ({ "--i": i }) as CSSProperties;
const wait = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function MoneyArt() {
  return (
    <svg viewBox="0 0 300 70" fill="none" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path className="pbo-draw" pathLength={1} style={at(0)} d="M4 46H112" />
      <path className="pbo-draw" pathLength={1} style={at(1)} d="M188 46H290M282 40l8 6-8 6" />
      <path className="pbo-draw" pathLength={1} style={at(2)} d="M112 46V22h76v24" />
      <g className="pbo-fade" style={wait(1500)}>
        <circle cx="150" cy="12" r="10" stroke="#ad314d" />
        <path d="M145 12l4 4 7-8" stroke="#ad314d" />
      </g>
      <circle className="pbo-travel" cx="16" cy="46" r="5" fill="#ad314d" stroke="none" />
    </svg>
  );
}

function RepliesArt() {
  return (
    <svg viewBox="0 0 300 70" fill="none" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" focusable="false">
      <path className="pbo-draw" pathLength={1} style={at(0)} d="M22 52h76" />
      <path className="pbo-draw" pathLength={1} style={at(1)} d="M110 52h80" />
      <path className="pbo-draw" pathLength={1} style={at(2)} d="M202 52h76" />
      <g className="pbo-fade" style={wait(300)}>
        <circle cx="16" cy="52" r="6" />
        <circle cx="104" cy="52" r="6" />
        <circle cx="196" cy="52" r="6" />
        <circle cx="284" cy="52" r="6" fill="#202020" />
      </g>
      <g className="pbo-fade" style={wait(800)}>
        <rect x="96" y="2" width="108" height="24" rx="12" stroke="#ad314d" strokeDasharray="3 4" />
        <text x="150" y="18" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#ad314d" stroke="none">
          language model
        </text>
        <path d="M104 46C104 34 104 30 112 28M196 46C196 34 196 30 188 28" stroke="#ad314d" strokeDasharray="2 4" />
      </g>
      <g className="pbo-fade" style={wait(500)} fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#6b6b6b" stroke="none" textAnchor="middle">
        <text x="16" y="70">message</text>
        <text x="104" y="70">classify</text>
        <text x="196" y="70">rules</text>
        <text x="284" y="70">reply</text>
      </g>
    </svg>
  );
}

function TiersArt() {
  return (
    <svg viewBox="0 0 300 70" fill="none" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path className="pbo-draw" pathLength={1} style={at(0)} d="M10 56V42h56v14" />
      <path className="pbo-draw" pathLength={1} style={at(1)} d="M80 56V32h56v24" />
      <g stroke="#ad314d">
        <g className="pbo-fade" style={wait(600)}>
          <path d="M150 56V22h56v34" strokeDasharray="3 4" />
          <rect x="171" y="30" width="14" height="11" rx="2" />
          <path d="M174 30v-3a4 4 0 018 0v3" />
        </g>
        <g className="pbo-fade" style={wait(800)}>
          <path d="M220 56V12h56v44" strokeDasharray="3 4" />
          <rect x="241" y="22" width="14" height="11" rx="2" />
          <path d="M244 22v-3a4 4 0 018 0v3" />
        </g>
      </g>
      <g className="pbo-fade" style={wait(400)} fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#6b6b6b" stroke="none" textAnchor="middle">
        <text x="38" y="68">T0</text>
        <text x="108" y="68">T1</text>
        <text x="178" y="68">T2</text>
        <text x="248" y="68">T3</text>
      </g>
    </svg>
  );
}

/* ---------- Section ---------- */

export default function PulsarBusinessOutcomes() {
  const ledgerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ledgerRef, { once: true, amount: 0.3 });
  // Until the client has read the motion preference everything is in its finished, static state
  // (which is also what JavaScript-off and reduced-motion visitors get).
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const frame = requestAnimationFrame(() => setArmed(!query.matches));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="pbo" id="outcomes" aria-labelledby="pbo-headline">
      <div className="pbo-stage">
        <div className="pbo-top">
          <div>
            <div className="pbo-chips">
              <span className="pbo-chip is-on">Safety by design</span>
              <span className="pbo-chip">Proven in CI</span>
            </div>
            <h2 className="pbo-headline" id="pbo-headline">
              <span className="pbo-headline-line">
                Built for{" "}
                <span className="pbo-dot-word" role="img" aria-label="Accountable" style={{ width: "5.918em" }}>
                  <DotFigure text="Accountable" word />
                </span>
              </span>
              <span className="pbo-headline-line">Performance</span>
            </h2>
          </div>
          <p className="pbo-intro">
            <b>Switch automation on one request type at a time.</b>A person approves every refund. Everything Pulsar
            does is checked against your rules and recorded.
          </p>
        </div>

        <div ref={ledgerRef} className={`pbo-ledger${armed ? " is-armed" : ""}${armed && inView ? " is-in" : ""}`}>
          <div className="pbo-cols">
            <article className="pbo-col">
              <div className="pbo-lab">
                <span>01 · Money</span>
                <i aria-hidden="true">●</i>
              </div>
              <Numeral final="100" unit="%" label="100 percent of refunds" mode="count" armed={armed} active={inView} />
              <p className="pbo-stmt">of refunds are approved by a person</p>
              <p className="pbo-sub">
                Pulsar can draft and recommend. Money moves only after someone on your team says yes.
              </p>
              <div className="pbo-art">
                <MoneyArt />
                <span className="pbo-tag">Enforced in code</span>
              </div>
            </article>

            <article className="pbo-col">
              <div className="pbo-lab">
                <span>02 · Routine replies</span>
                <i aria-hidden="true">●</i>
              </div>
              <Numeral final="0" label="0 language-model calls" mode="settle" armed={armed} active={inView} />
              <p className="pbo-stmt">language-model calls on routine order-status replies</p>
              <p className="pbo-sub">
                Simple, repeatable answers come from your order data and your rules, not from a guess.
              </p>
              <div className="pbo-art">
                <RepliesArt />
                <span className="pbo-tag">Proven in CI</span>
              </div>
            </article>

            <article className="pbo-col">
              <div className="pbo-lab">
                <span>03 · Authority</span>
                <i aria-hidden="true">●</i>
              </div>
              <Numeral final="4" label="4 authority tiers" mode="count" armed={armed} active={inView} />
              <p className="pbo-stmt">authority tiers, from reading a status to moving money</p>
              <p className="pbo-sub">
                Each tier has its own approval rule. The top two stay locked: T2 waits for a person, T3 is never automated.
              </p>
              <div className="pbo-art">
                <TiersArt />
                <span className="pbo-tag">Fixed in the design</span>
              </div>
            </article>
          </div>
        </div>

        <div className="pbo-foot">
          <span>These describe how Pulsar is built today, not customer results.</span>
          <a href="#why-pulsar">
            See how every refund is decided<span aria-hidden="true"> →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
