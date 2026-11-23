"use client";

import { profile, sections } from "@/config/content";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const NAV = sections.filter((s) => s.id !== "top");

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > window.innerHeight * 0.78);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[opacity,transform,background-color,border-color] duration-500 ${
        scrolled
          ? "translate-y-0 border-b border-line bg-background/85 opacity-100 backdrop-blur-md"
          : "pointer-events-none -translate-y-2 border-b border-transparent opacity-0"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[var(--frame)] items-center justify-between gap-6 px-6">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line-strong font-mono text-[9px] tracking-[0.1em] text-gold transition-colors group-hover:border-gold">
            {profile.monogram}
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-foreground sm:inline">
            {profile.name}
          </span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-5 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="u-link font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={`mailto:${profile.email}`}
            className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground transition-colors hover:border-gold hover:text-gold sm:inline-flex"
          >
            Get in touch
          </a>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="h-px origin-left bg-gold/70 transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />
    </header>
  );
}
