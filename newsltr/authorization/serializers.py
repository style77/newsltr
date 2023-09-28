from django.contrib.auth import get_user_model
from rest_framework import serializers
from djoser.serializers import UserCreatePasswordRetypeSerializer, UserSerializer
from djoser.conf import settings

User = get_user_model()


class CustomUserCreateSerliazier(UserCreatePasswordRetypeSerializer):
    default_error_messages = {
        "username_invalid": "Enter a valid name and surname.",
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["username"] = serializers.CharField(
            required=True,
            style={"input_type": "text"},
        )

    def validate(self, attrs):
        return super().validate(attrs)


class CustomUserSerializer(UserSerializer):
    class Meta:
        model = User
        fields = tuple(User.REQUIRED_FIELDS) + (
            settings.USER_ID_FIELD,
            settings.LOGIN_FIELD,
            "username",
            "created_at",
            "last_login",
        )
        read_only_fields = (settings.LOGIN_FIELD, "created_at", "last_login")
