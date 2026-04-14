from pydantic import Field

from schemas.base import StrictModel


class CompanyAdminCreateRequest(StrictModel):
    id: str
    name: str
    role: str


class CompanyCreateRequest(StrictModel):
    id: str
    name: str
    admin: CompanyAdminCreateRequest


class CompanyUpdateRequest(StrictModel):
    name: str | None = None


class RoleUpsertRequest(StrictModel):
    id: str
    permissions: list[str] = Field(default_factory=list)
