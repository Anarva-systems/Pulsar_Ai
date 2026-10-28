"use client";

import { Fragment, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./engine";
import { usePage } from "./engine/next";
import "./PulsarResolution.css";

const CLOUD = "/pulsar-assets/resolution/cloud.png";

const STAGES = [
  { n: "01", title: "Read", desc: "Ingest conversations and relevant history." },
  { n: "02", title: "Understand", desc: "Classify intent and extract context." },
  { n: "03", title: "Verify", desc: "Retrieve facts from internal business systems." },
  { n: "04", title: "Evaluate", desc: "Check policies, permissions and risk." },
  { n: "05", title: "Act", desc: "Respond or execute authorised actions." },
  { n: "06", title: "Confirm", desc: "Verify outcomes, record evidence and escalate." },
] as const;

const HEADLINE = "Autonomy with accountability.";

export default function PulsarResolution() {
  const scope = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  usePage(() => {
    const root = scope.current;
    if (!root) return;

    const syncActive = (progress: number) => {
      const next = Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length));
      setActive((current) => (current === next ? current : next));
    };

    const mm = gsap.matchMedia();
    mm.add("(min-width: 761px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () => `+=${window.innerHeight * 2}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => syncActive(self.progress),
        onRefresh: (self) => syncActive(self.progress),
      });
      return () => trigger.kill(true);
    });

    const tl = prefersReducedMotion() ? null : gsap.timeline({ paused: true, delay: 0.1 });
    let intro: ScrollTrigger | null = null;
    if (tl) {
      tl.from(root.querySelector(".prx-pill"), {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "back.out(2)",
      })
        .from(
          root.querySelectorAll(".prx-word"),
          {
            opacity: 0,
            y: 16,
            filter: "blur(6px)",
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(root.querySelector(".prx-sub"), { opacity: 0, y: 10, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .from(root.querySelector(".prx-cloud"), { x: -60, opacity: 0, duration: 1.2, ease: "power3.out" }, 0.2)
        .from(
          root.querySelector(".prx-panel:first-child .prx-panel-in"),
          { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" },
          "-=0.7"
        );

      intro = ScrollTrigger.create({
        trigger: root,
        start: "top 80%",
        once: true,
        onEnter: () => tl.play(),
        onRefresh: (self) => {
          if (self.progress > 0) tl.play();
        },
      });
    }

    return () => {
      intro?.kill();
      tl?.kill();
      mm.revert();
    };
  });

  return (
    <section className="prx" ref={scope} aria-labelledby="prx-title">
      <div className="prx-loop" id="loop">
        <div className="prx-cloud" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="prx-cloud-img prx-drift-a"
            src={CLOUD}
            alt=""
            width={2688}
            height={1520}
            decoding="async"
          />
          <div className="prx-glass" />
          <div className="prx-glass" />
          <div className="prx-glass" />
        </div>

        <div className="prx-head">
          <span className="prx-pill">The Pulsar Resolution Engine</span>
          <h2 className="prx-h2" id="prx-title">
            {HEADLINE.split(" ").map((word, i, all) => (
              <Fragment key={`${word}-${i}`}>
                <span className="prx-word">{word}</span>
                {i < all.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h2>
          <p className="prx-sub">Six stages. One controlled resolution workflow.</p>
        </div>

        <div className="prx-track" id="track">
          {STAGES.map((stage, i) => {
            const isActive = active === i;
            const isRevealed = i <= active;
            return (
              <div
                key={stage.n}
                className={`prx-panel${isRevealed ? " is-revealed" : ""}${isActive ? " is-active" : ""}`}
              >
                <div className="prx-panel-in">
                  <span className={`prx-num prx-num--${i + 1}`}>{stage.n}</span>
                  <div className="prx-step" id={`prx-step-${i}`}>
                    <h3>{stage.title}</h3>
                    <p>{stage.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
