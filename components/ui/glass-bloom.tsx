"use client";

import { motion, type MotionValue } from "framer-motion";
import * as React from "react";

/**
 * Glass Bloom — a translucent flower built in real 3D with CSS transforms.
 *
 * Every petal is its own element hinged at the centre and lifted on its X axis,
 * so the bloom has an actual cup shape: tilt it and the petals pass in front of
 * and behind each other. It turns slowly on its own; `tiltX` / `tiltY` (motion
 * values, degrees) lean it, e.g. toward the cursor. No images, no WebGL.
 */

type Ring = {
  count: number;
  lift: number;
  scale: number;
  offset: number;
  tone: "back" | "front";
};

const RINGS: Ring[] = [
  { count: 6, lift: 24, scale: 1, offset: 30, tone: "back" },
  { count: 6, lift: 46, scale: 0.86, offset: 0, tone: "front" },
  { count: 5, lift: 66, scale: 0.5, offset: 12, tone: "front" },
];

const PETAL = "M50 200 C 4 170, -6 70, 30 22 C 40 8, 60 8, 70 22 C 106 70, 96 170, 50 200 Z";

function Petal({ id, tone }: { id: string; tone: Ring["tone"] }) {
  const deep = tone === "back" ? "#1d0a35" : "#2c0f4f";
  return (
    <svg
      viewBox="0 0 100 200"
      className="h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={deep} stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#7b3fc4" stopOpacity="0.72" />
          <stop offset="0.8" stopColor="#c48af0" stopOpacity="0.6" />
          <stop offset="1" stopColor="#f6dcff" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id={`${id}-sheen`} cx="0.42" cy="0.3" r="0.45">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={PETAL} fill={`url(#${id}-fill)`} />
      <path d={PETAL} fill={`url(#${id}-sheen)`} />
      {/* the vein and the lit rim are what read as glass */}
      <path
        d="M50 196 C 47 140, 51 70, 50 14"
        stroke="#fff"
        strokeOpacity="0.28"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d={PETAL}
        fill="none"
        stroke={`url(#${id}-rim)`}
        strokeWidth="1.6"
      />
    </svg>
  );
}

export default function GlassBloom({
  size = 520,
  tiltX,
  tiltY,
  className,
}: {
  size?: number | string;
  tiltX?: MotionValue<number>;
  tiltY?: MotionValue<number>;
  className?: string;
}) {
  const uid = React.useId().replace(/:/g, "");

  return (
    <div
      className={className}
      style={{ width: size, height: size, perspective: 1100 }}
    >
      {/* bloom glow, behind everything */}
      <div
        aria-hidden="true"
        className="absolute inset-[18%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(167,104,240,.55), rgba(88,28,135,.25) 55%, transparent 72%)",
        }}
      />
      {/* lean: base tilt plus whatever the parent feeds in */}
      <motion.div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          rotateX: tiltX,
          rotateY: tiltY,
        }}
      >
        {/* slow turn */}
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 70, ease: "linear", repeat: Infinity }}
        >
          {RINGS.map((ring, r) =>
            Array.from({ length: ring.count }).map((_, i) => {
              const angle = ring.offset + (360 / ring.count) * i;
              return (
                <motion.div
                  key={`${r}-${i}`}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: `${30 * ring.scale}%`,
                    height: `${46 * ring.scale}%`,
                    marginLeft: `${-15 * ring.scale}%`,
                    marginTop: `${-46 * ring.scale}%`,
                    transformOrigin: "50% 100%",
                    transformStyle: "preserve-3d",
                  }}
                  initial={{ rotateZ: angle, rotateX: 88, opacity: 0 }}
                  animate={{
                    rotateZ: angle,
                    rotateX: [88, ring.lift - 6, ring.lift],
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1.8,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.35 + r * 0.18 + i * 0.05,
                  }}
                >
                  {/* each petal breathes a little, out of step with its neighbours */}
                  <motion.div
                    className="h-full w-full"
                    style={{ transformOrigin: "50% 100%" }}
                    animate={{ rotateX: [0, -5, 0] }}
                    transition={{
                      duration: 5 + (i % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4,
                    }}
                  >
                    <Petal id={`${uid}-${r}-${i}`} tone={ring.tone} />
                  </motion.div>
                </motion.div>
              );
            })
          )}

          {/* the core: a glass bead with a cold spark in it */}
          <motion.div
            className="absolute left-[43.5%] top-[43.5%] grid h-[13%] w-[13%] place-items-center rounded-full"
            style={{
              z: 40,
              background:
                "radial-gradient(circle at 35% 30%, #ffffff, #d9c2ff 30%, #7e46c9 65%, #2b0f4d)",
              boxShadow:
                "0 0 40px rgba(190,140,255,.7), inset 0 0 12px rgba(255,255,255,.6)",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" aria-hidden="true">
              <path
                d="M12 1 L13.6 10.4 L23 12 L13.6 13.6 L12 23 L10.4 13.6 L1 12 L10.4 10.4 Z"
                fill="#8ff3ff"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
