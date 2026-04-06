import { createCompany, listCompanies, readCompany, updateCompany, upsertCompanyRole } from "@/api/company";
import {
  assignEmployeeRole,
  changeEmployeeManager,
  createEmployee,
  removeEmployee,
  updateEmployee,
  revokeEmployeeRole
} from "@/api/employee";
import type {
  CompanyCreateRequest,
  CompanyRecord,
  CompanyUpdateRequest,
  CompanyWorkspaceRecord,
  EmployeeCreateRequest,
  EmployeeUpdateRequest,
  ManagerUpdateRequest,
  RoleAssignmentRequest,
  RoleUpsertRequest
} from "@/interfaces/organization";
import type { CompanyCreateResponse } from "@/interfaces/session";

let companyCatalogCache: CompanyRecord[] | null = null;
let companyCatalogInFlight: Promise<CompanyRecord[]> | null = null;

const companyWorkspaceCache = new Map<string, CompanyWorkspaceRecord>();
const companyWorkspaceInFlight = new Map<string, Promise<CompanyWorkspaceRecord>>();

function primeWorkspace(company: CompanyWorkspaceRecord): CompanyWorkspaceRecord {
  companyWorkspaceCache.set(company.id, company);
  return company;
}

function invalidateCompany(companyId: string): void {
  companyWorkspaceCache.delete(companyId);
  companyWorkspaceInFlight.delete(companyId);
}

function invalidateCatalog(): void {
  companyCatalogCache = null;
  companyCatalogInFlight = null;
}

export async function getCompanyCatalog(forceRefresh = false): Promise<CompanyRecord[]> {
  if (!forceRefresh && companyCatalogCache) {
    return companyCatalogCache;
  }

  if (!forceRefresh && companyCatalogInFlight) {
    return companyCatalogInFlight;
  }

  companyCatalogInFlight = listCompanies()
    .then((response) => {
      companyCatalogCache = response.companies;
      companyCatalogInFlight = null;
      return response.companies;
    })
    .catch((error) => {
      companyCatalogInFlight = null;
      throw error;
    });

  return companyCatalogInFlight;
}

export async function getCompanyWorkspace(companyId: string, forceRefresh = false): Promise<CompanyWorkspaceRecord> {
  if (!forceRefresh && companyWorkspaceCache.has(companyId)) {
    return companyWorkspaceCache.get(companyId)!;
  }

  if (!forceRefresh && companyWorkspaceInFlight.has(companyId)) {
    return companyWorkspaceInFlight.get(companyId)!;
  }

  const request = readCompany(companyId)
    .then((response) => {
      companyWorkspaceInFlight.delete(companyId);
      return primeWorkspace(response.company);
    })
    .catch((error) => {
      companyWorkspaceInFlight.delete(companyId);
      throw error;
    });

  companyWorkspaceInFlight.set(companyId, request);
  return request;
}

export async function createCompanyAccount(payload: CompanyCreateRequest): Promise<CompanyCreateResponse> {
  const response = await createCompany(payload);
  invalidateCatalog();
  primeWorkspace(response.company);
  return response;
}

export async function updateCompanyAccount(companyId: string, payload: CompanyUpdateRequest, token: string): Promise<CompanyWorkspaceRecord> {
  const response = await updateCompany(companyId, payload, token);
  invalidateCatalog();
  return primeWorkspace(response.company);
}

export async function upsertRoleAndReload(companyId: string, payload: RoleUpsertRequest, token: string): Promise<CompanyWorkspaceRecord> {
  await upsertCompanyRole(companyId, payload, token);
  invalidateCompany(companyId);
  invalidateCatalog();
  return getCompanyWorkspace(companyId, true);
}

export async function createEmployeeAndReload(payload: EmployeeCreateRequest, token: string): Promise<CompanyWorkspaceRecord> {
  await createEmployee(payload, token);
  invalidateCompany(payload.company_id);
  invalidateCatalog();
  return getCompanyWorkspace(payload.company_id, true);
}

export async function updateEmployeeAndReload(
  employeeId: string,
  companyId: string,
  payload: EmployeeUpdateRequest,
  token: string
): Promise<CompanyWorkspaceRecord> {
  await updateEmployee(employeeId, payload, token);
  invalidateCompany(companyId);
  return getCompanyWorkspace(companyId, true);
}

export async function changeManagerAndReload(
  employeeId: string,
  companyId: string,
  payload: ManagerUpdateRequest,
  token: string
): Promise<CompanyWorkspaceRecord> {
  await changeEmployeeManager(employeeId, payload, token);
  invalidateCompany(companyId);
  invalidateCatalog();
  return getCompanyWorkspace(companyId, true);
}

export async function assignRoleAndReload(
  employeeId: string,
  companyId: string,
  payload: RoleAssignmentRequest,
  token: string
): Promise<CompanyWorkspaceRecord> {
  await assignEmployeeRole(employeeId, payload, token);
  invalidateCompany(companyId);
  return getCompanyWorkspace(companyId, true);
}

export async function revokeRoleAndReload(employeeId: string, companyId: string, roleId: string, token: string): Promise<CompanyWorkspaceRecord> {
  await revokeEmployeeRole(employeeId, roleId, token);
  invalidateCompany(companyId);
  return getCompanyWorkspace(companyId, true);
}

export async function removeEmployeeAndReload(employeeId: string, companyId: string, token: string): Promise<CompanyWorkspaceRecord> {
  await removeEmployee(employeeId, token);
  invalidateCompany(companyId);
  invalidateCatalog();
  return getCompanyWorkspace(companyId, true);
}
