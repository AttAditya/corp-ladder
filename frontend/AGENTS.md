# Frontend AI Instructions

## Source of Truth

- Follow [`ARCHITECTURE.md`](./ARCHITECTURE.md) for structure, boundaries, and data flow.
- If implementation details are unclear, prefer the architecture document over default framework habits.

## Main Project Modules

- `preact` for rendering
- `typescript` for type safety
- `esbuild` for bundling
- custom routing
- custom architecture layers defined in `ARCHITECTURE.md`

Keep dependencies minimal. Do not introduce heavy frameworks or extra runtime abstractions unless explicitly requested.

## Working Rules

- Respect the architecture layers and their boundaries.
- Keep separation of concerns strict.
- Prefer simple, composable, reusable patterns.
- Prefer generic, scalable implementations over one-off hacks.
- Keep code portable and avoid framework lock-in.
- Keep the frontend root clean.

## What To Ignore By Default

- Do not prioritize local checks, lint setup, formatter setup, or formatting scripts unless explicitly requested.
- Do not add tooling noise just to satisfy template conventions.
- Do not introduce unnecessary dev dependencies for linting, formatting, or code-style enforcement.

## Code Quality Expectations

- Even when verification is not required, always write code that is type-safe.
- Use TypeScript deliberately and avoid weakening types without a clear reason.
- Use 2-space indentation.
- Prefer clean generic patterns that scale with the architecture.
- Keep implementations minimal, readable, and easy to extend.

## Architecture Reminders

- Only `data/` calls `api/`.
- Only `contexts/` access `data/`.
- Only `contexts/` run `transformers/`.
- Raw data stays in `data/`.
- Transformed typed data lives in `contexts/`.

## Default Bias

- Build only what supports the architecture directly.
- Avoid template leftovers, incidental scaffolding, and framework-specific boilerplate.
