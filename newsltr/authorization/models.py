import uuid
from typing import Type

from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class AbstractUserManager(UserManager['User']):
    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email, and password.
        """
        if not email:
            raise ValueError("The given email must be set")

        if not password:
            raise ValueError("The given password must be set")

        if not extra_fields.get("first_name") or not extra_fields.get("last_name"):
            raise ValueError("The given name must be set")

        extra_fields["first_name"] = extra_fields["first_name"].title()
        extra_fields["last_name"] = extra_fields["last_name"].title()

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True, max_length=36
    )
    email = models.EmailField(_("email address"), blank=False, unique=True)
    username = None  # type: ignore

    objects = AbstractUserManager()  # type: ignore

    workspaces = models.ManyToManyField(
        "workspaces.Workspace",
        through="workspaces.WorkspaceMembership",
        related_name="members",
        related_query_name="member",
    )
