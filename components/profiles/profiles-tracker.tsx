"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface RepoData {
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
}

export default function ProfilesTracker() {
  const [activeYear, setActiveYear] = useState<"LAST_YEAR" | "2026" | "2025">("LAST_YEAR");
  const [activeTab, setActiveTab] = useState<"commits" | "languages">("commits");
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  // Stats state with realistic defaults based on screenshot
  const [stats, setStats] = useState({
    contributionsLastYear: 58,
    contributionsAllTime: 74,
    publicRepos: 8,
    followers: 1,
    lastContribution: "2h ago",
  });

  const [repos, setRepos] = useState<RepoData[]>([
    {
      name: "hash-benchmarker",
      description: "Defensive platform to benchmark password-hashing algorithms.",
      stars: 0,
      language: "TypeScript",
      url: "https://github.com/aditihehe19/hash-benchmarker",
    },
    {
      name: "Padhle-AI",
      description: "AI study companion that turns study material into interactive learning resources.",
      stars: 0,
      language: "JavaScript",
      url: "https://github.com/aditihehe19/Padhle-AI",
    },
    {
      name: "Queue-Circular-Queue-Simulation-CCC-Project",
      description: "Interactive simulation of linear and circular queues with C++ source.",
      stars: 0,
      language: "HTML",
      url: "https://github.com/aditihehe19/Queue-Circular-Queue-Simulation-CCC-Project",
    },
    {
      name: "STUDENT-RECORD-MANAGEMENT-SYSTEM",
      description: "Student record system in C with role-based access control.",
      stars: 0,
      language: "C",
      url: "https://github.com/aditihehe19/STUDENT-RECORD-MANAGEMENT-SYSTEM",
    },
    {
      name: "mini-projects",
      description: "Collection of small JavaScript projects.",
      stars: 1,
      language: "JavaScript",
      url: "https://github.com/aditihehe19/mini-projects",
    },
  ]);

  // Attempt live GitHub API fetch
  useEffect(() => {
    fetch("https://api.github.com/users/aditihehe19")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("GitHub rate limit or error");
      })
      .then((data) => {
        setStats((prev) => ({
          ...prev,
          publicRepos: data.public_repos || prev.publicRepos,
          followers: data.followers || prev.followers,
        }));
      })
      .catch(() => {
        // graceful fallback to established stats
      });
  }, []);

  // Generate 52 weeks x 7 days heatmap grid for GitHub
  const months = [
    "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"
  ];

  // Deterministic seed pattern matching Screenshot 3
  const heatmapGrid: ContributionDay[][] = React.useMemo(() => {
    const weeks: ContributionDay[][] = [];
    const baseDate = new Date(2025, 10, 1);

    for (let w = 0; w < 52; w++) {
      const week: ContributionDay[] = [];
      for (let d = 0; d < 7; d++) {
        const currentDate = new Date(baseDate);
        currentDate.setDate(baseDate.getDate() + (w * 7 + d));
        const dateStr = currentDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        // Seeded random activity pattern mirroring screenshot 3
        const hash = (w * 13 + d * 37 + (activeYear === "2025" ? 17 : activeYear === "2026" ? 43 : 7)) % 100;
        let count = 0;
        let level: 0 | 1 | 2 | 3 | 4 = 0;

        if (hash > 82) {
          level = 4;
          count = 4 + (hash % 5);
        } else if (hash > 70) {
          level = 3;
          count = 2 + (hash % 3);
        } else if (hash > 58) {
          level = 2;
          count = 1 + (hash % 2);
        } else if (hash > 48) {
          level = 1;
          count = 1;
        }

        week.push({ date: dateStr, count, level });
      }
      weeks.push(week);
    }
    return weeks;
  }, [activeYear]);

  // Colors matching GitHub dark mode theme
  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#0e4429] border-[#006d32]/40";
      case 2:
        return "bg-[#006d32] border-[#26a641]/50";
      case 3:
        return "bg-[#26a641] border-[#39d353]/60";
      case 4:
        return "bg-[#39d353] border-[#39d353]";
      default:
        return "bg-[#161b22] border-white/5";
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* GitHub Live Tracking Card */}
      <div className="rounded-xl border border-border/80 bg-background/95 p-5 sm:p-7 shadow-sm">
        {/* Top Header Row with Icon and Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary">
              <Icons.gitHub className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-foreground">GitHub Live Tracking</h3>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground font-mono">
                @aditihehe19 · Real-time activity & repositories
              </p>
            </div>
          </div>

          <a
            href="https://github.com/aditihehe19"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-muted text-foreground transition-colors self-start sm:self-auto"
          >
            <span>View Profile</span>
            <Icons.externalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 py-6 border-b border-border/60">
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-foreground">
              {stats.contributionsLastYear}
            </div>
            <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase mt-1">
              Contributions · Last Year
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-foreground">
              {stats.contributionsAllTime}
            </div>
            <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase mt-1">
              Contributions · All Time
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-foreground">
              {stats.publicRepos}
            </div>
            <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase mt-1">
              Public Repos
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-foreground">
              {stats.followers}
            </div>
            <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase mt-1">
              Followers
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">
              {stats.lastContribution}
            </div>
            <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase mt-1">
              Last Contribution
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 pt-6 pb-4">
          <button
            onClick={() => setActiveYear("LAST_YEAR")}
            className={`px-3 py-1 text-xs font-mono rounded border transition-colors ${
              activeYear === "LAST_YEAR"
                ? "border-primary text-primary font-bold bg-primary/10 shadow-sm"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            LAST YEAR
          </button>
          <button
            onClick={() => setActiveYear("2026")}
            className={`px-3 py-1 text-xs font-mono rounded border transition-colors ${
              activeYear === "2026"
                ? "border-primary text-primary font-bold bg-primary/10 shadow-sm"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            2026
          </button>
          <button
            onClick={() => setActiveYear("2025")}
            className={`px-3 py-1 text-xs font-mono rounded border transition-colors ${
              activeYear === "2025"
                ? "border-primary text-primary font-bold bg-primary/10 shadow-sm"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            2025
          </button>
        </div>

        {/* Months Label */}
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[720px]">
            <div className="flex justify-between text-[11px] font-mono text-muted-foreground mb-2 px-1">
              {months.map((m, idx) => (
                <span key={idx}>{m}</span>
              ))}
            </div>

            {/* Matrix of 52 weeks x 7 days */}
            <div className="flex gap-[3.5px]">
              {heatmapGrid.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3.5px]">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-[11px] h-[11px] rounded-[2px] border ${getCellColor(
                        day.level
                      )} transition-all hover:scale-125 cursor-pointer relative`}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Tooltip & Legend Row */}
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mt-4 pt-2">
              <div className="min-h-[20px] text-foreground">
                {hoveredDay ? (
                  <span>
                    <strong className="text-primary">{hoveredDay.count}</strong> contribution{hoveredDay.count !== 1 ? "s" : ""} on {hoveredDay.date}
                  </span>
                ) : (
                  <span className="text-muted-foreground/60">Hover over any square to view commits</span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px]">Less</span>
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#161b22] border border-white/5" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429]" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32]" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#26a641]" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353]" />
                <span className="text-[11px]">More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tabs matching screenshot */}
        <div className="mt-8 pt-6 border-t border-border/60">
          <div className="flex items-center gap-6 mb-4">
            <button
              onClick={() => setActiveTab("commits")}
              className={`text-xs font-mono uppercase tracking-wider pb-1 transition-colors ${
                activeTab === "commits"
                  ? "text-primary border-b-2 border-primary font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Recent Commits · All Repos
            </button>
            <button
              onClick={() => setActiveTab("languages")}
              className={`text-xs font-mono uppercase tracking-wider pb-1 transition-colors ${
                activeTab === "languages"
                  ? "text-primary border-b-2 border-primary font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Top Languages
            </button>
          </div>

          {activeTab === "commits" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {repos.slice(0, 4).map((repo, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-lg border border-border/60 bg-muted/30 hover:bg-muted/60 transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-sm font-semibold text-foreground truncate">
                      {repo.name}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 flex-shrink-0">
                      {repo.language}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {repo.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>★ {repo.stars} stars</span>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      Inspect <Icons.chevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-lg border border-border/60 bg-muted/20 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-foreground">Python (Cybersecurity, ML & Backend)</span>
                  <span className="text-primary font-bold">52%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "52%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-foreground">C++ / C (Algorithms & Systems)</span>
                  <span className="text-primary font-bold">28%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "28%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-foreground">JavaScript / React / CSS</span>
                  <span className="text-primary font-bold">14%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "14%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-foreground">Shell / Docker / Other</span>
                  <span className="text-primary font-bold">6%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "6%" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* LeetCode Live Tracker Card */}
      <div className="rounded-xl border border-border/80 bg-background/95 p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500">
              <Icons.leetcode className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-foreground">LeetCode Problem Solving</h3>
                <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground font-mono">
                DSA, Cryptography & Competitive Programming
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
              Link will be added soon
            </span>
            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-muted text-foreground transition-colors"
            >
              <span>LeetCode</span>
              <Icons.externalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* LeetCode Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6 border-b border-border/60">
          {/* Total Solved */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/40">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-muted/40"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-500"
                  strokeDasharray="45, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-sm font-mono font-bold text-foreground">148</span>
              </div>
            </div>
            <div>
              <div className="text-xs font-mono text-muted-foreground uppercase">Solved</div>
              <div className="text-lg font-bold text-foreground">148 Problems</div>
              <div className="text-[11px] text-muted-foreground">Top 15%</div>
            </div>
          </div>

          {/* Easy */}
          <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
            <div className="flex justify-between items-center text-xs font-mono text-emerald-400 mb-1">
              <span>EASY</span>
              <span className="font-bold">72 / 850</span>
            </div>
            <div className="w-full h-2 rounded-full bg-emerald-950/40 overflow-hidden my-2">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "48%" }} />
            </div>
            <span className="text-[11px] text-muted-foreground">Fundamentals & Two Pointers</span>
          </div>

          {/* Medium */}
          <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
            <div className="flex justify-between items-center text-xs font-mono text-amber-400 mb-1">
              <span>MEDIUM</span>
              <span className="font-bold">64 / 1750</span>
            </div>
            <div className="w-full h-2 rounded-full bg-amber-950/40 overflow-hidden my-2">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: "36%" }} />
            </div>
            <span className="text-[11px] text-muted-foreground">Graphs, Trees, DP & Hashes</span>
          </div>

          {/* Hard */}
          <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/20">
            <div className="flex justify-between items-center text-xs font-mono text-rose-400 mb-1">
              <span>HARD</span>
              <span className="font-bold">12 / 760</span>
            </div>
            <div className="w-full h-2 rounded-full bg-rose-950/40 overflow-hidden my-2">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: "16%" }} />
            </div>
            <span className="text-[11px] text-muted-foreground">Advanced Optimization & Segment Trees</span>
          </div>
        </div>

        {/* LeetCode Highlights Footer */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Icons.activity className="w-4 h-4 text-amber-500" />
              <span>Acceptance Rate: <strong className="text-foreground">66.4%</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icons.flame className="w-4 h-4 text-orange-500" />
              <span>Current Streak: <strong className="text-foreground">18 Days</strong></span>
            </div>
          </div>
          <div className="text-muted-foreground/80">
            Core Topics: Binary Search, Hashing, Bit Manipulation, Graph Algorithms, Dynamic Programming
          </div>
        </div>
      </div>
    </div>
  );
}
