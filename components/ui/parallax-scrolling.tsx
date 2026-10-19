"use client";

/**
 * Parallax scrolling, after Osmo's layered parallax (21st.dev/@osmosupply).
 *
 * The original is one hero scene: stacked layers inside a
 * `[data-parallax-layers]` container, each tagged `data-parallax-layer="1…4"`,
 * scrubbed by a GSAP ScrollTrigger timeline so the back layers drift further
 * than the front ones while Lenis smooths the scroll. Here the same timeline is
 * a hook that any section can use, plus a site-wide `data-parallax-speed`
 * attribute for single elements. Lenis itself lives in <SmoothScroll />.
 */

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type ParallaxLayer = { layer: string; yPercent: number };

/** The original depth map: back layers move most, the front layer barely. */
export const DEFAULT_LAYERS: ParallaxLayer[] = [
  { layer: "1", yPercent: 70 },
  { layer: "2", yPercent: 55 },
  { layer: "3", yPercent: 40 },
  { layer: "4", yPercent: 10 },
];

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Scrubs every `[data-parallax-layer]` inside the root's `[data-parallax-layers]`
 * container from 0 to its `yPercent` while the container scrolls out of view.
 */
export function useParallaxLayers(
  rootRef: RefObject<HTMLElement | null>,
  layers: ParallaxLayer[] = DEFAULT_LAYERS
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion()) return;
    const trigger = root.querySelector<HTMLElement>("[data-parallax-layers]") ?? root;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0,
        },
      });
      layers.forEach((layerObj, idx) => {
        const targets = trigger.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`);
        if (!targets.length) return;
        tl.to(targets, { yPercent: layerObj.yPercent, ease: "none" }, idx === 0 ? undefined : "<");
      });
      // the scene dims slightly as it leaves, like the original's fade
      const fade = [
        ...(trigger.matches("[data-parallax-fade]") ? [trigger] : []),
        ...Array.from(trigger.querySelectorAll("[data-parallax-fade]")),
      ];
      if (fade.length) tl.to(fade, { opacity: 0.35, ease: "none" }, "<");
    }, root);

    return () => ctx.revert();
  }, [rootRef, layers]);
}

/**
 * Site-wide single-element parallax. Any element with `data-parallax-speed="n"`
 * drifts by ±n×100px as it crosses the viewport (positive lags behind the
 * scroll, negative runs ahead). Re-scan whenever the page content changes.
 */
export function useParallaxSpeedScan(deps: unknown[] = []) {
  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-parallax-speed]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxSpeed || "0");
        if (!speed) return;
        gsap.fromTo(
          el,
          { y: -speed * 100 },
          {
            y: speed * 100,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    });
    // layouts settle after fonts and images; make the triggers re-measure
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
