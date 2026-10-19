"use client";

import { SiGithub, SiGmail, SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

import { MinimalistHero } from "@/components/ui/minimalist-hero";
import { siteConfig } from "@/config/site";

const socialLinks = [
  { icon: SiGithub, href: siteConfig.links.github, label: "GitHub" },
  { icon: FaLinkedin, href: siteConfig.links.linkedin, label: "LinkedIn" },
  { icon: SiLeetcode, href: siteConfig.links.leetcode, label: "LeetCode" },
  { icon: SiGmail, href: siteConfig.links.email, label: "Email" },
];

export default function HomeHero() {
  return (
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
  );
}
