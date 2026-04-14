import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";
import { ApiError } from "@/api/http";
import {
  assignRoleAndReload,
  changeManagerAndReload,
  createEmployeeAndReload,
  getCompanyCatalog,
  getCompanyWorkspace,
  removeEmployeeAndReload,
  revokeRoleAndReload,
  updateCompanyAccount,
  updateEmployeeAndReload,
  upsertRoleAndReload
} from "@/data/organization";
import type { WorkspaceViewModel } from "@/interfaces/app";
import type {
  CompanyCreateRequest,
  CompanyRecord,
  CompanyUpdateRequest,
  EmployeeCreateRequest,
  EmployeeUpdateRequest,
  ManagerUpdateRequest,
  RoleAssignmentRequest,
  RoleUpsertRequest
} from "@/interfaces/organization";
import { toWorkspaceViewModel } from "@/transformers/workspace";

type LoadStatus = "idle" | "loading" | "ready" | "error";
type BootstrapStatus = "loading" | "ready";

interface AppContextValue {
  actionError: string | null;
  activeCompany: WorkspaceViewModel | null;
  bootstrapStatus: BootstrapStatus;
  companies: CompanyRecord[];
  companiesStatus: LoadStatus;
  pageError: string | null;
  pendingAction: string | null;
  refreshWorkspace: () => Promise<void>;
  refreshCompanies: () => Promise<void>;
  selectPublicCompany: (companyId: string) => Promise<void>;
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

interface AppProviderProps {
  children: ComponentChildren;
}

export function AppProvider({ children }: AppProviderProps) {
  const [bootstrapStatus, setBootstrapStatus] = useState<BootstrapStatus>("loading");
  const [companiesStatus, setCompaniesStatus] = useState<LoadStatus>("idle");
  const [workspaceStatus, setWorkspaceStatus] = useState<LoadStatus>("idle");
  const [companies, setCompanies] = useState<CompanyRecord[]>([]);
  const [activeCompany, setActiveCompany] = useState<WorkspaceViewModel | null>(null);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

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

  const runAction = async <T,>(label: string, action: () => Promise<T>): Promise<T> => {
    setPendingAction(label);
    setActionError(null);

    try {
      return await action();
    } catch (error) {
      setActionError(getErrorMessage(error));
      throw error;
    } finally {
      setPendingAction(null);
    }
  };

  const refreshCompanies = async () => {
    await runAction("Refreshing companies", async () => {
      const nextCompanies = await loadCatalog(true);
      await resetPublicWorkspace(nextCompanies);
    });
  };

  const refreshWorkspace = async () => {
    await refreshCompanies();
  };

  useEffect(() => {
    const bootstrap = async () => {
      setPageError(null);
      setBootstrapStatus("loading");

      try {
        const nextCompanies = await loadCatalog(false);
        await resetPublicWorkspace(nextCompanies);
      } catch (error) {
        setPageError(getErrorMessage(error));
      } finally {
        setBootstrapStatus("ready");
      }
    };

    void bootstrap();
  }, []);

  const updateCompanyRecord = async (payload: CompanyUpdateRequest) => {
    if (!activeCompany) {
      throw new Error("No company selected");
    }

    await runAction("Updating company", async () => {
      const updatedWorkspace = await updateCompanyAccount(activeCompany.company.id, payload);
      setActiveCompany(toWorkspaceViewModel(updatedWorkspace));
      await loadCatalog(true);
    });
  };

  const createRole = async (payload: RoleUpsertRequest) => {
    if (!activeCompany) {
      throw new Error("No company selected");
    }

    await runAction("Saving role", async () => {
      const workspace = await upsertRoleAndReload(activeCompany.company.id, payload);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };

  const createEmployeeRecord = async (payload: EmployeeCreateRequest) => {
    await runAction("Adding employee", async () => {
      const workspace = await createEmployeeAndReload(payload);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };

  const updateEmployeeRecord = async (employeeId: string, payload: EmployeeUpdateRequest) => {
    if (!activeCompany) {
      throw new Error("No company selected");
    }

    await runAction("Updating employee", async () => {
      const workspace = await updateEmployeeAndReload(employeeId, activeCompany.company.id, payload);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };

  const changeManager = async (employeeId: string, payload: ManagerUpdateRequest) => {
    if (!activeCompany) {
      throw new Error("No company selected");
    }

    await runAction("Rewiring reporting line", async () => {
      const workspace = await changeManagerAndReload(employeeId, activeCompany.company.id, payload);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };

  const assignRole = async (employeeId: string, payload: RoleAssignmentRequest) => {
    if (!activeCompany) {
      throw new Error("No company selected");
    }

    await runAction("Assigning role", async () => {
      const workspace = await assignRoleAndReload(employeeId, activeCompany.company.id, payload);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };

  const revokeRole = async (employeeId: string, roleId: string) => {
    if (!activeCompany) {
      throw new Error("No company selected");
    }

    await runAction("Revoking role", async () => {
      const workspace = await revokeRoleAndReload(employeeId, activeCompany.company.id, roleId);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };

  const removeEmployeeRecord = async (employeeId: string) => {
    if (!activeCompany) {
      throw new Error("No company selected");
    }

    await runAction("Removing employee", async () => {
      const workspace = await removeEmployeeAndReload(employeeId, activeCompany.company.id);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };

  const selectPublicCompany = async (companyId: string) => {
    await runAction("Loading company", async () => {
      await loadCompany(companyId, true);
    });
  };

  const value: AppContextValue = {
    actionError,
    activeCompany,
    bootstrapStatus,
    companies,
    companiesStatus,
    createEmployee: createEmployeeRecord,
    createRole,
    pageError,
    pendingAction,
    refreshCompanies,
    refreshWorkspace,
    removeEmployee: removeEmployeeRecord,
    revokeRole,
    selectPublicCompany,
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
