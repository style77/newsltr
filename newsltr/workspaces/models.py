from datetime import timezone
from typing import Any
import uuid
from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.conf import settings

from .crypto import KeyGenerator

# Create your models here.


class WorkspaceMembership(models.Model):
    ROLE_CHOICES = (
        ("admin", _("Admin")),
        ("moderator", _("Moderator")),
        ("member", _("Member")),
    )

    workspace = models.ForeignKey(
        "Workspace", related_name="memberships", on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        "authorization.User",
        related_name="workspace_memberships",
        on_delete=models.CASCADE,
    )
    role = models.CharField(_("Role"), max_length=20, choices=ROLE_CHOICES)

    class Meta:
        unique_together = (("workspace", "user"),)


class Workspace(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True, max_length=36
    )
    name = models.CharField(
        _("workspace name"), max_length=120, blank=False, null=False
    )
    description = models.CharField(_("workspace description"), max_length=1024)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("created",)

    def __str__(self):
        return self.name

    @property
    def memberships(self):
        return WorkspaceMembership.objects.filter(workspace=self)

    @property
    def keys(self):
        return WorkspaceAPIKey.objects.filter(revoked=False, workspace=self)


class AbstractWorkspaceAPIKeyManager(models.Manager):
    key_generator = KeyGenerator(key_length=settings.WORKSPACES["API_KEY_LENGTH"])

    def create(self, **kwargs: Any) -> Any:
        key = self.key_generator.generate()
        obj = self.model(**kwargs)
        obj.key = key
        obj.save()
        return obj, key

    def filter(self, *args: Any, **kwargs: Any):
        return super().filter(*args, **kwargs)

    def is_valid(self, key: str) -> bool:
        return self.filter(key=key, revoked=False).exists()


class WorkspaceAPIKeyManager(AbstractWorkspaceAPIKeyManager):
    ...


class AbstractWorkspaceAPIKey(models.Model):
    objects = WorkspaceAPIKeyManager()
    workspace = models.ForeignKey(
        Workspace,
        on_delete=models.CASCADE,
        related_name="api_keys",
    )
    id = models.CharField(max_length=150, unique=True, primary_key=True, editable=False)
    key = models.CharField(
        _("Key"),
        max_length=40,
        unique=True,
        blank=True,
        default=None,
        null=True,
        editable=False,
    )
    created = models.DateTimeField(auto_now_add=True, db_index=True)
    name = models.CharField(
        max_length=50,
        blank=False,
        default=None,
        help_text=(
            "A free-form name for the API key. "
            "Need not be unique. "
            "50 characters max."
        ),
    )
    revoked = models.BooleanField(
        blank=True,
        default=False,
        help_text=(
            "If the API key is revoked, clients cannot use it anymore. "
            "(This cannot be undone.)"
        ),
    )
    expiry_date = models.DateTimeField(
        blank=True,
        null=True,
        verbose_name="Expires",
        help_text="Once API key expires, clients cannot use it anymore.",
    )

    class Meta:  # noqa
        abstract = True
        ordering = ("-created",)
        verbose_name = "API key"
        verbose_name_plural = "API keys"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Store the initial value of `revoked` to detect changes.
        self._initial_revoked = self.revoked

    def _has_expired(self):
        if self.expiry_date is None:
            return False
        return self.expiry_date < timezone.now()

    _has_expired.short_description = "Has expired"  # type: ignore
    _has_expired.boolean = True  # type: ignore
    has_expired = property(_has_expired)

    def is_valid(self, key):
        return type(self).objects.key_generator.verify(key, self.hashed_key)

    def clean(self):
        self._validate_revoked()

    def save(self, *args, **kwargs):
        self._validate_revoked()
        super().save(*args, **kwargs)

    def _validate_revoked(self):
        if self._initial_revoked and not self.revoked:
            raise ValidationError(
                "The API key has been revoked, which cannot be undone."
            )

    def __str__(self) -> str:
        return str(self.name)


class WorkspaceAPIKey(AbstractWorkspaceAPIKey):
    ...
