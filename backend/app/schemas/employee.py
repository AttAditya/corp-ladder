from schemas.base import StrictModel


class EmployeeCreateRequest(StrictModel):
    id: str
    name: str
    role: str
    company_id: str
    reports: str | None = None


class EmployeeUpdateRequest(StrictModel):
    name: str | None = None
    role: str | None = None


class ManagerUpdateRequest(StrictModel):
    reports: str | None = None


class RoleAssignmentRequest(StrictModel):
    role_id: str
