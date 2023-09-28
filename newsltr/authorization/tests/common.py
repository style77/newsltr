from django.contrib.auth import get_user_model
from django.db import IntegrityError
from unittest import mock

__all__ = [
    "get_user_model",
    "IntegrityError",
    "mock",
    "RunCheck",
    "PermCheckClass",
    "SerializerCheckClass",
    "TEST_DATA",
]


TEST_DATA = {
    "username": "Test Test",
    "email": "test@test.com",
    "password": "#Test1234",
}


def create_user(username, email, password, **kwargs):
    data = {"username": username, "email": email, "password": password}
    data.update(kwargs)
    user = get_user_model().objects.create_user(**data)
    user.raw_password = data["password"]
    return user


def perform_create_mock(x):
    raise IntegrityError


class RunCheck(Exception):
    pass


class PermCheckClass:
    def has_permission(self, *args, **kwargs):
        raise RunCheck("working")

    def has_object_permission(self, *args, **kwargs):
        raise RunCheck("working")


class SerializerCheckClass:
    def __init__(self, *args, **kwargs):
        raise RunCheck("working")
