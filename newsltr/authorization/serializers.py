from rest_framework import serializers
from djoser.serializers import UserCreatePasswordRetypeSerializer


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

    def __validate_username(self, username):
        if username.strip().count(" ") <= 1:
            return username
        else:
            self.fail("username_invalid")

    def validate(self, attrs):
        attrs["username"] = self.__validate_username(attrs["username"])
        return super().validate(attrs)
