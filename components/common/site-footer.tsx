"use client";

import { useTheme } from "next-themes";
import * as React from "react";

import HalftoneWordmarkFooter, {
  type FooterColumn,
  type HalftonePreset,
} from "@/components/ui/halftone-wordmark-footer";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const columns: FooterColumn[] = [
  {
    title: "Explore",
    links: [
      { label: "Projects", href: "/#projects" },
      { label: "Experience", href: "/#experience" },
      { label: "Skills", href: "/#skills" },
      { label: "Resume", href: "/resume" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: siteConfig.links.github },
      { label: "LinkedIn", href: siteConfig.links.linkedin },
      { label: "LeetCode", href: siteConfig.links.leetcode },
    ],
  },
  {
    title: "Contact",
    links: [{ label: "aditi.k2442@gmail.com", href: siteConfig.links.email }],
  },
];

// Light-background site themes get the cream "paper" print; the rest stay dark.
const presetFor: Record<string, HalftonePreset> = {
  light: "paper",
  paper: "paper",
  retro: "paper",
  synthwave: "ember",
  cyberpunk: "cobalt",
};

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const preset = (mounted && resolvedTheme && presetFor[resolvedTheme]) || "night";

  return (
    <HalftoneWordmarkFooter
      className={cn("mt-16", className)}
      wordmark="aditi"
      label="Aditi Kotnala"
      meta="©2026 · Cybersecurity & CS"
      columns={columns}
      preset={preset}
      crop={0.3}
      // "aditi" is short, so it is set very large; grow the footer with the
      // width so the letters always clear the link rows above them.
      height="max(calc(24vw + 230px), 410px)"
    />
  );
}
