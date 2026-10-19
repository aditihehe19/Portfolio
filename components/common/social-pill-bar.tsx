"use client";

import Link from "next/link";
import React from "react";
import { Icons } from "@/components/common/icons";
import { SocialLinks } from "@/config/socials";

export default function SocialPillBar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full border border-border/80 bg-background/80 backdrop-blur-md shadow-sm ${className}`}
    >
      {SocialLinks.map((item) => {
        const IconComponent = item.icon;
        return (
          <Link
            key={item.name}
            href={item.link}
            target={item.link.startsWith("mailto") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-200"
          >
            <IconComponent className="w-4 h-4 text-primary" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
