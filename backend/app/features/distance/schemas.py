from schemas.base import StrictModel


class DistanceResponse(StrictModel):
    """Response model for distance between two employees."""
    distance: int
    employee_id_1: str
    employee_id_2: str
    company_id: str
