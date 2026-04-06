from __future__ import annotations

from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status

from schemas.auth import CompanyLoginRequest, EmployeeLoginRequest
from services.auth import create_token_record, current_session
from services.organization import get_company, get_employee, public_company, public_employee
from services.store import TOKENS


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/employee/login")
def employee_login(payload: EmployeeLoginRequest) -> dict[str, Any]:
    employee = get_employee(payload.employee_id)
    if payload.password != employee["_password"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    session = create_token_record("employee", employee["company_id"], employee["id"])
    return {
        "token": session["id"],
        "session": {
            "principal_type": session["principal_type"],
            "company_id": session["company_id"],
            "employee": public_employee(employee),
        },
    }


@router.post("/company/login")
def company_login(payload: CompanyLoginRequest) -> dict[str, Any]:
    company = get_company(payload.company_id)
    if payload.password != company["_password"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    session = create_token_record("company", company["id"])
    return {
        "token": session["id"],
        "session": {
            "principal_type": session["principal_type"],
            "company_id": session["company_id"],
            "company": public_company(company),
        },
    }


@router.get("/me")
def read_current_session(session: dict[str, Any] = Depends(current_session)) -> dict[str, Any]:
    if session["principal_type"] == "employee":
        return {
            "session": {
                "principal_type": "employee",
                "company_id": session["company_id"],
                "employee": public_employee(session["employee"]),
            }
        }

    return {
        "session": {
            "principal_type": "company",
            "company_id": session["company_id"],
            "company": public_company(session["company"]),
        }
    }


@router.post("/logout")
def logout(session: dict[str, Any] = Depends(current_session)) -> dict[str, Any]:
    TOKENS.DELETE(session["id"])
    return {"ok": True}
