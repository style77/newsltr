from drf_spectacular.utils import extend_schema
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
)

from email_templates.models import EmailTemplate
from email_templates.serializers import EmailTemplateSerializer
from campaigns.permissions import IsMemberOfWorkspace
from collections.abc import Sequence
from rest_framework.permissions import _PermissionClass
from rest_framework.serializers import BaseSerializer

from typing import Type


class EmailTemplatesViewBase:
    permission_classes: Sequence[_PermissionClass] = [IsMemberOfWorkspace]
    serializer_class: Type[BaseSerializer] | None = EmailTemplateSerializer
    # TODO
    queryset = EmailTemplate.objects.all()  # type: ignore
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
