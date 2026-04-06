import { Surface } from "@/components/ui/Surface";
import type { FeatureRecord } from "@/interfaces/organization";

interface FeatureCardProps {
  feature: FeatureRecord;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Surface className="feature-card">
      <div className="feature-card__header">
        <h3 className="feature-card__title">{feature.name}</h3>
        {feature.enabled && <span className="feature-card__badge">Available</span>}
      </div>
      <p className="feature-card__description">{feature.description}</p>
    </Surface>
  );
}
