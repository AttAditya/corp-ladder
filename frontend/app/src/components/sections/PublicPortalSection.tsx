import { useState } from "preact/hooks";
import { Surface } from "@/components/ui/Surface";
import { useAppModel } from "@/contexts/app-context";
import type { CompanyCreateRequest } from "@/interfaces/organization";

const emptyCompanyForm: CompanyCreateRequest = {
  admin: {
    id: "",
    name: "",
    password: "",
    role: ""
  },
  id: "",
  name: "",
  password: ""
};

export function PublicPortalSection() {
  const {
    actionError,
    activeCompany,
    companies,
    companiesStatus,
    createCompany,
    loginCompany,
    loginEmployee,
    pageError,
    pendingAction,
    refreshCompanies,
    selectPublicCompany,
    workspaceStatus
  } = useAppModel();

  const [companyForm, setCompanyForm] = useState<CompanyCreateRequest>(emptyCompanyForm);
  const [employeeId, setEmployeeId] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");

  const handleCompanyCreate = async () => {
    await createCompany({
      admin: {
        ...companyForm.admin,
        id: companyForm.admin.id.trim(),
        name: companyForm.admin.name.trim(),
        password: companyForm.admin.password,
        role: companyForm.admin.role.trim()
      },
      id: companyForm.id.trim(),
      name: companyForm.name.trim(),
      password: companyForm.password
    });

    setCompanyForm(emptyCompanyForm);
  };

  return (
    <div className="page-stack">
      <section className="hero hero--ops">
        <div className="hero__copy">
          <span className="eyebrow">v1 control surface</span>
          <h1>Run the org chart from the frontend, against the existing API.</h1>
          <p>
            Every current backend v1 ability is exposed here except modular feature packages: company signup, employee
            and company auth, roles, employee lifecycle, reporting lines, and read-only company browsing.
          </p>
          <div className="hero__metrics">
            <div className="metric-chip">
              <strong>{companies.length}</strong>
              <span>companies</span>
            </div>
            <div className="metric-chip">
              <strong>{activeCompany?.employees.length ?? 0}</strong>
              <span>visible employees</span>
            </div>
            <div className="metric-chip">
              <strong>{activeCompany?.roles.length ?? 0}</strong>
              <span>visible roles</span>
            </div>
          </div>
        </div>
        <Surface className="hero-panel hero-panel--status">
          <span className="eyebrow">Public mode</span>
          <h2>Browse companies or sign in.</h2>
          <p>Unauthenticated users can inspect companies. Mutations unlock after employee auth, while company auth stays read-only by backend design.</p>
          <div className="status-list">
            <div className="status-row">
              <span>Companies</span>
              <strong>{companiesStatus}</strong>
            </div>
            <div className="status-row">
              <span>Preview</span>
              <strong>{workspaceStatus}</strong>
            </div>
            <div className="status-row">
              <span>Action</span>
              <strong>{pendingAction ?? "idle"}</strong>
            </div>
          </div>
          <button className="button button--secondary" onClick={() => void refreshCompanies()} type="button">
            Refresh catalog
          </button>
        </Surface>
      </section>

      {(pageError || actionError) && (
        <Surface className="notice-panel notice-panel--error">
          <strong>Request issue</strong>
          <p>{actionError ?? pageError}</p>
        </Surface>
      )}

      <div className="content-grid">
        <div className="content-grid__main">
          <Surface className="stack-panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Directory</span>
                <h2>Companies</h2>
              </div>
              <span>{companies.length === 0 ? "No companies yet" : `${companies.length} available`}</span>
            </div>
            <div className="company-list">
              {companies.map((company) => (
                <button
                  className={[
                    "company-card",
                    activeCompany?.company.id === company.id ? "company-card--active" : ""
                  ].filter(Boolean).join(" ")}
                  key={company.id}
                  onClick={() => {
                    void selectPublicCompany(company.id);
                  }}
                  type="button"
                >
                  <strong>{company.name}</strong>
                  <span>{company.id}</span>
                  <small>{company.board.length} board members</small>
                </button>
              ))}
              {companies.length === 0 && <p className="muted-copy">Create the first company to seed the directory and bootstrap the admin session.</p>}
            </div>
          </Surface>

          <Surface className="stack-panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Preview</span>
                <h2>{activeCompany?.company.name ?? "No company selected"}</h2>
              </div>
              {activeCompany && <span>{activeCompany.company.id}</span>}
            </div>

            {activeCompany ? (
              <>
                <div className="stats-grid stats-grid--dense">
                  <div className="stat-block">
                    <strong>{activeCompany.boardMembers.length}</strong>
                    <span>board members</span>
                  </div>
                  <div className="stat-block">
                    <strong>{activeCompany.employees.length}</strong>
                    <span>employees</span>
                  </div>
                  <div className="stat-block">
                    <strong>{activeCompany.roles.length}</strong>
                    <span>roles</span>
                  </div>
                </div>

                <div className="preview-columns">
                  <div className="preview-column">
                    <h3>Board</h3>
                    <div className="pill-list">
                      {activeCompany.boardMembers.map((employee) => (
                        <span className="pill" key={employee.id}>
                          {employee.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="preview-column">
                    <h3>Roles</h3>
                    <div className="role-grid">
                      {activeCompany.roles.map((role) => (
                        <div className="role-card role-card--compact" key={role.id}>
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
                  </div>
                </div>

                <div className="employee-list employee-list--preview">
                  {activeCompany.employees.map((employee) => (
                    <div className="employee-card employee-card--preview" key={employee.id}>
                      <div className="employee-card__summary">
                        <div>
                          <strong>{employee.name}</strong>
                          <span>{employee.id}</span>
                        </div>
                        <span>{employee.role}</span>
                      </div>
                      <p className="muted-copy">
                        Reports to {employee.managerName ?? "board"} and manages {employee.directReportCount} people.
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="muted-copy">Pick a company from the directory to inspect its public org data.</p>
            )}
          </Surface>
        </div>

        <div className="content-grid__side">
          <Surface className="stack-panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Bootstrap</span>
                <h2>Create company</h2>
              </div>
              <span>Returns an employee admin session</span>
            </div>
            <form
              className="form-grid"
              onSubmit={(event) => {
                event.preventDefault();
                void handleCompanyCreate();
              }}
            >
              <label className="field">
                <span>Company id</span>
                <input
                  onInput={(event) => setCompanyForm((current) => ({ ...current, id: event.currentTarget.value }))}
                  placeholder="acme"
                  required
                  value={companyForm.id}
                />
              </label>
              <label className="field">
                <span>Company name</span>
                <input
                  onInput={(event) => setCompanyForm((current) => ({ ...current, name: event.currentTarget.value }))}
                  placeholder="Acme Corp"
                  required
                  value={companyForm.name}
                />
              </label>
              <label className="field">
                <span>Company password</span>
                <input
                  onInput={(event) => setCompanyForm((current) => ({ ...current, password: event.currentTarget.value }))}
                  required
                  type="password"
                  value={companyForm.password}
                />
              </label>
              <label className="field">
                <span>Admin id</span>
                <input
                  onInput={(event) => {
                    const value = event.currentTarget.value;
                    setCompanyForm((current) => ({ ...current, admin: { ...current.admin, id: value } }));
                  }}
                  placeholder="ceo-1"
                  required
                  value={companyForm.admin.id}
                />
              </label>
              <label className="field">
                <span>Admin name</span>
                <input
                  onInput={(event) => {
                    const value = event.currentTarget.value;
                    setCompanyForm((current) => ({ ...current, admin: { ...current.admin, name: value } }));
                  }}
                  placeholder="Avery Stone"
                  required
                  value={companyForm.admin.name}
                />
              </label>
              <label className="field">
                <span>Admin role title</span>
                <input
                  onInput={(event) => {
                    const value = event.currentTarget.value;
                    setCompanyForm((current) => ({ ...current, admin: { ...current.admin, role: value } }));
                  }}
                  placeholder="Chief Executive Officer"
                  required
                  value={companyForm.admin.role}
                />
              </label>
              <label className="field">
                <span>Admin password</span>
                <input
                  onInput={(event) => {
                    const value = event.currentTarget.value;
                    setCompanyForm((current) => ({ ...current, admin: { ...current.admin, password: value } }));
                  }}
                  required
                  type="password"
                  value={companyForm.admin.password}
                />
              </label>
              <button className="button" type="submit">
                Create company
              </button>
            </form>
          </Surface>

          <Surface className="stack-panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Auth</span>
                <h2>Employee login</h2>
              </div>
              <span>Full mutation access depends on permissions</span>
            </div>
            <form
              className="form-grid"
              onSubmit={(event) => {
                event.preventDefault();
                console.debug("[FORM] Employee login form submitted", { employeeId: employeeId.trim() });
                void loginEmployee({
                  employee_id: employeeId.trim(),
                  password: employeePassword
                });
              }}
            >
              <label className="field">
                <span>Employee id</span>
                <input onInput={(event) => setEmployeeId(event.currentTarget.value)} required value={employeeId} />
              </label>
              <label className="field">
                <span>Password</span>
                <input onInput={(event) => setEmployeePassword(event.currentTarget.value)} required type="password" value={employeePassword} />
              </label>
              <button className="button" type="submit">
                Sign in as employee
              </button>
            </form>
          </Surface>

          <Surface className="stack-panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Auth</span>
                <h2>Company login</h2>
              </div>
              <span>Useful for read-only company sessions</span>
            </div>
            <form
              className="form-grid"
              onSubmit={(event) => {
                event.preventDefault();
                console.debug("[FORM] Company login form submitted", { companyId: companyId.trim() });
                void loginCompany({
                  company_id: companyId.trim(),
                  password: companyPassword
                });
              }}
            >
              <label className="field">
                <span>Company id</span>
                <input onInput={(event) => setCompanyId(event.currentTarget.value)} required value={companyId} />
              </label>
              <label className="field">
                <span>Password</span>
                <input onInput={(event) => setCompanyPassword(event.currentTarget.value)} required type="password" value={companyPassword} />
              </label>
              <button className="button button--secondary" type="submit">
                Sign in as company
              </button>
            </form>
          </Surface>
        </div>
      </div>
    </div>
  );
}
