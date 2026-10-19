"use client";

import { FaLinkedin } from "react-icons/fa";
import { SiGithub, SiGmail, SiLeetcode } from "react-icons/si";

import { useRef } from "react";

import { MinimalistHero } from "@/components/ui/minimalist-hero";
import {
  useParallaxLayers,
  type ParallaxLayer,
} from "@/components/ui/parallax-scrolling";
import { siteConfig } from "@/config/site";

const socialLinks = [
  { icon: SiGithub, href: siteConfig.links.github, label: "GitHub" },
  { icon: FaLinkedin, href: siteConfig.links.linkedin, label: "LinkedIn" },
  { icon: SiLeetcode, href: siteConfig.links.leetcode, label: "LeetCode" },
  { icon: SiGmail, href: siteConfig.links.email, label: "Email" },
];

// Depth for the hero as it scrolls away: the circle lags most, then the
// portrait, then the headline; the intro text barely moves.
const heroLayers: ParallaxLayer[] = [
  { layer: "1", yPercent: 38 },
  { layer: "2", yPercent: 22 },
  { layer: "3", yPercent: 30 },
  { layer: "4", yPercent: 12 },
];

export default function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  useParallaxLayers(ref, heroLayers);

  return (
    <div ref={ref}>
      <MinimalistHero
        showHeader={false}
        logoText="aditi."
        navLinks={[]}
        mainText="Aditi Kotnala, a CSE undergraduate at SRM University AP focused on cybersecurity, cryptography and defensive security engineering. I build hash-security benchmarking tools and AI-powered learning companions."
        readMoreLink="/resume"
        readMoreLabel="View Resume"
        imageSrc="/profile-cutout.webp"
        imageAlt="Portrait of Aditi Kotnala"
        imageMode="cutout"
        overlayText={{ part1: "stay", part2: "secure." }}
        socialLinks={socialLinks}
        locationText="Amaravati, India"
        className="h-auto min-h-[calc(100svh-5rem)] bg-transparent px-0 pb-10 pt-6 md:px-0 md:pb-12 md:pt-6"
      />
    </div>
  );
}
