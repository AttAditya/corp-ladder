import { StatCard } from "@/components/kit/StatCard";
import { Surface } from "@/components/ui/Surface";
import type { DashboardSummary } from "@/interfaces/dashboard";

interface DashboardSectionProps {
  errorMessage: string | null;
  onRefresh: () => void;
  status: "loading" | "ready" | "error";
  summary: DashboardSummary | null;
}

export function DashboardSection({ errorMessage, onRefresh, status, summary }: DashboardSectionProps) {
  const peopleCount = summary?.people.length ?? 0;

  return (
    <section className="dashboard-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Context-owned state</span>
          <h2>Backend snapshot</h2>
        </div>
        <button className="refresh-button" onClick={onRefresh} type="button">
          Refresh
        </button>
      </div>

      <div className="stats-grid">
        <StatCard detail="Directly from transformed context data." label="Users" value={String(summary?.count ?? 0)} />
        <StatCard detail="Derived from transformed people records." label="Profiles" value={String(peopleCount)} />
        <StatCard detail="Loading, ready, or error." label="Status" value={status} />
      </div>

      <Surface className="people-panel">
        <div className="people-panel__header">
          <h3>People</h3>
          <span>{summary?.empty ? "No backend entries yet." : "Typed summary in context."}</span>
        </div>
        {status === "loading" && <p className="panel-message">Fetching snapshot from the backend proxy.</p>}
        {status === "error" && <p className="panel-message panel-message--error">{errorMessage ?? "Request failed."}</p>}
        {status === "ready" && summary && (
          <div className="people-grid">
            {summary.people.map((person) => (
              <div className="person-chip" key={person.id}>
                <span className="person-chip__avatar">{person.initials}</span>
                <span className="person-chip__name">{person.label}</span>
              </div>
            ))}
            {summary.empty && <p className="panel-message">The backend returned zero users.</p>}
          </div>
        )}
      </Surface>
    </section>
  );
}
