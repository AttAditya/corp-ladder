import type { ComponentChildren } from "preact";

interface SurfaceProps {
  children: ComponentChildren;
  className?: string;
}

export function Surface({ children, className = "" }: SurfaceProps) {
  return <div className={["surface", className].filter(Boolean).join(" ")}>{children}</div>;
}
