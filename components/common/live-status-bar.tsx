"use client";

import React, { useEffect, useState } from "react";

export default function LiveStatusBar({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string>("");
  const [views, setViews] = useState<number>(14);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    // Live IST clock
    const updateTime = () => {
      const now = new Date();
      // Format to IST
      const istString = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(istString);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Portfolio views tracking with localStorage
    try {
      const storedViews = localStorage.getItem("aditi_portfolio_views");
      let count = storedViews ? parseInt(storedViews, 10) : 14;
      if (!sessionStorage.getItem("aditi_view_counted")) {
        count += 1;
        sessionStorage.setItem("aditi_view_counted", "true");
        localStorage.setItem("aditi_portfolio_views", count.toString());
      }
      setViews(count);
    } catch {
      setViews(15);
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`flex items-center justify-center gap-8 sm:gap-14 py-4 px-6 rounded-2xl border border-border/60 bg-background/50 backdrop-blur-md ${className}`}
    >
      {/* Local Time IST */}
      <div className="flex flex-col items-start">
        <span className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
          Local Time · IST
        </span>
        <span className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-foreground">
          {mounted && time ? time : "19:16:07"}
        </span>
      </div>

      <div className="h-8 w-px bg-border/60" />

      {/* Portfolio Views */}
      <div className="flex flex-col items-start">
        <span className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
          Portfolio Views
        </span>
        <span className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-foreground">
          {mounted ? views : 14}
        </span>
      </div>
    </div>
  );
}
