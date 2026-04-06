import type { CompanyRecord, CompanyWorkspaceRecord, EmployeeRecord } from "@/interfaces/organization";

export interface EmployeeLoginRequest {
  employee_id: string;
  password: string;
}

export interface CompanyLoginRequest {
  company_id: string;
  password: string;
}

export interface EmployeeSession {
  company_id: string;
  employee: EmployeeRecord;
  principal_type: "employee";
}

export interface CompanySession {
  company: CompanyRecord;
  company_id: string;
  principal_type: "company";
}

export type SessionRecord = EmployeeSession | CompanySession;

export interface SessionResponse {
  session: SessionRecord;
}

export interface AuthResponse {
  session: SessionRecord;
  token: string;
}

export interface CompanyCreateResponse extends AuthResponse {
  company: CompanyWorkspaceRecord;
}
