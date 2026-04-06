import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";
import { getDashboardSnapshot } from "@/data/dashboard";
import type { DashboardSummary } from "@/interfaces/dashboard";
import { toDashboardSummary } from "@/transformers/dashboard";

type DashboardStatus = "loading" | "ready" | "error";

interface DashboardContextValue {
  errorMessage: string | null;
  refresh: () => Promise<void>;
  status: DashboardStatus;
  summary: DashboardSummary | null;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

interface DashboardProviderProps {
  children: ComponentChildren;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [status, setStatus] = useState<DashboardStatus>("loading");
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const refresh = async () => {
    setStatus("loading");
    setErrorMessage(null);

    try {
      const rawSnapshot = await getDashboardSnapshot(true);
      const nextSummary = toDashboardSummary(rawSnapshot);
      setSummary(nextSummary);
      setStatus("ready");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unknown request failure.");
    }
  };

  useEffect(() => {
    getDashboardSnapshot()
      .then((rawSnapshot) => {
        setSummary(toDashboardSummary(rawSnapshot));
        setStatus("ready");
      })
      .catch((error) => {
        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Unknown request failure.");
      });
  }, []);

  const value: DashboardContextValue = {
    errorMessage,
    refresh,
    status,
    summary
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const value = useContext(DashboardContext);

  if (!value) {
    throw new Error("useDashboard must be used within DashboardProvider.");
  }

  return value;
}
