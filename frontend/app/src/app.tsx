import { useEffect } from "preact/hooks";
import { AppLink } from "@/components/ui/AppLink";
import { AppProvider, useAppModel } from "@/contexts/app-context";
import { RouterProvider, useRouter } from "@/contexts/router-context";
import { siteConfig } from "@/registry/site";

function AppFrame() {
  const { currentRoute, currentPath, navigate, routes } = useRouter();
  const { isAuthenticated, pendingAction, session, bootstrapStatus } = useAppModel();
  const ActiveView = currentRoute.view;

  // Route guard: redirect unauthenticated users to /auth
  useEffect(() => {
    if (bootstrapStatus === "done" && !isAuthenticated && currentPath !== "/auth") {
      navigate("/auth");
    }
  }, [bootstrapStatus, isAuthenticated, currentPath, navigate]);

  const sessionLabel = session
    ? session.principal_type === "employee"
      ? `${session.employee.name} · ${session.company_id}`
      : `${session.company.name} · ${session.company_id}`
    : "public access";

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <strong>{siteConfig.name}</strong>
          <span>{isAuthenticated ? sessionLabel : siteConfig.summary}</span>
        </div>
        <div className="topbar__meta">
          <span className="topbar__status">{pendingAction ?? sessionLabel}</span>
          <nav aria-label="Primary">
            {routes.map((route) => (
              <AppLink href={route.path} key={route.id}>
                {route.label}
              </AppLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="app-content">
        <ActiveView />
      </main>
    </div>
  );
}

export function App() {
  return (
    <RouterProvider>
      <AppProvider>
        <AppFrame />
      </AppProvider>
    </RouterProvider>
  );
}
