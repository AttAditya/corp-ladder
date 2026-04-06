import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";
import { ApiError } from "@/api/http";
import {
  assignRoleAndReload,
  changeManagerAndReload,
  createCompanyAccount,
  createEmployeeAndReload,
  getCompanyCatalog,
  getCompanyWorkspace,
  removeEmployeeAndReload,
  revokeRoleAndReload,
  updateCompanyAccount,
  updateEmployeeAndReload,
  upsertRoleAndReload
} from "@/data/organization";
import { createCompanySession, createEmployeeSession, destroySession, restoreSession } from "@/data/session";
import type { WorkspaceViewModel } from "@/interfaces/app";
import type {
  CompanyCreateRequest,
  CompanyRecord,
  CompanyUpdateRequest,
  EmployeeCreateRequest,
  EmployeeUpdateRequest,
  ManagerUpdateRequest,
  Permission,
  RoleAssignmentRequest,
  RoleUpsertRequest
} from "@/interfaces/organization";
import type { CompanyLoginRequest, EmployeeLoginRequest, SessionRecord } from "@/interfaces/session";
import { siteConfig } from "@/registry/site";
import { toWorkspaceViewModel } from "@/transformers/workspace";

type LoadStatus = "idle" | "loading" | "ready" | "error";
type BootstrapStatus = "loading" | "ready";

interface AppContextValue {
  actionError: string | null;
  activeCompany: WorkspaceViewModel | null;
  bootstrapStatus: BootstrapStatus;
  companies: CompanyRecord[];
  companiesStatus: LoadStatus;
  currentEmployeeId: string | null;
  isAuthenticated: boolean;
  isEmployeeSession: boolean;
  pageError: string | null;
  pendingAction: string | null;
  permissions: Permission[];
  refreshWorkspace: () => Promise<void>;
  refreshCompanies: () => Promise<void>;
  createCompany: (payload: CompanyCreateRequest) => Promise<void>;
  loginEmployee: (payload: EmployeeLoginRequest) => Promise<void>;
  loginCompany: (payload: CompanyLoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  selectPublicCompany: (companyId: string) => Promise<void>;
  session: SessionRecord | null;
  token: string | null;
  updateCompany: (payload: CompanyUpdateRequest) => Promise<void>;
  createRole: (payload: RoleUpsertRequest) => Promise<void>;
  createEmployee: (payload: EmployeeCreateRequest) => Promise<void>;
  updateEmployee: (employeeId: string, payload: EmployeeUpdateRequest) => Promise<void>;
  changeManager: (employeeId: string, payload: ManagerUpdateRequest) => Promise<void>;
  assignRole: (employeeId: string, payload: RoleAssignmentRequest) => Promise<void>;
  revokeRole: (employeeId: string, roleId: string) => Promise<void>;
  removeEmployee: (employeeId: string) => Promise<void>;
  workspaceStatus: LoadStatus;
}

const AppContext = createContext<AppContextValue | null>(null);

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected request failure.";
}

function isUnauthorized(error: unknown): boolean {
  return error instanceof ApiError && error.status === 401;
}

interface AppProviderProps {
  children: ComponentChildren;
}

