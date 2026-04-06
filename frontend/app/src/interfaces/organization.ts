export const knownPermissions = ["invite", "manage", "assign", "revoke", "remove", "update"] as const;

export type Permission = (typeof knownPermissions)[number];

export interface RoleRecord {
  id: string;
  permissions: Permission[];
}

export interface EmployeeRecord {
  company_id: string;
  id: string;
  name: string;
  permissions: Permission[];
  reporting: string[];
  reports: string | null;
  role: string;
  roles: string[];
}

export interface CompanyRecord {
  board: string[];
  id: string;
  name: string;
}

export interface CompanyWorkspaceRecord extends CompanyRecord {
  employees: EmployeeRecord[];
  roles: RoleRecord[];
}

export interface CompanyListResponse {
  companies: CompanyRecord[];
}

export interface CompanyWorkspaceResponse {
  company: CompanyWorkspaceRecord;
}

export interface CompanyRolesResponse {
  roles: RoleRecord[];
}

export interface RoleResponse {
  role: RoleRecord;
}

export interface EmployeeListResponse {
  employees: EmployeeRecord[];
}

export interface EmployeeResponse {
  employee: EmployeeRecord;
}

export interface RemoveEmployeeResponse {
  removed_employee_id: string;
}

export interface CompanyAdminCreateRequest {
  id: string;
  name: string;
  password: string;
  role: string;
}

export interface CompanyCreateRequest {
  admin: CompanyAdminCreateRequest;
  id: string;
  name: string;
  password: string;
}

export interface CompanyUpdateRequest {
  name?: string;
  password?: string;
}

export interface RoleUpsertRequest {
  id: string;
  permissions: Permission[];
}

export interface EmployeeCreateRequest {
  company_id: string;
  id: string;
  name: string;
  password: string;
  reports?: string | null;
  role: string;
}

export interface EmployeeUpdateRequest {
  name?: string;
  password?: string;
  role?: string;
}

export interface ManagerUpdateRequest {
  reports: string | null;
}

export interface RoleAssignmentRequest {
  role_id: string;
}

export interface FeatureRecord {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface FeaturesListResponse {
  features: FeatureRecord[];
}
