"use client";

import React from "react";
import { Icons } from "@/components/common/icons";
import { educationList } from "@/config/education";

export default function EducationSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {educationList.map((edu) => (
        <div
          key={edu.id}
          className="spotlight-edge relative p-6 sm:p-7 rounded-2xl border border-border/80 bg-background/90 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <Icons.graduationCap className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20">
                {edu.duration}
              </span>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-1">
              {edu.degree}
            </h3>

            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground font-medium mb-3">
              <span className="text-foreground">{edu.institution}</span>
              <span>•</span>
              <span>{edu.location}</span>
            </div>

            {edu.grade && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-bold mb-4">
                <Icons.checkCircle className="w-3.5 h-3.5" />
                <span>{edu.grade}</span>
              </div>
            )}

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {edu.description}
            </p>
          </div>

          {edu.coursework && (
            <div className="pt-4 border-t border-border/60">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-2">
                Coursework & Domains:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {edu.coursework.map((course, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-muted/60 text-muted-foreground border border-border/40"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
