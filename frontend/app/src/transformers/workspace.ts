import type { EmployeeViewModel, WorkspaceViewModel } from "@/interfaces/app";
import type { CompanyWorkspaceRecord, EmployeeRecord, RoleRecord } from "@/interfaces/organization";

function sortByName<T extends { name: string; id: string }>(left: T, right: T): number {
  return left.name.localeCompare(right.name) || left.id.localeCompare(right.id);
}

function getReportingLevel(employee: EmployeeRecord, employeeIndex: Record<string, EmployeeRecord>): number {
  let level = 0;
  let cursor = employee;
  const seen = new Set<string>([employee.id]);

  while (cursor.reports) {
    const manager = employeeIndex[cursor.reports];
    if (!manager || seen.has(manager.id)) {
      break;
    }

    seen.add(manager.id);
    cursor = manager;
    level += 1;
  }

  return level;
}

function toRoleIndex(roles: RoleRecord[]): Record<string, RoleRecord> {
  return roles.reduce<Record<string, RoleRecord>>((index, role) => {
    index[role.id] = role;
    return index;
  }, {});
}

export function toWorkspaceViewModel(company: CompanyWorkspaceRecord): WorkspaceViewModel {
  const roleIndex = toRoleIndex(company.roles);
  const rawEmployeeIndex = company.employees.reduce<Record<string, EmployeeRecord>>((index, employee) => {
    index[employee.id] = employee;
    return index;
  }, {});

  const employees = company.employees
    .map<EmployeeViewModel>((employee) => ({
      ...employee,
      directReportCount: employee.reporting.length,
      isBoardMember: company.board.includes(employee.id),
      level: getReportingLevel(employee, rawEmployeeIndex),
      managerName: employee.reports ? rawEmployeeIndex[employee.reports]?.name ?? employee.reports : null,
      roleLabels: employee.roles.map((roleId) => roleIndex[roleId]?.id ?? roleId)
    }))
    .sort((left, right) => left.level - right.level || sortByName(left, right));

  const employeeIndex = employees.reduce<Record<string, EmployeeViewModel>>((index, employee) => {
    index[employee.id] = employee;
    return index;
  }, {});

  return {
    boardMembers: company.board.map((employeeId) => employeeIndex[employeeId]).filter(Boolean),
    company,
    employeeIndex,
    employees,
    roleIndex,
    roles: company.roles
  };
}
