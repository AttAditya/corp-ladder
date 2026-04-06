from __future__ import annotations

from collections import defaultdict
from typing import Any

from fastapi import HTTPException, status

from features.subordinate_count.schemas import SubordinateCountResponse
from services.organization import get_company, list_company_employees
from services.store import EULER_TOURS


def build_company_euler_tour(company_id: str) -> dict[str, Any]:
    company = get_company(company_id)
    employees = list_company_employees(company_id)
    employee_ids = {employee["id"] for employee in employees}
    children: dict[str | None, list[str]] = defaultdict(list)

    for employee in employees:
        manager_id = employee.get("reports")
        if manager_id in employee_ids:
            children[manager_id].append(employee["id"])
        else:
            children[None].append(employee["id"])

    for report_ids in children.values():
        report_ids.sort()

    entry_time: dict[str, int] = {}
    exit_time: dict[str, int] = {}
    active: set[str] = set()
    visited: set[str] = set()
    timer = 0

    def traverse(start_employee_id: str) -> None:
        nonlocal timer

        stack: list[tuple[str, bool]] = [(start_employee_id, False)]
        while stack:
            current_employee_id, exiting = stack.pop()

            if not exiting:
                if current_employee_id in active:
                    raise HTTPException(
                        status_code=status.HTTP_409_CONFLICT,
                        detail="Company hierarchy contains a reporting cycle",
                    )
                if current_employee_id in visited:
                    continue

                active.add(current_employee_id)
                visited.add(current_employee_id)
                timer += 1
                entry_time[current_employee_id] = timer

                stack.append((current_employee_id, True))
                for report_id in reversed(children.get(current_employee_id, [])):
                    stack.append((report_id, False))
                continue

            active.remove(current_employee_id)
            timer += 1
            exit_time[current_employee_id] = timer

    for root_employee_id in children.get(None, []):
        traverse(root_employee_id)

    for employee_id in sorted(employee_ids - visited):
        traverse(employee_id)

    cache_record = {
        "id": company_id,
        "company_id": company_id,
        "hierarchy_version": int(company.get("hierarchy_version", 0)),
        "entry_time": entry_time,
        "exit_time": exit_time,
        "employee_count": len(employees),
    }
    EULER_TOURS.UPSERT(company_id, cache_record)
    return cache_record


def get_company_euler_tour(company_id: str) -> dict[str, Any]:
    company = get_company(company_id)
    current_version = int(company.get("hierarchy_version", 0))
    cached = EULER_TOURS.READ(company_id)

    if cached is None or int(cached.get("hierarchy_version", -1)) != current_version:
        return build_company_euler_tour(company_id)

    return cached


def get_subordinate_count_snapshot(employee: dict[str, Any]) -> SubordinateCountResponse:
    cache = get_company_euler_tour(employee["company_id"])
    employee_id = employee["id"]

    entry_time = cache["entry_time"].get(employee_id)
    exit_time = cache["exit_time"].get(employee_id)
    if entry_time is None or exit_time is None:
        cache = build_company_euler_tour(employee["company_id"])
        entry_time = cache["entry_time"].get(employee_id)
        exit_time = cache["exit_time"].get(employee_id)

    if entry_time is None or exit_time is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not indexed in hierarchy")

    subordinate_count = max(0, (exit_time - entry_time - 1) // 2)
    return SubordinateCountResponse(
        employee_id=employee_id,
        company_id=employee["company_id"],
        subordinate_count=subordinate_count,
        entry_time=entry_time,
        exit_time=exit_time,
        hierarchy_version=cache["hierarchy_version"],
    )
