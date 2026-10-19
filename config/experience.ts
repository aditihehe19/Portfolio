import { ValidSkills } from "./constants";

export interface ExperienceInterface {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date | "Present";
  description: string[];
  achievements: string[];
  skills: ValidSkills[];
  companyUrl?: string;
  logo?: string;
  customDuration?: string;
  mentor?: {
    name: string;
    url?: string;
  };
  topic?: string;
}

export const experiences: ExperienceInterface[] = [
  {
    id: "srm-ai-research-intern",
    position: "Research Intern — AI & Document Intelligence",
    company: "SRM University AP",
    companyUrl: "https://www.srmap.edu.in/",
    location: "Amaravati, Andhra Pradesh, India",
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-11-01"),
    customDuration: "Jun 2025 – Nov 2025",
    mentor: {
      name: "Dr. Suraj Singh Khurana",
      url: "https://in.linkedin.com/in/suraj-singh-khurana",
    },
    topic:
      "Structured Knowledge Extraction from Heterogeneous Visual Documents using Hybrid Learning",
    description: [
      "Conducted advanced research under the mentorship of Dr. Suraj Singh Khurana at SRM University AP on 'Structured Knowledge Extraction from Heterogeneous Visual Documents using Hybrid Learning'.",
      "Developed a hybrid AI-powered document processing system that extracts structured information from complex PDFs and scanned images using multi-engine PDF parsing, OCR, and computer vision.",
      "Implemented mathematical equation reconstruction in LaTeX, table extraction, layout analysis, IoU-based consensus fusion, and Document/Knowledge Graph generation.",
      "Engineered export pipelines for JSON, Markdown, HTML, XML, and LaTeX formats — designed for seamless integration with Retrieval-Augmented Generation (RAG) pipelines.",
    ],
    achievements: [
      "Built a multi-engine layout analysis and document parsing framework reconciling conflicting OCR results with an IoU-based consensus fusion algorithm.",
      "Implemented visual formula-to-LaTeX reconstruction preserving mathematical hierarchy and syntax with high precision.",
      "Designed Document and Knowledge Graphs linking semantic entities, definitions, formulas, and figures across document sections.",
      "Engineered high-throughput export pipelines supporting JSON, Markdown, HTML, XML, and LaTeX for Retrieval-Augmented Generation (RAG) systems.",
    ],
    skills: [
      "Python",
      "PyMuPDF",
      "PDFMiner.six",
      "PDFPlumber",
      "PaddleOCR",
      "RapidOCR",
      "OpenCV",
      "PyTorch",
      "YOLO",
      "Git",
      "GitHub",
      "Computer Vision",
      "Machine Learning",
      "LaTeX",
      "OCR",
      "RAG",
    ],
    logo: "/experience/srm-logo.png",
  },
  {
    id: "hack-shastra",
    position: "Content Writing & Design Lead",
    company: "Hack Shastra",
    location: "Amaravati / Remote, India",
    startDate: new Date("2025-11-01"),
    endDate: new Date("2026-03-01"),
    customDuration: "Nov 2025 – Mar 2026",
    description: [
      "Led content creation and visual design strategy for technical hackathons and developer initiatives.",
      "Managed a cross-functional team to produce high-impact technical branding and interactive event collaterals across multiple platforms.",
      "Collaborated directly with organizers and developers to craft clear problem statements and documentation.",
    ],
    achievements: [
      "Spearheaded end-to-end design strategy and content guidelines for hackathon challenges and tech tracks.",
      "Managed and mentored a content & design team delivering promotional assets and technical writeups.",
      "Enhanced participant engagement and clarity for multi-track development and security challenges.",
    ],
    skills: ["Figma", "Visual Design", "Content Strategy", "Git", "VS Code"],
    companyUrl: "https://hackshastra.com",
    logo: "/experience/hackshastra-logo.png",
  },
  {
    id: "gdg-srm-ap",
    position: "Content Writer",
    company: "GDG SRM AP (Google Developers Group)",
    location: "SRM University AP, India",
    startDate: new Date("2025-09-01"),
    endDate: new Date("2026-03-01"),
    customDuration: "Nov 2025 – Mar 2026",
    description: [
      "Created technical and promotional content for developer-focused events, codelabs, and hands-on workshops.",
      "Collaborated with engineering teams to explain complex technical topics clearly and support event visibility and community participation.",
      "Formulated educational writeups covering modern software stacks, cloud fundamentals, and security best practices.",
    ],
    achievements: [
      "Authored workshop guides and event overviews reaching hundreds of student developers across campus.",
      "Partnered with Google Developer Group leads to synthesize technical curriculum into accessible content.",
      "Boosted developer turnout and participation in technical workshops by over 45% through strategic communication.",
    ],
    skills: ["Content Strategy", "Python", "Problem Solving", "Git"],
    companyUrl: "https://gdg.community.dev",
    logo: "/experience/gdg-logo.png",
  },
];
