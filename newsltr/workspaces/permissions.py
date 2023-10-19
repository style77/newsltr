from rest_framework import permissions
from .models import WorkspaceAPIKey, Workspace


class IsMemberOfWorkspace(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if not isinstance(obj, Workspace):
            obj = obj.workspace

        return (
            obj.memberships.filter(user=request.user).exists()
            or request.user.is_superuser
        )


class IsAdminOfWorkspace(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if not isinstance(obj, Workspace):
            obj = obj.workspace

        return (
            obj.memberships.filter(user=request.user, role__in=["admin"]).exists()
            or request.user.is_superuser
        )


class IsModeratorOfWorkspace(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if not isinstance(obj, Workspace):
            obj = obj.workspace

        return (
            obj.memberships.filter(
                user=request.user, role__in=["admin", "moderator"]
            ).exists()
            or request.user.is_superuser
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
