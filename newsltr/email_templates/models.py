import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _
from trix.fields import TrixField

from campaigns.models import Campaign


class EmailTemplate(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    campaign = models.ForeignKey(
        Campaign, on_delete=models.CASCADE, related_name="email_tempaltes"
    )
    name = models.CharField(_("name"), max_length=250, default="Untitled")
    subject = models.CharField(_("subject"), max_length=998)  # Len set by RFC 2822
    content = TrixField()  # TextField under the hood
    extra_data = models.JSONField()
    last_sent_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["id"]
        verbose_name = _("Email template")

    def __str__(self) -> str:
        return self.subject[:30] + "…"
