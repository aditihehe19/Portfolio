"use client";

import React from "react";
import { Icons } from "@/components/common/icons";
import { achievementsList } from "@/config/achievements";

export default function AchievementsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {achievementsList.map((item) => (
        <div
          key={item.id}
          className="spotlight-edge relative p-6 sm:p-7 rounded-2xl border border-border/80 bg-background/90 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                <Icons.trophy className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium bg-muted text-muted-foreground border border-border/60">
                {item.date}
              </span>
            </div>

            <div className="mb-2">
              <span className="text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                {item.category}
              </span>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-1">
              {item.title}
            </h3>

            <div className="text-sm font-medium text-muted-foreground mb-3">
              {item.issuer}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {item.description}
            </p>
          </div>

          <div className="pt-4 border-t border-border/60 space-y-2">
            {item.highlights.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                <Icons.check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
