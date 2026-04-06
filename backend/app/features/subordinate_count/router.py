from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status

from features.subordinate_count.service import get_subordinate_count_snapshot
from services.auth import current_session, require_company_membership, require_employee_session
from services.organization import get_employee


router = APIRouter(prefix="/subordinate-count", tags=["subordinate-count"])


@router.get("/{employee_id}")
def read_subordinate_count(
    employee_id: str,
    session: dict[str, Any] = Depends(current_session),
) -> dict[str, Any]:
    employee = get_employee(employee_id)

    if session["principal_type"] == "employee":
        require_company_membership(session, employee["company_id"])
    elif session["principal_type"] == "company":
        if session["company_id"] != employee["company_id"]:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Cross-company actions are not allowed")
    else:
        require_employee_session(session)

    return {"employee": get_subordinate_count_snapshot(employee)}
