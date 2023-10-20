from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

from .views import WorkspaceViewSet, WorkspaceKeysViewSet, WorkspaceMembersViewSet

router = DefaultRouter()
router.register(r"workspace", WorkspaceViewSet, basename="workspace")

workspace_router = routers.NestedSimpleRouter(router, r'workspace', lookup='workspace')
workspace_router.register(r"keys", WorkspaceKeysViewSet, basename="workspace_keys")
workspace_router.register(r"members", WorkspaceMembersViewSet, basename="workspace_members")

urlpatterns = router.urls + workspace_router.urls
