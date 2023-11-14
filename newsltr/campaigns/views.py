from drf_spectacular.utils import extend_schema
from rest_framework.exceptions import NotFound
from rest_framework.generics import (CreateAPIView, GenericAPIView,
                                     RetrieveUpdateDestroyAPIView)
from rest_framework.response import Response

from authorization.authentication import (APIKeyAuthentication,
                                          JWTCookiesAuthentication)
from payments.permissions import IsSubscriptionActive

from .models import CampaignSubscriber
from .permissions import IsMemberOfWorkspace
from .serializers import CampaignSubscriberSerializer


class CampaignUserViewBase(GenericAPIView):
    serializer_class = CampaignSubscriberSerializer
    authentication_classes = [APIKeyAuthentication, JWTCookiesAuthentication]
    permission_classes = [IsMemberOfWorkspace]

    def get_queryset(self):
        campaign_id = self.kwargs.get("campaign_id")
        return CampaignSubscriber.objects.filter(campaign=campaign_id)


@extend_schema(tags=["campaigns"])
class CampaignUserListView(CampaignUserViewBase):
    permission_classes = [IsSubscriptionActive & IsMemberOfWorkspace]

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

    def get_permissions(self):
        if self.request.method != "DELETE":
            return [permission() for permission in self.permission_classes] + [
                IsSubscriptionActive()
            ]
        return super().get_permissions()
