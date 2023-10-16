import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings

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
        "authorization.User", related_name="workspace_memberships", on_delete=models.CASCADE
    )
    role = models.CharField(_("Role"), max_length=20, choices=ROLE_CHOICES)

    class Meta:
        unique_together = (("workspace", "user"),)


class Workspace(models.Model):
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True, max_length=36
    )
    name = models.CharField(_("workspace name"), max_length=120, blank=False, null=False)
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
