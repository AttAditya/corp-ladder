from schemas.base import StrictModel


class EmployeeLoginRequest(StrictModel):
    employee_id: str
    password: str


class CompanyLoginRequest(StrictModel):
    company_id: str
    password: str
