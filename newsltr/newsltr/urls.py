from django.urls import path, include
from rest_framework.schemas import get_schema_view

urlpatterns = [
    path(r'api/v1/', include('authorization.urls')),
    path(r'api/v1/openapi', get_schema_view(
        title="Newsltr",
        description="Documentation for Newsltr API",
        version="1.0.0"
    ), name='openapi-schema'),
]
