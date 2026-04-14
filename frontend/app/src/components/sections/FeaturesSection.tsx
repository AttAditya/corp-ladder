import { useEffect, useState } from "preact/hooks";
import { FeatureCard } from "@/components/kit/FeatureCard";
import { TreeView } from "@/components/kit/TreeView";
import { Surface } from "@/components/ui/Surface";
import { listFeatures } from "@/api/features";
import type { FeatureRecord } from "@/interfaces/organization";

type FeaturesStatus = "loading" | "ready" | "error";

export function FeaturesSection() {
  const [features, setFeatures] = useState<FeatureRecord[]>([]);
  const [featuresStatus, setFeaturesStatus] = useState<FeaturesStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setFeaturesStatus("loading");
        const response = await listFeatures();
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
      const response = await listFeatures();
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
          <span className="eyebrow">Modules</span>
          <h2>Feature Modules</h2>
        </div>
        <button className="button button--secondary" onClick={() => void handleRefresh()} type="button">
          Refresh
        </button>
      </div>

      {errorMessage && (
        <Surface className="notice-panel notice-panel--error">
          <strong>Error</strong>
          <p>{errorMessage}</p>
        </Surface>
      )}

      {featuresStatus === "loading" && (
        <Surface className="notice-panel">
          <p>Loading features...</p>
        </Surface>
      )}

      {featuresStatus === "ready" && features.length > 0 && (
        <div className="features-grid">
          {features.map((feature) => (
            <FeatureCard feature={feature} key={feature.id} />
          ))}
        </div>
      )}

      {featuresStatus === "ready" && features.length === 0 && (
        <Surface className="notice-panel">
          <p>No features available.</p>
        </Surface>
      )}
    </section>
  );
}
