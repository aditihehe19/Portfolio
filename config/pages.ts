import { ValidPages } from "./constants";

type PagesConfig = {
  [key in ValidPages]: {
    title: string;
    description: string;
    metadata: {
      title: string;
      description: string;
    };
  };
};

export const pagesConfig: PagesConfig = {
  home: {
    title: "Home",
    description: "Welcome to Aditi Kotnala's portfolio website.",
    metadata: {
      title: "Home | Aditi Kotnala",
      description: "Aditi Kotnala's portfolio website - Cybersecurity & CS.",
    },
  },
  skills: {
    title: "Technical Skills",
    description: "Key skills, tools, and defensive security domains.",
    metadata: {
      title: "Skills | Aditi Kotnala",
      description: "Aditi Kotnala's technical and security skills.",
    },
  },
  projects: {
    title: "Key Projects",
    description: "Showcasing defensive security platforms and AI systems.",
    metadata: {
      title: "Projects | Aditi Kotnala",
      description: "Aditi Kotnala's projects in cybersecurity and AI.",
    },
  },
  experience: {
    title: "Experience",
    description: "Professional journey, leadership, and technical writing.",
    metadata: {
      title: "Experience | Aditi Kotnala",
      description: "Aditi Kotnala's leadership and technical roles.",
    },
  },
  education: {
    title: "Education",
    description: "Academic background and coursework foundations.",
    metadata: {
      title: "Education | Aditi Kotnala",
      description: "Aditi Kotnala's education history at SRM University AP.",
    },
  },
  achievements: {
    title: "Achievements & Highlights",
    description: "Academic milestones, leadership recognition, and technical accomplishments.",
    metadata: {
      title: "Achievements | Aditi Kotnala",
      description: "Aditi Kotnala's achievements and awards.",
    },
  },
  profiles: {
    title: "Live Profiles & Activity",
    description: "Real-time tracking of GitHub contributions and LeetCode problem solving.",
    metadata: {
      title: "Profiles & Tracking | Aditi Kotnala",
      description: "Live GitHub and LeetCode activity tracking.",
    },
  },
  timeline: {
    title: "Interactive Timeline",
    description: "Chronological journey of milestones, projects, and custom milestones.",
    metadata: {
      title: "Timeline | Aditi Kotnala",
      description: "Interactive timeline of milestones.",
    },
  },
  contact: {
    title: "Get In Touch",
    description: "Let's connect for cybersecurity roles, research, and collaborative projects.",
    metadata: {
      title: "Contact | Aditi Kotnala",
      description: "Contact Aditi Kotnala.",
    },
  },
  contributions: {
    title: "Open Source & Community",
    description: "Contributions, developer workshops, and community involvement.",
    metadata: {
      title: "Contributions | Aditi Kotnala",
      description: "Aditi Kotnala's community involvement.",
    },
  },
  resume: {
    title: "Resume",
    description: "Interactive and printable resume of Aditi Kotnala.",
    metadata: {
      title: "Resume | Aditi Kotnala",
      description: "Aditi Kotnala's full functional resume.",
    },
  },
};
