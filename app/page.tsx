import LiveKPIRow from "@/components/LiveKPIRow";
import LiveClock from "@/components/LiveClock";
import MachineChart from "@/components/MachineChart";
import InventoryTable from "@/components/InventoryTable";
import DefectsPanel from "@/components/DefectsPanel";
import AlertsPanel from "@/components/AlertsPanel";

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
        <LiveClock />
      </header>

      {/* KPI Row — live updates every 5 s */}
      <LiveKPIRow />

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
