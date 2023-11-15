from rest_framework import permissions
from rest_framework.exceptions import NotFound
from rest_framework_simplejwt.tokens import AccessToken

from campaigns.models import Campaign
from workspaces.models import Workspace, WorkspaceMembership


class IsMemberOfWorkspace(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        campaign = obj.campaign
        apikey = request.auth

        if not isinstance(apikey, AccessToken):
            return self._has_permission_using_api_key(key=apikey, campaign=campaign)

        if request.user.is_superuser:
            return True

        try:
            return campaign.workspace.memberships.get(user=request.user)
        except WorkspaceMembership.DoesNotExist:
            return False

    def has_permission(self, request, view):
        campaign_id = view.kwargs.get("campaign_id")
        apikey = request.auth

        try:
            campaign = Campaign.objects.get(pk=campaign_id)
        except Campaign.DoesNotExist:
            raise NotFound(f"Campaign with id: {campaign_id} does not exist.")

        if campaign and not isinstance(apikey, AccessToken):
            return self._has_permission_using_api_key(key=apikey, campaign=campaign)

        try:
            obj = Workspace.objects.get(campaign=campaign)
            membership = obj.memberships.filter(user=request.user).exists()

        except (WorkspaceMembership.DoesNotExist, Workspace.DoesNotExist):
            return False

        return bool(membership or request.user.is_superuser)

    @staticmethod
    def _has_permission_using_api_key(key: str, campaign: int) -> bool:
        return key in campaign.workspace.keys.values_list("key", flat=True)
