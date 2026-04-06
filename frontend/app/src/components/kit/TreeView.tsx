import type { EmployeeRecord } from "@/interfaces/organization";

interface TreeViewProps {
  employees: EmployeeRecord[];
  boardMembers: string[];
}

interface TreeNodeProps {
  employee: EmployeeRecord;
  employeeIndex: Record<string, EmployeeRecord>;
  level: number;
}

function TreeNode({ employee, employeeIndex, level }: TreeNodeProps) {
  const directReports = employee.reporting;
  const hasChildren = directReports.length > 0;

  return (
    <div className="tree-node">
      <div className="tree-node__content" style={{ paddingLeft: `${level * 1.5}rem` }}>
        <div className="tree-node__item">
          <span className="tree-node__name">{employee.name}</span>
          <span className="tree-node__role">{employee.role}</span>
          {directReports.length > 0 && (
            <span className="tree-node__count">({directReports.length} report{directReports.length !== 1 ? 's' : ''})</span>
          )}
        </div>
      </div>
      {hasChildren && (
        <div className="tree-node__children">
          {directReports.map((reportId) => {
            const report = employeeIndex[reportId];
            if (!report) return null;
            return (
              <TreeNode
                key={reportId}
                employee={report}
                employeeIndex={employeeIndex}
                level={level + 1}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export function TreeView({ employees, boardMembers }: TreeViewProps) {
  const employeeIndex: Record<string, EmployeeRecord> = {};
  employees.forEach((emp) => {
    employeeIndex[emp.id] = emp;
  });

  const rootEmployees = boardMembers
    .map((id) => employeeIndex[id])
    .filter((emp) => emp !== undefined);

  if (rootEmployees.length === 0) {
    return (
      <div className="tree-view">
        <p className="tree-view__empty">No employees in organization</p>
      </div>
    );
  }

  return (
    <div className="tree-view">
      {rootEmployees.map((employee) => (
        <TreeNode
          key={employee.id}
          employee={employee}
          employeeIndex={employeeIndex}
          level={0}
        />
      ))}
    </div>
  );
}
