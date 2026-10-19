"use client";

import * as React from "react";
import type { IconType } from "react-icons";
import {
  SiBootstrap,
  SiC,
  SiCplusplus,
  SiCss3,
  SiDjango,
  SiDocker,
  SiFastapi,
  SiFigma,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiLatex,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiOpencv,
  SiOpenjdk,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiPytorch,
  SiReact,
  SiRedis,
  SiRedux,
  SiTailwindcss,
} from "react-icons/si";
import { Binary, Database, KeyRound, ShieldCheck } from "lucide-react";

type Tier = 1 | 2 | 3;

interface Bubble {
  name: string;
  Icon: IconType | typeof KeyRound;
  /** Official brand colour. Omit for concepts that have no brand (they use the theme accent). */
  color?: string;
  /** Near-black brands switch to the theme foreground so they stay visible in dark mode. */
  adaptive?: boolean;
  tier: Tier;
}

const BUBBLES: Bubble[] = [
  { name: "Python", Icon: SiPython, color: "#3776AB", tier: 1 },
  { name: "C++", Icon: SiCplusplus, color: "#00599C", tier: 1 },
  { name: "C", Icon: SiC, color: "#A8B9CC", tier: 1 },
  { name: "Cryptography", Icon: KeyRound, tier: 1 },
  { name: "Cybersecurity", Icon: ShieldCheck, tier: 1 },
  { name: "DSA", Icon: Binary, tier: 1 },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", tier: 2 },
  { name: "Java", Icon: SiOpenjdk, color: "#ED8B00", tier: 2 },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E", tier: 2 },
  { name: "FastAPI", Icon: SiFastapi, color: "#009688", tier: 2 },
  { name: "React", Icon: SiReact, color: "#61DAFB", tier: 2 },
  { name: "Django", Icon: SiDjango, color: "#092E20", adaptive: true, tier: 3 },
  { name: "Redux", Icon: SiRedux, color: "#764ABC", tier: 3 },
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26", tier: 2 },
  { name: "CSS3", Icon: SiCss3, color: "#1572B6", tier: 2 },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4", tier: 2 },
  { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3", tier: 3 },
  { name: "DBMS", Icon: Database, tier: 2 },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1", tier: 2 },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1", tier: 2 },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248", tier: 2 },
  { name: "Redis", Icon: SiRedis, color: "#FF4438", tier: 3 },
  { name: "Git", Icon: SiGit, color: "#F05032", tier: 2 },
  { name: "GitHub", Icon: SiGithub, color: "#181717", adaptive: true, tier: 2 },
  { name: "Postman", Icon: SiPostman, color: "#FF6C37", tier: 3 },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E", tier: 3 },
  { name: "Docker", Icon: SiDocker, color: "#2496ED", tier: 1 },
  { name: "CI/CD", Icon: SiGithubactions, color: "#2088FF", tier: 3 },
  { name: "PyTorch", Icon: SiPytorch, color: "#EE4C2C", tier: 2 },
  { name: "OpenCV", Icon: SiOpencv, color: "#5C3EE8", tier: 3 },
  { name: "LaTeX", Icon: SiLatex, color: "#008080", tier: 3 },
];

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** seconds after entering view before this bubble is released */
  delay: number;
  phase: number;
  live: boolean;
}

const SIZE: Record<Tier, [number, number]> = {
  1: [104, 88],
  2: [92, 78],
  3: [82, 70],
};

const GRAVITY = 1500;
const DROP_SECONDS = 2.6;
const CURSOR_RADIUS = 150;

