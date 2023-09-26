from django.urls import path, include

urlpatterns = [
    path(r"auth/", include("djoser.urls")),
    path(r"auth/", include("djoser.urls.jwt")),
    path(r"auth/", include("djoser.social.urls")),
]
