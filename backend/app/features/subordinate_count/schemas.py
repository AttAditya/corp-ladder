from schemas.base import StrictModel


class SubordinateCountResponse(StrictModel):
    employee_id: str
    company_id: str
    subordinate_count: int
    entry_time: int
    exit_time: int
    hierarchy_version: int
