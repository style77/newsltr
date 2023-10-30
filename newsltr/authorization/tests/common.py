from unittest import mock

from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.urls import reverse

__all__ = [
    "get_user_model",
    "IntegrityError",
    "mock",
    "TEST_DATA",
]


TEST_DATA = {
    "first_name": "Test",
    "last_name": "Test",
    "email": "test@test.com",
    "password": "#Test1234",
}


def create_user(first_name=None, last_name=None, email=None, password=None, **kwargs):
    data = {
        "first_name": first_name or TEST_DATA["first_name"],
        "last_name": last_name or TEST_DATA["last_name"],
        "email": email or TEST_DATA["email"],
        "password": password or TEST_DATA["password"],
    }
    data.update(kwargs)
    user = get_user_model().objects.create_user(**data)
    user.raw_password = data["password"]

    return user


def login_user(client, email, password):
    response = client.post(
        reverse("jwt-create"), {"email": email, "password": password}
    )
    token = response.data["access"]
    client.credentials(HTTP_AUTHORIZATION="Bearer " + token)


def perform_create_mock(x):
    raise IntegrityError
