import type { RouteDefinition, RouteMetadata } from "@/interfaces/routing";
import { AuthView } from "@/components/views/AuthView";
import { FeaturesView } from "@/components/views/FeaturesView";
import { HomeView } from "@/components/views/HomeView";
import { NotFoundView } from "@/components/views/NotFoundView";
import routeMetadata from "./metadata.json";

const routeViews = {
  auth: AuthView,
  features: FeaturesView,
  home: HomeView
} as const;

export const routes: RouteDefinition[] = (routeMetadata as RouteMetadata[]).map((route) => ({
  ...route,
  view: routeViews[route.id as keyof typeof routeViews]
}));

export const notFoundRoute: RouteDefinition = {
  description: "The requested page could not be found.",
  id: "not-found",
  label: "Not found",
  path: "/404",
  title: "Not Found | Corp Ladder",
  view: NotFoundView
};

export function resolveRoute(pathname: string): RouteDefinition {
  return routes.find((route) => route.path === pathname) ?? notFoundRoute;
}
