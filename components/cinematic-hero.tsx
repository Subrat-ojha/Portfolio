"use client";

import { profile } from "@/config/content";
import { CityScene } from "@/lib/city-scene";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

const HEADLINE = `Hi, I’m ${profile.name}.`;

function downscale(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read failed"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("decode failed"));
      img.onload = () => {
        const max = 560;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("no context"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.86));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLCanvasElement>(null);
  const fgRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<CityScene | null>(null);
  const portraitRef = useRef<HTMLImageElement | null>(null);

  const [lit, setLit] = useState(false);
  const [done, setDone] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [run, setRun] = useState(0);

  const applyPortrait = useCallback((src: string | null) => {
    if (!src) {
      portraitRef.current = null;
      sceneRef.current?.setPortrait(null);
      return;
    }
    const img = new Image();
    img.onload = () => {
      portraitRef.current = img;
      sceneRef.current?.setPortrait(img);
    };
    img.src = src;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const fg = fgRef.current;
    if (!section || !bg || !fg) return;

    const scene = new CityScene(section, bg, fg, {
      onText: () => setLit(true),
      onDone: () => setDone(true),
    });
    sceneRef.current = scene;
    if (portraitRef.current) scene.setPortrait(portraitRef.current);
    scene.start();

    return () => {
      scene.destroy();
      sceneRef.current = null;
    };
  }, [run]);

  useEffect(() => {
    const saved = window.localStorage.getItem("so:portrait");
    if (saved) {
      setHasPhoto(true);
      applyPortrait(saved);
    }
  }, [applyPortrait]);

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    try {
      const dataUrl = await downscale(file);
      try {
        window.localStorage.setItem("so:portrait", dataUrl);
      } catch {
        /* private mode / quota — the scene still gets the photo */
      }
      setHasPhoto(true);
      applyPortrait(dataUrl);
      window.dispatchEvent(new CustomEvent("so:portrait", { detail: dataUrl }));
    } catch {
      /* ignore unreadable files */
    }
  };

  const skip = () => sceneRef.current?.skip();

  const replay = () => {
    setLit(false);
    setDone(false);
    setRun((n) => n + 1);
  };

  const words = HEADLINE.split(" ");

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="An aerial view of a city plaza that pushes in on a developer at a laptop"
      className={`hero relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-[#070912] text-[#f6efe0] ${lit ? "is-lit" : ""}`}
    >
      <canvas ref={bgRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      <canvas ref={fgRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />

      {/* shade + grade + grain, the film layers from the sketch */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] transition-opacity duration-500"
        style={{
          opacity: "var(--v, 0)" as unknown as number,
          background:
            "radial-gradient(ellipse at 55% 45%, transparent 30%, rgba(6,8,16,.72)), linear-gradient(90deg, rgba(6,8,16,.86), transparent 62%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] mix-blend-soft-light"
        style={{
          background:
            "radial-gradient(circle at 12% 8%, rgba(255,215,160,.55), transparent 50%), linear-gradient(135deg, rgba(255,170,90,.4), rgba(255,200,140,0) 55%, rgba(40,70,130,.5))",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.09] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* top rail: identity on the left, the scene controls on the right */}
      <div className="absolute inset-x-0 top-0 z-[6]">
        <div className="mx-auto flex max-w-[var(--frame)] items-center justify-between px-6 pt-[max(1.5rem,env(safe-area-inset-top))]">
          <a
            href="#top"
            className="flex items-center gap-3 text-[#f6efe0]"
            aria-label={`${profile.name} — back to top`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(246,239,224,.35)] font-mono text-[10px] tracking-[0.12em]">
              {profile.monogram}
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-[rgba(246,239,224,.7)] sm:inline">
              {profile.name}
            </span>
          </a>

          <div className="flex items-center gap-2">
            <label className="group relative cursor-pointer rounded-full border border-[rgba(246,239,224,.28)] bg-[rgba(10,12,22,.35)] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(246,239,224,.8)] backdrop-blur-sm transition-colors hover:border-[rgba(232,183,101,.7)] hover:text-[#f6efe0]">
              {hasPhoto ? "Photo added" : "Add your photo"}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={(e) => onFile(e.target.files?.[0])}
              />
            </label>
            {!done ? (
              <button
                type="button"
                onClick={skip}
                className="rounded-full border border-[rgba(246,239,224,.2)] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(246,239,224,.65)] transition-colors hover:border-[rgba(232,183,101,.7)] hover:text-[#f6efe0]"
              >
                Skip intro
              </button>
            ) : (
              <button
                type="button"
                onClick={replay}
                className="rounded-full border border-[rgba(246,239,224,.2)] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(246,239,224,.65)] transition-colors hover:border-[rgba(232,183,101,.7)] hover:text-[#f6efe0]"
              >
                Replay
              </button>
            )}
          </div>
        </div>
      </div>

      {/* title block, aligned to the same column as the paper page */}
      <div className="absolute inset-x-0 bottom-0 top-0 z-[4] flex items-end">
        <div className="mx-auto w-full max-w-[var(--frame)] px-6 pb-[max(3.5rem,calc(env(safe-area-inset-bottom)+3rem))] sm:pb-20">
          <p className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#e8b765]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#e8b765]" />
            {profile.role} · {profile.location}
          </p>

          <h1 className="font-display text-[clamp(2.75rem,8.2vw,6.6rem)] leading-[0.95] text-[#f6efe0]">
            {words.map((word, i) => (
              <span key={`${word}-${i}`}>
                <span className="hero-word" style={{ "--w": i } as CSSProperties}>
                  {word}
                </span>
                {i < words.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <p className="hero-sub mt-6 max-w-[34ch] text-[15px] leading-relaxed text-[#e2d7c0] sm:text-[17px]">
            {profile.tagline}
          </p>

          <span className="hero-rule mt-8" aria-hidden="true" />

          <div className="hero-actions mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
            <a
              href="#about"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#f6efe0]"
            >
              Selected work
              <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
            <a
              href="#contact"
              className="u-link font-mono text-[11px] uppercase tracking-[0.18em] text-[rgba(246,239,224,.6)] transition-colors hover:text-[#f6efe0]"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div
        className={`pointer-events-none absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-[6] -translate-x-1/2 transition-opacity duration-700 ${
          lit ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="hero-scroll-cue block font-mono text-[9px] uppercase tracking-[0.4em] text-[rgba(246,239,224,.55)]">
          Scroll
        </span>
      </div>

      <div aria-hidden="true" className="dither-edge pointer-events-none absolute inset-x-0 bottom-0 z-[1]" />
    </section>
  );
}
