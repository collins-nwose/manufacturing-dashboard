import { alertsData } from "@/data/mockData";

const dotColor: Record<string, string> = {
  rot: "bg-red-500",
  orange: "bg-orange-400",
  gelb: "bg-yellow-400",
};

const ringColor: Record<string, string> = {
  rot: "ring-red-500/30",
  orange: "ring-orange-400/30",
  gelb: "ring-yellow-400/30",
};

export default function AlertsPanel() {
  return (
    <div
      className="rounded-xl border flex flex-col"
      style={{ backgroundColor: "#1a1f2e", borderColor: "#2d3748" }}
    >
      <div
        className="px-5 py-4 border-b flex items-center justify-between"
        style={{ borderColor: "#2d3748" }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          Aktive Alarme
        </h2>
        <span className="flex items-center gap-1.5 text-xs font-medium text-red-400">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          {alertsData.length} aktiv
        </span>
      </div>

      <ul className="flex flex-col divide-y" style={{ borderColor: "#2d3748" }}>
        {alertsData.map((alert) => (
          <li key={alert.id} className="px-5 py-4 flex items-start gap-3">
            <span
              className={`mt-0.5 flex-shrink-0 w-3 h-3 rounded-full ring-4 ${dotColor[alert.severity]} ${ringColor[alert.severity]}`}
            />
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-sm text-slate-200 leading-snug">
                {alert.message}
              </p>
              <p className="text-xs text-slate-500">{alert.time}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="px-5 py-3 mt-auto" style={{ borderTop: "1px solid #2d3748" }}>
        <p className="text-xs text-slate-600 text-center">
          Letzte Aktualisierung: 10:31 Uhr — Schicht B
        </p>
      </div>
    </div>
  );
}
