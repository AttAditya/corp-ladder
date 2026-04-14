import { requestJson } from "@/api/http";
import type { FeaturesListResponse } from "@/interfaces/organization";

export function listFeatures(): Promise<FeaturesListResponse> {
  return requestJson<FeaturesListResponse>("/v1/features");
}
