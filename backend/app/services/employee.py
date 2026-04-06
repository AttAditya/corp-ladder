from __future__ import annotations

from typing import Any

from fastapi import HTTPException, status

from services.organization import get_employee, sync_company_board
from services.store import EMPLOYEES


def set_employee_manager(employee_id: str, manager_id: str | None) -> dict[str, Any]:
    employee = get_employee(employee_id)
    company_id = employee["company_id"]
    old_manager_id = employee.get("reports")

    if manager_id == employee_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Employee cannot report to self")

    if old_manager_id == manager_id:
        return employee

    new_manager: dict[str, Any] | None = None
    if manager_id is not None:
        new_manager = get_employee(manager_id)
        if new_manager["company_id"] != company_id:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Manager must belong to same company")

        cursor = new_manager
        while cursor is not None:
            if cursor["id"] == employee_id:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Reporting cycle detected")
            parent_id = cursor.get("reports")
            cursor = EMPLOYEES.READ(parent_id) if parent_id else None

    if old_manager_id is not None:
        old_manager = EMPLOYEES.READ(old_manager_id)
        if old_manager is not None:
            old_manager["reporting"] = sorted(
                {report_id for report_id in old_manager.get("reporting", []) if report_id != employee_id}
            )
            EMPLOYEES.UPSERT(old_manager["id"], old_manager)

    employee["reports"] = manager_id
    employee["reporting"] = sorted(set(employee.get("reporting", [])))
    EMPLOYEES.UPSERT(employee_id, employee)

    if new_manager is not None:
        new_manager["reporting"] = sorted(set(new_manager.get("reporting", [])) | {employee_id})
        EMPLOYEES.UPSERT(new_manager["id"], new_manager)

    sync_company_board(company_id)
    return get_employee(employee_id)


def detach_from_manager(employee: dict[str, Any]) -> None:
    manager_id = employee.get("reports")
    if manager_id is None:
        return

    manager = EMPLOYEES.READ(manager_id)
    if manager is None:
        return

    manager["reporting"] = sorted({report_id for report_id in manager.get("reporting", []) if report_id != employee["id"]})
    EMPLOYEES.UPSERT(manager["id"], manager)
