from rest_framework import permissions
from .models import WorkspaceAPIKey, Workspace, WorkspaceMembership
from payments.models import StripeUser


class IsSubscriptionActive(permissions.BasePermission):
    message = "You need to have an active subscription to perform this action."

    def has_permission(self, request, view):
        try:
            subscriptions = StripeUser.objects.get(
                user=request.user
            ).current_subscription_items
        except StripeUser.DoesNotExist:
            return False

        if len(subscriptions) == 0:
            return False

        return True


class CanCreateWorkspace(permissions.BasePermission):
    message = "You have reached the limit of workspaces you can create."

    def has_permission(self, request, view):
        try:
            subscriptions = StripeUser.objects.get(
                user=request.user
            ).current_subscription_items
        except StripeUser.DoesNotExist:
            return False

        workspaces_count = len(Workspace.objects.filter(memberships__user=request.user))
        workspaces_limit = sum(
            [
                subscription.price.product.metadata.get("workspace_limit")
                for subscription in subscriptions
            ]
        )

        if workspaces_count >= workspaces_limit:
            return False

        return True


class CanInviteMoreMembers(permissions.BasePermission):
    message = "You have reached the limit of members for this workspace."

    def has_permission(self, request, view):
        try:
            subscriptions = StripeUser.objects.get(
                user=request.user
            ).current_subscription_items
        except StripeUser.DoesNotExist:
            return False

        members_count = Workspace.objects.get(
            pk=view.kwargs.get("workspace_pk")
        ).memberships.count()
        members_limit = sum(
            [
                subscription.price.product.metadata.get("workspace_members_limit")
                for subscription in subscriptions
            ]
        )

        if members_count >= members_limit:
            return False

        return True


class IsMemberOfWorkspace(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if not isinstance(obj, Workspace):
            obj = obj.workspace

        try:
            membership = obj.memberships.get(user=request.user)
        except WorkspaceMembership.DoesNotExist:
            return False

        return bool(
            membership.role in ["admin", "moderator", "member"]
            or request.user.is_superuser
        )

    def has_permission(self, request, view):
        id = view.kwargs.get("workspace_pk")
        if id is None:
            id = view.kwargs.get("pk")
        if id is None:
            id = view.kwargs.get("id")

        try:
            obj = Workspace.objects.get(pk=id)
        except Workspace.DoesNotExist:
            return False

        if not isinstance(obj, Workspace):
            obj = obj.workspace

        try:
            membership = obj.memberships.filter(user=request.user).exists()
        except WorkspaceMembership.DoesNotExist:
            return False

        return bool(membership or request.user.is_superuser)


class IsAdminOfWorkspace(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if not isinstance(obj, Workspace):
            obj = obj.workspace

        try:
            membership = obj.memberships.get(user=request.user)
        except WorkspaceMembership.DoesNotExist:
            return False

        return bool(membership.role in ["admin"] or request.user.is_superuser)

    def has_permission(self, request, view):
        id = view.kwargs.get("workspace_pk")
        if id is None:
            id = view.kwargs.get("pk")
        if id is None:
            id = view.kwargs.get("id")

        try:
            obj = Workspace.objects.get(pk=id)
        except Workspace.DoesNotExist:
            return False

        if not isinstance(obj, Workspace):
            obj = obj.workspace

        try:
            membership = obj.memberships.get(user=request.user)
        except WorkspaceMembership.DoesNotExist:
            return False

        return bool(membership.role in ["admin"] or request.user.is_superuser)


class IsModeratorOfWorkspace(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if not isinstance(obj, Workspace):
            obj = obj.workspace

        try:
            membership = obj.memberships.get(user=request.user)
        except WorkspaceMembership.DoesNotExist:
            return False

        return bool(
            membership.role in ["admin", "moderator"] or request.user.is_superuser
        )

    def has_permission(self, request, view):
        id = view.kwargs.get("workspace_pk")
        if id is None:
            id = view.kwargs.get("pk")
        if id is None:
            id = view.kwargs.get("id")

        try:
            obj = Workspace.objects.get(pk=id)
        except Workspace.DoesNotExist:
            return False

        try:
            membership = obj.memberships.get(user=request.user)
        except WorkspaceMembership.DoesNotExist:
            return False

        return bool(
            membership.role in ["admin", "moderator"] or request.user.is_superuser
        )


class BearerKeyParser:
    keyword = "Bearer"

    def get(self, request):
        return self.get_from_authorization(request)

    def get_from_authorization(self, request):
        authorization = request.META.get("HTTP_AUTHORIZATION")

        if not authorization:
            return None

        try:
            _, key = authorization.split("{} ".format(self.keyword))
        except ValueError:
            key = None

        return key


class HasWorkspaceAPIKey(permissions.BasePermission):
    model = WorkspaceAPIKey
    key_parser = BearerKeyParser()

    def get_key(self, request):
        return self.key_parser.get(request)

    def has_permission(self, request, view):
        assert self.model is not None, (
            "%s must define `.model` with the API key model to use"
            % self.__class__.__name__
        )
        key = self.get_key(request)
        if not key:
            return False
        return self.model.objects.is_valid(key)

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)
