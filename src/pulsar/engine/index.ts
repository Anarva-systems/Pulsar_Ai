// Single-page engine core: boots scroll, exposes onPage lifecycle in a gsap.context.
// No loader, no curtain, no GL: this is a product landing page, not a spectacle.
// Every page effect lives inside onPage()/usePage() so it is reverted on unmount.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initScroll } from "./scroll";
import { initMagnetic, bindFillButtons } from "./interactions";
import { initReveals } from "./reveal";
import { prefersReducedMotion } from "./env";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
export { onScroll, scrollState, scrollToTarget, stopScroll, startScroll } from "./scroll";
export { ease, isTouch, isMobile, prefersReducedMotion } from "./env";

export type PageFn = (page: { intro: gsap.core.Timeline }) => void | (() => void);
const pageFns = new Set<PageFn>();
const cleanups: (() => void)[] = [];
let ctx: gsap.Context | null = null;
let intro: gsap.core.Timeline | null = null;
let ready = false;
let booted = false;

export function onPage(fn: PageFn) {
  pageFns.add(fn);
  if (ready) runPageFn(fn);
  return () => {
    pageFns.delete(fn);
  };
}

function runPageFn(fn: PageFn) {
  ctx?.add(() => {
    const c = fn({ intro: intro! });
    if (typeof c === "function") cleanups.push(c);
  });
}

export function syncFlags() {
  const h = document.documentElement.classList;
  h.add("js", "is-booted");
  h.toggle("motion", !prefersReducedMotion());
}

function initPage() {
  syncFlags();
  ctx = gsap.context(() => {
    intro = gsap.timeline({ paused: true });
    initMagnetic(document);
    bindFillButtons(document);
  });
  cleanups.push(initReveals(document));
  ready = true;
  pageFns.forEach(runPageFn);
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

/** First load: scroll init, page init, intro plays. Idempotent. */
export function boot() {
  if (booted || typeof window === "undefined") return;
  booted = true;
  syncFlags();
  initScroll();
  initPage();
  intro?.play();
}

/** Tear down every tween, ScrollTrigger and listener (Strict Mode / unmount safe). */
export function teardown() {
  if (!ready) return;
  ready = false;
  booted = false;
  cleanups.splice(0).forEach((c) => c());
  ctx?.revert();
  ctx = null;
}
