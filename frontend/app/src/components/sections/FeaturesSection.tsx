import { useEffect, useState } from "preact/hooks";
import { FeatureCard } from "@/components/kit/FeatureCard";
import { TreeView } from "@/components/kit/TreeView";
import { Surface } from "@/components/ui/Surface";
import { listFeatures } from "@/api/features";
import { useAppModel } from "@/contexts/app-context";
import type { FeatureRecord } from "@/interfaces/organization";

type FeaturesStatus = "loading" | "ready" | "error";

export function FeaturesSection() {
  const { activeCompany, workspaceStatus, token } = useAppModel();
  const [features, setFeatures] = useState<FeatureRecord[]>([]);
  const [featuresStatus, setFeaturesStatus] = useState<FeaturesStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setFeaturesStatus("loading");
        const response = await listFeatures(token);
        setFeatures(response.features);
        setFeaturesStatus("ready");
        setErrorMessage(null);
      } catch (error) {
        setFeaturesStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Failed to load features");
      }
    };

    fetchFeatures();
  }, []);

  const handleRefresh = async () => {
    try {
      setFeaturesStatus("loading");
      const response = await listFeatures(token);
      setFeatures(response.features);
      setFeaturesStatus("ready");
      setErrorMessage(null);
    } catch (error) {
      setFeaturesStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to load features");
    }
  };

  return (
    <section className="features-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Available capabilities</span>
          <h2>Features</h2>
        </div>
        <button className="refresh-button" onClick={handleRefresh} type="button">
          Refresh
        </button>
      </div>

      {/* Features List */}
      <div className="features-grid">
        {featuresStatus === "loading" && <p className="panel-message">Loading features...</p>}
        {featuresStatus === "error" && <p className="panel-message panel-message--error">{errorMessage ?? "Failed to load features"}</p>}
        {featuresStatus === "ready" && (
          <>
            {features.length > 0 ? (
              features.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))
            ) : (
              <p className="panel-message">No features available</p>
            )}
          </>
        )}
      </div>

      {/* Organization Tree View */}
      {activeCompany && (
        <Surface className="tree-panel">
          <div className="tree-panel__header">
            <h3>Organization Tree</h3>
            <span>{activeCompany.employees.length} employee{activeCompany.employees.length !== 1 ? 's' : ''}</span>
          </div>
          {workspaceStatus === "loading" && <p className="panel-message">Loading organization data...</p>}
          {workspaceStatus === "error" && <p className="panel-message panel-message--error">Failed to load organization</p>}
          {workspaceStatus === "ready" && (
            <TreeView employees={activeCompany.employees} boardMembers={activeCompany.board} />
          )}
        </Surface>
      )}
    </section>
  );
}
