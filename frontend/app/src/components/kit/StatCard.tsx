import { Surface } from "@/components/ui/Surface";

interface StatCardProps {
  detail: string;
  label: string;
  value: string;
}

export function StatCard({ detail, label, value }: StatCardProps) {
  return (
    <Surface className="stat-card">
      <span className="stat-card__label">{label}</span>
      <strong className="stat-card__value">{value}</strong>
      <span className="stat-card__detail">{detail}</span>
    </Surface>
  );
}
