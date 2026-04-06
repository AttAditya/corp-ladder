import { siteConfig } from "@/registry/site";

export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__copy">
        <span className="eyebrow">Minimal frontend foundation</span>
        <h1>{siteConfig.name}</h1>
        <p>{siteConfig.summary}</p>
        <div className="hero__actions">
          <a className="external-link" href="https://preactjs.com/" rel="noreferrer" target="_blank">Preact docs</a>
        </div>
      </div>
      <div className="hero__panel">
        <div className="hero__panel-ring" />
        <div className="hero__panel-content">
          <span>Flow</span>
          <strong>router → contexts → data → api → transformer → render</strong>
        </div>
      </div>
    </section>
  );
}
