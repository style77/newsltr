from django.contrib.auth import get_user_model
from rest_framework import mixins, viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound

from djoser.permissions import CurrentUserOrAdmin

from .serializers import WorkspaceSerializer, WorkspaceCreateSerializer, WorkspaceInviteSerializer
from .permissions import IsMemberOfWorkspace, IsAdminOfWorkspace


User = get_user_model()


class WorkspaceViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = WorkspaceSerializer
    permission_classes = [CurrentUserOrAdmin, IsMemberOfWorkspace]

    # GET /workspaces/{id} - retrieve informations about workspace with id
    # POST /workspaces/ - create new workspace, assign current user as first member with Adfmin role
    # PATCH /workspaces/{id} - partial update
    # PUT /workspaces/{id} - update
    # POST /workspaces/{id}/invite- invitie user with email, check if user that send request is Admin of workspace

    def get_permissions(self):
        if self.action == "create":
            self.permission_classes = [permissions.IsAuthenticated]
        elif self.action in ["destroy", "invite"]:
            self.permission_classes = [
                permissions.IsAuthenticated,
                IsAdminOfWorkspace,
            ]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == "create":
            return WorkspaceCreateSerializer
        elif self.action == "invite":
            return WorkspaceInviteSerializer
        return self.serializer_class

    def perform_create(self, serializer, *args, **kwargs):
        workspace = serializer.save(*args, **kwargs)

    def perform_update(self, serializer, *args, **kwargs):
        super().perform_update(serializer, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=True)
    def invite(self, request, pk, *args, **kwargs):
        workspace = self.get_object()
        if not workspace:
            raise NotFound()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(status=status.HTTP_204_NO_CONTENT)
