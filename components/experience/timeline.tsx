"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { AnimatedSection } from "@/components/common/animated-section";
import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { ExperienceInterface } from "@/config/experience";

// Helper function to extract year from date
const getYearFromDate = (date: Date): string => {
  return new Date(date).getFullYear().toString();
};

// Helper function to get duration text
const getDurationText = (
  startDate: Date,
  endDate: Date | "Present",
  customDuration?: string
): string => {
  if (customDuration) return customDuration;
  const startMonthYear = new Date(startDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  const endMonthYear =
    typeof endDate === "string"
      ? "Present"
      : new Date(endDate).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
  return `${startMonthYear} – ${endMonthYear}`;
};

interface TimelineProps {
  experiences: ExperienceInterface[];
}

const Timeline: React.FC<TimelineProps> = ({ experiences }) => {
  // Sort experiences by date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = a.endDate === "Present" ? new Date() : a.endDate;
    const dateB = b.endDate === "Present" ? new Date() : b.endDate;
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="space-y-4">
      {sortedExperiences.map((experience, index) => (
        <AnimatedSection
          key={experience.id}
          delay={0.1 * (index + 1)}
          direction="up"
        >
          <div className="w-full p-4 sm:p-6 bg-background border border-border rounded-lg transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {experience.logo && (
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg border-2 border-border overflow-hidden bg-white flex-shrink-0">
                    <Image
                      src={experience.logo}
                      alt={experience.company}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">
                      {experience.position}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-primary/10 text-primary border border-primary/20 w-fit">
                      {getDurationText(
                        experience.startDate,
                        experience.endDate,
                        experience.customDuration
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    {experience.companyUrl ? (
                      <a
                        href={experience.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline inline-flex items-center gap-1"
                      >
                        {experience.company}
                        <Icons.externalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-muted-foreground">
                        {experience.company}
                      </span>
                    )}
                  </div>
                  {experience.mentor && (
                    <div className="text-xs sm:text-sm text-muted-foreground mb-1">
                      <span className="font-medium text-foreground">Under:</span>{" "}
                      {experience.mentor.url ? (
                        <a
                          href={experience.mentor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
                        >
                          {experience.mentor.name}
                          <Icons.externalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="font-medium text-foreground">{experience.mentor.name}</span>
                      )}
                    </div>
                  )}
                  {experience.topic && (
                    <p className="text-xs sm:text-sm text-foreground/90 font-medium mb-1">
                      <span className="text-primary font-semibold">Topic:</span> {experience.topic}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mb-2">
                    {experience.location}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {experience.description[0]}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg w-full sm:w-auto"
                asChild
              >
                <Link href={`/experience/${experience.id}`}>
                  View Details
                  <Icons.chevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
};

export default Timeline;
