import { defectData } from "@/data/mockData";

export default function DefectsPanel() {
  const total = defectData.reduce((s, d) => s + d.count, 0);

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
          Fehleranalyse
        </h2>
        <span className="text-xs text-slate-500">
          {total} Fehler gesamt
        </span>
      </div>

      <ul className="flex flex-col divide-y" style={{ borderColor: "#2d3748" }}>
        {defectData.map((d) => {
          const pct = Math.round((d.count / total) * 100);
          return (
            <li key={d.type} className="px-5 py-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-200">{d.type}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">
                    {d.count}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      d.trend === "up" ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {d.trend === "up" ? "▲" : "▼"}
                  </span>
                </div>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: "#2d3748" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    backgroundColor:
                      pct > 40
                        ? "#ef4444"
                        : pct > 25
                          ? "#f97316"
                          : "#22c55e",
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
