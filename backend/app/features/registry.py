from __future__ import annotations

from fastapi import APIRouter

from features.distance.router import router as distance_router
from features.subordinate_count.router import router as subordinate_count_router

# Register routers from independently developed feature packages here.
FEATURE_ROUTERS: tuple[APIRouter, ...] = (subordinate_count_router, distance_router)
