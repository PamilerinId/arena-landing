"use client";

import { useEffect } from "react";

const SAFETY_MS = 3000;

/**
 * Adds `reveal-ready` to <html> on mount so the hidden state only ever applies
 * with JS on, then reveals each [data-reveal] block as it enters the viewport.
 */
export function useReveal(): void {
  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      nodes.forEach((n) => n.classList.add("on"));
      return;
    }

    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("on");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    nodes.forEach((n) => observer.observe(n));

    const safety = window.setTimeout(() => {
      nodes.forEach((n) => n.classList.add("on"));
      observer.disconnect();
    }, SAFETY_MS);

    return () => {
      window.clearTimeout(safety);
      observer.disconnect();
    };
  }, []);
}
