from rest_framework import status
from rest_framework.response import Response

from rest_framework_simplejwt.views import TokenViewBase
from rest_framework_simplejwt.exceptions import (
    AuthenticationFailed,
    TokenError,
    InvalidToken,
)
from authorization.serializers import CustomTokenObtainPairSerializer, InActiveUser


class EmailTokenObtainPairView(TokenViewBase):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except AuthenticationFailed:
            raise InActiveUser()
        except TokenError:
            raise InvalidToken()

        return Response(serializer.validated_data, status=status.HTTP_200_OK)
