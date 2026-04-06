from __future__ import annotations

from typing import Any

from fastapi import APIRouter, Depends

from services.auth import current_session


class FeatureMetadata:
    """Feature metadata definition"""

    def __init__(self, id: str, name: str, description: str, enabled: bool = True):
        self.id = id
        self.name = name
        self.description = description
        self.enabled = enabled

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "enabled": self.enabled,
        }


# Available features in the system
AVAILABLE_FEATURES = [
    FeatureMetadata(
        id="tree-view",
        name="Organization Tree",
        description="Visualize your company's organizational hierarchy and reporting structure",
        enabled=True,
    ),
    FeatureMetadata(
        id="subordinate-count",
        name="Subordinate Count",
        description="View the count of direct and indirect reports for each employee",
        enabled=True,
    ),
]


router = APIRouter(prefix="/features", tags=["features"])


@router.get("")
def list_features(session: dict = Depends(current_session)) -> dict[str, Any]:
    """List all available features for the authenticated user"""
    features = [feature.to_dict() for feature in AVAILABLE_FEATURES]
    return {"features": features}
