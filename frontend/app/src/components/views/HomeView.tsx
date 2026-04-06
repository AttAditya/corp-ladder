import { WorkspaceSection } from "@/components/sections/WorkspaceSection";
import { useAppModel } from "@/contexts/app-context";

export function HomeView() {
  const { bootstrapStatus } = useAppModel();

  if (bootstrapStatus === "loading") {
    return (
      <section className="boot-panel">
        <span className="eyebrow">Booting</span>
        <h1>Loading company data and restoring session.</h1>
        <p>The frontend is hydrating the directory, current company preview, and any persisted auth state.</p>
      </section>
    );
  }

  return <WorkspaceSection />;
}
