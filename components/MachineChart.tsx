"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { machineData } from "@/data/mockData";
import type { MachineItem } from "@/lib/types";

function getBarColor(value: number): string {
  if (value > 80) return "#22c55e";
  if (value > 60) return "#f97316";
  return "#ef4444";
}

export default function MachineChart({ machines = machineData }: { machines?: MachineItem[] }) {
  return (
    <div
      className="rounded-xl p-5 border flex flex-col gap-4"
      style={{ backgroundColor: "#1a1f2e", borderColor: "#2d3748" }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          Maschinenauslastung
        </h2>
        <div className="flex gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            &gt;80%
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500" />
            &gt;60%
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
            &lt;60%
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={machines}
          layout="vertical"
          margin={{ top: 0, right: 40, left: 10, bottom: 0 }}
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fill: "#64748b", fontSize: 11 }}
            axisLine={{ stroke: "#2d3748" }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={60}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
            contentStyle={{
              backgroundColor: "#1a1f2e",
              border: "1px solid #2d3748",
              borderRadius: "8px",
              color: "#f8fafc",
              fontSize: 12,
            }}
            formatter={(value: number) => [`${value}%`, "Auslastung"]}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={22}>
            {machines.map((entry) => (
              <Cell key={entry.name} fill={getBarColor(entry.value)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
