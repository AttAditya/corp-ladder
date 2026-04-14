import { requestJson } from "@/api/http";
import type {
  CompanyCreateRequest,
  CompanyListResponse,
  CompanyRolesResponse,
  CompanyUpdateRequest,
  CompanyWorkspaceResponse,
  RoleResponse,
  RoleUpsertRequest
} from "@/interfaces/organization";
import type { CompanyCreateResponse } from "@/interfaces/session";

function companyPath(companyId: string): string {
  return `/v1/company/${encodeURIComponent(companyId)}`;
}

export function listCompanies(): Promise<CompanyListResponse> {
  return requestJson<CompanyListResponse>("/v1/company");
}

export function readCompany(companyId: string): Promise<CompanyWorkspaceResponse> {
  return requestJson<CompanyWorkspaceResponse>(companyPath(companyId));
}

export function readCompanyRoles(companyId: string): Promise<CompanyRolesResponse> {
  return requestJson<CompanyRolesResponse>(`${companyPath(companyId)}/roles`);
}

export function createCompany(payload: CompanyCreateRequest): Promise<CompanyCreateResponse> {
  return requestJson<CompanyCreateResponse>("/v1/company", {
    json: payload,
    method: "POST"
  });
}

export function updateCompany(companyId: string, payload: CompanyUpdateRequest): Promise<CompanyWorkspaceResponse> {
  return requestJson<CompanyWorkspaceResponse>(companyPath(companyId), {
    json: payload,
    method: "PATCH"
  });
}

export function upsertCompanyRole(companyId: string, payload: RoleUpsertRequest): Promise<RoleResponse> {
  return requestJson<RoleResponse>(`${companyPath(companyId)}/roles`, {
    json: payload,
    method: "POST"
  });
}
