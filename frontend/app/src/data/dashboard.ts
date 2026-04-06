import { requestJson } from "@/api/http";
import type { DashboardSnapshotResponse } from "@/interfaces/dashboard";

let cachedSnapshot: DashboardSnapshotResponse | null = null;
let inFlightRequest: Promise<DashboardSnapshotResponse> | null = null;

export async function getDashboardSnapshot(forceRefresh = false): Promise<DashboardSnapshotResponse> {
  if (!forceRefresh && cachedSnapshot) {
    return cachedSnapshot;
  }

  if (!forceRefresh && inFlightRequest) {
    return inFlightRequest;
  }

  inFlightRequest = requestJson<DashboardSnapshotResponse>("/").then((snapshot) => {
    cachedSnapshot = snapshot;
    inFlightRequest = null;
    return snapshot;
  }).catch((error) => {
    inFlightRequest = null;
    throw error;
  });

  return inFlightRequest;
}
