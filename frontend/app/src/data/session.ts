import { loginCompany, loginEmployee, logoutSession, readCurrentSession } from "@/api/auth";
import type { CompanyLoginRequest, SessionRecord, AuthResponse, EmployeeLoginRequest } from "@/interfaces/session";

export function restoreSession(token: string): Promise<SessionRecord> {
  return readCurrentSession(token).then((response) => response.session);
}

export function createEmployeeSession(payload: EmployeeLoginRequest): Promise<AuthResponse> {
  return loginEmployee(payload);
}

export function createCompanySession(payload: CompanyLoginRequest): Promise<AuthResponse> {
  return loginCompany(payload);
}

export function destroySession(token: string): Promise<void> {
  return logoutSession(token).then(() => undefined);
}
