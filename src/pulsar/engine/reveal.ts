// Entrance reveals: CSS classes do the animation (.ps-reveal -> .is-in),
// gated on html.motion so no-JS and reduced-motion users see content immediately.
import { prefersReducedMotion } from "./env";

let observer: IntersectionObserver | null = null;

export function initReveals(root: ParentNode = document): () => void {
  if (typeof window === "undefined") return () => {};
  const els = Array.from(root.querySelectorAll<HTMLElement>(".ps-reveal"));
  if (prefersReducedMotion()) {
    els.forEach((el) => el.classList.add("is-in"));
    return () => {};
  }
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("is-in");
          observer?.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );
  els.forEach((el) => {
    if (!el.classList.contains("is-in")) observer!.observe(el);
  });
  return () => {
    observer?.disconnect();
    observer = null;
  };
}
