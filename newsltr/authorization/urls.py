from django.urls import include, path

# Override the default djoser.urls.jwt and add my custom view for token obtain
from authorization.views import (
    CustomTokenRefreshView,
    CustomTokenVerifyView,
    EmailTokenObtainPairView,
    LogoutView,
)

urlpatterns = [
    path(r"auth/", include("djoser.urls")),
    # path(r"auth/accounts/", include("allauth.urls")),
    path(r"auth/jwt/create/", EmailTokenObtainPairView.as_view(), name="jwt-create"),
    path(r"auth/jwt/refresh/", CustomTokenRefreshView.as_view(), name="jwt-refresh"),
    path(r"auth/jwt/verify/", CustomTokenVerifyView.as_view(), name="jwt-verify"),
    path(r"auth/logout/", LogoutView.as_view(), name="logout"),
]
