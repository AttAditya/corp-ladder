import { Surface } from "@/components/ui/Surface";

const layerNotes = [
  "routes define paths and build-time metadata",
  "contexts own render-facing state and lifecycle",
  "data handles caching and raw response orchestration",
  "api stays transport-only with no business logic",
  "transformers convert raw responses into typed UI data"
];

export function ArchitectureSection() {
  return (
    <section className="architecture-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Layer boundaries</span>
          <h2>Frontend contract</h2>
        </div>
      </div>
      <div className="architecture-grid">
        {layerNotes.map((note) => (
          <Surface className="architecture-card" key={note}>
            <p>{note}</p>
          </Surface>
        ))}
      </div>
    </section>
  );
}
