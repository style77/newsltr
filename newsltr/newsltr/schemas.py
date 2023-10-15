from drf_spectacular.openapi import OpenApiAuthenticationExtension


class JWTCookiesScheme(OpenApiAuthenticationExtension):
    target_class = "authorization.authentication.JWTCookiesAuthentication"
    name = "JWTCookiesAuthentication"
    match_subclasses = True
    priority = 1

    def get_security_definition(self, auto_schema):
        return {
        }
