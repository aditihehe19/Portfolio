export interface TimelineItem {
  id: string;
  title: string;
  organization?: string;
  date: string;
  timestamp: number; // for chronological sorting
  category: "Education" | "Experience" | "Project" | "Leadership" | "Milestone";
  description: string;
  tags?: string[];
  link?: string;
}

export const initialTimelineItems: TimelineItem[] = [
  {
    id: "tl-present",
    title: "B.Tech in Computer Science & Engineering",
    organization: "SRM University AP",
    date: "Aug 2024 – Present",
    timestamp: 20240801,
    category: "Education",
    description:
      "Pursuing undergraduate degree with specialization in cybersecurity, cryptography, and systems software. Maintaining a 8.90 CGPA.",
    tags: ["Cybersecurity", "B.Tech", "SRM University AP", "DSA"],
  },
  {
    id: "tl-hackshastra",
    title: "Content Writing & Design Lead",
    organization: "Hack Shastra",
    date: "Nov 2025 – Mar 2026",
    timestamp: 20251101,
    category: "Leadership",
    description:
      "Led content creation and visual design strategy for technical events. Managed team to deliver engaging branding across multiple platforms.",
    tags: ["Leadership", "Visual Design", "Content Strategy", "Figma"],
  },
  {
    id: "tl-gdg",
    title: "Content Writer & Technical Contributor",
    organization: "GDG SRM AP (Google Developers Group)",
    date: "Nov 2025 – Mar 2026",
    timestamp: 20250901,
    category: "Experience",
    description:
      "Created technical and promotional content for developer-focused events and workshops, helping students engage with emerging technologies.",
    tags: ["GDG", "Google Developers", "Technical Writing", "Workshops"],
  },
  {
    id: "tl-crypto-project",
    title: "Developed Cryptographic Hash Security Platform",
    organization: "Independent Research",
    date: "Late 2025 – Early 2026",
    timestamp: 20251015,
    category: "Project",
    description:
      "Engineered defensive cybersecurity benchmarking platform to evaluate password-hashing algorithms and optimize configurations against brute-force attacks.",
    tags: ["Cryptography", "Python", "FastAPI", "Docker", "Security"],
  },
  {
    id: "tl-ai-learn",
    title: "Built AI Learn (Padhle AI)",
    organization: "EdTech Innovation",
    date: "Dec 2025 – Present",
    timestamp: 20251201,
    category: "Project",
    description:
      "Developed study companion leveraging rule-based NLP and OCR to convert academic materials into interactive quizzes and summaries.",
    tags: ["NLP", "OCR", "React", "FastAPI", "AI"],
  },
  {
    id: "tl-intermediate",
    title: "Completed Senior Secondary (Intermediate)",
    organization: "India",
    date: "March 2023 – March 2024",
    timestamp: 20240301,
    category: "Education",
    description:
      "Graduated with coursework in Physics, Chemistry, and Mathematics, establishing strong computational and problem-solving skills.",
    tags: ["PCM", "Foundations", "Mathematics"],
  },
];
