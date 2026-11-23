"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Words } from "./words";

type SectionShellProps = {
  id: string;
  /** Two-digit chapter number, e.g. "02". */
  index: string;
  eyebrow: string;
  title: string;
  /** Small right-aligned note beside the title, e.g. "5 projects". */
  meta?: string;
  titleClassName?: string;
  className?: string;
  bodyClassName?: string;
  bordered?: boolean;
  children: ReactNode;
};

/**
 * One chapter of the paper page. Watches itself once, then lets CSS run the
 * choreography: eyebrow rule draws, the title surfaces word by word, the
 * chapter numeral drifts against the scroll, and body items cascade.
 */
export function SectionShell({
  id,
  index,
  eyebrow,
  title,
  meta,
  titleClassName,
  className = "",
  bodyClassName = "mt-8",
  bordered = true,
  children,
}: SectionShellProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      data-section=""
      data-in={shown ? "true" : "false"}
      className={`section-shell relative scroll-mt-24 px-6 sm:px-10 ${
        bordered ? "border-t border-dashed border-line pb-16 pt-14 sm:pb-20" : ""
      } ${className}`}
    >
      <span aria-hidden="true" className="section-topline" />

      <div className="section-head relative">
        <span aria-hidden="true" className="chapter-ghost">
          {index}
        </span>

        <p className="eyebrow relative z-10">
          {index} / {eyebrow}
        </p>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <h2
            className={`relative z-10 font-display ${
              titleClassName ?? "text-[clamp(1.7rem,3.6vw,2.3rem)] leading-tight"
            }`}
          >
            <Words text={title} />
          </h2>

          {meta ? (
            <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              {meta}
            </span>
          ) : null}
        </div>

        <span aria-hidden="true" className="section-rule" />
      </div>

      <div className={bodyClassName}>{children}</div>
    </section>
  );
}
