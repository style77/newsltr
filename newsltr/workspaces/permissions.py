from rest_framework import permissions


class IsMemberOfWorkspace(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            obj.memberships.filter(user=request.user).exists()
            or request.user.is_superuser
        )


class IsAdminOfWorkspace(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            obj.memberships.filter(user=request.user, role__in=["admin"]).exists()
            or request.user.is_superuser
        )


class IsModeratorOfWorkspace(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            obj.memberships.filter(
                user=request.user, role__in=["admin", "moderator"]
            ).exists()
            or request.user.is_superuser
        )
