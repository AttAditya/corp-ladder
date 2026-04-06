from __future__ import annotations

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from hierarchy_engine import HierarchyError, HierarchyIndex, HierarchyNode
from sample_data import SAMPLE_HIERARCHY


class NodeInput(BaseModel):
    id: str = Field(min_length=1)
    name: str = Field(min_length=1)
    title: str = Field(min_length=1)
    unit: str = Field(min_length=1)
    parentId: str | None = None


class HierarchyLoadRequest(BaseModel):
    nodes: list[NodeInput] = Field(min_length=1)


app = FastAPI(
    title="Advanced Trees Hierarchy Engine",
    description="A hierarchy query engine powered by Euler Tour and Binary Lifting.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class HierarchyService:
    def __init__(self) -> None:
        self._index = HierarchyIndex(SAMPLE_HIERARCHY)

    def snapshot(self) -> dict[str, object]:
        return self._index.snapshot()

    def load(self, node_inputs: list[NodeInput]) -> dict[str, object]:
        hierarchy_nodes = [
            HierarchyNode(
                id=node.id,
                name=node.name,
                title=node.title,
                unit=node.unit,
                parent_id=node.parentId,
            )
            for node in node_inputs
        ]
        self._index = HierarchyIndex(hierarchy_nodes)
        return self.snapshot()

    def get_node(self, node_id: str) -> dict[str, object]:
        return self._index._summary(node_id)

    def manager_chain(self, node_id: str) -> dict[str, object]:
        return {"employee": self.get_node(node_id), "chain": self._index.manager_chain(node_id)}

    def subtree(self, node_id: str) -> dict[str, object]:
        return self._index.subtree(node_id)

    def kth_ancestor(self, node_id: str, k: int) -> dict[str, object]:
        ancestor = self._index.kth_ancestor(node_id, k)
        return {"node": self.get_node(node_id), "k": k, "ancestor": ancestor}

    def lowest_common_manager(self, first_id: str, second_id: str) -> dict[str, object]:
        return {
            "first": self.get_node(first_id),
            "second": self.get_node(second_id),
            "manager": self._index.lca(first_id, second_id),
        }

    def distance(self, first_id: str, second_id: str) -> dict[str, object]:
        return {
            "first": self.get_node(first_id),
            "second": self.get_node(second_id),
            "edges": self._index.distance(first_id, second_id),
        }

    def path(self, first_id: str, second_id: str) -> dict[str, object]:
        path = self._index.path(first_id, second_id)
        return {
            "first": self.get_node(first_id),
            "second": self.get_node(second_id),
            "path": path,
            "hops": max(len(path) - 1, 0),
        }

    def is_ancestor(self, ancestor_id: str, node_id: str) -> dict[str, object]:
        return {
            "ancestor": self.get_node(ancestor_id),
            "node": self.get_node(node_id),
            "result": self._index.is_ancestor(ancestor_id, node_id),
        }


service = HierarchyService()


def handle_hierarchy_error(error: HierarchyError) -> HTTPException:
    return HTTPException(status_code=400, detail=str(error))


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/")
def root() -> dict[str, object]:
    return {
        "project": "Advanced Trees Projects - Hierarchy Query System",
        "status": "running",
        "snapshot": service.snapshot(),
    }


@app.get("/hierarchy")
def hierarchy() -> dict[str, object]:
    return service.snapshot()


@app.post("/hierarchy/load")
def load_hierarchy(payload: HierarchyLoadRequest) -> dict[str, object]:
    try:
        return service.load(payload.nodes)
    except HierarchyError as error:
        raise handle_hierarchy_error(error) from error


@app.get("/hierarchy/nodes/{node_id}")
def hierarchy_node(node_id: str) -> dict[str, object]:
    try:
        return service.get_node(node_id)
    except HierarchyError as error:
        raise handle_hierarchy_error(error) from error


@app.get("/queries/manager-chain/{node_id}")
def manager_chain(node_id: str) -> dict[str, object]:
    try:
        return service.manager_chain(node_id)
    except HierarchyError as error:
        raise handle_hierarchy_error(error) from error


@app.get("/queries/subtree/{node_id}")
def subtree(node_id: str) -> dict[str, object]:
    try:
        return service.subtree(node_id)
    except HierarchyError as error:
        raise handle_hierarchy_error(error) from error


@app.get("/queries/kth-ancestor")
def kth_ancestor(nodeId: str = Query(...), k: int = Query(..., ge=0)) -> dict[str, object]:
    try:
        return service.kth_ancestor(nodeId, k)
    except HierarchyError as error:
        raise handle_hierarchy_error(error) from error


@app.get("/queries/lowest-common-manager")
def lowest_common_manager(
    firstId: str = Query(...),
    secondId: str = Query(...),
) -> dict[str, object]:
    try:
        return service.lowest_common_manager(firstId, secondId)
    except HierarchyError as error:
        raise handle_hierarchy_error(error) from error


@app.get("/queries/distance")
def distance(firstId: str = Query(...), secondId: str = Query(...)) -> dict[str, object]:
    try:
        return service.distance(firstId, secondId)
    except HierarchyError as error:
        raise handle_hierarchy_error(error) from error


@app.get("/queries/path")
def path(firstId: str = Query(...), secondId: str = Query(...)) -> dict[str, object]:
    try:
        return service.path(firstId, secondId)
    except HierarchyError as error:
        raise handle_hierarchy_error(error) from error


@app.get("/queries/is-ancestor")
def is_ancestor(
    ancestorId: str = Query(...),
    nodeId: str = Query(...),
) -> dict[str, object]:
    try:
        return service.is_ancestor(ancestorId, nodeId)
    except HierarchyError as error:
        raise handle_hierarchy_error(error) from error
