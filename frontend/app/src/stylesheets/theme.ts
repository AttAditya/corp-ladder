export function getAppStyles(): string {
  return `
    :root {
      --bg: #f3efe8;
      --bg-soft: rgba(255, 255, 255, 0.58);
      --panel: rgba(255, 251, 246, 0.88);
      --panel-strong: rgba(16, 23, 29, 0.92);
      --ink: #102029;
      --ink-soft: #566670;
      --ink-inverse: #f7f1e7;
      --line: rgba(16, 32, 41, 0.12);
      --line-strong: rgba(16, 32, 41, 0.22);
      --accent: #bd5b2f;
      --accent-strong: #7d3312;
      --accent-soft: rgba(189, 91, 47, 0.14);
      --danger: #a7312b;
      --shadow: 0 24px 60px rgba(35, 39, 45, 0.14);
      color: var(--ink);
      font-family: "Avenir Next", "Segoe UI", sans-serif;
      line-height: 1.5;
    }

    * {
      box-sizing: border-box;
    }

    html {
      background:
        radial-gradient(circle at top left, rgba(189, 91, 47, 0.12), transparent 26%),
        radial-gradient(circle at right 30%, rgba(25, 49, 63, 0.1), transparent 22%),
        linear-gradient(180deg, #f8f3ec 0%, #ece3d7 100%);
    }

    body {
      margin: 0;
      min-height: 100vh;
      color: var(--ink);
      background: transparent;
    }

    body, button, input, select, textarea {
      font: inherit;
    }

    button, input, select, textarea {
      border-radius: 16px;
    }

    button {
      cursor: pointer;
    }

    a {
      color: inherit;
    }

    #app {
      min-height: 100vh;
    }

    .app-shell {
      width: min(1220px, calc(100% - 28px));
      margin: 0 auto;
      padding: 24px 0 48px;
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 18px;
      margin-bottom: 24px;
      padding: 18px 20px;
      border: 1px solid var(--line);
      border-radius: 28px;
      background: rgba(255, 249, 241, 0.72);
      backdrop-filter: blur(18px);
      box-shadow: 0 12px 30px rgba(80, 68, 53, 0.08);
    }

    .brand-block {
      display: grid;
      gap: 4px;
    }

    .brand-block strong {
      font-size: 1rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .brand-block span,
    .topbar__status,
    .muted-copy {
      color: var(--ink-soft);
    }

    .topbar__meta {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .topbar nav,
    .hero__actions,
    .hero-panel__actions,
    .pill-list {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
    }

    .app-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 42px;
      padding: 0 16px;
      border: 1px solid transparent;
      border-radius: 999px;
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 600;
      transition: transform 140ms ease, border-color 140ms ease, background-color 140ms ease;
    }

    .app-link:hover,
    .button:hover,
    .company-card:hover {
      transform: translateY(-1px);
    }

    .app-link--ghost {
      background: rgba(255, 255, 255, 0.42);
      border-color: rgba(16, 32, 41, 0.08);
    }

    .app-link--solid,
    .button {
      background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
      border-color: rgba(125, 51, 18, 0.4);
      color: #fff4ea;
    }

    .app-link.is-active {
      background: var(--accent-soft);
      border-color: rgba(189, 91, 47, 0.28);
    }

    .app-content,
    .page-stack,
    .content-grid__main,
    .content-grid__side,
    .stack-panel,
    .form-grid,
    .field,
    .employee-list,
    .employee-card,
    .employee-card__forms,
    .mini-form,
    .preview-column,
    .role-grid {
      display: grid;
      gap: 18px;
    }

    .surface {
      border: 1px solid var(--line);
      border-radius: 28px;
      padding: 22px;
      background: var(--panel);
      box-shadow: var(--shadow);
    }

    .boot-panel,
    .notes-panel {
      display: grid;
      gap: 14px;
      padding: 28px;
      border: 1px solid var(--line);
      border-radius: 28px;
      background: var(--panel);
      box-shadow: var(--shadow);
    }

    .hero {
      display: grid;
      gap: 20px;
    }

    .hero {
      grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.9fr);
      align-items: stretch;
    }

    .hero__copy,
    .hero-panel {
      display: grid;
      gap: 18px;
    }

    .hero__copy h1,
    .boot-panel h1,
    .notes-panel h1 {
      margin: 0;
      font-family: "Iowan Old Style", "Palatino Linotype", serif;
      font-size: clamp(2.4rem, 5vw, 4.8rem);
      line-height: 0.95;
      font-weight: 700;
    }

    .hero-panel h2,
    .panel-heading h2,
    .notes-panel h2 {
      margin: 0;
      font-size: clamp(1.35rem, 2vw, 2rem);
      line-height: 1.04;
    }

    .hero__copy p,
    .hero-panel p,
    .notes-panel p,
    .employee-card p {
      margin: 0;
      color: var(--ink-soft);
    }

    .hero-panel {
      padding: 24px;
      border-radius: 30px;
      background:
        linear-gradient(160deg, rgba(255, 247, 236, 0.94) 0%, rgba(233, 219, 203, 0.9) 100%),
        linear-gradient(135deg, rgba(189, 91, 47, 0.12), transparent 55%);
      border: 1px solid rgba(16, 32, 41, 0.08);
      box-shadow: var(--shadow);
    }

    .hero-panel--status {
      align-content: space-between;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--accent-strong);
      font-size: 0.76rem;
      font-weight: 800;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .hero__metrics,
    .stats-grid,
    .preview-columns,
    .workspace-grid,
    .content-grid,
    .status-list,
    .checkbox-grid {
      display: grid;
      gap: 14px;
    }

    .hero__metrics {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .metric-chip,
    .stat-block {
      display: grid;
      gap: 4px;
      padding: 16px 18px;
      border: 1px solid rgba(16, 32, 41, 0.08);
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.46);
    }

    .metric-chip strong,
    .stat-block strong {
      font-size: 1.45rem;
      line-height: 1;
    }

    .metric-chip span,
    .stat-block span,
    .status-row span,
    .panel-heading span,
    .employee-card__meta span,
    .employee-card__summary span,
    .company-card span,
    .company-card small {
      color: var(--ink-soft);
    }

    .status-list {
      border-top: 1px solid rgba(16, 32, 41, 0.08);
      padding-top: 12px;
    }

    .status-row,
    .panel-heading,
    .employee-card__summary,
    .employee-card__meta {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      flex-wrap: wrap;
    }

    .status-row strong {
      text-transform: capitalize;
    }

    .notice-panel {
      display: grid;
      gap: 8px;
    }

    .notice-panel--error {
      border-color: rgba(167, 49, 43, 0.24);
      background: rgba(167, 49, 43, 0.06);
    }

    .content-grid {
      grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.9fr);
      align-items: start;
    }

    .workspace-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      align-items: start;
    }

    .panel-heading {
      padding-bottom: 12px;
      border-bottom: 1px solid var(--line);
    }

    .company-list {
      display: grid;
      gap: 12px;
    }

    .company-card {
      width: 100%;
      display: grid;
      gap: 4px;
      padding: 16px 18px;
      text-align: left;
      border: 1px solid var(--line);
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.54);
      transition: transform 140ms ease, border-color 140ms ease, background-color 140ms ease;
    }

    .company-card--active {
      border-color: rgba(189, 91, 47, 0.34);
      background: rgba(189, 91, 47, 0.1);
    }

    .preview-columns {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .preview-column h3 {
      margin: 0;
      font-size: 1rem;
    }

    .role-grid {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .role-card {
      display: grid;
      gap: 12px;
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.56);
    }

    .role-card--compact {
      padding: 14px;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 34px;
      padding: 0 12px;
      border: 1px solid rgba(16, 32, 41, 0.09);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.7);
      font-size: 0.9rem;
    }

    .pill--accent {
      background: rgba(189, 91, 47, 0.1);
      border-color: rgba(189, 91, 47, 0.18);
    }

    .pill--muted {
      background: rgba(16, 32, 41, 0.06);
    }

    .pill__action {
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--accent-strong);
      font-size: 0.82rem;
      font-weight: 700;
    }

    .field {
      gap: 8px;
    }

    .field span {
      font-size: 0.88rem;
      font-weight: 700;
    }

    .field input,
    .field select,
    .field textarea {
      width: 100%;
      min-height: 46px;
      padding: 0 14px;
      border: 1px solid var(--line-strong);
      background: rgba(255, 255, 255, 0.78);
      color: var(--ink);
      outline: none;
    }

    .field textarea {
      min-height: 110px;
      padding: 14px;
      resize: vertical;
    }

    .field input:focus,
    .field select:focus,
    .field textarea:focus {
      border-color: rgba(189, 91, 47, 0.42);
      box-shadow: 0 0 0 4px rgba(189, 91, 47, 0.12);
    }

    .field input:disabled,
    .field select:disabled,
    .button:disabled {
      cursor: not-allowed;
      opacity: 0.62;
    }

    .field--full {
      grid-column: 1 / -1;
    }

    .form-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .mini-form {
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.45);
    }

    .button {
      min-height: 46px;
      padding: 0 16px;
      border: 1px solid transparent;
      font-weight: 700;
      transition: transform 140ms ease, opacity 140ms ease;
    }

    .button--secondary {
      background: rgba(255, 255, 255, 0.72);
      border-color: rgba(16, 32, 41, 0.1);
      color: var(--ink);
    }

    .button--danger {
      background: rgba(167, 49, 43, 0.08);
      border-color: rgba(167, 49, 43, 0.18);
      color: var(--danger);
    }

    .employee-list {
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
    }

    .employee-list--preview {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .employee-card {
      padding: 18px;
      border: 1px solid var(--line);
      border-radius: 24px;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(246, 239, 229, 0.68) 100%);
    }

    .employee-card--preview {
      gap: 12px;
    }

    .employee-card__summary strong,
    .company-card strong,
    .role-card strong {
      font-size: 1rem;
    }

    .employee-card__forms {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .checkbox-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .checkbox {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 44px;
      padding: 10px 12px;
      border: 1px solid var(--line);
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.52);
    }

    .checkbox input {
      width: 16px;
      height: 16px;
      margin: 0;
    }

    @media (max-width: 1080px) {
      .hero,
      .content-grid,
      .workspace-grid,
      .preview-columns {
        grid-template-columns: 1fr;
      }

      .employee-card__forms {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 820px) {
      .app-shell {
        width: min(100%, calc(100% - 20px));
        padding-top: 16px;
      }

      .topbar,
      .panel-heading,
      .employee-card__summary,
      .employee-card__meta,
      .status-row {
        flex-direction: column;
        align-items: flex-start;
      }

      .form-grid,
      .hero__metrics,
      .checkbox-grid {
        grid-template-columns: 1fr;
      }

      .surface,
      .boot-panel,
      .notes-panel,
      .hero-panel {
        padding: 18px;
        border-radius: 24px;
      }
    }

    .tree-node {
      line-height: 1;
      font-size: 2rem;
    }

    .tree-node__item {
      display: flex;
      gap: 12px;
    }
      
    .tree-node__indent {
      width: 12px;
      height: 12px;
      border-left: 2px solid var(--line-strong);
    }
      
    .tree-node__role {
      color: var(--ink-soft);
    }

    .tree-node__count {
      font-weight: 200;
    }
  `;
}
