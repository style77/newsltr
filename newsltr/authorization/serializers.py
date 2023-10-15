from django.contrib.auth import get_user_model
from rest_framework import serializers, status
from djoser.serializers import UserCreatePasswordRetypeSerializer, UserSerializer
from djoser.conf import settings
from rest_framework_simplejwt.serializers import (
    TokenObtainSerializer,
    update_last_login,
)
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken

from newsltr.schemas import JWTCookiesScheme  # noqa

User = get_user_model()


class CustomUserCreateSerliazier(UserCreatePasswordRetypeSerializer):
    default_error_messages = {
        "name_invalid": "Enter a valid value.",
        "name_blank": "This field may not be blank.",
        "name_max_length": "Ensure this field has no more than 30 characters.",
        "name_required": "This field is required.",
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["first_name"] = serializers.CharField(
            required=True,
            style={"input_type": "text"},
        )
        self.fields["last_name"] = serializers.CharField(
            required=True,
            style={"input_type": "text"},
        )

    def validate(self, attrs):
        if attrs["first_name"] == "" or attrs["last_name"] == "":
            raise serializers.ValidationError(
                self.error_messages["name_blank"],
                code="name_blank",
            )
        if len(attrs["first_name"]) > 30 or len(attrs["last_name"]) > 30:
            raise serializers.ValidationError(
                self.error_messages["name_max_length"],
                code="name_max_length",
            )
        if (
            attrs["first_name"].isalpha() is False
            or attrs["last_name"].isalpha() is False
        ):
            raise serializers.ValidationError(
                self.error_messages["name_invalid"],
                code="name_invalid",
            )
        if attrs["first_name"] is None or attrs["last_name"] is None:
            raise serializers.ValidationError(
                self.error_messages["name_required"],
                code="name_required",
            )

        return super().validate(attrs)


class InActiveUser(AuthenticationFailed):
    status_code = status.HTTP_406_NOT_ACCEPTABLE
    default_detail = "User is not active, please confirm your email"
    default_code = "user_is_inactive"


class CustomUserSerializer(UserSerializer):
    class Meta:
        model = User
        fields = tuple(User.REQUIRED_FIELDS) + (
            settings.USER_ID_FIELD,
            settings.LOGIN_FIELD,
            "first_name",
            "last_name",
            "date_joined",
            "last_login",
        )
        read_only_fields = (settings.LOGIN_FIELD, "date_joined", "last_login")


class CustomTokenObtainPairSerializer(TokenObtainSerializer):
    username_field = settings.LOGIN_FIELD

    @classmethod
    def get_token(cls, user):
        return RefreshToken.for_user(user)

    def validate(self, attrs):
        data = super().validate(attrs)
        if not self.user.is_active:
            raise InActiveUser()

        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        if settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data
