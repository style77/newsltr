from rest_framework.exceptions import ValidationError
from rest_framework.serializers import HiddenField, ModelSerializer
from rest_framework.validators import UniqueTogetherValidator

from .models import Campaign, CampaignSubscriber


class CampaignIdMixin(ModelSerializer[Campaign]):
    campaign_id = HiddenField(default=None)

    class Meta:
        fields = ["campaign_id"]
        model = Campaign

    def validate_campaign_id(self, *args, **kwargs):
        request = self.context.get("request")
        campaign_id = request.parser_context["kwargs"].get("campaign_id")

        if not campaign_id:
            raise ValidationError("Campaign ID is required from the URL.")

        return campaign_id


class CampaignSubscriberSerializer(
    CampaignIdMixin, ModelSerializer[CampaignSubscriber]
):
    class Meta:
        model = CampaignSubscriber
        fields = CampaignIdMixin.Meta.fields + [
            "email",
            "tracking_data",
            "joined_at",
            "campaign_id",
            "id",
        ]
        read_only_fields = ["campaign_id", "joined_at", "id"]
        validators = [
            UniqueTogetherValidator(
                queryset=CampaignSubscriber.objects.all(),
                fields=["email", "campaign_id"],
            )
        ]
