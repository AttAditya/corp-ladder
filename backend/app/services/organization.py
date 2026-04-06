from __future__ import annotations

from typing import Any

from fastapi import HTTPException, status

from core.constants import ADMIN_ROLE_ID, KNOWN_PERMISSIONS
from services.store import COMPANIES, EMPLOYEES, ROLES


def ensure_system_roles() -> None:
    admin_role = ROLES.READ(ADMIN_ROLE_ID)
    if admin_role is None:
        ROLES.UPSERT(
            ADMIN_ROLE_ID,
            {
                "id": ADMIN_ROLE_ID,
                "permissions": sorted(KNOWN_PERMISSIONS),
                "company_id": None,
            },
        )


def get_company(company_id: str) -> dict[str, Any]:
    company = COMPANIES.READ(company_id)
    if company is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company not found")
    return company


def get_employee(employee_id: str) -> dict[str, Any]:
    employee = EMPLOYEES.READ(employee_id)
    if employee is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
    return employee


def get_role(role_id: str) -> dict[str, Any]:
    role = ROLES.READ(role_id)
    if role is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Role not found")
    return role


def public_role(role: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": role["id"],
        "permissions": sorted(set(role.get("permissions", []))),
    }


def list_company_roles(company_id: str) -> list[dict[str, Any]]:
    roles = ROLES.READ()
    company_roles = []
    for role in roles:
        if role["id"] == ADMIN_ROLE_ID or role.get("company_id") == company_id:
            company_roles.append(role)
    return sorted(company_roles, key=lambda item: item["id"])


def list_company_employees(company_id: str) -> list[dict[str, Any]]:
    employees = EMPLOYEES.READ()
    company_employees = [employee for employee in employees if employee.get("company_id") == company_id]
    return sorted(company_employees, key=lambda item: item["id"])


def employee_permissions(employee: dict[str, Any]) -> list[str]:
    permissions: set[str] = set()
    for role_id in employee.get("roles", []):
        role = ROLES.READ(role_id)
        if role is None:
            continue
        permissions.update(role.get("permissions", []))
    return sorted(permissions)


def public_employee(employee: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": employee["id"],
        "name": employee["name"],
        "role": employee["role"],
        "reporting": sorted(set(employee.get("reporting", []))),
        "reports": employee.get("reports"),
        "company_id": employee["company_id"],
        "roles": sorted(set(employee.get("roles", []))),
        "permissions": employee_permissions(employee),
    }


def public_company(company: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": company["id"],
        "name": company["name"],
        "board": sorted(set(company.get("board", []))),
    }


def hierarchy_version(company: dict[str, Any]) -> int:
    return int(company.get("hierarchy_version", 0))


def company_payload(company_id: str) -> dict[str, Any]:
    company = get_company(company_id)
    return {
        **public_company(company),
        "employees": [public_employee(employee) for employee in list_company_employees(company_id)],
        "roles": [public_role(role) for role in list_company_roles(company_id)],
    }


def sync_company_board(company_id: str) -> None:
    company = get_company(company_id)
    board = [employee["id"] for employee in list_company_employees(company_id) if employee.get("reports") is None]
    company["board"] = sorted(set(board))
    company["hierarchy_version"] = hierarchy_version(company) + 1
    COMPANIES.UPSERT(company_id, company)


def assert_role_visible_to_company(role_id: str, company_id: str) -> dict[str, Any]:
    role = get_role(role_id)
    if role["id"] != ADMIN_ROLE_ID and role.get("company_id") != company_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Role does not belong to company")
    return role
