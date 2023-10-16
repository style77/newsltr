from django.contrib.auth import get_user_model, tokens
from rest_framework import mixins, viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound


from .serializers import (
    WorkspaceSerializer,
    WorkspaceCreateSerializer,
    WorkspaceInviteSerializer,
    WorkspaceInvitationAcceptSerializer,
)
from .permissions import IsMemberOfWorkspace, IsAdminOfWorkspace
from .models import Workspace, WorkspaceMembership
from .email import WorkspaceInvitationEmail


User = get_user_model()


class WorkspaceViewSet(viewsets.ModelViewSet):
    serializer_class = WorkspaceSerializer
    permission_classes = [permissions.IsAuthenticated, IsMemberOfWorkspace]
    queryset = Workspace.objects.all()

    token_generator = tokens.default_token_generator

    # GET /workspaces/{id} - retrieve informations about workspace with id
    # POST /workspaces/ - create new workspace, assign current user as first member with Adfmin role
    # PATCH /workspaces/{id} - partial update
    # PUT /workspaces/{id} - update
    # POST /workspaces/{id}/invite- invitie user with email, check if user that send request is Admin of workspace

    def get_queryset(self):
        if self.action == "list" and not self.request.user.is_staff:
            return super().get_queryset().filter(memberships__user=self.request.user)
        return super().get_queryset()

    def get_permissions(self):
        if self.action in ["create", "invitation_accept"]:
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
        elif self.action == "invitation_accept":
            return WorkspaceInvitationAcceptSerializer
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

        try:
            user = get_user_model().objects.get(
                email=serializer.validated_data.get("email")
            )
        except User.DoesNotExist:
            return Response(
                data={"detail": "User with such email not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        context = {
            "user": user,
            "workspace": workspace,
            "role": serializer.validated_data.get("role"),
        }
        to = [serializer.validated_data.get("email")]

        WorkspaceInvitationEmail(self.request, context).send(to)

        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=False, url_path="invite/accept")
    def invitation_accept(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if serializer.user != self.request.user:
            return Response(
                data={"detail": "You can't accept invitation for other user."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        membership = WorkspaceMembership(
            workspace=serializer.workspace, user=serializer.user, role="member"
        )  # todo add possibility to invite with different role
        membership.save()
        serializer.workspace.refresh()

        return Response(status=status.HTTP_204_NO_CONTENT)
