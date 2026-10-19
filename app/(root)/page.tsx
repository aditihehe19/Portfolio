import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { AnimatedSection } from "@/components/common/animated-section";
import { AnimatedText } from "@/components/common/animated-text";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "@/components/common/icons";
import LiveStatusBar from "@/components/common/live-status-bar";
import SocialPillBar from "@/components/common/social-pill-bar";
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
import profileImg from "@/public/profile-img.jpg";

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
      <section className="space-y-6 pb-12 pt-8 md:py-20 lg:py-24 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="container flex max-w-[64rem] flex-col items-center gap-5 text-center">
          {/* Avatar with subtle glow */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/50 to-primary/20 blur-md opacity-75 group-hover:opacity-100 transition duration-500" />
            <Image
              src={profileImg}
              height={180}
              width={180}
              className="relative bg-primary rounded-full h-36 w-36 sm:h-44 sm:w-44 border-4 border-primary object-cover shadow-2xl"
              alt="Aditi Kotnala - Cybersecurity & CS Portfolio"
              priority
            />
          </div>

          <AnimatedText
            as="h1"
            delay={0.2}
            className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground"
          >
            Aditi Kotnala
          </AnimatedText>

          <AnimatedText
            as="h3"
            delay={0.3}
            className="font-heading text-base sm:text-xl md:text-2xl text-primary font-semibold"
          >
            Cybersecurity & CS Undergraduate · Secure Software & Cryptography
          </AnimatedText>

          <div className="mt-2 max-w-[44rem] text-center">
            <p className="leading-relaxed text-muted-foreground text-sm sm:text-base">
              Computer Science and Engineering undergraduate focused on cybersecurity, cryptography, and defensive security engineering. Building cryptographic hash benchmarking platforms and AI-powered learning companions.
            </p>
          </div>

          {/* Social Pill Bar (Screenshot 1) */}
          <div className="mt-2">
            <SocialPillBar />
          </div>

          {/* Live Status Bar (Screenshot 2: Local Time IST + Portfolio Views) */}
          <div className="mt-4 w-full max-w-md">
            <LiveStatusBar />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col mt-6 items-center justify-center sm:flex-row sm:space-x-4 gap-3 w-full sm:w-auto">
            <AnimatedText delay={0.6}>
              <Link
                href="/resume"
                className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto shadow-md")}
                aria-label="View functional resume"
              >
                <Icons.post className="w-4 h-4 mr-2" /> View Resume
              </Link>
            </AnimatedText>

            <AnimatedText delay={0.7}>
              <Link
                href="#projects"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
              >
                <Icons.gitRepoIcon className="w-4 h-4 mr-2" /> Explore Projects
              </Link>
            </AnimatedText>

            <AnimatedText delay={0.8}>
              <Link
                href="#contact"
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                    size: "lg",
                  }),
                  "w-full sm:w-auto"
                )}
                aria-label="Contact Aditi Kotnala"
              >
                <Icons.contact className="w-4 h-4 mr-2" /> Get In Touch
              </Link>
            </AnimatedText>
          </div>

          <AnimatedText delay={1.0}>
            <Link href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
              <Icons.chevronDown className="h-6 w-6 mt-8 animate-bounce" />
            </Link>
          </AnimatedText>
        </div>
      </section>

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
