export const prefersReducedMotion = () =>
  typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
export const isTouch = () =>
  typeof window !== "undefined" && matchMedia("(hover: none), (pointer: coarse)").matches;
export const isMobile = () => typeof window !== "undefined" && matchMedia("(max-width: 767px)").matches;

export const ease = {
  out: "expo.out",
  inOut: "expo.inOut",
  soft: "power3.out",
  spring: "back.out(1.6)",
} as const;
