from __future__ import annotations

from typing import Any

from fastapi import APIRouter

from core.constants import API_V1_PREFIX


router = APIRouter(tags=["system"])


@router.get("/")
def root() -> dict[str, Any]:
    return {
        "name": "Corp Ladder API",
        "version": "1.0.0",
        "endpoints": ["/company", "/employee", "/auth"],
        "versioned_endpoints": [
            f"{API_V1_PREFIX}/company",
            f"{API_V1_PREFIX}/employee",
            f"{API_V1_PREFIX}/auth",
        ],
    }
