from __future__ import annotations

import secrets
from typing import Any

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials

from core.security import bearer_scheme
from services.organization import employee_permissions
from services.store import COMPANIES, EMPLOYEES, TOKENS


def create_token_record(principal_type: str, company_id: str, employee_id: str | None = None) -> dict[str, Any]:
    token = secrets.token_urlsafe(32)
    session = {
        "id": token,
        "principal_type": principal_type,
        "company_id": company_id,
        "employee_id": employee_id,
    }
    TOKENS.UPSERT(token, session)
    return session


def delete_employee_tokens(employee_id: str) -> None:
    for session in TOKENS.READ():
        if session.get("principal_type") == "employee" and session.get("employee_id") == employee_id:
            TOKENS.DELETE(session["id"])


def delete_company_tokens(company_id: str) -> None:
    for session in TOKENS.READ():
        if session.get("principal_type") == "company" and session.get("company_id") == company_id:
            TOKENS.DELETE(session["id"])


def current_session(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict[str, Any]:
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")

    session = TOKENS.READ(credentials.credentials)
    if session is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    if session.get("principal_type") == "employee":
        employee_id = session.get("employee_id")
        if employee_id is None:
            TOKENS.DELETE(session["id"])
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        employee = EMPLOYEES.READ(employee_id)
        if employee is None:
            TOKENS.DELETE(session["id"])
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        session["employee"] = employee
    elif session.get("principal_type") == "company":
        company = COMPANIES.READ(session.get("company_id"))
        if company is None:
            TOKENS.DELETE(session["id"])
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        session["company"] = company
    else:
        TOKENS.DELETE(session["id"])
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    return session


def require_employee_session(session: dict[str, Any]) -> dict[str, Any]:
    if session.get("principal_type") != "employee":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Employee authentication required")
    return session["employee"]


def require_company_membership(session: dict[str, Any], company_id: str) -> dict[str, Any]:
    employee = require_employee_session(session)
    if employee.get("company_id") != company_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Action restricted to company users")
    return employee


def require_permission(employee: dict[str, Any], permission: str) -> None:
    if permission not in employee_permissions(employee):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Missing '{permission}' permission")


def ensure_same_company(actor: dict[str, Any], target: dict[str, Any]) -> None:
    if actor.get("company_id") != target.get("company_id"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Cross-company actions are not allowed")
