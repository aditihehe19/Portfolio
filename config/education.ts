export interface EducationInterface {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  grade?: string;
  coursework?: string[];
  description: string;
}

export const educationList: EducationInterface[] = [
  {
    id: "srm-ap-btech",
    degree: "B.Tech. in Computer Science & Engineering",
    institution: "SRM University AP",
    location: "Amaravati, India",
    duration: "Aug 2024 – Present",
    grade: "CGPA: 8.90 / 10 (through 4th semester)",
    coursework: [
      "Cryptography & Security Fundamentals",
      "Data Structures & Algorithms (DSA)",
      "Database Management Systems (DBMS)",
      "Object-Oriented Programming (OOP)",
      "Computer Networks",
      "Operating Systems",
    ],
    description:
      "Undergraduate curriculum centered on core computer science foundations with a focused specialization in cybersecurity, cryptographic systems, and defensive security engineering.",
  },
  {
    id: "intermediate",
    degree: "Senior Secondary / Intermediate",
    institution: "Senior Secondary School",
    location: "India",
    duration: "March 2023 – March 2024",
    coursework: ["Physics", "Chemistry", "Mathematics"],
    description:
      "Rigorous pre-university coursework with rigorous analytical problem-solving and mathematics foundation.",
  },
];
