from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

from .views import (WorkspaceKeysViewSet, WorkspaceMembersViewSet,
                    WorkspaceViewSet)

router = DefaultRouter()
router.register(r"", WorkspaceViewSet, basename="workspace")

workspace_router = routers.NestedSimpleRouter(router, r"", lookup="workspace")
workspace_router.register(r"keys", WorkspaceKeysViewSet, basename="workspace-keys")
workspace_router.register(
    r"members", WorkspaceMembersViewSet, basename="workspace-members"
)

urlpatterns = router.urls + workspace_router.urls
