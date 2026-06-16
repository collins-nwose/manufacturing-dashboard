"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { DashboardData } from "@/lib/types";

export type ConnectionStatus = "connecting" | "connected" | "disconnected";

export function useRealtimeData(initialData: DashboardData) {
  const [data, setData] = useState<DashboardData>(initialData);
  const [status, setStatus] = useState<ConnectionStatus>("connecting");

  const wsRef = useRef<WebSocket | null>(null);
  const retryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attemptRef = useRef(0);
  const mountedRef = useRef(true);

  const connect = useCallback(() => {
    if (!mountedRef.current) return;

    setStatus("connecting");

    const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(`${proto}//${window.location.host}/api/ws`);
    wsRef.current = ws;

    ws.onopen = () => {
      if (!mountedRef.current) return;
      setStatus("connected");
      attemptRef.current = 0;
    };

    ws.onmessage = (event) => {
      if (!mountedRef.current) return;
      try {
        const payload: DashboardData = JSON.parse(event.data as string);
        setData(payload);
      } catch {
        // Ignore malformed frames
      }
    };

    ws.onclose = () => {
      if (!mountedRef.current) return;
      setStatus("disconnected");
      // Exponential backoff: 1 s → 2 s → 4 s → … → 30 s max
      const delay = Math.min(1000 * Math.pow(2, attemptRef.current), 30_000);
      attemptRef.current += 1;
      retryTimer.current = setTimeout(connect, delay);
    };

    ws.onerror = () => {
      // onclose fires right after onerror, which handles the reconnect.
      ws.close();
    };
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    connect();

    return () => {
      mountedRef.current = false;
      wsRef.current?.close();
      if (retryTimer.current !== null) clearTimeout(retryTimer.current);
    };
  }, [connect]);

  return { data, status };
}
