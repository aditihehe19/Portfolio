"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useParallaxSpeedScan } from "@/components/ui/parallax-scrolling";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Lenis smooth scrolling for the whole site, driven by GSAP's ticker so every
 * ScrollTrigger (parallax layers, scrubbed effects) moves in step with it.
 * Skipped entirely for visitors who ask for reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // in-page links (#projects, #contact…) glide instead of jumping
      anchors: { offset: -80 },
      // dialogs, menus and other inner scrollers keep their own scrolling
      allowNestedScroll: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    // let in-page buttons (e.g. the footer's "back to top") scroll through Lenis
    window.__lenis = lenis;
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      if (window.__lenis === lenis) window.__lenis = undefined;
    };
  }, []);

  // new page: re-scan its `data-parallax-speed` elements
  useParallaxSpeedScan([pathname]);

  return null;
}
