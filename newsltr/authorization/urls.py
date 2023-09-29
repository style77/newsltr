from django.urls import path, include

# Override the default djoser.urls.jwt and add my custom view for token obtain
from authorization.views import EmailTokenObtainPairView
from djoser.urls.jwt import urlpatterns as jwt_urlpatterns

jwt_urlpatterns.pop(0)

urlpatterns = [
    path(r"auth/", include("djoser.urls")),
    path(r"auth/", include("djoser.urls.jwt")),
    path(r"auth/", include("djoser.social.urls")),
    path(r"auth/jwt/create/", EmailTokenObtainPairView.as_view(), name="jwt-create"),
]
