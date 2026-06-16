import type { ConnectionStatus } from "@/hooks/useRealtimeData";

const config: Record<
  ConnectionStatus,
  { dot: string; label: string; text: string }
> = {
  connected: {
    dot: "bg-emerald-500",
    label: "Verbunden",
    text: "text-emerald-400",
  },
  disconnected: {
    dot: "bg-red-500",
    label: "Getrennt",
    text: "text-red-400",
  },
  connecting: {
    dot: "bg-yellow-400 animate-pulse",
    label: "Verbindung...",
    text: "text-yellow-400",
  },
};

export default function ConnectionStatus({ status }: { status: ConnectionStatus }) {
  const { dot, label, text } = config[status];

  return (
    <span className={`flex items-center gap-1.5 text-xs font-medium ${text}`}>
      <span className={`inline-block w-2 h-2 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
