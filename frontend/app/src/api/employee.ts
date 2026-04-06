import { requestJson } from "@/api/http";
import type {
  EmployeeCreateRequest,
  EmployeeListResponse,
  EmployeeResponse,
  EmployeeUpdateRequest,
  ManagerUpdateRequest,
  RemoveEmployeeResponse,
  RoleAssignmentRequest
} from "@/interfaces/organization";

function employeePath(employeeId: string): string {
  return `/v1/employee/${encodeURIComponent(employeeId)}`;
}

export function listEmployees(companyId?: string): Promise<EmployeeListResponse> {
  const search = companyId ? `?company_id=${encodeURIComponent(companyId)}` : "";
  return requestJson<EmployeeListResponse>(`/v1/employee${search}`);
}

export function readEmployee(employeeId: string): Promise<EmployeeResponse> {
  return requestJson<EmployeeResponse>(employeePath(employeeId));
}

export function createEmployee(payload: EmployeeCreateRequest, token: string): Promise<EmployeeResponse> {
  return requestJson<EmployeeResponse>("/v1/employee", {
    json: payload,
    method: "POST",
    token
  });
}

export function updateEmployee(employeeId: string, payload: EmployeeUpdateRequest, token: string): Promise<EmployeeResponse> {
  return requestJson<EmployeeResponse>(employeePath(employeeId), {
    json: payload,
    method: "PATCH",
    token
  });
}

export function changeEmployeeManager(employeeId: string, payload: ManagerUpdateRequest, token: string): Promise<EmployeeResponse> {
  return requestJson<EmployeeResponse>(`${employeePath(employeeId)}/manager`, {
    json: payload,
    method: "PATCH",
    token
  });
}

export function assignEmployeeRole(employeeId: string, payload: RoleAssignmentRequest, token: string): Promise<EmployeeResponse> {
  return requestJson<EmployeeResponse>(`${employeePath(employeeId)}/roles`, {
    json: payload,
    method: "POST",
    token
  });
}

export function revokeEmployeeRole(employeeId: string, roleId: string, token: string): Promise<EmployeeResponse> {
  return requestJson<EmployeeResponse>(`${employeePath(employeeId)}/roles/${encodeURIComponent(roleId)}`, {
    method: "DELETE",
    token
  });
}

export function removeEmployee(employeeId: string, token: string): Promise<RemoveEmployeeResponse> {
  return requestJson<RemoveEmployeeResponse>(employeePath(employeeId), {
    method: "DELETE",
    token
  });
}
