## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- `chmod +x ./dev.sh && source ./dev.sh`

## Setup

```sh
dev setup
```

## Running the Application

### Frontend + Backend

```sh
dev run
```

### Frontend Only

```sh
dev run frontend
```

### Backend Only

```sh
dev run backend
```

## Backend API

The FastAPI backend now exposes versioned routes under:

- `/api/v1/company`
- `/api/v1/employee`
- `/api/v1/auth`

Legacy unversioned routes are still mounted for backward compatibility:

- `/company`
- `/employee`
- `/auth`

The backend is organized by route and responsibility:

```text
backend/app/
├── features/          # isolated feature packages ready to be mounted
├── api/v1/routes/     # FastAPI route handlers grouped by resource
├── core/              # shared constants and security helpers
├── schemas/           # request payload models
├── services/          # business logic and data access helpers
├── db.py              # JSON-backed storage adapter
└── main.py            # thin app entrypoint
```

Data is currently stored in a local key-value JSON database at `backend/app/data/database.json` through the `DataBase` interface in `backend/app/db.py`. The interface is designed so the storage layer can later be swapped to Redis/Upstash without changing the route logic.

For new backend capabilities that should be developed separately, start from `backend/app/features/feature_template/` and register the router in `backend/app/features/registry.py`.
