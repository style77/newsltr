from typing import Any, Type

from drf_spectacular.utils import extend_schema
from rest_framework.generics import (CreateAPIView, ListAPIView,
                                     RetrieveUpdateDestroyAPIView)
from rest_framework.serializers import BaseSerializer

from campaigns.permissions import IsMemberOfWorkspace
from email_templates.models import EmailTemplate
from email_templates.serializers import EmailTemplateSerializer


class EmailTemplatesViewBase:
    # TODO change Any to correct type
    permission_classes: Any = [IsMemberOfWorkspace]
    serializer_class: Type[BaseSerializer] | None = EmailTemplateSerializer
    queryset: Any = EmailTemplate.objects.all()  # type: ignore
    lookup_field: str = "campaign__id"
    lookup_url_kwarg: str | None = "campaign_id"


@extend_schema(tags=["email templates"])
class EmailTemplatesListView(EmailTemplatesViewBase, ListAPIView):
    ...


@extend_schema(tags=["email templates"])
class EmailTemplatesCreateView(EmailTemplatesViewBase, CreateAPIView):
    ...


@extend_schema(tags=["email templates"])
class EmailTemplatesGetUpdateDeleteView(
    EmailTemplatesViewBase, RetrieveUpdateDestroyAPIView
):
    lookup_field = "pk"
    lookup_url_kwarg = "template_id"

    def get_queryset(self):
        campaign_id = self.kwargs.get("campaign_id")
        return EmailTemplate.objects.filter(campaign_id=campaign_id)
