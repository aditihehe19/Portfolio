"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Depth behind the whole site: a faint dot grid and three soft colour glows,
 * fixed to the viewport, each drifting at its own speed as the page scrolls.
 * Far layers move least, so the page reads as layered rather than flat.
 */
const GLOWS = [
  { className: "left-[-12%] top-[8%] h-[46vw] w-[46vw] bg-amber-400", speed: 0.18, opacity: 0.07 },
  { className: "right-[-14%] top-[38%] h-[40vw] w-[40vw] bg-violet-500", speed: 0.32, opacity: 0.08 },
  { className: "left-[18%] top-[78%] h-[36vw] w-[36vw] bg-cyan-400", speed: 0.5, opacity: 0.06 },
];

export function ParallaxBackdrop() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
        const depth = parseFloat(el.dataset.depth || "0");
        gsap.to(el, {
          // drift a fraction of a viewport per screen scrolled
          y: () => -depth * (document.documentElement.scrollHeight - window.innerHeight) * 0.35,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.6, invalidateOnRefresh: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        data-depth="0.08"
        className="absolute inset-x-0 top-0 h-[300vh] text-foreground opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1.3px)",
          backgroundSize: "28px 28px",
        }}
      />
      {GLOWS.map((g) => (
        <div
          key={g.className}
          data-depth={g.speed}
          className={`absolute rounded-full blur-[120px] ${g.className}`}
          style={{ opacity: g.opacity }}
        />
      ))}
    </div>
  );
}
