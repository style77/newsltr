from django.contrib import admin
from django.urls import include, path

from . import settings

urlpatterns = [
    path(r"api/v1/auth/", include("authorization.urls")),
    path(r"api/v1/workspace/", include("workspaces.urls")),
    path(r"api/v1/payment/", include("payments.urls")),
    path(r"api/v1/health/", include("health_check.urls")),
    path(r"api/v1/campaigns/", include("campaigns.urls")),
    path(r"api/v1/email-templates/", include("email_templates.urls")),
]

if settings.DEVELOPMENT:
    from drf_spectacular.views import SpectacularAPIView  # noqa
    from drf_spectacular.views import (SpectacularRedocView,
                                       SpectacularSwaggerView)

    urlpatterns += [
        path("api/v1/schema/", SpectacularAPIView.as_view(), name="schema"),  # type: ignore
        # Optional UI:
        path(
            "api/v1/schema/swagger-ui/",
            SpectacularSwaggerView.as_view(url_name="schema"),
            name="swagger-ui",
        ),  # type: ignore
        path(
            "api/v1/schema/redoc/",
            SpectacularRedocView.as_view(url_name="schema"),
            name="redoc",
        ),  # type: ignore
        path(r"admin/", admin.site.urls),
    ]
