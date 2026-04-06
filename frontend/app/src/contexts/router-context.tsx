import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";
import type { RouteDefinition } from "@/interfaces/routing";
import { resolveRoute, routes } from "@/routes";
import { normalizePath } from "@/utils/router";

interface RouterContextValue {
  currentPath: string;
  currentRoute: RouteDefinition;
  navigate: (nextPath: string) => void;
  routes: RouteDefinition[];
}

const RouterContext = createContext<RouterContextValue | null>(null);

interface RouterProviderProps {
  children: ComponentChildren;
}

export function RouterProvider({ children }: RouterProviderProps) {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (nextPath: string) => {
    const normalizedPath = normalizePath(nextPath);
    if (normalizedPath === currentPath) {
      return;
    }

    window.history.pushState({}, "", normalizedPath);
    setCurrentPath(normalizedPath);
  };

  const value: RouterContextValue = {
    currentPath,
    currentRoute: resolveRoute(currentPath),
    navigate,
    routes
  };

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const value = useContext(RouterContext);

  if (!value) {
    throw new Error("useRouter must be used within RouterProvider.");
  }

  return value;
}
