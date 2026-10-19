"use client";

import React, { useState } from "react";
import { Icons } from "@/components/common/icons";
import Rating from "@/components/skills/rating";
import { skillsInterface } from "@/config/skills";

interface SkillsCardProps {
  skills: skillsInterface[];
}

export default function SkillsCard({ skills }: SkillsCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Languages",
    "Cybersecurity & CS",
    "Web & Backend",
    "Databases & Tools",
    "DevOps & Systems",
  ];

  const filteredSkills = skills.filter(
    (skill) => selectedCategory === "All" || skill.category === selectedCategory
  );

  return (
    <div className="w-full space-y-6">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background/80 text-muted-foreground border-border hover:bg-muted hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {filteredSkills.map((skill, id) => {
          const IconComp = (Icons as any)[skill.iconName] || Icons.code;
          return (
            <div
              key={id}
              className="relative overflow-hidden rounded-xl border border-border/80 bg-background/90 backdrop-blur-sm p-2 hover:border-primary/50 transition-all duration-300 shadow-sm"
            >
              <div className="flex min-h-[210px] flex-col justify-between rounded-lg p-5">
                <div className="flex items-start justify-between">
                  <div className="text-primary p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                    <IconComp className="h-7 w-7" size={28} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/60">
                    {skill.category}
                  </span>
                </div>

                <div className="space-y-1.5 mt-3">
                  <h3 className="font-bold text-base text-foreground">{skill.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {skill.description}
                  </p>
                  <div className="pt-2">
                    <Rating stars={skill.rating} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
