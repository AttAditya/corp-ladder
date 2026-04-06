import type { ComponentChildren, JSX } from "preact";
import { useRouter } from "@/contexts/router-context";
import { shouldHandleNavigation } from "@/utils/router";

interface AppLinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  children: ComponentChildren;
  href: string;
  variant?: "ghost" | "solid";
}

export function AppLink({ children, className, href, onClick, variant = "ghost", ...props }: AppLinkProps) {
  const { currentPath, navigate } = useRouter();
  const isActive = currentPath === href;

  return (
    <a
      {...props}
      aria-current={isActive ? "page" : undefined}
      className={["app-link", `app-link--${variant}`, isActive ? "is-active" : "", className ?? ""].filter(Boolean).join(" ")}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (!shouldHandleNavigation(event) || event.defaultPrevented) {
          return;
        }

        event.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}
