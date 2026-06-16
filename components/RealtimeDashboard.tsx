"use client";

import { useRealtimeData } from "@/hooks/useRealtimeData";
import ConnectionStatus from "@/components/ConnectionStatus";
import KPICard from "@/components/KPICard";
import MachineChart from "@/components/MachineChart";
import AlertsPanel from "@/components/AlertsPanel";
import type { DashboardData } from "@/lib/types";

export default function RealtimeDashboard({
  initialData,
}: {
  initialData: DashboardData;
}) {
  const { data, status } = useRealtimeData(initialData);

  return (
    <>
      {/* Connection status badge — sits in the flow just below the header */}
      <div className="flex items-center justify-end mb-4 -mt-2">
        <ConnectionStatus status={status} />
      </div>

      {/* KPI Row */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {data.kpis.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </section>

      {/* Machine chart + Alerts */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <MachineChart machines={data.machines} />
        </div>
        <div>
          <AlertsPanel />
        </div>
      </section>
    </>
  );
}
