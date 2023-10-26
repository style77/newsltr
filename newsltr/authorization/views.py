from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.conf import settings

from djoser.social.views import ProviderAuthView
from social_django.utils import load_backend, load_strategy

from rest_framework_simplejwt.views import (
    TokenViewBase,
    TokenVerifyView,
    TokenRefreshView,
)
from rest_framework_simplejwt.exceptions import (
    AuthenticationFailed,
    TokenError,
    InvalidToken,
)
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiTypes

from authorization.serializers import CustomTokenObtainPairSerializer, InActiveUser


@extend_schema(
    tags=["social authorization"],
    parameters=[
        OpenApiParameter(
            name="provider",
            required=True,
            location=OpenApiParameter.PATH,
            type=OpenApiTypes.STR,
            description="Provider name",
        ),
    ],
)
class CustomProviderAuthView(ProviderAuthView):
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 201:
            access_token = response.data.get("access")
            refresh_token = response.data.get("refresh")

            response.set_cookie(
                "access",
                access_token,
                max_age=settings.SIMPLE_JWT["AUTH_COOKIE_MAX_AGE"],
                path=settings.SIMPLE_JWT["AUTH_COOKIE_PATH"],
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            )
            response.set_cookie(
                "refresh",
                refresh_token,
                max_age=settings.SIMPLE_JWT["AUTH_COOKIE_MAX_AGE"],
                path=settings.SIMPLE_JWT["AUTH_COOKIE_PATH"],
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            )

        return response


class EmailTokenObtainPairView(TokenViewBase):
    """
    Takes a set of user credentials and returns an access and refresh JSON web
    token pair to prove the authentication of those credentials.
    """

    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except AuthenticationFailed:
            raise InActiveUser()
        except TokenError:
            raise InvalidToken()

        response = Response(serializer.validated_data, status=status.HTTP_200_OK)
        response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=serializer.validated_data["access"],
            expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
        )
        response.set_cookie(
            key=settings.SIMPLE_JWT["REFRESH_COOKIE"],
            value=serializer.validated_data["refresh"],
            expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
        )

        return response


class CustomTokenRefreshView(TokenRefreshView):
    """
    Takes a refresh type JSON web token and returns an access type JSON web
    token if the refresh token is valid.
    """

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT["REFRESH_COOKIE"])

        if refresh_token:
            request.data["refresh"] = refresh_token

        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            response.set_cookie(
                key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                value=response.data.get("access"),
                expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            )

            return response


class CustomTokenVerifyView(TokenVerifyView):
    """
    Takes a token and returns correct HTTP status if it is valid or not.
    """

    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"])

        if access_token:
            request.data["token"] = access_token

        return super().post(request, *args, **kwargs)


class LogoutView(APIView):
    """
    Logout user by deleting cookies.
    """

    serializer_class = None

    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie(settings.SIMPLE_JWT["AUTH_COOKIE"])
        response.delete_cookie(settings.SIMPLE_JWT["REFRESH_COOKIE"])

        return response
