"use client";

import { useState, useEffect } from "react";
import { useInterval } from "@/hooks/useInterval";

export default function LiveClock() {
  // null on first render to prevent SSR/hydration mismatch
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  useInterval(() => {
    setNow(new Date());
  }, 1000);

  const dateStr = now
    ? now.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "––.––.––––";

  const timeStr = now
    ? now.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "––:––:––";

  return (
    <div className="text-right">
      <p className="text-xs font-mono text-slate-400">Schicht B</p>
      <p className="text-xs font-mono text-slate-500">
        {dateStr} · {timeStr} Uhr
      </p>
    </div>
  );
}
