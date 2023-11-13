from django.urls import include, path

# Override the default djoser.urls.jwt and add my custom view for token obtain
from authorization.views import (
    CustomTokenRefreshView,
    CustomTokenVerifyView,
    EmailTokenObtainPairView,
    LogoutView,
)

urlpatterns = [
    path(r"", include("djoser.urls")),
    path(r"jwt/create/", EmailTokenObtainPairView.as_view(), name="jwt-create"),
    path(r"jwt/refresh/", CustomTokenRefreshView.as_view(), name="jwt-refresh"),
    path(r"jwt/verify/", CustomTokenVerifyView.as_view(), name="jwt-verify"),
    path(r"logout/", LogoutView.as_view(), name="logout"),
]
