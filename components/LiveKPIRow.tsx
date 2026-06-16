"use client";

import { useState } from "react";
import { useInterval } from "@/hooks/useInterval";
import KPICard from "@/components/KPICard";

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

export default function LiveKPIRow() {
  const [oee, setOee] = useState(BASE.oee);
  const [ausbringung, setAusbringung] = useState(BASE.ausbringung);
  const [ausfallzeit, setAusfallzeit] = useState(BASE.ausfallzeit);
  const [ausschussquote, setAusschussquote] = useState(BASE.ausschussquote);

  useInterval(() => {
    setOee((v) => +clamp(v + jitter(-2, 2), 50, 99).toFixed(1));
    setAusbringung((v) =>
      Math.round(clamp(v + jitter(-10, 10), 900, 1300))
    );
    setAusfallzeit((v) =>
      Math.round(clamp(v + jitter(-5, 5), 0, 180))
    );
    setAusschussquote((v) =>
      +clamp(v + jitter(-0.2, 0.2), 0, 10).toFixed(1)
    );
  }, 5000);

  const pctDelta = (current: number, base: number) =>
    +((current - base) / base * 100).toFixed(1);

  const kpis = [
    {
      label: "OEE",
      value: `${oee.toFixed(1)}%`,
      sub: "Gesamtanlageneffektivität",
      trend: +(oee - BASE.oee).toFixed(1),
    },
    {
      label: "Ausbringung",
      value: ausbringung.toLocaleString("de-DE"),
      sub: "Ziel: 1.300 Teile",
      trend: pctDelta(ausbringung, BASE.ausbringung),
    },
    {
      label: "Ausfallzeit",
      value: `${ausfallzeit} min`,
      sub: "Ungeplante Stillstände",
      trend: pctDelta(ausfallzeit, BASE.ausfallzeit),
    },
    {
      label: "Ausschussquote",
      value: `${ausschussquote.toFixed(1).replace(".", ",")}%`,
      sub: `Qualitätsrate ${(100 - ausschussquote).toFixed(1).replace(".", ",")}%`,
      trend: +(ausschussquote - BASE.ausschussquote).toFixed(1),
    },
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi) => (
        <KPICard key={kpi.label} {...kpi} />
      ))}
    </section>
  );
}
