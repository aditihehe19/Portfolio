export interface AchievementInterface {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: "Academic" | "Leadership" | "Technical" | "Community";
  description: string;
  highlights: string[];
}

export const achievementsList: AchievementInterface[] = [
  {
    id: "academic-excellence",
    title: "Academic Excellence (CGPA 8.90/10)",
    issuer: "SRM University AP",
    date: "2024 – Present",
    category: "Academic",
    description: "Maintained a high academic standing across four consecutive semesters of Computer Science & Engineering.",
    highlights: [
      "Consistent 8.90/10 cumulative GPA across advanced CS coursework",
      "Special emphasis on Cryptography, Data Structures, and Database Systems",
    ],
  },
  {
    id: "hack-shastra-lead",
    title: "Leadership & Visual Design Lead",
    issuer: "Hack Shastra",
    date: "Nov 2025 – Mar 2026",
    category: "Leadership",
    description: "Spearheaded creative direction, visual branding, and technical content across multi-day developer events.",
    highlights: [
      "Directed visual design strategy and brand assets for hackathons",
      "Supervised a collaborative creative team producing cross-platform materials",
    ],
  },
  {
    id: "gdg-technical-contributor",
    title: "Technical Writing & Developer Advocacy",
    issuer: "GDG SRM AP (Google Developers Group)",
    date: "Nov 2025 – Mar 2026",
    category: "Community",
    description: "Authored technical curriculum, event rundowns, and educational content for developer-focused initiatives.",
    highlights: [
      "Created technical and promotional guides for university-wide workshops",
      "Collaborated with core developers to demystify emerging web and cloud technologies",
    ],
  },
  {
    id: "cryptographic-research",
    title: "Cryptographic Platform Architecture",
    issuer: "Defensive Security Research",
    date: "2025 – 2026",
    category: "Technical",
    description: "Built a specialized testing bench for password-hashing algorithms and collision resilience analysis.",
    highlights: [
      "Engineered comparative benchmarks evaluating memory-hard functions (Argon2, bcrypt)",
      "Published reproducible Docker containers for algorithmic performance evaluation",
    ],
  },
];
