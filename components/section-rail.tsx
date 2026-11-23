"use client";

import { sections } from "@/config/content";
import { useEffect, useState } from "react";

export function SectionRail() {
  const [active, setActive] = useState("top");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const io = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleEntry) setActive(visibleEntry.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.6] },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className={`fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 transition-opacity duration-500 xl:flex ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {sections
        .filter((s) => s.id !== "top")
        .map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group flex items-center gap-2.5"
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={`font-mono text-[9px] uppercase tracking-[0.18em] transition-all duration-300 ${
                  isActive
                    ? "text-gold opacity-100"
                    : "text-muted opacity-0 group-hover:opacity-100"
                }`}
              >
                {item.label}
              </span>
              <span
                className={`block h-px transition-all duration-300 ${
                  isActive ? "w-5 bg-gold" : "w-2.5 bg-line-strong group-hover:w-4 group-hover:bg-gold/60"
                }`}
              />
            </a>
          );
        })}
    </nav>
  );
}
