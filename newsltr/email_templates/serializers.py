from campaigns.serializers import CampaignIdMixin
from email_templates.models import EmailTemplate


class EmailTemplateSerializer(CampaignIdMixin):
    class Meta:
        model = EmailTemplate
        fields = CampaignIdMixin.Meta.fields + [
            "id",
            "name",
            "subject",
            "content",
            "extra_data",
            "last_sent_at",
            "campaign_id",
        ]
        read_only_fields = ["id", "last_sent_at", "campaign_id"]
