from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status

from features.distance.schemas import DistanceResponse
from features.distance.service import get_distance
from services.auth import current_session, require_company_membership, require_employee_session
from services.organization import get_employee


router = APIRouter(prefix="/distance", tags=["distance"])


@router.get("/{employee_id_1}/{employee_id_2}")
def read_distance(
    employee_id_1: str,
    employee_id_2: str,
    session: dict[str, Any] = Depends(current_session),
) -> DistanceResponse:
    """
    Get distance between two employees in the organizational hierarchy.

    Args:
        employee_id_1: First employee ID
        employee_id_2: Second employee ID
        session: Current session (authenticated user)

    Returns:
        DistanceResponse with distance and employee details

    Raises:
        HTTPException: If employees not found or in different companies
    """
    # Get both employees (will raise 404 if not found)
    employee1 = get_employee(employee_id_1)
    employee2 = get_employee(employee_id_2)

    # Verify employees are in same company
    if employee1["company_id"] != employee2["company_id"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Both employees must belong to the same company",
        )

    company_id = employee1["company_id"]

    # Verify session has access to this company
    if session["principal_type"] == "employee":
        require_company_membership(session, company_id)
    elif session["principal_type"] == "company":
        if session["company_id"] != company_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Cross-company actions are not allowed",
            )
    else:
        require_employee_session(session)

    # Calculate distance
    try:
        distance = get_distance(company_id, employee_id_1, employee_id_2)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    return DistanceResponse(
        distance=distance,
        employee_id_1=employee_id_1,
        employee_id_2=employee_id_2,
        company_id=company_id,
    )
