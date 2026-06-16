export const kpiData = [
  { label: "OEE", value: "81%", sub: "Gesamtanlageneffektivität", trend: +2.1 },
  { label: "Ausbringung", value: "1.247", sub: "Ziel: 1.300 Teile", trend: -4.1 },
  { label: "Ausfallzeit", value: "38 min", sub: "Ungeplante Stillstände", trend: +12 },
  { label: "Ausschussquote", value: "1,8%", sub: "Qualitätsrate 98,2%", trend: +0.3 },
];

export const machineData = [
  { name: "CNC-01", value: 92 },
  { name: "CNC-02", value: 87 },
  { name: "Fräs-01", value: 74 },
  { name: "Fräs-02", value: 61 },
  { name: "Dreh-01", value: 33 },
  { name: "Montage", value: 95 },
];

export const inventoryData = [
  { id: "MAT-4471", name: "Getriebegehäuse", bestand: 342, status: "OK" },
  { id: "MAT-4512", name: "Kurbelwelle A3", bestand: 58, status: "Niedrig" },
  { id: "MAT-3891", name: "Lagerring 60mm", bestand: 12, status: "Kritisch" },
  { id: "MAT-5023", name: "Dichtungsset V2", bestand: 280, status: "OK" },
  { id: "MAT-4788", name: "Schraubenset M12", bestand: 31, status: "Niedrig" },
];

export const defectData = [
  { type: "Maßabweichung", count: 9, trend: "up" },
  { type: "Oberflächenfehler", count: 6, trend: "down" },
  { type: "Montagefehler", count: 5, trend: "down" },
  { type: "Risse/Bruch", count: 2, trend: "up" },
];

export const alertsData = [
  {
    id: 1,
    severity: "rot",
    message: "Dreh-01 — Maschinenausfall (Stillstand)",
    time: "08:14 Uhr",
  },
  {
    id: 2,
    severity: "orange",
    message: "Fräs-02 — Werkzeugverschleiß kritisch",
    time: "09:02 Uhr",
  },
  {
    id: 3,
    severity: "orange",
    message: "Ausschussquote Schicht B überschritten",
    time: "10:31 Uhr",
  },
];
