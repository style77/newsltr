from rest_framework.routers import DefaultRouter

from .views import WorkspaceViewSet

router = DefaultRouter()
router.register(r"workspaces", WorkspaceViewSet, basename="workspaces")

urlpatterns = router.urls
