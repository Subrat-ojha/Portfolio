"use client";

import { profile } from "@/config/content";
import { useEffect, useState } from "react";

export function Portrait() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    setSrc(window.localStorage.getItem("so:portrait"));
    const onPortrait = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setSrc(detail || null);
    };
    window.addEventListener("so:portrait", onPortrait);
    return () => window.removeEventListener("so:portrait", onPortrait);
  }, []);

  return (
    <figure className="relative">
      <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-line bg-surface-2">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={profile.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_30%_20%,var(--ink-glow),transparent_60%)]">
            <span className="font-display text-4xl text-gold">{profile.monogram}</span>
            <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-muted">
              No photo
            </span>
          </div>
        )}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-1.5 rounded-[2px] border border-dashed border-[rgba(246,239,224,.14)]"
        />
      </div>
      <figcaption className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
        <span>{profile.name}</span>
        <span className="text-gold">SO</span>
      </figcaption>
    </figure>
  );
}
