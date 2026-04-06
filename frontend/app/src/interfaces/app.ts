import type { CompanyWorkspaceRecord, EmployeeRecord, RoleRecord } from "@/interfaces/organization";

export interface EmployeeViewModel extends EmployeeRecord {
  directReportCount: number;
  isBoardMember: boolean;
  level: number;
  managerName: string | null;
  roleLabels: string[];
}

export interface WorkspaceViewModel {
  boardMembers: EmployeeViewModel[];
  company: CompanyWorkspaceRecord;
  employeeIndex: Record<string, EmployeeViewModel>;
  employees: EmployeeViewModel[];
  roleIndex: Record<string, RoleRecord>;
  roles: RoleRecord[];
}
