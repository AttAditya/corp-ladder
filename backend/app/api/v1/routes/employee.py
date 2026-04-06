from __future__ import annotations

from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status

from schemas.employee import EmployeeCreateRequest, EmployeeUpdateRequest, ManagerUpdateRequest, RoleAssignmentRequest
from services.auth import (
    current_session,
    delete_employee_tokens,
    ensure_same_company,
    require_company_membership,
    require_employee_session,
    require_permission,
)
from services.employee import detach_from_manager, set_employee_manager
from services.organization import assert_role_visible_to_company, get_company, get_employee, public_employee, sync_company_board
from services.store import EMPLOYEES


router = APIRouter(prefix="/employee", tags=["employee"])


@router.get("")
def list_employees(company_id: str | None = None) -> dict[str, Any]:
    employees = EMPLOYEES.READ()
    if company_id is not None:
        employees = [employee for employee in employees if employee.get("company_id") == company_id]
    employees = sorted(employees, key=lambda item: item["id"])
    return {"employees": [public_employee(employee) for employee in employees]}


@router.get("/{employee_id}")
def read_employee(employee_id: str) -> dict[str, Any]:
    return {"employee": public_employee(get_employee(employee_id))}


@router.post("", status_code=status.HTTP_201_CREATED)
def create_employee(
    payload: EmployeeCreateRequest,
    session: dict[str, Any] = Depends(current_session),
) -> dict[str, Any]:
    actor = require_company_membership(session, payload.company_id)
    require_permission(actor, "invite")

    if EMPLOYEES.READ(payload.id) is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Employee already exists")

    get_company(payload.company_id)
    if payload.reports is not None:
        manager = get_employee(payload.reports)
        if manager["company_id"] != payload.company_id:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Manager must belong to same company")

    employee = {
        "id": payload.id,
        "name": payload.name,
        "role": payload.role,
        "reporting": [],
        "reports": None,
        "company_id": payload.company_id,
        "roles": [],
        "_password": payload.password,
    }
    EMPLOYEES.UPSERT(employee["id"], employee)

    if payload.reports is not None:
        employee = set_employee_manager(payload.id, payload.reports)
    else:
        sync_company_board(payload.company_id)

    return {"employee": public_employee(employee)}


@router.patch("/{employee_id}")
def update_employee(
    employee_id: str,
    payload: EmployeeUpdateRequest,
    session: dict[str, Any] = Depends(current_session),
) -> dict[str, Any]:
    actor = require_employee_session(session)
    target = get_employee(employee_id)
    ensure_same_company(actor, target)

    if actor["id"] != target["id"]:
        require_permission(actor, "update")

    updates = payload.model_dump(exclude_none=True)
    if not updates:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No employee fields supplied")

    if payload.name is not None:
        target["name"] = payload.name
    if payload.role is not None:
        target["role"] = payload.role
    if payload.password is not None:
        target["_password"] = payload.password
        delete_employee_tokens(target["id"])

    EMPLOYEES.UPSERT(target["id"], target)
    return {"employee": public_employee(target)}


@router.patch("/{employee_id}/manager")
def change_employee_manager(
    employee_id: str,
    payload: ManagerUpdateRequest,
    session: dict[str, Any] = Depends(current_session),
) -> dict[str, Any]:
    actor = require_employee_session(session)
    target = get_employee(employee_id)
    ensure_same_company(actor, target)
    require_permission(actor, "manage")

    if payload.reports is not None:
        manager = get_employee(payload.reports)
        ensure_same_company(actor, manager)

    employee = set_employee_manager(employee_id, payload.reports)
    return {"employee": public_employee(employee)}


@router.post("/{employee_id}/roles")
def assign_role(
    employee_id: str,
    payload: RoleAssignmentRequest,
    session: dict[str, Any] = Depends(current_session),
) -> dict[str, Any]:
    actor = require_employee_session(session)
    target = get_employee(employee_id)
    ensure_same_company(actor, target)
    require_permission(actor, "assign")

    if actor["id"] == target["id"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You cannot assign roles to yourself")

    role = assert_role_visible_to_company(payload.role_id, actor["company_id"])
    target["roles"] = sorted(set(target.get("roles", [])) | {role["id"]})
    EMPLOYEES.UPSERT(target["id"], target)
    return {"employee": public_employee(target)}


@router.delete("/{employee_id}/roles/{role_id}")
def revoke_role(
    employee_id: str,
    role_id: str,
    session: dict[str, Any] = Depends(current_session),
) -> dict[str, Any]:
    actor = require_employee_session(session)
    target = get_employee(employee_id)
    ensure_same_company(actor, target)
    require_permission(actor, "revoke")

    if actor["id"] == target["id"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You cannot revoke your own roles")

    assert_role_visible_to_company(role_id, actor["company_id"])
    target["roles"] = sorted({assigned_role for assigned_role in target.get("roles", []) if assigned_role != role_id})
    EMPLOYEES.UPSERT(target["id"], target)
    return {"employee": public_employee(target)}


@router.delete("/{employee_id}")
def remove_employee(
    employee_id: str,
    session: dict[str, Any] = Depends(current_session),
) -> dict[str, Any]:
    actor = require_employee_session(session)
    target = get_employee(employee_id)
    ensure_same_company(actor, target)
    require_permission(actor, "remove")

    if actor["id"] == target["id"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You cannot remove yourself")

    manager_id = target.get("reports")
    for report_id in list(target.get("reporting", [])):
        if EMPLOYEES.READ(report_id) is not None:
            set_employee_manager(report_id, manager_id)

    detach_from_manager(target)
    EMPLOYEES.DELETE(target["id"])
    delete_employee_tokens(target["id"])
    sync_company_board(target["company_id"])
    return {"removed_employee_id": employee_id}
