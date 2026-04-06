# Architecture Specification

## Overview

This project follows a minimal, self-driven frontend architecture designed for:

- high performance
- low dependency count
- clear separation of concerns
- strong TypeScript-driven safety
- CI-enforced quality instead of local tooling overhead

The system avoids heavy frameworks and relies on:

- Preact for rendering
- TypeScript for type safety
- esbuild for bundling
- custom routing and architecture layers

---

## Core Principles

- Keep runtime dependencies minimal
- Avoid framework lock-in
- Enforce strict layer boundaries
- Separate data, logic, and rendering clearly
- Prefer build-time solutions over runtime complexity
- Keep root clean and uncluttered
- Delegate linting/formatting to CI

---

## Project Structure

```text
(root)
- .github/
- ci/
- app/
  - src/
  - public/
  - package.json
  - tsconfig.json
  - build.mjs
- .gitignore
- README.md
- LICENSE
```

### Responsibilities

- `.github/` -> workflows, PR/issue templates
- `ci/` -> linting, rule checks, CI scripts
- `app/` -> actual application code and build system

---

## Application Structure

```text
app/
- src/
  - routes/
  - components/
    - ui/
    - kit/
    - sections/
    - views/
  - stylesheets/
  - contexts/
  - interfaces/
  - transformers/
  - api/
  - data/
  - utils/
  - registry/
- public/
- package.json
- tsconfig.json
- build.mjs
```

---

## Layer Definitions

### Routes (`routes/`)

- Defines route configurations
- Contains path, view binding, and metadata
- Used by custom router
- Metadata used for build-time SEO generation

---

### Components (`components/`)

#### `ui/`

- Lowest-level rendering primitives
- Pure visual elements

#### `kit/`

- Built using `ui/`
- Reusable UI compositions

#### `sections/`

- Built using `ui/` + `kit/`
- Represents logical page sections

#### `views/`

- Built using `sections/`
- Represents full pages

---

### Styles (`stylesheets/`)

- JS-based style definitions
- Resolved through a style resolver
- Should represent intent, not platform-specific implementation

---

### Contexts (`contexts/`)

- Own render-facing state
- Manage lifecycle and data flow
- Receive raw data indirectly
- Run transformers
- Store transformed typed data
- Trigger re-renders

---

### Interfaces (`interfaces/`)

- Define data contracts
- Used across transformers, contexts, and other layers

---

### Transformers (`transformers/`)

- Convert raw data into typed structures
- Synchronous
- Likely callable only from contexts

---

### API (`api/`)

- Handles network requests
- No business logic

---

### Data Layer (`data/`)

- Only layer allowed to call `api/`
- Handles caching and orchestration
- Stores raw data
- Returns results to contexts

---

### Utils (`utils/`)

- Generic helper functions
- Must remain minimal and focused

---

### Registry (`registry/`)

- Central configuration
- Routes, feature flags, constants
- Default values

---

## Data Flow

### Initial Flow

`router -> contexts -> initial render (loading/default state)`

### Async Flow

`contexts -> data -> api -> data -> context -> transformer -> context -> render`

### Rules

- Only `data/` can call `api/`
- Only `contexts/` can access `data/`
- Only `contexts/` should run `transformers/`
- Raw data stays in `data/`
- Transformed data lives in `contexts/`

---

## Routing

- Custom router implementation
- No dependency on framework routers
- Route definitions live in `routes/`
- Route metadata is used during build

---

## Styling System

- Fully JS-based styling
- Uses a style resolver abstraction
- Avoid direct reliance on platform-specific styling
- Enables future platform portability

---

## Build System

### Dependencies

- `preact`
- `typescript`
- `esbuild`

### Philosophy

- Minimal tooling
- App-owned build system
- No heavy frameworks

### Responsibilities

- Bundle application
- Apply alias (`@/`)
- Copy static assets
- Support watch mode

---

## TypeScript

- Primary safety mechanism
- Used for type checking only (`noEmit`)
- Required for local development

---

## Alias

`@/ -> src/`

Configured in:

- `tsconfig.json`
- `build.mjs`

---

## Public Assets

- `public/` contains static assets and base HTML
- Copied into `dist/` during build
- `dist/` is fully deployable

---

## Metadata & SEO

- Metadata defined per route
- Injected at build time
- No runtime meta management

### Output Example

```text
dist/
- index.html
- about/
  - index.html
- main.js
```

---

## Tooling Strategy

### Local Development

- TypeScript checks only

### CI

- Linting and formatting
- Rule enforcement scripts
- PR validation and optional auto-fixes

---

## GitHub Templates

```text
.github/
- workflows/
- ISSUE_TEMPLATE/
- PULL_REQUEST_TEMPLATE/
```

Supports multiple PR templates.

---

## Licensing

Use standard licenses:

- MIT (recommended)
- Apache 2.0 (if patent protection needed)

Avoid custom licenses unless necessary.

---

## Summary

This architecture provides:

- strict separation of concerns
- minimal runtime overhead
- scalable structure
- strong type safety
- flexible platform adaptability

It is designed to remain simple while supporting long-term growth and maintainability.
