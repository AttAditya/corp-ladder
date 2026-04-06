"""Distance calculation service using binary lifting."""
import json
from collections import defaultdict, deque
from services.store import get_table
from services.organization import get_company, get_employee


# Maximum power of 2 for binary lifting (2^20 = 1,048,576 levels)
MAX_LOG = 20


def build_company_lift_table(company_id: str):
    """
    Build binary lifting table for efficient LCA (Lowest Common Ancestor) queries.

    Args:
        company_id: Company ID to build lift table for

    Returns:
        Lift table dict with depth and ancestors mapping
    """
    company = get_company(company_id)

    # Initialize depth and ancestor tracking
    depth = {}
    ancestors = defaultdict(lambda: {})

    # Get all employees
    table = get_table("employees")
    all_employees = {}
    for emp_id in table.keys():
        emp = get_employee(emp_id)
        if emp["company_id"] == company_id:
            all_employees[emp_id] = emp

    # Find roots (employees with no manager - on board)
    roots = company.get("board", [])

    # BFS to build depth and parent relationships
    queue = deque([(root_id, 0) for root_id in roots])
    visited = set(roots)
    parent_map = {}  # node -> direct parent

    while queue:
        node_id, node_depth = queue.popleft()
        depth[node_id] = node_depth

        # Process direct reports (children)
        if node_id in all_employees:
            for child_id in all_employees[node_id].get("reporting", []):
                if child_id not in visited:
                    visited.add(child_id)
                    parent_map[child_id] = node_id
                    queue.append((child_id, node_depth + 1))

    # Build binary lifting table for each node
    for node_id in all_employees:
        if node_id not in depth:
            # Isolated node (shouldn't happen in valid hierarchy)
            depth[node_id] = 0
            parent_map[node_id] = None

        # ancestors[node_id][k] = ancestor at distance 2^k
        ancestors[node_id]["0"] = parent_map.get(node_id)

        # Build higher level ancestors using previously computed ones
        for k in range(1, MAX_LOG):
            prev_ancestor = ancestors[node_id].get(str(k - 1))
            if prev_ancestor and prev_ancestor in ancestors:
                ancestors[node_id][str(k)] = ancestors[prev_ancestor].get(str(k - 1))
            else:
                ancestors[node_id][str(k)] = None

    # Create lift table object
    lift_table = {
        "id": company_id,
        "company_id": company_id,
        "hierarchy_version": company.get("hierarchy_version", 0),
        "depth": depth,
        "ancestors": dict(ancestors),
    }

    # Cache in Redis
    table = get_table("lift_tables")
    table.UPSERT(company_id, lift_table)

    return lift_table


def get_company_lift_table(company_id: str) -> dict:
    """
    Get company's lift table, rebuilding if stale.

    Args:
        company_id: Company ID

    Returns:
        Lift table dict
    """
    company = get_company(company_id)
    current_version = company.get("hierarchy_version", 0)

    # Try to get cached lift table
    table = get_table("lift_tables")
    cached = table.READ(company_id)

    if cached:
        lift_table = cached if isinstance(cached, dict) else json.loads(cached)
        # Check if cache is still valid
        if lift_table.get("hierarchy_version") == current_version:
            return lift_table

    # Cache is missing or stale, rebuild
    return build_company_lift_table(company_id)


def get_distance(company_id: str, employee_id1: str, employee_id2: str) -> int:
    """
    Calculate distance between two employees using binary lifting.

    Distance = depth[emp1] + depth[emp2] - 2 * depth[LCA(emp1, emp2)]

    Args:
        company_id: Company ID
        employee_id1: First employee ID
        employee_id2: Second employee ID

    Returns:
        Distance (number of edges) between the two employees

    Raises:
        ValueError: If employees don't exist or are in different companies
    """
    # Validate employees exist and are in the same company
    emp1 = get_employee(employee_id1)
    emp2 = get_employee(employee_id2)

    if emp1["company_id"] != company_id or emp2["company_id"] != company_id:
        raise ValueError("Both employees must be in the specified company")

    # Get lift table (builds if needed)
    lift_table = get_company_lift_table(company_id)

    depth = lift_table["depth"]
    ancestors = lift_table["ancestors"]

    # Same employee
    if employee_id1 == employee_id2:
        return 0

    # Handle case where employee not in lift table (shouldn't happen)
    if employee_id1 not in depth or employee_id2 not in depth:
        raise ValueError("One or both employees not found in company hierarchy")

    # Find LCA using binary lifting
    node1 = employee_id1
    node2 = employee_id2

    d1 = depth[node1]
    d2 = depth[node2]

    # Bring both nodes to same depth
    if d1 > d2:
        node1, node2 = node2, node1
        d1, d2 = d2, d1

    # Lift node2 to match node1's depth
    diff = d2 - d1
    for k in range(MAX_LOG):
        if (diff >> k) & 1:  # If bit k is set in diff
            node2_ancestors = ancestors.get(node2, {})
            node2 = node2_ancestors.get(str(k))
            if node2 is None:
                raise ValueError("Error lifting node to same depth")

    # If nodes are same at this point, node1 is ancestor of node2
    if node1 == node2:
        return d2 - d1

    # Lift both nodes simultaneously until they meet at LCA
    for k in range(MAX_LOG - 1, -1, -1):
        node1_ancestors = ancestors.get(node1, {})
        node2_ancestors = ancestors.get(node2, {})

        ancestor1 = node1_ancestors.get(str(k))
        ancestor2 = node2_ancestors.get(str(k))

        # If ancestors are different, we can safely lift both
        if ancestor1 and ancestor2 and ancestor1 != ancestor2:
            node1 = ancestor1
            node2 = ancestor2

    # Now node1 and node2 are children of LCA
    node1_ancestors = ancestors.get(node1, {})
    lca = node1_ancestors.get("0")  # Parent of node1 is the LCA

    if lca is None:
        raise ValueError("Could not find LCA")

    # Distance = depth[node1_original] + depth[node2_original] - 2 * depth[lca]
    lca_depth = depth.get(lca, 0)
    distance = depth[employee_id1] + depth[employee_id2] - 2 * lca_depth

    return distance
