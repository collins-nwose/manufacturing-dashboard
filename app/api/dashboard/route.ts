import {
  machineData,
  inventoryData,
  defectData,
  alertsData,
} from "@/data/mockData";
import type { DashboardData, KPIItem } from "@/lib/types";

const BASE = {
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
  const oee = +clamp(BASE.oee + jitter(-2, 2), 50, 99).toFixed(1);
  const ausbringung = Math.round(
    clamp(BASE.ausbringung + jitter(-10, 10), 900, 1300)
  );
  const ausfallzeit = Math.round(
    clamp(BASE.ausfallzeit + jitter(-5, 5), 0, 180)
  );
  const ausschussquote = +clamp(
    BASE.ausschussquote + jitter(-0.2, 0.2),
    0,
    10
  ).toFixed(1);

  const oeeTrend = +(oee - BASE.oee).toFixed(1);
  const ausbringungTrend = +(
    ((ausbringung - BASE.ausbringung) / BASE.ausbringung) *
    100
  ).toFixed(1);
  const ausfallzeitTrend = +(
    ((ausfallzeit - BASE.ausfallzeit) / BASE.ausfallzeit) *
    100
  ).toFixed(1);
  const ausschussTrend = +(ausschussquote - BASE.ausschussquote).toFixed(1);

  return [
    {
      label: "OEE",
      value: `${oee.toFixed(1)}%`,
      sub: "Gesamtanlageneffektivität",
      trend: oeeTrend,
    },
    {
      label: "Ausbringung",
      value: ausbringung.toLocaleString("de-DE"),
      sub: "Ziel: 1.300 Teile",
      trend: ausbringungTrend,
    },
    {
      label: "Ausfallzeit",
      value: `${ausfallzeit} min`,
      sub: "Ungeplante Stillstände",
      trend: ausfallzeitTrend,
    },
    {
      label: "Ausschussquote",
      value: `${ausschussquote.toFixed(1).replace(".", ",")}%`,
      sub: `Qualitätsrate ${(100 - ausschussquote).toFixed(1).replace(".", ",")}%`,
      trend: ausschussTrend,
    },
  ];
}

export async function GET(): Promise<Response> {
  const data: DashboardData = {
    kpis: buildKPIs(),           // Math.random() → always dynamic, never prerendered
    machines: machineData,
    inventory: inventoryData,
    defects: defectData,
    alerts: alertsData,
    fetchedAt: new Date().toISOString(),
  };

  return Response.json(data);
}
