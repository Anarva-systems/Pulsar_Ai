"use client";
// Next.js adapter for the single-page engine. Render <Engine /> once inside the page
// (last child) and author per-section motion with usePage() so it reverts on unmount.
import { useEffect } from "react";
import { boot, onPage, teardown, type PageFn } from "./index";

export function Engine() {
  useEffect(() => {
    boot();
    return () => teardown();
  }, []);
  return null;
}

export function usePage(fn: PageFn) {
  useEffect(() => onPage(fn), []);
}
