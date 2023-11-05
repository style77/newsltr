from django.conf import settings
from drf_spectacular.openapi import OpenApiAuthenticationExtension


class JWTCookiesScheme(OpenApiAuthenticationExtension):
    target_class = "authorization.authentication.JWTCookiesAuthentication"
    name = "JWTCookiesAuthentication"
    match_subclasses = True
    priority = 1

    def get_security_definition(self, auto_schema):
        return {
            "type": "apiKey",
            "in": "cookie",
            "name": settings.SIMPLE_JWT["AUTH_COOKIE"],
        }


class APIKeyScheme(OpenApiAuthenticationExtension):
    target_class = "authorization.authentication.APIKeyAuthentication"
    name = "APIKeyAuthentication"

    def get_security_definition(self, auto_schema):
        return {
            "type": "apiKey",
            "in": "header",
            "name": "X-API-KEY",
        }
