import LiveClock from "@/components/LiveClock";
import RealtimeDashboard from "@/components/RealtimeDashboard";
import InventoryTable from "@/components/InventoryTable";
import DefectsPanel from "@/components/DefectsPanel";
import { kpiData, machineData, inventoryData, defectData, alertsData } from "@/data/mockData";
import type { DashboardData } from "@/lib/types";

// Static snapshot used for SSR and as the initial WS fallback value.
// The WebSocket connection replaces this with live data immediately on mount.
const INITIAL_DATA: DashboardData = {
  kpis: kpiData,
  machines: machineData,
  inventory: inventoryData,
  defects: defectData,
  alerts: alertsData,
  fetchedAt: "",
};

export default function Home() {
  return (
    <main
      className="min-h-screen px-6 py-6 font-sans"
      style={{ backgroundColor: "#0f1117", color: "#f8fafc" }}
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Fertigungsdashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Teilefertigung · Industrie 4.0 · Werk München-Süd
          </p>
        </div>
        <LiveClock />
      </header>

      {/* Live sections: connection status + KPIs + machine chart + alerts */}
      <RealtimeDashboard initialData={INITIAL_DATA} />

      {/* Static panels */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <InventoryTable />
        </div>
        <div>
          <DefectsPanel />
        </div>
      </section>
    </main>
  );
}
