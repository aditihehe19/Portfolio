import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  description?: string;
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: ValidSkills[];
  startDate: Date;
  endDate: Date | "Ongoing" | "Present";
  companyLogoImg: any;
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
}

export const Projects: ProjectInterface[] = [
  {
    id: "crypto-hash-benchmark",
    companyName: "Cryptographic Hash Security Benchmarking Platform",
    type: "Personal",
    category: ["Cybersecurity", "Defensive Security", "Cryptography"],
    shortDescription:
      "A defensive cybersecurity platform to benchmark password-hashing algorithms and compare their performance and security configurations.",
    githubLink: "https://github.com/aditihehe19/hash-benchmarker",
    techStack: [
      "Python",
      "FastAPI",
      "React",
      "Docker",
      "C++",
      "Cryptography",
      "Defensive Security",
    ],
    startDate: new Date("2025-10-01"),
    endDate: "Present",
    companyLogoImg: "/projects/crypto-hash-benchmark.jpg",
    pagesInfoArr: [
      {
        title: "Security & Performance Benchmarks",
        description:
          "Defensive evaluation dashboard analyzing resistance against GPU-accelerated brute-force attacks and memory-hard configurations.",
        imgArr: ["/projects/crypto-hash-benchmark.jpg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "The Cryptographic Hash Security Benchmarking Platform is built to evaluate modern password-hashing and derivation primitives (such as Argon2id, bcrypt, scrypt, and PBKDF2).",
        "It provides developers and security teams with quantitative metrics on execution time, memory footprint, and entropy analysis to ensure optimal resilience against brute-force and dictionary attacks.",
      ],
      bullets: [
        "Engineered automated benchmarking suites measuring hashing throughput and memory hardness.",
        "Evaluated resistance factors against GPU-accelerated and ASIC dictionary attacks.",
        "Visualized work-factor trade-offs across tunable iterations, parallelism, and memory costs.",
        "Dockerized execution environment for reproducible security stress testing.",
      ],
    },
  },
  {
    id: "padhle-ai",
    companyName: "AI Learn (Padhle AI) (Ongoing)",
    type: "Personal",
    category: ["AI / ML", "Full Stack", "Web Dev"],
    shortDescription:
      "An AI-powered study companion using rule-based NLP and OCR to transform study materials into interactive learning resources.",
    githubLink: "https://github.com/aditihehe19/Padhle-AI",
    techStack: [
      "Python",
      "NLP",
      "OCR",
      "FastAPI",
      "React",
      "REST APIs",
      "MongoDB",
    ],
    startDate: new Date("2025-12-01"),
    endDate: "Present",
    companyLogoImg: "/projects/padhle-ai.jpg",
    pagesInfoArr: [
      {
        title: "Study Material Transformation",
        description:
          "Extracts concept hierarchies, definitions, and formulas to generate active-recall flashcards and revision modules.",
        imgArr: ["/projects/padhle-ai.jpg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "AI Learn (Padhle AI) is an interactive study platform designed to simplify complex curriculum materials into bite-sized, interactive learning elements.",
        "It integrates optical character recognition with rule-based NLP to accurately parse lecture slides, textbook excerpts, and handwritten notes.",
      ],
      bullets: [
        "Implemented OCR pipeline for text and formula extraction from lecture notes and diagrams.",
        "Designed rule-based NLP algorithms to identify key terminology, definitions, and conceptual links.",
        "Generated automated quiz question banks and flashcards to enable spaced repetition.",
        "Integrated reactive web interface with responsive progress tracking.",
      ],
    },
  },
  {
    id: "hybrid-knowledge-extraction",
    companyName: "Structured Knowledge Extraction from Visual Documents",
    type: "Personal",
    category: ["AI / ML", "Full Stack", "Backend"],
    shortDescription:
      "Hybrid AI system extracting structured knowledge from heterogeneous PDFs/scans using multi-engine parsing, OCR, and LaTeX equation reconstruction.",
    techStack: [
      "Python",
      "PyTorch",
      "Machine Learning",
      "Computer Vision",
      "LaTeX",
      "OCR",
      "FastAPI",
    ],
    startDate: new Date("2026-06-01"),
    endDate: new Date("2026-08-31"),
    companyLogoImg: "/projects/structured-knowledge-extraction.jpg",
    pagesInfoArr: [
      {
        title: "Document Parsing & Knowledge Graph",
        description:
          "Multi-engine fusion system reconstructing complex equations in LaTeX and generating semantic document graphs.",
        imgArr: ["/projects/structured-knowledge-extraction.jpg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Developed a hybrid AI-powered document processing system that extracts structured information from complex PDFs and scanned images.",
        "The architecture combines computer vision layout analysis, optical character recognition, and multi-engine PDF parsing with an IOU-based consensus fusion algorithm.",
      ],
      bullets: [
        "Implemented mathematical equation reconstruction converting rendered visual formulas into clean LaTeX code.",
        "Constructed robust table extraction and bounding-box layout analysis pipelines.",
        "Designed an IOU-based consensus fusion algorithm reconciling conflicting outputs from multiple OCR engines.",
        "Generated Document and Knowledge Graphs linking semantic entities across document sections.",
      ],
    },
  },
  {
    id: "lunar-lander-rl",
    companyName: "Lunar Lander: Reinforcement Learning & Reward Hacking",
    type: "Personal",
    category: ["AI / ML"],
    shortDescription:
      "Trained a PPO agent to land a rocket in Gymnasium's Lunar Lander, then wrote custom reward rules: one that taught it to cheat by hovering, and a fix that made it land again.",
    githubLink: "https://github.com/aditihehe19/rockboard",
    techStack: [
      "Python",
      "PyTorch",
      "Reinforcement Learning",
      "Stable-Baselines3",
      "Gymnasium",
      "Machine Learning",
    ],
    startDate: new Date("2026-10-25"),
    endDate: new Date("2026-10-25"),
    companyLogoImg: "/projects/lunar-lander-rl.jpg",
    pagesInfoArr: [
      {
        title: "Landing, Hovering & the Fix",
        description:
          "Real frames from the recorded clips: a random rocket crashing, the trained agent landing, the reward-hacked agent hovering, and the fixed agent landing again.",
        imgArr: ["/projects/lunar-lander-rl.jpg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Lunar Lander is a physics game from Gymnasium where a rocket has to land between two flags. I trained a small neural network with PPO (Stable-Baselines3) to fly it from just eight numbers per frame, such as position, speed, tilt and leg contact, with no hand-written control logic.",
        "I then experimented with reward shaping, writing my own reward rules as Gymnasium wrappers. A rule paying +1 for every frame the rocket was upright and slow taught it to hover until the time limit instead of landing, a textbook case of reward hacking. Paying for the change between frames instead of the state itself fixed it.",
      ],
      bullets: [
        "Trained PPO agents that solve the task: 262 to 264 average score over 50 unseen attempts each (200 counts as solved), with 99 of 100 landings, in about 11 minutes per run on a laptop CPU.",
        "Exposed reward hacking with a custom reward: the training score climbed to about 1,000 while the real game score stayed below 150, and one seed hovered out the clock in all 50 test attempts.",
        "Fixed it with potential-based shaping (pay for becoming calm, not for staying calm) plus a small per-frame time fee; both seeds land again, averaging 259 and 272.",
        "Showed that a time fee stops the exploring policy from idling on the pad with its engines blipping: it settled and finished in 18 of 20 attempts, versus 0 of 20 without the fee.",
        "Evaluated every model on the plain game with custom rewards turned off, across two random seeds, with training curves and recorded clips of each behavior.",
      ],
    },
  },
];

export const featuredProjects: ProjectInterface[] = Projects;
