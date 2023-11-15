from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.request import Request
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings

from workspaces.models import WorkspaceAPIKey


class JWTCookiesAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)

        if header is None:
            raw_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"]) or None
        else:
            raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token


class APIKeyAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = self.get_header(request)
        if not token:
            return None

        if is_valid_token := WorkspaceAPIKey.objects.is_valid(key=token):
            return None, token
        else:
            raise AuthenticationFailed("Invalid apikey")

    def authenticate_header(self, request):
        return "X-API-KEY"

    @staticmethod
    def get_header(request: Request) -> str:
        return request.META.get("HTTP_X_API_KEY")
