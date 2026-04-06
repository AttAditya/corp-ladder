import { requestJson } from "@/api/http";
import type { CompanyLoginRequest, SessionResponse, AuthResponse, EmployeeLoginRequest } from "@/interfaces/session";

export function loginEmployee(payload: EmployeeLoginRequest): Promise<AuthResponse> {
  return requestJson<AuthResponse>("/v1/auth/employee/login", {
    json: payload,
    method: "POST"
  });
}

export function loginCompany(payload: CompanyLoginRequest): Promise<AuthResponse> {
  return requestJson<AuthResponse>("/v1/auth/company/login", {
    json: payload,
    method: "POST"
  });
}

export function readCurrentSession(token: string): Promise<SessionResponse> {
  return requestJson<SessionResponse>("/v1/auth/me", {
    token
  });
}

export function logoutSession(token: string): Promise<{ ok: boolean }> {
  return requestJson<{ ok: boolean }>("/v1/auth/logout", {
    method: "POST",
    token
  });
}
