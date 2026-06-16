import KPICard from "@/components/KPICard";
import MachineChart from "@/components/MachineChart";
import InventoryTable from "@/components/InventoryTable";
import DefectsPanel from "@/components/DefectsPanel";
import AlertsPanel from "@/components/AlertsPanel";
import { kpiData } from "@/data/mockData";

export default function Home() {
  return (
    <main
      className="min-h-screen px-6 py-6 font-sans"
      style={{ backgroundColor: "#0f1117", color: "#f8fafc" }}
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Fertigungsdashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Teilefertigung · Industrie 4.0 · Werk München-Süd
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-mono text-slate-400">Schicht B</p>
          <p className="text-xs text-slate-500">16.06.2026 · 10:35 Uhr</p>
        </div>
      </header>

      {/* KPI Row */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi) => (
          <KPICard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            sub={kpi.sub}
            trend={kpi.trend}
          />
        ))}
      </section>

      {/* Middle Row: Machine chart + Alerts */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <MachineChart />
        </div>
        <div>
          <AlertsPanel />
        </div>
      </section>

      {/* Bottom Row: Inventory table + Defects */}
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
