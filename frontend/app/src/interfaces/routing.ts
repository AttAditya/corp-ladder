import type { ComponentType } from "preact";

export interface RouteMetadata {
  description: string;
  id: string;
  label: string;
  path: string;
  title: string;
}

export interface RouteDefinition extends RouteMetadata {
  view: ComponentType;
}
