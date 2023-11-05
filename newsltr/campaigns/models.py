import uuid

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _

from workspaces.models import Workspace


class Campaign(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    workspace = models.OneToOneField(
        Workspace, on_delete=models.CASCADE, related_name="campaign"
    )

    def __str__(self):
        return self.workspace.name


@receiver(post_save, sender=Workspace)
def auto_create_campaign(instance: Workspace, created: bool, *args, **kwargs):
    if created:
        Campaign.objects.create(workspace=instance)


class CampaignSubscriber(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(_("subscriber email"))
    joined_at = models.DateTimeField(auto_now_add=True)
    tracking_data = models.JSONField(blank=True, null=True)
    campaign = models.ForeignKey(
        Campaign, on_delete=models.CASCADE, related_name="subscribers"
    )

    def __str__(self):
        return f"{self.email} | {self.campaign}"

    class Meta:
        ordering = ["joined_at"]
        unique_together = [["email", "campaign"]]
