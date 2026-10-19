"use client";

import * as React from "react";

/**
 * Feeds the pointer position to every `.spotlight-edge` card so it can light
 * its border where the cursor is. One listener for the whole page; the glow
 * itself is pure CSS (see `.spotlight-edge` in globals.css). Coordinates are
 * written per card, in the card's own space, so the effect also works inside
 * transformed (animated) sections.
 */
export function SpotlightTracker() {
  React.useEffect(() => {
    let raf = 0;
    let x = -1e4;
    let y = -1e4;
    const write = () => {
      raf = 0;
      const hue = (x / window.innerWidth).toFixed(3);
      document.querySelectorAll<HTMLElement>(".spotlight-edge").forEach((el) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${(x - r.left).toFixed(1)}px`);
        el.style.setProperty("--spot-y", `${(y - r.top).toFixed(1)}px`);
        el.style.setProperty("--spot-xp", hue);
      });
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(write);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      x = e.clientX;
      y = e.clientY;
      queue();
    };
    document.addEventListener("pointermove", move, { passive: true });
    // cards move under a still cursor while the page scrolls
    window.addEventListener("scroll", queue, { passive: true });
    return () => {
      document.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", queue);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
