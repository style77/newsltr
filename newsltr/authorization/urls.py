from django.urls import path, re_path, include

# Override the default djoser.urls.jwt and add my custom view for token obtain
from authorization.views import (
    EmailTokenObtainPairView,
    CustomTokenRefreshView,
    CustomTokenVerifyView,
    CustomProviderAuthView,
    LogoutView
)

urlpatterns = [
    path(r"auth/", include("djoser.urls")),
    re_path(
        r"auth/^o/(?P<provider>\S+)/$",
        CustomProviderAuthView.as_view(),
        name="provider-auth",
    ),
    path(r"auth/jwt/create/", EmailTokenObtainPairView.as_view(), name="jwt-create"),
    path(r"auth/jwt/refresh/", CustomTokenRefreshView.as_view(), name="jwt-refresh"),
    path(r"auth/jwt/verify/", CustomTokenVerifyView.as_view(), name="jwt-verify"),
    path(r"auth/logout", LogoutView.as_view(), name="logout")
]
