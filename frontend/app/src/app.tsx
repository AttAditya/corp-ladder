import { AppLink } from "@/components/ui/AppLink";
import { AppProvider, useAppModel } from "@/contexts/app-context";
import { RouterProvider, useRouter } from "@/contexts/router-context";
import { siteConfig } from "@/registry/site";

function AppFrame() {
  const { currentRoute, routes } = useRouter();
  const { pendingAction } = useAppModel();
  const ActiveView = currentRoute.view;

  const sessionLabel = "public access";

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <strong>{siteConfig.name}</strong>
          <span>{siteConfig.summary}</span>
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
