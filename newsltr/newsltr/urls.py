from django.urls import path, re_path, include
from rest_framework import permissions

from . import settings

urlpatterns = [
    path(r"api/v1/", include("authorization.urls")),
    path(r"api/v1/health/", include("health_check.urls")),
]

if settings.DEVELOPMENT:
    from drf_yasg.views import get_schema_view  # noqa
    from drf_yasg import openapi  # noqa

    schema_view = get_schema_view(
        openapi.Info(
            title="Your API",
            default_version="v1",
            description="Your API description",
            terms_of_service="https://www.yourapp.com/terms/",
            contact=openapi.Contact(email="contact@yourapp.com"),
            license=openapi.License(name="Your License"),
        ),
        public=True,
        permission_classes=(permissions.AllowAny,),
    )

    urlpatterns += [
        path(
            "swagger/",
            schema_view.with_ui("swagger", cache_timeout=0),
            name="schema-swagger-ui",
        ),
        re_path(
            r"^swagger(?P<format>\.json|\.yaml)$",
            schema_view.without_ui(cache_timeout=0),
            name="schema-json",
        ),
    ]
