# Advanced Trees Project

This project implements a hierarchy query system for structures like company org charts and university trees.

## What it uses

- Euler Tour for subtree range indexing and O(1) ancestor checks
- Binary Lifting for O(log n) lowest common ancestor and k-th ancestor queries
- FastAPI backend for hierarchy preprocessing and query APIs
- Next.js frontend for interactive demos of the data structures

## Features

- Load and manage a hierarchical structure with one root
- Preprocess the tree in `O(n log n)`
- Run instant hierarchy queries:
  - manager chain
  - k-th ancestor
  - lowest common manager
  - shortest path between two nodes
  - subtree members and subtree size
  - ancestor checks

## Setup

```sh
chmod +x ./dev.sh
source ./dev.sh
dev setup
```

## Run

Run both apps:

```sh
dev run
```

Run backend only:

```sh
dev run backend
```

Run frontend only:

```sh
dev run frontend
```

## Local URLs

- Frontend: [http://127.0.0.1:3000](http://127.0.0.1:3000)
- Backend: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- API docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## Backend API

- `GET /hierarchy`
- `POST /hierarchy/load`
- `GET /hierarchy/nodes/{node_id}`
- `GET /queries/manager-chain/{node_id}`
- `GET /queries/subtree/{node_id}`
- `GET /queries/kth-ancestor?nodeId=...&k=...`
- `GET /queries/lowest-common-manager?firstId=...&secondId=...`
- `GET /queries/path?firstId=...&secondId=...`
- `GET /queries/distance?firstId=...&secondId=...`
- `GET /queries/is-ancestor?ancestorId=...&nodeId=...`

## Notes

The app ships with a sample company org chart so the project works immediately after setup.
