from __future__ import annotations

from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status

from core.constants import ADMIN_ROLE_ID, KNOWN_PERMISSIONS
from schemas.company import CompanyCreateRequest, CompanyUpdateRequest, RoleUpsertRequest
from services.auth import create_token_record, current_session, delete_company_tokens, require_company_membership, require_permission
from services.organization import company_payload, get_company, list_company_roles, public_company, public_employee, public_role, sync_company_board
from services.store import COMPANIES, EMPLOYEES, ROLES


router = APIRouter(prefix="/company", tags=["company"])


@router.get("")
def list_companies() -> dict[str, Any]:
    companies = [public_company(company) for company in sorted(COMPANIES.READ(), key=lambda item: item["id"])]
    return {"companies": companies}


@router.get("/{company_id}")
def read_company(company_id: str) -> dict[str, Any]:
    return {"company": company_payload(company_id)}


@router.get("/{company_id}/roles")
def read_company_roles(company_id: str) -> dict[str, Any]:
    get_company(company_id)
    return {"roles": [public_role(role) for role in list_company_roles(company_id)]}


@router.post("", status_code=status.HTTP_201_CREATED)
def create_company(payload: CompanyCreateRequest) -> dict[str, Any]:
    if COMPANIES.READ(payload.id) is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Company already exists")
    if EMPLOYEES.READ(payload.admin.id) is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Admin employee already exists")

    company = {
        "id": payload.id,
        "name": payload.name,
        "board": [payload.admin.id],
        "hierarchy_version": 0,
        "_password": payload.password,
    }
    employee = {
        "id": payload.admin.id,
        "name": payload.admin.name,
        "role": payload.admin.role,
        "reporting": [],
        "reports": None,
        "company_id": payload.id,
        "roles": [ADMIN_ROLE_ID],
        "_password": payload.admin.password,
    }

    COMPANIES.UPSERT(company["id"], company)
    EMPLOYEES.UPSERT(employee["id"], employee)
    sync_company_board(payload.id)

    session = create_token_record("employee", payload.id, payload.admin.id)
    return {
        "company": company_payload(payload.id),
        "token": session["id"],
        "session": {
            "principal_type": session["principal_type"],
            "company_id": session["company_id"],
            "employee": public_employee(employee),
        },
    }


@router.patch("/{company_id}")
def update_company(
    company_id: str,
    payload: CompanyUpdateRequest,
    session: dict[str, Any] = Depends(current_session),
) -> dict[str, Any]:
    actor = require_company_membership(session, company_id)
    require_permission(actor, "update")

    updates = payload.model_dump(exclude_none=True)
    if not updates:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No company fields supplied")

    company = get_company(company_id)
    if payload.name is not None:
        company["name"] = payload.name
    if payload.password is not None:
        company["_password"] = payload.password
        delete_company_tokens(company_id)

    COMPANIES.UPSERT(company_id, company)
    return {"company": company_payload(company_id)}


@router.post("/{company_id}/roles", status_code=status.HTTP_201_CREATED)
def upsert_company_role(
    company_id: str,
    payload: RoleUpsertRequest,
    session: dict[str, Any] = Depends(current_session),
) -> dict[str, Any]:
    actor = require_company_membership(session, company_id)
    require_permission(actor, "assign")
    get_company(company_id)

    if payload.id == ADMIN_ROLE_ID:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Built-in admin role cannot be overwritten")

    invalid_permissions = sorted(set(payload.permissions) - KNOWN_PERMISSIONS)
    if invalid_permissions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unknown permissions: {', '.join(invalid_permissions)}",
        )

    existing = ROLES.READ(payload.id)
    if existing is not None and existing.get("company_id") not in (None, company_id):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Role id already belongs to another company")

    role = {
        "id": payload.id,
        "permissions": sorted(set(payload.permissions)),
        "company_id": company_id,
    }
    ROLES.UPSERT(payload.id, role)
    return {"role": public_role(role)}
