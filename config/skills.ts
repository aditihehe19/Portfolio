export interface skillsInterface {
  name: string;
  description: string;
  rating: number;
  iconName: string;
  category: "Languages" | "Cybersecurity & CS" | "Web & Backend" | "Databases & Tools" | "DevOps & Systems";
}

export const skillsUnsorted: skillsInterface[] = [
  // Programming Languages
  {
    name: "Python",
    description: "Primary language for security scripting, machine learning, and cryptographic algorithms.",
    rating: 5,
    iconName: "python",
    category: "Languages",
  },
  {
    name: "C++",
    description: "High-performance systems programming, data structures, and algorithmic problem solving.",
    rating: 5,
    iconName: "cplusplus",
    category: "Languages",
  },
  {
    name: "C",
    description: "Low-level memory management, systems fundamentals, and core algorithmic implementations.",
    rating: 5,
    iconName: "c",
    category: "Languages",
  },
  {
    name: "JavaScript",
    description: "Dynamic scripting for modern web applications, interactive UIs, and asynchronous flows.",
    rating: 4,
    iconName: "javascript",
    category: "Languages",
  },
  {
    name: "Java",
    description: "Object-oriented software development and enterprise backend architecture principles.",
    rating: 4,
    iconName: "code",
    category: "Languages",
  },
  {
    name: "Node.js",
    description: "Asynchronous runtime for building backend services and fast event-driven APIs.",
    rating: 4,
    iconName: "nodejs",
    category: "Languages",
  },

  // Cybersecurity & CS
  {
    name: "Cryptography",
    description: "Mathematical primitives, hashing algorithms, symmetric/asymmetric encryption, and key derivation.",
    rating: 5,
    iconName: "lock",
    category: "Cybersecurity & CS",
  },
  {
    name: "Cybersecurity",
    description: "Defensive engineering, vulnerability assessment, threat modeling, and secure software development.",
    rating: 5,
    iconName: "shieldCheck",
    category: "Cybersecurity & CS",
  },
  {
    name: "DSA & Problem Solving",
    description: "Algorithmic thinking, data structures, complexity analysis, and competitive programming.",
    rating: 5,
    iconName: "terminal",
    category: "Cybersecurity & CS",
  },
  {
    name: "DBMS",
    description: "Relational modeling, query optimization, normalization, indexing, and ACID transaction safety.",
    rating: 5,
    iconName: "mysql",
    category: "Cybersecurity & CS",
  },

  // Web & Backend
  {
    name: "FastAPI",
    description: "High-throughput asynchronous Python web framework for microservices and secure REST APIs.",
    rating: 5,
    iconName: "fastapi",
    category: "Web & Backend",
  },
  {
    name: "React",
    description: "Component-driven user interfaces, state management, and modern client architecture.",
    rating: 5,
    iconName: "react",
    category: "Web & Backend",
  },
  {
    name: "Django",
    description: "Full-featured Python backend framework with built-in authentication, ORM, and CSRF protection.",
    rating: 4,
    iconName: "django",
    category: "Web & Backend",
  },
  {
    name: "Redux",
    description: "Predictable state container for JavaScript applications with centralized debugging.",
    rating: 4,
    iconName: "redux",
    category: "Web & Backend",
  },
  {
    name: "HTML5 & CSS3",
    description: "Semantic web structure, responsive fluid layouts, and accessible modern interfaces.",
    rating: 5,
    iconName: "html5",
    category: "Web & Backend",
  },
  {
    name: "Bootstrap & Tailwind",
    description: "Utility-first and responsive design systems for polished cross-device experiences.",
    rating: 5,
    iconName: "tailwindcss",
    category: "Web & Backend",
  },

  // Databases & Tools
  {
    name: "PostgreSQL",
    description: "Robust open-source relational database supporting advanced queries, JSON, and transactions.",
    rating: 5,
    iconName: "postgresql",
    category: "Databases & Tools",
  },
  {
    name: "MySQL",
    description: "Structured database management for scalable data storage and relational schemas.",
    rating: 5,
    iconName: "mysql",
    category: "Databases & Tools",
  },
  {
    name: "MongoDB",
    description: "Flexible document-based NoSQL database for rapid unstructured and semi-structured storage.",
    rating: 4,
    iconName: "mongodb",
    category: "Databases & Tools",
  },
  {
    name: "Redis",
    description: "In-memory key-value data store used for low-latency caching, rate limiting, and session state.",
    rating: 4,
    iconName: "redis",
    category: "Databases & Tools",
  },
  {
    name: "Git & GitHub",
    description: "Distributed version control, branching workflows, collaborative code reviews, and releases.",
    rating: 5,
    iconName: "git",
    category: "Databases & Tools",
  },
  {
    name: "Postman",
    description: "API testing, automated endpoint verification, and contract inspection suite.",
    rating: 5,
    iconName: "postman",
    category: "Databases & Tools",
  },
  {
    name: "Figma",
    description: "Collaborative interface and visual asset design, wireframing, and component prototypes.",
    rating: 4,
    iconName: "figma",
    category: "Databases & Tools",
  },

  // DevOps & Systems
  {
    name: "Docker",
    description: "Containerization of applications and security sandboxing for consistent cross-environment parity.",
    rating: 4,
    iconName: "docker",
    category: "DevOps & Systems",
  },
  {
    name: "CI/CD & DevOps",
    description: "Automated build, test, and deployment pipelines ensuring software quality and fast release cycles.",
    rating: 4,
    iconName: "activity",
    category: "DevOps & Systems",
  },
  {
    name: "Machine Learning & OCR",
    description: "Applied NLP, computer vision layout parsing, and document intelligence pipelines.",
    rating: 4,
    iconName: "aurora",
    category: "DevOps & Systems",
  },
];

export const skills = skillsUnsorted.sort((a, b) => b.rating - a.rating);

export const featuredSkills = skills.slice(0, 8);