export default function SkillBubbles() {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const nodes = React.useRef<(HTMLDivElement | null)[]>([]);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  React.useEffect(() => {
    if (reduced) return;
    const stage = stageRef.current;
    if (!stage) return;

    let width = stage.clientWidth;
    let height = stage.clientHeight;
    const small = () => width < 640;
    const bodies: Body[] = BUBBLES.map((b, i) => {
      const r = SIZE[b.tier][small() ? 1 : 0] / 2;
      return {
        x: r + Math.random() * Math.max(1, width - 2 * r),
        y: -r - 80 - Math.random() * 500,
        vx: (Math.random() - 0.5) * 120,
        vy: 0,
        r,
        delay: i * 0.07,
        phase: Math.random() * Math.PI * 2,
        live: false,
      };
    });

    const applySize = () => {
      bodies.forEach((b, i) => {
        const el = nodes.current[i];
        if (!el) return;
        el.style.width = el.style.height = `${b.r * 2}px`;
      });
    };
    applySize();

    const pointer = { x: -9999, y: -9999, active: false };
    let visible = false;
    let started = 0;
    let last = 0;
    let raf = 0;

    const toLocal = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onMove = (e: PointerEvent) => toLocal(e);
    const onLeave = () => {
      pointer.active = false;
      pointer.x = pointer.y = -9999;
    };
    // a tap or click pops the bubbles around it
    const onDown = (e: PointerEvent) => {
      toLocal(e);
      for (const b of bodies) {
        const dx = b.x - pointer.x;
        const dy = b.y - pointer.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < CURSOR_RADIUS * 1.6) {
          const f = (1 - d / (CURSOR_RADIUS * 1.6)) * 900;
          b.vx += (dx / d) * f;
          b.vy += (dy / d) * f - 200;
        }
      }
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    stage.addEventListener("pointerdown", onDown);

    const ro = new ResizeObserver(() => {
      width = stage.clientWidth;
      height = stage.clientHeight;
      bodies.forEach((b, i) => {
        b.r = SIZE[BUBBLES[i].tier][small() ? 1 : 0] / 2;
        b.x = Math.min(Math.max(b.x, b.r), width - b.r);
      });
      applySize();
    });
    ro.observe(stage);

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) {
        last = now;
        return;
      }
      const dt = Math.min(0.033, (now - last) / 1000 || 0.016);
      last = now;
      const t = (now - started) / 1000;

      // gravity fades out after the drop so the bubbles end up floating
      const g =
        t < DROP_SECONDS ? GRAVITY : Math.max(0, GRAVITY * (1 - (t - DROP_SECONDS) / 1.2));
      const drag = t < DROP_SECONDS ? 0.05 : 0.45;
      const restitution = t < DROP_SECONDS ? 0.62 : 0.9;

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        if (!b.live) {
          if (t >= b.delay) b.live = true;
          else continue;
        }

        b.vy += g * dt;

        if (t > DROP_SECONDS) {
          // slow wandering current, different for every bubble
          b.vx += Math.sin(t * 0.7 + b.phase) * 120 * dt;
          b.vy += (Math.cos(t * 0.55 + b.phase * 1.7) * 120 - 35) * dt;
        }

        if (pointer.active) {
          const dx = b.x - pointer.x;
          const dy = b.y - pointer.y;
          const d = Math.hypot(dx, dy) || 1;
          const reach = CURSOR_RADIUS + b.r;
          if (d < reach) {
            const f = (1 - d / reach) ** 2 * 2600 * dt;
            b.vx += (dx / d) * f;
            b.vy += (dy / d) * f;
          }
        }

        const damp = Math.exp(-drag * dt);
        b.vx *= damp;
        b.vy *= damp;
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        // walls: sides and floor bounce, the top is open while dropping in
        if (b.x < b.r) {
          b.x = b.r;
          b.vx = Math.abs(b.vx) * restitution;
        } else if (b.x > width - b.r) {
          b.x = width - b.r;
          b.vx = -Math.abs(b.vx) * restitution;
        }
        if (b.y > height - b.r) {
          b.y = height - b.r;
          b.vy = -Math.abs(b.vy) * restitution;
          if (Math.abs(b.vy) < 25) b.vy = 0;
        } else if (b.y < b.r && t > DROP_SECONDS) {
          b.y = b.r;
          b.vy = Math.abs(b.vy) * restitution;
        }
      }

      // bubble-to-bubble collisions
      for (let i = 0; i < bodies.length; i++) {
        const a = bodies[i];
        if (!a.live) continue;
        for (let j = i + 1; j < bodies.length; j++) {
          const c = bodies[j];
          if (!c.live) continue;
          const dx = c.x - a.x;
          const dy = c.y - a.y;
          const min = a.r + c.r;
          const d2 = dx * dx + dy * dy;
          if (d2 >= min * min || d2 === 0) continue;
          const d = Math.sqrt(d2);
          const nx = dx / d;
          const ny = dy / d;
          const push = (min - d) / 2;
          a.x -= nx * push;
          a.y -= ny * push;
          c.x += nx * push;
          c.y += ny * push;
          const rv = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
          if (rv < 0) {
            const imp = (-(1 + 0.85) * rv) / 2;
            a.vx -= imp * nx;
            a.vy -= imp * ny;
            c.vx += imp * nx;
            c.vy += imp * ny;
          }
        }
      }

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        const el = nodes.current[i];
        if (!el) continue;
        el.style.opacity = b.live ? "1" : "0";
        el.style.transform = `translate3d(${(b.x - b.r).toFixed(1)}px, ${(b.y - b.r).toFixed(1)}px, 0)`;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !started) started = performance.now();
      },
      { threshold: 0.25 }
    );
    io.observe(stage);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("pointerdown", onDown);
    };
  }, [reduced]);

  const renderBubble = (b: Bubble, i: number) => {
    const size = SIZE[b.tier][0];
    const { Icon } = b;
    const tint = b.color ?? "hsl(var(--primary))";
    return (
      <div
        key={b.name}
        ref={(el) => {
          nodes.current[i] = el;
        }}
        className={reduced ? "" : "absolute left-0 top-0 will-change-transform"}
        style={reduced ? undefined : { opacity: 0 }}
      >
        <div
          className="skill-bubble group flex h-full w-full cursor-default select-none flex-col items-center justify-center gap-1 rounded-full border border-border/70 bg-background/60 text-center backdrop-blur-sm transition-transform duration-300 hover:scale-110"
          style={
            {
              "--tint": tint,
              width: reduced ? size : undefined,
              height: reduced ? size : undefined,
              boxShadow: `inset 0 0 22px -6px color-mix(in srgb, ${tint} 45%, transparent), 0 8px 24px -12px color-mix(in srgb, ${tint} 60%, transparent)`,
              background: `radial-gradient(circle at 30% 25%, color-mix(in srgb, ${tint} 22%, transparent), transparent 62%), hsl(var(--background) / 0.55)`,
            } as React.CSSProperties
          }
        >
          <Icon
            aria-hidden="true"
            className={b.adaptive ? "text-foreground" : undefined}
            style={b.adaptive ? undefined : { color: tint }}
            size={size * 0.34}
          />
          <span className="max-w-[90%] truncate text-[10.5px] font-semibold leading-none text-foreground sm:text-[11px]">
            {b.name}
          </span>
        </div>
      </div>
    );
  };

  if (reduced) {
    return (
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-4">
        {BUBBLES.map(renderBubble)}
      </div>
    );
  }

  return (
    <div
      ref={stageRef}
      aria-label="Technical skills"
      className="relative mx-auto h-[640px] w-full max-w-5xl touch-pan-y overflow-hidden rounded-3xl sm:h-[540px]"
    >
      {BUBBLES.map(renderBubble)}
    </div>
  );
}
