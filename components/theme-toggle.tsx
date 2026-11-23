"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "so:theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [daylight, setDaylight] = useState(false);

  useEffect(() => {
    setDaylight(document.documentElement.classList.contains("daylight"));
  }, []);

  const toggle = () => {
    const next = !daylight;
    setDaylight(next);
    document.documentElement.classList.toggle("daylight", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "daylight" : "nocturne");
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={daylight ? "Switch to the nocturne theme" : "Switch to the daylight theme"}
      aria-pressed={daylight}
      className={`flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-gold hover:text-gold ${className}`}
    >
      {daylight ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M12 2.4v2.2M12 19.4v2.2M2.4 12h2.2M19.4 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20.5 14.6A8.6 8.6 0 1 1 9.4 3.5a6.9 6.9 0 0 0 11.1 11.1Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
