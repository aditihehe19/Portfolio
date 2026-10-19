"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type IconComponent = React.ComponentType<{ className?: string }>;

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  /** Label for the link under the main text. Defaults to "Read More". */
  readMoreLabel?: string;
  imageSrc: string;
  imageAlt: string;
  /**
   * `cutout` floats a transparent portrait over the circle (the original look);
   * `circle` fits a regular photo inside the circle, ringed by the accent.
   */
  imageMode?: "cutout" | "circle";
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: IconComponent; href: string; label: string }[];
  locationText: string;
  /** Hide the built-in header when the page already has its own navigation. */
  showHeader?: boolean;
  className?: string;
}

// Helper component for navigation links
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
  >
    {children}
  </a>
);

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon, label }: { href: string; icon: IconComponent; label: string }) => (
  <a
    href={href}
    target={href.startsWith("mailto") ? undefined : "_blank"}
    rel="noopener noreferrer"
    aria-label={label}
    className="text-foreground/60 transition-colors hover:text-foreground"
  >
    <Icon className="h-5 w-5" />
  </a>
);

// The main reusable Hero Section component
export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  readMoreLabel = "Read More",
  imageSrc,
  imageAlt,
  imageMode = "cutout",
  overlayText,
  socialLinks,
  locationText,
  showHeader = true,
  className,
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        "relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-8 font-sans md:p-12",
        className
      )}
    >
      {/* Header */}
      {showHeader && (
        <header className="z-30 flex w-full max-w-7xl items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold tracking-wider"
          >
            {logoText}
          </motion.div>
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-1.5 md:hidden"
            aria-label="Open menu"
          >
            <span className="block h-0.5 w-6 bg-foreground"></span>
            <span className="block h-0.5 w-6 bg-foreground"></span>
            <span className="block h-0.5 w-5 bg-foreground"></span>
          </motion.button>
        </header>
      )}

      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center gap-10 md:grid-cols-3 md:gap-0">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-2 md:order-1 text-center md:text-left"
        >
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/80 md:mx-0">{mainText}</p>
          <a href={readMoreLink} className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-from-font">
            {readMoreLabel}
          </a>
        </motion.div>

        {/* Center Image with Circle */}
        <div
          className={cn(
            "relative order-1 md:order-2 flex justify-center items-center h-full",
            // the circle and cut-out are absolutely placed, so reserve their room when stacked
            imageMode === "cutout" && "min-h-[380px] pt-12 md:min-h-[460px] md:pt-0 lg:min-h-[560px]"
          )}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute z-0 h-[280px] w-[280px] rounded-full bg-amber-400/90 md:h-[340px] md:w-[340px] lg:h-[440px] lg:w-[440px]"
          ></motion.div>
          {imageMode === "circle" ? (
            <motion.img
              src={imageSrc}
              alt={imageAlt}
              className="relative z-10 h-[256px] w-[256px] rounded-full object-cover object-[50%_30%] shadow-2xl md:h-[312px] md:w-[312px] lg:h-[404px] lg:w-[404px]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            />
          ) : (
            // The portrait is anchored just below the circle and is taller than
            // it, so the head and shoulders rise out over its top edge. The flat
            // bottom of the cut-out fades away instead of ending in a hard line.
            <div className="absolute z-10 h-[280px] w-[280px] md:h-[340px] md:w-[340px] lg:h-[440px] lg:w-[440px]">
              <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="absolute bottom-[-8%] left-1/2 h-auto w-[108%] max-w-none [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
                initial={{ opacity: 0, x: "-50%", y: 90, scale: 0.92 }}
                animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
              />
            </div>
          )}
        </div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-start md:pl-10 md:text-left"
        >
          <h1 className="text-6xl font-extrabold leading-[0.95] text-foreground md:text-7xl lg:text-8xl">
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>
      </div>

      {/* Footer Elements */}
      <footer className="z-30 mt-10 flex w-full max-w-7xl items-center justify-between md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link) => (
            <SocialIcon key={link.label} href={link.href} icon={link.icon} label={link.label} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-sm font-medium text-foreground/80"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
