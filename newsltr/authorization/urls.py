from django.urls import path, include

# Override the default djoser.urls.jwt and add my custom view for token obtain
from authorization.views import EmailTokenObtainPairView, CustomTokenRefreshView
from rest_framework_simplejwt.views import TokenVerifyView

urlpatterns = [
    path(r"auth/", include("djoser.urls")),
    path(r"auth/", include("djoser.social.urls")),
    path(r"auth/jwt/create/", EmailTokenObtainPairView.as_view(), name="jwt-create"),
    path(r"auth/jwt/refresh/", CustomTokenRefreshView.as_view(), name="jwt-refresh"),
    path(r"auth/jwt/verify/", TokenVerifyView.as_view(), name="jwt-verify")
]
