export interface KPIItem {
  label: string;
  value: string;
  sub: string;
  trend: number;
}

export interface MachineItem {
  name: string;
  value: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  bestand: number;
  status: "OK" | "Niedrig" | "Kritisch";
}

export interface DefectItem {
  type: string;
  count: number;
  trend: "up" | "down";
}

export interface AlertItem {
  id: number;
  severity: string;
  message: string;
  time: string;
}

export interface DashboardData {
  kpis: KPIItem[];
  machines: MachineItem[];
  inventory: InventoryItem[];
  defects: DefectItem[];
  alerts: AlertItem[];
  fetchedAt: string;
}
