import { inventoryData } from "@/data/mockData";

const statusStyles: Record<string, string> = {
  OK: "bg-emerald-900/50 text-emerald-400 border border-emerald-700/50",
  Niedrig: "bg-orange-900/50 text-orange-400 border border-orange-700/50",
  Kritisch: "bg-red-900/50 text-red-400 border border-red-700/50",
};

export default function InventoryTable() {
  return (
    <div
      className="rounded-xl border flex flex-col"
      style={{ backgroundColor: "#1a1f2e", borderColor: "#2d3748" }}
    >
      <div className="px-5 py-4 border-b" style={{ borderColor: "#2d3748" }}>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          Bestandsübersicht (SAP MM)
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="text-xs uppercase tracking-wider text-slate-500"
              style={{ borderBottom: "1px solid #2d3748" }}
            >
              <th className="text-left px-5 py-3 font-medium">Material-Nr.</th>
              <th className="text-left px-5 py-3 font-medium">Bezeichnung</th>
              <th className="text-right px-5 py-3 font-medium">Bestand</th>
              <th className="text-center px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((row, i) => (
              <tr
                key={row.id}
                className="transition-colors hover:bg-white/[0.02]"
                style={{
                  borderBottom:
                    i < inventoryData.length - 1
                      ? "1px solid #2d3748"
                      : undefined,
                }}
              >
                <td className="px-5 py-3 font-mono text-xs text-slate-400">
                  {row.id}
                </td>
                <td className="px-5 py-3 text-slate-200">{row.name}</td>
                <td className="px-5 py-3 text-right font-semibold text-slate-100">
                  {row.bestand}
                </td>
                <td className="px-5 py-3 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
