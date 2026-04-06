import { AppLink } from "@/components/ui/AppLink";
import { Surface } from "@/components/ui/Surface";

export function NotFoundView() {
  return (
    <Surface className="notes-panel">
      <span className="eyebrow">404</span>
      <h1>Page not found.</h1>
      <p>The current path does not match a registered route.</p>
      <div className="hero__actions">
        <AppLink href="/" variant="solid">Back home</AppLink>
      </div>
    </Surface>
  );
}
