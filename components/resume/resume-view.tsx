"use client";

import React from "react";
import Link from "next/link";
import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";

export default function ResumeView() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-border bg-background/90 backdrop-blur-md shadow-sm print:hidden">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Icons.chevronLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <span className="text-xs sm:text-sm text-muted-foreground font-mono hidden sm:inline">
            Aditi_Kotnala_Resume.pdf
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handlePrint}
            size="sm"
            className="gap-1.5 shadow-sm"
          >
            <Icons.printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </Button>

          <a
            href="mailto:aditi.k2442@gmail.com"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-border hover:bg-muted text-foreground transition-colors"
          >
            <Icons.mail className="w-4 h-4 text-primary" />
            <span>Contact Aditi</span>
          </a>
        </div>
      </div>

      {/* The Printable Paper Canvas */}
      <div className="resume-paper bg-white text-zinc-900 shadow-2xl rounded-xl p-8 sm:p-14 border border-zinc-200 print:shadow-none print:border-none print:p-0 print:m-0 font-sans leading-normal">
        {/* Header Section */}
        <div className="text-center pb-4 border-b border-zinc-300">
          <div className="text-[11px] font-medium text-zinc-500 mb-1 italic">
            Editable resume · Tailored for Cybersecurity / Security Engineering internships
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide uppercase text-zinc-950 font-heading">
            ADITI KOTNALA
          </h1>
          <div className="mt-2 text-xs sm:text-sm text-zinc-700 flex flex-wrap justify-center items-center gap-2 font-medium">
            <span>Bhopal, India</span>
            <span>|</span>
            <span>+91-7415362174</span>
            <span>|</span>
            <a
              href="mailto:aditi.k2442@gmail.com"
              className="text-blue-700 hover:underline font-semibold"
            >
              aditi.k2442@gmail.com
            </a>
          </div>
          <div className="mt-1.5 text-xs sm:text-sm text-zinc-700 flex flex-wrap justify-center items-center gap-2">
            <span>LinkedIn:</span>
            <a
              href="https://www.linkedin.com/in/aditi-kotnala-263353335"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline font-medium"
            >
              linkedin.com/in/aditi-kotnala-263353335
            </a>
            <span>|</span>
            <span>GitHub:</span>
            <a
              href="https://github.com/aditihehe19"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline font-medium"
            >
              github.com/aditihehe19
            </a>
          </div>
        </div>

        {/* Section: PROFESSIONAL SUMMARY */}
        <div className="mt-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-400 pb-0.5 mb-2 font-heading">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-xs sm:text-[13px] text-zinc-800 text-justify leading-relaxed">
            Computer Science and Engineering undergraduate focused on cybersecurity, with an interest in secure software
            development, cryptography, and defensive security engineering. Building hands-on experience through a
            cryptographic hash security benchmarking platform and AI-powered learning tools. Familiar with Python, C/C++,
            databases, REST APIs, Docker, CI/CD, and full-stack technologies; eager to apply analytical problem-solving and
            secure development practices to real-world security challenges.
          </p>
        </div>

        {/* Section: TECHNICAL SKILLS */}
        <div className="mt-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-400 pb-0.5 mb-2 font-heading">
            TECHNICAL SKILLS
          </h2>
          <div className="text-xs sm:text-[13px] text-zinc-800 space-y-1.5">
            <div>
              <strong className="text-zinc-950">Programming Languages:</strong> C, C++, Python; familiar with JavaScript, Java, Node.js
            </div>
            <div>
              <strong className="text-zinc-950">Cybersecurity & CS:</strong> Cryptography, cybersecurity fundamentals, DSA, DBMS, problem solving
            </div>
            <div>
              <strong className="text-zinc-950">Web & Backend:</strong> React, Redux, HTML, CSS, Bootstrap, Django, FastAPI, REST APIs
            </div>
            <div>
              <strong className="text-zinc-950">Databases & Tools:</strong> MySQL, PostgreSQL, MongoDB, Redis, Git, VS Code, Postman, Figma
            </div>
            <div>
              <strong className="text-zinc-950">AI & Document Intelligence:</strong> PyTorch, OpenCV, YOLO, PaddleOCR, RapidOCR, PyMuPDF, PDFMiner, PDFPlumber, LaTeX, RAG
            </div>
            <div>
              <strong className="text-zinc-950">DevOps & Other:</strong> Docker, CI/CD, DevOps, Machine Learning, Full-Stack Development
            </div>
          </div>
        </div>

        {/* Section: EXPERIENCE */}
        <div className="mt-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-400 pb-0.5 mb-2 font-heading">
            EXPERIENCE
          </h2>

          <div className="space-y-3.5">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                <span className="font-bold text-xs sm:text-[13px] text-zinc-950">
                  Research Intern — AI & Document Intelligence – SRM University AP
                </span>
                <span className="text-xs font-semibold text-zinc-700">
                  June 2026 – August 2026
                </span>
              </div>
              <div className="text-[11.5px] text-zinc-600 italic">
                Under Dr. Suraj Singh Khurana · Topic: Structured Knowledge Extraction from Heterogeneous Visual Documents using Hybrid Learning
              </div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-xs sm:text-[12.5px] text-zinc-800">
                <li>Developed a hybrid AI-powered document processing system that extracts structured information from complex PDFs and scanned images using multi-engine PDF parsing, OCR, and computer vision.</li>
                <li>Implemented mathematical equation reconstruction in LaTeX, table extraction, layout analysis, IoU-based consensus fusion, and Document/Knowledge Graph generation.</li>
                <li>Engineered export pipelines for JSON, Markdown, HTML, XML, and LaTeX formats designed for integration with Retrieval-Augmented Generation (RAG) pipelines.</li>
              </ul>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                <span className="font-bold text-xs sm:text-[13px] text-zinc-950">
                  Content Writing & Design Lead – Hack Shastra
                </span>
                <span className="text-xs font-semibold text-zinc-700">
                  November 2025 – March 2026
                </span>
              </div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-xs sm:text-[12.5px] text-zinc-800">
                <li>Led content creation and visual design strategy for technical events and initiatives.</li>
                <li>Managed a team to produce engaging content across multiple platforms.</li>
              </ul>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                <span className="font-bold text-xs sm:text-[13px] text-zinc-950">
                  Content Writer – GDG SRM AP (Google Developers Group)
                </span>
                <span className="text-xs font-semibold text-zinc-700">
                  Nov 2025 – Mar 2026
                </span>
              </div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-xs sm:text-[12.5px] text-zinc-800">
                <li>Created technical and promotional content for developer-focused events and workshops.</li>
                <li>Collaborated with teams to explain technical topics clearly and support event visibility and participation.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section: EDUCATION */}
        <div className="mt-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-400 pb-0.5 mb-2 font-heading">
            EDUCATION
          </h2>

          <div className="space-y-3">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                <span className="font-bold text-xs sm:text-[13px] text-zinc-950">
                  B.Tech. in Computer Science & Engineering – SRM University AP, Amaravati, India
                </span>
              </div>
              <div className="text-xs text-zinc-700 font-medium mt-0.5">
                Aug 2024 – Present | <span className="font-bold text-zinc-950">CGPA: 8.90/10</span> (through 4th semester)
              </div>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                <span className="font-bold text-xs sm:text-[13px] text-zinc-950">
                  Intermediate –, India
                </span>
              </div>
              <div className="text-xs text-zinc-700 font-medium mt-0.5">
                March 2023 – March 2024 | Coursework- Physics, Chemistry, Mathematics
              </div>
            </div>
          </div>
        </div>

        {/* Section: KEY PROJECTS */}
        <div className="mt-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-400 pb-0.5 mb-2 font-heading">
            KEY PROJECTS
          </h2>

          <div className="space-y-3">
            <div>
              <div className="font-bold text-xs sm:text-[13px] text-zinc-950">
                Cryptographic Hash Security Benchmarking Platform
              </div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-xs sm:text-[12.5px] text-zinc-800">
                <li>
                  Developing a defensive cybersecurity platform to benchmark password-hashing algorithms and compare their performance and security-related configurations.
                </li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-xs sm:text-[13px] text-zinc-950">
                AI Learn (Padhle AI) (Ongoing)
              </div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-xs sm:text-[12.5px] text-zinc-800">
                <li>
                  Building an AI-powered study companion that uses rule-based NLP and OCR to transform study materials into interactive learning resources.
                </li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-xs sm:text-[13px] text-zinc-950">
                Structured Knowledge Extraction from Heterogeneous Visual Documents using Hybrid Learning.
              </div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-xs sm:text-[12.5px] text-zinc-800">
                <li>
                  Developed a hybrid AI-powered document processing system that extracts structured information from complex PDFs and scanned images using multi-engine PDF parsing, OCR, and computer vision. Implemented mathematical equation reconstruction in LaTeX, table extraction, layout analysis, IOU-based consensus fusion, and Document/Knowledge Graph generation.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
