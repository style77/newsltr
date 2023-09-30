from django.urls import path, re_path, include
from rest_framework import permissions

from . import settings

urlpatterns = [
    path(r"api/v1/", include("authorization.urls")),
    path(r"api/v1/health/", include("health_check.urls")),
]

if settings.DEVELOPMENT:
    from drf_spectacular.views import (
        SpectacularAPIView,
        SpectacularRedocView,
        SpectacularSwaggerView,
    )  # noqa

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
    ]
