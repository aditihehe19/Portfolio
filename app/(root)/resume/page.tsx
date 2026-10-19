import { Metadata } from "next";
import ResumeView from "@/components/resume/resume-view";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Resume | Aditi Kotnala",
  description: "Functional resume of Aditi Kotnala - Cybersecurity & CS Undergraduate",
  alternates: {
    canonical: `${siteConfig.url}/resume`,
  },
};

export default function ResumePage() {
  return (
    <div className="container py-8 sm:py-12">
      <ResumeView />
    </div>
  );
}
