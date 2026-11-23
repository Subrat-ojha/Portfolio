import type { CSSProperties } from "react";

/**
 * Splits a heading into words so each one can surface with the same
 * blur-and-lift the intro uses. The animation itself is pure CSS, keyed off
 * the parent section's `data-in` state — no client component needed here.
 */
export function Words({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <span className={`word-reveal ${className}`}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="wr" style={{ "--w": i } as CSSProperties}>
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
