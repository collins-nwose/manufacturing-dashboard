type KPICardProps = {
  label: string;
  value: string;
  sub: string;
  trend: number;
};

export default function KPICard({ label, value, sub, trend }: KPICardProps) {
  const isPositiveBad = trend > 0;
  const trendColor =
    label === "Ausbringung"
      ? trend < 0
        ? "text-red-400"
        : "text-emerald-400"
      : trend > 0
        ? "text-red-400"
        : "text-emerald-400";

  const arrow = trend > 0 ? "▲" : "▼";
  const sign = trend > 0 ? "+" : "";

  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-1 border"
      style={{ backgroundColor: "#1a1f2e", borderColor: "#2d3748" }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p className="text-3xl font-bold text-white leading-tight">{value}</p>
      <p className="text-xs text-slate-500">{sub}</p>
      <p className={`text-xs mt-1 font-medium ${trendColor}`}>
        {arrow} {sign}
        {trend}% ggü. Vorschicht
      </p>
    </div>
  );
}
