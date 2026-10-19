"use client";

import GlassFolder, { type FolderFile, type GlassFolderProps } from "@/components/ui/glass-folder-cards";

const GITHUB = "https://github.com/aditihehe19";

type ShelfFolder = Pick<GlassFolderProps, "label" | "meta" | "tone" | "art" | "seed" | "labelPlacement"> & {
  files: FolderFile[];
};

function Shelf({ folders }: { folders: ShelfFolder[] }) {
  return (
    <div className="grid w-full grid-cols-1 items-end justify-items-center gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
      {folders.map((folder, i) => (
        <GlassFolder key={folder.label} {...folder} action="none" width={320} appearDelay={i * 140} />
      ))}
    </div>
  );
}

const projectFolders: ShelfFolder[] = [
  {
    label: "Security & Cryptography",
    tone: "dark",
    art: "ember",
    seed: 11,
    labelPlacement: "top-left",
    files: [
      {
        name: "Hash Benchmarking Platform",
        meta: "Python · FastAPI · Docker",
        image: "/projects/crypto-hash-benchmark.jpg",
        href: "/projects/crypto-hash-benchmark",
      },
      { name: "hash-benchmarker", meta: "GitHub · TypeScript", href: `${GITHUB}/hash-benchmarker` },
      { name: "Caesar Cipher", meta: "GitHub · C++", href: `${GITHUB}/caeser_cipher` },
    ],
  },
  {
    label: "AI & Document Intelligence",
    art: "dusk",
    seed: 5,
    files: [
      {
        name: "Padhle AI",
        meta: "NLP · OCR · FastAPI",
        image: "/projects/padhle-ai.jpg",
        href: "/projects/padhle-ai",
      },
      {
        name: "Knowledge Extraction",
        meta: "PyTorch · OCR · LaTeX",
        image: "/projects/structured-knowledge-extraction.jpg",
        href: "/projects/hybrid-knowledge-extraction",
      },
      { name: "Padhle-AI repo", meta: "GitHub · JavaScript", href: `${GITHUB}/Padhle-AI` },
    ],
  },
  {
    label: "Systems & DSA",
    art: "verdant",
    seed: 8,
    labelPlacement: "top-right",
    files: [
      {
        name: "Circular Queue Simulation",
        meta: "GitHub · C++",
        href: `${GITHUB}/Queue-Circular-Queue-Simulation-CCC-Project`,
      },
      {
        name: "Student Record System",
        meta: "GitHub · C · RBAC",
        href: `${GITHUB}/STUDENT-RECORD-MANAGEMENT-SYSTEM`,
      },
      { name: "LeetCode Solutions", meta: "GitHub · Java", href: `${GITHUB}/leet_code-` },
      { name: "Mini Projects", meta: "GitHub · JavaScript", href: `${GITHUB}/mini-projects` },
    ],
  },
];

const detailFolders: ShelfFolder[] = [
  {
    label: "Experience",
    art: "aurora",
    seed: 3,
    files: [
      { name: "Research Intern — AI", meta: "SRM AP · 2026", href: "/experience/srm-ai-research-intern" },
      { name: "Content & Design Lead", meta: "Hack Shastra", href: "/experience/hack-shastra" },
      { name: "Content Writer", meta: "GDG SRM AP", href: "/experience/gdg-srm-ap" },
    ],
  },
  {
    label: "Education",
    art: "glacier",
    seed: 14,
    labelPlacement: "top-left",
    files: [
      { name: "B.Tech CSE", meta: "SRM University AP", href: "/#education" },
      { name: "CGPA 8.90 / 10", meta: "Through 4th semester", href: "/#education" },
    ],
  },
  {
    label: "Skills & Profiles",
    tone: "dark",
    art: "verdant",
    seed: 21,
    labelPlacement: "top-right",
    files: [
      { name: "Technical Skills", meta: "Python · C++ · C · FastAPI", href: "/#skills" },
      { name: "GitHub & LeetCode", meta: "Live activity", href: "/#profiles" },
      { name: "Resume", meta: "Printable", href: "/resume" },
    ],
  },
];

export function ProjectFolders() {
  return <Shelf folders={projectFolders} />;
}

export function DetailFolders() {
  return <Shelf folders={detailFolders} />;
}
