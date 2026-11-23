"use client";

import { useEffect } from "react";

/**
 * Feeds the scroll position to CSS.
 *
 * - `--sy` on the root drives the slow drift of the dotted gutters.
 * - `--sp` on each section (0 → 1 as it crosses the viewport) drives the ghost
 *   chapter numerals and the soft glow behind each heading.
 *
 * One listener, one rAF; the browser only recalculates paint, never React.
 */
export function ScrollFX() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      root.style.setProperty("--sy", window.scrollY.toFixed(1));

      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (vh - rect.top) / (rect.height + vh)));
        el.style.setProperty("--sp", progress.toFixed(4));
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return null;
}
