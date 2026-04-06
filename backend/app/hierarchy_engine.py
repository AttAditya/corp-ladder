from __future__ import annotations

from dataclasses import dataclass
from math import ceil, log2


@dataclass(frozen=True)
class HierarchyNode:
    id: str
    name: str
    title: str
    unit: str
    parent_id: str | None = None


class HierarchyError(ValueError):
    pass


class HierarchyIndex:
    def __init__(self, nodes: list[HierarchyNode]):
        if not nodes:
            raise HierarchyError("The hierarchy must contain at least one node.")

        self.nodes_by_id: dict[str, HierarchyNode] = {}
        self.children: dict[str, list[str]] = {}
        self.parent_by_id: dict[str, str | None] = {}

        for node in nodes:
            if node.id in self.nodes_by_id:
                raise HierarchyError(f"Duplicate node id detected: {node.id}")
            self.nodes_by_id[node.id] = node
            self.children[node.id] = []
            self.parent_by_id[node.id] = node.parent_id

        roots = [node.id for node in nodes if node.parent_id is None]
        if len(roots) != 1:
            raise HierarchyError("The hierarchy must contain exactly one root node.")
        self.root_id = roots[0]

        for node in nodes:
            if node.parent_id is None:
                continue
            if node.parent_id not in self.nodes_by_id:
                raise HierarchyError(
                    f"Node {node.id} references missing parent {node.parent_id}."
                )
            self.children[node.parent_id].append(node.id)

        self.node_ids = [node.id for node in nodes]
        self.index_of = {node_id: index for index, node_id in enumerate(self.node_ids)}
        self.size = len(self.node_ids)
        self.max_log = max(1, ceil(log2(max(2, self.size))) + 1)

        self.depth = [0] * self.size
        self.tin = [0] * self.size
        self.tout = [0] * self.size
        self.subtree_size = [0] * self.size
        self.up = [[0] * self.size for _ in range(self.max_log)]
        self.euler_order: list[str] = []
        self._build_index()

    def _build_index(self) -> None:
        timer = 0
        visited: set[str] = set()
        stack: list[tuple[str, str | None, int, bool]] = [
            (self.root_id, None, 0, False)
        ]

        while stack:
            node_id, parent_id, depth, is_exit = stack.pop()
            index = self.index_of[node_id]

            if not is_exit:
                if node_id in visited:
                    raise HierarchyError("The hierarchy contains a cycle.")

                visited.add(node_id)
                self.depth[index] = depth
                self.tin[index] = timer
                self.euler_order.append(node_id)
                timer += 1

                self.up[0][index] = index if parent_id is None else self.index_of[parent_id]
                for level in range(1, self.max_log):
                    ancestor = self.up[level - 1][index]
                    self.up[level][index] = self.up[level - 1][ancestor]

                stack.append((node_id, parent_id, depth, True))
                for child_id in reversed(self.children[node_id]):
                    stack.append((child_id, node_id, depth + 1, False))
            else:
                total = 1
                for child_id in self.children[node_id]:
                    total += self.subtree_size[self.index_of[child_id]]
                self.subtree_size[index] = total
                self.tout[index] = timer - 1

        if len(visited) != self.size:
            raise HierarchyError(
                "The hierarchy must be connected and free of disconnected cycles."
            )

    def _require_node(self, node_id: str) -> HierarchyNode:
        node = self.nodes_by_id.get(node_id)
        if node is None:
            raise HierarchyError(f"Unknown node id: {node_id}")
        return node

    def _summary(self, node_id: str) -> dict[str, object]:
        node = self._require_node(node_id)
        index = self.index_of[node_id]
        return {
            "id": node.id,
            "name": node.name,
            "title": node.title,
            "unit": node.unit,
            "parentId": node.parent_id,
            "childrenIds": self.children[node_id],
            "depth": self.depth[index],
            "tin": self.tin[index],
            "tout": self.tout[index],
            "subtreeSize": self.subtree_size[index],
        }

    def all_nodes(self) -> list[dict[str, object]]:
        return [self._summary(node_id) for node_id in self.node_ids]

    def root_summary(self) -> dict[str, object]:
        return self._summary(self.root_id)

    def max_depth(self) -> int:
        return max(self.depth)

    def is_ancestor(self, ancestor_id: str, node_id: str) -> bool:
        ancestor = self._require_node(ancestor_id)
        node = self._require_node(node_id)
        ancestor_index = self.index_of[ancestor.id]
        node_index = self.index_of[node.id]
        return (
            self.tin[ancestor_index] <= self.tin[node_index]
            and self.tout[node_index] <= self.tout[ancestor_index]
        )

    def kth_ancestor(self, node_id: str, k: int) -> dict[str, object] | None:
        if k < 0:
            raise HierarchyError("k must be non-negative.")

        node = self._require_node(node_id)
        current_index = self.index_of[node.id]
        if k > self.depth[current_index]:
            return None

        bit = 0
        steps = k
        while steps:
            if steps & 1:
                current_index = self.up[bit][current_index]
            steps >>= 1
            bit += 1

        return self._summary(self.node_ids[current_index])

    def lca(self, first_id: str, second_id: str) -> dict[str, object]:
        first = self._require_node(first_id)
        second = self._require_node(second_id)

        if self.is_ancestor(first.id, second.id):
            return self._summary(first.id)
        if self.is_ancestor(second.id, first.id):
            return self._summary(second.id)

        current = self.index_of[first.id]
        target = second.id

        for level in range(self.max_log - 1, -1, -1):
            candidate = self.up[level][current]
            candidate_id = self.node_ids[candidate]
            if not self.is_ancestor(candidate_id, target):
                current = candidate

        lca_index = self.up[0][current]
        return self._summary(self.node_ids[lca_index])

    def distance(self, first_id: str, second_id: str) -> int:
        first = self._require_node(first_id)
        second = self._require_node(second_id)
        lca_summary = self.lca(first.id, second.id)
        first_depth = self.depth[self.index_of[first.id]]
        second_depth = self.depth[self.index_of[second.id]]
        lca_depth = self.depth[self.index_of[str(lca_summary["id"])]]
        return first_depth + second_depth - (2 * lca_depth)

    def manager_chain(self, node_id: str) -> list[dict[str, object]]:
        node = self._require_node(node_id)
        current_id = node.parent_id
        chain: list[dict[str, object]] = []

        while current_id is not None:
            chain.append(self._summary(current_id))
            current_id = self.nodes_by_id[current_id].parent_id

        return chain

    def subtree(self, node_id: str) -> dict[str, object]:
        node = self._require_node(node_id)
        index = self.index_of[node.id]
        start = self.tin[index]
        end = self.tout[index]
        member_ids = self.euler_order[start : end + 1]
        members = [self._summary(member_id) for member_id in member_ids]
        return {
            "root": self._summary(node.id),
            "members": members,
            "size": self.subtree_size[index],
        }

    def path(self, first_id: str, second_id: str) -> list[dict[str, object]]:
        self._require_node(first_id)
        self._require_node(second_id)

        lca_id = str(self.lca(first_id, second_id)["id"])

        upward_path: list[str] = []
        current_id = first_id
        while current_id != lca_id:
            upward_path.append(current_id)
            current_id = self.parent_by_id[current_id]  # type: ignore[assignment]
        upward_path.append(lca_id)

        downward_path: list[str] = []
        current_id = second_id
        while current_id != lca_id:
            downward_path.append(current_id)
            current_id = self.parent_by_id[current_id]  # type: ignore[assignment]

        full_path = upward_path + list(reversed(downward_path))
        return [self._summary(node_id) for node_id in full_path]

    def snapshot(self) -> dict[str, object]:
        return {
            "metadata": {
                "rootId": self.root_id,
                "nodeCount": self.size,
                "height": self.max_depth(),
                "techniques": ["Euler Tour", "Binary Lifting"],
                "preprocessing": "O(n log n)",
                "ancestorCheck": "O(1)",
                "lcaQuery": "O(log n)",
                "kthAncestorQuery": "O(log n)",
                "subtreeExtraction": "O(size of subtree)",
            },
            "root": self.root_summary(),
            "eulerTour": self.euler_order,
            "nodes": self.all_nodes(),
        }
