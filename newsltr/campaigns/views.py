from drf_spectacular.utils import extend_schema
from rest_framework.exceptions import NotFound
from rest_framework.generics import (
    CreateAPIView,
    GenericAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.response import Response

from authorization.authentication import JWTCookiesAuthentication, APIKeyAuthentication
from .permissions import IsMemberOfWorkspace
from .models import CampaignSubscriber
from .serializers import CampaignSubscriberSerializer

from typing import Type, Any
from rest_framework.serializers import BaseSerializer
from collections.abc import Sequence
from rest_framework.authentication import BaseAuthentication


class CampaignUserViewBase:
    # TODO change Any to correct type
    serializer_class: Type[BaseSerializer] | None = CampaignSubscriberSerializer
    authentication_classes: Sequence[type[BaseAuthentication]] = [APIKeyAuthentication, JWTCookiesAuthentication]
    permission_classes: Any = [IsMemberOfWorkspace]

    def get_queryset(self):
        campaign_id = self.kwargs.get("campaign_id")
        return CampaignSubscriber.objects.filter(campaign=campaign_id)


@extend_schema(tags=["campaigns"])
class CampaignUserListView(CampaignUserViewBase, GenericAPIView):
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if not queryset:
            raise NotFound("Campaign with such id not found.")

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


@extend_schema(tags=["campaigns"])
class CampaignUserCreateView(CampaignUserViewBase, CreateAPIView):
    ...


@extend_schema(tags=["campaigns"])
class CampaignUserRetrieveUpdateDeleteView(
    CampaignUserViewBase, RetrieveUpdateDestroyAPIView
):
    lookup_url_kwarg = "user_id"
