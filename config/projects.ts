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
];

export const featuredProjects: ProjectInterface[] = Projects;
