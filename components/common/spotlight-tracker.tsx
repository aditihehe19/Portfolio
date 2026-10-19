"use client";

import * as React from "react";

/**
 * Feeds the pointer position to every `.spotlight-edge` card so it can light
 * its border where the cursor is. One listener for the whole page; the glow
 * itself is pure CSS (see `.spotlight-edge` in globals.css). Coordinates are
 * written per card, in the card's own space, so the effect also works inside
 * transformed (animated) sections.
 *
 * The card under the cursor also tilts toward it in 3D (`--tilt-x/--tilt-y`).
 * Large cards tilt less, and `data-tilt="off"` opts a card out (forms).
 */
const MAX_TILT = 6; // degrees, for a card ~400px wide
export function SpotlightTracker() {
  React.useEffect(() => {
    let raf = 0;
    let x = -1e4;
    let y = -1e4;
    const write = () => {
      raf = 0;
      const hue = (x / window.innerWidth).toFixed(3);
      document.querySelectorAll<HTMLElement>(".spotlight-edge").forEach((el) => {
        // measure from the centre with the untransformed size, so the card's
        // own tilt never feeds back into where it thinks the cursor is
        const r = el.getBoundingClientRect();
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const dx = x - (r.left + r.width / 2);
        const dy = y - (r.top + r.height / 2);
        el.style.setProperty("--spot-x", `${(dx + w / 2).toFixed(1)}px`);
        el.style.setProperty("--spot-y", `${(dy + h / 2).toFixed(1)}px`);
        el.style.setProperty("--spot-xp", hue);

        const inside = Math.abs(dx) <= w / 2 && Math.abs(dy) <= h / 2;
        const strength = el.dataset.tilt === "off" || !inside ? 0 : MAX_TILT * Math.min(1, 400 / w);
        el.style.setProperty("--tilt-x", `${(-(dy / (h / 2)) * strength).toFixed(2)}deg`);
        el.style.setProperty("--tilt-y", `${((dx / (w / 2)) * strength).toFixed(2)}deg`);
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
