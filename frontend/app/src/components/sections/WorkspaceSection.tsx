import { useEffect, useState } from "preact/hooks";
import { Surface } from "@/components/ui/Surface";
import { useAppModel } from "@/contexts/app-context";
import type { EmployeeViewModel } from "@/interfaces/app";
import { knownPermissions, type EmployeeCreateRequest, type EmployeeUpdateRequest, type Permission } from "@/interfaces/organization";

function hasPermission(permissions: Permission[], permission: Permission): boolean {
  return permissions.includes(permission);
}

function toFieldValue(value: string | null | undefined): string {
  return value ?? "";
}

interface EmployeeCardProps {
  canAssign: boolean;
  canManage: boolean;
  canRemove: boolean;
  canUpdateOthers: boolean;
  currentEmployeeId: string | null;
  employee: EmployeeViewModel;
  employees: EmployeeViewModel[];
  onAssignRole: (employeeId: string, roleId: string) => Promise<void>;
  onChangeManager: (employeeId: string, managerId: string | null) => Promise<void>;
  onRemove: (employeeId: string) => Promise<void>;
  onRevokeRole: (employeeId: string, roleId: string) => Promise<void>;
  onUpdate: (employeeId: string, payload: EmployeeUpdateRequest) => Promise<void>;
  roles: string[];
}

