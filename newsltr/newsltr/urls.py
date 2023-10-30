from django.contrib import admin
from django.urls import include, path

from . import settings

urlpatterns = [
    path(r"api/v1/", include("authorization.urls")),
    path(r"api/v1/", include("workspaces.urls")),
    path(r"api/v1/payment/", include("payments.urls")),
    path(r"api/v1/health/", include("health_check.urls")),
]

if settings.DEVELOPMENT:
    from drf_spectacular.views import SpectacularAPIView  # noqa
    from drf_spectacular.views import SpectacularRedocView, SpectacularSwaggerView

    urlpatterns += [
        path("api/v1/schema/", SpectacularAPIView.as_view(), name="schema"),
        # Optional UI:
        path(
            "api/v1/schema/swagger-ui/",
            SpectacularSwaggerView.as_view(url_name="schema"),
            name="swagger-ui",
        ),
        path(
            "api/v1/schema/redoc/",
            SpectacularRedocView.as_view(url_name="schema"),
            name="redoc",
        ),
        path(r"admin/", admin.site.urls),
    ]
