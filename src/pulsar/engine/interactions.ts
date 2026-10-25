// Pointer craft. Fine pointers only; the native cursor is never hidden.
//   data-magnetic="0.35"   element leans toward the pointer
import { gsap } from "gsap";
import { isTouch, prefersReducedMotion } from "./env";

export function initMagnetic(root: ParentNode = document) {
  if (typeof window === "undefined" || isTouch() || prefersReducedMotion()) return;
  root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    if (el.dataset.magneticBound === "1") return;
    el.dataset.magneticBound = "1";
    const strength = parseFloat(el.dataset.magnetic || "0.35");
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * strength);
      y((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      x(0);
      y(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
  });
}

/** Tangerine fill that floods a button from the pointer entry point. */
export function bindFillButtons(scope: ParentNode = document) {
  if (typeof window === "undefined" || isTouch() || prefersReducedMotion()) return;
  scope.querySelectorAll<HTMLElement>("[data-fill]").forEach((btn) => {
    if (btn.dataset.fillBound === "1") return;
    btn.dataset.fillBound = "1";
    const fill = btn.querySelector<HTMLElement>(".btn-fill");
    if (!fill) return;
    const at = (e: PointerEvent) => {
      const r = btn.getBoundingClientRect();
      return `${e.clientX - r.left}px ${e.clientY - r.top}px`;
    };
    const open = (point: string) => {
      gsap.set(fill, { clipPath: `circle(0% at ${point})` });
      btn.classList.add("is-filled");
      gsap.to(fill, { clipPath: `circle(150% at ${point})`, duration: 0.6, ease: "power3.out", overwrite: true });
    };
    const close = (point: string) => {
      btn.classList.remove("is-filled");
      gsap.to(fill, { clipPath: `circle(0% at ${point})`, duration: 0.5, ease: "power3.out", overwrite: true });
    };
    btn.addEventListener("pointerenter", (e) => open(at(e)));
    btn.addEventListener("pointerleave", (e) => close(at(e)));
    btn.addEventListener("focus", () => open("50% 50%"));
    btn.addEventListener("blur", () => close("50% 50%"));
  });
}
