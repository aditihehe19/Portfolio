"use client";

import {
  MotionConfig,
  type MotionValue,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { DM_Serif_Display, IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";
import * as React from "react";
import { SiGithub } from "react-icons/si";

import GlassBloom from "@/components/ui/glass-bloom";
import { siteConfig } from "@/config/site";

const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const WORDMARK = "ADITI".split("");
const TYPED = ["Securing systems.", "Building intelligently."];

const PLACES = [
  { name: "SRM University AP", logo: "/experience/srm-logo.png" },
  { name: "Hack Shastra", logo: "/experience/hackshastra-logo.png" },
  { name: "GDG SRM AP", logo: "/experience/gdg-logo.svg" },
];

const ease = [0.22, 1, 0.36, 1] as const;

/** Types each line in turn, then leaves a blinking caret on the last one. */
function Typewriter({
  lines,
  start = 1.4,
}: {
  lines: string[];
  start?: number;
}) {
  const full = lines.join("\n");
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(full.length);
      return;
    }
    let i = 0;
    let timer = 0;
    const step = () => {
      i += 1;
      setCount(i);
      // a beat at the end of each line, like someone typing
      if (i < full.length)
        timer = window.setTimeout(step, full[i - 1] === "\n" ? 320 : 55);
    };
    timer = window.setTimeout(step, start * 1000);
    return () => window.clearTimeout(timer);
  }, [full, start]);

  const shown = full.slice(0, count).split("\n");
  return (
    <p
      className="min-h-[3.4em] text-lg leading-snug tracking-tight text-white sm:text-2xl"
      aria-label={lines.join(" ")}
    >
      {lines.map((_, i) => (
        <span key={i} className="block" aria-hidden="true">
          {shown[i] ?? ""}
          {i === shown.length - 1 && (
            <motion.span
              className="ml-0.5 inline-block h-[1em] w-[0.55ch] translate-y-[0.15em] bg-[#cdb6ff]"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
        </span>
      ))}
    </p>
  );
}

/** One wordmark letter: rises out of a blur on load, drifts outward on scroll. */
function Letter({
  ch,
  index,
  spread,
}: {
  ch: string;
  index: number;
  spread: MotionValue<number>;
}) {
  const side = index - (WORDMARK.length - 1) / 2;
  const x = useTransform(spread, (v) => side * v);
  return (
    <motion.span
      className="inline-block"
      style={{ x }}
      initial={{ opacity: 0, y: 60, filter: "blur(14px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.2, ease, delay: 0.1 + index * 0.08 }}
    >
      {ch}
    </motion.span>
  );
}

export default function HomeHero() {
  const ref = React.useRef<HTMLElement>(null);

  // cursor → a gentle 3D lean on the bloom and a counter-drift on the wordmark
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });

  // scroll → the bloom grows and turns toward you, the word parts, the copy lifts away
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const tiltX = useTransform(() => 14 - sy.get() * 12 + p.get() * 38);
  const tiltY = useTransform(sx, (x) => x * 16);
  const bloomScale = useTransform(p, [0, 1], [1, 1.45]);
  const bloomY = useTransform(p, [0, 1], [0, 140]);
  const wordSpread = useTransform(p, [0, 1], [0, 90]);
  const wordX = useTransform(sx, (x) => x * -14);
  const wordOpacity = useTransform(p, [0, 0.8], [1, 0.15]);
  const copyY = useTransform(p, [0, 1], [0, -90]);
  const copyOpacity = useTransform(p, [0, 0.6], [1, 0]);
  const ringRotate = useTransform(p, [0, 1], [0, 40]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        aria-label="Introduction"
        className="relative isolate mt-2 flex min-h-[calc(100svh-6.5rem)] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#07060b] text-white shadow-2xl"
      >
        <h1 className="sr-only">
          Aditi Kotnala, Cybersecurity and Computer Science
        </h1>

        {/* ambient light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 45%, rgba(124,58,237,.22), transparent 70%), radial-gradient(40% 35% at 85% 10%, rgba(236,72,153,.10), transparent 70%)",
          }}
        />

        {/* the wordmark, set behind the bloom */}
        <motion.div
          aria-hidden="true"
          className={`${serif.className} pointer-events-none absolute inset-x-0 top-24 flex select-none justify-center text-[25vw] leading-[0.8] tracking-[-0.02em] text-[#f1ece4] md:top-[13%] md:text-[19vw] xl:text-[17rem]`}
          style={{ x: wordX, opacity: wordOpacity }}
        >
          {WORDMARK.map((ch, i) => (
            <Letter key={i} ch={ch} index={i} spread={wordSpread} />
          ))}
        </motion.div>

        {/* orbit rings */}
        <div className="pointer-events-none absolute left-1/2 top-[min(78vw,340px)] md:top-[44%] h-[150vw] w-[150vw] max-h-[880px] max-w-[880px] -translate-x-1/2 -translate-y-1/2 md:h-[70vw] md:w-[70vw]">
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 800 800"
            className="h-full w-full"
            style={{ rotate: ringRotate }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
          >
            <motion.ellipse
              cx="400"
              cy="400"
              rx="360"
              ry="140"
              fill="none"
              stroke="rgba(255,255,255,.14)"
              strokeWidth="1"
              transform="rotate(-18 400 400)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, ease, delay: 0.9 }}
            />
            <motion.ellipse
              cx="400"
              cy="400"
              rx="300"
              ry="300"
              fill="none"
              stroke="rgba(205,182,255,.10)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, ease, delay: 1.1 }}
            />
            <motion.g
              style={{ originX: "400px", originY: "400px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 26, ease: "linear", repeat: Infinity }}
            >
              <circle cx="700" cy="400" r="3" fill="#cdb6ff" />
            </motion.g>
          </motion.svg>
        </div>

        {/* the bloom */}
        <div className="pointer-events-none absolute left-1/2 top-[min(78vw,340px)] md:top-[44%] z-10 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            style={{ scale: bloomScale, y: bloomY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease, delay: 0.2 }}
          >
            <GlassBloom
              size="min(78vw, 560px)"
              tiltX={tiltX}
              tiltY={tiltY}
              className="relative"
            />
          </motion.div>
        </div>

        {/* copy */}
        <motion.div
          className={`${mono.className} relative z-20 mt-auto grid gap-8 px-6 pb-8 pt-[min(118vw,560px)] sm:px-10 md:grid-cols-2 md:items-end md:pt-0`}
          style={{ y: copyY, opacity: copyOpacity }}
        >
          <div className="max-w-sm">
            <Typewriter lines={TYPED} />
            <motion.p
              className="mt-3 text-xs leading-relaxed text-white/55 sm:text-[13px]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 2.6 }}
            >
              CSE undergraduate at SRM University AP, working across
              cryptography, defensive security and AI that reads documents.
            </motion.p>
            <motion.a
              href="#projects"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#d9c8ff] px-5 py-2.5 font-sans text-sm font-medium text-[#120b1f] transition-colors hover:bg-white"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 2.8 }}
              whileHover={{ x: 3 }}
            >
              Explore projects <span aria-hidden="true">→</span>
            </motion.a>
          </div>

          <motion.div
            className="md:justify-self-end md:text-right"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 3 }}
          >
            <p className="text-lg leading-snug tracking-tight sm:text-2xl">
              More security.
              <br />
              Less complexity.
            </p>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-white/55 md:ml-auto sm:text-[13px]">
              Hash-security benchmarking, OCR pipelines and research in document
              intelligence.
            </p>
            <a
              href="/resume"
              className="mt-4 inline-flex items-center gap-2 font-sans text-sm text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              View resume <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </motion.div>

        {/* where I've been, in place of a logo wall */}
        <motion.div
          className="relative z-20 mx-6 border-t border-white/10 py-5 sm:mx-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.2 }}
        >
          <p
            className={`${mono.className} mb-4 text-center text-[10px] uppercase tracking-[0.25em] text-white/45`}
          >
            Where I&apos;ve learned &amp; built
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-white/60">
            {PLACES.map((place) => (
              <li key={place.name} className="group flex items-center gap-2.5">
                <Image
                  src={place.logo}
                  alt=""
                  width={22}
                  height={22}
                  className="h-[22px] w-[22px] rounded-md object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
                <span className="transition-colors group-hover:text-white">
                  {place.name}
                </span>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <SiGithub className="h-[18px] w-[18px]" /> @
                {siteConfig.username}
              </a>
            </li>
          </ul>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
