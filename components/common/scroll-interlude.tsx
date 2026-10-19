"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATEMENT =
  "I study how systems break, and build the tools that keep them secure: from cryptographic hash benchmarks to AI that reads documents.";
// words that land in the accent colour
const ACCENT = new Set(["break,", "secure:"]);

const ROWS = [
  ["Cryptography", "Defensive Security", "Python", "C++", "FastAPI", "Docker", "DSA"],
  ["Document AI", "OCR", "PyTorch", "React", "PostgreSQL", "Research", "Open Source"],
];

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * A scroll-driven pause in the middle of the page. The statement holds in place
 * (CSS sticky) while its words light up one by one, scrubbed to the scroll;
 * below it two keyword rows drift in opposite directions and surge with the
 * speed of the Lenis scroll, reversing when you scroll back up.
 */
export default function ScrollInterlude() {
  const pinRef = React.useRef<HTMLDivElement>(null);
  const rowRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  // words fill in as the tall wrapper scrolls past the sticky statement
  React.useEffect(() => {
    const pin = pinRef.current;
    if (!pin || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pin.querySelectorAll("[data-word]"),
        { opacity: 0.12, filter: "blur(3px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: pin, start: "top top", end: "bottom bottom", scrub: 0.4 },
        }
      );
    }, pin);
    return () => ctx.revert();
  }, []);

  // keyword rows: a slow drift, pushed by scroll velocity
  React.useEffect(() => {
    if (reduced()) return;
    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    const offsets = rows.map(() => 0);
    let direction = 1;
    const tick = (_t: number, deltaMs: number) => {
      const v = window.__lenis?.velocity ?? 0;
      if (Math.abs(v) > 0.05) direction = Math.sign(v);
      const speed = (0.04 + Math.min(Math.abs(v), 60) * 0.02) * direction * deltaMs;
      rows.forEach((row, i) => {
        // each row holds its words twice, so wrapping at half its width is seamless
        const half = row.scrollWidth / 2;
        offsets[i] = (offsets[i] + (i % 2 ? speed : -speed)) % half;
        if (offsets[i] > 0) offsets[i] -= half;
        row.style.transform = `translate3d(${offsets[i].toFixed(1)}px, 0, 0)`;
      });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <section aria-label="About my work" className="my-10">
      {/* tall wrapper: the sticky statement stays on screen while this scrolls by */}
      <div ref={pinRef} className="relative h-[220vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center">
          <p className="max-w-5xl text-balance text-center font-heading text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {STATEMENT.split(" ").map((word, i) => (
              <span
                key={i}
                data-word
                className={ACCENT.has(word) ? "text-amber-400" : undefined}
              >
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="space-y-4 overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        {ROWS.map((words, i) => (
          <div
            key={i}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className="flex w-max gap-4 will-change-transform"
          >
            {[...words, ...words].map((w, j) => (
              <span
                key={j}
                className={
                  "whitespace-nowrap rounded-full border px-6 py-2.5 font-heading text-xl font-semibold sm:text-3xl " +
                  (i % 2
                    ? "border-border/70 text-muted-foreground"
                    : "border-amber-400/30 bg-amber-400/10 text-foreground")
                }
              >
                {w}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
