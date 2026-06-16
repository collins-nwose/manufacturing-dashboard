"use client";

import useSWR from "swr";
import KPICard from "@/components/KPICard";
import { kpiData } from "@/data/mockData";
import type { DashboardData } from "@/lib/types";

const fetcher = (url: string): Promise<DashboardData> =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`API ${r.status}`);
    return r.json();
  });

// Static mock data used as the instant fallback on first render
// so the page never shows a loading skeleton on initial paint.
const FALLBACK: DashboardData = {
  kpis: kpiData,
  machines: [],
  inventory: [],
  defects: [],
  alerts: [],
  fetchedAt: "",
};

export default function LiveKPIRow() {
  const { data, error } = useSWR<DashboardData>(
    "/api/dashboard",
    fetcher,
    {
      refreshInterval: 5000,
      fallbackData: FALLBACK,
      // Don't revalidate on window focus — avoids a burst of requests
      // when a user tabs back to the dashboard.
      revalidateOnFocus: false,
    }
  );

  if (error) {
    return (
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div
          className="col-span-4 rounded-xl px-5 py-4 text-sm text-red-400 border"
          style={{ backgroundColor: "#1a1f2e", borderColor: "#2d3748" }}
        >
          API nicht erreichbar — Daten werden nicht aktualisiert.
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {data!.kpis.map((kpi) => (
        <KPICard key={kpi.label} {...kpi} />
      ))}
    </section>
  );
}
