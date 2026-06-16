import { machineData, inventoryData, defectData, alertsData } from "../data/mockData";
import type { DashboardData, KPIItem, MachineItem } from "./types";

const KPI_BASE = {
  oee: 81,
  ausbringung: 1247,
  ausfallzeit: 38,
  ausschussquote: 1.8,
};

function jitter(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function clamp(val: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, val));
}

function buildKPIs(): KPIItem[] {
  const oee = +clamp(KPI_BASE.oee + jitter(-2, 2), 50, 99).toFixed(1);
  const ausbringung = Math.round(clamp(KPI_BASE.ausbringung + jitter(-10, 10), 900, 1300));
  const ausfallzeit = Math.round(clamp(KPI_BASE.ausfallzeit + jitter(-5, 5), 0, 180));
  const ausschussquote = +clamp(KPI_BASE.ausschussquote + jitter(-0.2, 0.2), 0, 10).toFixed(1);

  const pctDelta = (c: number, b: number) => +(((c - b) / b) * 100).toFixed(1);

  return [
    {
      label: "OEE",
      value: `${oee.toFixed(1)}%`,
      sub: "Gesamtanlageneffektivität",
      trend: +(oee - KPI_BASE.oee).toFixed(1),
    },
    {
      label: "Ausbringung",
      value: ausbringung.toLocaleString("de-DE"),
      sub: "Ziel: 1.300 Teile",
      trend: pctDelta(ausbringung, KPI_BASE.ausbringung),
    },
    {
      label: "Ausfallzeit",
      value: `${ausfallzeit} min`,
      sub: "Ungeplante Stillstände",
      trend: pctDelta(ausfallzeit, KPI_BASE.ausfallzeit),
    },
    {
      label: "Ausschussquote",
      value: `${ausschussquote.toFixed(1).replace(".", ",")}%`,
      sub: `Qualitätsrate ${(100 - ausschussquote).toFixed(1).replace(".", ",")}%`,
      trend: +(ausschussquote - KPI_BASE.ausschussquote).toFixed(1),
    },
  ];
}

function buildMachines(): MachineItem[] {
  return machineData.map((m) => ({
    name: m.name,
    value: Math.round(clamp(m.value + jitter(-3, 3), 5, 100)),
  }));
}

export function buildDashboardPayload(): DashboardData {
  return {
    kpis: buildKPIs(),
    machines: buildMachines(),
    inventory: inventoryData,
    defects: defectData,
    alerts: alertsData,
    fetchedAt: new Date().toISOString(),
  };
}
