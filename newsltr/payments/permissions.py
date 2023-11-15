import stripe
from rest_framework import permissions

from workspaces.models import Workspace

from .models import StripeUser


class IsSubscriptionActive(permissions.BasePermission):
    message = "You need to have an active subscription to perform this action."

    def has_permission(self, request, view):
        try:
            stripe_user = StripeUser.objects.get(user=request.user)
            subscriptions = stripe.Subscription.list(
                customer=stripe_user.customer_id,
                status="active",
            )
        except StripeUser.DoesNotExist:
            return False

        return len(subscriptions) != 0


class CanCreateWorkspace(permissions.BasePermission):
    message = "You have reached the limit of workspaces you can create."

    def has_permission(self, request, view):
        try:
            user = StripeUser.objects.get(user=request.user)
            subscriptions = stripe.Subscription.list(
                customer=user.customer_id, status="active"
            )
        except StripeUser.DoesNotExist:
            return False

        workspaces_count = Workspace.objects.filter(
            memberships__user=request.user
        ).count()
        workspaces_limit = 0

        for subscription in subscriptions:
            product = stripe.Product.retrieve(subscription.plan.product)
            workspaces_limit += int(product.metadata.get("workspace_limit", 0))

        return workspaces_count < workspaces_limit


class CanInviteMoreMembers(permissions.BasePermission):
    message = "You have reached the limit of members for this workspace."

    def has_permission(self, request, view):
        try:
            subscriptions = StripeUser.objects.get(
                user=request.user
            ).current_subscription_items
        except StripeUser.DoesNotExist:
            return False

        id = view.kwargs.get("workspace_pk")
        if id is None:
            id = view.kwargs.get("pk")
        if id is None:
            id = view.kwargs.get("id")

        try:
            workspace = Workspace.objects.get(pk=id)
        except Workspace.DoesNotExist:
            return False

        if not isinstance(workspace, Workspace):
            workspace = workspace.workspace

        members_count = workspace.memberships.count()
        members_limit = 0
        for subscription in subscriptions:
            product = stripe.Product.retrieve(subscription.plan.product)
            members_limit += int(product.metadata.get("workspace_members_limit", 0))

        members_count += 1

        return members_count <= members_limit