function EmployeeCard({
  canAssign,
  canManage,
  canRemove,
  canUpdateOthers,
  currentEmployeeId,
  employee,
  employees,
  onAssignRole,
  onChangeManager,
  onRemove,
  onRevokeRole,
  onUpdate,
  roles
}: EmployeeCardProps) {
  const [name, setName] = useState(employee.name);
  const [roleTitle, setRoleTitle] = useState(employee.role);
  const [password, setPassword] = useState("");
  const [managerId, setManagerId] = useState(toFieldValue(employee.reports));
  const [roleId, setRoleId] = useState("");
  const [localMessage, setLocalMessage] = useState<string | null>(null);

  useEffect(() => {
    setName(employee.name);
    setRoleTitle(employee.role);
    setPassword("");
    setManagerId(toFieldValue(employee.reports));
    setRoleId("");
    setLocalMessage(null);
  }, [employee.id, employee.name, employee.reports, employee.role, employee.roles.join(",")]);

  const canUpdateSelf = currentEmployeeId === employee.id;
  const canUpdate = canUpdateSelf || canUpdateOthers;
  const canMutateRoles = canAssign && currentEmployeeId !== employee.id;
  const canMutateAssignedRoles = canAssign && currentEmployeeId !== employee.id;
  const availableManagers = employees.filter((candidate) => candidate.id !== employee.id);
  const assignableRoles = roles.filter((candidateRole) => !employee.roles.includes(candidateRole));

  return (
    <div className="employee-card">
      <div className="employee-card__summary">
        <div>
          <strong>{employee.name}</strong>
          <span>{employee.id}</span>
        </div>
        <span>{employee.role}</span>
      </div>

      <div className="employee-card__meta">
        <span>Reports to {employee.managerName ?? "board"}</span>
        <span>{employee.directReportCount} direct reports</span>
        <span>{employee.isBoardMember ? "Board" : `Level ${employee.level + 1}`}</span>
      </div>

      <div className="pill-list">
        {employee.roles.length === 0 && <span className="pill">no assigned roles</span>}
        {employee.roles.map((assignedRole) => (
          <span className="pill" key={assignedRole}>
            {assignedRole}
            {canMutateAssignedRoles && (
              <button
                className="pill__action"
                onClick={() => {
                  void onRevokeRole(employee.id, assignedRole);
                }}
                type="button"
              >
                remove
              </button>
            )}
          </span>
        ))}
      </div>

      <div className="pill-list">
        {employee.permissions.length === 0 && <span className="pill pill--muted">no effective permissions</span>}
        {employee.permissions.map((permission) => (
          <span className="pill pill--accent" key={permission}>
            {permission}
          </span>
        ))}
      </div>

      {localMessage && <p className="muted-copy">{localMessage}</p>}

      <div className="employee-card__forms">
        <form
          className="mini-form"
          onSubmit={(event) => {
            event.preventDefault();

            const payload: EmployeeUpdateRequest = {};
            const trimmedName = name.trim();
            const trimmedRole = roleTitle.trim();

            if (trimmedName !== employee.name) {
              payload.name = trimmedName;
            }

            if (trimmedRole !== employee.role) {
              payload.role = trimmedRole;
            }

            if (password.trim()) {
              payload.password = password;
            }

            if (!canUpdate) {
              setLocalMessage("You cannot update this employee.");
              return;
            }

            if (Object.keys(payload).length === 0) {
              setLocalMessage("No employee changes to save.");
              return;
            }

            setLocalMessage(null);
            void onUpdate(employee.id, payload).then(() => {
              setPassword("");
              setLocalMessage("Employee updated.");
            }).catch(() => undefined);
          }}
        >
          <label className="field">
            <span>Name</span>
            <input disabled={!canUpdate} onInput={(event) => setName(event.currentTarget.value)} value={name} />
          </label>
          <label className="field">
            <span>Role title</span>
            <input disabled={!canUpdate} onInput={(event) => setRoleTitle(event.currentTarget.value)} value={roleTitle} />
          </label>
          <label className="field">
            <span>New password</span>
            <input
              disabled={!canUpdate}
              onInput={(event) => setPassword(event.currentTarget.value)}
              placeholder="Leave blank to keep current"
              type="password"
              value={password}
            />
          </label>
          <button className="button button--secondary" disabled={!canUpdate} type="submit">
            Save employee
          </button>
        </form>

        <form
          className="mini-form"
          onSubmit={(event) => {
            event.preventDefault();

            if (!canManage) {
              setLocalMessage("You do not have manage permission.");
              return;
            }

            if (managerId === toFieldValue(employee.reports)) {
              setLocalMessage("Manager did not change.");
              return;
            }

            setLocalMessage(null);
            void onChangeManager(employee.id, managerId || null).then(() => {
              setLocalMessage("Reporting line updated.");
            }).catch(() => undefined);
          }}
        >
          <label className="field">
            <span>Manager</span>
            <select disabled={!canManage} onInput={(event) => setManagerId(event.currentTarget.value)} value={managerId}>
              <option value="">Board / none</option>
              {availableManagers.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name} ({candidate.id})
                </option>
              ))}
            </select>
          </label>
          <button className="button button--secondary" disabled={!canManage} type="submit">
            Update manager
          </button>
        </form>

        <form
          className="mini-form"
          onSubmit={(event) => {
            event.preventDefault();

            if (!canMutateRoles) {
              setLocalMessage("You cannot assign roles to this employee.");
              return;
            }

            if (!roleId) {
              setLocalMessage("Pick a role to assign.");
              return;
            }

            setLocalMessage(null);
            void onAssignRole(employee.id, roleId).then(() => {
              setRoleId("");
              setLocalMessage("Role assigned.");
            }).catch(() => undefined);
          }}
        >
          <label className="field">
            <span>Assign role</span>
            <select disabled={!canMutateRoles} onInput={(event) => setRoleId(event.currentTarget.value)} value={roleId}>
              <option value="">Select role</option>
              {assignableRoles.map((candidateRole) => (
                <option key={candidateRole} value={candidateRole}>
                  {candidateRole}
                </option>
              ))}
            </select>
          </label>
          <button className="button button--secondary" disabled={!canMutateRoles} type="submit">
            Assign role
          </button>
        </form>
      </div>

      <button
        className="button button--danger"
        disabled={!canRemove || currentEmployeeId === employee.id}
        onClick={() => {
          if (!canRemove || currentEmployeeId === employee.id) {
            return;
          }

          if (!window.confirm(`Remove ${employee.name} from ${employee.company_id}?`)) {
            return;
          }

          void onRemove(employee.id);
        }}
        type="button"
      >
        Remove employee
      </button>
    </div>
  );
}

