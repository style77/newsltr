from drf_spectacular.utils import extend_schema
from rest_framework.generics import ListAPIView, CreateAPIView

from email_templates.models import EmailTemplate
from email_templates.serializers import EmailTemplateSerializer
from campaigns.permissions import IsMemberOfWorkspace


class EmailTemplatesViewBase:
    permission_classes = [IsMemberOfWorkspace]
    serializer_class = EmailTemplateSerializer
    queryset = EmailTemplate.objects.all()
    lookup_field = "campaign__id"
    lookup_url_kwarg = "campaign_id"


@extend_schema(tags=["email templates"])
class EmailTemplatesListView(EmailTemplatesViewBase, ListAPIView):
    ...


@extend_schema(tags=["email templates"])
class EmailTemplatesCreateView(EmailTemplatesViewBase, CreateAPIView):
    ...