export function AppProvider({ children }: AppProviderProps) {
  const [bootstrapStatus, setBootstrapStatus] = useState<BootstrapStatus>("loading");
  const [companiesStatus, setCompaniesStatus] = useState<LoadStatus>("idle");
  const [workspaceStatus, setWorkspaceStatus] = useState<LoadStatus>("idle");
  const [companies, setCompanies] = useState<CompanyRecord[]>([]);
  const [activeCompany, setActiveCompany] = useState<WorkspaceViewModel | null>(null);
  const [session, setSession] = useState<SessionRecord | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const currentEmployeeId = session?.principal_type === "employee" ? session.employee.id : null;
  const permissions = session?.principal_type === "employee" ? session.employee.permissions : [];

  const syncToken = (nextToken: string | null) => {
    setToken(nextToken);

    if (nextToken) {
      window.localStorage.setItem(siteConfig.sessionStorageKey, nextToken);
      return;
    }

    window.localStorage.removeItem(siteConfig.sessionStorageKey);
  };

  const clearSessionState = () => {
    syncToken(null);
    setSession(null);
  };

  const loadCatalog = async (forceRefresh = false): Promise<CompanyRecord[]> => {
    setCompaniesStatus("loading");

    try {
      const nextCompanies = await getCompanyCatalog(forceRefresh);
      setCompanies(nextCompanies);
      setCompaniesStatus("ready");
      return nextCompanies;
    } catch (error) {
      setCompaniesStatus("error");
      throw error;
    }
  };

  const loadCompany = async (companyId: string, forceRefresh = false): Promise<void> => {
    setWorkspaceStatus("loading");

    try {
      const workspace = await getCompanyWorkspace(companyId, forceRefresh);
      setActiveCompany(toWorkspaceViewModel(workspace));
      setWorkspaceStatus("ready");
    } catch (error) {
      setWorkspaceStatus("error");
      throw error;
    }
  };

  const resetPublicWorkspace = async (nextCompanies?: CompanyRecord[]) => {
    const companyCatalog = nextCompanies ?? companies;
    if (companyCatalog.length === 0) {
      setActiveCompany(null);
      setWorkspaceStatus("idle");
      return;
    }

    await loadCompany(companyCatalog[0].id, true);
  };

  const captureActionError = async (error: unknown) => {
    if (isUnauthorized(error)) {
      clearSessionState();
      const nextCompanies = await loadCatalog(true);
      await resetPublicWorkspace(nextCompanies);
      setActionError("Your session expired. Please sign in again.");
      return;
    }

    setActionError(getErrorMessage(error));
  };

  const runAction = async <T,>(label: string, action: () => Promise<T>): Promise<T> => {
    setPendingAction(label);
    setActionError(null);

    try {
      return await action();
    } catch (error) {
      await captureActionError(error);
      throw error;
    } finally {
      setPendingAction(null);
    }
  };

  const refreshCompanies = async () => {
    await runAction("Refreshing companies", async () => {
      const nextCompanies = await loadCatalog(true);
      if (!session) {
        await resetPublicWorkspace(nextCompanies);
      }
    });
  };

  const refreshWorkspace = async () => {
    if (session) {
      await runAction("Refreshing workspace", async () => {
        await loadCatalog(true);
        await loadCompany(session.company_id, true);
      });
      return;
    }

    await refreshCompanies();
  };

  const finalizeAuthentication = async (nextToken: string, nextSession: SessionRecord, preloadCompany?: WorkspaceViewModel) => {
    syncToken(nextToken);
    setSession(nextSession);
    await loadCatalog(true);

    if (preloadCompany) {
      setActiveCompany(preloadCompany);
      setWorkspaceStatus("ready");
      return;
    }

    await loadCompany(nextSession.company_id, true);
  };

  useEffect(() => {
    const bootstrap = async () => {
      setPageError(null);
      setBootstrapStatus("loading");

      try {
        const storedToken = window.localStorage.getItem(siteConfig.sessionStorageKey);
        const nextCompanies = await loadCatalog(false);

        if (storedToken) {
          try {
            const restored = await restoreSession(storedToken);
            syncToken(storedToken);
            setSession(restored);
            await loadCompany(restored.company_id, false);
          } catch (error) {
            clearSessionState();
            await resetPublicWorkspace(nextCompanies);
            setActionError(isUnauthorized(error) ? "Your previous session is no longer valid." : getErrorMessage(error));
          }
        } else {
          await resetPublicWorkspace(nextCompanies);
        }
      } catch (error) {
        setPageError(getErrorMessage(error));
      } finally {
        setBootstrapStatus("ready");
      }
    };

    void bootstrap();
  }, []);

  const requireToken = (): string => {
    if (!token || !session) {
      throw new Error("Authentication required.");
    }

    return token;
  };

  const createCompany = async (payload: CompanyCreateRequest) => {
    await runAction("Creating company", async () => {
      const response = await createCompanyAccount(payload);
      await finalizeAuthentication(response.token, response.session, toWorkspaceViewModel(response.company));
    });
  };

  const loginEmployee = async (payload: EmployeeLoginRequest) => {
    await runAction("Signing in employee", async () => {
      console.debug("[LOGIN] Starting employee login with ID:", payload.employee_id);
      try {
        const response = await createEmployeeSession(payload);
        console.debug("[LOGIN] Received auth response:", {
          hasToken: !!response.token,
          hasSession: !!response.session,
          sessionType: response.session?.principal_type
        });
        await finalizeAuthentication(response.token, response.session);
        console.debug("[LOGIN] Authentication finalized successfully");
      } catch (error) {
        console.error("[LOGIN] Error during login:", error);
        throw error;
      }
    });
  };

  const loginCompany = async (payload: CompanyLoginRequest) => {
    await runAction("Signing in company", async () => {
      const response = await createCompanySession(payload);
      await finalizeAuthentication(response.token, response.session);
    });
  };

  const logout = async () => {
    await runAction("Ending session", async () => {
      const currentToken = token;

      if (currentToken) {
        try {
          await destroySession(currentToken);
        } catch (error) {
          if (!isUnauthorized(error)) {
            throw error;
          }
        }
      }

      clearSessionState();
      const nextCompanies = await loadCatalog(true);
      await resetPublicWorkspace(nextCompanies);
    });
  };

  const selectPublicCompany = async (companyId: string) => {
    if (session) {
      return;
    }

    await runAction("Loading company", async () => {
      await loadCompany(companyId, true);
    });
  };

  const updateCompanyRecord = async (payload: CompanyUpdateRequest) => {
    await runAction("Updating company", async () => {
      const currentToken = requireToken();
      const updatedCompany = await updateCompanyAccount(session!.company_id, payload, currentToken);
      setActiveCompany(toWorkspaceViewModel(updatedCompany));
      await loadCatalog(true);
    });
  };

  const createRole = async (payload: RoleUpsertRequest) => {
    await runAction("Saving role", async () => {
      const currentToken = requireToken();
      const workspace = await upsertRoleAndReload(session!.company_id, payload, currentToken);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };

  const createEmployeeRecord = async (payload: EmployeeCreateRequest) => {
    await runAction("Adding employee", async () => {
      const currentToken = requireToken();
      const workspace = await createEmployeeAndReload(payload, currentToken);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };

  const updateEmployeeRecord = async (employeeId: string, payload: EmployeeUpdateRequest) => {
    await runAction("Updating employee", async () => {
      const currentToken = requireToken();
      const workspace = await updateEmployeeAndReload(employeeId, session!.company_id, payload, currentToken);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };

  const changeManager = async (employeeId: string, payload: ManagerUpdateRequest) => {
    await runAction("Rewiring reporting line", async () => {
      const currentToken = requireToken();
      const workspace = await changeManagerAndReload(employeeId, session!.company_id, payload, currentToken);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };

  const assignRole = async (employeeId: string, payload: RoleAssignmentRequest) => {
    await runAction("Assigning role", async () => {
      const currentToken = requireToken();
      const workspace = await assignRoleAndReload(employeeId, session!.company_id, payload, currentToken);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };

  const revokeRole = async (employeeId: string, roleId: string) => {
    await runAction("Revoking role", async () => {
      const currentToken = requireToken();
      const workspace = await revokeRoleAndReload(employeeId, session!.company_id, roleId, currentToken);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };

  const removeEmployeeRecord = async (employeeId: string) => {
    await runAction("Removing employee", async () => {
      const currentToken = requireToken();
      const workspace = await removeEmployeeAndReload(employeeId, session!.company_id, currentToken);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };

  const value: AppContextValue = {
    actionError,
    activeCompany,
    bootstrapStatus,
    companies,
    companiesStatus,
    createCompany,
    createEmployee: createEmployeeRecord,
    createRole,
    currentEmployeeId,
    isAuthenticated: Boolean(session),
    isEmployeeSession: session?.principal_type === "employee",
    loginCompany,
    loginEmployee,
    logout,
    pageError,
    pendingAction,
    permissions,
    refreshCompanies,
    refreshWorkspace,
    removeEmployee: removeEmployeeRecord,
    revokeRole,
    selectPublicCompany,
    session,
    token,
    updateCompany: updateCompanyRecord,
    updateEmployee: updateEmployeeRecord,
    assignRole,
    changeManager,
    workspaceStatus
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppModel() {
  const value = useContext(AppContext);

  if (!value) {
    throw new Error("useAppModel must be used within AppProvider.");
  }

  return value;
}
