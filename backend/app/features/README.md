# Backend Features

Use this package for backend features that should be developed in isolation from the shared `api`, `schemas`, and `services` folders.

## Suggested workflow

1. Keep feature-specific routes, schemas, and service logic inside their own folder.
2. Register the feature router in `features/registry.py` when the feature is ready to mount.
3. Use `subordinate_count/` as the reference implementation for isolated backend features.

## Example layout

```text
backend/app/features/
├── subordinate_count/
│   ├── __init__.py
│   ├── router.py
│   ├── schemas.py
│   └── service.py
└── registry.py
```
