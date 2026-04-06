from fastapi import APIRouter

from api.v1.routes import auth, company, employee, features, root
from core.constants import API_V1_PREFIX
from features.registry import FEATURE_ROUTERS as MODULAR_FEATURE_ROUTERS


LEGACY_FEATURE_ROUTERS = (
    root.router,
    company.router,
    employee.router,
    auth.router,
    features.router,
)
FEATURE_ROUTERS = (*LEGACY_FEATURE_ROUTERS, *MODULAR_FEATURE_ROUTERS)


def build_resource_router(prefix: str = "", include_in_schema: bool = True) -> APIRouter:
    router = APIRouter(prefix=prefix)
    for feature_router in FEATURE_ROUTERS:
        router.include_router(feature_router, include_in_schema=include_in_schema)
    return router


def build_api_router() -> APIRouter:
    router = APIRouter()
    router.include_router(build_resource_router(prefix=API_V1_PREFIX))
    router.include_router(build_resource_router(include_in_schema=False))
    return router


api_router = build_api_router()
