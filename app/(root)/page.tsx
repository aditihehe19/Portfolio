import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { AnimatedSection } from "@/components/common/animated-section";
import { AnimatedText } from "@/components/common/animated-text";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "@/components/common/icons";
import HomeHero from "@/components/common/home-hero";
import ExperienceCard from "@/components/experience/experience-card";
import { DetailFolders, ProjectFolders } from "@/components/projects/folder-shelf";
import SkillBubbles from "@/components/skills/skill-bubbles";
import EducationSection from "@/components/education/education-section";
import AchievementsSection from "@/components/achievements/achievements-section";
import ProfilesTracker from "@/components/profiles/profiles-tracker";
import InteractiveTimeline from "@/components/timeline/interactive-timeline";
import { ContactForm } from "@/components/forms/contact-form";
import { buttonVariants } from "@/components/ui/button";

import { experiences } from "@/config/experience";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `${pagesConfig.home.metadata.title}`,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function IndexPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.authorName,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    jobTitle: "Cybersecurity & CS Undergraduate",
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  };

  return (
    <ClientPageWrapper>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* HERO SECTION */}
      <HomeHero />

      {/* SECTION: PROJECTS */}
      <AnimatedSection
        direction="up"
        className="container space-y-6 bg-muted/40 py-16 my-10 rounded-3xl border border-border/40"
        id="projects"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            Showcase
          </span>
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl font-bold"
          >
            {pagesConfig.projects.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            {pagesConfig.projects.description}
          </AnimatedText>
        </div>

        <div className="w-full pt-6">
          <ProjectFolders />
        </div>

        <div className="flex justify-center pt-4">
          <Link href="/projects" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            View all projects
            <Icons.chevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </AnimatedSection>

      {/* SECTION: DETAILS (FOLDERS) */}
      <AnimatedSection direction="up" className="container space-y-6 py-16 my-10" id="details">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            At a Glance
          </span>
          <AnimatedText as="h2" className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl font-bold">
            My Details
          </AnimatedText>
          <AnimatedText as="p" delay={0.2} className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Click a folder to open it, then pick a file to jump to the full details.
          </AnimatedText>
        </div>
        <div className="w-full pt-6">
          <DetailFolders />
        </div>
      </AnimatedSection>

      {/* SECTION: EXPERIENCE */}
      <AnimatedSection
        direction="up"
        className="container space-y-6 py-16 my-10"
        id="experience"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            Career & Leadership
          </span>
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl font-bold"
          >
            {pagesConfig.experience.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            {pagesConfig.experience.description}
          </AnimatedText>
        </div>

        <div className="mx-auto grid justify-center gap-6 md:w-full lg:grid-cols-2">
          {experiences.map((experience, index) => (
            <AnimatedSection
              key={experience.id}
              delay={0.1 * (index + 1)}
              direction="up"
            >
              <ExperienceCard experience={experience} />
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      {/* SECTION: EDUCATION */}
      <AnimatedSection
        direction="up"
        className="container space-y-6 bg-muted/40 py-16 my-10 rounded-3xl border border-border/40"
        id="education"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            Academics
          </span>
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl font-bold"
          >
            {pagesConfig.education.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            {pagesConfig.education.description}
          </AnimatedText>
        </div>

        <div className="w-full">
          <EducationSection />
        </div>
      </AnimatedSection>

      {/* SECTION: SKILLS */}
      <AnimatedSection
        direction="up"
        className="container space-y-6 py-16 my-10"
        id="skills"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            Expertise
          </span>
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl font-bold"
          >
            {pagesConfig.skills.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            {pagesConfig.skills.description}
          </AnimatedText>
        </div>

        <SkillBubbles />
      </AnimatedSection>

      {/* SECTION: ACHIEVEMENTS */}
      <AnimatedSection
        direction="up"
        className="container space-y-6 bg-muted/40 py-16 my-10 rounded-3xl border border-border/40"
        id="achievements"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            Honors & Milestones
          </span>
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl font-bold"
          >
            {pagesConfig.achievements.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            {pagesConfig.achievements.description}
          </AnimatedText>
        </div>

        <div className="w-full">
          <AchievementsSection />
        </div>
      </AnimatedSection>

      {/* SECTION: PROFILES (LIVE GITHUB & LEETCODE TRACKING - SCREENSHOT 3) */}
      <AnimatedSection
        direction="up"
        className="container space-y-6 py-16 my-10"
        id="profiles"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-500 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            Live Synchronization
          </span>
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl font-bold"
          >
            {pagesConfig.profiles.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            {pagesConfig.profiles.description}
          </AnimatedText>
        </div>

        <div className="w-full">
          <ProfilesTracker />
        </div>
      </AnimatedSection>

      {/* SECTION: INTERACTIVE TIMELINE */}
      <AnimatedSection
        direction="up"
        className="container space-y-6 bg-muted/40 py-16 my-10 rounded-3xl border border-border/40"
        id="timeline"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            Interactive Journey
          </span>
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl font-bold"
          >
            {pagesConfig.timeline.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            Explore key milestones or click &quot;Add Timeline Event&quot; to customize and record new achievements according to your timeline.
          </AnimatedText>
        </div>

        <div className="w-full">
          <InteractiveTimeline />
        </div>
      </AnimatedSection>

      {/* SECTION: CONTACT */}
      <AnimatedSection
        direction="up"
        className="container space-y-6 py-16 my-10"
        id="contact"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            Reach Out
          </span>
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl font-bold"
          >
            {pagesConfig.contact.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            Feel free to send a message or connect directly for cybersecurity internships, software development, or research discussions.
          </AnimatedText>
        </div>

        <div className="max-w-2xl mx-auto w-full">
          <div className="spotlight-edge p-6 sm:p-8 rounded-2xl border border-border/80 bg-background/95 backdrop-blur-md shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-muted/40 border border-border/60 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <Icons.mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground uppercase">Email Address</div>
                  <a
                    href="mailto:aditi.k2442@gmail.com"
                    className="text-sm font-bold text-foreground hover:text-primary transition-colors"
                  >
                    aditi.k2442@gmail.com
                  </a>
                </div>
              </div>

              <a
                href="mailto:aditi.k2442@gmail.com"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <span>Compose Mail</span>
                <Icons.externalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <ContactForm />
          </div>
        </div>
      </AnimatedSection>
    </ClientPageWrapper>
  );
}