export function WorkspaceSection() {
  const {
    actionError,
    activeCompany,
    currentEmployeeId,
    isEmployeeSession,
    logout,
    pageError,
    pendingAction,
    permissions,
    refreshWorkspace,
    removeEmployee,
    revokeRole,
    session,
    updateCompany,
    updateEmployee,
    assignRole,
    changeManager,
    createEmployee,
    createRole,
    workspaceStatus
  } = useAppModel();

  const [companyName, setCompanyName] = useState(activeCompany?.company.name ?? "");
  const [companyPassword, setCompanyPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);
  const [employeeForm, setEmployeeForm] = useState<EmployeeCreateRequest>({
    company_id: activeCompany?.company.id ?? "",
    id: "",
    name: "",
    password: "",
    reports: null,
    role: ""
  });

  useEffect(() => {
    setCompanyName(activeCompany?.company.name ?? "");
    setCompanyPassword("");
    setEmployeeForm({
      company_id: activeCompany?.company.id ?? "",
      id: "",
      name: "",
      password: "",
      reports: null,
      role: ""
    });
  }, [activeCompany?.company.id, activeCompany?.company.name]);

  if (!session || !activeCompany) {
    return (
      <Surface className="notice-panel">
        <strong>No active session</strong>
        <p>Sign in to load the authenticated workspace.</p>
      </Surface>
    );
  }

  const canInvite = isEmployeeSession && hasPermission(permissions, "invite");
  const canManage = isEmployeeSession && hasPermission(permissions, "manage");
  const canAssign = isEmployeeSession && hasPermission(permissions, "assign");
  const canRemove = isEmployeeSession && hasPermission(permissions, "remove");
  const canUpdateOthers = isEmployeeSession && hasPermission(permissions, "update");
  const canUpdateCompany = isEmployeeSession && hasPermission(permissions, "update");
  const roleIds = activeCompany.roles.map((role) => role.id);

  const togglePermission = (permission: Permission) => {
    setSelectedPermissions((current) => (
      current.includes(permission)
        ? current.filter((entry) => entry !== permission)
        : [...current, permission]
    ));
  };

  return (
    <div className="page-stack">
      <section className="hero hero--workspace">
        <div className="hero__copy">
          <span className="eyebrow">{session.principal_type} session</span>
          <h1>{activeCompany.company.name}</h1>
          <p>
            Manage employees, reporting lines, roles, and company settings from one place. The API remains unchanged;
            this UI now consumes the existing v1 routes directly.
          </p>
          <div className="hero__metrics">
            <div className="metric-chip">
              <strong>{activeCompany.employees.length}</strong>
              <span>employees</span>
            </div>
            <div className="metric-chip">
              <strong>{activeCompany.boardMembers.length}</strong>
              <span>board</span>
            </div>
            <div className="metric-chip">
              <strong>{activeCompany.roles.length}</strong>
              <span>roles</span>
            </div>
          </div>
        </div>
        <Surface className="hero-panel hero-panel--status">
          <span className="eyebrow">Session</span>
          <h2>{session.company_id}</h2>
          <div className="status-list">
            <div className="status-row">
              <span>Workspace</span>
              <strong>{workspaceStatus}</strong>
            </div>
            <div className="status-row">
              <span>Principal</span>
              <strong>{session.principal_type}</strong>
            </div>
            <div className="status-row">
              <span>Current action</span>
              <strong>{pendingAction ?? "idle"}</strong>
            </div>
          </div>
          <div className="hero-panel__actions">
            <button className="button button--secondary" onClick={() => void refreshWorkspace()} type="button">
              Refresh
            </button>
            <button className="button" onClick={() => void logout()} type="button">
              Logout
            </button>
          </div>
        </Surface>
      </section>

      {(pageError || actionError) && (
        <Surface className="notice-panel notice-panel--error">
          <strong>Request issue</strong>
          <p>{actionError ?? pageError}</p>
        </Surface>
      )}

      <Surface className="stack-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Access</span>
            <h2>Effective permissions</h2>
          </div>
          <span>{currentEmployeeId ?? session.company_id}</span>
        </div>
        <div className="pill-list">
          {permissions.length === 0 && <span className="pill pill--muted">read-only session</span>}
          {permissions.map((permission) => (
            <span className="pill pill--accent" key={permission}>
              {permission}
            </span>
          ))}
        </div>
        {!isEmployeeSession && (
          <p className="muted-copy">Company sessions can browse the workspace and use `/auth/me` plus logout, but mutations require an employee session with the relevant permissions.</p>
        )}
      </Surface>

      <div className="workspace-grid">
        <Surface className="stack-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Company</span>
              <h2>Settings</h2>
            </div>
            <span>{activeCompany.company.id}</span>
          </div>
          <form
            className="form-grid"
            onSubmit={(event) => {
              event.preventDefault();

              const payload: { name?: string; password?: string } = {};
              const trimmedName = companyName.trim();

              if (trimmedName && trimmedName !== activeCompany.company.name) {
                payload.name = trimmedName;
              }

              if (companyPassword.trim()) {
                payload.password = companyPassword;
              }

              if (!canUpdateCompany) {
                return;
              }

              if (Object.keys(payload).length === 0) {
                return;
              }

              void updateCompany(payload).then(() => {
                setCompanyPassword("");
              }).catch(() => undefined);
            }}
          >
            <label className="field">
              <span>Company name</span>
              <input disabled={!canUpdateCompany} onInput={(event) => setCompanyName(event.currentTarget.value)} value={companyName} />
            </label>
            <label className="field">
              <span>Rotate company password</span>
              <input
                disabled={!canUpdateCompany}
                onInput={(event) => setCompanyPassword(event.currentTarget.value)}
                placeholder="New company password"
                type="password"
                value={companyPassword}
              />
            </label>
            <button className="button button--secondary" disabled={!canUpdateCompany} type="submit">
              Save company
            </button>
          </form>
        </Surface>

        <Surface className="stack-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Hierarchy</span>
              <h2>Board</h2>
            </div>
            <span>{activeCompany.boardMembers.length} members</span>
          </div>
          <div className="employee-list employee-list--preview">
            {activeCompany.boardMembers.map((employee) => (
              <div className="employee-card employee-card--preview" key={employee.id}>
                <div className="employee-card__summary">
                  <div>
                    <strong>{employee.name}</strong>
                    <span>{employee.id}</span>
                  </div>
                  <span>{employee.role}</span>
                </div>
                <p className="muted-copy">{employee.directReportCount} direct reports and {employee.roles.length} assigned roles.</p>
              </div>
            ))}
          </div>
        </Surface>
      </div>

      <div className="workspace-grid">
        <Surface className="stack-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Roles</span>
              <h2>Role registry</h2>
            </div>
            <span>{activeCompany.roles.length} roles</span>
          </div>
          <div className="role-grid">
            {activeCompany.roles.map((role) => (
              <div className="role-card" key={role.id}>
                <strong>{role.id}</strong>
                <div className="pill-list">
                  {role.permissions.map((permission) => (
                    <span className="pill pill--accent" key={permission}>
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <form
            className="form-grid"
            onSubmit={(event) => {
              event.preventDefault();

              if (!canAssign || !roleId.trim()) {
                return;
              }

              void createRole({
                id: roleId.trim(),
                permissions: selectedPermissions
              }).then(() => {
                setRoleId("");
                setSelectedPermissions([]);
              }).catch(() => undefined);
            }}
          >
            <label className="field">
              <span>Role id</span>
              <input
                disabled={!canAssign}
                onInput={(event) => setRoleId(event.currentTarget.value)}
                placeholder="ops-manager"
                value={roleId}
              />
            </label>
            <div className="field field--full">
              <span>Permissions</span>
              <div className="checkbox-grid">
                {knownPermissions.map((permission) => (
                  <label className="checkbox" key={permission}>
                    <input
                      checked={selectedPermissions.includes(permission)}
                      disabled={!canAssign}
                      onInput={() => togglePermission(permission)}
                      type="checkbox"
                    />
                    <span>{permission}</span>
                  </label>
                ))}
              </div>
            </div>
            <button className="button button--secondary" disabled={!canAssign} type="submit">
              Save role
            </button>
          </form>
        </Surface>

        <Surface className="stack-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Hiring</span>
              <h2>Add employee</h2>
            </div>
            <span>Invite permission required</span>
          </div>
          <form
            className="form-grid"
            onSubmit={(event) => {
              event.preventDefault();

              if (!canInvite) {
                return;
              }

              void createEmployee({
                ...employeeForm,
                company_id: activeCompany.company.id,
                id: employeeForm.id.trim(),
                name: employeeForm.name.trim(),
                reports: employeeForm.reports || null,
                role: employeeForm.role.trim()
              }).then(() => {
                setEmployeeForm({
                  company_id: activeCompany.company.id,
                  id: "",
                  name: "",
                  password: "",
                  reports: null,
                  role: ""
                });
              }).catch(() => undefined);
            }}
          >
            <label className="field">
              <span>Employee id</span>
              <input
                disabled={!canInvite}
                onInput={(event) => setEmployeeForm((current) => ({ ...current, id: event.currentTarget.value }))}
                required
                value={employeeForm.id}
              />
            </label>
            <label className="field">
              <span>Name</span>
              <input
                disabled={!canInvite}
                onInput={(event) => setEmployeeForm((current) => ({ ...current, name: event.currentTarget.value }))}
                required
                value={employeeForm.name}
              />
            </label>
            <label className="field">
              <span>Role title</span>
              <input
                disabled={!canInvite}
                onInput={(event) => setEmployeeForm((current) => ({ ...current, role: event.currentTarget.value }))}
                required
                value={employeeForm.role}
              />
            </label>
            <label className="field">
              <span>Password</span>
              <input
                disabled={!canInvite}
                onInput={(event) => setEmployeeForm((current) => ({ ...current, password: event.currentTarget.value }))}
                required
                type="password"
                value={employeeForm.password}
              />
            </label>
            <label className="field">
              <span>Manager</span>
              <select
                disabled={!canInvite}
                onInput={(event) => {
                  const value = event.currentTarget.value;
                  setEmployeeForm((current) => ({ ...current, reports: value || null }));
                }}
                value={toFieldValue(employeeForm.reports)}
              >
                <option value="">Board / none</option>
                {activeCompany.employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} ({employee.id})
                  </option>
                ))}
              </select>
            </label>
            <button className="button button--secondary" disabled={!canInvite} type="submit">
              Add employee
            </button>
          </form>
        </Surface>
      </div>

      <Surface className="stack-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Employees</span>
            <h2>Org roster</h2>
          </div>
          <span>{activeCompany.employees.length} people</span>
        </div>
        <div className="employee-list">
          {activeCompany.employees.map((employee) => (
            <EmployeeCard
              canAssign={canAssign}
              canManage={canManage}
              canRemove={canRemove}
              canUpdateOthers={canUpdateOthers}
              currentEmployeeId={currentEmployeeId}
              employee={employee}
              employees={activeCompany.employees}
              key={employee.id}
              onAssignRole={async (employeeId, nextRoleId) => {
                if (!roleIds.includes(nextRoleId)) {
                  return;
                }

                await assignRole(employeeId, { role_id: nextRoleId });
              }}
              onChangeManager={async (employeeId, managerId) => {
                await changeManager(employeeId, { reports: managerId });
              }}
              onRemove={removeEmployee}
              onRevokeRole={revokeRole}
              onUpdate={updateEmployee}
              roles={roleIds}
            />
          ))}
        </div>
      </Surface>
    </div>
  );
}
